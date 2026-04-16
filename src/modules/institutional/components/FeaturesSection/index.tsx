import type { AudienceKey } from "@/modules/institutional/mocks/home";
import * as S from "./styles";

interface FeaturesSectionProps {
  selectedAudience: AudienceKey | null;
  content: Record<
    AudienceKey,
    {
      title: string;
      subtitle: string;
      cards: Array<{
        title: string;
        description: string;
      }>;
    }
  >;
}

export const FeaturesSection = ({ selectedAudience, content }: FeaturesSectionProps) => {
  const audience = selectedAudience ?? "recreador";
  const section = content[audience];

  return (
    <S.Section id="funcionalidades">
      <S.Container>
        <S.Header>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
        </S.Header>

        <S.Grid>
          {section.cards.map((card) => (
            <S.Card key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </S.Card>
          ))}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};
