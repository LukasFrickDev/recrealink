import { hotelariaFeedbackEntries } from "@/modules/hotelaria/mocks/shared";
import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaFeedbackFeatureMock: HotelariaFeatureMock = {
  featureId: "feedback-recreadores",
  menuLabel: "Feedback",
  title: "Feedback de recreadores",
  description: "Avaliações individuais com classificacao por tipo, estrelas e observacoes.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Componente focado em registro rápido, filtro por tipo e histórico por profissional.",
  stats: [
    { title: "Feedbacks no mês", value: "48", helper: "Registros concluidos" },
    { title: "Nota média", value: "4.7", helper: "Escala de 1 a 5" },
    { title: "Positivos", value: "92%", helper: "Performance geral" },
    { title: "Planos de ação", value: "6", helper: "Acompanhamentos abertos" },
  ],
  checkpoints: [
    "Registrar data da atividade junto com a avaliação.",
    "Relacionar comentarios a evidencias da entrega.",
    "Criar plano de ação quando nota ficar abaixo de 4.0.",
  ],
  layout: {
    type: "feedback-recreadores",
    entries: hotelariaFeedbackEntries,
  },
};
