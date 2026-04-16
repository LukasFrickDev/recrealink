import {
  buildModuleNotificationPreferences,
  moduleSettingsSectionIds,
  moduleSettingsSecurityTips,
  type ModuleSettingsMockBase,
} from "@/shared/mocks/settings";

export type RecreadorSettingsTabId = "perfil" | "notificacoes" | "usuarios" | "seguranca";

export interface RecreadorSettingsTab {
  id: RecreadorSettingsTabId;
  label: string;
  helper: string;
}

export interface NotificationPreferenceItem {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface UserAccessItem {
  id: string;
  name: string;
  role: string;
  email: string;
  active: boolean;
}

export const recreadorConfiguracoesMock: ModuleSettingsMockBase = {
  title: "Configurações do recreador",
  userName: "Rafael Santos",
  description:
    "Ajuste dados do perfil, notificações, acesso de usuário e segurança sem dependência de backend nesta etapa.",
  stats: [
    { title: "Seções", value: "04", helper: "Perfil, Notificações, Usuários e Segurança" },
    { title: "Persistência", value: "Local", helper: "Estado visual da Etapa 1" },
    { title: "Perfil", value: "Integrado", helper: "Dados sincronizados com edição de perfil" },
    { title: "Status", value: "Pronto", helper: "Navegação interna ativa" },
  ],
  tabs: [
    { id: "perfil", label: "Dados do perfil", helper: "Nome, bio e especialidades" },
    { id: "notificacoes", label: "Notificações", helper: "Preferências de alertas" },
    { id: "usuarios", label: "Usuários", helper: "Acesso e permissões" },
    { id: "seguranca", label: "Segurança", helper: "Senha e sessão" },
  ] as RecreadorSettingsTab[],
  defaultTabId: "perfil",
  notificationsTabId: moduleSettingsSectionIds.notificationsTabId,
  usersTabId: moduleSettingsSectionIds.usersTabId,
  securityTabId: moduleSettingsSectionIds.securityTabId,
  notificationPreferences: buildModuleNotificationPreferences({
    oportunidades: "Avisos de vagas e convites alinhados ao seu perfil.",
    mensagens: "Receba alerta quando chegar uma nova conversa.",
    comunidade: "Notificações sobre públicações e interações relevantes.",
    "resumo-semanal": "Resumo de desempenho e atividade da conta.",
    marketing: "Informativos e novidades da RecreaLink.",
  }) as NotificationPreferenceItem[],
  userAccess: [
    {
      id: "owner",
      name: "Rafael Santos",
      role: "Administrador",
      email: "rafael.santos@recrealink.com",
      active: true,
    },
    {
      id: "assistant",
      name: "Marina Costa",
      role: "Assistente",
      email: "marina.costa@recrealink.com",
      active: true,
    },
  ] as UserAccessItem[],
  securityTips: [...moduleSettingsSecurityTips],
  feedbackMessages: {
    notificationsSaved: "Preferências de notificações atualizadas com sucesso.",
    usersSaved: "Ajustes de usuário salvos para esta sessão visual.",
    securitySaved: "Solicitação de segurança registrada na camada visual da Etapa 1.",
  },
};
