import { buildEmpresaUnderConstructionPageMock } from "@/modules/empresa/mocks/shared";

export const empresarioDepoimentosPageMock = buildEmpresaUnderConstructionPageMock({
  title: "Depoimentos dos Pais",
  description: "Estrutura base para gestão de avaliações, provas sociais e reputação da empresa.",
  stats: [
    { title: "Avaliações válidas", value: "47", helper: "Base atual" },
    { title: "Nota média", value: "4,8", helper: "Últimos 90 dias" },
    { title: "Status", value: "Em evolução", helper: "Refino na próxima fase" },
  ],
  subtitle: "Depoimentos em preparação",
  message:
    "A estrutura desta área foi criada para receber moderação, filtros e organização final dos depoimentos na próxima etapa.",
});
