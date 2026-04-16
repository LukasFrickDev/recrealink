import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaChatFeatureMock: HotelariaFeatureMock = {
  featureId: "chat",
  menuLabel: "Chat",
  title: "Chat da operação",
  description: "Comunicação em tempo real por canal com contagem de não lidas e membros online.",
  status: "planned",
  statusLabel: "Planejado",
  statusDetail: "Tela separada da comunidade, com foco em passagem de turno e tratativas imediatas.",
  stats: [
    { title: "Canais ativos", value: "6", helper: "Frentes de operação" },
    { title: "Não lidas", value: "29", helper: "Pendências atuais" },
    { title: "Tempo de resposta", value: "7 min", helper: "Média de retorno" },
    { title: "Online agora", value: "14", helper: "Equipe conectada" },
  ],
  checkpoints: [
    "Separar canais por frente e prioridade.",
    "Destacar mensagens criticas com SLA de resposta.",
    "Registrar passagem de turno no canal oficial.",
  ],
  layout: {
    type: "chat",
    channels: [
      { name: "Operação geral", members: 26, unread: 5 },
      { name: "Escalas weekend", members: 18, unread: 2 },
      { name: "Programações kids", members: 12, unread: 0 },
      { name: "Ocorrências", members: 9, unread: 1 },
    ],
    onlineCount: 14,
    messages: [
      {
        author: "Coordenacao",
        text: "Confirmar troca do turno da piscina ate 17h.",
        time: "16:20",
        mine: false,
      },
      {
        author: "Carla",
        text: "Troca confirmada com Ana e Marina, escala atualizada.",
        time: "16:24",
        mine: true,
      },
    ],
  },
};
