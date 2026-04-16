import { Badge, Card } from "@/shared/ui";
import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { CalendarPlus, MapPin, Users, Wallet } from "lucide-react";
import { paisAgendaMock } from "@/modules/pais/mocks/agenda";
import * as S from "./styles";

const badgeToneByStatus = {
  Confirmado: "success",
  Pendente: "warning",
} as const;

export const PaisAgendaPage = () => {
  return (
    <PaisDashboardShell
      userName={paisAgendaMock.userName}
      pageTitle={paisAgendaMock.title}
      pageDescription={paisAgendaMock.description}
      stats={paisAgendaMock.stats}
    >
      <S.Wrapper>
        <S.HeaderRow>
          <div>
            <h3>Agenda de eventos</h3>
            <p>Acompanhe reuniões, apresentações de proposta e confirmações da semana.</p>
          </div>
          <S.NewEventButton type="button">
            <CalendarPlus size={14} /> Novo evento
          </S.NewEventButton>
        </S.HeaderRow>

        <S.MainGrid>
          <S.AgendaColumn>
            <Card title="Próximos compromissos" subtitle="Eventos e reuniões em andamento">
              <S.AgendaList>
                {paisAgendaMock.upcomingEvents.map((event) => (
                  <S.AgendaItem key={event.id}>
                    <S.AgendaTop>
                      <div>
                        <h4>{event.title}</h4>
                        <p>{event.company}</p>
                      </div>
                      <Badge tone={badgeToneByStatus[event.status]}>{event.status}</Badge>
                    </S.AgendaTop>

                    <S.MetaLine>
                      <span>{event.date}</span>
                      <span>{event.period}</span>
                    </S.MetaLine>

                    <S.DetailGrid>
                      <S.DetailItem>
                        <MapPin size={13} /> {event.location}
                      </S.DetailItem>
                      <S.DetailItem>
                        <Users size={13} /> {event.attendees}
                      </S.DetailItem>
                      <S.DetailItem>
                        <Wallet size={13} /> {event.budget}
                      </S.DetailItem>
                    </S.DetailGrid>

                    <S.AgendaNote>{event.note}</S.AgendaNote>

                    <S.ActionRow>
                      <button type="button">Ver detalhes</button>
                      <button type="button">Adicionar lembrete</button>
                    </S.ActionRow>
                  </S.AgendaItem>
                ))}
              </S.AgendaList>
            </Card>
          </S.AgendaColumn>

          <S.SideColumn>
            <Card title="Checklist da semana" subtitle="Passos para não perder prazos">
              <S.Checklist>
                {paisAgendaMock.weeklyChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </S.Checklist>
            </Card>

            <Card title="Eventos concluídos" subtitle="Últimas entregas já realizadas">
              <S.HistoryList>
                {paisAgendaMock.completedEvents.map((event) => (
                  <S.HistoryItem key={event.id}>
                    <strong>{event.title}</strong>
                    <span>{event.company}</span>
                    <p>
                      {event.when} • {event.result}
                    </p>
                  </S.HistoryItem>
                ))}
              </S.HistoryList>
            </Card>
          </S.SideColumn>
        </S.MainGrid>
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
