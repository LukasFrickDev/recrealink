import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Award,
  BarChart3,
  Briefcase,
  BookOpen,
  Building2,
  Calculator,
  CalendarDays,
  Camera,
  CheckSquare,
  DollarSign,
  Gamepad2,
  Headphones,
  Heart,
  Home,
  House,
  Map,
  MessageCircle,
  Package,
  Search,
  Settings,
  Star,
  UserRound,
  Users,
} from "lucide-react";

export interface ModuleSidebarItemDefinition {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface ModuleSidebarGroupDefinition {
  id: string;
  title: string;
  items: ModuleSidebarItemDefinition[];
}

export interface ModuleTopbarContext {
  title: string;
  helper: string;
}

export interface ModuleTopbarQuickLink {
  id: string;
  label: string;
  to: string;
}

export const recreadorSidebarGroups: ModuleSidebarGroupDefinition[] = [
  {
    id: "navegacao",
    title: "Navegação principal",
    items: [
      {
        to: "/app/recreador",
        label: "Início",
        description: "Painel principal do módulo",
        icon: House,
      },
    ],
  },
  {
    id: "ferramentas",
    title: "Perfil gratuito",
    items: [
      {
        to: "/app/recreador/ferramentas/hoteis",
        label: "Empresas e vagas",
        description: "Rede, vagas e convites",
        icon: Map,
      },
      {
        to: "/app/recreador/ferramentas/perfil-basico",
        label: "Perfil basico",
        description: "Portfolio público",
        icon: UserRound,
      },
      {
        to: "/app/recreador/ferramentas/cadastro-recreador",
        label: "Cadastro recreador",
        description: "Onboarding profissional",
        icon: Award,
      },
      {
        to: "/app/recreador/ferramentas/agenda-basica",
        label: "Agenda basica",
        description: "Compromissos da semana",
        icon: CalendarDays,
      },
      {
        to: "/app/recreador/ferramentas/checklists-simples",
        label: "Checklists simples",
        description: "Rotina operacional",
        icon: CheckSquare,
      },
      {
        to: "/app/recreador/ferramentas/registro-experiencias",
        label: "Registro de experiências",
        description: "Histórico de entregas",
        icon: BookOpen,
      },
      {
        to: "/app/recreador/ferramentas/suporte",
        label: "Suporte",
        description: "Ajuda e atendimento",
        icon: Headphones,
      },
    ],
  },
];

export const recreadorTopbarQuickLinks: ModuleTopbarQuickLink[] = [
  {
    id: "inicio",
    label: "Painel",
    to: "/app/recreador",
  },
  {
    id: "empresas",
    label: "Oportunidades",
    to: "/app/recreador/ferramentas/hoteis?aba=vagas",
  },
  {
    id: "comunidade",
    label: "Comunidade",
    to: "/app/recreador/comunidade",
  },
];

const recreadorTopbarContextMap: Record<string, ModuleTopbarContext> = {
  "/app/recreador": {
    title: "Painel do recreador",
    helper: "Visão geral, atalhos e oportunidades",
  },
  "/app/recreador/dashboard": {
    title: "Painel do recreador",
    helper: "Visão geral, atalhos e oportunidades",
  },
  "/app/recreador/ferramentas/hoteis": {
    title: "Empresas e oportunidades",
    helper: "Acompanhe vagas, convites e histórico",
  },
  "/app/recreador/comunidade": {
    title: "Comunidade",
    helper: "Area colaborativa em evolucao",
  },
  "/app/recreador/community": {
    title: "Comunidade",
    helper: "Area colaborativa em evolucao",
  },
  "/app/recreador/chat": {
    title: "Chat",
    helper: "Conversas com hoteis e equipe",
  },
  "/app/recreador/notificacoes": {
    title: "Notificações",
    helper: "Acompanhe alertas e mensagens da conta",
  },
  "/app/recreador/notifications": {
    title: "Notificações",
    helper: "Acompanhe alertas e mensagens da conta",
  },
  "/app/recreador/configuracoes": {
    title: "Configurações",
    helper: "Preferencias de perfil, usuario e segurança",
  },
  "/app/recreador/settings": {
    title: "Configurações",
    helper: "Preferencias de perfil, usuario e segurança",
  },
  "/app/recreador/em-desenvolvimento": {
    title: "Em desenvolvimento",
    helper: "Area preparada para entregas futuras",
  },
  "/app/recreador/ferramentas/perfil-basico": {
    title: "Perfil público",
    helper: "Evidencias, certificacoes e galeria",
  },
  "/app/recreador/ferramentas/cadastro-recreador": {
    title: "Cadastro do recreador",
    helper: "Conclua as etapas obrigatorias",
  },
  "/app/recreador/ferramentas/agenda-basica": {
    title: "Agenda da semana",
    helper: "Compromissos e disponibilidade",
  },
  "/app/recreador/ferramentas/checklists-simples": {
    title: "Checklists operacionais",
    helper: "Rotina antes, durante e apos eventos",
  },
  "/app/recreador/ferramentas/registro-experiencias": {
    title: "Registro de experiências",
    helper: "Documente entregas e resultados",
  },
  "/app/recreador/ferramentas/suporte": {
    title: "Central de suporte",
    helper: "Duvidas tecnicas e operacionais",
  },
  "/app/recreador/ferramentas/editar-perfil": {
    title: "Editar perfil",
    helper: "Atualize dados, foto e portfolio",
  },
};

export const getRecreadorTopbarContext = (pathname: string): ModuleTopbarContext => {
  const exact = recreadorTopbarContextMap[pathname];

  if (exact) {
    return exact;
  }

  const fallbackEntries = Object.entries(recreadorTopbarContextMap)
    .filter(([path]) => path !== "/app/recreador" && pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length);

  if (fallbackEntries.length > 0) {
    return fallbackEntries[0][1];
  }

  return recreadorTopbarContextMap["/app/recreador"];
};

export const hotelariaSidebarGroups: ModuleSidebarGroupDefinition[] = [
  {
    id: "painel-principal",
    title: "Painel principal",
    items: [
      {
        to: "/app/hotelaria",
        label: "Painel principal",
        description: "Visão geral e estatisticas",
        icon: Home,
      },
    ],
  },
  {
    id: "meu-perfil",
    title: "Meu perfil",
    items: [
      {
        to: "/app/hotelaria/perfil",
        label: "Meu perfil",
        description: "Suas informações pessoais",
        icon: UserRound,
      },
      {
        to: "/app/hotelaria/hotel",
        label: "Hotel",
        description: "Dados institucionais do hotel",
        icon: Building2,
      },
    ],
  },
  {
    id: "ferramentas-operacao",
    title: "Ferramentas da operação",
    items: [
      {
        to: "/app/hotelaria/escalas",
        label: "Escalas",
        description: "Organize escalas de trabalho",
        icon: CalendarDays,
      },
      {
        to: "/app/hotelaria/recreadores",
        label: "Recreadores",
        description: "Gerencie sua equipe",
        icon: Users,
      },
      {
        to: "/app/hotelaria/vagas",
        label: "Vagas",
        description: "Controle de oportunidades",
        icon: Users,
      },
      {
        to: "/app/hotelaria/indicadores",
        label: "Indicadores",
        description: "Acompanhe resultados-chave",
        icon: BarChart3,
      },
      {
        to: "/app/hotelaria/programacoes",
        label: "Programacoes",
        description: "Crie e organize atividades",
        icon: Gamepad2,
      },
      {
        to: "/app/hotelaria/feedback",
        label: "Feedback de recreadores",
        description: "Avalie recreadores",
        icon: MessageCircle,
      },
      {
        to: "/app/hotelaria/relatorios",
        label: "Relatorios",
        description: "Analises e métricas",
        icon: BarChart3,
      },
      {
        to: "/app/hotelaria/orcamento",
        label: "Orcamentos",
        description: "Controle financeiro",
        icon: DollarSign,
      },
      {
        to: "/app/hotelaria/ocorrencias",
        label: "Ocorrencias",
        description: "Registre eventos importantes",
        icon: AlertTriangle,
      },
    ],
  },
];

export const hotelariaTopbarQuickLinks: ModuleTopbarQuickLink[] = [
  {
    id: "painel",
    label: "Início",
    to: "/app/hotelaria",
  },
  {
    id: "vagas",
    label: "Vagas",
    to: "/app/hotelaria/vagas",
  },
  {
    id: "perfil",
    label: "Perfil",
    to: "/app/hotelaria/perfil",
  },
  {
    id: "comunidade",
    label: "Comunidade",
    to: "/app/hotelaria/comunidade",
  },
];

const hotelariaTopbarContextMap: Record<string, ModuleTopbarContext> = {
  "/app/hotelaria": {
    title: "Painel da hotelaria",
    helper: "Visão executiva da operação de recreação",
  },
  "/app/hotelaria/dashboard": {
    title: "Painel da hotelaria",
    helper: "Visão executiva da operação de recreação",
  },
  "/app/hotelaria/eventos": {
    title: "Eventos e programacoes",
    helper: "Agenda semanal, formatos e execucao",
  },
  "/app/hotelaria/equipe": {
    title: "Equipe de recreadores",
    helper: "Time ativo, histórico e disponibilidade",
  },
  "/app/hotelaria/perfil": {
    title: "Perfil da hotelaria",
    helper: "Dados institucionais e regras de operação",
  },
  "/app/hotelaria/hotel": {
    title: "Meu hotel",
    helper: "Informações estruturais e recados fixos",
  },
  "/app/hotelaria/meu-hotel": {
    title: "Meu hotel",
    helper: "Informações estruturais e recados fixos",
  },
  "/app/hotelaria/escalas": {
    title: "Escalas",
    helper: "Planejamento de turnos e cobertura",
  },
  "/app/hotelaria/recreadores": {
    title: "Recreadores",
    helper: "Banco de talentos e contratacoes",
  },
  "/app/hotelaria/vagas": {
    title: "Vagas",
    helper: "Abertura e acompanhamento de oportunidades",
  },
  "/app/hotelaria/programacoes": {
    title: "Programacoes",
    helper: "Grade de atividades por temporada",
  },
  "/app/hotelaria/indicadores": {
    title: "Indicadores",
    helper: "Painel de métricas operacionais da hotelaria",
  },
  "/app/hotelaria/feedback": {
    title: "Feedback de recreadores",
    helper: "Avaliação de desempenho e qualidade",
  },
  "/app/hotelaria/feedback-recreadores": {
    title: "Feedback de recreadores",
    helper: "Avaliação de desempenho e qualidade",
  },
  "/app/hotelaria/relatorios": {
    title: "Relatorios",
    helper: "Indicadores operacionais e insights",
  },
  "/app/hotelaria/orcamento": {
    title: "Orcamentos",
    helper: "Frente financeira planejada para etapa futura",
  },
  "/app/hotelaria/ocorrencias": {
    title: "Ocorrencias",
    helper: "Registro de incidentes e tratativas",
  },
  "/app/hotelaria/comunidade": {
    title: "Comunidade",
    helper: "Espaco colaborativo compartilhado entre módulos",
  },
  "/app/hotelaria/community": {
    title: "Comunidade",
    helper: "Espaco colaborativo compartilhado entre módulos",
  },
  "/app/hotelaria/chat": {
    title: "Chat",
    helper: "Comunicação direta com equipe e operação",
  },
  "/app/hotelaria/notificacoes": {
    title: "Notificações",
    helper: "Alertas e atualizacoes prioritarias",
  },
  "/app/hotelaria/notifications": {
    title: "Notificações",
    helper: "Alertas e atualizacoes prioritarias",
  },
  "/app/hotelaria/configuracoes": {
    title: "Configurações",
    helper: "Preferencias da area da hotelaria",
  },
  "/app/hotelaria/settings": {
    title: "Configurações",
    helper: "Preferencias da area da hotelaria",
  },
};

export const getHotelariaTopbarContext = (pathname: string): ModuleTopbarContext => {
  const exact = hotelariaTopbarContextMap[pathname];

  if (exact) {
    return exact;
  }

  const fallbackEntries = Object.entries(hotelariaTopbarContextMap)
    .filter(([path]) => path !== "/app/hotelaria" && pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length);

  if (fallbackEntries.length > 0) {
    return fallbackEntries[0][1];
  }

  return hotelariaTopbarContextMap["/app/hotelaria"];
};

export const paisSidebarGroups: ModuleSidebarGroupDefinition[] = [
  {
    id: "principal",
    title: "Principal",
    items: [
      {
        to: "/app/pais",
        label: "Início",
        description: "Painel da família",
        icon: House,
      },
    ],
  },
  {
    id: "servicos",
    title: "Serviços",
    items: [
      {
        to: "/app/pais/empresas",
        label: "Buscar empresas",
        description: "Catálogo de serviços",
        icon: Search,
      },
      {
        to: "/app/pais/mapa",
        label: "Mapa",
        description: "Cobertura por região",
        icon: Map,
      },
      {
        to: "/app/pais/agenda",
        label: "Agenda",
        description: "Compromissos e eventos",
        icon: CalendarDays,
      },
    ],
  },
  {
    id: "comunicacao",
    title: "Comunicação",
    items: [
      {
        to: "/app/pais/chat",
        label: "Mensagens",
        description: "Conversa com empresas",
        icon: MessageCircle,
      },
    ],
  },
  {
    id: "historico",
    title: "Histórico",
    items: [
      {
        to: "/app/pais/historico",
        label: "Histórico",
        description: "Contratações anteriores",
        icon: BookOpen,
      },
      {
        to: "/app/pais/avaliacoes",
        label: "Avaliações",
        description: "Avaliações da família",
        icon: Star,
      },
    ],
  },
  {
    id: "pessoal",
    title: "Pessoal",
    items: [
      {
        to: "/app/pais/favoritos",
        label: "Favoritos",
        description: "Empresas salvas",
        icon: Heart,
      },
      {
        to: "/app/pais/comunidade",
        label: "Comunidade",
        description: "Espaço compartilhado",
        icon: Users,
      },
    ],
  },
];

export const paisTopbarQuickLinks: ModuleTopbarQuickLink[] = [
  {
    id: "inicio",
    label: "Início",
    to: "/app/pais",
  },
  {
    id: "buscar",
    label: "Buscar",
    to: "/app/pais/empresas",
  },
  {
    id: "favoritos",
    label: "Favoritos",
    to: "/app/pais/favoritos",
  },
  {
    id: "comunidade",
    label: "Comunidade",
    to: "/app/pais/comunidade",
  },
];

const paisTopbarContextMap: Record<string, ModuleTopbarContext> = {
  "/app/pais": {
    title: "Painel da família",
    helper: "Visão geral para buscar, comparar e contratar",
  },
  "/app/pais/dashboard": {
    title: "Painel da família",
    helper: "Visão geral para buscar, comparar e contratar",
  },
  "/app/pais/empresas": {
    title: "Buscar empresas",
    helper: "Catálogo com filtros de bairro, perfil e faixa etária",
  },
  "/app/pais/favoritos": {
    title: "Favoritos",
    helper: "Empresas salvas para decisão rápida da família",
  },
  "/app/pais/mapa": {
    title: "Mapa",
    helper: "Cobertura por região e distância da família",
  },
  "/app/pais/agenda": {
    title: "Agenda",
    helper: "Compromissos de contato e eventos planejados",
  },
  "/app/pais/historico": {
    title: "Histórico",
    helper: "Linha do tempo das contratações da família",
  },
  "/app/pais/avaliacoes": {
    title: "Avaliações",
    helper: "Reputação das empresas com base em experiências reais",
  },
  "/app/pais/perfil": {
    title: "Perfil da família",
    helper: "Preferências e dados para recomendações mais precisas",
  },
  "/app/pais/comunidade": {
    title: "Comunidade",
    helper: "Espaço colaborativo compartilhado entre os módulos",
  },
  "/app/pais/community": {
    title: "Comunidade",
    helper: "Espaço colaborativo compartilhado entre os módulos",
  },
  "/app/pais/chat": {
    title: "Mensagens",
    helper: "Conversa direta com empresas e atendimentos",
  },
  "/app/pais/notificacoes": {
    title: "Notificações",
    helper: "Alertas da conta, propostas e mensagens",
  },
  "/app/pais/notifications": {
    title: "Notificações",
    helper: "Alertas da conta, propostas e mensagens",
  },
  "/app/pais/configuracoes": {
    title: "Configurações",
    helper: "Preferências da família, acessos e segurança",
  },
  "/app/pais/settings": {
    title: "Configurações",
    helper: "Preferências da família, acessos e segurança",
  },
};

export const getPaisTopbarContext = (pathname: string): ModuleTopbarContext => {
  const exact = paisTopbarContextMap[pathname];

  if (exact) {
    return exact;
  }

  if (pathname.startsWith("/app/pais/area/")) {
    const featureId = pathname.replace("/app/pais/area/", "").split("/")[0];
    const canonicalPath = `/app/pais/${featureId}`;
    const areaContext = paisTopbarContextMap[canonicalPath];

    if (areaContext) {
      return areaContext;
    }
  }

  const fallbackEntries = Object.entries(paisTopbarContextMap)
    .filter(([path]) => path !== "/app/pais" && pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length);

  if (fallbackEntries.length > 0) {
    return fallbackEntries[0][1];
  }

  return paisTopbarContextMap["/app/pais"];
};

export const empresarioTopbarQuickLinks: ModuleTopbarQuickLink[] = [
  {
    id: "perfil-empresa",
    label: "Perfil da Empresa",
    to: "/app/empresa/perfil",
  },
  {
    id: "perfil-recreador",
    label: "Perfil do Recreador",
    to: "/app/empresa/recreador",
  },
];

export const empresarioSidebarGroups: ModuleSidebarGroupDefinition[] = [
  {
    id: "modo-visualizacao",
    title: "Modo de visualizacao",
    items: [
      {
        to: "/app/empresa/perfil",
        label: "Perfil da empresa",
        description: "Visualizacao institucional",
        icon: Building2,
      },
      {
        to: "/app/empresa/recreador",
        label: "Perfil do recreador",
        description: "Visualizacao profissional",
        icon: UserRound,
      },
    ],
  },
  {
    id: "gestao",
    title: "Gestao da empresa",
    items: [
      {
        to: "/app/empresa",
        label: "Painel da empresa",
        description: "Visão geral do desempenho",
        icon: Building2,
      },
      {
        to: "/app/empresa/orcamentos",
        label: "Gestao de orcamentos",
        description: "Propostas e negociacoes",
        icon: Calculator,
      },
      {
        to: "/app/empresa/agenda",
        label: "Agenda de eventos",
        description: "Entregas, reuniões e prazos",
        icon: CalendarDays,
      },
      {
        to: "/app/empresa/equipe",
        label: "Equipe da empresa",
        description: "Recreadores e alocacoes",
        icon: Users,
      },
      {
        to: "/app/empresa/vagas",
        label: "Vagas",
        description: "Captacao e selecao de talentos",
        icon: Briefcase,
      },
    ],
  },
  {
    id: "servicos",
    title: "Servicos e marketing",
    items: [
      {
        to: "/app/empresa/servicos",
        label: "Cadastro de servicos",
        description: "Pacotes e escopos da empresa",
        icon: Package,
      },
      {
        to: "/app/empresa/galeria",
        label: "Galeria da empresa",
        description: "Fotos e registros de eventos",
        icon: Camera,
      },
      {
        to: "/app/empresa/depoimentos",
        label: "Depoimentos dos pais",
        description: "Avaliações e prova social",
        icon: Star,
      },
    ],
  },
  {
    id: "financeiro",
    title: "Financeiro",
    items: [
      {
        to: "/app/empresa/financas",
        label: "Financas e pagamentos",
        description: "Controle financeiro da operação",
        icon: DollarSign,
      },
    ],
  },
  {
    id: "configuracoes",
    title: "Configurações",
    items: [
      {
        to: "/app/empresa/configuracoes",
        label: "Configurações",
        description: "Preferencias do negócio",
        icon: Settings,
      },
    ],
  },
];

const empresarioTopbarContextMap: Record<string, ModuleTopbarContext> = {
  "/app/empresa": {
    title: "Painel do empresario",
    helper: "Visão executiva da operação da empresa",
  },
  "/app/empresa/dashboard": {
    title: "Painel do empresario",
    helper: "Visão executiva da operação da empresa",
  },
  "/app/empresa/perfil": {
    title: "Perfil da empresa",
    helper: "Dados institucionais, branding e apresentacao comercial",
  },
  "/app/empresa/perfil-empresa": {
    title: "Perfil da empresa",
    helper: "Dados institucionais, branding e apresentacao comercial",
  },
  "/app/empresa/empresa": {
    title: "Perfil da empresa",
    helper: "Dados institucionais, branding e apresentacao comercial",
  },
  "/app/empresa/recreador": {
    title: "Perfil do recreador",
    helper: "Portfolio profissional do recreador da empresa",
  },
  "/app/empresa/orcamentos": {
    title: "Gestao de orcamentos",
    helper: "Propostas, negociacoes e follow-up comercial",
  },
  "/app/empresa/agenda": {
    title: "Agenda de eventos",
    helper: "Prazos, reuniões e entregas da operação",
  },
  "/app/empresa/equipe": {
    title: "Equipe da empresa",
    helper: "Recreadores, alocacoes e acompanhamento do time",
  },
  "/app/empresa/vagas": {
    title: "Vagas",
    helper: "Abertura, triagem e evolucao de candidaturas",
  },
  "/app/empresa/servicos": {
    title: "Cadastro de servicos",
    helper: "Pacotes e escopos comerciais oferecidos",
  },
  "/app/empresa/galeria": {
    title: "Galeria da empresa",
    helper: "Portifolio visual e registros de eventos",
  },
  "/app/empresa/depoimentos": {
    title: "Depoimentos",
    helper: "Prova social e percepcao dos clientes",
  },
  "/app/empresa/financas": {
    title: "Financas e pagamentos",
    helper: "Receitas, repasses e previsão financeira",
  },
  "/app/empresa/comunidade": {
    title: "Comunidade",
    helper: "Espaco compartilhado entre módulos",
  },
  "/app/empresa/community": {
    title: "Comunidade",
    helper: "Espaco compartilhado entre módulos",
  },
  "/app/empresa/chat": {
    title: "Chat empresarial",
    helper: "Conversas com clientes, equipe e parceiros",
  },
  "/app/empresa/notificacoes": {
    title: "Notificações",
    helper: "Alertas comerciais e operacionais da empresa",
  },
  "/app/empresa/notifications": {
    title: "Notificações",
    helper: "Alertas comerciais e operacionais da empresa",
  },
  "/app/empresa/configuracoes": {
    title: "Configurações",
    helper: "Preferencias de perfil, usuarios e segurança",
  },
  "/app/empresa/settings": {
    title: "Configurações",
    helper: "Preferencias de perfil, usuarios e segurança",
  },
};

export const getEmpresarioTopbarContext = (pathname: string): ModuleTopbarContext => {
  const exact = empresarioTopbarContextMap[pathname];

  if (exact) {
    return exact;
  }

  const fallbackEntries = Object.entries(empresarioTopbarContextMap)
    .filter(([path]) => path !== "/app/empresa" && pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length);

  if (fallbackEntries.length > 0) {
    return fallbackEntries[0][1];
  }

  return empresarioTopbarContextMap["/app/empresa"];
};