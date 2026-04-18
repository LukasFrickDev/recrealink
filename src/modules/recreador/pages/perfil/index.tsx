import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ExternalLink,
  Image,
  Link2,
  Pencil,
  Plus,
  Save,
  Star,
  Trash2,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setLastVisualAction,
  setProfileSpecialties,
  updateProfile,
} from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import {
  recreadorPerfilMock,
  type ProfileCertificationItem,
  type ProfileExperienceItem,
  type ProfileGalleryItem,
} from "@/modules/recreador/mocks/perfil";
import {
  readPublicProfileSnapshot,
  savePublicProfileSnapshot,
} from "@/modules/recreador/pages/perfil/publicProfileSnapshot";
import { useToast } from "@/shared/ui/Toast";
import * as S from "./styles";

type EditableLinkItem = {
  id: string;
  url: string;
};

type ProfileDraftSnapshot = {
  fullName: string;
  roleTitle: string;
  shortBio: string;
  city: string;
  email: string;
  phone: string;
  portfolioHeadline: string;
  experienceYears: string;
  specialties: string[];
  ageGroups: string[];
  cacheRangeId: string;
  links: EditableLinkItem[];
  experienceItems: ProfileExperienceItem[];
  certificationItems: ProfileCertificationItem[];
  galleryItems: ProfileGalleryItem[];
};

type ExperienceDraftState = {
  title: string;
  location: string;
  dateLabel: string;
  audienceLabel: string;
  highlights: string;
};

type CertificationDraftState = {
  title: string;
  institution: string;
  validityLabel: string;
  status: ProfileCertificationItem["status"];
};

type GalleryDraftState = {
  image: string;
  description: string;
};

const EXPERIENCE_DRAFT_INITIAL: ExperienceDraftState = {
  title: "",
  location: "",
  dateLabel: "",
  audienceLabel: "",
  highlights: "",
};

const CERTIFICATION_DRAFT_INITIAL: CertificationDraftState = {
  title: "",
  institution: "",
  validityLabel: "",
  status: "valido",
};

const GALLERY_DRAFT_INITIAL: GalleryDraftState = {
  image: "",
  description: "",
};

const createLocalId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const cloneExperienceItems = (items: readonly ProfileExperienceItem[]): ProfileExperienceItem[] =>
  items.map((item) => ({
    ...item,
    highlights: [...item.highlights],
  }));

const cloneCertificationItems = (
  items: readonly ProfileCertificationItem[],
): ProfileCertificationItem[] => items.map((item) => ({ ...item }));

const cloneGalleryItems = (items: readonly ProfileGalleryItem[]): ProfileGalleryItem[] =>
  items.map((item) => ({ ...item }));

const cloneLinks = (links: EditableLinkItem[]): EditableLinkItem[] => links.map((item) => ({ ...item }));

const parseHighlights = (rawValue: string): string[] =>
  rawValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const certificationStatusLabel: Record<ProfileCertificationItem["status"], string> = {
  valido: "Válido",
  atualizar: "Atualizar",
};

