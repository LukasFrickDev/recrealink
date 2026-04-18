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
  usersSaved: "Permissões de usuários atualizadas com sucesso.",
  securitySaved: "Ajuste de segurança atualizado com sucesso.",
  securityEmpty: "Preencha os três campos de senha para continuar.",
  securityMismatch: "A nova senha e a confirmação precisam ser iguais.",
  dataSaved: "Dados de configuração atualizados com sucesso.",
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
