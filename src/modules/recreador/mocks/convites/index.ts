import type { OpportunityOriginKind } from "@/modules/recreador/mocks/oportunidades";

export type ConviteStatus = "pendente" | "aceito" | "recusado";

export interface ConviteTimelineEvent {
  id: string;
  label: string;
  dateLabel: string;
}

export interface ConviteItem {
  id: string;
  opportunityId: string;
  opportunityCode: string;
  originKind: OpportunityOriginKind;
  originName: string;
  originSummary: string;
  roleLabel: string;
  cityLabel: string;
  periodLabel: string;
  compensationLabel: string;
  inviteDateLabel: string;
  responseDeadlineLabel: string;
  relationshipLabel: string;
  status: ConviteStatus;
  statusReason: string;
  commitmentPreview?: string;
  timeline: ConviteTimelineEvent[];
}

export const recreadorConvitesMock = {
  title: "Convites",
  description:
    "Central dedicada para decidir convites recebidos, com separação clara entre pendentes, aceitos e recusados.",
  stats: [
    { title: "Pendentes", value: "1", helper: "Aguardando decisão" },
    { title: "Aceitos", value: "1", helper: "Com compromisso previsto" },
    { title: "Recusados", value: "1", helper: "Histórico da decisão" },
  ],
  statusLegend: [
    {
      id: "pendente",
      title: "Pendente",
      helper: "Convite recebido e aguardando aceite ou recusa.",
    },
    {
      id: "aceito",
      title: "Aceito",
      helper: "Convite convertido para compromisso futuro, pronto para integrar disponibilidade.",
    },
    {
      id: "recusado",
      title: "Recusado",
      helper: "Decisão registrada para manter o histórico operacional do recreador.",
    },
  ],
  items: [
    {
      id: "invite-001",
      opportunityId: "opp-htl-002",
      opportunityCode: "HTL-002",
      originKind: "hotelaria",
      originName: "Hotel Montanhas Verdes",
      originSummary: "Temporada de inverno com foco em atividades ao ar livre.",
      roleLabel: "Recreador atividades externas",
      cityLabel: "Rio de Janeiro - RJ",
      periodLabel: "05 Mai a 08 Mai 2026",
      compensationLabel: "R$ 460 por diária",
      inviteDateLabel: "17 Abr 2026",
      responseDeadlineLabel: "Até 19 Abr 2026",
      relationshipLabel: "Derivado de candidatura enviada",
      status: "pendente",
      statusReason: "Aguardando validação da agenda antes do aceite.",
      timeline: [
        { id: "invite-001-t1", label: "Candidatura enviada", dateLabel: "15 Abr 2026" },
        { id: "invite-001-t2", label: "Convite recebido", dateLabel: "17 Abr 2026" },
      ],
    },
    {
      id: "invite-002",
      opportunityId: "opp-htl-003",
      opportunityCode: "HTL-003",
      originKind: "hotelaria",
      originName: "Resort Costa Azul",
      originSummary: "Programação de fim de semana com alto volume de famílias.",
      roleLabel: "Recreador de programação noturna",
      cityLabel: "São Paulo - SP",
      periodLabel: "18 Mai a 22 Mai 2026",
      compensationLabel: "R$ 590 por diária",
      inviteDateLabel: "12 Abr 2026",
      responseDeadlineLabel: "Até 14 Abr 2026",
      relationshipLabel: "Derivado de candidatura enviada",
      status: "aceito",
      statusReason: "Aceite registrado e aguardando amarração final do cronograma.",
      commitmentPreview: "Compromisso futuro previsto para semana de 18 Mai.",
      timeline: [
        { id: "invite-002-t1", label: "Candidatura enviada", dateLabel: "10 Abr 2026" },
        { id: "invite-002-t2", label: "Convite recebido", dateLabel: "12 Abr 2026" },
        { id: "invite-002-t3", label: "Convite aceito", dateLabel: "13 Abr 2026" },
      ],
    },
    {
      id: "invite-003",
      opportunityId: "opp-evt-003",
      opportunityCode: "EVT-003",
      originKind: "eventos",
      originName: "Studio Playground",
      originSummary: "Feira educacional com atividades em múltiplas estações.",
      roleLabel: "Recreador de estação lúdica",
      cityLabel: "Rio de Janeiro - RJ",
      periodLabel: "20 Abr 2026",
      compensationLabel: "R$ 380 por turno",
      inviteDateLabel: "11 Abr 2026",
      responseDeadlineLabel: "Até 12 Abr 2026",
      relationshipLabel: "Convite direto sem triagem adicional",
      status: "recusado",
      statusReason: "Conflito com agenda já reservada para o período.",
      timeline: [
        { id: "invite-003-t1", label: "Convite recebido", dateLabel: "11 Abr 2026" },
        { id: "invite-003-t2", label: "Convite recusado", dateLabel: "12 Abr 2026" },
      ],
    },
  ] as ConviteItem[],
} as const;
