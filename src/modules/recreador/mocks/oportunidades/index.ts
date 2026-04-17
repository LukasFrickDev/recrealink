export type OpportunityOriginKind = "hotelaria" | "eventos";

export type OpportunityCityFilter = "todos" | "sp" | "rj" | "sc";

export type OpportunityTypeFilter =
  | "todos"
  | "resort"
  | "hotel"
  | "evento-corporativo"
  | "evento-social";

export type OpportunityDateFilter =
  | "todos"
  | "esta-semana"
  | "proximos-15-dias"
  | "proximo-mes";

export type OpportunityApplicationStatus = "disponivel" | "candidatura-enviada";

export type OpportunityInviteStatus =
  | "nenhum"
  | "convite-recebido"
  | "convite-aceito"
  | "convite-recusado";

export type OpportunityLifecycleStatus = "aberta" | "encerrada" | "confirmada";

export interface OpportunityFilterOption<TValue extends string> {
  id: TValue;
  label: string;
}

export interface OpportunityJourneyLegendItem {
  id: string;
  title: string;
  helper: string;
}

export interface RecreadorOpportunityItem {
  id: string;
  code: string;
  originKind: OpportunityOriginKind;
  originName: string;
  originSummary: string;
  roleLabel: string;
  cityCode: Exclude<OpportunityCityFilter, "todos">;
  cityLabel: string;
  type: Exclude<OpportunityTypeFilter, "todos">;
  dateWindow: Exclude<OpportunityDateFilter, "todos">;
  periodLabel: string;
  startDateLabel: string;
  compensationLabel: string;
  applicationStatus: OpportunityApplicationStatus;
  inviteStatus: OpportunityInviteStatus;
  lifecycleStatus: OpportunityLifecycleStatus;
  relatedInviteId?: string;
  commitmentLabel?: string;
}

