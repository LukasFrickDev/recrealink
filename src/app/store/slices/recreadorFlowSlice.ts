import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  recreadorOportunidadesMock,
  type RecreadorOpportunityItem,
} from "@/modules/recreador/mocks/oportunidades";
import {
  recreadorConvitesMock,
  type ConviteItem,
  type ConviteStatus,
} from "@/modules/recreador/mocks/convites";
import {
  recreadorDisponibilidadeMock,
  type AvailabilityPeriod,
  type AvailabilitySlotItem,
  type CommitmentOrigin,
  type ConflictPreviewItem,
  type FutureCommitmentItem,
  type ManualBlockItem,
  type RecurrenceRuleItem,
} from "@/modules/recreador/mocks/disponibilidade";
import type { RootState } from "@/app/store";

export type CoreApplicationStage =
  | "nao-enviada"
  | "em-analise"
  | "convite-recebido"
  | "convite-aceito"
  | "convite-recusado";

export interface CoreApplicationItem {
  id: string;
  opportunityId: string;
  opportunityCode: string;
  stage: CoreApplicationStage;
}

export type CoreAvailabilitySnapshot = {
  slots: AvailabilitySlotItem[];
  manualBlocks: ManualBlockItem[];
  recurrenceRules: RecurrenceRuleItem[];
  conflicts: ConflictPreviewItem[];
};

export interface RecreadorFlowState {
  opportunities: RecreadorOpportunityItem[];
  invites: ConviteItem[];
  availabilitySnapshot: CoreAvailabilitySnapshot;
}

export type ApplyToOpportunityResult =
  | {
      status: "not-found";
    }
  | {
      status: "blocked";
      reason: "not-open";
      opportunity: RecreadorOpportunityItem;
    }
  | {
      status: "already-applied";
      opportunity: RecreadorOpportunityItem;
    }
  | {
      status: "applied";
      opportunity: RecreadorOpportunityItem;
      generatedInvite: ConviteItem | null;
    };

export type UpdateInviteStatusResult =
  | {
      status: "not-found";
    }
  | {
      status: "unchanged";
      invite: ConviteItem;
    }
  | {
      status: "updated";
      invite: ConviteItem;
      nextStatus: ConviteStatus;
      commitmentConflictDetected: boolean;
    };

export type ValidateApplyToOpportunityResult =
  | {
      status: "not-found";
    }
  | {
      status: "blocked";
      reason: "not-open";
      opportunity: RecreadorOpportunityItem;
    }
  | {
      status: "already-applied";
      opportunity: RecreadorOpportunityItem;
    }
  | {
      status: "ready";
      opportunity: RecreadorOpportunityItem;
      commitmentConflictDetected: boolean;
    };

export type ValidateInviteStatusResult =
  | {
      status: "not-found";
    }
  | {
      status: "unchanged";
      invite: ConviteItem;
    }
  | {
      status: "ready";
      invite: ConviteItem;
      nextStatus: ConviteStatus;
      commitmentConflictDetected: boolean;
    };

const monthShortLabels = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const monthIndexByLabel: Record<string, number> = {
  jan: 0,
  fev: 1,
  mar: 2,
  abr: 3,
  mai: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  set: 8,
  out: 9,
  nov: 10,
  dez: 11,
};

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terca-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

const baseAvailableSlots = recreadorDisponibilidadeMock.slots
  .filter((slot) => slot.state === "disponivel")
  .map((slot) => ({ ...slot }));

const commitmentSeedByCode = new Map(
  recreadorDisponibilidadeMock.futureCommitments.map((item) => [
    item.opportunityCode,
    {
      dateLabel: item.dateLabel,
      weekdayLabel: item.weekdayLabel,
      period: item.period,
      startTime: item.startTime,
      endTime: item.endTime,
    },
  ]),
);

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const parseDateLabel = (label: string) => {
  const normalized = normalizeText(label);
  const match = normalized.match(/^(\d{1,2})\s+([a-z]{3})\s+(\d{4})$/i);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const monthIndex = monthIndexByLabel[match[2]];
  const year = Number(match[3]);

  if (Number.isNaN(day) || Number.isNaN(year) || monthIndex === undefined) {
    return null;
  }

  const parsed = new Date(year, monthIndex, day);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
};

const formatDateLabel = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthShortLabels[date.getMonth()];
  const year = String(date.getFullYear());

  return `${day} ${month} ${year}`;
};

const addDays = (date: Date, amount: number) => {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + amount);
  return next;
};

