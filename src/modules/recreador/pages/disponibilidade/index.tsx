import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Lock,
  Pencil,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useNavigate } from "react-router-dom";
import {
  saveAvailabilitySnapshot as saveAvailabilitySnapshotAction,
  selectRecreadorFlowAvailabilitySnapshot,
  selectRecreadorFlowFutureCommitments,
} from "@/app/store/slices/recreadorFlowSlice";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import {
  recreadorDisponibilidadeMock,
  type AvailabilityPeriod,
  type AvailabilitySlotItem,
  type AvailabilitySlotState,
  type ConflictPreviewItem,
  type FutureCommitmentItem,
  type ManualBlockItem,
  type RecurrenceRuleItem,
} from "@/modules/recreador/mocks/disponibilidade";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { useToast } from "@/shared/ui/Toast";
import * as S from "./styles";

type ManualBlockDraft = {
  dateLabel: string;
  period: AvailabilityPeriod;
  startTime: string;
  endTime: string;
  reason: string;
};

type RecurrenceDraft = {
  weekdayLabel: string;
  period: AvailabilityPeriod;
  startTime: string;
  endTime: string;
  mode: RecurrenceRuleItem["mode"];
  enabled: boolean;
};

type AvailabilitySnapshot = {
  slots: AvailabilitySlotItem[];
  manualBlocks: ManualBlockItem[];
  recurrenceRules: RecurrenceRuleItem[];
  conflicts: ConflictPreviewItem[];
};

type CalendarViewMode = "mes" | "semana";

type CalendarEventTone =
  | "disponivel"
  | "manual"
  | "compromisso"
  | "conflito"
  | "recorrencia"
  | "pendente";

type CalendarEventItem = {
  id: string;
  dateKey: string;
  startTime: string;
  endTime: string;
  title: string;
  note: string;
  tone: CalendarEventTone;
  relatedOpportunityCode?: string;
  isOpportunityRelated: boolean;
};

type DayDetailsState = {
  date: Date;
  events: CalendarEventItem[];
};

type ConfirmActionDraft =
  | {
      kind: "remove-manual-block";
      blockId: string;
      title: string;
      description: string;
      confirmLabel: string;
      tone: "danger" | "primary";
    }
  | {
      kind: "remove-recurrence";
      ruleId: string;
      title: string;
      description: string;
      confirmLabel: string;
      tone: "danger" | "primary";
    }
  | {
      kind: "resolve-conflict";
      conflictId: string;
      title: string;
      description: string;
      confirmLabel: string;
      tone: "danger" | "primary";
    }
  | {
      kind: "discard-changes";
      title: string;
      description: string;
      confirmLabel: string;
      tone: "danger" | "primary";
    };

const slotStateLabel: Record<AvailabilitySlotState, string> = {
  disponivel: "Disponível",
  "bloqueio-manual": "Bloqueio manual",
  "bloqueio-compromisso": "Bloqueio por compromisso",
  conflito: "Conflito",
};

const periodLabel: Record<AvailabilityPeriod, string> = {
  manha: "Manhã",
  tarde: "Tarde",
  noite: "Noite",
};

const weekdayShortLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const weekdayOptions = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const monthShortLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const monthLongLabels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const eventToneLabel: Record<CalendarEventTone, string> = {
  disponivel: "Disponível",
  manual: "Bloqueio manual",
  compromisso: "Compromisso",
  conflito: "Conflito",
  recorrencia: "Recorrência",
  pendente: "Pendente",
};

const eventPriorityLabel: Record<CalendarEventTone, "baixa" | "media" | "alta"> = {
  disponivel: "baixa",
  manual: "media",
  compromisso: "media",
  conflito: "alta",
  recorrencia: "baixa",
  pendente: "alta",
};

const eventPriorityText: Record<"baixa" | "media" | "alta", string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

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

const weekdayIndexByLabel: Record<string, number> = {
  domingo: 0,
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sabado: 6,
};

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const toDateKey = (date: Date) => {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const copyDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, amount: number) => {
  const next = copyDate(date);
  next.setDate(next.getDate() + amount);
  return next;
};

const addMonths = (date: Date, amount: number) => {
  const next = copyDate(date);
  next.setDate(1);
  next.setMonth(next.getMonth() + amount);
  return next;
};

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

const startOfWeek = (date: Date) => addDays(date, -date.getDay());
const endOfWeek = (date: Date) => addDays(startOfWeek(date), 6);

const createMonthSafeDate = (year: number, month: number, day: number) => {
  const maxDay = new Date(year, month + 1, 0).getDate();

  return new Date(year, month, Math.min(day, maxDay));
};

const parseDateKey = (dateKey: string) => {
  const match = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return null;
  }

  const parsed = new Date(year, month, day);

  if (toDateKey(parsed) !== dateKey) {
    return null;
  }

  return parsed;
};

const formatDateLabelFromDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthShortLabels[date.getMonth()];
  const year = String(date.getFullYear());

  return `${day} ${month} ${year}`;
};

const formatDateInputValueFromLabel = (dateLabel: string) => {
  const parsedDate = parseDateLabel(dateLabel);

  return parsedDate ? toDateKey(parsedDate) : "";
};

const formatFullDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const label = formatter.format(date);

  return label.charAt(0).toUpperCase() + label.slice(1);
};

const parseDateLabel = (label: string) => {
  const normalized = normalizeText(label);
  const match = normalized.match(/(\d{1,2})\s+([a-z]{3,})\s+(\d{4})/i);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const monthToken = match[2].slice(0, 3);
  const year = Number(match[3]);
  const monthIndex = monthIndexByLabel[monthToken];

  if (Number.isNaN(day) || Number.isNaN(year) || monthIndex === undefined) {
    return null;
  }

  return new Date(year, monthIndex, day);
};

const getWeekdayIndex = (label: string) => {
  const normalized = normalizeText(label).replace("-feira", "");

  return weekdayIndexByLabel[normalized] ?? null;
};

const getCommitmentTitle = (item: FutureCommitmentItem) => {
  const hasInviteAcceptance = item.sourceOrigins.includes("convite-aceito");
  const hasConfirmedOpportunity = item.sourceOrigins.includes("oportunidade-confirmada");

  if (item.status === "confirmado" && hasInviteAcceptance && hasConfirmedOpportunity) {
    return "Compromisso confirmado (convite + vaga)";
  }

  if (item.status === "confirmado") {
    return "Compromisso confirmado";
  }

  if (hasInviteAcceptance) {
    return "Convite aceito aguardando bloqueio";
  }

  return "Compromisso em definicao";
};

const MANUAL_BLOCK_DRAFT_INITIAL: ManualBlockDraft = {
  dateLabel: "",
  period: "manha",
  startTime: "",
  endTime: "",
  reason: "",
};

const RECURRENCE_DRAFT_INITIAL: RecurrenceDraft = {
  weekdayLabel: "",
  period: "manha",
  startTime: "",
  endTime: "",
  mode: "disponivel",
  enabled: true,
};

