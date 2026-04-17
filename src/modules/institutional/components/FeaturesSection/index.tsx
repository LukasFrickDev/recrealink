import type { AudienceKey } from "@/modules/institutional/mocks/home";
import * as S from "./styles";

interface FeaturesSectionProps {
  selectedAudience: AudienceKey | null;
  content: Record<
    AudienceKey,
    {
      title: string;
      subtitle: string;
      flavor: string;
      cards: Array<{
        title: string;
        description: string;
        icon: string;
        badge: string;
      }>;
    }
  >;
}

export const FeaturesSection = ({ selectedAudience, content }: FeaturesSectionProps) => {
  const audience = selectedAudience ?? "recreador";
  const section = content[audience];
  const initialPreviewCards = Object.values(content)
    .map((block) => block.cards[0])
    .filter(Boolean)
    .slice(0, 4);

  return (
    <S.Section id="funcionalidades" $tone={audience}>
      <S.Container>
        <S.Header>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
          <S.Flavor>{section.flavor}</S.Flavor>
        </S.Header>

        {!selectedAudience ? (
          <S.EmptyIntro>
            <strong>Selecione um perfil acima para personalizar esta seção.</strong>
            <p>
              Enquanto isso, você visualiza um recorte inicial das capacidades que conectam recreadores,
              hotelaria, empresas e famílias.
            </p>
            <S.PreviewGrid>
              {initialPreviewCards.map((card) => (
                <article key={card.title}>
                  <span>{card.icon}</span>
                  <strong>{card.title}</strong>
                </article>
              ))}
            </S.PreviewGrid>
          </S.EmptyIntro>
        ) : null}

        <S.Grid>
          {section.cards.map((card) => (
            <S.Card key={card.title}>
              <S.CardHeader>
                <span>{card.icon}</span>
                <small>{card.badge}</small>
              </S.CardHeader>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </S.Card>
          ))}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};
