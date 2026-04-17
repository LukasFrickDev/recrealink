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
    "Central dedicada para decidir convites recebidos, com separacao clara em pendentes, aceitos e recusados.",
  stats: [
    { title: "Pendentes", value: "1", helper: "Aguardando decisao" },
    { title: "Aceitos", value: "1", helper: "Com compromisso previsto" },
    { title: "Recusados", value: "1", helper: "Historico de decisao" },
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
      helper: "Decisao registrada para manter historico operacional do recreador.",
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
      compensationLabel: "R$ 460 por diaria",
      inviteDateLabel: "17 Abr 2026",
      responseDeadlineLabel: "Ate 19 Abr 2026",
      relationshipLabel: "Derivado de candidatura enviada",
      status: "pendente",
      statusReason: "Aguardando validacao de agenda antes do aceite.",
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
      originSummary: "Programacao de fim de semana com volume alto de familias.",
      roleLabel: "Recreador programacao noturna",
      cityLabel: "Sao Paulo - SP",
      periodLabel: "18 Mai a 22 Mai 2026",
      compensationLabel: "R$ 590 por diaria",
      inviteDateLabel: "12 Abr 2026",
      responseDeadlineLabel: "Ate 14 Abr 2026",
      relationshipLabel: "Derivado de candidatura enviada",
      status: "aceito",
      statusReason: "Aceite registrado e aguardando amarracao final de cronograma.",
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
      originSummary: "Feira educacional com atividades em multiplas estacoes.",
      roleLabel: "Recreador estacao ludica",
      cityLabel: "Rio de Janeiro - RJ",
      periodLabel: "20 Abr 2026",
      compensationLabel: "R$ 380 turno",
      inviteDateLabel: "11 Abr 2026",
      responseDeadlineLabel: "Ate 12 Abr 2026",
      relationshipLabel: "Convite direto sem triagem adicional",
      status: "recusado",
      statusReason: "Conflito com agenda ja reservada para periodo.",
      timeline: [
        { id: "invite-003-t1", label: "Convite recebido", dateLabel: "11 Abr 2026" },
        { id: "invite-003-t2", label: "Convite recusado", dateLabel: "12 Abr 2026" },
      ],
    },
  ] as ConviteItem[],
} as const;
