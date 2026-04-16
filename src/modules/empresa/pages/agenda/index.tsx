import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { Badge, Card, SectionHeader } from "@/shared/ui";
import { empresarioAgendaPageMock } from "@/modules/empresa/mocks/agenda";
import * as S from "./styles";

export const EmpresarioAgendaPage = () => {
  return (
    <DashboardShell
      userName={empresarioAgendaPageMock.userName}
      pageTitle={empresarioAgendaPageMock.title}
      pageDescription={empresarioAgendaPageMock.description}
      stats={empresarioAgendaPageMock.stats}
    >
      <S.Wrapper>
        <SectionHeader
          title="Coordenação diária"
          subtitle="Visibilidade de horários, responsáveis e checkpoints para cada entrega da empresa."
          action={<S.ActionButton type="button">Abrir calendário completo</S.ActionButton>}
        />

        <Card title={empresarioAgendaPageMock.todayFocus.title} subtitle={empresarioAgendaPageMock.todayFocus.dateLabel}>
          <S.FocusText>{empresarioAgendaPageMock.todayFocus.description}</S.FocusText>
        </Card>

        <S.MainGrid>
          <Card title="Linha do dia" subtitle="Marcos operacionais e status atual">
            <S.Timeline>
              {empresarioAgendaPageMock.dailyTimeline.map((item) => (
                <S.TimelineItem key={`${item.time}-${item.title}`}>
                  <S.TimelineHour>{item.time}</S.TimelineHour>
                  <S.TimelineContent>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </S.TimelineContent>
                  <Badge tone={item.status === "Concluído" ? "success" : item.status === "Em andamento" ? "warning" : "brand"}>
                    {item.status}
                  </Badge>
                </S.TimelineItem>
              ))}
            </S.Timeline>
          </Card>

          <Card title="Agenda da semana" subtitle="Entregas confirmadas e próximas execuções">
            <S.WeeklyList>
              {empresarioAgendaPageMock.weeklyAgenda.map((item) => (
                <S.WeeklyItem key={`${item.day}-${item.event}`}>
                  <header>
                    <strong>{item.day}</strong>
                    <Badge tone="brand">{item.status}</Badge>
                  </header>
                  <h4>{item.event}</h4>
                  <p>{item.location}</p>
                  <span>{item.team}</span>
                </S.WeeklyItem>
              ))}
            </S.WeeklyList>
          </Card>
        </S.MainGrid>

        <S.BottomGrid>
          <Card title="Checklists ativos" subtitle="Responsáveis e andamento por etapa">
            <S.ChecklistGrid>
              {empresarioAgendaPageMock.activeChecklists.map((item) => (
                <S.ChecklistItem key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.owner}</p>
                  <span>{item.progress}</span>
                </S.ChecklistItem>
              ))}
            </S.ChecklistGrid>
          </Card>

          <Card title="Alertas de comunicação" subtitle="Pontos críticos para não perder prazos">
            <S.AlertList>
              {empresarioAgendaPageMock.communicationAlerts.map((alert) => (
                <S.AlertItem key={alert}>{alert}</S.AlertItem>
              ))}
            </S.AlertList>
          </Card>
        </S.BottomGrid>
      </S.Wrapper>
    </DashboardShell>
  );
};
