import { recreadorConvitesMock } from "@/modules/recreador/mocks/convites";
import { recreadorOportunidadesMock } from "@/modules/recreador/mocks/oportunidades";

export type AvailabilityPeriod = "manha" | "tarde" | "noite";

export type AvailabilitySlotState =
  | "disponivel"
  | "bloqueio-manual"
  | "bloqueio-compromisso"
  | "conflito";

export type CommitmentOrigin = "convite-aceito" | "oportunidade-confirmada";

export interface AvailabilitySlotItem {
  id: string;
  dateLabel: string;
  weekdayLabel: string;
  period: AvailabilityPeriod;
  startTime: string;
  endTime: string;
  state: AvailabilitySlotState;
  helper: string;
}

export interface ManualBlockItem {
  id: string;
  dateLabel: string;
  period: AvailabilityPeriod;
  startTime: string;
  endTime: string;
  reason: string;
}

export interface RecurrenceRuleItem {
  id: string;
  weekdayLabel: string;
  period: AvailabilityPeriod;
  startTime: string;
  endTime: string;
  mode: "disponivel" | "bloqueado";
  enabled: boolean;
}

export interface FutureCommitmentItem {
  id: string;
  opportunityId: string;
  opportunityCode: string;
  originName: string;
  roleLabel: string;
  dateLabel: string;
  weekdayLabel: string;
  period: AvailabilityPeriod;
  startTime: string;
  endTime: string;
  sourceOrigins: CommitmentOrigin[];
  status: "confirmado" | "pendente-ajuste";
  helper: string;
}

export interface ConflictPreviewItem {
  id: string;
  dateLabel: string;
  startTime: string;
  endTime: string;
  kind: "sobreposicao-parcial" | "sobreposicao-total";
  sourceA: string;
  sourceB: string;
  helper: string;
}

const acceptedInvites = recreadorConvitesMock.items.filter((item) => item.status === "aceito");

const confirmedOpportunities = recreadorOportunidadesMock.items.filter(
  (item) => item.lifecycleStatus === "confirmada",
);

const commitmentScheduleByCode: Record<
  string,
  { dateLabel: string; weekdayLabel: string; period: AvailabilityPeriod; startTime: string; endTime: string }
> = {
  "HTL-003": {
    dateLabel: "18 Mai 2026",
    weekdayLabel: "Segunda-feira",
    period: "noite",
    startTime: "18:00",
    endTime: "22:00",
  },
};

const commitmentsByOpportunity = new Map<string, FutureCommitmentItem>();

confirmedOpportunities.forEach((opportunity) => {
  const schedule = commitmentScheduleByCode[opportunity.code] ?? {
    dateLabel: `${opportunity.startDateLabel} 2026`,
    weekdayLabel: "A definir",
    period: "tarde",
    startTime: "13:00",
    endTime: "17:00",
  };

  commitmentsByOpportunity.set(opportunity.id, {
    id: `commit-${opportunity.id}`,
    opportunityId: opportunity.id,
    opportunityCode: opportunity.code,
    originName: opportunity.originName,
    roleLabel: opportunity.roleLabel,
    dateLabel: schedule.dateLabel,
    weekdayLabel: schedule.weekdayLabel,
    period: schedule.period,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    sourceOrigins: ["oportunidade-confirmada"],
    status: "confirmado",
    helper: "Compromisso vindo de oportunidade confirmada na Fase 3.",
  });
});

acceptedInvites.forEach((invite) => {
  const current = commitmentsByOpportunity.get(invite.opportunityId);

  if (current) {
    commitmentsByOpportunity.set(invite.opportunityId, {
      ...current,
      sourceOrigins: [...current.sourceOrigins, "convite-aceito"],
      helper: "Compromisso pronto para bloqueio automatico futuro (convite aceito + oportunidade confirmada).",
    });
    return;
  }

  commitmentsByOpportunity.set(invite.opportunityId, {
    id: `commit-${invite.id}`,
    opportunityId: invite.opportunityId,
    opportunityCode: invite.opportunityCode,
    originName: invite.originName,
    roleLabel: invite.roleLabel,
    dateLabel: "A definir",
    weekdayLabel: "A definir",
    period: "tarde",
    startTime: "13:00",
    endTime: "17:00",
    sourceOrigins: ["convite-aceito"],
    status: "pendente-ajuste",
    helper: "Convite aceito aguardando janela final para bloqueio automatico.",
  });
});