const toDateKey = (date: Date) => {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getWeekdayLabel = (date: Date) => weekdays[date.getDay()] ?? "A definir";

const hasTimeOverlap = (startA: string, endA: string, startB: string, endB: string) =>
  startA < endB && startB < endA;

const hasInclusiveTimeOverlap = (startA: string, endA: string, startB: string, endB: string) =>
  startA <= endB && startB <= endA;

const getDefaultPeriodAndTime = (
  opportunity: RecreadorOpportunityItem,
): { period: AvailabilityPeriod; startTime: string; endTime: string } => {
  if (opportunity.type === "resort" || opportunity.type === "hotel") {
    return {
      period: "noite",
      startTime: "18:00",
      endTime: "22:00",
    };
  }

  return {
    period: "tarde",
    startTime: "13:00",
    endTime: "17:00",
  };
};

const parseOpportunityDateRange = (
  opportunity: RecreadorOpportunityItem,
): { startDate: Date; endDate: Date } | null => {
  const normalizedPeriod = normalizeText(opportunity.periodLabel);
  const rangeMatch = normalizedPeriod.match(
    /^(\d{1,2})\s+([a-z]{3})\s+a\s+(\d{1,2})\s+([a-z]{3})\s+(\d{4})$/i,
  );

  if (rangeMatch) {
    const startDay = Number(rangeMatch[1]);
    const startMonthIndex = monthIndexByLabel[rangeMatch[2]];
    const endDay = Number(rangeMatch[3]);
    const endMonthIndex = monthIndexByLabel[rangeMatch[4]];
    const endYear = Number(rangeMatch[5]);

    if (
      !Number.isNaN(startDay) &&
      startMonthIndex !== undefined &&
      !Number.isNaN(endDay) &&
      endMonthIndex !== undefined &&
      !Number.isNaN(endYear)
    ) {
      const startYear = startMonthIndex > endMonthIndex ? endYear - 1 : endYear;
      const startDate = new Date(startYear, startMonthIndex, startDay);
      const endDate = new Date(endYear, endMonthIndex, endDay);

      if (
        !Number.isNaN(startDate.getTime()) &&
        !Number.isNaN(endDate.getTime()) &&
        startDate.getTime() <= endDate.getTime()
      ) {
        return {
          startDate,
          endDate,
        };
      }
    }
  }

  const singleDateMatch = normalizedPeriod.match(/^(\d{1,2})\s+([a-z]{3})\s+(\d{4})$/i);

  if (singleDateMatch) {
    const day = Number(singleDateMatch[1]);
    const monthIndex = monthIndexByLabel[singleDateMatch[2]];
    const year = Number(singleDateMatch[3]);

    if (!Number.isNaN(day) && monthIndex !== undefined && !Number.isNaN(year)) {
      const parsedDate = new Date(year, monthIndex, day);

      if (!Number.isNaN(parsedDate.getTime())) {
        return {
          startDate: parsedDate,
          endDate: parsedDate,
        };
      }
    }
  }

  const normalizedStart = normalizeText(opportunity.startDateLabel);
  const startMatch = normalizedStart.match(/(\d{1,2})\s+([a-z]{3})/i);

  if (startMatch) {
    const day = Number(startMatch[1]);
    const monthIndex = monthIndexByLabel[startMatch[2]];
    const year = new Date().getFullYear();

    if (!Number.isNaN(day) && monthIndex !== undefined) {
      const parsedDate = new Date(year, monthIndex, day);

      if (!Number.isNaN(parsedDate.getTime())) {
        return {
          startDate: parsedDate,
          endDate: parsedDate,
        };
      }
    }
  }

  return null;
};

const resolveCommitmentSchedule = (opportunity: RecreadorOpportunityItem) => {
  const seeded = commitmentSeedByCode.get(opportunity.code);

  if (seeded) {
    return seeded;
  }

  const parsedRange = parseOpportunityDateRange(opportunity);
  const parsedDate = parsedRange?.startDate ?? null;
  const defaultTime = getDefaultPeriodAndTime(opportunity);

  if (!parsedDate) {
    return {
      dateLabel: "A definir",
      weekdayLabel: "A definir",
      period: defaultTime.period,
      startTime: defaultTime.startTime,
      endTime: defaultTime.endTime,
    };
  }

  return {
    dateLabel: formatDateLabel(parsedDate),
    weekdayLabel: getWeekdayLabel(parsedDate),
    period: defaultTime.period,
    startTime: defaultTime.startTime,
    endTime: defaultTime.endTime,
  };
};

const getCommitmentDatesForOpportunity = (
  opportunity: RecreadorOpportunityItem,
  fallbackDateLabel: string,
): Date[] => {
  const parsedRange = parseOpportunityDateRange(opportunity);

  if (parsedRange) {
    const dates: Date[] = [];
    let cursor = new Date(
      parsedRange.startDate.getFullYear(),
      parsedRange.startDate.getMonth(),
      parsedRange.startDate.getDate(),
    );

    while (cursor.getTime() <= parsedRange.endDate.getTime()) {
      dates.push(cursor);
      cursor = addDays(cursor, 1);
    }

    return dates;
  }

  const fallbackDate = parseDateLabel(fallbackDateLabel);

  if (!fallbackDate) {
    return [];
  }

  return [fallbackDate];
};

const cloneOpportunities = (items: readonly RecreadorOpportunityItem[]): RecreadorOpportunityItem[] =>
  items.map((item) => ({ ...item }));

const cloneInvites = (items: readonly ConviteItem[]): ConviteItem[] =>
  items.map((item) => ({ ...item, timeline: item.timeline.map((event) => ({ ...event })) }));

const cloneManualBlocks = (items: readonly ManualBlockItem[]): ManualBlockItem[] =>
  items.map((item) => ({ ...item }));

const cloneRecurrenceRules = (items: readonly RecurrenceRuleItem[]): RecurrenceRuleItem[] =>
  items.map((item) => ({ ...item }));

const cloneSlots = (items: readonly AvailabilitySlotItem[]): AvailabilitySlotItem[] =>
  items.map((item) => ({ ...item }));

const cloneAvailabilitySnapshot = (snapshot: CoreAvailabilitySnapshot): CoreAvailabilitySnapshot => ({
  slots: cloneSlots(snapshot.slots),
  manualBlocks: cloneManualBlocks(snapshot.manualBlocks),
  recurrenceRules: cloneRecurrenceRules(snapshot.recurrenceRules),
  conflicts: snapshot.conflicts.map((item) => ({ ...item })),
});

const createInviteFromOpportunity = (opportunity: RecreadorOpportunityItem): ConviteItem => {
  const now = new Date();
  const nowLabel = formatDateLabel(now);

  return {
    id: `invite-generated-${opportunity.id}`,
    opportunityId: opportunity.id,
    opportunityCode: opportunity.code,
    originKind: opportunity.originKind,
    originName: opportunity.originName,
    originSummary: opportunity.originSummary,
    roleLabel: opportunity.roleLabel,
    cityLabel: opportunity.cityLabel,
    periodLabel: opportunity.periodLabel,
    compensationLabel: opportunity.compensationLabel,
    inviteDateLabel: nowLabel,
    responseDeadlineLabel: "Aguardando retorno",
    relationshipLabel: "Originado de candidatura enviada",
    status: "aguardando",
    statusReason: "Candidatura enviada. Aguardando retorno da empresa para possível convite.",
    timeline: [
      {
        id: `${opportunity.id}-timeline-application`,
        label: "Candidatura enviada",
        dateLabel: nowLabel,
      },
    ],
  };
};

const deriveOpportunityFromInviteStatus = (
  opportunity: RecreadorOpportunityItem,
  invite: ConviteItem | null,
): RecreadorOpportunityItem => {
  if (!invite) {
    return opportunity;
  }

  if (invite.status === "pendente") {
    return {
      ...opportunity,
      inviteStatus: "convite-recebido",
      relatedInviteId: invite.id,
      lifecycleStatus: opportunity.lifecycleStatus === "encerrada" ? "encerrada" : "aberta",
      commitmentLabel: undefined,
    };
  }

  if (invite.status === "aguardando") {
    return {
      ...opportunity,
      inviteStatus: "nenhum",
      relatedInviteId: invite.id,
      lifecycleStatus: opportunity.lifecycleStatus === "encerrada" ? "encerrada" : "aberta",
      commitmentLabel: undefined,
    };
  }

  if (invite.status === "aceito") {
    return {
      ...opportunity,
      inviteStatus: "convite-aceito",
      relatedInviteId: invite.id,
      lifecycleStatus: "confirmada",
      commitmentLabel: `Compromisso confirmado em ${opportunity.periodLabel}.`,
    };
  }

  return {
    ...opportunity,
    inviteStatus: "convite-recusado",
    relatedInviteId: invite.id,
    lifecycleStatus: opportunity.lifecycleStatus === "encerrada" ? "encerrada" : "aberta",
    commitmentLabel: undefined,
  };
};

const buildFutureCommitments = (
  opportunities: RecreadorOpportunityItem[],
  invites: ConviteItem[],
): FutureCommitmentItem[] => {
  const acceptedInviteByOpportunityId = new Map(
    invites
      .filter((invite) => invite.status === "aceito")
      .map((invite) => [invite.opportunityId, invite]),
  );

  const commitmentList: FutureCommitmentItem[] = [];

  opportunities.forEach((opportunity) => {
    const acceptedInvite = acceptedInviteByOpportunityId.get(opportunity.id);
    const hasAcceptedInvite = Boolean(acceptedInvite);
    const isConfirmedOpportunity = opportunity.lifecycleStatus === "confirmada";

    if (!hasAcceptedInvite && !isConfirmedOpportunity) {
      return;
    }

    const schedule = resolveCommitmentSchedule(opportunity);
    const parsedDate = parseDateLabel(schedule.dateLabel);

    const sourceOrigins: CommitmentOrigin[] = [];

    if (hasAcceptedInvite) {
      sourceOrigins.push("convite-aceito");
    }

    if (isConfirmedOpportunity) {
      sourceOrigins.push("oportunidade-confirmada");
    }

    const baseCommitmentId = `core-commit-${acceptedInvite?.id ?? opportunity.id}`;
    const commitmentDates = getCommitmentDatesForOpportunity(opportunity, schedule.dateLabel);

    if (commitmentDates.length === 0 || !parsedDate) {
      commitmentList.push({
        id: baseCommitmentId,
        opportunityId: opportunity.id,
        opportunityCode: opportunity.code,
        originName: opportunity.originName,
        roleLabel: opportunity.roleLabel,
        dateLabel: schedule.dateLabel,
        weekdayLabel: schedule.weekdayLabel,
        period: schedule.period,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        sourceOrigins,
        status: "pendente-ajuste",
        helper: "Convite aceito aguardando ajuste final de data.",
      });
      return;
    }

    commitmentDates.forEach((date, index) => {
      commitmentList.push({
        id: index === 0 ? baseCommitmentId : `${baseCommitmentId}-${toDateKey(date)}`,
        opportunityId: opportunity.id,
        opportunityCode: opportunity.code,
        originName: opportunity.originName,
        roleLabel: opportunity.roleLabel,
        dateLabel: formatDateLabel(date),
        weekdayLabel: getWeekdayLabel(date),
        period: schedule.period,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        sourceOrigins,
        status: "confirmado",
        helper:
          commitmentDates.length > 1
            ? `Compromisso integrado ao fluxo de convites e disponibilidade. Dia ${index + 1} de ${commitmentDates.length}.`
            : "Compromisso integrado ao fluxo de convites e disponibilidade.",
      });
    });
  });

  return commitmentList;
};

const buildAvailabilitySnapshot = ({
  manualBlocks,
  recurrenceRules,
  commitments,
}: {
  manualBlocks: ManualBlockItem[];
  recurrenceRules: RecurrenceRuleItem[];
  commitments: FutureCommitmentItem[];
}): CoreAvailabilitySnapshot => {
  const commitmentSlots = commitments
    .filter((item) => parseDateLabel(item.dateLabel) !== null)
    .map<AvailabilitySlotItem>((item) => ({
      id: `core-commit-slot-${item.id}`,
      dateLabel: item.dateLabel,
      weekdayLabel: item.weekdayLabel,
      period: item.period,
      startTime: item.startTime,
      endTime: item.endTime,
      state: "bloqueio-compromisso",
      helper: "Compromisso vindo de convite aceito e integrado ao nucleo.",
    }));

  const manualSlots = manualBlocks.map<AvailabilitySlotItem>((item) => {
    const parsedDate = parseDateLabel(item.dateLabel);

    return {
      id: `manual-slot-${item.id}`,
      dateLabel: item.dateLabel,
      weekdayLabel: parsedDate ? getWeekdayLabel(parsedDate) : "Dia configurado",
      period: item.period,
      startTime: item.startTime,
      endTime: item.endTime,
      state: "bloqueio-manual",
      helper: "Bloqueio manual definido na interface.",
    };
  });

  const nextConflicts: ConflictPreviewItem[] = [];

  manualSlots.forEach((manualSlot, index) => {
    const sourceBlock = manualBlocks[index];

    commitmentSlots.forEach((commitmentSlot) => {
      if (manualSlot.dateLabel !== commitmentSlot.dateLabel) {
        return;
      }

      if (
        !hasTimeOverlap(
          manualSlot.startTime,
          manualSlot.endTime,
          commitmentSlot.startTime,
          commitmentSlot.endTime,
        )
      ) {
        return;
      }

      const overlapIsTotal =
        (manualSlot.startTime <= commitmentSlot.startTime &&
          manualSlot.endTime >= commitmentSlot.endTime) ||
        (commitmentSlot.startTime <= manualSlot.startTime &&
          commitmentSlot.endTime >= manualSlot.endTime);

      manualSlots[index] = {
        ...manualSlot,
        state: "conflito",
        helper: "Bloqueio manual em conflito com compromisso confirmado.",
      };

      nextConflicts.push({
        id: `core-conflict-${sourceBlock.id}-${commitmentSlot.id}`,
        dateLabel: manualSlot.dateLabel,
        startTime: manualSlot.startTime,
        endTime: manualSlot.endTime,
        kind: overlapIsTotal ? "sobreposicao-total" : "sobreposicao-parcial",
        sourceA: "Bloqueio manual",
        sourceB: "Compromisso confirmado",
        helper: "Conflito detectado entre bloqueio manual e compromisso aceito.",
      });
    });
  });

  const slots = [...cloneSlots(baseAvailableSlots), ...commitmentSlots, ...manualSlots].sort(
    (left, right) => {
      const leftDate = parseDateLabel(left.dateLabel);
      const rightDate = parseDateLabel(right.dateLabel);

      if (leftDate && rightDate && leftDate.getTime() !== rightDate.getTime()) {
        return leftDate.getTime() - rightDate.getTime();
      }

      if (leftDate && !rightDate) {
        return -1;
      }

      if (!leftDate && rightDate) {
        return 1;
      }

      return left.startTime.localeCompare(right.startTime);
    },
  );

  return {
    slots,
    manualBlocks: cloneManualBlocks(manualBlocks),
    recurrenceRules: cloneRecurrenceRules(recurrenceRules),
    conflicts: nextConflicts,
  };
};

const deriveApplicationStage = (
  opportunity: RecreadorOpportunityItem,
  invite: ConviteItem | null,
): CoreApplicationStage => {
  if (opportunity.applicationStatus === "disponivel") {
    return "nao-enviada";
  }

  if (!invite) {
    return "em-analise";
  }

  if (invite.status === "aguardando") {
    return "em-analise";
  }

  if (invite.status === "pendente") {
    return "convite-recebido";
  }

  if (invite.status === "aceito") {
    return "convite-aceito";
  }

  return "convite-recusado";
};

const buildApplications = (
  opportunities: RecreadorOpportunityItem[],
  invites: ConviteItem[],
): CoreApplicationItem[] => {
  const inviteByOpportunityId = new Map(invites.map((item) => [item.opportunityId, item]));

  return opportunities.map((opportunity) => {
    const invite = inviteByOpportunityId.get(opportunity.id) ?? null;

    return {
      id: `application-${opportunity.id}`,
      opportunityId: opportunity.id,
      opportunityCode: opportunity.code,
      stage: deriveApplicationStage(opportunity, invite),
    };
  });
};

const buildOpportunityCommitmentWindows = (opportunity: RecreadorOpportunityItem) => {
  const schedule = resolveCommitmentSchedule(opportunity);
  const dates = getCommitmentDatesForOpportunity(opportunity, schedule.dateLabel);

  return dates.map((date) => ({
    dateLabel: formatDateLabel(date),
    startTime: schedule.startTime,
    endTime: schedule.endTime,
  }));
};

const toDateKeyFromLabel = (dateLabel: string) => {
  const parsed = parseDateLabel(dateLabel);

  if (!parsed) {
    return null;
  }

  return toDateKey(parsed);
};

const detectCriticalScheduleConflict = ({
  state,
  targetOpportunity,
  excludedOpportunityId,
}: {
  state: RecreadorFlowState;
  targetOpportunity: RecreadorOpportunityItem;
  excludedOpportunityId?: string;
}) => {
  const targetWindows = buildOpportunityCommitmentWindows(targetOpportunity);
  const targetDateKeys = new Set(
    targetWindows
      .map((window) => toDateKeyFromLabel(window.dateLabel))
      .filter((value): value is string => value !== null),
  );

  if (targetWindows.length === 0 || targetDateKeys.size === 0) {
    return false;
  }

  const confirmedCommitments = buildFutureCommitments(state.opportunities, state.invites).filter(
    (item) => item.status === "confirmado" && item.opportunityId !== excludedOpportunityId,
  );

  const hasConfirmedCommitmentConflict = confirmedCommitments.some((item) => {
    const commitmentDateKey = toDateKeyFromLabel(item.dateLabel);

    if (!commitmentDateKey) {
      return false;
    }

    return targetDateKeys.has(commitmentDateKey);
  });

  if (hasConfirmedCommitmentConflict) {
    return true;
  }

  // Regra critica: bloqueio manual em sobreposicao tambem precisa de confirmacao por modal.
  const hasManualBlockConflict = targetWindows.some((window) => {
    const windowDateKey = toDateKeyFromLabel(window.dateLabel);

    if (!windowDateKey) {
      return false;
    }

    return state.availabilitySnapshot.manualBlocks.some((block) => {
      const manualBlockDateKey = toDateKeyFromLabel(block.dateLabel);

      if (!manualBlockDateKey || manualBlockDateKey !== windowDateKey) {
        return false;
      }

      return hasInclusiveTimeOverlap(
        block.startTime,
        block.endTime,
        window.startTime,
        window.endTime,
      );
    });
  });

  return hasManualBlockConflict;
};

const initialOpportunities = cloneOpportunities(recreadorOportunidadesMock.items);
const initialInvites = cloneInvites(recreadorConvitesMock.items);
const initialFutureCommitments = buildFutureCommitments(initialOpportunities, initialInvites);
const initialAvailabilitySnapshot = buildAvailabilitySnapshot({
  manualBlocks: cloneManualBlocks(recreadorDisponibilidadeMock.manualBlocks),
  recurrenceRules: cloneRecurrenceRules(recreadorDisponibilidadeMock.recurrenceRules),
  commitments: initialFutureCommitments,
});

export type RecreadorFlowSmokeState = RecreadorFlowState;

export type RecreadorFlowSmokeView = {
  applications: CoreApplicationItem[];
  futureCommitments: FutureCommitmentItem[];
};

const syncAvailabilityFromFlow = (state: RecreadorFlowState): RecreadorFlowState => {
  const futureCommitments = buildFutureCommitments(state.opportunities, state.invites);

  return {
    ...state,
    availabilitySnapshot: buildAvailabilitySnapshot({
      manualBlocks: cloneManualBlocks(state.availabilitySnapshot.manualBlocks),
      recurrenceRules: cloneRecurrenceRules(state.availabilitySnapshot.recurrenceRules),
      commitments: futureCommitments,
    }),
  };
};

export const createInitialRecreadorFlowSmokeState = (): RecreadorFlowSmokeState => ({
  opportunities: cloneOpportunities(initialOpportunities),
  invites: cloneInvites(initialInvites),
  availabilitySnapshot: {
    slots: cloneSlots(initialAvailabilitySnapshot.slots),
    manualBlocks: cloneManualBlocks(initialAvailabilitySnapshot.manualBlocks),
    recurrenceRules: cloneRecurrenceRules(initialAvailabilitySnapshot.recurrenceRules),
    conflicts: initialAvailabilitySnapshot.conflicts.map((item) => ({ ...item })),
  },
});

export const getRecreadorFlowSmokeView = (
  state: RecreadorFlowSmokeState,
): RecreadorFlowSmokeView => ({
  applications: buildApplications(state.opportunities, state.invites),
  futureCommitments: buildFutureCommitments(state.opportunities, state.invites),
});

export const validateApplyToOpportunity = (
  state: RecreadorFlowSmokeState,
  opportunityId: string,
): ValidateApplyToOpportunityResult => {
  const target = state.opportunities.find((item) => item.id === opportunityId);

  if (!target) {
    return {
      status: "not-found",
    };
  }

  if (target.lifecycleStatus !== "aberta") {
    return {
      status: "blocked",
      reason: "not-open",
      opportunity: target,
    };
  }

  if (target.applicationStatus === "candidatura-enviada") {
    return {
      status: "already-applied",
      opportunity: target,
    };
  }

  return {
    status: "ready",
    opportunity: target,
    commitmentConflictDetected: detectCriticalScheduleConflict({
      state,
      targetOpportunity: target,
      excludedOpportunityId: target.id,
    }),
  };
};

export const validateInviteStatusTransition = (
  state: RecreadorFlowSmokeState,
  inviteId: string,
  nextStatus: ConviteStatus,
): ValidateInviteStatusResult => {
  const targetInvite = state.invites.find((item) => item.id === inviteId);

  if (!targetInvite) {
    return {
      status: "not-found",
    };
  }

  if (targetInvite.status === nextStatus) {
    return {
      status: "unchanged",
      invite: targetInvite,
    };
  }

  if (nextStatus !== "aceito") {
    return {
      status: "ready",
      invite: targetInvite,
      nextStatus,
      commitmentConflictDetected: false,
    };
  }

  const relatedOpportunity =
    state.opportunities.find((item) => item.id === targetInvite.opportunityId) ?? null;

  if (!relatedOpportunity) {
    return {
      status: "ready",
      invite: targetInvite,
      nextStatus,
      commitmentConflictDetected: false,
    };
  }

  return {
    status: "ready",
    invite: targetInvite,
    nextStatus,
    commitmentConflictDetected: detectCriticalScheduleConflict({
      state,
      targetOpportunity: relatedOpportunity,
      excludedOpportunityId: relatedOpportunity.id,
    }),
  };
};

export const applyToOpportunitySmokeState = (
  state: RecreadorFlowSmokeState,
  opportunityId: string,
): { state: RecreadorFlowSmokeState; result: ApplyToOpportunityResult } => {
  const validation = validateApplyToOpportunity(state, opportunityId);

  if (validation.status === "not-found") {
    return {
      state,
      result: validation,
    };
  }

  if (validation.status === "blocked") {
    return {
      state,
      result: validation,
    };
  }

  if (validation.status === "already-applied") {
    return {
      state,
      result: validation,
    };
  }

  const target = validation.opportunity;
  const inviteAlreadyExists = state.invites.find((item) => item.opportunityId === opportunityId) ?? null;
  const generatedInvite = !inviteAlreadyExists ? createInviteFromOpportunity(target) : null;
  const relatedInvite = generatedInvite ?? inviteAlreadyExists;

  const nextInvites = generatedInvite
    ? [generatedInvite, ...cloneInvites(state.invites)]
    : cloneInvites(state.invites);

  const nextOpportunities = state.opportunities.map((item) => {
    if (item.id !== opportunityId) {
      return { ...item };
    }

    return deriveOpportunityFromInviteStatus(
      {
        ...item,
        applicationStatus: "candidatura-enviada",
      },
      relatedInvite,
    );
  });

  const nextState = syncAvailabilityFromFlow({
    opportunities: nextOpportunities,
    invites: nextInvites,
    availabilitySnapshot: cloneAvailabilitySnapshot(state.availabilitySnapshot),
  });

  const updatedOpportunity = nextOpportunities.find((item) => item.id === opportunityId) ?? target;

  return {
    state: nextState,
    result: {
      status: "applied",
      opportunity: updatedOpportunity,
      generatedInvite,
    },
  };
};

export const updateInviteStatusSmokeState = (
  state: RecreadorFlowSmokeState,
  inviteId: string,
  nextStatus: ConviteStatus,
): { state: RecreadorFlowSmokeState; result: UpdateInviteStatusResult } => {
  const validation = validateInviteStatusTransition(state, inviteId, nextStatus);

  if (validation.status === "not-found") {
    return {
      state,
      result: validation,
    };
  }

  if (validation.status === "unchanged") {
    return {
      state,
      result: validation,
    };
  }

  const target = validation.invite;
  const nowLabel = formatDateLabel(new Date());
  const timelineLabel =
    nextStatus === "aceito"
      ? "Convite aceito"
      : nextStatus === "recusado"
        ? "Convite recusado"
        : "Convite pendente";

  const updatedInvite: ConviteItem = {
    ...target,
    status: nextStatus,
    statusReason:
      nextStatus === "aceito"
        ? "Aceite registrado e compromisso encaminhado para disponibilidade integrada."
        : nextStatus === "recusado"
          ? "Recusa registrada no historico de convites."
          : "Convite aguardando decisao.",
    commitmentPreview:
      nextStatus === "aceito"
        ? target.commitmentPreview ?? "Compromisso integrado na agenda operacional."
        : undefined,
    timeline: [
      ...target.timeline.map((event) => ({ ...event })),
      {
        id: `${target.id}-timeline-${nextStatus}-${Date.now()}`,
        label: timelineLabel,
        dateLabel: nowLabel,
      },
    ],
  };

  const nextInvites = state.invites.map((item) =>
    item.id === inviteId ? updatedInvite : { ...item, timeline: item.timeline.map((event) => ({ ...event })) },
  );

  const nextOpportunities = state.opportunities.map((item) => {
    if (item.id !== target.opportunityId) {
      return { ...item };
    }

    return deriveOpportunityFromInviteStatus(
      {
        ...item,
        applicationStatus: "candidatura-enviada",
      },
      updatedInvite,
    );
  });

  const nextState = syncAvailabilityFromFlow({
    opportunities: nextOpportunities,
    invites: nextInvites,
    availabilitySnapshot: cloneAvailabilitySnapshot(state.availabilitySnapshot),
  });

  return {
    state: nextState,
    result: {
      status: "updated",
      invite: updatedInvite,
      nextStatus,
      commitmentConflictDetected: validation.commitmentConflictDetected,
    },
  };
};

export const saveAvailabilitySmokeState = (
  state: RecreadorFlowSmokeState,
  snapshot: CoreAvailabilitySnapshot,
): RecreadorFlowSmokeState =>
  syncAvailabilityFromFlow({
    opportunities: cloneOpportunities(state.opportunities),
    invites: cloneInvites(state.invites),
    availabilitySnapshot: {
      slots: cloneSlots(snapshot.slots),
      manualBlocks: cloneManualBlocks(snapshot.manualBlocks),
      recurrenceRules: cloneRecurrenceRules(snapshot.recurrenceRules),
      conflicts: snapshot.conflicts.map((item) => ({ ...item })),
    },
  });

const recreadorFlowSlice = createSlice({
  name: "recreadorFlow",
  initialState: createInitialRecreadorFlowSmokeState(),
  reducers: {
    applyToOpportunity(state, action: PayloadAction<{ opportunityId: string }>) {
      const next = applyToOpportunitySmokeState(
        {
          opportunities: cloneOpportunities(state.opportunities),
          invites: cloneInvites(state.invites),
          availabilitySnapshot: cloneAvailabilitySnapshot(state.availabilitySnapshot),
        },
        action.payload.opportunityId,
      ).state;

      state.opportunities = next.opportunities;
      state.invites = next.invites;
      state.availabilitySnapshot = next.availabilitySnapshot;
    },
    updateInviteStatus(state, action: PayloadAction<{ inviteId: string; nextStatus: ConviteStatus }>) {
      const next = updateInviteStatusSmokeState(
        {
          opportunities: cloneOpportunities(state.opportunities),
          invites: cloneInvites(state.invites),
          availabilitySnapshot: cloneAvailabilitySnapshot(state.availabilitySnapshot),
        },
        action.payload.inviteId,
        action.payload.nextStatus,
      ).state;

      state.opportunities = next.opportunities;
      state.invites = next.invites;
      state.availabilitySnapshot = next.availabilitySnapshot;
    },
    saveAvailabilitySnapshot(state, action: PayloadAction<CoreAvailabilitySnapshot>) {
      const next = saveAvailabilitySmokeState(
        {
          opportunities: cloneOpportunities(state.opportunities),
          invites: cloneInvites(state.invites),
          availabilitySnapshot: cloneAvailabilitySnapshot(state.availabilitySnapshot),
        },
        action.payload,
      );

      state.opportunities = next.opportunities;
      state.invites = next.invites;
      state.availabilitySnapshot = next.availabilitySnapshot;
    },
  },
});

export const { applyToOpportunity, updateInviteStatus, saveAvailabilitySnapshot } =
  recreadorFlowSlice.actions;

export default recreadorFlowSlice.reducer;

export const selectRecreadorFlowState = (state: RootState) => state.recreadorFlow;

export const selectRecreadorFlowOpportunities = createSelector(
  [selectRecreadorFlowState],
  (state) => state.opportunities,
);

export const selectRecreadorFlowInvites = createSelector(
  [selectRecreadorFlowState],
  (state) => state.invites,
);

export const selectRecreadorFlowAvailabilitySnapshot = createSelector(
  [selectRecreadorFlowState],
  (state) => state.availabilitySnapshot,
);

export const selectRecreadorFlowApplications = createSelector(
  [selectRecreadorFlowOpportunities, selectRecreadorFlowInvites],
  (opportunities, invites) => buildApplications(opportunities, invites),
);

export const selectRecreadorFlowFutureCommitments = createSelector(
  [selectRecreadorFlowOpportunities, selectRecreadorFlowInvites],
  (opportunities, invites) => buildFutureCommitments(opportunities, invites),
);
