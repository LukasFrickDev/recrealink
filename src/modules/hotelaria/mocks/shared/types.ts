export type HotelariaFeatureStatus = "active" | "planned" | "parked";

export type HotelariaStatusTone = "neutral" | "success" | "warning" | "danger" | "brand";

export interface HotelariaShellStat {
  title: string;
  value: string;
  helper: string;
}

export interface HotelariaSummaryItem {
  title: string;
  value: string;
  helper: string;
}

export interface HotelariaMeuHotelLayout {
  type: "meu-hotel";
  hotelName: string;
  category: string;
  capacity: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  heroDescription: string;
  ratingLabel: string;
  partnerSince: string;
  workingConditions: Array<{
    label: string;
    value: string;
  }>;
  benefits: string[];
  rules: string[];
  requirements: string[];
  facilities: Array<{
    title: string;
    description: string;
  }>;
  services: Array<{
    title: string;
    description: string;
    schedule: string;
  }>;
  gallery: Array<{
    title: string;
    description: string;
  }>;
  reviews: Array<{
    author: string;
    stay: string;
    rating: number;
    comment: string;
  }>;
  sections: Array<{
    title: string;
    subtitle: string;
    details: string[];
  }>;
}

export type HotelariaEscalaStatus = "confirmado" | "pendente" | "em_edicao";

export interface HotelariaEscalasLayout {
  type: "escalas";
  years: string[];
  currentYear: string;
  currentMonth: string;
  monthStats: HotelariaSummaryItem[];
  weekDays: Array<{
    day: string;
    date: string;
    status: HotelariaEscalaStatus;
    kids: number;
    children: number;
    teens: number;
    central: number;
  }>;
  history: Array<{
    period: string;
    coverage: string;
    status: string;
  }>;
  quickActions: string[];
}

export interface HotelariaRecreadorEntry {
  name: string;
  artisticName: string;
  rating: number;
  location: string;
  experience: string;
  bio: string;
  functions: string[];
  specialties: string[];
  availability: "Disponível" | "Ocupada";
  lastWork: string;
}

export interface HotelariaRecreadoresLayout {
  type: "recreadores";
  currentTeam: HotelariaRecreadorEntry[];
  hiringHistory: HotelariaRecreadorEntry[];
}

export type HotelariaVagaStatus = "Aberta" | "Em análise" | "Preenchida" | "Encerrada";

export interface HotelariaVagasLayout {
  type: "vagas";
  summary: HotelariaSummaryItem[];
  statusFilters: HotelariaVagaStatus[];
  vacancies: Array<{
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    salary: string;
    candidates: number;
    status: HotelariaVagaStatus;
    positions: Array<{
      role: string;
      total: number;
      filled: number;
    }>;
  }>;
}

export interface HotelariaProgramacoesLayout {
  type: "programacoes";
  summary: HotelariaSummaryItem[];
  plans: Array<{
    name: string;
    date: string;
    duration: string;
    participants: string;
  }>;
  templates: Array<{
    title: string;
    description: string;
    audience: string;
  }>;
  suggestions: Array<{
    title: string;
    reason: string;
    recommendedSlot: string;
  }>;
  calendarEvents: Array<{
    day: string;
    label: string;
    period: string;
  }>;
}

export type HotelariaFeedbackType = "positivo" | "neutro" | "negativo";

