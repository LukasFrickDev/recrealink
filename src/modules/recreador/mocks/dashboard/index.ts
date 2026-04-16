import {
  getHoteisDomainByIds,
  hoteisDomainById,
  oportunidadesDomainMock,
} from "@/shared/mocks/domains";

export type HeroMetricTone = "blue" | "purple" | "orange" | "rose";

export type HeroMetricIconKey = "users" | "map" | "building" | "calendar";

export type ToolIconKey =
  | "profile"
  | "hotels"
  | "agenda"
  | "checklist"
  | "registro"
  | "support";

export type WorkSourceIconKey = "building" | "map" | "calendar" | "users" | "palette";

export type RecommendationIconKey = "calendar" | "building" | "users";

export type OpportunityUrgency = "alta" | "media" | "baixa";

export interface HeroMetric {
  title: string;
  value: string;
  helper: string;
  tone: HeroMetricTone;
  icon: HeroMetricIconKey;
}

export interface FreeTool {
  id: string;
  title: string;
  description: string;
  route: string;
  badge: string;
  icon: ToolIconKey;
}

export interface HotelSpotlight {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  badge: string;
  route: string;
}

export interface WorkSource {
  id: string;
  title: string;
  description: string;
  icon: WorkSourceIconKey;
  status: "ativo" | "em-breve";
  vacancies: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  activity: string;
  ageGroup: string;
  likes: number;
  comments: number;
  time: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  cta: string;
  route: string;
  icon: RecommendationIconKey;
}

export interface QuickOpportunity {
  id: string;
  hotel: string;
  location: string;
  ageGroup: string;
  date: string;
  workType: string;
  urgency: OpportunityUrgency;
  detailsRoute: string;
  applyRoute: string;
}

export interface PerformanceMetric {
  label: string;
  value: number;
}

export interface RecentFeedback {
  id: string;
  hotel: string;
  rating: number;
  comment: string;
  time: string;
}

const featuredHotels = getHoteisDomainByIds([
  "hotel-cyan-resort",
  "hotel-royal-palm-plaza",
  "hotel-grande-sao-pedro",
]).map((hotel, index) => ({
  id: hotel.id,
  name: hotel.name,
  location: `${hotel.city}, ${hotel.state}`,
  description: hotel.description,
  image: hotel.image,
  badge: ["Parceiro verificado", "Alta demanda", "Novas vagas"][index] ?? "Em destaque",
  route: "/app/recreador/ferramentas/hoteis",
})) satisfies HotelSpotlight[];

const popularHotels = getHoteisDomainByIds([
  "hotel-resort-aguas",
  "hotel-fazenda-boa-vista",
  "hotel-pousada-recanto-verde",
]).map((hotel, index) => ({
  id: hotel.id,
  name: hotel.name,
  location: `${hotel.city}, ${hotel.state}`,
  description: hotel.description,
  image: hotel.image,
  badge: ["Popular", "Fim de semana", "Contratando"][index] ?? "Relevante",
  route: "/app/recreador/ferramentas/hoteis",
})) satisfies HotelSpotlight[];

const quickOpportunityAgeGroupById = {
  "opp-hotel-vista-mar-julho": "5 a 10 anos",
  "opp-hotel-costa-verde-julho": "8 a 14 anos",
  "opp-hotelaria-lider-weekend": "6 a 15 anos",
} as const;

const quickOpportunities = oportunidadesDomainMock
  .filter((opportunity) => opportunity.ownerKind === "hotel")
  .slice(0, 3)
  .map((opportunity) => ({
    id: opportunity.id,
    hotel: hoteisDomainById[opportunity.ownerId]?.name ?? "Hotel parceiro",
    location: opportunity.locationLabel,
    ageGroup:
      quickOpportunityAgeGroupById[
        opportunity.id as keyof typeof quickOpportunityAgeGroupById
      ] ?? "Faixa mista",
    date: opportunity.periodLabel,
    workType: opportunity.contractLabel,
    urgency:
      opportunity.urgencyLabel === "urgente"
        ? ("alta" as const)
        : opportunity.statusLabel === "Triagem"
          ? ("media" as const)
          : ("baixa" as const),
    detailsRoute: "/app/recreador/ferramentas/hoteis?aba=vagas",
    applyRoute: "/app/recreador/ferramentas/hoteis?aba=vagas",
  })) satisfies QuickOpportunity[];

