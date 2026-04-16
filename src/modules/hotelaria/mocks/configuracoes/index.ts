import {
  buildSettingsNotificationPreferences,
  sharedSettingsSecurityTips,
} from "@/shared/constants/settingsDefaults";
import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";
import { hotelMaresias, hotelMaresiasProfile } from "@/modules/hotelaria/mocks/shared";

export const hotelariaConfiguracoesFeatureMock: HotelariaFeatureMock = {
  featureId: "settings",
  menuLabel: "Configurações",
  title: "Configurações da hotelaria",
  description: "Ajuste dados do hotel, permissões, notificações e segurança do módulo.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Página de configurações unificada com base compartilhada de tabs e conteúdo.",
  stats: [
    { title: "Regras ativas", value: "12", helper: "Políticas publicadas" },
    { title: "Perfis de acesso", value: "4", helper: "Níveis operacionais" },
    { title: "Preferências", value: "18", helper: "Parametrizações ativas" },
    { title: "Ajustes pendentes", value: "5", helper: "Aguardando aprovação" },
  ],
  checkpoints: [
    "Revisar matriz de acesso por cargo.",
    "Padronizar notificações por prioridade.",
    "Publicar política consolidada após aprovação da gestão.",
  ],
  layout: {
    type: "settings",
    notificationPreferences: buildSettingsNotificationPreferences({
      oportunidades: "Avisos de vagas e convites alinhados ao perfil do hotel.",
      mensagens: "Receba alerta quando chegar uma nova conversa da operação.",
      comunidade: "Notificações sobre públicações e interacoes relevantes.",
      "resumo-semanal": "Resumo de desempenho da equipe e das escalas.",
      marketing: "Informativos e novidades da RecreaLink.",
    }),
    userAccess: [
      {
        id: "owner",
        name: "Carla Menezes",
        role: "Administradora",
        email: "carla.menezes@maresiasresort.com.br",
        active: true,
      },
      {
        id: "coordenador",
        name: "Rafael Nogueira",
        role: "Coordenador de recreação",
        email: "rafael.nogueira@maresiasresort.com.br",
        active: true,
      },
    ],
    securityTips: [...sharedSettingsSecurityTips],
    tabs: [
      {
        id: "dados-hotel",
        title: "Dados do hotel",
        helper: "Dados institucionais e operação",
        description: "Dados institucionais do hotel com edição visual habilitada para este módulo.",
        editable: true,
        options: [
          { label: "Nome fantasia", value: hotelMaresias?.name ?? "Hotel Maresias Resort e Spa", helper: "Exibicao pública" },
          { label: "Categoria", value: hotelMaresiasProfile?.categoryLabel ?? "Resort 4 estrelas", helper: "Classificacao operacional" },
          {
            label: "Endereco",
            value: hotelMaresiasProfile?.address ?? "Rua das Palmeiras, 123 - Centro, Maresias - SP",
            helper: "Referencia para equipe e prestadores",
          },
          { label: "Telefone geral", value: hotelMaresiasProfile?.phone ?? "(12) 3865-4321", helper: "Canal principal" },
          { label: "Site", value: hotelMaresiasProfile?.website ?? "www.maresiasresort.com.br", helper: "Página institucional" },
        ],
      },
      {
        id: "dados-administrador",
        title: "Dados do administrador",
        helper: "Responsavel da conta",
        description: "Cadastro principal do contratante responsavel pela operação.",
        editable: false,
        restrictedNotice: "Apenas o administrador da conta pode editar estes dados.",
        options: [
          { label: "Responsavel", value: "Carla Menezes", helper: "Contratante principal" },
          { label: "Email", value: "carla.menezes@maresiasresort.com.br", helper: "Recebe alertas criticos" },
          { label: "Telefone", value: "(12) 99741-8802", helper: "Canal direto" },
          { label: "Cargo", value: "Gerente de lazer e entretenimento", helper: "Aprovador de escalas" },
        ],
      },
      {
        id: "notificacoes",
        title: "Notificações",
        helper: "Alertas e preferências",
        description: "Regras de envio para alertas da operação e atualizações da equipe.",
        editable: true,
        options: [],
      },
      {
        id: "usuarios",
        title: "Usuários",
        helper: "Acesso ao módulo",
        description: "Perfis com acesso ao módulo hotelaria e escopo de permissão.",
        editable: true,
        options: [],
      },
      {
        id: "seguranca",
        title: "Segurança",
        helper: "Autenticação e auditoria",
        description: "Políticas de autenticação, sessão e auditoria do ambiente.",
        editable: true,
        options: [],
      },
    ],
  },
};