export interface HotelariaFeedbackLayout {
  type: "feedback-recreadores";
  entries: Array<{
    recreador: string;
    artisticName: string;
    activityDate: string;
    type: HotelariaFeedbackType;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
}

export interface HotelariaIndicadoresLayout {
  type: "indicadores";
  periods: string[];
  kpis: Array<{
    title: string;
    value: string;
    trend: string;
    tone: HotelariaStatusTone;
  }>;
  watchlist: Array<{
    title: string;
    detail: string;
    owner: string;
  }>;
}

export interface HotelariaRelatoriosLayout {
  type: "relatorios";
  periods: string[];
  impact: {
    title: string;
    highlight: string;
    description: string;
  };
  metrics: HotelariaSummaryItem[];
  payments: Array<{
    recreador: string;
    value: string;
    date: string;
    status: "Pago" | "Pendente";
  }>;
}

export type HotelariaOrcamentoStatus = "Pendente" | "Aprovado" | "Enviado";

export interface HotelariaOrcamentoLayout {
  type: "orcamento";
  summary: HotelariaSummaryItem[];
  expenses: Array<{
    description: string;
    value: string;
    date: string;
    category: string;
    status: HotelariaOrcamentoStatus;
  }>;
  materials: Array<{
    material: string;
    quantity: string;
    date: string;
    status: HotelariaOrcamentoStatus;
    priority: "Alta" | "Média" | "Baixa";
  }>;
}

export type HotelariaOcorrenciaStatus = "Aberto" | "Resolvido" | "Pendente";

export type HotelariaOcorrenciaSeverity = "Alta" | "Média" | "Baixa";

export interface HotelariaOcorrenciasLayout {
  type: "ocorrencias";
  summary: HotelariaSummaryItem[];
  incidents: Array<{
    description: string;
    date: string;
    type: string;
    recreador: string;
    status: HotelariaOcorrenciaStatus;
    severity: HotelariaOcorrenciaSeverity;
    action: string;
  }>;
}

export interface HotelariaComunidadeLayout {
  type: "comunidade";
  posts: Array<{
    author: string;
    location: string;
    timeAgo: string;
    category: string;
    content: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
  rooms: Array<{
    name: string;
    members: number;
    unread: number;
  }>;
  messages: Array<{
    author: string;
    text: string;
    time: string;
    mine: boolean;
  }>;
}

export interface HotelariaChatLayout {
  type: "chat";
  channels: Array<{
    name: string;
    members: number;
    unread: number;
  }>;
  onlineCount: number;
  messages: Array<{
    author: string;
    text: string;
    time: string;
    mine: boolean;
  }>;
}

export interface HotelariaNotificationsLayout {
  type: "notifications";
  items: Array<{
    title: string;
    source: string;
    priority: "Urgente" | "Importante" | "Informativa";
    time: string;
    action: string;
  }>;
}

export interface HotelariaSettingsLayout {
  type: "settings";
  notificationPreferences: Array<{
    id: string;
    title: string;
    description: string;
    enabled: boolean;
  }>;
  userAccess: Array<{
    id: string;
    name: string;
    role: string;
    email: string;
    active: boolean;
  }>;
  securityTips: string[];
  tabs: Array<{
    id: "dados-hotel" | "dados-administrador" | "notificacoes" | "usuarios" | "seguranca" | "conta";
    title: string;
    helper: string;
    description: string;
    editable: boolean;
    restrictedNotice?: string;
    options: Array<{
      label: string;
      value: string;
      helper?: string;
    }>;
  }>;
}

export type HotelariaFeatureLayout =
  | HotelariaMeuHotelLayout
  | HotelariaEscalasLayout
  | HotelariaRecreadoresLayout
  | HotelariaVagasLayout
  | HotelariaProgramacoesLayout
  | HotelariaFeedbackLayout
  | HotelariaIndicadoresLayout
  | HotelariaRelatoriosLayout
  | HotelariaOrcamentoLayout
  | HotelariaOcorrenciasLayout
  | HotelariaComunidadeLayout
  | HotelariaChatLayout
  | HotelariaNotificationsLayout
  | HotelariaSettingsLayout;

export interface HotelariaFeatureMock {
  featureId: string;
  menuLabel: string;
  title: string;
  description: string;
  status: HotelariaFeatureStatus;
  statusLabel: string;
  statusDetail: string;
  stats: HotelariaShellStat[];
  checkpoints: string[];
  layout: HotelariaFeatureLayout;
}
