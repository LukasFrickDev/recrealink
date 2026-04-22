import {
  defaultModuleSettingsFeedbackMessages,
  moduleSettingsSectionIds,
  type ModuleSettingsMockBase,
} from "@/shared/mocks/settings";
import { getEmpresaDomainById } from "@/shared/mocks/domains";

const empresa = getEmpresaDomainById("emp-recreacao-diversao-total");

export const empresarioSettingsPageMock: ModuleSettingsMockBase = {
  userName: "Marina Costa",
  title: "Configurações",
  description: "Configurações da conta empresarial, permissões e segurança.",
  stats: [
    { title: "Perfis vinculados", value: "03", helper: "Gestores cadastrados" },
    { title: "Notificações ativas", value: "09", helper: "Preferências habilitadas" },
    { title: "Última revisão", value: "Hoje", helper: "Dados institucionais" },
    { title: "Status da conta", value: "Seguro", helper: "Sem pendências críticas" },
  ],
  tabs: [
    { id: "dados-empresa", label: "Dados da empresa", helper: "Informações institucionais" },
    { id: "dados-administrador", label: "Dados do administrador", helper: "Conta principal" },
    { id: "notificacoes", label: "Notificações", helper: "Preferências de alertas" },
    { id: "usuarios", label: "Usuários", helper: "Acessos vinculados" },
    { id: "seguranca", label: "Segurança", helper: "Senha e boas práticas" },
    { id: "conta", label: "Conta", helper: "Logout e exclusão" },
  ],
  defaultTabId: "dados-empresa",
  notificationsTabId: moduleSettingsSectionIds.notificationsTabId,
  usersTabId: moduleSettingsSectionIds.usersTabId,
  securityTabId: moduleSettingsSectionIds.securityTabId,
  accountTabId: moduleSettingsSectionIds.accountTabId,
  notificationPreferences: [
    {
      id: "orcamentos",
      title: "Orçamentos e propostas",
      description: "Receber alerta quando houver nova negociação.",
      enabled: true,
    },
    {
      id: "agenda",
      title: "Mudanças de agenda",
      description: "Avisos sobre alteração de horário e logística.",
      enabled: true,
    },
    {
      id: "equipe",
      title: "Equipe e disponibilidade",
      description: "Atualizações de escala e presença da equipe.",
      enabled: true,
    },
    {
      id: "marketing",
      title: "Campanhas e visibilidade",
      description: "Sugestões de otimização do perfil empresarial.",
      enabled: false,
    },
  ],
  userAccess: [
    {
      id: "usr-1",
      name: "Marina Costa",
      role: "Administradora",
      email: "marina@recrealink.com",
      active: true,
    },
    {
      id: "usr-2",
      name: "Paulo Mendes",
      role: "Coordenador operacional",
      email: "paulo@recrealink.com",
      active: true,
    },
    {
      id: "usr-3",
      name: "Renata Lima",
      role: "Comercial",
      email: "renata@recrealink.com",
      active: false,
    },
  ],
  securityTips: [
    "Utilize uma senha com letras, números e símbolos.",
    "Evite reutilizar senhas de outros sistemas.",
    "Revise os acessos vinculados a cada trimestre.",
  ],
  dataTabs: [
    {
      id: "dados-empresa",
      editable: true,
      options: [
        { label: "Razão social", value: empresa?.legalName ?? "Recreação & Diversão Ltda" },
        { label: "CNPJ", value: empresa?.cnpj ?? "12.345.678/0001-90" },
        { label: "Cidade", value: empresa ? `${empresa.city} - ${empresa.state}` : "São Paulo - SP" },
        { label: "Responsável comercial", value: "Marina Costa" },
      ],
    },
    {
      id: "dados-administrador",
      editable: false,
      restrictedNotice: "Apenas o administrador master pode editar estes campos.",
      options: [
        { label: "Administrador", value: "Marina Costa" },
        { label: "E-mail principal", value: "marina@recrealink.com" },
        { label: "Telefone", value: "(11) 98888-0000" },
      ],
    },
  ],
  feedbackMessages: {
    ...defaultModuleSettingsFeedbackMessages,
    notificationsSaved: "Preferências de notificações atualizadas com sucesso.",
    usersSaved: "Permissões de usuários salvas nesta sessão visual.",
    securitySaved: "Solicitação de segurança registrada com sucesso.",
    dataSaved: "Dados institucionais atualizados na camada visual.",
  },
};

