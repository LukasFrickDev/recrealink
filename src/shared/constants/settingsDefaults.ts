export type SharedSettingsNotificationId =
  | "oportunidades"
  | "mensagens"
  | "comunidade"
  | "resumo-semanal"
  | "marketing";

interface SharedSettingsNotificationSeed {
  id: SharedSettingsNotificationId;
  title: string;
  defaultEnabled: boolean;
}

export interface SharedSettingsNotificationItem {
  id: SharedSettingsNotificationId;
  title: string;
  description: string;
  enabled: boolean;
}

const sharedSettingsNotificationSeed: SharedSettingsNotificationSeed[] = [
  {
    id: "oportunidades",
    title: "Novas oportunidades",
    defaultEnabled: true,
  },
  {
    id: "mensagens",
    title: "Mensagens no chat",
    defaultEnabled: true,
  },
  {
    id: "comunidade",
    title: "Atualiza\u00e7\u00f5es da comunidade",
    defaultEnabled: false,
  },
  {
    id: "resumo-semanal",
    title: "Resumo semanal",
    defaultEnabled: true,
  },
  {
    id: "marketing",
    title: "Comunica\u00e7\u00f5es da plataforma",
    defaultEnabled: false,
  },
];

export const sharedSettingsSecurityTips = [
  "Use pelo menos 8 caracteres com combina\u00e7\u00e3o de letras, n\u00fameros e s\u00edmbolos.",
  "Revise sess\u00f5es abertas em dispositivos compartilhados com frequ\u00eancia.",
  "Ative alertas para login e mudan\u00e7as de dados cr\u00edticos.",
] as const;

export const buildSettingsNotificationPreferences = (
  descriptionsById: Record<SharedSettingsNotificationId, string>,
  enabledOverrides: Partial<Record<SharedSettingsNotificationId, boolean>> = {},
): SharedSettingsNotificationItem[] => {
  return sharedSettingsNotificationSeed.map((item) => ({
    id: item.id,
    title: item.title,
    description: descriptionsById[item.id],
    enabled: enabledOverrides[item.id] ?? item.defaultEnabled,
  }));
};
