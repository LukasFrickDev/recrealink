import { empresaBaseIdentity } from "@/modules/empresa/mocks/shared";

export const empresarioAgendaPageMock = {
  ...empresaBaseIdentity,
  title: "Agenda de Eventos",
  description: "Programação operacional com marcos do dia, entregas da semana e checkpoints de execução.",
  stats: [
    { title: "Eventos na semana", value: "06", helper: "3 confirmados e 3 em preparação" },
    { title: "Reuniões internas", value: "04", helper: "Planejamento e alinhamento" },
    { title: "Checklists ativos", value: "12", helper: "Pré, durante e pós-evento" },
    { title: "Pontualidade", value: "98%", helper: "Média dos últimos eventos" },
  ],
  todayFocus: {
    dateLabel: "Quinta-feira, 13 de abril",
    title: "Operação Festival Kids",
    description: "Dia dedicado a briefing de equipe, validação de materiais e confirmação logística.",
  },
  dailyTimeline: [
    {
      time: "09:00",
      title: "Briefing da equipe",
      detail: "Condomínio Bela Vista - alinhamento final de roteiro",
      status: "Concluído",
    },
    {
      time: "11:30",
      title: "Validação de materiais",
      detail: "Kit lúdico e sonorização revisados",
      status: "Em andamento",
    },
    {
      time: "15:00",
      title: "Follow-up com cliente",
      detail: "Ajuste final de horários e pontos de apoio",
      status: "Próximo",
    },
  ],
  weeklyAgenda: [
    {
      day: "Sábado",
      event: "Festival Kids",
      location: "Condomínio Bela Vista",
      team: "5 recreadores + 1 líder",
      status: "Confirmado",
    },
    {
      day: "Domingo",
      event: "Colônia de férias",
      location: "Clube Girassol",
      team: "4 recreadores + 1 apoio",
      status: "Em preparação",
    },
    {
      day: "Terça",
      event: "Integração corporativa",
      location: "Empresa Neon",
      team: "3 recreadores + 1 facilitador",
      status: "Planejado",
    },
  ],
  activeChecklists: [
    {
      title: "Pré-evento",
      owner: "Camila Pires",
      progress: "8 de 10 itens",
    },
    {
      title: "Durante a execução",
      owner: "Paulo Mendes",
      progress: "Checklist pronto",
    },
    {
      title: "Pós-evento",
      owner: "Júlia Prado",
      progress: "Template revisado",
    },
  ],
  communicationAlerts: [
    "Confirmar presença da equipe reserva até 18:00.",
    "Enviar cronograma final ao cliente até 17:30.",
    "Revisar contato de emergência dos líderes de campo.",
  ],
};