export const recreadorDisponibilidadeMock = {
  title: "Disponibilidade",
  description:
    "Central operacional para definir disponibilidade manual, bloqueios, recorrencia e conflitos.",
  stats: [],
  intro:
    "A disponibilidade organiza quando voce pode atuar, o que ja esta comprometido e onde existem conflitos para ajuste.",
  stateLegend: [
    {
      id: "disponivel",
      label: "Disponivel",
      helper: "Janela aberta para novas oportunidades.",
    },
    {
      id: "bloqueio-manual",
      label: "Bloqueado manualmente",
      helper: "Bloqueio definido pelo recreador.",
    },
    {
      id: "bloqueio-compromisso",
      label: "Bloqueado por compromisso",
      helper: "Janela reservada por aceite/confirmacao.",
    },
    {
      id: "conflito",
      label: "Conflito detectado",
      helper: "Sobreposicao de janelas que exige ajuste.",
    },
  ],
  slots: [
    {
      id: "slot-1",
      dateLabel: "17 Mai 2026",
      weekdayLabel: "Domingo",
      period: "manha",
      startTime: "08:00",
      endTime: "12:00",
      state: "disponivel",
      helper: "Janela livre para novas candidaturas.",
    },
    {
      id: "slot-2",
      dateLabel: "18 Mai 2026",
      weekdayLabel: "Segunda-feira",
      period: "noite",
      startTime: "18:00",
      endTime: "22:00",
      state: "bloqueio-compromisso",
      helper: "Compromisso confirmado vindo da Fase 3.",
    },
    {
      id: "slot-3",
      dateLabel: "18 Mai 2026",
      weekdayLabel: "Segunda-feira",
      period: "noite",
      startTime: "19:00",
      endTime: "20:30",
      state: "conflito",
      helper: "Bloqueio manual sobrepondo compromisso confirmado.",
    },
    {
      id: "slot-4",
      dateLabel: "19 Mai 2026",
      weekdayLabel: "Terca-feira",
      period: "tarde",
      startTime: "13:00",
      endTime: "17:00",
      state: "bloqueio-manual",
      helper: "Bloqueio pessoal definido pelo recreador.",
    },
  ] as AvailabilitySlotItem[],
  manualBlocks: [
    {
      id: "block-1",
      dateLabel: "18 Mai 2026",
      period: "noite",
      startTime: "19:00",
      endTime: "20:30",
      reason: "Curso presencial",
    },
    {
      id: "block-2",
      dateLabel: "19 Mai 2026",
      period: "tarde",
      startTime: "13:00",
      endTime: "17:00",
      reason: "Bloqueio pessoal",
    },
  ] as ManualBlockItem[],
  recurrenceRules: [
    {
      id: "rec-1",
      weekdayLabel: "Segunda-feira",
      period: "noite",
      startTime: "18:00",
      endTime: "21:00",
      mode: "disponivel",
      enabled: true,
    },
    {
      id: "rec-2",
      weekdayLabel: "Quarta-feira",
      period: "manha",
      startTime: "08:00",
      endTime: "12:00",
      mode: "bloqueado",
      enabled: false,
    },
  ] as RecurrenceRuleItem[],
  futureCommitments: Array.from(commitmentsByOpportunity.values()),
  seededConflictPreview: [
    {
      id: "seed-conflict-1",
      dateLabel: "18 Mai 2026",
      startTime: "19:00",
      endTime: "20:30",
      kind: "sobreposicao-parcial",
      sourceA: "Bloqueio manual",
      sourceB: "Compromisso confirmado",
      helper: "Exemplo de conflito que deve virar bloqueio automatico na camada futura.",
    },
  ] as ConflictPreviewItem[],
} as const;