const createLocalId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const cloneSlots = (slots: AvailabilitySlotItem[]): AvailabilitySlotItem[] =>
  slots.map((item) => ({ ...item }));

const cloneManualBlocks = (blocks: ManualBlockItem[]): ManualBlockItem[] =>
  blocks.map((item) => ({ ...item }));

const cloneRecurrenceRules = (rules: RecurrenceRuleItem[]): RecurrenceRuleItem[] =>
  rules.map((item) => ({ ...item }));

const cloneConflicts = (conflicts: ConflictPreviewItem[]): ConflictPreviewItem[] =>
  conflicts.map((item) => ({ ...item }));

const hasTimeOverlap = (
  startA: string,
  endA: string,
  startB: string,
  endB: string,
) => startA < endB && startB < endA;

const conflictIdFromManualBlock = (blockId: string) => `conflict-manual-${blockId}`;
const slotIdFromManualBlock = (blockId: string) => `manual-slot-${blockId}`;

export const RecreadorDisponibilidadePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, info, warning } = useToast();
  const availabilitySnapshot = useAppSelector(selectRecreadorFlowAvailabilitySnapshot);
  const futureCommitments = useAppSelector(selectRecreadorFlowFutureCommitments);

  const [savedSnapshot, setSavedSnapshot] = useState<AvailabilitySnapshot>(() => ({
    slots: cloneSlots(availabilitySnapshot.slots),
    manualBlocks: cloneManualBlocks(availabilitySnapshot.manualBlocks),
    recurrenceRules: cloneRecurrenceRules(availabilitySnapshot.recurrenceRules),
    conflicts: cloneConflicts(availabilitySnapshot.conflicts),
  }));

  const [slots, setSlots] = useState<AvailabilitySlotItem[]>(savedSnapshot.slots);
  const [manualBlocks, setManualBlocks] = useState<ManualBlockItem[]>(savedSnapshot.manualBlocks);
  const [recurrenceRules, setRecurrenceRules] = useState<RecurrenceRuleItem[]>(
    savedSnapshot.recurrenceRules,
  );
  const [conflicts, setConflicts] = useState<ConflictPreviewItem[]>(savedSnapshot.conflicts);

  const [manualBlockDraft, setManualBlockDraft] = useState<ManualBlockDraft>(
    MANUAL_BLOCK_DRAFT_INITIAL,
  );
  const [editingManualBlockId, setEditingManualBlockId] = useState<string | null>(null);

  const [calendarViewMode, setCalendarViewMode] = useState<CalendarViewMode>("mes");
  const [calendarCursorDate, setCalendarCursorDate] = useState<Date>(() =>
    parseDateLabel(availabilitySnapshot.slots[0]?.dateLabel ?? "") ?? new Date(),
  );
  const [dayDetailsState, setDayDetailsState] = useState<DayDetailsState | null>(null);

  const [recurrenceDraft, setRecurrenceDraft] = useState<RecurrenceDraft>(RECURRENCE_DRAFT_INITIAL);
  const [editingRecurrenceId, setEditingRecurrenceId] = useState<string | null>(null);
  const [confirmDraft, setConfirmDraft] = useState<ConfirmActionDraft | null>(null);

  const dynamicStats = useMemo(() => {
    const disponiveis = slots.filter((item) => item.state === "disponivel").length;
    const bloqueioManual = slots.filter((item) => item.state === "bloqueio-manual").length;
    const bloqueioCompromisso = slots.filter((item) => item.state === "bloqueio-compromisso").length;
    const conflitosCount = slots.filter((item) => item.state === "conflito").length;

    return [
      { title: "Disponíveis", value: String(disponiveis), helper: "Janelas abertas" },
      { title: "Bloqueio manual", value: String(bloqueioManual), helper: "Definidos por você" },
      {
        title: "Por compromisso",
        value: String(bloqueioCompromisso),
        helper: "Vindos de aceite/confirmação",
      },
      { title: "Conflitos", value: String(conflitosCount), helper: "Sobreposições detectadas" },
    ];
  }, [slots]);

  const visibleRangeStart = useMemo(
    () =>
      calendarViewMode === "mes"
        ? startOfWeek(startOfMonth(calendarCursorDate))
        : startOfWeek(calendarCursorDate),
    [calendarCursorDate, calendarViewMode],
  );

  const visibleRangeEnd = useMemo(
    () =>
      calendarViewMode === "mes"
        ? endOfWeek(endOfMonth(calendarCursorDate))
        : addDays(visibleRangeStart, 6),
    [calendarCursorDate, calendarViewMode, visibleRangeStart],
  );

  const visibleDays = useMemo(() => {
    const days: Date[] = [];
    let cursor = copyDate(visibleRangeStart);

    while (cursor.getTime() <= visibleRangeEnd.getTime()) {
      days.push(cursor);
      cursor = addDays(cursor, 1);
    }

    return days;
  }, [visibleRangeEnd, visibleRangeStart]);

  const visibleDateKeys = useMemo(
    () => new Set(visibleDays.map((day) => toDateKey(day))),
    [visibleDays],
  );

  const todayKey = toDateKey(new Date());
  const calendarCursorDateKey = toDateKey(calendarCursorDate);

  const calendarTitle = useMemo(() => {
    const monthLabel = monthLongLabels[calendarCursorDate.getMonth()];

    return `${monthLabel} ${calendarCursorDate.getFullYear()}`;
  }, [calendarCursorDate]);

  const calendarSubtitle = useMemo(() => {
    if (calendarViewMode === "mes") {
      return "Visao mensal conectada a disponibilidade, conflitos e compromissos operacionais.";
    }

    const weekFormatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    });

    return `Semana de ${weekFormatter.format(visibleRangeStart)} a ${weekFormatter.format(visibleRangeEnd)}.`;
  }, [calendarViewMode, visibleRangeEnd, visibleRangeStart]);

  const commitmentEntries = useMemo(
    () =>
      futureCommitments
        .map((item) => ({
          ...item,
          parsedDate: parseDateLabel(item.dateLabel),
        }))
        .sort((left, right) => {
          if (!left.parsedDate && !right.parsedDate) {
            return 0;
          }

          if (!left.parsedDate) {
            return 1;
          }

          if (!right.parsedDate) {
            return -1;
          }

          return left.parsedDate.getTime() - right.parsedDate.getTime();
        }),
    [futureCommitments],
  );

  const scheduledCommitments = useMemo(
    () => commitmentEntries.filter((item) => item.parsedDate !== null),
    [commitmentEntries],
  );

  const unscheduledCommitments = useMemo(
    () => commitmentEntries.filter((item) => item.parsedDate === null),
    [commitmentEntries],
  );

  const availableYears = useMemo(() => {
    const yearSet = new Set<number>();
    const cursorYear = calendarCursorDate.getFullYear();

    [cursorYear - 2, cursorYear - 1, cursorYear, cursorYear + 1, cursorYear + 2].forEach((year) => {
      yearSet.add(year);
    });

    const addDateLabelYear = (dateLabel: string) => {
      const parsedDate = parseDateLabel(dateLabel);

      if (parsedDate) {
        yearSet.add(parsedDate.getFullYear());
      }
    };

    slots.forEach((item) => addDateLabelYear(item.dateLabel));
    manualBlocks.forEach((item) => addDateLabelYear(item.dateLabel));
    conflicts.forEach((item) => addDateLabelYear(item.dateLabel));
    scheduledCommitments.forEach((item) => addDateLabelYear(item.dateLabel));

    return [...yearSet].sort((left, right) => left - right);
  }, [calendarCursorDate, conflicts, manualBlocks, scheduledCommitments, slots]);

  const calendarEvents = useMemo(() => {
    const events: CalendarEventItem[] = [];
    const conflictWindowKeySet = new Set(
      conflicts.map((item) => `${item.dateLabel}|${item.startTime}|${item.endTime}`),
    );

    slots.forEach((slot) => {
      if (slot.state !== "disponivel") {
        return;
      }

      const parsedDate = parseDateLabel(slot.dateLabel);

      if (!parsedDate) {
        return;
      }

      const toneByState: Record<AvailabilitySlotState, CalendarEventTone> = {
        disponivel: "disponivel",
        "bloqueio-manual": "manual",
        "bloqueio-compromisso": "compromisso",
        conflito: "conflito",
      };

      events.push({
        id: `slot-${slot.id}`,
        dateKey: toDateKey(parsedDate),
        startTime: slot.startTime,
        endTime: slot.endTime,
        title: slotStateLabel[slot.state],
        note: `${periodLabel[slot.period]} · ${slot.helper}`,
        tone: toneByState[slot.state],
        isOpportunityRelated: false,
      });
    });

    manualBlocks.forEach((block) => {
      if (conflictWindowKeySet.has(`${block.dateLabel}|${block.startTime}|${block.endTime}`)) {
        return;
      }

      const parsedDate = parseDateLabel(block.dateLabel);

      if (!parsedDate) {
        return;
      }

      events.push({
        id: `manual-${block.id}`,
        dateKey: toDateKey(parsedDate),
        startTime: block.startTime,
        endTime: block.endTime,
        title: "Bloqueio manual",
        note: `${periodLabel[block.period]} · ${block.reason}`,
        tone: "manual",
        isOpportunityRelated: false,
      });
    });

    conflicts.forEach((conflict) => {
      const parsedDate = parseDateLabel(conflict.dateLabel);

      if (!parsedDate) {
        return;
      }

      events.push({
        id: `conflict-${conflict.id}`,
        dateKey: toDateKey(parsedDate),
        startTime: conflict.startTime,
        endTime: conflict.endTime,
        title: "Conflito da operação",
        note: `${conflict.sourceA} x ${conflict.sourceB}`,
        tone: "conflito",
        isOpportunityRelated: false,
      });
    });

    scheduledCommitments.forEach((item) => {
      if (!item.parsedDate) {
        return;
      }

      events.push({
        id: `commitment-${item.id}`,
        dateKey: toDateKey(item.parsedDate),
        startTime: item.startTime,
        endTime: item.endTime,
        title: getCommitmentTitle(item),
        note: `${item.opportunityCode} · ${item.roleLabel}`,
        tone: item.status === "confirmado" ? "compromisso" : "pendente",
        relatedOpportunityCode: item.opportunityCode,
        isOpportunityRelated: true,
      });
    });

    return events;
  }, [conflicts, manualBlocks, scheduledCommitments, slots]);

  const recurrenceEvents = useMemo(() => {
    const events: CalendarEventItem[] = [];

    recurrenceRules.forEach((rule) => {
      if (!rule.enabled) {
        return;
      }

      const recurrenceWeekday = getWeekdayIndex(rule.weekdayLabel);

      if (recurrenceWeekday === null) {
        return;
      }

      visibleDays.forEach((day) => {
        if (day.getDay() !== recurrenceWeekday) {
          return;
        }

        events.push({
          id: `recurrence-${rule.id}-${toDateKey(day)}`,
          dateKey: toDateKey(day),
          startTime: rule.startTime,
          endTime: rule.endTime,
          title:
            rule.mode === "bloqueado"
              ? "Recorrência: bloqueio"
              : "Recorrência: disponibilidade",
          note: `${rule.weekdayLabel} · ${periodLabel[rule.period]}`,
          tone: "recorrencia",
          isOpportunityRelated: false,
        });
      });
    });

    return events;
  }, [recurrenceRules, visibleDays]);

  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, CalendarEventItem[]>();

    const appendEvent = (event: CalendarEventItem) => {
      if (!visibleDateKeys.has(event.dateKey)) {
        return;
      }

      const current = grouped.get(event.dateKey);

      if (current) {
        current.push(event);
        return;
      }

      grouped.set(event.dateKey, [event]);
    };

    calendarEvents.forEach(appendEvent);
    recurrenceEvents.forEach(appendEvent);

    grouped.forEach((items, key) => {
      grouped.set(
        key,
        [...items].sort((left, right) => left.startTime.localeCompare(right.startTime)),
      );
    });

    return grouped;
  }, [calendarEvents, recurrenceEvents, visibleDateKeys]);

  const handlePreviousCalendarPeriod = () => {
    setCalendarCursorDate((current) =>
      calendarViewMode === "mes" ? addMonths(current, -1) : addDays(current, -7),
    );
  };

  const handleNextCalendarPeriod = () => {
    setCalendarCursorDate((current) =>
      calendarViewMode === "mes" ? addMonths(current, 1) : addDays(current, 7),
    );
  };

  const handleGoToCurrentDate = () => {
    setCalendarCursorDate(new Date());
  };

  const handleSelectMonth = (monthIndex: number) => {
    setCalendarCursorDate((current) =>
      createMonthSafeDate(current.getFullYear(), monthIndex, current.getDate()),
    );
  };

  const handleSelectYear = (year: number) => {
    setCalendarCursorDate((current) =>
      createMonthSafeDate(year, current.getMonth(), current.getDate()),
    );
  };

  const handleSelectFocusDay = (dateKey: string) => {
    const parsedDate = parseDateKey(dateKey);

    if (!parsedDate) {
      return;
    }

    setCalendarCursorDate(parsedDate);
  };

  const handleOpenDayDetails = (date: Date, events: CalendarEventItem[]) => {
    setDayDetailsState({
      date: copyDate(date),
      events: [...events].sort((left, right) => left.startTime.localeCompare(right.startTime)),
    });
  };

  const handleCloseDayDetails = () => {
    setDayDetailsState(null);
  };

  const handleOpenRelatedOpportunity = (opportunityCode: string) => {
    navigate(`/app/recreador/oportunidades?codigo=${encodeURIComponent(opportunityCode)}`);
  };

  const resetManualBlockDraft = () => {
    setManualBlockDraft(MANUAL_BLOCK_DRAFT_INITIAL);
    setEditingManualBlockId(null);
  };

  const resetRecurrenceDraft = () => {
    setRecurrenceDraft(RECURRENCE_DRAFT_INITIAL);
    setEditingRecurrenceId(null);
  };

  const applySnapshot = (snapshot: AvailabilitySnapshot) => {
    setSlots(cloneSlots(snapshot.slots));
    setManualBlocks(cloneManualBlocks(snapshot.manualBlocks));
    setRecurrenceRules(cloneRecurrenceRules(snapshot.recurrenceRules));
    setConflicts(cloneConflicts(snapshot.conflicts));
  };

  const handleCancelConfirmDraft = () => {
    setConfirmDraft(null);
    info({
      title: "Ação cancelada",
      description: "Nenhuma alteração foi aplicada.",
    });
  };

  const handleConfirmDraft = () => {
    if (!confirmDraft) {
      return;
    }

    switch (confirmDraft.kind) {
      case "remove-manual-block":
        executeRemoveManualBlock(confirmDraft.blockId);
        break;
      case "remove-recurrence":
        executeRemoveRecurrence(confirmDraft.ruleId);
        break;
      case "resolve-conflict":
        executeResolveConflict(confirmDraft.conflictId);
        break;
      case "discard-changes":
        executeDiscardChanges();
        break;
      default:
        break;
    }

    setConfirmDraft(null);
  };

  const handleSaveManualBlock = () => {
    const dateKey = manualBlockDraft.dateLabel.trim();
    const startTime = manualBlockDraft.startTime.trim();
    const endTime = manualBlockDraft.endTime.trim();
    const reason = manualBlockDraft.reason.trim();
    const parsedDate = parseDateKey(dateKey);

    if (!parsedDate || !startTime || !endTime || !reason) {
      warning({
        title: "Bloqueio incompleto",
        description: "Preencha data válida, horário inicial, horário final e motivo do bloqueio.",
      });
      return;
    }

    if (startTime >= endTime) {
      warning({
        title: "Horário inválido",
        description: "O horário inicial deve ser menor que o horário final.",
      });
      return;
    }

    const dateLabel = formatDateLabelFromDate(parsedDate);

    const updatedBlock: ManualBlockItem = {
      id: editingManualBlockId ?? createLocalId("block"),
      dateLabel,
      period: manualBlockDraft.period,
      startTime,
      endTime,
      reason,
    };

    const previousBlock = editingManualBlockId
      ? manualBlocks.find((item) => item.id === editingManualBlockId) ?? null
      : null;

    const nextManualBlocks = editingManualBlockId
      ? manualBlocks.map((item) => (item.id === editingManualBlockId ? updatedBlock : item))
      : [...manualBlocks, updatedBlock];

    const nextSlots = cloneSlots(slots);
    const slotId = slotIdFromManualBlock(updatedBlock.id);

    const previousSlotIndex = nextSlots.findIndex((item) => {
      if (item.id === slotId) {
        return true;
      }

      if (!previousBlock) {
        return false;
      }

      return (
        item.state !== "bloqueio-compromisso" &&
        item.dateLabel === previousBlock.dateLabel &&
        item.startTime === previousBlock.startTime &&
        item.endTime === previousBlock.endTime
      );
    });

    const commitmentOverlap = nextSlots.find(
      (item) =>
        item.state === "bloqueio-compromisso" &&
        item.dateLabel === updatedBlock.dateLabel &&
        hasTimeOverlap(item.startTime, item.endTime, updatedBlock.startTime, updatedBlock.endTime),
    );

    const nextSlotState: AvailabilitySlotState = commitmentOverlap ? "conflito" : "bloqueio-manual";
    const nextSlotHelper = commitmentOverlap
      ? "Bloqueio manual em conflito com compromisso confirmado."
      : "Bloqueio manual definido na interface.";

    const nextSlot: AvailabilitySlotItem = {
      id: slotId,
      dateLabel: updatedBlock.dateLabel,
      weekdayLabel: "Dia configurado",
      period: updatedBlock.period,
      startTime: updatedBlock.startTime,
      endTime: updatedBlock.endTime,
      state: nextSlotState,
      helper: nextSlotHelper,
    };

    if (previousSlotIndex >= 0) {
      nextSlots[previousSlotIndex] = nextSlot;
    } else {
      nextSlots.push(nextSlot);
    }

    let nextConflicts = cloneConflicts(conflicts).filter((item) => item.id !== conflictIdFromManualBlock(updatedBlock.id));

    if (commitmentOverlap) {
      nextConflicts = [
        ...nextConflicts,
        {
          id: conflictIdFromManualBlock(updatedBlock.id),
          dateLabel: updatedBlock.dateLabel,
          startTime: updatedBlock.startTime,
          endTime: updatedBlock.endTime,
          kind: "sobreposicao-parcial",
          sourceA: "Bloqueio manual",
          sourceB: "Compromisso confirmado",
          helper: "Conflito detectado entre bloqueio manual e compromisso confirmado.",
        },
      ];
    }

    setManualBlocks(nextManualBlocks);
    setSlots(nextSlots);
    setConflicts(nextConflicts);

    if (commitmentOverlap) {
      warning({
        title: "Bloqueio salvo com conflito",
        description: "O bloqueio foi salvo e marcado como conflito para revisao imediata.",
      });
    } else {
      success({
        title: editingManualBlockId ? "Bloqueio atualizado" : "Bloqueio criado",
        description: "Bloqueio manual salvo na agenda operacional.",
      });
    }

    resetManualBlockDraft();
  };

  const handleEditManualBlock = (item: ManualBlockItem) => {
    setEditingManualBlockId(item.id);
    setManualBlockDraft({
      dateLabel: formatDateInputValueFromLabel(item.dateLabel),
      period: item.period,
      startTime: item.startTime,
      endTime: item.endTime,
      reason: item.reason,
    });
  };

  const executeRemoveManualBlock = (blockId: string) => {
    const target = manualBlocks.find((item) => item.id === blockId);

    if (!target) {
      warning({
        title: "Bloqueio indisponível",
        description: "Não foi possível localizar este bloqueio para remoção.",
      });
      return;
    }

    setManualBlocks((previous) => previous.filter((item) => item.id !== blockId));

    setSlots((previous) =>
      previous
        .map((item) => {
          if (item.id === slotIdFromManualBlock(blockId)) {
            return null;
          }

          const sameWindow =
            item.dateLabel === target.dateLabel &&
            item.startTime === target.startTime &&
            item.endTime === target.endTime;

          if (sameWindow && item.state !== "bloqueio-compromisso") {
            return {
              ...item,
              state: "disponivel",
              helper: "Janela liberada após remoção do bloqueio manual.",
            };
          }

          return item;
        })
        .filter((item): item is AvailabilitySlotItem => item !== null),
    );

    setConflicts((previous) =>
      previous.filter(
        (item) =>
          item.id !== conflictIdFromManualBlock(blockId) &&
          !(
            item.dateLabel === target.dateLabel &&
            item.startTime === target.startTime &&
            item.endTime === target.endTime
          ),
      ),
    );

    if (editingManualBlockId === blockId) {
      resetManualBlockDraft();
    }

    info({
      title: "Bloqueio removido",
      description: "Bloqueio manual removido da agenda operacional.",
    });
  };

  const handleRemoveManualBlock = (blockId: string) => {
    const target = manualBlocks.find((item) => item.id === blockId);

    if (!target) {
      warning({
        title: "Bloqueio indisponível",
        description: "Não foi possível localizar este bloqueio para remoção.",
      });
      return;
    }

    setConfirmDraft({
      kind: "remove-manual-block",
      blockId,
      title: "Remover bloqueio manual",
      description: `${target.dateLabel} · ${target.startTime}-${target.endTime}. Esta ação remove o bloqueio e libera a janela.`,
      confirmLabel: "Confirmar remoção",
      tone: "danger",
    });
  };

  const handleSaveRecurrence = () => {
    const weekdayLabel = recurrenceDraft.weekdayLabel.trim();
    const startTime = recurrenceDraft.startTime.trim();
    const endTime = recurrenceDraft.endTime.trim();

    if (!weekdayLabel || !startTime || !endTime) {
      warning({
        title: "Recorrência incompleta",
        description: "Preencha dia da semana e horário para salvar a recorrência.",
      });
      return;
    }

    if (startTime >= endTime) {
      warning({
        title: "Horário inválido",
        description: "O horário inicial deve ser menor que o horário final.",
      });
      return;
    }

    const nextRule: RecurrenceRuleItem = {
      id: editingRecurrenceId ?? createLocalId("rec"),
      weekdayLabel,
      period: recurrenceDraft.period,
      startTime,
      endTime,
      mode: recurrenceDraft.mode,
      enabled: recurrenceDraft.enabled,
    };

    setRecurrenceRules((previous) =>
      editingRecurrenceId
        ? previous.map((item) => (item.id === editingRecurrenceId ? nextRule : item))
        : [...previous, nextRule],
    );

    success({
      title: editingRecurrenceId ? "Recorrência atualizada" : "Recorrência criada",
      description: "Regra de recorrência salva na configuração atual.",
    });

    resetRecurrenceDraft();
  };

  const handleEditRecurrence = (item: RecurrenceRuleItem) => {
    setEditingRecurrenceId(item.id);
    setRecurrenceDraft({
      weekdayLabel: item.weekdayLabel,
      period: item.period,
      startTime: item.startTime,
      endTime: item.endTime,
      mode: item.mode,
      enabled: item.enabled,
    });
  };

  const executeRemoveRecurrence = (ruleId: string) => {
    const target = recurrenceRules.find((item) => item.id === ruleId);

    if (!target) {
      warning({
        title: "Recorrência indisponível",
        description: "Não foi possível localizar esta regra para remoção.",
      });
      return;
    }

    setRecurrenceRules((previous) => previous.filter((item) => item.id !== ruleId));

    if (editingRecurrenceId === ruleId) {
      resetRecurrenceDraft();
    }

    info({
      title: "Recorrência removida",
      description: "A regra foi removida da configuração atual.",
    });
  };

  const handleRemoveRecurrence = (ruleId: string) => {
    const target = recurrenceRules.find((item) => item.id === ruleId);

    if (!target) {
      warning({
        title: "Recorrência indisponível",
        description: "Não foi possível localizar esta regra para remoção.",
      });
      return;
    }

    setConfirmDraft({
      kind: "remove-recurrence",
      ruleId,
      title: "Remover recorrência",
      description: `${target.weekdayLabel} · ${target.startTime}-${target.endTime}. Esta ação remove a regra da configuração atual.`,
      confirmLabel: "Confirmar remoção",
      tone: "danger",
    });
  };

  const handleToggleRecurrence = (ruleId: string) => {
    const targetRule = recurrenceRules.find((item) => item.id === ruleId);

    if (!targetRule) {
      warning({
        title: "Regra indisponível",
        description: "Não foi possível localizar esta regra de recorrência.",
      });
      return;
    }

    setRecurrenceRules((previous) =>
      previous.map((item) =>
        item.id === ruleId
          ? {
              ...item,
              enabled: !item.enabled,
            }
          : item,
      ),
    );

    info({
      title: targetRule.enabled ? "Recorrência desativada" : "Recorrência ativada",
      description: `${targetRule.weekdayLabel} ${targetRule.startTime}-${targetRule.endTime} atualizado.`,
    });
  };

  const executeResolveConflict = (conflictId: string) => {
    const target = conflicts.find((item) => item.id === conflictId);

    if (!target) {
      warning({
        title: "Conflito indisponível",
        description: "Não foi possível localizar o conflito para resolução.",
      });
      return;
    }

    setConflicts((previous) => previous.filter((item) => item.id !== conflictId));

    setSlots((previous) =>
      previous.map((item) => {
        const sameWindow =
          item.dateLabel === target.dateLabel &&
          item.startTime === target.startTime &&
          item.endTime === target.endTime;

        if (sameWindow && item.state === "conflito") {
          return {
            ...item,
            state: "bloqueio-compromisso",
            helper: "Conflito resolvido priorizando o compromisso confirmado.",
          };
        }

        return item;
      }),
    );

    setManualBlocks((previous) =>
      previous.filter(
        (item) =>
          !(
            item.dateLabel === target.dateLabel &&
            item.startTime === target.startTime &&
            item.endTime === target.endTime
          ),
      ),
    );

    success({
      title: "Conflito resolvido",
      description: "O conflito foi ajustado e o compromisso confirmado foi mantido.",
    });
  };

  const handleResolveConflict = (conflictId: string) => {
    const target = conflicts.find((item) => item.id === conflictId);

    if (!target) {
      warning({
        title: "Conflito indisponível",
        description: "Não foi possível localizar o conflito para resolução.",
      });
      return;
    }

    setConfirmDraft({
      kind: "resolve-conflict",
      conflictId,
      title: "Resolver conflito operacional",
      description:
        "Esta ação prioriza o compromisso confirmado e remove o bloqueio manual sobreposto deste período.",
      confirmLabel: "Resolver conflito",
      tone: "primary",
    });
  };

  const handleSimulateConflictCheck = () => {
    const conflictSlots = slots.filter((item) => item.state === "conflito");

    if (conflictSlots.length === 0) {
      success({
        title: "Sem conflitos",
        description: "Nenhum conflito detectado na verificação atual.",
      });
      return;
    }

    setConflicts((previous) => {
      const existingIds = new Set(previous.map((item) => item.id));

      const generated = conflictSlots
        .filter((slot) => !existingIds.has(`conflict-${slot.id}`))
        .map((slot) => ({
          id: `conflict-${slot.id}`,
          dateLabel: slot.dateLabel,
          startTime: slot.startTime,
          endTime: slot.endTime,
          kind: "sobreposicao-parcial" as const,
          sourceA: "Bloqueio manual",
          sourceB: "Compromisso confirmado",
          helper: "Conflito detectado por sobreposição de janelas.",
        }));

      return [...previous, ...generated];
    });

    warning({
      title: "Conflitos revisados",
      description: "Conflitos identificados e mantidos para ajuste operacional.",
    });
  };

  const handleSalvar = () => {
    const snapshot: AvailabilitySnapshot = {
      slots: cloneSlots(slots),
      manualBlocks: cloneManualBlocks(manualBlocks),
      recurrenceRules: cloneRecurrenceRules(recurrenceRules),
      conflicts: cloneConflicts(conflicts),
    };

    setSavedSnapshot(snapshot);
    dispatch(saveAvailabilitySnapshotAction(snapshot));
    dispatch(
      setLastVisualAction(
        "Disponibilidade atualizada com bloqueios, recorrência e compromissos.",
      ),
    );
    success({
      title: "Disponibilidade salva",
      description: "Bloqueios, recorrências e conflitos foram salvos.",
    });
  };

  const executeDiscardChanges = () => {
    applySnapshot(savedSnapshot);
    resetManualBlockDraft();
    resetRecurrenceDraft();
    info({
      title: "Alterações descartadas",
      description: "Disponibilidade restaurada para o último estado salvo.",
    });
  };

  const handleCancelarAlteracoes = () => {
    const currentSnapshot: AvailabilitySnapshot = {
      slots: cloneSlots(slots),
      manualBlocks: cloneManualBlocks(manualBlocks),
      recurrenceRules: cloneRecurrenceRules(recurrenceRules),
      conflicts: cloneConflicts(conflicts),
    };

    const hasSnapshotChanges =
      JSON.stringify(currentSnapshot) !== JSON.stringify(savedSnapshot);
    const hasDraftChanges =
      manualBlockDraft.dateLabel.trim().length > 0 ||
      manualBlockDraft.startTime.trim().length > 0 ||
      manualBlockDraft.endTime.trim().length > 0 ||
      manualBlockDraft.reason.trim().length > 0 ||
      editingManualBlockId !== null ||
      recurrenceDraft.weekdayLabel.trim().length > 0 ||
      recurrenceDraft.startTime.trim().length > 0 ||
      recurrenceDraft.endTime.trim().length > 0 ||
      editingRecurrenceId !== null;

    if (!(hasSnapshotChanges || hasDraftChanges)) {
      executeDiscardChanges();
      return;
    }

    setConfirmDraft({
      kind: "discard-changes",
      title: "Descartar alterações não salvas",
      description:
        "As alterações atuais em bloqueios, recorrências e conflitos serão perdidas e o último estado salvo será restaurado.",
      confirmLabel: "Descartar alterações",
      tone: "danger",
    });
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorDisponibilidadeMock.title}
      pageDescription={recreadorDisponibilidadeMock.description}
      stats={dynamicStats}
    >
      <S.Wrapper>
        <S.AgendaStage>
          <S.CalendarToolbar>
            <S.CalendarTitleWrap>
              <h2>
                <CalendarClock size={18} /> Agenda operacional
              </h2>
              <strong>{calendarTitle}</strong>
              <p>{calendarSubtitle}</p>
            </S.CalendarTitleWrap>

            <S.CalendarControls>
              <S.ViewSwitch>
                <S.ViewButton
                  type="button"
                  $active={calendarViewMode === "mes"}
                  onClick={() => setCalendarViewMode("mes")}
                >
                  Mes
                </S.ViewButton>
                <S.ViewButton
                  type="button"
                  $active={calendarViewMode === "semana"}
                  onClick={() => setCalendarViewMode("semana")}
                >
                  Semana
                </S.ViewButton>
              </S.ViewSwitch>

              <S.CalendarNav>
                <S.CalendarNavButton type="button" onClick={handlePreviousCalendarPeriod}>
                  <ChevronLeft size={15} />
                </S.CalendarNavButton>
                <S.CalendarNavButton type="button" onClick={handleGoToCurrentDate} $highlight>
                  Hoje
                </S.CalendarNavButton>
                <S.CalendarNavButton type="button" onClick={handleNextCalendarPeriod}>
                  <ChevronRight size={15} />
                </S.CalendarNavButton>
              </S.CalendarNav>
            </S.CalendarControls>
          </S.CalendarToolbar>

          <S.CalendarPeriodBar>
            <S.PeriodField>
              <span>Mes</span>
              <select
                value={calendarCursorDate.getMonth()}
                onChange={(event) => handleSelectMonth(Number(event.target.value))}
              >
                {monthLongLabels.map((label, monthIndex) => (
                  <option key={label} value={monthIndex}>
                    {label}
                  </option>
                ))}
              </select>
            </S.PeriodField>

            <S.PeriodField>
              <span>Ano</span>
              <select
                value={calendarCursorDate.getFullYear()}
                onChange={(event) => handleSelectYear(Number(event.target.value))}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </S.PeriodField>

            <S.PeriodField>
              <span>Dia foco</span>
              <input
                type="date"
                value={calendarCursorDateKey}
                onChange={(event) => handleSelectFocusDay(event.target.value)}
              />
            </S.PeriodField>
          </S.CalendarPeriodBar>

          <S.CalendarStatusRow>
            <S.CalendarStatusBadge $tone="warning">
              {conflicts.length} {conflicts.length === 1 ? "conflito ativo" : "conflitos ativos"}
            </S.CalendarStatusBadge>
            <S.CalendarStatusBadge $tone="info">
              {scheduledCommitments.length} compromisso(s) confirmado(s)
            </S.CalendarStatusBadge>
            <S.CalendarStatusBadge $tone="success">
              {recurrenceRules.filter((item) => item.enabled).length} recorrência(s) ativa(s)
            </S.CalendarStatusBadge>
            {unscheduledCommitments.length > 0 ? (
              <S.CalendarStatusBadge $tone="neutral">
                {unscheduledCommitments.length} compromisso(s) aguardando definição de data
              </S.CalendarStatusBadge>
            ) : null}

            {conflicts.length > 0 ? (
              <S.CalendarQuickAction type="button" onClick={handleSimulateConflictCheck}>
                Revisar conflitos
              </S.CalendarQuickAction>
            ) : null}
          </S.CalendarStatusRow>

          <S.MonthWeekHeaderRow>
            {weekdayShortLabels.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </S.MonthWeekHeaderRow>

          <S.CalendarGrid $mode={calendarViewMode}>
            {visibleDays.map((day) => {
              const dayKey = toDateKey(day);
              const dayEvents = eventsByDate.get(dayKey) ?? [];
              const isOutsideMonth =
                calendarViewMode === "mes" && day.getMonth() !== calendarCursorDate.getMonth();
              const isToday = dayKey === todayKey;
              const firstEvent = dayEvents[0] ?? null;
              const extraEventsCount = firstEvent ? dayEvents.length - 1 : 0;
              const hasConflict = dayEvents.some((event) => event.tone === "conflito");
              const hasHighPriority = dayEvents.some(
                (event) => eventPriorityLabel[event.tone] === "alta",
              );

              return (
                <S.CalendarDayCell
                  key={`${dayKey}-${calendarViewMode}`}
                  $outside={isOutsideMonth}
                  $today={isToday}
                  $mode={calendarViewMode}
                >
                  <S.DayCellHeader>
                    <S.DayCellDate>
                      <strong>{day.getDate()}</strong>
                      <span>{weekdayShortLabels[day.getDay()]}</span>
                    </S.DayCellDate>

                    {hasConflict ? (
                      <S.DayFlagBadge $tone="warning">Conflito</S.DayFlagBadge>
                    ) : hasHighPriority ? (
                      <S.DayFlagBadge $tone="info">Prioritário</S.DayFlagBadge>
                    ) : null}
                  </S.DayCellHeader>

                  <S.DayEventList>
                    {firstEvent === null ? (
                      <S.DayEventEmpty>Sem agenda configurada.</S.DayEventEmpty>
                    ) : (
                      <S.DayEventItem
                        key={firstEvent.id}
                        $tone={firstEvent.tone}
                        $interactive={firstEvent.isOpportunityRelated && Boolean(firstEvent.relatedOpportunityCode)}
                        role={
                          firstEvent.isOpportunityRelated && firstEvent.relatedOpportunityCode
                            ? "button"
                            : undefined
                        }
                        tabIndex={
                          firstEvent.isOpportunityRelated && firstEvent.relatedOpportunityCode
                            ? 0
                            : undefined
                        }
                        onClick={() => {
                          if (firstEvent.relatedOpportunityCode) {
                            handleOpenRelatedOpportunity(firstEvent.relatedOpportunityCode);
                          }
                        }}
                        onKeyDown={(event) => {
                          if (!firstEvent.relatedOpportunityCode) {
                            return;
                          }

                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            handleOpenRelatedOpportunity(firstEvent.relatedOpportunityCode);
                          }
                        }}
                      >
                        <S.DayEventTop>
                          <S.DayEventTime>
                            {firstEvent.startTime} - {firstEvent.endTime}
                          </S.DayEventTime>
                          <S.DayToneBadge $tone={firstEvent.tone}>
                            {eventToneLabel[firstEvent.tone]}
                          </S.DayToneBadge>
                        </S.DayEventTop>
                        <p>{firstEvent.title}</p>
                        <small>{firstEvent.note}</small>
                      </S.DayEventItem>
                    )}

                    {extraEventsCount > 0 ? (
                      <S.DayEventOverflowButton
                        type="button"
                        onClick={() => handleOpenDayDetails(day, dayEvents)}
                      >
                        Ver tudo do dia (+{extraEventsCount})
                      </S.DayEventOverflowButton>
                    ) : firstEvent ? (
                      <S.DayEventOverflowButton
                        type="button"
                        onClick={() => handleOpenDayDetails(day, dayEvents)}
                      >
                        Abrir detalhes
                      </S.DayEventOverflowButton>
                    ) : null}
                  </S.DayEventList>
                </S.CalendarDayCell>
              );
            })}
          </S.CalendarGrid>

          <S.ConflictSupportCard>
            <S.ConflictSupportHeader>
              <div>
                <h3>
                  <AlertTriangle size={16} /> Conflitos operacionais
                </h3>
                <p>
                  Revise sobreposições entre bloqueios e compromissos para manter a agenda válida antes de novos aceites.
                </p>
              </div>

              <S.CalendarQuickAction type="button" onClick={handleSimulateConflictCheck}>
                Atualizar leitura
              </S.CalendarQuickAction>
            </S.ConflictSupportHeader>

            {conflicts.length === 0 ? (
              <S.EmptyState>Nenhum conflito ativo nesta visualização.</S.EmptyState>
            ) : (
              <S.ConflictSupportList>
                {conflicts.slice(0, 3).map((item) => (
                  <S.ConflictSupportItem key={item.id}>
                    <strong>
                      {item.dateLabel} · {item.startTime}-{item.endTime}
                    </strong>
                    <span>{item.sourceA} x {item.sourceB}</span>

                    <S.RowButtons>
                      <S.SecondaryButton
                        type="button"
                        onClick={() => {
                          const dateKey = formatDateInputValueFromLabel(item.dateLabel);

                          if (dateKey) {
                            handleSelectFocusDay(dateKey);
                          }
                        }}
                      >
                        Focar dia
                      </S.SecondaryButton>
                      <S.SecondaryButton type="button" onClick={() => handleResolveConflict(item.id)}>
                        Resolver conflito
                      </S.SecondaryButton>
                    </S.RowButtons>
                  </S.ConflictSupportItem>
                ))}
              </S.ConflictSupportList>
            )}
          </S.ConflictSupportCard>
        </S.AgendaStage>

        <S.ToolsGrid>
          <S.SectionCard>
            <S.SectionTitle>
              <Lock size={16} /> Bloqueios manuais
            </S.SectionTitle>

            <S.FormGrid>
              <S.FormField>
                <span>Data</span>
                <input
                  type="date"
                  value={manualBlockDraft.dateLabel}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      dateLabel: event.target.value,
                    }))
                  }
                />
              </S.FormField>

              <S.FormField>
                <span>Período</span>
                <select
                  value={manualBlockDraft.period}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      period: event.target.value as AvailabilityPeriod,
                    }))
                  }
                >
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                </select>
              </S.FormField>

              <S.FormField>
                <span>Inicio</span>
                <input
                  type="time"
                  step={900}
                  value={manualBlockDraft.startTime}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      startTime: event.target.value,
                    }))
                  }
                />
              </S.FormField>

              <S.FormField>
                <span>Fim</span>
                <input
                  type="time"
                  step={900}
                  value={manualBlockDraft.endTime}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      endTime: event.target.value,
                    }))
                  }
                />
              </S.FormField>

              <S.FormField>
                <span>Motivo</span>
                <input
                  value={manualBlockDraft.reason}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      reason: event.target.value,
                    }))
                  }
                  placeholder="Compromisso pessoal"
                />
              </S.FormField>
            </S.FormGrid>

            <S.RowButtons>
              <S.SecondaryButton type="button" onClick={handleSaveManualBlock}>
                <Plus size={14} /> {editingManualBlockId ? "Atualizar bloqueio" : "Criar bloqueio"}
              </S.SecondaryButton>
              {editingManualBlockId ? (
                <S.SecondaryButton type="button" onClick={resetManualBlockDraft}>
                  <X size={14} /> Cancelar edição
                </S.SecondaryButton>
              ) : null}
            </S.RowButtons>

            {manualBlocks.length === 0 ? (
              <S.EmptyState>
                Nenhum bloqueio manual cadastrado. Use o formulário para reservar janelas indisponíveis.
              </S.EmptyState>
            ) : (
              <S.ItemList>
                {manualBlocks.map((item) => (
                  <S.ItemCard key={item.id}>
                    <strong>{item.dateLabel}</strong>
                    <S.MetaText>
                      {periodLabel[item.period]} · {item.startTime} - {item.endTime}
                    </S.MetaText>
                    <S.MetaText>{item.reason}</S.MetaText>
                    <S.ItemActions>
                      <S.SecondaryButton type="button" onClick={() => handleEditManualBlock(item)}>
                        <Pencil size={14} /> Editar
                      </S.SecondaryButton>
                      <S.DangerButton type="button" onClick={() => handleRemoveManualBlock(item.id)}>
                        <Trash2 size={14} /> Remover
                      </S.DangerButton>
                    </S.ItemActions>
                  </S.ItemCard>
                ))}
              </S.ItemList>
            )}
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionTitle>
              <RefreshCcw size={16} /> Recorrência
            </S.SectionTitle>

            <S.FormGrid>
              <S.FormField>
                <span>Dia da semana</span>
                <select
                  value={recurrenceDraft.weekdayLabel}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      weekdayLabel: event.target.value,
                    }))
                  }
                >
                  <option value="">Selecione um dia</option>
                  {weekdayOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </S.FormField>

              <S.FormField>
                <span>Período</span>
                <select
                  value={recurrenceDraft.period}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      period: event.target.value as AvailabilityPeriod,
                    }))
                  }
                >
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                </select>
              </S.FormField>

              <S.FormField>
                <span>Inicio</span>
                <input
                  type="time"
                  step={900}
                  value={recurrenceDraft.startTime}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      startTime: event.target.value,
                    }))
                  }
                />
              </S.FormField>

              <S.FormField>
                <span>Fim</span>
                <input
                  type="time"
                  step={900}
                  value={recurrenceDraft.endTime}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      endTime: event.target.value,
                    }))
                  }
                />
              </S.FormField>

              <S.FormField>
                <span>Modo</span>
                <select
                  value={recurrenceDraft.mode}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      mode: event.target.value as RecurrenceRuleItem["mode"],
                    }))
                  }
                >
                  <option value="disponivel">Disponível</option>
                  <option value="bloqueado">Bloqueado</option>
                </select>
              </S.FormField>
            </S.FormGrid>

            <S.RowButtons>
              <S.SecondaryButton type="button" onClick={handleSaveRecurrence}>
                <Plus size={14} /> {editingRecurrenceId ? "Atualizar recorrência" : "Criar recorrência"}
              </S.SecondaryButton>
              {editingRecurrenceId ? (
                <S.SecondaryButton type="button" onClick={resetRecurrenceDraft}>
                  <X size={14} /> Cancelar edição
                </S.SecondaryButton>
              ) : null}
            </S.RowButtons>

            {recurrenceRules.length === 0 ? (
              <S.EmptyState>
                Nenhuma recorrência configurada. Crie regras para evitar ajustes repetitivos de agenda.
              </S.EmptyState>
            ) : (
              <S.ItemList>
                {recurrenceRules.map((item) => (
                  <S.ItemCard key={item.id}>
                    <strong>{item.weekdayLabel}</strong>
                    <S.MetaText>
                      {periodLabel[item.period]} · {item.startTime} - {item.endTime}
                    </S.MetaText>
                    <S.MetaText>
                      {item.mode === "disponivel" ? "Recorrência de disponibilidade" : "Recorrência de bloqueio"}
                    </S.MetaText>

                    <S.ItemActions>
                      <S.SecondaryButton type="button" onClick={() => handleToggleRecurrence(item.id)}>
                        {item.enabled ? "Desativar" : "Ativar"}
                      </S.SecondaryButton>
                      <S.SecondaryButton type="button" onClick={() => handleEditRecurrence(item)}>
                        <Pencil size={14} /> Editar
                      </S.SecondaryButton>
                      <S.DangerButton type="button" onClick={() => handleRemoveRecurrence(item.id)}>
                        <Trash2 size={14} /> Remover
                      </S.DangerButton>
                    </S.ItemActions>
                  </S.ItemCard>
                ))}
              </S.ItemList>
            )}
          </S.SectionCard>
        </S.ToolsGrid>

        {dayDetailsState ? (
          <S.DayDetailsOverlay onClick={handleCloseDayDetails}>
            <S.DayDetailsModal onClick={(event) => event.stopPropagation()}>
              <S.DayDetailsHeader>
                <div>
                  <h3>Detalhes do dia</h3>
                  <p>{formatFullDate(dayDetailsState.date)}</p>
                </div>

                <S.SecondaryButton type="button" onClick={handleCloseDayDetails}>
                  <X size={14} /> Fechar
                </S.SecondaryButton>
              </S.DayDetailsHeader>

              <S.DayDetailsList>
                {dayDetailsState.events.map((event) => {
                  const priority = eventPriorityLabel[event.tone];
                  const relatedOpportunityCode = event.relatedOpportunityCode;

                  return (
                    <S.DayDetailsItem key={event.id} $tone={event.tone}>
                      <S.DayDetailsTop>
                        <S.DayEventTime>
                          {event.startTime} - {event.endTime}
                        </S.DayEventTime>

                        <S.DayDetailsBadges>
                          <S.DayToneBadge $tone={event.tone}>{eventToneLabel[event.tone]}</S.DayToneBadge>
                          <S.DayPriorityBadge $level={priority}>
                            Prioridade {eventPriorityText[priority]}
                          </S.DayPriorityBadge>
                        </S.DayDetailsBadges>
                      </S.DayDetailsTop>

                      <strong>{event.title}</strong>
                      <p>{event.note}</p>

                      {event.isOpportunityRelated && relatedOpportunityCode ? (
                        <S.SecondaryButton
                          type="button"
                          onClick={() => handleOpenRelatedOpportunity(relatedOpportunityCode)}
                        >
                          Abrir oportunidade {relatedOpportunityCode}
                        </S.SecondaryButton>
                      ) : null}
                    </S.DayDetailsItem>
                  );
                })}
              </S.DayDetailsList>
            </S.DayDetailsModal>
          </S.DayDetailsOverlay>
        ) : null}

        {confirmDraft ? (
          <S.DayDetailsOverlay onClick={handleCancelConfirmDraft}>
            <S.DayDetailsModal onClick={(event) => event.stopPropagation()}>
              <S.DayDetailsHeader>
                <div>
                  <h3>{confirmDraft.title}</h3>
                  <p>{confirmDraft.description}</p>
                </div>
              </S.DayDetailsHeader>

              <S.RowButtons>
                <S.SecondaryButton type="button" onClick={handleCancelConfirmDraft}>
                  Cancelar
                </S.SecondaryButton>
                {confirmDraft.tone === "danger" ? (
                  <S.DangerButton type="button" onClick={handleConfirmDraft}>
                    {confirmDraft.confirmLabel}
                  </S.DangerButton>
                ) : (
                  <S.PrimaryButton type="button" onClick={handleConfirmDraft}>
                    {confirmDraft.confirmLabel}
                  </S.PrimaryButton>
                )}
              </S.RowButtons>
            </S.DayDetailsModal>
          </S.DayDetailsOverlay>
        ) : null}

        <S.FooterCard>
          <p>Revise os ajustes e confirme para manter a agenda consistente.</p>
          <S.RowButtons>
            <S.SecondaryButton type="button" onClick={handleCancelarAlteracoes}>
              <X size={14} /> Cancelar alterações
            </S.SecondaryButton>
            <S.PrimaryButton type="button" onClick={handleSalvar}>
              <Save size={15} /> Salvar disponibilidade
            </S.PrimaryButton>
          </S.RowButtons>
        </S.FooterCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};