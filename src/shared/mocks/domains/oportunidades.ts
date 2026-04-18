import { recreadoresDomainById } from "@/shared/mocks/domains/recreadores";

export type OpportunityOwnerKind = "empresa" | "hotel";

export interface OportunidadeDomainEntity {
  id: string;
  ownerKind: OpportunityOwnerKind;
  ownerId: string;
  title: string;
  locationLabel: string;
  contractLabel: string;
  periodLabel: string;
  compensationLabel: string;
  statusLabel: string;
  urgencyLabel?: "normal" | "urgente";
  openings?: number;
  tags?: string[];
  applicationsLabel: string;
  publishedAt: string;
}

export interface ConviteDomainEntity {
  id: string;
  hotelId: string;
  eventDateLabel: string;
  inviteDateLabel: string;
  proposedValueLabel: string;
  responseDeadlineLabel: string;
  notes: string;
}

export interface CandidaturaDomainEntity {
  id: string;
  opportunityId: string;
  recreadorId: string;
  status: "Aprovado" | "Entrevista" | "Triagem";
  score: number;
  highlight: string;
}

export interface CandidaturaDetalhadaDomainEntity {
  id: string;
  status: CandidaturaDomainEntity["status"];
  score: number;
  highlight: string;
  opportunity: OportunidadeDomainEntity;
  recreador: {
    id: string;
    fullName: string;
    experienceLabel: string;
  };
}

export const oportunidadesDomainMock: OportunidadeDomainEntity[] = [
  {
    id: "opp-hotel-vista-mar-julho",
    ownerKind: "hotel",
    ownerId: "hotel-pousada-vista-mar",
    title: "Recreador para fim de semana",
    locationLabel: "Santos - SP",
    contractLabel: "Freelancer",
    periodLabel: "12 a 14 de julho",
    compensationLabel: "R$ 320 / diaria",
    statusLabel: "Ativa",
    urgencyLabel: "urgente",
    openings: 2,
    tags: ["Infantil", "Piscina"],
    applicationsLabel: "12 candidaturas",
    publishedAt: "Publicado em 02 Jul",
  },
  {
    id: "opp-hotel-costa-verde-julho",
    ownerKind: "hotel",
    ownerId: "hotel-resort-costa-verde",
    title: "Equipe de recreação para temporada",
    locationLabel: "Guarujá - SP",
    contractLabel: "Temporada",
    periodLabel: "18 a 20 de julho",
    compensationLabel: "R$ 380 / diária",
    statusLabel: "Ativa",
    urgencyLabel: "normal",
    openings: 3,
    tags: ["Famílias", "Esportes"],
    applicationsLabel: "8 candidaturas",
    publishedAt: "Publicado em 03 Jul",
  },
  {
    id: "opp-empresa-festa-infantil",
    ownerKind: "empresa",
    ownerId: "emp-recreacao-diversao-total",
    title: "Recreador para festa infantil premium",
    locationLabel: "São Paulo - SP",
    contractLabel: "Freelance",
    periodLabel: "Sexta e sábado",
    compensationLabel: "R$ 320 por evento",
    statusLabel: "Ativa",
    applicationsLabel: "14 candidaturas recebidas",
    publishedAt: "Publicada em 02/03",
  },
  {
    id: "opp-empresa-evento-corporativo",
    ownerKind: "empresa",
    ownerId: "emp-recreacao-diversao-total",
    title: "Monitor para evento corporativo familiar",
    locationLabel: "Campinas - SP",
    contractLabel: "Temporário",
    periodLabel: "Quinta a domingo",
    compensationLabel: "R$ 2.100 pacote",
    statusLabel: "Triagem",
    applicationsLabel: "8 perfis priorizados",
    publishedAt: "Publicada em 27/02",
  },
  {
    id: "opp-empresa-lider-fim-semana",
    ownerKind: "empresa",
    ownerId: "emp-recreacao-diversao-total",
    title: "Lider de recreação para fins de semana",
    locationLabel: "Santos - SP",
    contractLabel: "PJ",
    periodLabel: "Escala fixa mensal",
    compensationLabel: "R$ 3.400 mensal",
    statusLabel: "Ativa",
    applicationsLabel: "21 candidaturas recebidas",
    publishedAt: "Publicada em 20/02",
  },
  {
    id: "opp-hotelaria-lider-weekend",
    ownerKind: "hotel",
    ownerId: "hotel-maresias-resort-spa",
    title: "Lider recreativo fim de semana",
    locationLabel: "São Sebastiao - SP",
    contractLabel: "Freelancer",
    periodLabel: "Sabado e domingo",
    compensationLabel: "R$ 420 / diaria",
    statusLabel: "Ativa",
    applicationsLabel: "6 candidaturas",
    publishedAt: "Atualizada em 05 Mar",
  },
  {
    id: "opp-hotelaria-temporada-natal",
    ownerKind: "hotel",
    ownerId: "hotel-maresias-resort-spa",
    title: "Equipe para temporada de Natal",
    locationLabel: "São Sebastião - SP",
    contractLabel: "Temporada",
    periodLabel: "20 dez a 10 jan",
    compensationLabel: "R$ 8.000 pacote",
    statusLabel: "Triagem",
    applicationsLabel: "18 candidaturas",
    publishedAt: "Atualizada em 01 Mar",
  },
];

