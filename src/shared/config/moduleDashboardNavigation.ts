import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
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
      {
        to: "/app/recreador/perfil",
        label: "Perfil",
        description: "Agregado completo: dados, vitrine e reputacao",
        icon: UserRound,
      },
      {
        to: "/app/recreador/disponibilidade",
        label: "Disponibilidade",
        description: "Agenda e blocos de atuação",
        icon: CalendarDays,
      },
    ],
  },
  {
    id: "operacao",
    title: "Operação",
    items: [
      {
        to: "/app/recreador/oportunidades",
        label: "Oportunidades",
        description: "Rede de hotéis e vagas abertas",
        icon: Map,
      },
      {
        to: "/app/recreador/convites",
        label: "Convites",
        description: "Respostas operacionais em andamento",
        icon: Briefcase,
      },
      {
        to: "/app/recreador/checklist",
        label: "Checklist",
        description: "Rotina operacional",
        icon: CheckSquare,
      },
      {
        to: "/app/recreador/configuracoes",
        label: "Configurações",
        description: "Preferências da conta",
        icon: Settings,
      },
      {
        to: "/app/recreador/suporte",
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
    id: "oportunidades",
    label: "Oportunidades",
    to: "/app/recreador/oportunidades",
  },
  {
    id: "convites",
    label: "Convites",
    to: "/app/recreador/convites",
  },
];

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
        label: "Programações",
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
        label: "Relatórios",
        description: "Análises e métricas",
        icon: BarChart3,
      },
      {
        to: "/app/hotelaria/orcamento",
        label: "Orçamentos",
        description: "Controle financeiro",
        icon: DollarSign,
      },
      {
        to: "/app/hotelaria/ocorrencias",
        label: "Ocorrências",
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
    title: "Gestão da empresa",
    items: [
      {
        to: "/app/empresa",
        label: "Painel da empresa",
        description: "Visão geral do desempenho",
        icon: Building2,
      },
      {
        to: "/app/empresa/orcamentos",
        label: "Gestão de orçamentos",
        description: "Propostas e negociações",
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
    title: "Serviços e marketing",
    items: [
      {
        to: "/app/empresa/servicos",
        label: "Cadastro de serviços",
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
        description: "Preferências do negócio",
        icon: Settings,
      },
    ],
  },
];