export const recreadorOportunidadesMock = {
  title: "Oportunidades",
  description:
    "Central de vagas do recreador com oportunidades de hotelaria e eventos, sem misturar gestao de convites.",
  stats: [
    { title: "Oportunidades abertas", value: "7", helper: "Janela atual" },
    { title: "Candidaturas enviadas", value: "3", helper: "Aguardando retorno" },
    { title: "Itens confirmados", value: "1", helper: "Compromisso futuro" },
  ],
  filters: {
    cities: [
      { id: "todos", label: "Todas as cidades" },
      { id: "sp", label: "Sao Paulo" },
      { id: "rj", label: "Rio de Janeiro" },
      { id: "sc", label: "Santa Catarina" },
    ] as OpportunityFilterOption<OpportunityCityFilter>[],
    types: [
      { id: "todos", label: "Todos os tipos" },
      { id: "resort", label: "Resort" },
      { id: "hotel", label: "Hotel" },
      { id: "evento-corporativo", label: "Evento corporativo" },
      { id: "evento-social", label: "Evento social" },
    ] as OpportunityFilterOption<OpportunityTypeFilter>[],
    dates: [
      { id: "todos", label: "Qualquer data" },
      { id: "esta-semana", label: "Esta semana" },
      { id: "proximos-15-dias", label: "Proximos 15 dias" },
      { id: "proximo-mes", label: "Proximo mes" },
    ] as OpportunityFilterOption<OpportunityDateFilter>[],
    origins: [
      { id: "todos", label: "Todas as origens" },
      { id: "hotelaria", label: "Hotelaria" },
      { id: "eventos", label: "Eventos" },
    ] as OpportunityFilterOption<"todos" | OpportunityOriginKind>[],
  },
  journeyLegend: [
    {
      id: "candidatura-enviada",
      title: "Candidatura enviada",
      helper: "Oportunidade segue visivel ate evolucao para convite ou encerramento.",
    },
    {
      id: "convite-recebido",
      title: "Convite recebido",
      helper: "A decisao de aceitar ou recusar acontece somente em Convites.",
    },
    {
      id: "confirmada",
      title: "Confirmada",
      helper: "Item convertido em compromisso futuro para integrar disponibilidade na proxima fase.",
    },
  ] as OpportunityJourneyLegendItem[],
  items: [
    {
      id: "opp-htl-001",
      code: "HTL-001",
      originKind: "hotelaria",
      originName: "Resort Brisa Azul",
      originSummary: "Operacao de lazer infantil em pacote de feriado.",
      roleLabel: "Recreador lider de turno",
      cityCode: "sp",
      cityLabel: "Sao Paulo - SP",
      type: "resort",
      dateWindow: "esta-semana",
      periodLabel: "22 Abr a 25 Abr 2026",
      startDateLabel: "Inicio em 22 Abr",
      compensationLabel: "R$ 540 por diaria",
      applicationStatus: "disponivel",
      inviteStatus: "nenhum",
      lifecycleStatus: "aberta",
    },
    {
      id: "opp-evt-001",
      code: "EVT-001",
      originKind: "eventos",
      originName: "Conecta Eventos",
      originSummary: "Programacao de entretenimento para evento corporativo familiar.",
      roleLabel: "Recreador dinamicas interativas",
      cityCode: "sp",
      cityLabel: "Sao Paulo - SP",
      type: "evento-corporativo",
      dateWindow: "proximos-15-dias",
      periodLabel: "30 Abr a 02 Mai 2026",
      startDateLabel: "Inicio em 30 Abr",
      compensationLabel: "R$ 1.680 pacote",
      applicationStatus: "candidatura-enviada",
      inviteStatus: "nenhum",
      lifecycleStatus: "aberta",
    },
    {
      id: "opp-htl-002",
      code: "HTL-002",
      originKind: "hotelaria",
      originName: "Hotel Montanhas Verdes",
      originSummary: "Temporada de inverno com foco em atividades ao ar livre.",
      roleLabel: "Recreador atividades externas",
      cityCode: "rj",
      cityLabel: "Rio de Janeiro - RJ",
      type: "hotel",
      dateWindow: "proximos-15-dias",
      periodLabel: "05 Mai a 08 Mai 2026",
      startDateLabel: "Inicio em 05 Mai",
      compensationLabel: "R$ 460 por diaria",
      applicationStatus: "candidatura-enviada",
      inviteStatus: "convite-recebido",
      lifecycleStatus: "aberta",
      relatedInviteId: "invite-001",
    },
    {
      id: "opp-evt-002",
      code: "EVT-002",
      originKind: "eventos",
      originName: "Viva Experience",
      originSummary: "Evento social com trilha criativa para familias.",
      roleLabel: "Recreador oficinas criativas",
      cityCode: "sc",
      cityLabel: "Florianopolis - SC",
      type: "evento-social",
      dateWindow: "proximo-mes",
      periodLabel: "14 Mai a 15 Mai 2026",
      startDateLabel: "Inicio em 14 Mai",
      compensationLabel: "R$ 1.200 pacote",
      applicationStatus: "disponivel",
      inviteStatus: "nenhum",
      lifecycleStatus: "aberta",
    },
    {
      id: "opp-evt-003",
      code: "EVT-003",
      originKind: "eventos",
      originName: "Studio Playground",
      originSummary: "Feira educacional com atividades em multiplas estacoes.",
      roleLabel: "Recreador estacao ludica",
      cityCode: "rj",
      cityLabel: "Rio de Janeiro - RJ",
      type: "evento-social",
      dateWindow: "esta-semana",
      periodLabel: "20 Abr 2026",
      startDateLabel: "Inicio em 20 Abr",
      compensationLabel: "R$ 380 turno",
      applicationStatus: "candidatura-enviada",
      inviteStatus: "convite-recusado",
      lifecycleStatus: "encerrada",
      relatedInviteId: "invite-003",
    },
    {
      id: "opp-htl-003",
      code: "HTL-003",
      originKind: "hotelaria",
      originName: "Resort Costa Azul",
      originSummary: "Programacao de fim de semana com volume alto de familias.",
      roleLabel: "Recreador programacao noturna",
      cityCode: "sp",
      cityLabel: "Sao Paulo - SP",
      type: "resort",
      dateWindow: "proximo-mes",
      periodLabel: "18 Mai a 22 Mai 2026",
      startDateLabel: "Inicio em 18 Mai",
      compensationLabel: "R$ 590 por diaria",
      applicationStatus: "candidatura-enviada",
      inviteStatus: "convite-aceito",
      lifecycleStatus: "confirmada",
      relatedInviteId: "invite-002",
      commitmentLabel: "Compromisso previsto para semana de 18 Mai",
    },
    {
      id: "opp-htl-004",
      code: "HTL-004",
      originKind: "hotelaria",
      originName: "Pousada Vale Encantado",
      originSummary: "Operacao compacta para grupos infantis reduzidos.",
      roleLabel: "Recreador apoio geral",
      cityCode: "sc",
      cityLabel: "Balneario Camboriu - SC",
      type: "hotel",
      dateWindow: "proximos-15-dias",
      periodLabel: "03 Mai a 04 Mai 2026",
      startDateLabel: "Inicio em 03 Mai",
      compensationLabel: "R$ 430 por diaria",
      applicationStatus: "disponivel",
      inviteStatus: "nenhum",
      lifecycleStatus: "aberta",
    },
  ] as RecreadorOpportunityItem[],
} as const;
