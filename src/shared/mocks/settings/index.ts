import type {
  SettingsBaseTabConfig,
  SettingsNotificationPreference,
  SettingsUserAccess,
} from "@/shared/layouts/SettingsLayoutBase/StandardSettingsTabs";
import type { SettingsTemplateDataTabConfig } from "@/shared/pages/SettingsPageTemplate";
import type { SettingsTemplateFeedbackMessages } from "@/shared/pages/SettingsPageTemplate/data";
import {
  buildSettingsNotificationPreferences,
  sharedSettingsSecurityTips,
  type SharedSettingsNotificationId,
  type SharedSettingsNotificationItem,
} from "@/shared/constants/settingsDefaults";

export interface ModuleSettingsStatItem {
  title: string;
  value: string;
  helper: string;
}

export interface ModuleSettingsMockBase {
  userName: string;
  title: string;
  description: string;
  stats: ModuleSettingsStatItem[];
  tabs: SettingsBaseTabConfig[];
  defaultTabId: string;
  notificationsTabId: string;
  usersTabId: string;
  securityTabId: string;
  notificationPreferences: SettingsNotificationPreference[];
  userAccess: SettingsUserAccess[];
  securityTips: string[];
  dataTabs?: SettingsTemplateDataTabConfig[];
  feedbackMessages?: Partial<SettingsTemplateFeedbackMessages>;
}

export const moduleSettingsSectionIds = {
  notificationsTabId: "notificacoes",
  usersTabId: "usuarios",
  securityTabId: "seguranca",
} as const;

export const buildModuleNotificationPreferences = (
  descriptionsById: Record<SharedSettingsNotificationId, string>,
  enabledOverrides: Partial<Record<SharedSettingsNotificationId, boolean>> = {},
): SharedSettingsNotificationItem[] => {
  return buildSettingsNotificationPreferences(descriptionsById, enabledOverrides);
};

export const moduleSettingsSecurityTips = [...sharedSettingsSecurityTips];

export const defaultModuleSettingsFeedbackMessages: Partial<SettingsTemplateFeedbackMessages> = {
  notificationsSaved: "Preferências de notificações atualizadas com sucesso.",
  usersSaved: "Ajustes de usuários salvos para esta sessão visual.",
  securitySaved: "Solicitação de segurança registrada na camada visual.",
  dataSaved: "Dados atualizados na camada visual da configuração.",
};
