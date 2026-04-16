import {
  hotelariaNotificationFilters,
  paisNotificationFilters,
  recreadorNotificationFilters,
} from "@/shared/constants/notificationFilters";
import { uiMessages } from "@/shared/constants/uiMessages";
import type { ModuleDashboardStatItem } from "@/shared/layouts/ModuleDashboardShell";
import type { NotificationsPageTemplateData } from "@/shared/pages/NotificationsPageTemplate/data";
import type { SharedModuleKey } from "@/shared/pages/moduleSharedShell";

interface UnifiedNotificationsModuleConfig {
  pageTitle: string;
  pageDescription: string;
  stats: ModuleDashboardStatItem[];
  templateData: NotificationsPageTemplateData;
  tone?: "default" | "hotelaria" | "pais";
}

export const unifiedNotificationsPageByModule: Record<
  SharedModuleKey,
  UnifiedNotificationsModuleConfig
> = {
  recreador: {
    pageTitle: "Notificações do recreador",
    pageDescription: "Central visual de alertas para oportunidades, chat e atividade da conta.",
    stats: [
      { title: "Alertas", value: "12", helper: "Total na caixa" },
      { title: "Não lidas", value: "05", helper: "Exigem atenção" },
      { title: "Hoje", value: "03", helper: "Atualizadas recentemente" },
      { title: "Status", value: "Visual", helper: "Sem backend nesta etapa" },
    ],
    templateData: {
      sectionTitle: "Notificações",
      sectionSubtitle: "Filtre alertas por tipo e mantenha a caixa organizada",
      markAllLabel: "Marcar tudo como lido",
      searchPlaceholder: "Buscar notificações",
      detailLabel: "Ver detalhe",
      emptyMessage: uiMessages.notificationsEmptyFilter,
      filters: recreadorNotificationFilters,
      items: [
        {
          id: "n-1",
          type: "oportunidade",
          title: "Nova vaga em hotel parceiro",
          description: "Cyan Resort abriu turno para recreação infantil neste fim de semana.",
          time: "Ha 12 min",
          read: false,
        },
        {
          id: "n-2",
          type: "mensagem",
          title: "Nova mensagem no chat",
          description: "Ana Martins respondeu sobre sua disponibilidade para sabado.",
          time: "Ha 25 min",
          read: false,
        },
        {
          id: "n-3",
          type: "sistema",
          title: "Perfil atualizado com sucesso",
          description: "Seus dados principais foram sincronizados no módulo do recreador.",
          time: "Hoje, 09:10",
          read: true,
        },
        {
          id: "n-4",
          type: "comunidade",
          title: "Comunidade em evolucao",
          description: "A area colaborativa esta em desenvolvimento para a próxima iteracao.",
          time: "Ontem",
          read: false,
        },
        {
          id: "n-5",
          type: "mensagem",
          title: "Briefing recebido",
          description: "Royal Palm enviou orientacoes da atividade de fim de semana.",
          time: "Ontem",
          read: true,
        },
      ],
    },
  },
  hotelaria: {
    pageTitle: "Central de notificações",
    pageDescription: "Fila de alertas com prioridade e ação recomendada por origem operacional.",
    stats: [
      { title: "Urgentes", value: "3", helper: "Ação imediata" },
      { title: "Importantes", value: "8", helper: "Acompanhamento diario" },
      { title: "Informativas", value: "14", helper: "Histórico recente" },
      { title: "Resolvidas", value: "64", helper: "Últimos 7 dias" },
    ],
    templateData: {
      sectionTitle: "Central de notificações",
      sectionSubtitle: "Fila por prioridade com ação recomendada para resposta mais rápida.",
      markAllLabel: "Marcar todas como lidas",
      searchPlaceholder: "Buscar notificações",
      detailLabel: "Ver detalhe",
      emptyMessage: uiMessages.notificationsEmptyFilter,
      filters: hotelariaNotificationFilters,
      items: [
        {
          id: "hotelaria-notification-1",
          type: "urgente",
          title: "Cobertura de sabado abaixo da meta",
          description: "Escalas: Reforcar lider kids para turno da tarde",
          time: "Agora",
          read: false,
        },
        {
          id: "hotelaria-notification-2",
          type: "importante",
          title: "Feedback com nota abaixo de 4.0",
          description: "Feedback: Agendar devolutiva com recreador",
          time: "15 min",
          read: false,
        },
        {
          id: "hotelaria-notification-3",
          type: "informativa",
          title: "Novo protocolo publicado",
          description: "Meu hotel: Confirmar leitura no canal de operação",
          time: "2h",
          read: false,
        },
      ],
    },
    tone: "hotelaria",
  },
  pais: {
    pageTitle: "Notificações da família",
    pageDescription: "Central de alertas para propostas, mensagens e atividades salvas.",
    stats: [
      { title: "Alertas", value: "10", helper: "Total na caixa" },
      { title: "Não lidas", value: "04", helper: "Exigem atenção" },
      { title: "Hoje", value: "03", helper: "Atualizadas recentemente" },
      { title: "Status", value: "Visual", helper: "Sem backend nesta etapa" },
    ],
    templateData: {
      sectionTitle: "Notificações",
      sectionSubtitle: "Acompanhe respostas de empresas e movimentos importantes da sua conta.",
      markAllLabel: "Marcar tudo como lido",
      searchPlaceholder: "Buscar notificações",
      detailLabel: "Ver detalhe",
      emptyMessage: uiMessages.notificationsEmptyFilter,
      filters: paisNotificationFilters,
      items: [
        {
          id: "pais-not-1",
          type: "empresas",
          title: "Nova proposta recebida",
          description: "Recreação Diversão Total enviou proposta para sábado à tarde.",
          time: "Agora",
          read: false,
        },
        {
          id: "pais-not-2",
          type: "mensagem",
          title: "Nova mensagem no chat",
          description: "Alegria & Cia pediu confirmação de faixa etária do evento.",
          time: "Há 25 min",
          read: false,
        },
        {
          id: "pais-not-3",
          type: "favoritos",
          title: "Empresa favorita atualizada",
          description: "Show Kids Experience publicou novos serviços para festas de 4 a 8 anos.",
          time: "Hoje, 09:15",
          read: true,
        },
        {
          id: "pais-not-4",
          type: "agenda",
          title: "Lembrete de contato",
          description: "Agendamento com equipe comercial da Diversao Total em 2 horas.",
          time: "Hoje",
          read: false,
        },
      ],
    },
    tone: "pais",
  },
  empresa: {
    pageTitle: "Notificações",
    pageDescription: "Alertas operacionais, comerciais e administrativos da empresa.",
    stats: [
      { title: "Alertas totais", value: "23", helper: "Últimos 7 dias" },
      { title: "Não lidas", value: "08", helper: "Requer atenção" },
      { title: "Comerciais", value: "11", helper: "Orcamentos e leads" },
      { title: "Operacionais", value: "09", helper: "Agenda e equipe" },
    ],
    templateData: {
      sectionTitle: "Central de alertas",
      sectionSubtitle: "Monitore os avisos que impactam vendas, agenda e execucao.",
      markAllLabel: "Marcar tudo como lido",
      searchPlaceholder: "Buscar notificações",
      detailLabel: "Ver detalhe",
      emptyMessage: "Nenhuma notificacao encontrada para este filtro.",
      filters: [
        { id: "todas", label: "Todas" },
        { id: "nao-lidas", label: "Não lidas" },
        { id: "orcamentos", label: "Orcamentos" },
        { id: "agenda", label: "Agenda" },
        { id: "equipe", label: "Equipe" },
        { id: "sistema", label: "Sistema" },
      ],
      items: [
        {
          id: "n-1",
          type: "orcamentos",
          title: "Proposta aguardando aprovacao",
          description: "Clube Estacao Kids solicitou ajustes no pacote premium.",
          time: "Agora",
          read: false,
        },
        {
          id: "n-2",
          type: "agenda",
          title: "Mudanca de horario",
          description: "Evento corporativo foi antecipado para 13h.",
          time: "Hoje",
          read: false,
        },
        {
          id: "n-3",
          type: "equipe",
          title: "Disponibilidade atualizada",
          description: "Lucas Nunes confirmou presenca para sabado.",
          time: "Hoje",
          read: true,
        },
        {
          id: "n-4",
          type: "sistema",
          title: "Revisão de segurança",
          description: "Recomendacao de atualizacao de senha da conta principal.",
          time: "Ontem",
          read: true,
        },
      ],
    },
  },
};