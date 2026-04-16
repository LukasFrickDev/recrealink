import {
  paisCompletedAgendaDomainMock,
  paisUpcomingAgendaDomainMock,
} from "@/shared/mocks/domains/interacoes";

const upcomingEvents = paisUpcomingAgendaDomainMock;

const completedEvents = paisCompletedAgendaDomainMock;

export const paisAgendaMock = {
  userName: "Lúcia Fernandes",
  title: "Agenda da família",
  description:
    "Organize contatos, propostas e eventos com empresas, recreadores e hotéis em um fluxo semanal claro.",
  stats: [
    { title: "Compromissos da semana", value: String(upcomingEvents.length).padStart(2, "0"), helper: "Entre reuniões e retornos" },
    { title: "Propostas em análise", value: "03", helper: "Aguardando validação" },
    {
      title: "Confirmações pendentes",
      value: String(upcomingEvents.filter((event) => event.status === "Pendente").length).padStart(2, "0"),
      helper: "Com prazo de resposta",
    },
    { title: "Eventos concluídos", value: String(completedEvents.length), helper: "Histórico da família" },
  ],
  upcomingEvents,
  weeklyChecklist: [
    "Consolidar os pontos críticos de cada proposta antes da reunião.",
    "Atualizar favoritos após cada proposta recebida.",
    "Registrar o orçamento final por tipo de fornecedor para comparação justa.",
    "Definir data limite para decisão sem perder disponibilidade.",
  ],
  completedEvents,
};
