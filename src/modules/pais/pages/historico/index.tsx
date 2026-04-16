import { Badge, Card } from "@/shared/ui";
import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { CalendarDays, Download, MapPin, Timer } from "lucide-react";
import { paisHistoricoMock } from "@/modules/pais/mocks/historico";
import * as S from "./styles";

export const PaisHistoricoPage = () => {
  return (
    <PaisDashboardShell
      userName={paisHistoricoMock.userName}
      pageTitle={paisHistoricoMock.title}
      pageDescription={paisHistoricoMock.description}
      stats={paisHistoricoMock.stats}
    >
      <S.Wrapper>
        <S.HeaderRow>
          <div>
            <h3>Histórico de eventos</h3>
            <p>Revise resultados passados para apoiar a próxima contratação.</p>
          </div>
          <S.ReportButton type="button">
            <Download size={14} /> Gerar relatório
          </S.ReportButton>
        </S.HeaderRow>

        <S.HighlightGrid>
          {paisHistoricoMock.highlights.map((item) => (
            <S.HighlightCard key={item.title}>
              <span>{item.title}</span>
              <strong>{item.value}</strong>
              <p>{item.helper}</p>
            </S.HighlightCard>
          ))}
        </S.HighlightGrid>

        <S.MainGrid>
          <Card title="Linha do tempo de eventos" subtitle="Histórico consolidado da família">
            <S.EventList>
              {paisHistoricoMock.events.map((event) => (
                <S.EventCard key={event.id}>
                  <S.EventTop>
                    <div>
                      <h4>{event.title}</h4>
                      <p>{event.company}</p>
                    </div>
                    <Badge tone="brand">{event.when}</Badge>
                  </S.EventTop>

                  <S.EventMeta>
                    <span>
                      <CalendarDays size={13} /> {event.when}
                    </span>
                    <span>
                      <MapPin size={13} /> {event.location}
                    </span>
                    <span>
                      <Timer size={13} /> {event.duration}
                    </span>
                    <span>{event.audience}</span>
                    <span>{event.amount}</span>
                    <S.EventScore>Nota {event.rating}</S.EventScore>
                  </S.EventMeta>

                  <S.EventNotes>{event.notes}</S.EventNotes>

                  <S.EventFooter>
                    <span>{event.photos} fotos no registro</span>
                    <S.EventActions>
                      <button type="button">Ver detalhes</button>
                      <button type="button">Contratar novamente</button>
                    </S.EventActions>
                  </S.EventFooter>
                </S.EventCard>
              ))}
            </S.EventList>
          </Card>

          <Card title="Insights para próximas decisões" subtitle="Aprendizados do histórico de contratação">
            <S.InsightList>
              {paisHistoricoMock.nextInsights.map((insight) => (
                <li key={insight}>{insight}</li>
              ))}
            </S.InsightList>
          </Card>
        </S.MainGrid>
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
