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
    "Especialista em recreacao infantil e familiar com foco em seguranca, acolhimento e alta energia.",
  locationLabel: "Sao Paulo - SP",
  specialties: ["Recreacao infantil", "Gincanas aquatica", "Eventos tematicos"],
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
      "Obrigado pelo feedback. Seguimos melhorando cada entrega para manter a experiencia da familia.",
  })),
  {
    id: "feedback-familia-rodriguez",
    author: "Familia Rodriguez",
    authorRole: "Hospedes",
    sourceLabel: "Familia atendida",
    rating: 5,
    comment:
      "As criancas pediram para repetir a atividade no dia seguinte. Energia alta e conducao segura.",
    dateLabel: "12 Jan 2026",
    visibility: "publica",
    canRespond: true,
    suggestedResponse:
      "Ficamos felizes com a experiencia da familia. Obrigado por compartilhar e confiar no trabalho.",
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
  { id: "comunicacao", label: "Comunicacao", value: 90 },
];

const profileCompletionStats = {
  completion: "84%",
  specialtiesCount: String(profileBase.specialties.length),
  ratingLabel: ratingAverage.toFixed(1),
};

export const recreadorPerfilMock = {
  title: "Perfil",
  description:
    "Gerencie seu perfil profissional completo em uma pagina unica, com vitrine publica e reputacao.",
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
      title: "Avaliacao media",
      value: profileCompletionStats.ratingLabel,
      helper: `${reviewItems.length} avaliacoes`,
    },
  ],
  publicProfileRoute: "/app/recreador/perfil-publico",
  specialtyOptions: [
    { id: "rec-infantil", label: "Recreacao infantil" },
    { id: "esportes", label: "Esportes e gincanas" },
    { id: "aquaticas", label: "Atividades aquaticas" },
    { id: "oficinas", label: "Oficinas criativas" },
    { id: "teen", label: "Eventos teen" },
    { id: "musica", label: "Musica e expressao corporal" },
    { id: "inclusao", label: "Inclusao e acessibilidade" },
    { id: "familias", label: "Lazer para familias" },
  ] as SpecialtyOption[],
  ageGroupOptions: [
    { id: "0-3", label: "0 a 3 anos" },
    { id: "4-7", label: "4 a 7 anos" },
    { id: "8-12", label: "8 a 12 anos" },
    { id: "13-17", label: "13 a 17 anos" },
    { id: "familias", label: "Familias e faixa mista" },
  ] as AgeGroupOption[],
  cacheRangeOptions: [
    {
      id: "cache-a",
      label: "R$ 220 - R$ 320 / turno",
      helper: "Pacotes de ate 4h",
    },
    {
      id: "cache-b",
      label: "R$ 340 - R$ 520 / diaria",
      helper: "Eventos de 6h a 8h",
    },
    {
      id: "cache-c",
      label: "Sob consulta",
      helper: "Operacoes especiais e viagens",
    },
  ] as CacheRangeOption[],
  experienceItems: [
    {
      id: "exp-1",
      title: "Recreacao de verao",
      location: "Florianopolis, SC",
      dateLabel: "15 Jan 2026",
      audienceLabel: "45 participantes | 5 a 10 anos",
      highlights: ["Gincana aquatica", "Teatro infantil", "Pintura facial"],
    },
    {
      id: "exp-2",
      title: "Noite cultural",
      location: "Bombinhas, SC",
      dateLabel: "10 Jan 2026",
      audienceLabel: "60 participantes | faixa mista",
      highlights: ["Karaoke", "Danca", "Bingo de integracao"],
    },
    {
      id: "exp-3",
      title: "Gincana familiar",
      location: "Balneario Camboriu, SC",
      dateLabel: "05 Jan 2026",
      audienceLabel: "30 participantes | familias",
      highlights: ["Caca ao tesouro", "Corrida do saco", "Quiz familiar"],
    },
  ] as ProfileExperienceItem[],
  certifications: getRecreadorCertifications("rec-rafael-santos").map((certification) => ({
    id: certification.id,
    title: certification.title,
    institution: certification.institution,
    validityLabel: certification.validity ?? "Validade nao informada",
    status: certification.status === "Valido" ? "valido" : "atualizar",
  })) as ProfileCertificationItem[],
  gallery: [
    {
      id: "gal-1",
      image:
        "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200&auto=format&fit=crop",
      description: "Gincana aquatica em resort familiar",
    },
    {
      id: "gal-2",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
      description: "Show de talentos com criancas e adolescentes",
    },
    {
      id: "gal-3",
      image:
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop",
      description: "Oficina criativa com familias",
    },
    {
      id: "gal-4",
      image:
        "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1200&auto=format&fit=crop",
      description: "Caca ao tesouro tematica",
    },
  ] as ProfileGalleryItem[],
  publicProfile: {
    displayName: profileBase.fullName,
    roleLabel: profileBase.role,
    headline: "Recreador focado em experiencias seguras, dinamicas e memoraveis para familias.",
    bio: profileBase.bio,
    city: profileBase.locationLabel,
    specialties: profileBase.specialties,
    ageGroups: ["4 a 7 anos", "8 a 12 anos", "Familias"],
    cacheRangeLabel: "R$ 340 - R$ 520 / diaria",
    galleryHighlights: ["Gincanas", "Oficinas", "Programacao noturna"],
    visibilityRules: [
      "Contato direto nao fica publico.",
      "Avaliacao media e comentarios validados ficam visiveis.",
      "Historico operacional interno permanece privado.",
    ],
  } as PublicProfileData,
  reviews: {
    policyLabel:
      "Avaliacoes publicas entram na vitrine. Observacoes operacionais continuam em camada interna.",
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
