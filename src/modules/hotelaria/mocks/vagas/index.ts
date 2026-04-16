import { hotelariaVacancies } from "@/modules/hotelaria/mocks/shared";
import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaVagasFeatureMock: HotelariaFeatureMock = {
  featureId: "vagas",
  menuLabel: "Vagas",
  title: "Vagas da hotelaria",
  description: "Gestao de oportunidades com funil de candidatos e distribuicao por função.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Página de vagas com resumo, filtros de status e cards com breakdown de posições.",
  stats: [
    { title: "Vagas abertas", value: "8", helper: "Capitacao atual" },
    { title: "Em análise", value: "5", helper: "Triagem ativa" },
    { title: "Candidatos", value: "62", helper: "Banco em avaliação" },
    { title: "Contratadas", value: "11", helper: "Últimos 30 dias" },
  ],
  checkpoints: [
    "Revisar descrição da vaga antes da públicação.",
    "Acompanhar status de candidatos por etapa do funil.",
    "Garantir clareza em salario, período e perfil tecnico.",
  ],
  layout: {
    type: "vagas",
    summary: [
      { title: "Abertas", value: "8", helper: "Publicadas e visiveis" },
      { title: "Em análise", value: "5", helper: "Com shortlist pronta" },
      { title: "Total de candidatos", value: "62", helper: "Fila atual" },
      { title: "Fechadas no período", value: "11", helper: "Último mes" },
    ],
    statusFilters: ["Aberta", "Em análise", "Preenchida", "Encerrada"],
    vacancies: hotelariaVacancies,
  },
};
