import { empresaBaseIdentity } from "@/modules/empresa/mocks/shared";
import {
  getCandidaturasDetalhadasByOwnerKind,
  getOportunidadesByOwnerKind,
} from "@/shared/mocks/domains";

const empresaOpportunities = getOportunidadesByOwnerKind("empresa");

const openPositions = empresaOpportunities.map((opportunity) => ({
  title: opportunity.title,
  contract: opportunity.contractLabel,
  location: opportunity.locationLabel,
  date: opportunity.publishedAt,
  compensation: opportunity.compensationLabel,
  applications: opportunity.applicationsLabel,
  status: opportunity.statusLabel === "Ativa" ? "Ativa" : "Triagem",
}));

const applications = getCandidaturasDetalhadasByOwnerKind("empresa").map((application) => ({
  name: application.recreador.fullName,
  targetRole: application.opportunity.title,
  experience: application.recreador.experienceLabel,
  score: application.score.toFixed(1).replace(".", ","),
  highlight: application.highlight,
  status: application.status,
}));

export const empresarioVagasPageMock = {
  ...empresaBaseIdentity,
  title: "Vagas",
  description: "Captação de talentos, análise de candidaturas e organização do funil de contratação.",
  stats: [
    { title: "Vagas abertas", value: String(openPositions.length), helper: "Publicadas no momento" },
    { title: "Candidatos ativos", value: String(applications.length), helper: "Em triagem" },
    {
      title: "Entrevistas",
      value: String(applications.filter((application) => application.status === "Entrevista").length),
      helper: "Semana atual",
    },
    { title: "Contratações", value: "05", helper: "Últimos 30 dias" },
  ],
  openPositions,
  applications,
  hiringStages: [
    {
      title: "Triagem inicial",
      description: "Validação de experiência, disponibilidade e região de atuação.",
    },
    {
      title: "Entrevista prática",
      description: "Simulação de condução de atividade e resolução de imprevistos.",
    },
    {
      title: "Aprovação e onboarding",
      description: "Checklist documental e integração com líder de operação.",
    },
  ],
  recommendations: [
    "Priorizar candidatos com disponibilidade para sábados e domingos.",
    "Manter banco reserva por cidade para cobertura emergencial.",
    "Padronizar feedback para candidatos em até 48 horas.",
  ],
};

