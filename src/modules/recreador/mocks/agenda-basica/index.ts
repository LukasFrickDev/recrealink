export interface AgendaEventoItem {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  local: string;
  participantes: number;
  status: "confirmado" | "pendente";
}

export const recreadorAgendaBasicaMock = {
  areaLabel: "Recreador",
  userName: "Rafael Santos",
  title: "Agenda básica",
  description: "Organização semanal de compromissos para manter previsibilidade da operação gratuita.",
  stats: [
    { title: "Eventos no mes", value: "08", helper: "2 pendentes de retorno" },
    { title: "Horas planejadas", value: "42h", helper: "Semana atual" },
    { title: "Pessoas atendidas", value: "100", helper: "Estimativa semanal" },
    { title: "Locais", value: "03", helper: "Rotas ativas" },
  ],
  eventos: [
    {
      id: "evento-1",
      titulo: "Recreação infantil · Hotel Seaside",
      data: "20 Jan 2026",
      horario: "09:00 - 17:00",
      local: "Florianópolis, SC",
      participantes: 25,
      status: "confirmado",
    },
    {
      id: "evento-2",
      titulo: "Gincana de verão · Resort Paradise",
      data: "22 Jan 2026",
      horario: "14:00 - 18:00",
      local: "Bombinhas, SC",
      participantes: 40,
      status: "pendente",
    },
    {
      id: "evento-3",
      titulo: "Recreação noturna · Hotel Costa Verde",
      data: "25 Jan 2026",
      horario: "20:00 - 23:00",
      local: "Balneário Camboriú, SC",
      participantes: 35,
      status: "confirmado",
    },
  ] as AgendaEventoItem[],
  semanaVisual: [
    {
      dia: "Seg",
      eventos: ["Briefing de materiais", "Ajuste de roteiro"],
    },
    {
      dia: "Ter",
      eventos: ["Recreação infantil"],
    },
    {
      dia: "Qua",
      eventos: ["Disponível"],
    },
    {
      dia: "Qui",
      eventos: ["Gincana de verão", "Reunião rápida"],
    },
    {
      dia: "Sex",
      eventos: ["Preparacao de kits"],
    },
    {
      dia: "Sab",
      eventos: ["Evento noturno"],
    },
    {
      dia: "Dom",
      eventos: ["Folga"],
    },
  ],
};
