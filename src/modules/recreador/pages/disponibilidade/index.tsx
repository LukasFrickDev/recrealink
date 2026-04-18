import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Lock,
  Pencil,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import {
  recreadorDisponibilidadeMock,
  type AvailabilityPeriod,
  type AvailabilitySlotItem,
  type AvailabilitySlotState,
  type ConflictPreviewItem,
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

const slotStateLabel: Record<AvailabilitySlotState, string> = {
  disponivel: "Disponivel",
  "bloqueio-manual": "Bloqueio manual",
  "bloqueio-compromisso": "Bloqueio por compromisso",
  conflito: "Conflito",
};

const periodLabel: Record<AvailabilityPeriod, string> = {
  manha: "Manha",
  tarde: "Tarde",
  noite: "Noite",
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
  const { success, info, warning } = useToast();

  const [savedSnapshot, setSavedSnapshot] = useState<AvailabilitySnapshot>(() => ({
    slots: cloneSlots(recreadorDisponibilidadeMock.slots),
    manualBlocks: cloneManualBlocks(recreadorDisponibilidadeMock.manualBlocks),
    recurrenceRules: cloneRecurrenceRules(recreadorDisponibilidadeMock.recurrenceRules),
    conflicts: cloneConflicts(recreadorDisponibilidadeMock.seededConflictPreview),
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

  const [recurrenceDraft, setRecurrenceDraft] = useState<RecurrenceDraft>(RECURRENCE_DRAFT_INITIAL);
  const [editingRecurrenceId, setEditingRecurrenceId] = useState<string | null>(null);

  const dynamicStats = useMemo(() => {
    const disponiveis = slots.filter((item) => item.state === "disponivel").length;
    const bloqueioManual = slots.filter((item) => item.state === "bloqueio-manual").length;
    const bloqueioCompromisso = slots.filter((item) => item.state === "bloqueio-compromisso").length;
    const conflitosCount = slots.filter((item) => item.state === "conflito").length;

    return [
      { title: "Disponiveis", value: String(disponiveis), helper: "Janelas abertas" },
      { title: "Bloqueio manual", value: String(bloqueioManual), helper: "Definidos por voce" },
      {
        title: "Por compromisso",
        value: String(bloqueioCompromisso),
        helper: "Vindos de aceite/confirmacao",
      },
      { title: "Conflitos", value: String(conflitosCount), helper: "Sobreposicoes detectadas" },
    ];
  }, [slots]);

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

  const confirmAction = (message: string) => {
    const confirmed = window.confirm(message);

    if (!confirmed) {
      info({
        title: "Acao cancelada",
        description: "Nenhuma alteracao foi aplicada.",
      });
    }

    return confirmed;
  };

  const handleToggleSlot = (slotId: string) => {
    const target = slots.find((item) => item.id === slotId);

    if (!target) {
      warning({
        title: "Slot indisponivel",
        description: "Nao foi possivel localizar o slot selecionado para atualizacao.",
      });
      return;
    }

    if (target.state === "bloqueio-compromisso") {
      info({
        title: "Bloqueio protegido",
        description:
          "Este horario esta reservado por compromisso confirmado e nao pode ser alterado manualmente.",
      });
      return;
    }

    const isBlocking = target.state === "disponivel";

    setSlots((previous) =>
      previous.map((item) => {
        if (item.id !== slotId) {
          return item;
        }

        if (item.state === "disponivel") {
          return {
            ...item,
            state: "bloqueio-manual",
            helper: "Bloqueio manual definido na interface.",
          };
        }

        if (item.state === "bloqueio-manual") {
          return {
            ...item,
            state: "disponivel",
            helper: "Janela liberada manualmente.",
          };
        }

        return item;
      }),
    );

    if (isBlocking) {
      warning({
        title: "Bloqueio manual aplicado",
        description: `${target.dateLabel} ${target.startTime}-${target.endTime} foi marcado como bloqueio manual.`,
      });
      return;
    }

    success({
      title: "Janela liberada",
      description: `${target.dateLabel} ${target.startTime}-${target.endTime} voltou para disponivel.`,
    });
  };

  const handleSaveManualBlock = () => {
    const dateLabel = manualBlockDraft.dateLabel.trim();
    const startTime = manualBlockDraft.startTime.trim();
    const endTime = manualBlockDraft.endTime.trim();
    const reason = manualBlockDraft.reason.trim();

    if (!dateLabel || !startTime || !endTime || !reason) {
      warning({
        title: "Bloqueio incompleto",
        description: "Preencha data, horario inicial, horario final e motivo do bloqueio.",
      });
      return;
    }

    if (startTime >= endTime) {
      warning({
        title: "Horario invalido",
        description: "O horario inicial deve ser menor que o horario final.",
      });
      return;
    }

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
      dateLabel: item.dateLabel,
      period: item.period,
      startTime: item.startTime,
      endTime: item.endTime,
      reason: item.reason,
    });
  };

  const handleRemoveManualBlock = (blockId: string) => {
    const target = manualBlocks.find((item) => item.id === blockId);

    if (!target) {
      warning({
        title: "Bloqueio indisponivel",
        description: "Nao foi possivel localizar este bloqueio para remocao.",
      });
      return;
    }

    if (
      !confirmAction(
        `Remover o bloqueio manual de ${target.dateLabel} (${target.startTime}-${target.endTime})?`,
      )
    ) {
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
              helper: "Janela liberada apos remocao do bloqueio manual.",
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

  const handleSaveRecurrence = () => {
    const weekdayLabel = recurrenceDraft.weekdayLabel.trim();
    const startTime = recurrenceDraft.startTime.trim();
    const endTime = recurrenceDraft.endTime.trim();

    if (!weekdayLabel || !startTime || !endTime) {
      warning({
        title: "Recorrencia incompleta",
        description: "Preencha dia da semana e horario para salvar a recorrencia.",
      });
      return;
    }

    if (startTime >= endTime) {
      warning({
        title: "Horario invalido",
        description: "O horario inicial deve ser menor que o horario final.",
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
      title: editingRecurrenceId ? "Recorrencia atualizada" : "Recorrencia criada",
      description: "Regra de recorrencia salva na configuracao atual.",
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

  const handleRemoveRecurrence = (ruleId: string) => {
    const target = recurrenceRules.find((item) => item.id === ruleId);

    if (!target) {
      warning({
        title: "Recorrencia indisponivel",
        description: "Nao foi possivel localizar esta regra para remocao.",
      });
      return;
    }

    if (
      !confirmAction(
        `Remover a recorrencia de ${target.weekdayLabel} (${target.startTime}-${target.endTime})?`,
      )
    ) {
      return;
    }

    setRecurrenceRules((previous) => previous.filter((item) => item.id !== ruleId));

    if (editingRecurrenceId === ruleId) {
      resetRecurrenceDraft();
    }

    info({
      title: "Recorrencia removida",
      description: "A regra foi removida da configuracao atual.",
    });
  };

  const handleToggleRecurrence = (ruleId: string) => {
    const targetRule = recurrenceRules.find((item) => item.id === ruleId);

    if (!targetRule) {
      warning({
        title: "Regra indisponivel",
        description: "Nao foi possivel localizar esta regra de recorrencia.",
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
      title: targetRule.enabled ? "Recorrencia desativada" : "Recorrencia ativada",
      description: `${targetRule.weekdayLabel} ${targetRule.startTime}-${targetRule.endTime} atualizado.`,
    });
  };

  const handleResolveConflict = (conflictId: string) => {
    const target = conflicts.find((item) => item.id === conflictId);

    if (!target) {
      warning({
        title: "Conflito indisponivel",
        description: "Nao foi possivel localizar o conflito para resolucao.",
      });
      return;
    }

    if (
      !confirmAction(
        "Resolver este conflito priorizando o compromisso confirmado? O bloqueio manual sobreposto sera removido.",
      )
    ) {
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

  const handleSimulateConflictCheck = () => {
    const conflictSlots = slots.filter((item) => item.state === "conflito");

    if (conflictSlots.length === 0) {
      success({
        title: "Sem conflitos",
        description: "Nenhum conflito detectado na verificacao atual.",
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
          helper: "Conflito detectado por sobreposicao de janelas.",
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
    dispatch(
      setLastVisualAction(
        "Disponibilidade atualizada com bloqueios, recorrencia e compromissos.",
      ),
    );
    success({
      title: "Disponibilidade salva",
      description: "Bloqueios, recorrencias e conflitos foram salvos.",
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

    if (
      (hasSnapshotChanges || hasDraftChanges) &&
      !confirmAction("Descartar alteracoes nao salvas de disponibilidade?")
    ) {
      return;
    }

    applySnapshot(savedSnapshot);
    resetManualBlockDraft();
    resetRecurrenceDraft();
    info({
      title: "Alteracoes descartadas",
      description: "Disponibilidade restaurada para o ultimo estado salvo.",
    });
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorDisponibilidadeMock.title}
      pageDescription={recreadorDisponibilidadeMock.description}
      stats={dynamicStats}
    >
      <S.Wrapper>
        <S.HeaderCard>
          <h2>
            <CalendarClock size={18} /> Disponibilidade
          </h2>
          <p>{recreadorDisponibilidadeMock.intro}</p>
        </S.HeaderCard>

        <S.SectionCard>
          <S.SectionTitle>
            <Clock3 size={16} /> Visao atual de disponibilidade
          </S.SectionTitle>
          <S.SlotGrid>
            {slots.map((slot) => (
              <S.SlotCard key={slot.id}>
                <S.SlotHeader>
                  <strong>{slot.dateLabel}</strong>
                  <S.StatePill
                    $tone={
                      slot.state === "disponivel"
                        ? "success"
                        : slot.state === "bloqueio-manual"
                          ? "neutral"
                          : slot.state === "bloqueio-compromisso"
                            ? "info"
                            : "warning"
                    }
                  >
                    {slotStateLabel[slot.state]}
                  </S.StatePill>
                </S.SlotHeader>

                <S.MetaText>
                  {slot.weekdayLabel} · {periodLabel[slot.period]}
                </S.MetaText>
                <S.MetaText>
                  {slot.startTime} - {slot.endTime}
                </S.MetaText>
                <S.MetaText>{slot.helper}</S.MetaText>

                <S.RowButtons>
                  <S.SecondaryButton
                    type="button"
                    disabled={slot.state === "bloqueio-compromisso"}
                    onClick={() => handleToggleSlot(slot.id)}
                  >
                    {slot.state === "disponivel" ? "Bloquear manualmente" : "Liberar janela"}
                  </S.SecondaryButton>
                </S.RowButtons>
              </S.SlotCard>
            ))}
          </S.SlotGrid>
        </S.SectionCard>

        <S.TwoColumn>
          <S.SectionCard>
            <S.SectionTitle>
              <Lock size={16} /> Bloqueios manuais
            </S.SectionTitle>

            <S.FormGrid>
              <S.FormField>
                <span>Data</span>
                <input
                  value={manualBlockDraft.dateLabel}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      dateLabel: event.target.value,
                    }))
                  }
                  placeholder="20 Mai 2026"
                />
              </S.FormField>

              <S.FormField>
                <span>Periodo</span>
                <select
                  value={manualBlockDraft.period}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      period: event.target.value as AvailabilityPeriod,
                    }))
                  }
                >
                  <option value="manha">Manha</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                </select>
              </S.FormField>

              <S.FormField>
                <span>Inicio</span>
                <input
                  value={manualBlockDraft.startTime}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      startTime: event.target.value,
                    }))
                  }
                  placeholder="13:00"
                />
              </S.FormField>

              <S.FormField>
                <span>Fim</span>
                <input
                  value={manualBlockDraft.endTime}
                  onChange={(event) =>
                    setManualBlockDraft((previous) => ({
                      ...previous,
                      endTime: event.target.value,
                    }))
                  }
                  placeholder="17:00"
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
                  <X size={14} /> Cancelar edicao
                </S.SecondaryButton>
              ) : null}
            </S.RowButtons>

            {manualBlocks.length === 0 ? (
              <S.EmptyState>
                Nenhum bloqueio manual cadastrado. Use o formulario para reservar janelas indisponiveis.
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
              <RefreshCcw size={16} /> Recorrencia
            </S.SectionTitle>

            <S.FormGrid>
              <S.FormField>
                <span>Dia da semana</span>
                <input
                  value={recurrenceDraft.weekdayLabel}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      weekdayLabel: event.target.value,
                    }))
                  }
                  placeholder="Quinta-feira"
                />
              </S.FormField>

              <S.FormField>
                <span>Periodo</span>
                <select
                  value={recurrenceDraft.period}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      period: event.target.value as AvailabilityPeriod,
                    }))
                  }
                >
                  <option value="manha">Manha</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                </select>
              </S.FormField>

              <S.FormField>
                <span>Inicio</span>
                <input
                  value={recurrenceDraft.startTime}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      startTime: event.target.value,
                    }))
                  }
                  placeholder="08:00"
                />
              </S.FormField>

              <S.FormField>
                <span>Fim</span>
                <input
                  value={recurrenceDraft.endTime}
                  onChange={(event) =>
                    setRecurrenceDraft((previous) => ({
                      ...previous,
                      endTime: event.target.value,
                    }))
                  }
                  placeholder="12:00"
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
                  <option value="disponivel">Disponivel</option>
                  <option value="bloqueado">Bloqueado</option>
                </select>
              </S.FormField>
            </S.FormGrid>

            <S.RowButtons>
              <S.SecondaryButton type="button" onClick={handleSaveRecurrence}>
                <Plus size={14} /> {editingRecurrenceId ? "Atualizar recorrencia" : "Criar recorrencia"}
              </S.SecondaryButton>
              {editingRecurrenceId ? (
                <S.SecondaryButton type="button" onClick={resetRecurrenceDraft}>
                  <X size={14} /> Cancelar edicao
                </S.SecondaryButton>
              ) : null}
            </S.RowButtons>

            {recurrenceRules.length === 0 ? (
              <S.EmptyState>
                Nenhuma recorrencia configurada. Crie regras para evitar ajustes repetitivos de agenda.
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
                      {item.mode === "disponivel" ? "Recorrencia de disponibilidade" : "Recorrencia de bloqueio"}
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
        </S.TwoColumn>

        <S.TwoColumn>
          <S.SectionCard>
            <S.SectionTitle>
              <CheckCircle2 size={16} /> Compromissos futuros
            </S.SectionTitle>
            {recreadorDisponibilidadeMock.futureCommitments.length === 0 ? (
              <S.EmptyState>
                Nenhum compromisso futuro confirmado. Convites aceitos aparecerao aqui automaticamente.
              </S.EmptyState>
            ) : (
              <S.ItemList>
                {recreadorDisponibilidadeMock.futureCommitments.map((item) => (
                  <S.ItemCard key={item.id}>
                    <strong>
                      {item.opportunityCode} · {item.roleLabel}
                    </strong>
                    <S.MetaText>{item.originName}</S.MetaText>
                    <S.MetaText>
                      {item.dateLabel} · {item.weekdayLabel}
                    </S.MetaText>
                    <S.MetaText>
                      {periodLabel[item.period]} · {item.startTime} - {item.endTime}
                    </S.MetaText>
                    <S.MetaText>Origem do bloqueio: {item.sourceOrigins.join(" + ")}</S.MetaText>
                    <S.MetaText>{item.helper}</S.MetaText>
                  </S.ItemCard>
                ))}
              </S.ItemList>
            )}
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionTitle>
              <AlertTriangle size={16} /> Conflitos
            </S.SectionTitle>
            {conflicts.length === 0 ? (
              <S.EmptyState>Sem conflitos no momento. Use "Revisar conflitos" apos novos ajustes.</S.EmptyState>
            ) : (
              <S.ItemList>
                {conflicts.map((item) => (
                  <S.ItemCard key={item.id}>
                    <strong>{item.dateLabel}</strong>
                    <S.MetaText>
                      {item.startTime} - {item.endTime} · {item.kind}
                    </S.MetaText>
                    <S.MetaText>
                      {item.sourceA} x {item.sourceB}
                    </S.MetaText>
                    <S.MetaText>{item.helper}</S.MetaText>
                    <S.ItemActions>
                      <S.SecondaryButton type="button" onClick={() => handleResolveConflict(item.id)}>
                        Resolver conflito
                      </S.SecondaryButton>
                    </S.ItemActions>
                  </S.ItemCard>
                ))}
              </S.ItemList>
            )}

            <S.RowButtons>
              <S.SecondaryButton type="button" onClick={handleSimulateConflictCheck}>
                Revisar conflitos
              </S.SecondaryButton>
            </S.RowButtons>
          </S.SectionCard>
        </S.TwoColumn>

        <S.FooterCard>
          <p>Revise os ajustes e confirme para manter a agenda consistente.</p>
          <S.RowButtons>
            <S.SecondaryButton type="button" onClick={handleCancelarAlteracoes}>
              <X size={14} /> Cancelar alteracoes
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