export const recreadorDashboardMock = {
  areaLabel: "Recreador",
  userName: "Rafael Santos",
  title: "Painel Principal do Recreador",
  description:
    "Visão inicial com oportunidades de hotéis, progresso profissional e atalhos da camada gratuita.",
  stats: [],
  hero: {
    badge: "Plataforma ativa",
    title: "Sua próxima oportunidade está aqui",
    description:
      "Conecte-se com hotéis e resorts em todo o Brasil. Encontre vagas alinhadas ao seu perfil e evolua sua carreira na recreação.",
    primaryAction: {
      label: "Ver oportunidades",
      route: "/app/recreador/ferramentas/hoteis?aba=vagas",
    },
    secondaryAction: {
      label: "Atualizar meu perfil",
      route: "/app/recreador/ferramentas/editar-perfil",
    },
    metrics: [
      {
        title: "Recreadores ativos",
        value: "2.847",
        helper: "base ativa na plataforma",
        tone: "blue",
        icon: "users",
      },
      {
        title: "Cidades atendidas",
        value: "156",
        helper: "presença nacional em expansão",
        tone: "purple",
        icon: "map",
      },
      {
        title: "Hotéis parceiros",
        value: "487",
        helper: "rede validada de contratação",
        tone: "orange",
        icon: "building",
      },
      {
        title: "Vagas este mes",
        value: "1.234",
        helper: "oportunidades atualizadas diariamente",
        tone: "rose",
        icon: "calendar",
      },
    ] as HeroMetric[],
  },
  freeTools: [
    {
      id: "perfil-basico",
      title: "Perfil básico",
      description: "Dados pessoais e profissionais para contratação.",
      route: "/app/recreador/ferramentas/perfil-basico",
      badge: "FREE",
      icon: "profile",
    },
    {
      id: "hoteis",
      title: "Perfil dos hotéis",
      description: "Visualize hotéis parceiros com vagas abertas.",
      route: "/app/recreador/ferramentas/hoteis",
      badge: "FREE",
      icon: "hotels",
    },
    {
      id: "cadastro-recreador",
      title: "Cadastro como Recreador",
      description: "Conclua seu onboarding profissional por etapas.",
      route: "/app/recreador/ferramentas/cadastro-recreador",
      badge: "FREE",
      icon: "profile",
    },
    {
      id: "agenda-basica",
      title: "Agenda básica",
      description: "Organize compromissos e entregas da semana.",
      route: "/app/recreador/ferramentas/agenda-basica",
      badge: "FREE",
      icon: "agenda",
    },
    {
      id: "checklists",
      title: "Checklists Simples",
      description: "Garanta padrao de execucao no pre-evento.",
      route: "/app/recreador/ferramentas/checklists-simples",
      badge: "FREE",
      icon: "checklist",
    },
    {
      id: "registro",
      title: "Registro de experiências",
      description: "Guarde vivências e aprendizados de cada entrega.",
      route: "/app/recreador/ferramentas/registro-experiencias",
      badge: "FREE",
      icon: "registro",
    },
    {
      id: "support",
      title: "Suporte",
      description: "Canal de atendimento para dúvidas operacionais.",
      route: "/app/recreador/ferramentas/suporte",
      badge: "FREE",
      icon: "support",
    },
  ] as FreeTool[],
  featuredHotels,
  popularHotels,
  workSources: [
    {
      id: "hoteis",
      title: "Hotéis",
      description: "Hotéis, resorts e pousadas com vagas de recreação.",
      icon: "building",
      status: "ativo",
      vacancies: "24 vagas",
    },
    {
      id: "acampamentos",
      title: "Acampamentos",
      description: "Colônia de férias e operações sazonais.",
      icon: "map",
      status: "em-breve",
      vacancies: "Em breve",
    },
    {
      id: "festas",
      title: "Festas e Eventos",
      description: "Demandas para datas comemorativas e eventos sociais.",
      icon: "calendar",
      status: "em-breve",
      vacancies: "Em breve",
    },
    {
      id: "educacionais",
      title: "Projetos Educacionais",
      description: "Parcerias com escolas e atividades pedagógicas.",
      icon: "users",
      status: "em-breve",
      vacancies: "Em breve",
    },
    {
      id: "animacoes",
      title: "Animações Diversas",
      description: "Ações artísticas, teatro e experiências temáticas.",
      icon: "palette",
      status: "em-breve",
      vacancies: "Em breve",
    },
  ] as WorkSource[],
  region: {
    city: "São Paulo - SP",
    description:
      "Nesta etapa, a home prioriza oportunidades da região de São Paulo para garantir volume e previsibilidade de contratação.",
    helper: "Novas regiões serão abertas nas próximas rodadas.",
  },
  communityPosts: [
    {
      id: "post-1",
      author: "Marina Silva",
      avatar: "MS",
      activity: "Gincana aquatica",
      ageGroup: "8 a 12 anos",
      likes: 24,
      comments: 8,
      time: "2h atrás",
    },
    {
      id: "post-2",
      author: "Carlos Santos",
      avatar: "CS",
      activity: "Teatro de fantoches",
      ageGroup: "4 a 8 anos",
      likes: 18,
      comments: 5,
      time: "4h atrás",
    },
    {
      id: "post-3",
      author: "Ana Costa",
      avatar: "AC",
      activity: "Caça ao tesouro",
      ageGroup: "6 a 10 anos",
      likes: 31,
      comments: 12,
      time: "6h atrás",
    },
  ] as CommunityPost[],
  recommendations: [
    {
      id: "rec-1",
      title: "Atualize sua disponibilidade",
      description:
        "Calendario atualizado aumenta a chance de aparecer em convites de última hora.",
      cta: "Atualizar",
      route: "/app/recreador/ferramentas/agenda-basica",
      icon: "calendar",
    },
    {
      id: "rec-2",
      title: "Conheça novos hotéis parceiros",
      description:
        "Revise os perfis mais recentes da vitrine e escolha onde deseja atuar.",
      cta: "Abrir vitrine",
      route: "/app/recreador/ferramentas/hoteis",
      icon: "building",
    },
    {
      id: "rec-3",
      title: "Fortaleça seu perfil profissional",
      description: "Inclua experiências recentes para melhorar relevância nas buscas.",
      cta: "Completar perfil",
      route: "/app/recreador/ferramentas/editar-perfil",
      icon: "users",
    },
  ] as Recommendation[],
  quickOpportunities,
  performance: {
    rating: 4.8,
    totalReviews: 23,
    metrics: [
      { label: "Pontualidade", value: 95 },
      { label: "Engajamento", value: 88 },
      { label: "Criatividade", value: 92 },
      { label: "Comunicação", value: 90 },
    ] as PerformanceMetric[],
    recentFeedbacks: [
      {
        id: "feedback-1",
        hotel: "Resort Aguas Claras",
        rating: 5,
        comment: "Excelente recreador, equipe satisfeita com energia e postura.",
        time: "2 dias atras",
      },
      {
        id: "feedback-2",
        hotel: "Hotel Fazenda Boa Vista",
        rating: 4,
        comment: "Ótima condução das dinâmicas e boa interação com as famílias.",
        time: "1 semana atrás",
      },
    ] as RecentFeedback[],
  },
};
