import { getRecreadorSummariesByIds } from "@/shared/mocks/domains";

export interface HotelariaDashboardAlert {
  title: string;
  description: string;
  tone: "warning" | "brand" | "success";
}

export interface HotelariaDashboardChecklistItem {
  label: string;
  done: boolean;
}

export interface HotelariaDashboardQuickReport {
  title: string;
  value: string;
  helper: string;
}

export interface HotelariaDashboardStat {
  title: string;
  value: string;
  helper: string;
  icon: "users" | "map-pin" | "building" | "check-circle";
  color: "blue" | "green" | "purple" | "orange";
}

export interface HotelariaDashboardTool {
  title: string;
  description: string;
  icon: "calendar" | "users" | "bar-chart-3" | "file-text" | "dollar-sign" | "message-square";
  color: "blue" | "green" | "purple" | "orange" | "yellow" | "indigo";
  to?: string;
}

const topRecreadores = getRecreadorSummariesByIds([
  "rec-ana-silva",
  "rec-carlos-santos",
  "rec-marina-costa",
]).map((recreador, index) => ({
  name: recreador.name,
  rating: recreador.rating,
  specialties: recreador.specialties.slice(0, 2),
  location: recreador.location,
  events: [12, 10, 8][index] ?? 0,
}));

export const hotelariaDashboardMock = {
  userName: "Carla Menezes",
  title: "Painel principal da hotelaria",
  description:
    "Visão consolidada para escalas, contratações e qualidade da experiência dos hóspedes.",
  platformStats: [
    {
      title: "Recreadores disponíveis",
      value: "+2.000",
      helper: "Base ativa nacional",
      icon: "users",
      color: "blue",
    },
    {
      title: "Cidades atendidas",
      value: "+150",
      helper: "Cobertura em expansão",
      icon: "map-pin",
      color: "green",
    },
    {
      title: "Hotéis conectados",
      value: "+400",
      helper: "Rede hoteleira integrada",
      icon: "building",
      color: "purple",
    },
    {
      title: "Escalas criadas",
      value: "+1.000",
      helper: "Operações finalizadas",
      icon: "check-circle",
      color: "orange",
    },
  ] satisfies HotelariaDashboardStat[],
  upcomingShifts: [
    { title: "Final de semana", date: "6 a 8 de dezembro", status: "Pendente" },
    { title: "Natal", date: "24 a 26 de dezembro", status: "Pronta" },
  ],
  nextEvent: {
    title: "Weekend Família Maresias",
    date: "6 a 8 de dezembro",
    checklist: [
      { label: "Escala de líderes validada", done: true },
      { label: "Materiais de oficinas separados", done: true },
      { label: "Briefing de teens com recepção", done: false },
      { label: "Plano de chuva publicado no chat", done: false },
    ] satisfies HotelariaDashboardChecklistItem[],
  },
  topRecreadores,
  alerts: [
    {
      title: "Escala pendente",
      description: "Finalize a escala do próximo fim de semana até amanhã.",
      tone: "warning",
    },
    {
      title: "Novos recreadores",
      description: "5 novos profissionais disponíveis na sua região.",
      tone: "brand",
    },
    {
      title: "Feedback positivo",
      description: "Última temporada teve 98% de aprovação.",
      tone: "success",
    },
  ] satisfies HotelariaDashboardAlert[],
  quickReports: [
    {
      title: "Horas economizadas no mês",
      value: "18h",
      helper: "Com uso conjunto de escalas e chat",
    },
    {
      title: "Taxa de preenchimento",
      value: "87%",
      helper: "Vagas concluídas no ciclo atual",
    },
    {
      title: "Feedback médio",
      value: "4,7",
      helper: "Avaliações de hóspedes e coordenação",
    },
  ] satisfies HotelariaDashboardQuickReport[],
  tools: [
    {
      title: "Escalas personalizadas",
      description: "Crie e organize escalas completas para seus eventos.",
      icon: "calendar",
      color: "blue",
      to: "/app/hotelaria/escalas",
    },
    {
      title: "Contratação de recreadores",
      description: "Encontre e contrate os melhores profissionais.",
      icon: "users",
      color: "green",
      to: "/app/hotelaria/recreadores",
    },
    {
      title: "Relatórios de desempenho",
      description: "Acompanhe métricas e resultados detalhados.",
      icon: "bar-chart-3",
      color: "purple",
      to: "/app/hotelaria/relatorios",
    },
    {
      title: "Planejamento de programações",
      description: "Organize atividades e eventos completos.",
      icon: "file-text",
      color: "orange",
      to: "/app/hotelaria/programacoes",
    },
    {
      title: "Gestão de orçamentos",
      description: "Controle custos e otimize investimentos.",
      icon: "dollar-sign",
      color: "yellow",
      to: "/app/hotelaria/orcamento",
    },
    {
      title: "Chat com recreadores",
      description: "Comunicação direta e eficiente.",
      icon: "message-square",
      color: "indigo",
      to: "/app/hotelaria/chat",
    },
  ] satisfies HotelariaDashboardTool[],
};
