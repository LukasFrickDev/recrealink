import type { ModuleDashboardStatItem } from "@/shared/layouts/ModuleDashboardShell";
import type { SharedModuleKey } from "@/shared/pages/moduleSharedShell";

interface UnifiedCommunityModuleConfig {
  pageTitle: string;
  pageDescription: string;
  subtitle: string;
  message: string;
  statusLabel: string;
  highlights: string[];
  nextSteps: string[];
  stats: ModuleDashboardStatItem[];
  homeRoute: string;
  tone: "recreador" | "hotelaria" | "empresa" | "pais";
}

export const unifiedCommunityPageByModule: Record<SharedModuleKey, UnifiedCommunityModuleConfig> = {
  recreador: {
    pageTitle: "Comunidade",
    pageDescription: "Espaço colaborativo em preparação para conexão entre recreadores.",
    subtitle: "Comunidade do recreador em desenvolvimento",
    message: "Esta área será compartilhada entre os módulos para conexão entre recreadores, empresas e hotelaria em base única.",
    statusLabel: "Base em preparação",
    highlights: [
      "Diretrizes de troca entre recreadores já validadas.",
      "Espaço pronto para mural de experiências e repertório.",
      "Visual alinhado com fluxo de oportunidades do módulo.",
    ],
    nextSteps: [
      "Conectar publicações a dados reais do perfil.",
      "Adicionar filtros por tema e faixa etária.",
      "Ativar moderação por regras da comunidade.",
    ],
    stats: [],
    homeRoute: "/app/recreador",
    tone: "recreador",
  },
  hotelaria: {
    pageTitle: "Comunidade",
    pageDescription: "Espaço colaborativo em preparação para conexão entre equipes da hotelaria.",
    subtitle: "Comunidade da hotelaria em desenvolvimento",
    message: "Esta área será compartilhada entre os módulos para troca de boas práticas e operação integrada.",
    statusLabel: "Estrutura definida",
    highlights: [
      "Formato pronto para troca de playbooks operacionais.",
      "Fluxo visual alinhado com gestão e alertas da hotelaria.",
      "Base preparada para comunicação entre unidades.",
    ],
    nextSteps: [
      "Conectar tópicos por tipo de operação.",
      "Ativar trilhas por área: escalas, qualidade e eventos.",
      "Sincronizar atividade com notificações reais.",
    ],
    stats: [],
    homeRoute: "/app/hotelaria",
    tone: "hotelaria",
  },
  pais: {
    pageTitle: "Comunidade",
    pageDescription: "Espaço colaborativo em preparação para trocas entre famílias.",
    subtitle: "Comunidade das famílias em desenvolvimento",
    message: "Esta área será compartilhada entre módulos para recomendações, dicas e experiências de contratação.",
    statusLabel: "Planejamento ativo",
    highlights: [
      "Jornada de troca entre famílias já mapeada.",
      "Estrutura pronta para dicas e recomendações confiáveis.",
      "Composição visual alinhada com busca e favoritos.",
    ],
    nextSteps: [
      "Conectar temas a perfis e históricos da família.",
      "Ativar ranking de relevância por contexto.",
      "Integrar alertas com respostas de empresas.",
    ],
    stats: [],
    homeRoute: "/app/pais",
    tone: "pais",
  },
  empresa: {
    pageTitle: "Comunidade",
    pageDescription: "Área colaborativa em desenvolvimento para integração entre empresa, recreador e hotelaria.",
    subtitle: "Comunidade empresarial em desenvolvimento",
    message: "Esta área será compartilhada entre os módulos para conexão entre empresas, recreadores e hotelaria em uma base única.",
    statusLabel: "Base refinada",
    highlights: [
      "Estrutura compartilhada entre os módulos concluída.",
      "Direção de conteúdo para networking profissional definida.",
      "Área pronta para evolução com dados de negócio.",
    ],
    nextSteps: [
      "Conectar interações a eventos e oportunidades.",
      "Ativar curadoria por perfil de empresa.",
      "Sincronizar com fluxos de chat e notificações.",
    ],
    stats: [
      { title: "Status", value: "Refinada", helper: "Base compartilhada do sistema" },
      { title: "Integrações planejadas", value: "03", helper: "Empresa, recreador e hotelaria" },
      { title: "Fase", value: "4", helper: "Revisão final de consistência" },
      { title: "Próximo passo", value: "Conectar dados", helper: "Sem backend nesta etapa" },
    ],
    homeRoute: "/app/empresa",
    tone: "empresa",
  },
};