export const RecreadorPerfilPage = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.recreador.profile);
  const { success, info, warning } = useToast();

  const initialPublicProfileSnapshot = useMemo(() => readPublicProfileSnapshot(), []);

  const [savedSnapshot, setSavedSnapshot] = useState<ProfileDraftSnapshot>(() => {
    const initialLinksSource =
      profile.portfolioLinks.length > 0
        ? profile.portfolioLinks
        : initialPublicProfileSnapshot?.portfolioLinks ?? [];

    return {
      fullName: profile.fullName,
      roleTitle: profile.roleTitle,
      shortBio: profile.shortBio,
      city: profile.city,
      email: profile.email,
      phone: profile.phone,
      portfolioHeadline: profile.portfolioHeadline,
      experienceYears: String(profile.experienceYears),
      specialties: [...profile.specialties],
      ageGroups: [...(initialPublicProfileSnapshot?.ageGroups ?? recreadorPerfilMock.publicProfile.ageGroups)],
      cacheRangeId:
        recreadorPerfilMock.cacheRangeOptions.find(
          (option) => option.label === initialPublicProfileSnapshot?.cacheRangeLabel,
        )?.id ?? recreadorPerfilMock.cacheRangeOptions[0]?.id ?? "",
      links: initialLinksSource.map((url, index) => ({
        id: `link-initial-${index + 1}`,
        url,
      })),
      experienceItems: cloneExperienceItems(recreadorPerfilMock.experienceItems),
      certificationItems: cloneCertificationItems(recreadorPerfilMock.certifications),
      galleryItems: cloneGalleryItems(recreadorPerfilMock.gallery),
    };
  });

  const [fullName, setFullName] = useState(savedSnapshot.fullName);
  const [roleTitle, setRoleTitle] = useState(savedSnapshot.roleTitle);
  const [shortBio, setShortBio] = useState(savedSnapshot.shortBio);
  const [city, setCity] = useState(savedSnapshot.city);
  const [email, setEmail] = useState(savedSnapshot.email);
  const [phone, setPhone] = useState(savedSnapshot.phone);
  const [portfolioHeadline, setPortfolioHeadline] = useState(savedSnapshot.portfolioHeadline);
  const [experienceYears, setExperienceYears] = useState(savedSnapshot.experienceYears);
  const [specialties, setSpecialties] = useState<string[]>(savedSnapshot.specialties);
  const [ageGroups, setAgeGroups] = useState<string[]>(savedSnapshot.ageGroups);
  const [cacheRangeId, setCacheRangeId] = useState<string>(savedSnapshot.cacheRangeId);
  const [links, setLinks] = useState<EditableLinkItem[]>(savedSnapshot.links);
  const [experienceItems, setExperienceItems] = useState<ProfileExperienceItem[]>(
    savedSnapshot.experienceItems,
  );
  const [certificationItems, setCertificationItems] = useState<ProfileCertificationItem[]>(
    savedSnapshot.certificationItems,
  );
  const [galleryItems, setGalleryItems] = useState<ProfileGalleryItem[]>(savedSnapshot.galleryItems);

  const [linkDraft, setLinkDraft] = useState("");
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  const [experienceDraft, setExperienceDraft] = useState<ExperienceDraftState>(EXPERIENCE_DRAFT_INITIAL);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);

  const [certificationDraft, setCertificationDraft] = useState<CertificationDraftState>(
    CERTIFICATION_DRAFT_INITIAL,
  );
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);

  const [galleryDraft, setGalleryDraft] = useState<GalleryDraftState>(GALLERY_DRAFT_INITIAL);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

  const [reviewResponses, setReviewResponses] = useState<Record<string, string>>(() =>
    recreadorPerfilMock.reviews.items.reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = item.suggestedResponse;
      return acc;
    }, {}),
  );

  const selectedCacheRange = useMemo(
    () => recreadorPerfilMock.cacheRangeOptions.find((option) => option.id === cacheRangeId),
    [cacheRangeId],
  );

  const parsedLinks = useMemo(
    () => links.map((item) => item.url.trim()).filter(Boolean),
    [links],
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
      experienceItems.length > 0 ? "ok" : "",
      certificationItems.length > 0 ? "ok" : "",
      galleryItems.length > 0 ? "ok" : "",
    ];

    const done = fields.filter((item) => String(item).trim().length > 0).length;
    return Math.round((done / fields.length) * 100);
  }, [
    ageGroups.length,
    cacheRangeId,
    certificationItems.length,
    city,
    email,
    experienceItems.length,
    experienceYears,
    fullName,
    galleryItems.length,
    parsedLinks.length,
    phone,
    portfolioHeadline,
    roleTitle,
    shortBio,
    specialties.length,
  ]);

  const toggleSpecialty = (value: string) => {
    setSpecialties((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value],
    );
  };

  const toggleAgeGroup = (value: string) => {
    setAgeGroups((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value],
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

    dispatch(setLastVisualAction("Perfil público aberto para visualização externa."));
  };

  const resetTransientForms = () => {
    setLinkDraft("");
    setEditingLinkId(null);
    setExperienceDraft(EXPERIENCE_DRAFT_INITIAL);
    setEditingExperienceId(null);
    setCertificationDraft(CERTIFICATION_DRAFT_INITIAL);
    setEditingCertificationId(null);
    setGalleryDraft(GALLERY_DRAFT_INITIAL);
    setEditingGalleryId(null);
  };

  const collectCurrentSnapshot = (): ProfileDraftSnapshot => ({
    fullName,
    roleTitle,
    shortBio,
    city,
    email,
    phone,
    portfolioHeadline,
    experienceYears,
    specialties: [...specialties],
    ageGroups: [...ageGroups],
    cacheRangeId,
    links: cloneLinks(links),
    experienceItems: cloneExperienceItems(experienceItems),
    certificationItems: cloneCertificationItems(certificationItems),
    galleryItems: cloneGalleryItems(galleryItems),
  });

  const applySnapshot = (snapshot: ProfileDraftSnapshot) => {
    setFullName(snapshot.fullName);
    setRoleTitle(snapshot.roleTitle);
    setShortBio(snapshot.shortBio);
    setCity(snapshot.city);
    setEmail(snapshot.email);
    setPhone(snapshot.phone);
    setPortfolioHeadline(snapshot.portfolioHeadline);
    setExperienceYears(snapshot.experienceYears);
    setSpecialties([...snapshot.specialties]);
    setAgeGroups([...snapshot.ageGroups]);
    setCacheRangeId(snapshot.cacheRangeId);
    setLinks(cloneLinks(snapshot.links));
    setExperienceItems(cloneExperienceItems(snapshot.experienceItems));
    setCertificationItems(cloneCertificationItems(snapshot.certificationItems));
    setGalleryItems(cloneGalleryItems(snapshot.galleryItems));
  };

  const confirmRemoval = (itemLabel: string) => {
    const confirmed = window.confirm(
      `Confirmar remoção: ${itemLabel}? Esta ação afeta o rascunho atual do perfil.`,
    );

    if (!confirmed) {
      info({
        title: "Remoção cancelada",
        description: "O item foi mantido na lista atual do perfil.",
      });
    }

    return confirmed;
  };

  const handleSalvar = () => {
    if (!fullName.trim() || !roleTitle.trim() || !city.trim()) {
      warning({
        title: "Campos obrigatórios",
        description: "Preencha nome, título profissional e cidade antes de salvar o perfil.",
      });
      return;
    }

    const snapshot = collectCurrentSnapshot();
    const snapshotLinks = snapshot.links.map((item) => item.url.trim()).filter(Boolean);

    dispatch(
      updateProfile({
        fullName: snapshot.fullName,
        roleTitle: snapshot.roleTitle,
        shortBio: snapshot.shortBio,
        city: snapshot.city,
        email: snapshot.email,
        phone: snapshot.phone,
        portfolioHeadline: snapshot.portfolioHeadline,
        experienceYears: Number(snapshot.experienceYears) || 0,
        portfolioLinks: snapshotLinks,
      }),
    );
    dispatch(setProfileSpecialties(snapshot.specialties));

    savePublicProfileSnapshot({
      displayName: snapshot.fullName,
      roleLabel: snapshot.roleTitle,
      headline: snapshot.portfolioHeadline,
      bio: snapshot.shortBio,
      city: snapshot.city,
      specialties: snapshot.specialties,
      ageGroups: snapshot.ageGroups,
      cacheRangeLabel: selectedCacheRange?.label ?? "",
      portfolioLinks: snapshotLinks,
      updatedAt: new Date().toISOString(),
    });

    setSavedSnapshot(snapshot);
    resetTransientForms();

    dispatch(setLastVisualAction("Perfil do recreador atualizado."));
    success({
      title: "Perfil salvo",
      description: "Dados principais e conteúdo operacional do perfil foram atualizados.",
    });
  };

  const handleCancelarAlteracoes = () => {
    const hasSnapshotChanges =
      JSON.stringify(collectCurrentSnapshot()) !== JSON.stringify(savedSnapshot);
    const hasDraftChanges =
      linkDraft.trim().length > 0 ||
      editingLinkId !== null ||
      experienceDraft.title.trim().length > 0 ||
      experienceDraft.location.trim().length > 0 ||
      experienceDraft.dateLabel.trim().length > 0 ||
      experienceDraft.audienceLabel.trim().length > 0 ||
      experienceDraft.highlights.trim().length > 0 ||
      editingExperienceId !== null ||
      certificationDraft.title.trim().length > 0 ||
      certificationDraft.institution.trim().length > 0 ||
      certificationDraft.validityLabel.trim().length > 0 ||
      editingCertificationId !== null ||
      galleryDraft.image.trim().length > 0 ||
      galleryDraft.description.trim().length > 0 ||
      editingGalleryId !== null;

    if (
      (hasSnapshotChanges || hasDraftChanges) &&
      !window.confirm("Descartar alterações não salvas do perfil e restaurar o último estado salvo?")
    ) {
      info({
        title: "Cancelamento interrompido",
        description: "As alterações permanecem na tela para revisão.",
      });
      return;
    }

    applySnapshot(savedSnapshot);
    resetTransientForms();
    info({
      title: "Alterações descartadas",
      description: "O perfil voltou para o último estado salvo nesta sessão.",
    });
  };

  const handleSaveLink = () => {
    const normalizedUrl = linkDraft.trim();

    if (!normalizedUrl) {
      warning({
        title: "Link vazio",
        description: "Preencha a URL antes de adicionar ou atualizar um link.",
      });
      return;
    }

    if (editingLinkId) {
      setLinks((previous) =>
        previous.map((item) =>
          item.id === editingLinkId
            ? {
                ...item,
                url: normalizedUrl,
              }
            : item,
        ),
      );
      success({
        title: "Link atualizado",
        description: "O link do portfólio foi atualizado na lista local.",
      });
    } else {
      setLinks((previous) => [...previous, { id: createLocalId("link"), url: normalizedUrl }]);
      success({
        title: "Link adicionado",
        description: "Novo link de portfólio incluído para próximo salvamento do perfil.",
      });
    }

    setLinkDraft("");
    setEditingLinkId(null);
  };

  const handleEditLink = (item: EditableLinkItem) => {
    setEditingLinkId(item.id);
    setLinkDraft(item.url);
  };

  const handleRemoveLink = (linkId: string) => {
    const target = links.find((item) => item.id === linkId);

    if (!target) {
      warning({
        title: "Link indisponível",
        description: "Não foi possível localizar este link para remoção.",
      });
      return;
    }

    if (!confirmRemoval("este link do portfólio")) {
      return;
    }

    setLinks((previous) => previous.filter((item) => item.id !== linkId));

    if (editingLinkId === linkId) {
      setEditingLinkId(null);
      setLinkDraft("");
    }

    info({
      title: "Link removido",
      description: "O link foi removido da lista local do portfólio.",
    });
  };

  const handleSaveExperience = () => {
    const title = experienceDraft.title.trim();
    const location = experienceDraft.location.trim();
    const dateLabel = experienceDraft.dateLabel.trim();
    const audienceLabel = experienceDraft.audienceLabel.trim();
    const highlights = parseHighlights(experienceDraft.highlights);

    if (!title || !location || !dateLabel || !audienceLabel) {
      warning({
        title: "Experiência incompleta",
        description: "Preencha título, local, data e público para salvar a experiência.",
      });
      return;
    }

    if (editingExperienceId) {
      setExperienceItems((previous) =>
        previous.map((item) =>
          item.id === editingExperienceId
            ? {
                ...item,
                title,
                location,
                dateLabel,
                audienceLabel,
                highlights,
              }
            : item,
        ),
      );
      success({
        title: "Experiência atualizada",
        description: "A experiência selecionada foi atualizada com sucesso.",
      });
    } else {
      setExperienceItems((previous) => [
        ...previous,
        {
          id: createLocalId("exp"),
          title,
          location,
          dateLabel,
          audienceLabel,
          highlights,
        },
      ]);
      success({
        title: "Experiência adicionada",
        description: "Nova experiência incluída na vitrine interna do perfil.",
      });
    }

    setExperienceDraft(EXPERIENCE_DRAFT_INITIAL);
    setEditingExperienceId(null);
  };

  const handleEditExperience = (item: ProfileExperienceItem) => {
    setEditingExperienceId(item.id);
    setExperienceDraft({
      title: item.title,
      location: item.location,
      dateLabel: item.dateLabel,
      audienceLabel: item.audienceLabel,
      highlights: item.highlights.join(", "),
    });
  };

  const handleRemoveExperience = (experienceId: string) => {
    const target = experienceItems.find((item) => item.id === experienceId);

    if (!target) {
      warning({
        title: "Experiência indisponível",
        description: "Não foi possível localizar esta experiência para remoção.",
      });
      return;
    }

    if (!confirmRemoval(`a experiência ${target.title}`)) {
      return;
    }

    setExperienceItems((previous) => previous.filter((item) => item.id !== experienceId));

    if (editingExperienceId === experienceId) {
      setEditingExperienceId(null);
      setExperienceDraft(EXPERIENCE_DRAFT_INITIAL);
    }

    info({
      title: "Experiência removida",
      description: "A experiência foi removida da lista operacional do perfil.",
    });
  };

  const handleSaveCertification = () => {
    const title = certificationDraft.title.trim();
    const institution = certificationDraft.institution.trim();
    const validityLabel = certificationDraft.validityLabel.trim();

    if (!title || !institution || !validityLabel) {
      warning({
        title: "Certificação incompleta",
        description: "Preencha título, instituição e validade para salvar a certificação.",
      });
      return;
    }

    if (editingCertificationId) {
      setCertificationItems((previous) =>
        previous.map((item) =>
          item.id === editingCertificationId
            ? {
                ...item,
                title,
                institution,
                validityLabel,
                status: certificationDraft.status,
              }
            : item,
        ),
      );
      success({
        title: "Certificação atualizada",
        description: "A certificação selecionada foi atualizada na lista atual.",
      });
    } else {
      setCertificationItems((previous) => [
        ...previous,
        {
          id: createLocalId("cert"),
          title,
          institution,
          validityLabel,
          status: certificationDraft.status,
        },
      ]);
      success({
        title: "Certificação adicionada",
        description: "Nova certificação registrada no perfil operacional.",
      });
    }

    setCertificationDraft(CERTIFICATION_DRAFT_INITIAL);
    setEditingCertificationId(null);
  };

  const handleEditCertification = (item: ProfileCertificationItem) => {
    setEditingCertificationId(item.id);
    setCertificationDraft({
      title: item.title,
      institution: item.institution,
      validityLabel: item.validityLabel,
      status: item.status,
    });
  };

  const handleRemoveCertification = (certificationId: string) => {
    const target = certificationItems.find((item) => item.id === certificationId);

    if (!target) {
      warning({
        title: "Certificação indisponível",
        description: "Não foi possível localizar esta certificação para remoção.",
      });
      return;
    }

    if (!confirmRemoval(`a certificação ${target.title}`)) {
      return;
    }

    setCertificationItems((previous) => previous.filter((item) => item.id !== certificationId));

    if (editingCertificationId === certificationId) {
      setEditingCertificationId(null);
      setCertificationDraft(CERTIFICATION_DRAFT_INITIAL);
    }

    info({
      title: "Certificação removida",
      description: "A certificação foi removida da lista atual do perfil.",
    });
  };

  const handleSaveGalleryItem = () => {
    const image = galleryDraft.image.trim();
    const description = galleryDraft.description.trim();

    if (!description) {
      warning({
        title: "Galeria incompleta",
        description: "Informe ao menos a descrição para salvar um item da galeria.",
      });
      return;
    }

    const resolvedImage = image || recreadorPerfilMock.gallery[0]?.image || "";

    if (editingGalleryId) {
      setGalleryItems((previous) =>
        previous.map((item) =>
          item.id === editingGalleryId
            ? {
                ...item,
                image: resolvedImage,
                description,
              }
            : item,
        ),
      );
      success({
        title: "Item da galeria atualizado",
        description: "A imagem selecionada foi atualizada no portfólio.",
      });
    } else {
      setGalleryItems((previous) => [
        ...previous,
        {
          id: createLocalId("gal"),
          image: resolvedImage,
          description,
        },
      ]);
      success({
        title: "Item da galeria adicionado",
        description: "Novo item incluído na galeria para o próximo salvamento do perfil.",
      });
    }

    setGalleryDraft(GALLERY_DRAFT_INITIAL);
    setEditingGalleryId(null);
  };

  const handleEditGalleryItem = (item: ProfileGalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryDraft({
      image: item.image,
      description: item.description,
    });
  };

  const handleRemoveGalleryItem = (galleryId: string) => {
    const target = galleryItems.find((item) => item.id === galleryId);

    if (!target) {
      warning({
        title: "Item indisponível",
        description: "Não foi possível localizar este item da galeria para remoção.",
      });
      return;
    }

    if (!confirmRemoval(`o item da galeria \"${target.description}\"`)) {
      return;
    }

    setGalleryItems((previous) => previous.filter((item) => item.id !== galleryId));

    if (editingGalleryId === galleryId) {
      setEditingGalleryId(null);
      setGalleryDraft(GALLERY_DRAFT_INITIAL);
    }

    info({
      title: "Item removido da galeria",
      description: "O item foi removido da galeria operacional.",
    });
  };

  const handleSalvarResposta = (reviewId: string) => {
    const response = reviewResponses[reviewId]?.trim();

    if (!response) {
      warning({
        title: "Resposta vazia",
        description: "Escreva uma resposta antes de salvar o comentário da avaliação.",
      });
      return;
    }

    dispatch(setLastVisualAction(`Resposta registrada para avaliação ${reviewId}.`));
    success({
      title: "Resposta registrada",
      description: "A resposta foi salva para este item de avaliação.",
    });
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
              <ExternalLink size={15} /> Visualizar perfil público
            </S.SecondaryButton>
          </S.SummaryTop>

          <S.SummaryStats>
            <S.SummaryStat>
              <strong>{completion}%</strong>
              <span>completude do perfil</span>
            </S.SummaryStat>
            <S.SummaryStat>
              <strong>{recreadorPerfilMock.reputationSummary.ratingAverage.toFixed(1)}</strong>
              <span>avaliação média</span>
            </S.SummaryStat>
            <S.SummaryStat>
              <strong>{recreadorPerfilMock.reputationSummary.totalReviews}</strong>
              <span>avaliações recebidas</span>
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
              <span>Título profissional</span>
              <input value={roleTitle} onChange={(event) => setRoleTitle(event.target.value)} />
            </S.Field>

            <S.Field>
              <span>Cidade de atuação</span>
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
            <BriefcaseBusiness size={18} /> Descrição e apresentação
          </S.SectionTitle>
          <S.FormGrid>
            <S.Field>
              <span>Descrição profissional</span>
              <textarea value={shortBio} onChange={(event) => setShortBio(event.target.value)} />
            </S.Field>

            <S.Field>
              <span>Resumo de portfólio</span>
              <textarea
                value={portfolioHeadline}
                onChange={(event) => setPortfolioHeadline(event.target.value)}
              />
            </S.Field>

            <S.Field>
              <span>
                <Link2 size={16} /> Links do portfólio
              </span>

              <S.InlineRow>
                <input
                  value={linkDraft}
                  onChange={(event) => setLinkDraft(event.target.value)}
                  placeholder="https://instagram.com/seu-perfil"
                />
                <S.MinorButton type="button" onClick={handleSaveLink}>
                  <Plus size={14} /> {editingLinkId ? "Atualizar" : "Adicionar"}
                </S.MinorButton>
                {editingLinkId ? (
                  <S.MinorButton
                    type="button"
                    $tone="neutral"
                    onClick={() => {
                      setEditingLinkId(null);
                      setLinkDraft("");
                    }}
                  >
                    <X size={14} /> Cancelar
                  </S.MinorButton>
                ) : null}
              </S.InlineRow>

              {links.length === 0 ? (
                <S.EmptyInlineList>
                  Nenhum link cadastrado no portfólio. Adicione ao menos um canal para facilitar contato.
                </S.EmptyInlineList>
              ) : (
                <S.ManagedList>
                  {links.map((item) => (
                    <S.ManagedItemCard key={item.id}>
                      <S.ManagedItemHeader>
                        <strong>{item.url}</strong>
                        <S.ManagedItemActions>
                          <S.MinorButton type="button" $tone="neutral" onClick={() => handleEditLink(item)}>
                            <Pencil size={14} /> Editar
                          </S.MinorButton>
                          <S.MinorButton
                            type="button"
                            $tone="danger"
                            onClick={() => handleRemoveLink(item.id)}
                          >
                            <Trash2 size={14} /> Remover
                          </S.MinorButton>
                        </S.ManagedItemActions>
                      </S.ManagedItemHeader>
                    </S.ManagedItemCard>
                  ))}
                </S.ManagedList>
              )}
            </S.Field>
          </S.FormGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>
            <Wallet size={18} /> Experiência, especialidades e atuação
          </S.SectionTitle>

          <S.FormGrid>
            <S.Field>
              <span>Anos de experiência</span>
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
              <span>Faixa etária de atuação</span>
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
              <span>Faixa de cachês</span>
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

          <S.SubsectionTitle>Experiências</S.SubsectionTitle>
          <S.FormGrid>
            <S.FormColumns>
              <S.Field>
                <span>Título da experiência</span>
                <input
                  value={experienceDraft.title}
                  onChange={(event) =>
                    setExperienceDraft((previous) => ({
                      ...previous,
                      title: event.target.value,
                    }))
                  }
                />
              </S.Field>

              <S.Field>
                <span>Local</span>
                <input
                  value={experienceDraft.location}
                  onChange={(event) =>
                    setExperienceDraft((previous) => ({
                      ...previous,
                      location: event.target.value,
                    }))
                  }
                />
              </S.Field>

              <S.Field>
                <span>Data</span>
                <input
                  value={experienceDraft.dateLabel}
                  onChange={(event) =>
                    setExperienceDraft((previous) => ({
                      ...previous,
                      dateLabel: event.target.value,
                    }))
                  }
                  placeholder="10 Jan 2026"
                />
              </S.Field>

              <S.Field>
                <span>Público</span>
                <input
                  value={experienceDraft.audienceLabel}
                  onChange={(event) =>
                    setExperienceDraft((previous) => ({
                      ...previous,
                      audienceLabel: event.target.value,
                    }))
                  }
                  placeholder="40 participantes | 6 a 12 anos"
                />
              </S.Field>
            </S.FormColumns>

            <S.Field>
              <span>Destaques (separar por vírgula)</span>
              <input
                value={experienceDraft.highlights}
                onChange={(event) =>
                  setExperienceDraft((previous) => ({
                    ...previous,
                    highlights: event.target.value,
                  }))
                }
                placeholder="Gincana aquática, Oficina criativa, Apresentação final"
              />
            </S.Field>

            <S.InlineActions>
              <S.MinorButton type="button" onClick={handleSaveExperience}>
                <Plus size={14} /> {editingExperienceId ? "Atualizar experiência" : "Adicionar experiência"}
              </S.MinorButton>
              {editingExperienceId ? (
                <S.MinorButton
                  type="button"
                  $tone="neutral"
                  onClick={() => {
                    setEditingExperienceId(null);
                    setExperienceDraft(EXPERIENCE_DRAFT_INITIAL);
                  }}
                >
                  <X size={14} /> Cancelar edição
                </S.MinorButton>
              ) : null}
            </S.InlineActions>

            {experienceItems.length === 0 ? (
              <S.EmptyInlineList>
                Nenhuma experiência cadastrada. Registre ao menos uma experiência para fortalecer seu perfil.
              </S.EmptyInlineList>
            ) : (
              <S.ManagedList>
                {experienceItems.map((item) => (
                  <S.ManagedItemCard key={item.id}>
                    <S.ManagedItemHeader>
                      <strong>{item.title}</strong>
                      <S.ManagedItemActions>
                        <S.MinorButton type="button" $tone="neutral" onClick={() => handleEditExperience(item)}>
                          <Pencil size={14} /> Editar
                        </S.MinorButton>
                        <S.MinorButton
                          type="button"
                          $tone="danger"
                          onClick={() => handleRemoveExperience(item.id)}
                        >
                          <Trash2 size={14} /> Remover
                        </S.MinorButton>
                      </S.ManagedItemActions>
                    </S.ManagedItemHeader>
                    <S.ManagedMeta>{item.location} · {item.dateLabel}</S.ManagedMeta>
                    <S.ManagedMeta>{item.audienceLabel}</S.ManagedMeta>
                    <S.Tags>
                      {item.highlights.map((highlight) => (
                        <span key={`${item.id}-${highlight}`}>{highlight}</span>
                      ))}
                    </S.Tags>
                  </S.ManagedItemCard>
                ))}
              </S.ManagedList>
            )}
          </S.FormGrid>

          <S.SubsectionTitle>Certificações</S.SubsectionTitle>
          <S.FormGrid>
            <S.FormColumns>
              <S.Field>
                <span>Título da certificação</span>
                <input
                  value={certificationDraft.title}
                  onChange={(event) =>
                    setCertificationDraft((previous) => ({
                      ...previous,
                      title: event.target.value,
                    }))
                  }
                />
              </S.Field>

              <S.Field>
                <span>Instituição</span>
                <input
                  value={certificationDraft.institution}
                  onChange={(event) =>
                    setCertificationDraft((previous) => ({
                      ...previous,
                      institution: event.target.value,
                    }))
                  }
                />
              </S.Field>

              <S.Field>
                <span>Validade</span>
                <input
                  value={certificationDraft.validityLabel}
                  onChange={(event) =>
                    setCertificationDraft((previous) => ({
                      ...previous,
                      validityLabel: event.target.value,
                    }))
                  }
                  placeholder="Válido até Dez 2026"
                />
              </S.Field>

              <S.Field>
                <span>Status</span>
                <select
                  value={certificationDraft.status}
                  onChange={(event) =>
                    setCertificationDraft((previous) => ({
                      ...previous,
                      status: event.target.value as ProfileCertificationItem["status"],
                    }))
                  }
                >
                  <option value="valido">Válido</option>
                  <option value="atualizar">Atualizar</option>
                </select>
              </S.Field>
            </S.FormColumns>

            <S.InlineActions>
              <S.MinorButton type="button" onClick={handleSaveCertification}>
                <Plus size={14} /> {editingCertificationId ? "Atualizar certificação" : "Adicionar certificação"}
              </S.MinorButton>
              {editingCertificationId ? (
                <S.MinorButton
                  type="button"
                  $tone="neutral"
                  onClick={() => {
                    setEditingCertificationId(null);
                    setCertificationDraft(CERTIFICATION_DRAFT_INITIAL);
                  }}
                >
                  <X size={14} /> Cancelar edição
                </S.MinorButton>
              ) : null}
            </S.InlineActions>

            {certificationItems.length === 0 ? (
              <S.EmptyInlineList>
                Nenhuma certificação cadastrada. Inclua certificações para apoiar sua credibilidade.
              </S.EmptyInlineList>
            ) : (
              <S.ManagedList>
                {certificationItems.map((item) => (
                  <S.ManagedItemCard key={item.id}>
                    <S.ManagedItemHeader>
                      <strong>{item.title}</strong>
                      <S.ManagedItemActions>
                        <S.MinorButton
                          type="button"
                          $tone="neutral"
                          onClick={() => handleEditCertification(item)}
                        >
                          <Pencil size={14} /> Editar
                        </S.MinorButton>
                        <S.MinorButton
                          type="button"
                          $tone="danger"
                          onClick={() => handleRemoveCertification(item.id)}
                        >
                          <Trash2 size={14} /> Remover
                        </S.MinorButton>
                      </S.ManagedItemActions>
                    </S.ManagedItemHeader>
                    <S.ManagedMeta>{item.institution}</S.ManagedMeta>
                    <S.ManagedMeta>{item.validityLabel}</S.ManagedMeta>
                    <S.StatusChip $status={item.status}>
                      {certificationStatusLabel[item.status]}
                    </S.StatusChip>
                  </S.ManagedItemCard>
                ))}
              </S.ManagedList>
            )}
          </S.FormGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>
            <Image size={18} /> Galeria
          </S.SectionTitle>

          <S.FormGrid>
            <S.FormColumns>
              <S.Field>
                <span>URL da imagem</span>
                <input
                  value={galleryDraft.image}
                  onChange={(event) =>
                    setGalleryDraft((previous) => ({
                      ...previous,
                      image: event.target.value,
                    }))
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </S.Field>

              <S.Field>
                <span>Descrição da imagem</span>
                <input
                  value={galleryDraft.description}
                  onChange={(event) =>
                    setGalleryDraft((previous) => ({
                      ...previous,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Atividade com famílias em área externa"
                />
              </S.Field>
            </S.FormColumns>

            <S.InlineActions>
              <S.MinorButton type="button" onClick={handleSaveGalleryItem}>
                <Plus size={14} /> {editingGalleryId ? "Atualizar item" : "Adicionar item"}
              </S.MinorButton>
              {editingGalleryId ? (
                <S.MinorButton
                  type="button"
                  $tone="neutral"
                  onClick={() => {
                    setEditingGalleryId(null);
                    setGalleryDraft(GALLERY_DRAFT_INITIAL);
                  }}
                >
                  <X size={14} /> Cancelar edição
                </S.MinorButton>
              ) : null}
            </S.InlineActions>
          </S.FormGrid>

          {galleryItems.length === 0 ? (
            <S.EmptyInlineList>
              Nenhum item na galeria. Inclua fotos ou descrições para enriquecer sua apresentação pública.
            </S.EmptyInlineList>
          ) : null}

          <S.GalleryGrid>
            {galleryItems.map((item) => (
              <S.GalleryCard key={item.id}>
                <S.GalleryImage $image={item.image} />
                <S.GalleryCaption>{item.description}</S.GalleryCaption>
                <S.GalleryActions>
                  <S.MinorButton type="button" $tone="neutral" onClick={() => handleEditGalleryItem(item)}>
                    <Pencil size={14} /> Editar
                  </S.MinorButton>
                  <S.MinorButton type="button" $tone="danger" onClick={() => handleRemoveGalleryItem(item.id)}>
                    <Trash2 size={14} /> Remover
                  </S.MinorButton>
                </S.GalleryActions>
              </S.GalleryCard>
            ))}
          </S.GalleryGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>
            <Star size={18} /> Avaliações
          </S.SectionTitle>

          <S.ReputationCard>
            <S.ReputationLine>
              <strong>{recreadorPerfilMock.reputationSummary.ratingAverage.toFixed(1)}</strong>
              {renderStars(recreadorPerfilMock.reputationSummary.ratingAverage, "perfil")}
              <span>{recreadorPerfilMock.reputationSummary.totalReviews} avaliações recebidas</span>
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
                  <span>Resposta do recreador</span>
                  <textarea
                    value={reviewResponses[item.id] ?? ""}
                    onChange={(event) =>
                      setReviewResponses((previous) => ({
                        ...previous,
                        [item.id]: event.target.value,
                      }))
                    }
                    placeholder="Escreva uma resposta para esta avaliação"
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
          <S.SecondaryButton type="button" onClick={handleCancelarAlteracoes}>
            <X size={15} /> Cancelar alterações
          </S.SecondaryButton>
        </S.ActionsRow>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};