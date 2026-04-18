import { useMemo } from "react";
import { ArrowLeft, Globe2, Link2, MapPin, ShieldCheck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { recreadorPerfilMock } from "@/modules/recreador/mocks/perfil";
import { readPublicProfileSnapshot } from "@/modules/recreador/utils/publicProfileSnapshot";
import * as S from "./styles";

const buildInitials = (value: string) =>
  value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

const publicShowcaseTracks = [
  {
    id: "hotelaria",
    title: "Atuação em hotelaria",
    helper: "Operação com famílias em resorts e hotéis de lazer.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "eventos",
    title: "Atuação em eventos",
    helper: "Entregas em eventos sociais e corporativos com dinâmica ativa.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  },
] as const;

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
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.recreador.profile);
  const snapshot = readPublicProfileSnapshot();

  const { reviews, reputationSummary } = recreadorPerfilMock;

  const publicProfile = {
    displayName: snapshot?.displayName ?? profile.fullName,
    roleLabel: snapshot?.roleLabel ?? profile.roleTitle,
    headline: snapshot?.headline ?? profile.portfolioHeadline,
    bio: snapshot?.bio ?? profile.shortBio,
    city: snapshot?.city ?? profile.city,
    specialties:
      snapshot && snapshot.specialties.length > 0 ? snapshot.specialties : profile.specialties,
    ageGroups:
      snapshot && snapshot.ageGroups.length > 0
        ? snapshot.ageGroups
        : recreadorPerfilMock.publicProfile.ageGroups,
    cacheRangeLabel:
      snapshot && snapshot.cacheRangeLabel.length > 0
        ? snapshot.cacheRangeLabel
        : recreadorPerfilMock.publicProfile.cacheRangeLabel,
    galleryHighlights:
      snapshot && snapshot.specialties.length > 0
        ? snapshot.specialties.slice(0, 3)
        : profile.specialties.slice(0, 3),
    visibilityRules: recreadorPerfilMock.publicProfile.visibilityRules,
    portfolioLinks:
      snapshot && snapshot.portfolioLinks.length > 0
        ? snapshot.portfolioLinks
        : profile.portfolioLinks,
  };

  const updatedLabel = useMemo(() => {
    if (!snapshot?.updatedAt) {
      return "Baseado nos dados atuais do perfil profissional.";
    }

    const parsedDate = new Date(snapshot.updatedAt);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Atualização recente da vitrine pública.";
    }

    const formatted = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(parsedDate);

    return `Atualizado em ${formatted}.`;
  }, [snapshot?.updatedAt]);

  const publicReviews = reviews.items.filter((item) => item.visibility === "publica");

  return (
    <S.Page>
      <S.Atmosphere />

      <S.Container>
        <S.Topbar>
          <S.PublicBadge>
            <Globe2 size={14} /> Vitrine pública
          </S.PublicBadge>

          <S.TopbarActions>
            <S.GhostButton type="button" onClick={() => navigate("/app/recreador/perfil")}>
              <ArrowLeft size={14} /> Voltar para edição
            </S.GhostButton>
          </S.TopbarActions>
        </S.Topbar>

        <S.HeroCard>
          <S.HeroTop>
            <S.IdentityBlock>
              <S.Avatar>{buildInitials(publicProfile.displayName)}</S.Avatar>

              <S.Identity>
                <h1>{publicProfile.displayName}</h1>
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

          <S.ShowcaseGrid>
            {publicShowcaseTracks.map((track) => (
              <S.ShowcaseCard key={track.id}>
                <S.ShowcaseMedia>
                  <img src={track.image} alt={track.title} loading="lazy" />
                </S.ShowcaseMedia>
                <S.ShowcaseCopy>
                  <strong>{track.title}</strong>
                  <span>{track.helper}</span>
                </S.ShowcaseCopy>
              </S.ShowcaseCard>
            ))}
          </S.ShowcaseGrid>

          <S.HeroFooter>
            <S.HeroStat>
              <strong>{reputationSummary.ratingAverage.toFixed(1)}</strong>
              <span>avaliação média</span>
            </S.HeroStat>
            <S.HeroStat>
              <strong>{reputationSummary.totalReviews}</strong>
              <span>avaliações públicas</span>
            </S.HeroStat>
            <S.HeroStat>
              <strong>{publicProfile.specialties.length}</strong>
              <span>especialidades ativas</span>
            </S.HeroStat>
            <S.UpdatedLabel>{updatedLabel}</S.UpdatedLabel>
          </S.HeroFooter>
        </S.HeroCard>

        <S.HighlightsGrid>
          <S.HighlightCard>
            <S.CardTitle>Especialidades</S.CardTitle>
            <S.Chips>
              {publicProfile.specialties.length === 0 ? (
                <S.EmptyCopy>Sem especialidades publicadas no momento.</S.EmptyCopy>
              ) : (
                publicProfile.specialties.map((item) => <S.Chip key={item}>{item}</S.Chip>)
              )}
            </S.Chips>
          </S.HighlightCard>

          <S.HighlightCard>
            <S.CardTitle>Faixa etária de atuação</S.CardTitle>
            <S.Chips>
              {publicProfile.ageGroups.length === 0 ? (
                <S.EmptyCopy>Sem faixa etária publicada no momento.</S.EmptyCopy>
              ) : (
                publicProfile.ageGroups.map((item) => <S.Chip key={item}>{item}</S.Chip>)
              )}
            </S.Chips>
          </S.HighlightCard>

          <S.HighlightCard>
            <S.CardTitle>Destaques da galeria</S.CardTitle>
            <S.Chips>
              {publicProfile.galleryHighlights.length === 0 ? (
                <S.EmptyCopy>Sem destaques de galeria publicados.</S.EmptyCopy>
              ) : (
                publicProfile.galleryHighlights.map((item) => <S.Chip key={item}>{item}</S.Chip>)
              )}
            </S.Chips>
          </S.HighlightCard>

          <S.HighlightCard>
            <S.CardTitle>Links do portfólio</S.CardTitle>
            {publicProfile.portfolioLinks.length === 0 ? (
              <S.EmptyCopy>Sem links publicados no portfólio.</S.EmptyCopy>
            ) : (
              <S.LinkList>
                {publicProfile.portfolioLinks.map((link) => (
                  <li key={link}>
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </S.LinkList>
            )}
          </S.HighlightCard>

          <S.HighlightCard>
            <S.CardTitle>
              <ShieldCheck size={16} /> Regras de visibilidade
            </S.CardTitle>
            <S.RuleList>
              {publicProfile.visibilityRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </S.RuleList>
          </S.HighlightCard>
        </S.HighlightsGrid>

        <S.ReviewsCard>
          <S.ReviewsHeader>
            <S.CardTitle>Avaliações públicas</S.CardTitle>

            <S.ReputationLine>
              <strong>{reputationSummary.ratingAverage.toFixed(1)}</strong>
              {renderStars(reputationSummary.ratingAverage, "public-summary")}
              <span>{reputationSummary.totalReviews} avaliações visíveis</span>
            </S.ReputationLine>
          </S.ReviewsHeader>

          <S.Policy>{reviews.policyLabel}</S.Policy>

          <S.ReviewGrid>
            {publicReviews.length === 0 ? (
              <S.EmptyCopy>Sem avaliações públicas disponíveis no momento.</S.EmptyCopy>
            ) : (
              publicReviews.map((item) => (
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
              ))
            )}
          </S.ReviewGrid>
        </S.ReviewsCard>
      </S.Container>
    </S.Page>
  );
};