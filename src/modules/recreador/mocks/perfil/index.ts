import {
  getRecreadorCertifications,
  getRecreadorDomainById,
  getRecreadorFeedbacks,
} from "@/shared/mocks/domains";

export interface SpecialtyOption {
  id: string;
  label: string;
}

export interface AgeGroupOption {
  id: string;
  label: string;
}

export interface CacheRangeOption {
  id: string;
  label: string;
  helper: string;
}

export interface ProfileExperienceItem {
  id: string;
  title: string;
  location: string;
  dateLabel: string;
  audienceLabel: string;
  highlights: string[];
}

export interface ProfileCertificationItem {
  id: string;
  title: string;
  institution: string;
  validityLabel: string;
  status: "valido" | "atualizar";
}

export interface ProfileGalleryItem {
  id: string;
  image: string;
  description: string;
}

export interface PublicProfileData {
  displayName: string;
  roleLabel: string;
  headline: string;
  bio: string;
  city: string;
  specialties: string[];
  ageGroups: string[];
  cacheRangeLabel: string;
  galleryHighlights: string[];
  visibilityRules: string[];
}

export interface ProfileReviewItem {
  id: string;
  author: string;
  authorRole: string;
  sourceLabel: string;
  rating: number;
  comment: string;
  dateLabel: string;
  visibility: "publica" | "interna";
  canRespond: boolean;
  suggestedResponse: string;
}

export interface ReviewMetric {
  id: string;
  label: string;
  value: number;
}

export interface DashboardReviewSummary {
  ratingAverage: number;
  totalReviews: number;
  metrics: ReviewMetric[];
  recent: Array<{
    id: string;
    sourceLabel: string;
    rating: number;
    comment: string;
    timeLabel: string;
  }>;
}

const recreador = getRecreadorDomainById("rec-rafael-santos");

const fallbackProfile = {
  fullName: "Rafael Santos",
  role: "Recreador profissional",
  bio:
    "Especialista em recreação infantil e familiar, com foco em segurança, acolhimento e alta energia.",
  locationLabel: "São Paulo - SP",
  specialties: ["Recreação infantil", "Gincanas aquáticas", "Eventos temáticos"],
};

const profileBase = recreador ?? fallbackProfile;

const reviewItems: ProfileReviewItem[] = [
  ...getRecreadorFeedbacks("rec-rafael-santos").map((feedback) => ({
    id: feedback.id,
    author: feedback.author,
    authorRole: feedback.role,
    sourceLabel: "Contratante",
    rating: feedback.rating,
    comment: feedback.message,
    dateLabel: feedback.dateLabel,
    visibility: "publica" as const,
    canRespond: true,
    suggestedResponse:
      "Obrigado pelo feedback. Seguimos melhorando cada entrega para manter a experiência da família.",
  })),
  {
    id: "feedback-familia-rodriguez",
    author: "Família Rodriguez",
    authorRole: "Hóspedes",
    sourceLabel: "Família atendida",
    rating: 5,
    comment:
      "As crianças pediram para repetir a atividade no dia seguinte. Energia alta e condução segura.",
    dateLabel: "12 Jan 2026",
    visibility: "publica",
    canRespond: true,
    suggestedResponse:
      "Ficamos felizes com a experiência da família. Obrigado por compartilhar e confiar no trabalho.",
  },
];

const ratingAverage =
  reviewItems.length > 0
    ? Number(
        (
          reviewItems.reduce((total, item) => total + item.rating, 0) /
          reviewItems.length
        ).toFixed(1),
      )
    : 0;

const reviewMetrics: ReviewMetric[] = [
  { id: "pontualidade", label: "Pontualidade", value: 95 },
  { id: "engajamento", label: "Engajamento", value: 89 },
  { id: "criatividade", label: "Criatividade", value: 92 },
  { id: "comunicacao", label: "Comunicação", value: 90 },
];

const profileCompletionStats = {
  completion: "84%",
  specialtiesCount: String(profileBase.specialties.length),
  ratingLabel: ratingAverage.toFixed(1),
};

