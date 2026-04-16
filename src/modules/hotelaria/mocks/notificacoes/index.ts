import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaNotificacoesFeatureMock: HotelariaFeatureMock = {
  featureId: "notifications",
  menuLabel: "Notificações",
  title: "Central de notificações",
  description: "Fila de alertas com prioridade e ação recomendada por origem operacional.",
  status: "planned",
  statusLabel: "Planejado",
  statusDetail: "Estrutura de alertas pronta para consolidar ocorrências, escala e comunicação.",
  stats: [
    { title: "Urgentes", value: "3", helper: "Ação imediata" },
    { title: "Importantes", value: "8", helper: "Acompanhamento diário" },
    { title: "Informativas", value: "14", helper: "Histórico recente" },
    { title: "Resolvidas", value: "64", helper: "Últimos 7 dias" },
  ],
  checkpoints: [
    "Classificar prioridade no momento do disparo.",
    "Vincular alerta a responsável e prazo.",
    "Arquivar automaticamente alertas resolvidos.",
  ],
  layout: {
    type: "notifications",
    items: [
      {
        title: "Cobertura de sábado abaixo da meta",
        source: "Escalas",
        priority: "Urgente",
        time: "Agora",
        action: "Reforçar líder kids para turno da tarde",
      },
      {
        title: "Feedback com nota abaixo de 4.0",
        source: "Feedback",
        priority: "Importante",
        time: "15 min",
        action: "Agendar devolutiva com recreador",
      },
      {
        title: "Novo protocolo publicado",
        source: "Meu hotel",
        priority: "Informativa",
        time: "2h",
        action: "Confirmar leitura no canal de operação",
      },
    ],
  },
};
