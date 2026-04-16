import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorChecklistsMock } from "@/modules/recreador/mocks/checklists-simples";
import * as S from "./styles";

export const RecreadorChecklistsSimplesPage = () => {
  const dispatch = useAppDispatch();
  const [novoChecklist, setNovoChecklist] = useState("");
  const [boards, setBoards] = useState(recreadorChecklistsMock.checklists);
  const [feedback, setFeedback] = useState("");

  const toggleTask = (boardId: string, taskId: string) => {
    setBoards((previous) =>
      previous.map((board) => {
        if (board.id !== boardId) {
          return board;
        }

        return {
          ...board,
          tarefas: board.tarefas.map((task) => {
            if (task.id !== taskId) {
              return task;
            }

            return {
              ...task,
              done: !task.done,
            };
          }),
        };
      }),
    );
  };

  const completed = useMemo(
    () => boards.flatMap((board) => board.tarefas).filter((task) => task.done).length,
    [boards],
  );

  const handleUseModel = (modeloId: string) => {
    const modelo = recreadorChecklistsMock.modelos.find((item) => item.id === modeloId);

    if (!modelo) {
      return;
    }

    setBoards((previous) => [
      {
        id: `model-${Date.now()}`,
        titulo: `Checklist: ${modelo.nome}`,
        categoria: "evento",
        prioridade: "media",
        tarefas: modelo.itens.map((item, index) => ({
          id: `model-task-${Date.now()}-${index + 1}`,
          texto: item,
          done: false,
        })),
      },
      ...previous,
    ]);

    setFeedback(`Modelo "${modelo.nome}" aplicado com sucesso.`);
    dispatch(setLastVisualAction("Modelo de checklist aplicado visualmente."));
  };

  const handleCriarChecklist = () => {
    const nome = novoChecklist.trim();

    if (!nome) {
      setFeedback("Digite um nome para criar a lista.");
      return;
    }

    setBoards((previous) => [
      {
        id: `check-${Date.now()}`,
        titulo: nome,
        categoria: "rotina",
        prioridade: "baixa",
        tarefas: [
          {
            id: `task-${Date.now()}-1`,
            texto: "Nova tarefa de preparação",
            done: false,
          },
        ],
      },
      ...previous,
    ]);

    setNovoChecklist("");
    setFeedback("Lista criada e pronta para edição.");
    dispatch(setLastVisualAction("Nova lista criada na camada visual."));
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorChecklistsMock.title}
      pageDescription={recreadorChecklistsMock.description}
      stats={recreadorChecklistsMock.stats}
    >
      <S.Wrapper>
        <S.SectionCard>
          <S.SectionTitle>Listas ativas ({boards.length})</S.SectionTitle>
          <S.BadgeRow>
            <S.Badge $tone="green">Concluidas: {completed}</S.Badge>
            <S.Badge $tone="neutral">Pendentes: {boards.flatMap((item) => item.tarefas).length - completed}</S.Badge>
          </S.BadgeRow>

          <S.BoardList>
            {boards.map((board) => (
              <S.BoardCard key={board.id}>
                <S.BoardTop>
                  <div>
                    <strong>{board.titulo}</strong>
                  </div>
                  <S.BadgeRow>
                    <S.Badge $tone={board.categoria === "evento" ? "blue" : "neutral"}>
                      {board.categoria === "evento" ? "Evento" : "Rotina"}
                    </S.Badge>
                    <S.Badge
                      $tone={
                        board.prioridade === "alta"
                          ? "orange"
                          : board.prioridade === "media"
                            ? "blue"
                            : "green"
                      }
                    >
                      Prioridade {board.prioridade}
                    </S.Badge>
                  </S.BadgeRow>
                </S.BoardTop>

                <S.TasksList>
                  {board.tarefas.map((task) => (
                    <S.TaskItem key={task.id}>
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(board.id, task.id)}
                      />
                      <S.TaskText $done={task.done}>{task.texto}</S.TaskText>
                    </S.TaskItem>
                  ))}
                </S.TasksList>
              </S.BoardCard>
            ))}
          </S.BoardList>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>Modelos de checklist</S.SectionTitle>
          <S.ModelsGrid>
            {recreadorChecklistsMock.modelos.map((modelo) => (
              <S.ModelCard key={modelo.id}>
                <strong>{modelo.nome}</strong>
                <S.ModelList>
                  {modelo.itens.map((item) => (
                    <li key={`${modelo.id}-${item}`}>{item}</li>
                  ))}
                </S.ModelList>
                <S.ActionButton type="button" onClick={() => handleUseModel(modelo.id)}>
                  Usar modelo
                </S.ActionButton>
              </S.ModelCard>
            ))}
          </S.ModelsGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>Criar nova lista</S.SectionTitle>
          <S.AddRow>
            <input
              value={novoChecklist}
              onChange={(event) => setNovoChecklist(event.target.value)}
              placeholder="Digite o nome da nova lista..."
            />
            <S.ActionButton type="button" $primary onClick={handleCriarChecklist}>
              <Plus size={13} /> Criar lista
            </S.ActionButton>
          </S.AddRow>

          {feedback ? <S.Feedback>{feedback}</S.Feedback> : null}
        </S.SectionCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