export const recreadorPerfilMock = {
  title: "Perfil",
  description:
    "Gerencie seu perfil profissional completo em uma página única, com vitrine pública e reputação.",
  stats: [
    {
      title: "Completude",
      value: profileCompletionStats.completion,
      helper: "Perfil interno",
    },
    {
      title: "Especialidades",
      value: profileCompletionStats.specialtiesCount,
      helper: "Ativas na vitrine",
    },
    {
      title: "Avaliação média",
      value: profileCompletionStats.ratingLabel,
      helper: `${reviewItems.length} avaliações`,
    },
  ],
  publicProfileRoute: "/app/recreador/perfil-publico",
  specialtyOptions: [
    { id: "rec-infantil", label: "Recreação infantil" },
    { id: "esportes", label: "Esportes e gincanas" },
    { id: "aquaticas", label: "Atividades aquáticas" },
    { id: "oficinas", label: "Oficinas criativas" },
    { id: "teen", label: "Eventos teen" },
    { id: "musica", label: "Música e expressão corporal" },
    { id: "inclusao", label: "Inclusão e acessibilidade" },
    { id: "familias", label: "Lazer para famílias" },
  ] as SpecialtyOption[],
  ageGroupOptions: [
    { id: "0-3", label: "0 a 3 anos" },
    { id: "4-7", label: "4 a 7 anos" },
    { id: "8-12", label: "8 a 12 anos" },
    { id: "13-17", label: "13 a 17 anos" },
    { id: "familias", label: "Famílias e faixa mista" },
  ] as AgeGroupOption[],
  cacheRangeOptions: [
    {
      id: "cache-a",
      label: "R$ 220 - R$ 320 / turno",
      helper: "Pacotes de até 4h",
    },
    {
      id: "cache-b",
      label: "R$ 340 - R$ 520 / diária",
      helper: "Eventos de 6h a 8h",
    },
    {
      id: "cache-c",
      label: "Sob consulta",
      helper: "Operações especiais e viagens",
    },
  ] as CacheRangeOption[],
  experienceItems: [
    {
      id: "exp-1",
      title: "Recreação de verão",
      location: "Florianópolis, SC",
      dateLabel: "15 Jan 2026",
      audienceLabel: "45 participantes | 5 a 10 anos",
      highlights: ["Gincana aquática", "Teatro infantil", "Pintura facial"],
    },
    {
      id: "exp-2",
      title: "Noite cultural",
      location: "Bombinhas, SC",
      dateLabel: "10 Jan 2026",
      audienceLabel: "60 participantes | faixa mista",
      highlights: ["Karaokê", "Dança", "Bingo de integração"],
    },
    {
      id: "exp-3",
      title: "Gincana familiar",
      location: "Balneário Camboriú, SC",
      dateLabel: "05 Jan 2026",
      audienceLabel: "30 participantes | famílias",
      highlights: ["Caça ao tesouro", "Corrida do saco", "Quiz familiar"],
    },
  ] as ProfileExperienceItem[],
  certifications: getRecreadorCertifications("rec-rafael-santos").map((certification) => ({
    id: certification.id,
    title: certification.title,
    institution: certification.institution,
    validityLabel: certification.validity ?? "Validade não informada",
    status: certification.status === "Valido" ? "valido" : "atualizar",
  })) as ProfileCertificationItem[],
  gallery: [
    {
      id: "gal-1",
      image:
        "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200&auto=format&fit=crop",
      description: "Gincana aquática em resort familiar",
    },
    {
      id: "gal-2",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
      description: "Show de talentos com crianças e adolescentes",
    },
    {
      id: "gal-3",
      image:
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop",
      description: "Oficina criativa com famílias",
    },
    {
      id: "gal-4",
      image:
        "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1200&auto=format&fit=crop",
      description: "Caça ao tesouro temática",
    },
  ] as ProfileGalleryItem[],
  publicProfile: {
    displayName: profileBase.fullName,
    roleLabel: profileBase.role,
    headline: "Recreador focado em experiências seguras, dinâmicas e memoráveis para famílias.",
    bio: profileBase.bio,
    city: profileBase.locationLabel,
    specialties: profileBase.specialties,
    ageGroups: ["4 a 7 anos", "8 a 12 anos", "Famílias"],
    cacheRangeLabel: "R$ 340 - R$ 520 / diária",
    galleryHighlights: ["Gincanas", "Oficinas", "Programação noturna"],
    visibilityRules: [
      "Contato direto não fica público.",
      "Avaliação média e comentários validados ficam visíveis.",
      "Histórico operacional interno permanece privado.",
    ],
  } as PublicProfileData,
  reviews: {
    policyLabel:
      "Avaliações públicas entram na vitrine. Observações operacionais continuam em camada interna.",
    allowResponse: true,
    items: reviewItems,
  },
  reputationSummary: {
    ratingAverage,
    totalReviews: reviewItems.length,
    metrics: reviewMetrics,
  },
  dashboardReviewSummary: {
    ratingAverage,
    totalReviews: reviewItems.length,
    metrics: reviewMetrics,
    recent: reviewItems.slice(0, 2).map((item) => ({
      id: item.id,
      sourceLabel: item.sourceLabel,
      rating: item.rating,
      comment: item.comment,
      timeLabel: item.dateLabel,
    })),
  } as DashboardReviewSummary,
} as const;
