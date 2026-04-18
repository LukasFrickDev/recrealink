import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ClipboardCheck,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorChecklistMock } from "@/modules/recreador/mocks/checklist";
import { useToast } from "@/shared/ui/Toast";
import * as S from "./styles";

type ChecklistItem = {
  id: string;
  title: string;
  helper: string;
  done: boolean;
};

const createChecklistId = () => `check-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const cloneChecklist = (items: ChecklistItem[]): ChecklistItem[] => items.map((item) => ({ ...item }));

export const RecreadorChecklistPage = () => {
  const dispatch = useAppDispatch();
  const { success, info, warning } = useToast();

  const [savedChecklist, setSavedChecklist] = useState<ChecklistItem[]>(() =>
    recreadorChecklistMock.items.map((item) => ({ ...item })),
  );
  const [checklist, setChecklist] = useState<ChecklistItem[]>(savedChecklist);

  const [titleDraft, setTitleDraft] = useState("");
  const [helperDraft, setHelperDraft] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const progresso = useMemo(() => {
    if (checklist.length === 0) {
      return 0;
    }

    const concluidos = checklist.filter((item) => item.done).length;
    return Math.round((concluidos / checklist.length) * 100);
  }, [checklist]);

  const resetItemDraft = () => {
    setTitleDraft("");
    setHelperDraft("");
    setEditingItemId(null);
  };

  const handleToggle = (id: string) => {
    const target = checklist.find((item) => item.id === id);

    if (!target) {
      warning({
        title: "Item indisponivel",
        description: "Nao foi possivel localizar o item para alterar o status.",
      });
      return;
    }

    const nextDone = !target.done;

    setChecklist((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              done: nextDone,
            }
          : item,
      ),
    );

    info({
      title: nextDone ? "Item concluido" : "Item reaberto",
      description: `${target.title} foi atualizado no checklist operacional.`,
    });
  };

  const handleSaveItem = () => {
    const title = titleDraft.trim();
    const helper = helperDraft.trim();

    if (!title || !helper) {
      warning({
        title: "Item incompleto",
        description: "Preencha titulo e orientacao para salvar o item do checklist.",
      });
      return;
    }

    if (editingItemId) {
      setChecklist((previous) =>
        previous.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                title,
                helper,
              }
            : item,
        ),
      );
      success({
        title: "Item atualizado",
        description: "O item selecionado foi atualizado com sucesso.",
      });
    } else {
      setChecklist((previous) => [
        ...previous,
        {
          id: createChecklistId(),
          title,
          helper,
          done: false,
        },
      ]);
      success({
        title: "Item adicionado",
        description: "Novo item incluido no checklist operacional.",
      });
    }

    resetItemDraft();
  };

  const handleEditItem = (item: ChecklistItem) => {
    setEditingItemId(item.id);
    setTitleDraft(item.title);
    setHelperDraft(item.helper);
  };

  const handleRemoveItem = (itemId: string) => {
    const target = checklist.find((item) => item.id === itemId);

    if (!target) {
      warning({
        title: "Item indisponivel",
        description: "Nao foi possivel localizar este item para remocao.",
      });
      return;
    }

    const confirmed = window.confirm(
      `Remover o item \"${target.title}\" do checklist atual?`,
    );

    if (!confirmed) {
      info({
        title: "Remocao cancelada",
        description: "O item foi mantido no checklist.",
      });
      return;
    }

    setChecklist((previous) => previous.filter((item) => item.id !== itemId));

    if (editingItemId === itemId) {
      resetItemDraft();
    }

    info({
      title: "Item removido",
      description: `${target?.title ?? "Item"} removido do checklist atual.`,
    });
  };

  const handleMoveItem = (itemId: string, direction: "up" | "down") => {
    setChecklist((previous) => {
      const currentIndex = previous.findIndex((item) => item.id === itemId);

      if (currentIndex === -1) {
        return previous;
      }

      const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (nextIndex < 0 || nextIndex >= previous.length) {
        return previous;
      }

      const updated = [...previous];
      const temp = updated[currentIndex];
      updated[currentIndex] = updated[nextIndex];
      updated[nextIndex] = temp;

      return updated;
    });
  };

  const handleSalvar = () => {
    setSavedChecklist(cloneChecklist(checklist));
    dispatch(setLastVisualAction("Checklist operacional atualizado."));
    success({
      title: "Checklist salvo",
      description: "Itens, ordem e status foram consolidados.",
    });
  };

  const handleCancelar = () => {
    const hasChecklistChanges = JSON.stringify(checklist) !== JSON.stringify(savedChecklist);
    const hasDraftChanges =
      titleDraft.trim().length > 0 || helperDraft.trim().length > 0 || editingItemId !== null;

    if (
      (hasChecklistChanges || hasDraftChanges) &&
      !window.confirm("Descartar alteracoes nao salvas do checklist?")
    ) {
      info({
        title: "Cancelamento interrompido",
        description: "As alteracoes permanecem disponiveis para revisao.",
      });
      return;
    }

    setChecklist(cloneChecklist(savedChecklist));
    resetItemDraft();
    info({
      title: "Alteracoes descartadas",
      description: "Checklist restaurado para o ultimo estado salvo.",
    });
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorChecklistMock.title}
      pageDescription={recreadorChecklistMock.description}
      stats={recreadorChecklistMock.stats}
    >
      <S.Wrapper>
        <S.ProgressCard>
          <S.ProgressHeader>
            <h2>
              <ClipboardCheck size={17} /> Progresso do checklist
            </h2>
            <span>{progresso}% concluido</span>
          </S.ProgressHeader>
          <S.ProgressBar>
            <span style={{ width: `${progresso}%` }} />
          </S.ProgressBar>
          <p>Finalize os itens pendentes para melhorar sua previsibilidade operacional.</p>
        </S.ProgressCard>

        <S.EditorCard>
          <h3>{editingItemId ? "Editar item" : "Adicionar item"}</h3>
          <S.EditorGrid>
            <S.EditorField>
              <span>Titulo</span>
              <input
                value={titleDraft}
                onChange={(event) => setTitleDraft(event.target.value)}
                placeholder="Ex: Confirmar roteiro com a coordenacao"
              />
            </S.EditorField>
            <S.EditorField>
              <span>Orientacao operacional</span>
              <textarea
                value={helperDraft}
                onChange={(event) => setHelperDraft(event.target.value)}
                placeholder="Descreva rapidamente como validar este item"
              />
            </S.EditorField>
          </S.EditorGrid>

          <S.EditorActions>
            <S.ActionButton type="button" onClick={handleSaveItem}>
              <Plus size={14} /> {editingItemId ? "Atualizar item" : "Adicionar item"}
            </S.ActionButton>
            {editingItemId ? (
              <S.ActionButton
                type="button"
                $tone="neutral"
                onClick={resetItemDraft}
              >
                <X size={14} /> Cancelar edicao
              </S.ActionButton>
            ) : null}
          </S.EditorActions>
        </S.EditorCard>

        <S.ListCard>
          {checklist.length === 0 ? (
            <S.EmptyState>
              Nenhum item cadastrado no checklist. Crie os itens principais para acompanhar sua rotina.
            </S.EmptyState>
          ) : (
            checklist.map((item, index) => (
              <S.ItemRow key={item.id} $done={item.done}>
                <S.CheckButton type="button" $done={item.done} onClick={() => handleToggle(item.id)}>
                  <CheckCircle2 size={16} />
                </S.CheckButton>

                <S.ItemContent>
                  <strong>{item.title}</strong>
                  <p>{item.helper}</p>
                </S.ItemContent>

                <S.StatusBadge $done={item.done}>{item.done ? "Concluido" : "Pendente"}</S.StatusBadge>

                <S.ItemActions>
                  <S.IconButton
                    type="button"
                    $tone="neutral"
                    disabled={index === 0}
                    onClick={() => handleMoveItem(item.id, "up")}
                    aria-label="Mover item para cima"
                  >
                    <ArrowUp size={14} />
                  </S.IconButton>
                  <S.IconButton
                    type="button"
                    $tone="neutral"
                    disabled={index === checklist.length - 1}
                    onClick={() => handleMoveItem(item.id, "down")}
                    aria-label="Mover item para baixo"
                  >
                    <ArrowDown size={14} />
                  </S.IconButton>
                  <S.IconButton type="button" $tone="neutral" onClick={() => handleEditItem(item)}>
                    <Pencil size={14} />
                  </S.IconButton>
                  <S.IconButton type="button" $tone="danger" onClick={() => handleRemoveItem(item.id)}>
                    <Trash2 size={14} />
                  </S.IconButton>
                </S.ItemActions>
              </S.ItemRow>
            ))
          )}
        </S.ListCard>

        <S.ReviewCard>
          <S.FooterActions>
            <S.SaveButton type="button" onClick={handleSalvar}>
              Salvar checklist
            </S.SaveButton>
            <S.ActionButton type="button" $tone="neutral" onClick={handleCancelar}>
              <X size={14} /> Cancelar alteracoes
            </S.ActionButton>
          </S.FooterActions>
        </S.ReviewCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};