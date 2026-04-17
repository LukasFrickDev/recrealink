import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ExternalLink,
  Image,
  Link2,
  Save,
  Star,
  UserRound,
  Wallet,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setLastVisualAction,
  setProfileSpecialties,
  updateProfile,
} from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorPerfilMock } from "@/modules/recreador/mocks/perfil";
import * as S from "./styles";

export const RecreadorPerfilPage = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.recreador.profile);

  const [fullName, setFullName] = useState(profile.fullName);
  const [roleTitle, setRoleTitle] = useState(profile.roleTitle);
  const [shortBio, setShortBio] = useState(profile.shortBio);
  const [city, setCity] = useState(profile.city);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [portfolioHeadline, setPortfolioHeadline] = useState(profile.portfolioHeadline);
  const [experienceYears, setExperienceYears] = useState(String(profile.experienceYears));
  const [specialties, setSpecialties] = useState<string[]>(profile.specialties);
  const [ageGroups, setAgeGroups] = useState<string[]>(recreadorPerfilMock.publicProfile.ageGroups);
  const [cacheRangeId, setCacheRangeId] = useState(recreadorPerfilMock.cacheRangeOptions[0]?.id ?? "");
  const [links, setLinks] = useState(() =>
    profile.portfolioLinks.length > 0 ? profile.portfolioLinks.join("\n") : "",
  );
  const [reviewResponses, setReviewResponses] = useState<Record<string, string>>(() =>
    recreadorPerfilMock.reviews.items.reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = item.suggestedResponse;
      return acc;
    }, {}),
  );
  const [feedback, setFeedback] = useState("");

  const parsedLinks = useMemo(
    () =>
      links
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    [links],
  );

  const selectedCacheRange = useMemo(
    () => recreadorPerfilMock.cacheRangeOptions.find((option) => option.id === cacheRangeId),
    [cacheRangeId],
  );

  const completion = useMemo(() => {
    const fields = [
      fullName,
      roleTitle,
      shortBio,
      city,
      email,
      phone,
      experienceYears,
      portfolioHeadline,
      cacheRangeId,
      specialties.length > 0 ? "ok" : "",
      ageGroups.length > 0 ? "ok" : "",
      parsedLinks.length > 0 ? "ok" : "",
    ];

    const done = fields.filter((item) => String(item).trim().length > 0).length;
    return Math.round((done / fields.length) * 100);
  }, [
    ageGroups.length,
    cacheRangeId,
    city,
    email,
    experienceYears,
    fullName,
    parsedLinks.length,
    phone,
    portfolioHeadline,
    roleTitle,
    shortBio,
    specialties.length,
  ]);

  const toggleSpecialty = (value: string) => {
    setSpecialties((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const toggleAgeGroup = (value: string) => {
    setAgeGroups((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const handleAbrirPerfilPublico = () => {
    const openedWindow = window.open(
      recreadorPerfilMock.publicProfileRoute,
      "_blank",
      "noopener,noreferrer",
    );

    if (!openedWindow) {
      window.location.assign(recreadorPerfilMock.publicProfileRoute);
    }

    dispatch(setLastVisualAction("Perfil publico aberto para visualizacao externa."));
  };

  const handleSalvar = () => {
    dispatch(
      updateProfile({
        fullName,
        roleTitle,
        shortBio,
        city,
        email,
        phone,
        portfolioHeadline,
        experienceYears: Number(experienceYears) || 0,
        portfolioLinks: parsedLinks,
      }),
    );
    dispatch(setProfileSpecialties(specialties));
    dispatch(setLastVisualAction("Perfil salvo visualmente na pagina unica de perfil."));
    setFeedback("Perfil atualizado. Estrutura pronta para evolucao com dados reais futuramente.");
  };

  const handleSalvarResposta = (reviewId: string) => {
    const response = reviewResponses[reviewId]?.trim();

    if (!response) {
      setFeedback("Escreva uma resposta antes de salvar o comentario da avaliacao.");
      return;
    }

    dispatch(setLastVisualAction(`Resposta visual registrada para avaliacao ${reviewId}.`));
    setFeedback("Resposta de avaliacao registrada na camada visual.");
  };

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

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorPerfilMock.title}
      pageDescription={recreadorPerfilMock.description}
      stats={[]}
    >
      <S.Wrapper>
        <S.SummaryCard>
          <S.SummaryTop>
            <S.AvatarBadge>{profile.avatarPreview}</S.AvatarBadge>

            <S.SummaryIdentity>
              <h2>{fullName}</h2>
              <p>{roleTitle}</p>
              <span>{city}</span>
            </S.SummaryIdentity>

            <S.SecondaryButton type="button" onClick={handleAbrirPerfilPublico}>
              <ExternalLink size={15} /> Visualizar perfil publico
            </S.SecondaryButton>
          </S.SummaryTop>

          <S.SummaryStats>
            <S.SummaryStat>
              <strong>{completion}%</strong>
              <span>completude do perfil</span>
            </S.SummaryStat>
            <S.SummaryStat>
              <strong>{recreadorPerfilMock.reputationSummary.ratingAverage.toFixed(1)}</strong>
              <span>avaliacao media</span>
            </S.SummaryStat>
            <S.SummaryStat>
              <strong>{recreadorPerfilMock.reputationSummary.totalReviews}</strong>
              <span>avaliacoes recebidas</span>
            </S.SummaryStat>
          </S.SummaryStats>
        </S.SummaryCard>

        <S.SectionCard>
          <S.SectionTitle>
            <UserRound size={18} /> Dados principais
          </S.SectionTitle>
          <S.FormGrid>
            <S.Field>
              <span>Nome completo</span>
              <input value={fullName} onChange={(event) => setFullName(event.target.value)} />
            </S.Field>

            <S.Field>
              <span>Titulo profissional</span>
              <input value={roleTitle} onChange={(event) => setRoleTitle(event.target.value)} />
            </S.Field>

            <S.Field>
              <span>Cidade de atuacao</span>
              <input value={city} onChange={(event) => setCity(event.target.value)} />
            </S.Field>

            <S.Field>
              <span>E-mail</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} />
            </S.Field>

            <S.Field>
              <span>Telefone</span>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} />
            </S.Field>
          </S.FormGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>
            <BriefcaseBusiness size={18} /> Descricao e apresentacao
          </S.SectionTitle>
          <S.FormGrid>
            <S.Field>
              <span>Descricao profissional</span>
              <textarea value={shortBio} onChange={(event) => setShortBio(event.target.value)} />
            </S.Field>

            <S.Field>
              <span>Resumo de portfolio</span>
              <textarea
                value={portfolioHeadline}
                onChange={(event) => setPortfolioHeadline(event.target.value)}
              />
            </S.Field>

            <S.Field>
              <span>
                <Link2 size={16} /> Links do portfolio
              </span>
              <textarea
                value={links}
                onChange={(event) => setLinks(event.target.value)}
                placeholder={"https://instagram.com/...\nhttps://drive.google.com/..."}
              />
            </S.Field>
          </S.FormGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>
            <Wallet size={18} /> Experiencia, especialidades e atuacao
          </S.SectionTitle>

          <S.FormGrid>
            <S.Field>
              <span>Anos de experiencia</span>
              <input
                value={experienceYears}
                onChange={(event) => setExperienceYears(event.target.value)}
                inputMode="numeric"
              />
            </S.Field>

            <S.Field>
              <span>Especialidades</span>
              <S.ChipsGrid>
                {recreadorPerfilMock.specialtyOptions.map((option) => (
                  <S.ChipButton
                    key={option.id}
                    type="button"
                    $selected={specialties.includes(option.label)}
                    onClick={() => toggleSpecialty(option.label)}
                  >
                    {option.label}
                  </S.ChipButton>
                ))}
              </S.ChipsGrid>
            </S.Field>

            <S.Field>
              <span>Faixa etaria de atuacao</span>
              <S.ChipsGrid>
                {recreadorPerfilMock.ageGroupOptions.map((option) => (
                  <S.ChipButton
                    key={option.id}
                    type="button"
                    $selected={ageGroups.includes(option.label)}
                    onClick={() => toggleAgeGroup(option.label)}
                  >
                    {option.label}
                  </S.ChipButton>
                ))}
              </S.ChipsGrid>
            </S.Field>

            <S.Field>
              <span>Faixa de caches</span>
              <S.OptionsGrid>
                {recreadorPerfilMock.cacheRangeOptions.map((option) => (
                  <S.OptionButton
                    key={option.id}
                    type="button"
                    $selected={cacheRangeId === option.id}
                    onClick={() => setCacheRangeId(option.id)}
                  >
                    <strong>{option.label}</strong>
                    <small>{option.helper}</small>
                  </S.OptionButton>
                ))}
              </S.OptionsGrid>
              {selectedCacheRange ? <S.InlineHelper>Selecionado: {selectedCacheRange.label}</S.InlineHelper> : null}
            </S.Field>
          </S.FormGrid>

          <S.ExperienceList>
            {recreadorPerfilMock.experienceItems.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.location}</span>
                <small>{item.dateLabel}</small>
                <p>{item.audienceLabel}</p>
              </li>
            ))}
          </S.ExperienceList>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>
            <Image size={18} /> Galeria
          </S.SectionTitle>
          <S.GalleryGrid>
            {recreadorPerfilMock.gallery.map((item) => (
              <S.GalleryCard key={item.id}>
                <S.GalleryImage $image={item.image} />
                <S.GalleryCaption>{item.description}</S.GalleryCaption>
              </S.GalleryCard>
            ))}
          </S.GalleryGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>
            <Star size={18} /> Avaliacoes
          </S.SectionTitle>

          <S.ReputationCard>
            <S.ReputationLine>
              <strong>{recreadorPerfilMock.reputationSummary.ratingAverage.toFixed(1)}</strong>
              {renderStars(recreadorPerfilMock.reputationSummary.ratingAverage, "perfil")}
              <span>{recreadorPerfilMock.reputationSummary.totalReviews} avaliacoes recebidas</span>
            </S.ReputationLine>

            <S.MetricsGrid>
              {recreadorPerfilMock.reputationSummary.metrics.map((metric) => (
                <S.MetricItem key={metric.id}>
                  <S.MetricHeader>
                    <span>{metric.label}</span>
                    <span>{metric.value}%</span>
                  </S.MetricHeader>
                  <S.MetricTrack>
                    <S.MetricFill $value={metric.value} />
                  </S.MetricTrack>
                </S.MetricItem>
              ))}
            </S.MetricsGrid>
          </S.ReputationCard>

          <S.ReviewGrid>
            {recreadorPerfilMock.reviews.items.map((item) => (
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

                <S.Field>
                  <span>Resposta do recreador (futuro backend)</span>
                  <textarea
                    value={reviewResponses[item.id] ?? ""}
                    onChange={(event) =>
                      setReviewResponses((prev) => ({
                        ...prev,
                        [item.id]: event.target.value,
                      }))
                    }
                    placeholder="Escreva uma resposta para esta avaliacao"
                  />
                  <S.SecondaryButton type="button" onClick={() => handleSalvarResposta(item.id)}>
                    Salvar resposta
                  </S.SecondaryButton>
                </S.Field>
              </S.ReviewCard>
            ))}
          </S.ReviewGrid>
        </S.SectionCard>

        <S.ActionsRow>
          <S.PrimaryButton type="button" onClick={handleSalvar}>
            <Save size={15} /> Salvar perfil
          </S.PrimaryButton>
        </S.ActionsRow>

        {feedback ? <S.Feedback>{feedback}</S.Feedback> : null}
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