export const convitesDomainMock: ConviteDomainEntity[] = [
  {
    id: "convite-hotel-atlantico-1",
    hotelId: "hotel-atlantico",
    eventDateLabel: "22 jul 2026",
    inviteDateLabel: "08 jul 2026",
    proposedValueLabel: "R$ 360 / diária",
    responseDeadlineLabel: "3 dias",
    notes: "Evento temático para famílias com foco em atividades de integração.",
  },
  {
    id: "convite-hotel-encanto-1",
    hotelId: "hotel-encanto-family",
    eventDateLabel: "29 jul 2026",
    inviteDateLabel: "10 jul 2026",
    proposedValueLabel: "R$ 410 / diária",
    responseDeadlineLabel: "5 dias",
    notes: "Operação em final de semana com oficina criativa e gincanas em equipe.",
  },
];

export const candidaturasDomainMock: CandidaturaDomainEntity[] = [
  {
    id: "cand-fernanda-lopes-1",
    opportunityId: "opp-empresa-festa-infantil",
    recreadorId: "rec-fernanda-lopes",
    status: "Entrevista",
    score: 4.7,
    highlight: "Experiência com festas premium e excelente avaliação em dinâmicas infantis.",
  },
  {
    id: "cand-rafael-matos-1",
    opportunityId: "opp-empresa-evento-corporativo",
    recreadorId: "rec-rafael-matos",
    status: "Triagem",
    score: 4.3,
    highlight: "Perfil forte em coordenação de equipe e operação de eventos de médio porte.",
  },
  {
    id: "cand-bianca-souza-1",
    opportunityId: "opp-empresa-lider-fim-semana",
    recreadorId: "rec-bianca-souza",
    status: "Aprovado",
    score: 4.9,
    highlight: "Alta aderência ao perfil da vaga e feedbacks consistentes em atendimento familiar.",
  },
];

export const getOportunidadesByOwner = (ownerKind: OpportunityOwnerKind, ownerId: string) =>
  oportunidadesDomainMock.filter(
    (opportunity) => opportunity.ownerKind === ownerKind && opportunity.ownerId === ownerId,
  );

export const getOportunidadesByOwnerKind = (ownerKind: OpportunityOwnerKind) =>
  oportunidadesDomainMock.filter((opportunity) => opportunity.ownerKind === ownerKind);

export const getCandidaturasDetalhadasByOwnerKind = (
  ownerKind: OpportunityOwnerKind,
): CandidaturaDetalhadaDomainEntity[] => {
  const opportunitiesById = Object.fromEntries(
    oportunidadesDomainMock
      .filter((opportunity) => opportunity.ownerKind === ownerKind)
      .map((opportunity) => [opportunity.id, opportunity]),
  ) as Record<string, OportunidadeDomainEntity>;

  return candidaturasDomainMock
    .map((application) => {
      const opportunity = opportunitiesById[application.opportunityId];
      const recreador = recreadoresDomainById[application.recreadorId];

      if (!opportunity || !recreador) {
        return null;
      }

      return {
        id: application.id,
        status: application.status,
        score: application.score,
        highlight: application.highlight,
        opportunity,
        recreador: {
          id: recreador.id,
          fullName: recreador.fullName,
          experienceLabel: recreador.experienceLabel,
        },
      };
    })
    .filter((application): application is CandidaturaDetalhadaDomainEntity => Boolean(application));
};
