import { Badge } from "@/shared/ui";
import * as S from "./styles";

interface DashboardPreviewSectionProps {
  content: {
    welcome: string;
    highlight: string;
    opportunities: Array<{
      title: string;
      company: string;
      amount: string;
      score: string;
    }>;
  };
}

export const DashboardPreviewSection = ({ content }: DashboardPreviewSectionProps) => {
  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <h2>Uma plataforma completa para profissionais</h2>
          <p>Gerencie oportunidades, perfil profissional e carreira em um so lugar.</p>
        </S.Header>

        <S.Frame>
          <S.Welcome>
            <h3>{content.welcome}</h3>
            <p>{content.highlight}</p>
          </S.Welcome>

          <S.Jobs>
            {content.opportunities.map((item) => (
              <S.Job key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.company}</p>
                </div>
                <Badge tone="success">{item.amount}</Badge>
                <small>{item.score}</small>
              </S.Job>
            ))}
          </S.Jobs>
        </S.Frame>
      </S.Container>
    </S.Section>
  );
};
