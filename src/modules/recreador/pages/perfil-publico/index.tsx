import { Link2, MapPin, ShieldCheck, Star } from "lucide-react";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorPerfilMock } from "@/modules/recreador/mocks/perfil";
import * as S from "./styles";

const buildInitials = (value: string) =>
  value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

const renderStars = (rating: number, idPrefix: string) => (
  <S.Stars>
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={`${idPrefix}-${index + 1}`}
        size={14}
        fill={index < Math.round(rating) ? "currentColor" : "none"}
      />
    ))}
  </S.Stars>
);

export const RecreadorPerfilPublicoPage = () => {
  const { publicProfile, reviews, reputationSummary } = recreadorPerfilMock;
  const publicReviews = reviews.items.filter((item) => item.visibility === "publica");

  return (
    <RecreadorDashboardShell
      pageTitle="Perfil publico"
      pageDescription="Visualizacao externa da vitrine profissional, com informacoes publicas e avaliacoes visiveis."
      stats={[]}
    >
      <S.Wrapper>
        <S.HeroCard>
          <S.HeroTop>
            <S.IdentityBlock>
              <S.Avatar>{buildInitials(publicProfile.displayName)}</S.Avatar>
              <S.Identity>
                <h2>{publicProfile.displayName}</h2>
                <strong>{publicProfile.roleLabel}</strong>
                <p>{publicProfile.headline}</p>
              </S.Identity>
            </S.IdentityBlock>

            <S.MetaRow>
              <S.MetaBadge>
                <MapPin size={14} /> {publicProfile.city}
              </S.MetaBadge>
              <S.MetaBadge>
                <Link2 size={14} /> {publicProfile.cacheRangeLabel}
              </S.MetaBadge>
            </S.MetaRow>
          </S.HeroTop>

          <S.Bio>{publicProfile.bio}</S.Bio>
        </S.HeroCard>

        <S.Grid>
          <S.Card>
            <S.CardTitle>Especialidades</S.CardTitle>
            <S.Chips>
              {publicProfile.specialties.map((item) => (
                <S.Chip key={item}>{item}</S.Chip>
              ))}
            </S.Chips>
          </S.Card>

          <S.Card>
            <S.CardTitle>Faixa etaria de atuacao</S.CardTitle>
            <S.Chips>
              {publicProfile.ageGroups.map((item) => (
                <S.Chip key={item}>{item}</S.Chip>
              ))}
            </S.Chips>
          </S.Card>

          <S.Card>
            <S.CardTitle>Destaques da galeria</S.CardTitle>
            <S.Chips>
              {publicProfile.galleryHighlights.map((item) => (
                <S.Chip key={item}>{item}</S.Chip>
              ))}
            </S.Chips>
          </S.Card>

          <S.Card>
            <S.CardTitle>
              <ShieldCheck size={16} /> Regras de visibilidade
            </S.CardTitle>
            <S.RuleList>
              {publicProfile.visibilityRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </S.RuleList>
          </S.Card>
        </S.Grid>

        <S.Card>
          <S.CardTitle>Avaliacoes publicas</S.CardTitle>
          <S.ReputationLine>
            <strong>{reputationSummary.ratingAverage.toFixed(1)}</strong>
            {renderStars(reputationSummary.ratingAverage, "public-summary")}
            <span>{reputationSummary.totalReviews} avaliacoes visiveis</span>
          </S.ReputationLine>
          <S.Policy>{reviews.policyLabel}</S.Policy>

          <S.ReviewGrid>
            {publicReviews.map((item) => (
              <S.ReviewCard key={item.id}>
                <S.ReviewTop>
                  <strong>{item.author}</strong>
                  <span>{item.dateLabel}</span>
                </S.ReviewTop>
                <S.ReviewMeta>
                  <span>{item.authorRole}</span>
                  <span>{item.sourceLabel}</span>
                </S.ReviewMeta>
                {renderStars(item.rating, item.id)}
                <S.ReviewText>{item.comment}</S.ReviewText>
              </S.ReviewCard>
            ))}
          </S.ReviewGrid>
        </S.Card>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
