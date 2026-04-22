import {
  buildModuleNotificationPreferences,
  moduleSettingsSectionIds,
  moduleSettingsSecurityTips,
  type ModuleSettingsMockBase,
} from "@/shared/mocks/settings";

export const paisSettingsMock: ModuleSettingsMockBase = {
  userName: "Lúcia Fernandes",
  title: "Configurações da família",
  description: "Preferências de conta, notificações e segurança para o perfil familiar.",
  stats: [],
  tabs: [
    { id: "dados-familia", label: "Dados da família", helper: "Preferências do perfil" },
    { id: "dados-responsavel", label: "Dados do responsável", helper: "Conta principal" },
    { id: "notificacoes", label: "Notificações", helper: "Alertas e comunicações" },
    { id: "usuarios", label: "Usuários", helper: "Acessos vinculados" },
    { id: "seguranca", label: "Segurança", helper: "Senha e proteção" },
    { id: "conta", label: "Conta", helper: "Logout e exclusão" },
  ],
  defaultTabId: "dados-familia",
  notificationsTabId: moduleSettingsSectionIds.notificationsTabId,
  usersTabId: moduleSettingsSectionIds.usersTabId,
  securityTabId: moduleSettingsSectionIds.securityTabId,
  accountTabId: moduleSettingsSectionIds.accountTabId,
  notificationPreferences: buildModuleNotificationPreferences(
    {
      oportunidades: "Receber alertas de novas empresas e propostas.",
      mensagens: "Ser avisado quando houver nova mensagem no chat.",
      comunidade: "Receber novidades de discussões e recomendações.",
      "resumo-semanal": "Resumo com atividades e respostas da semana.",
      marketing: "Receber comunicações de melhorias da plataforma.",
    },
    {
      comunidade: true,
    },
  ),
  userAccess: [
    {
      id: "pais-user-1",
      name: "Lúcia Fernandes",
      role: "Responsável principal",
      email: "lucia.fernandes@email.com",
      active: true,
    },
    {
      id: "pais-user-2",
      name: "Marcos Fernandes",
      role: "Responsável secundário",
      email: "marcos.fernandes@email.com",
      active: true,
    },
  ],
  securityTips: [...moduleSettingsSecurityTips],
  dataTabs: [
    {
      id: "dados-familia",
      editable: true,
      options: [
        { label: "Nome da família", value: "Família Fernandes" },
        { label: "Cidade base", value: "São Paulo - SP" },
        { label: "Faixa etária", value: "4 a 10 anos" },
        { label: "Tipo de evento", value: "Aniversário e recreação em condomínio" },
      ],
    },
    {
      id: "dados-responsavel",
      editable: false,
      restrictedNotice: "Apenas o responsável principal pode editar estes campos.",
      options: [
        { label: "Nome", value: "Lúcia Fernandes" },
        { label: "E-mail principal", value: "lucia.fernandes@email.com" },
        { label: "Telefone", value: "(11) 98888-1122" },
      ],
    },
  ],
  feedbackMessages: {
    notificationsSaved: "Preferências de notificações atualizadas com sucesso.",
    usersSaved: "Ajustes de usuários salvos para esta sessão visual.",
    securitySaved: "Solicitação de segurança registrada na camada visual.",
    dataSaved: "Dados da família atualizados na camada visual.",
  },
};
