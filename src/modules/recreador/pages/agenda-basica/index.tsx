import { useMemo, useState } from "react";
import { Calendar, Clock, MapPin, Plus, Users } from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorAgendaBasicaMock } from "@/modules/recreador/mocks/agenda-basica";
import * as S from "./styles";

export const RecreadorAgendaBasicaPage = () => {
  const dispatch = useAppDispatch();
  const [eventos, setEventos] = useState(recreadorAgendaBasicaMock.eventos);
  const [selectedEventoId, setSelectedEventoId] = useState<string | null>(null);
  const [calendarioAberto, setCalendarioAberto] = useState(false);

  const selectedEvento = useMemo(
    () => eventos.find((evento) => evento.id === selectedEventoId) ?? null,
    [eventos, selectedEventoId],
  );

  const handleNovoEvento = () => {
    const novoEvento = {
      id: `evento-${Date.now()}`,
      titulo: "Novo bloco em planejamento",
      data: "Definir data",
      horario: "Definir horário",
      local: "Definir local",
      participantes: 0,
      status: "pendente" as const,
    };

    setEventos((previous) => [novoEvento, ...previous]);
    setSelectedEventoId(novoEvento.id);
    dispatch(setLastVisualAction("Novo evento adicionado visualmente na agenda."));
  };

  const handleEditarBloco = (id: string) => {
    setEventos((previous) =>
      previous.map((evento) => {
        if (evento.id !== id) {
          return evento;
        }

        return {
          ...evento,
          status: evento.status === "confirmado" ? "pendente" : "confirmado",
        };
      }),
    );
    dispatch(setLastVisualAction("Status do bloco alternado na camada visual."));
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorAgendaBasicaMock.title}
      pageDescription={recreadorAgendaBasicaMock.description}
      stats={recreadorAgendaBasicaMock.stats}
    >
      <S.Wrapper>
        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>Próximos eventos</S.SectionTitle>
            <S.ActionButton type="button" $primary onClick={handleNovoEvento}>
              <Plus size={13} /> Novo evento
            </S.ActionButton>
          </S.SectionHeader>

          <S.EventoList>
            {eventos.map((evento) => (
              <S.EventoCard key={evento.id}>
                <S.EventoTop>
                  <h4>{evento.titulo}</h4>
                  <S.StatusBadge $status={evento.status}>
                    {evento.status === "confirmado" ? "Confirmado" : "Pendente"}
                  </S.StatusBadge>
                </S.EventoTop>

                <S.EventoMeta>
                  <S.MetaItem>
                    <Calendar size={12} /> {evento.data}
                  </S.MetaItem>
                  <S.MetaItem>
                    <Clock size={12} /> {evento.horario}
                  </S.MetaItem>
                  <S.MetaItem>
                    <MapPin size={12} /> {evento.local}
                  </S.MetaItem>
                </S.EventoMeta>

                <S.MetaItem>
                  <Users size={12} /> {evento.participantes} participantes esperados
                </S.MetaItem>

                <S.EventoActions>
                  <S.ActionButton type="button" onClick={() => setSelectedEventoId(evento.id)}>
                    Ver detalhes
                  </S.ActionButton>
                  <S.ActionButton type="button" onClick={() => handleEditarBloco(evento.id)}>
                    Editar bloco
                  </S.ActionButton>
                </S.EventoActions>
              </S.EventoCard>
            ))}
          </S.EventoList>

          {selectedEvento ? (
            <S.HighlightCard>
              <strong>Evento selecionado: {selectedEvento.titulo}</strong>
              <p>
                {selectedEvento.data} · {selectedEvento.horario} · {selectedEvento.local}
              </p>
            </S.HighlightCard>
          ) : null}
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>Visualização semanal</S.SectionTitle>
            <S.ActionButton
              type="button"
              onClick={() => {
                setCalendarioAberto((previous) => !previous);
                dispatch(
                  setLastVisualAction(
                    calendarioAberto
                      ? "Visualização semanal recolhida."
                      : "Visualização semanal expandida.",
                  ),
                );
              }}
            >
              {calendarioAberto ? "Recolher calendário" : "Abrir calendário completo"}
            </S.ActionButton>
          </S.SectionHeader>

          {calendarioAberto ? (
            <S.WeekGrid>
              {recreadorAgendaBasicaMock.semanaVisual.map((dia) => (
                <S.DayCard key={dia.dia}>
                  <S.DayName>{dia.dia}</S.DayName>
                  {dia.eventos.map((evento) => (
                    <S.DayEvent key={`${dia.dia}-${evento}`}>{evento}</S.DayEvent>
                  ))}
                </S.DayCard>
              ))}
            </S.WeekGrid>
          ) : (
            <S.HighlightCard>
              <strong>Calendário resumido</strong>
              <p>Abra o calendário completo para visualizar todos os blocos da semana.</p>
            </S.HighlightCard>
          )}
        </S.SectionCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
