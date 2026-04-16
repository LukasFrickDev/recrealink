export interface SettingsTemplateFeedbackMessages {
  notificationsSaved: string;
  usersSaved: string;
  securitySaved: string;
  securityEmpty: string;
  securityMismatch: string;
  dataSaved: string;
}

interface SettingsDataValueSource {
  id: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

export const defaultSettingsTemplateFeedbackMessages: SettingsTemplateFeedbackMessages = {
  notificationsSaved: "Preferências de notificações atualizadas com sucesso.",
  usersSaved: "Ajustes de usuários salvos para esta sessão visual.",
  securitySaved: "Solicitação de segurança registrada na camada visual.",
  securityEmpty: "Preencha os três campos de senha para continuar.",
  securityMismatch: "A nova senha e a confirmação precisam ser iguais.",
  dataSaved: "Dados atualizados na camada visual da configuração.",
};

export const createSettingsTemplateDataValueMap = (
  tabs: SettingsDataValueSource[],
): Record<string, string> => {
  const map: Record<string, string> = {};

  tabs.forEach((tab) => {
    tab.options.forEach((option) => {
      map[`${tab.id}:${option.label}`] = option.value;
    });
  });

  return map;
};
