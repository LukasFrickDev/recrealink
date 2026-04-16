import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaComunidadeFeatureMock: HotelariaFeatureMock = {
  featureId: "comunidade",
  menuLabel: "Comunidade",
  title: "Comunidade da hotelaria",
  description: "Feed colaborativo e salas de conversa para troca de boas práticas entre equipes.",
  status: "planned",
  statusLabel: "Planejado",
  statusDetail: "Fluxo pronto para evolução completa, mantendo estrutura de feed e chat em paralelo.",
  stats: [
    { title: "Topicos na semana", value: "17", helper: "Públicações em alta" },
    { title: "Participantes ativos", value: "42", helper: "Gestores e lideres" },
    { title: "Comentarios", value: "96", helper: "Interacao do período" },
    { title: "Salas abertas", value: "5", helper: "Conversas por tema" },
  ],
  checkpoints: [
    "Curar categorias para manter qualidade do feed.",
    "Separar salas por contexto operacional.",
    "Priorizar topicos com impacto direto na escala.",
  ],
  layout: {
    type: "comunidade",
    posts: [
      {
        author: "Carla Menezes",
        location: "Hotel Maresias Resort - SP",
        timeAgo: "2h",
        category: "Programacao",
        content:
          "Testamos uma abertura de noite tropical com briefing em duas etapas e o engajamento subiu 18%.",
        likes: 24,
        comments: 8,
        shares: 5,
      },
      {
        author: "Ricardo Neves",
        location: "Hotel Costa Azul - BA",
        timeAgo: "5h",
        category: "Dica",
        content:
          "Padrão de checklist em cartao fisico ajudou no turno noturno. Posso compartilhar modelo.",
        likes: 19,
        comments: 11,
        shares: 3,
      },
    ],
    rooms: [
      { name: "Geral", members: 38, unread: 3 },
      { name: "Programacoes", members: 21, unread: 1 },
      { name: "Dicas", members: 17, unread: 0 },
      { name: "Parcerias", members: 12, unread: 2 },
    ],
    messages: [
      {
        author: "Carla",
        text: "Alguem já testou grade curta para dia de chuva com público misto?",
        time: "14:02",
        mine: true,
      },
      {
        author: "Ricardo",
        text: "Sim, usamos rodizio em 3 estacoes e funcionou bem para kids e teens.",
        time: "14:05",
        mine: false,
      },
    ],
  },
};
