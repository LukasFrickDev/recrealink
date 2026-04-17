import { Badge } from "@/shared/ui";
import * as S from "./styles";

interface DashboardPreviewSectionProps {
  content: {
    welcome: string;
    highlight: string;
    pills: string[];
    opportunities: Array<{
      title: string;
      company: string;
      amount: string;
      score: string;
      schedule: string;
    }>;
    quickStats: Array<{ label: string; value: string }>;
  };
}

export const DashboardPreviewSection = ({ content }: DashboardPreviewSectionProps) => {
  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <h2>Uma plataforma completa para profissionais</h2>
          <p>Gerencie oportunidades, performance e operação em uma experiência visual clara e madura.</p>
        </S.Header>

        <S.Frame>
          <S.TopBar>
            <strong>RecreaLink Dashboard</strong>
            <S.TopBarTags>
              <span>Explorar</span>
              <span>Agenda</span>
              <span>Perfil</span>
            </S.TopBarTags>
          </S.TopBar>

          <S.Welcome>
            <h3>{content.welcome}</h3>
            <p>{content.highlight}</p>

            <S.HighlightPills>
              {content.pills.map((pill) => (
                <Badge key={pill} tone="brand">
                  {pill}
                </Badge>
              ))}
            </S.HighlightPills>
          </S.Welcome>

          <S.Body>
            <S.Jobs>
              {content.opportunities.map((item) => (
                <S.Job key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.company}</p>
                  </div>
                  <S.JobMeta>
                    <Badge tone="success">{item.amount}</Badge>
                    <small>{item.score}</small>
                    <em>{item.schedule}</em>
                  </S.JobMeta>
                </S.Job>
              ))}
            </S.Jobs>

            <S.SidePanel>
              {content.quickStats.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </S.SidePanel>
          </S.Body>
        </S.Frame>
      </S.Container>
    </S.Section>
  );
};
