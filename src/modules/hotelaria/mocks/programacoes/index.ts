import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaProgramacoesFeatureMock: HotelariaFeatureMock = {
  featureId: "programacoes",
  menuLabel: "Programações",
  title: "Programações do hotel",
  description: "Planejamento de atividades com abas para templates, sugestoes e calendario.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Composicao em quatro abas para diferenciar criacao, reaproveitamento e agenda.",
  stats: [
    { title: "Programações criadas", value: "19", helper: "Mês atual" },
    { title: "Horas planejadas", value: "124h", helper: "Volume mensal" },
    { title: "Participantes medios", value: "53", helper: "Por atividade" },
    { title: "Templates em uso", value: "8", helper: "Base recorrente" },
  ],
  checkpoints: [
    "Validar materiais antes de publicar a agenda.",
    "Usar templates para dias de alta ocupacao.",
    "Registrar plano B para atividades externas.",
  ],
  layout: {
    type: "programacoes",
    summary: [
      { title: "Criadas no mês", value: "19", helper: "Fluxo regular" },
      { title: "Horas programadas", value: "124h", helper: "Carga total" },
      { title: "Participantes", value: "53", helper: "Média por ação" },
      { title: "Templates", value: "8", helper: "Modelos prontos" },
    ],
    plans: [
      {
        name: "Noite tropical",
        date: "06/12/2026",
        duration: "2h30",
        participants: "Teens e adultos",
      },
      {
        name: "Circuito kids aquatico",
        date: "07/12/2026",
        duration: "1h45",
        participants: "Kids 5-10 anos",
      },
      {
        name: "Oficina família criativa",
        date: "08/12/2026",
        duration: "1h20",
        participants: "Famílias",
      },
    ],
    templates: [
      {
        title: "Template alta temporada",
        description: "Fluxo completo para dias de lotacao maxima.",
        audience: "Famílias e teens",
      },
      {
        title: "Template fim de semana chuvoso",
        description: "Plano indoor com rodizio de oficinas e jogos.",
        audience: "Kids e children",
      },
      {
        title: "Template evento corporativo",
        description: "Atividades de integracao para grupos fechados.",
        audience: "Adulto corporativo",
      },
    ],
    suggestions: [
      {
        title: "Show interativo de talentos",
        reason: "Alta taxa de engajamento no último trimestre.",
        recommendedSlot: "20h - 21h30",
      },
      {
        title: "Desafio em estacoes",
        reason: "Bom desempenho em dias com público misto.",
        recommendedSlot: "16h - 17h",
      },
      {
        title: "Oficina rápida de memoria",
        reason: "Indicada para grupos infantis em ambiente interno.",
        recommendedSlot: "10h30 - 11h15",
      },
    ],
    calendarEvents: [
      { day: "06", label: "Noite tropical", period: "Noite" },
      { day: "07", label: "Circuito kids aquatico", period: "Tarde" },
      { day: "08", label: "Oficina família criativa", period: "Manha" },
      { day: "14", label: "Festa teens glow", period: "Noite" },
    ],
  },
};
