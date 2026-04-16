import { buildEmpresaUnderConstructionPageMock } from "@/modules/empresa/mocks/shared";

export const empresarioServicosPageMock = buildEmpresaUnderConstructionPageMock({
  title: "Cadastro de Serviços",
  description: "Estrutura base para organização dos pacotes e escopos comerciais da empresa.",
  stats: [
    { title: "Pacotes ativos", value: "12", helper: "Estrutura atual" },
    { title: "Modelos prontos", value: "04", helper: "Base comercial" },
    { title: "Status", value: "Em evolução", helper: "Refino na próxima fase" },
  ],
  subtitle: "Cadastro de serviços em preparação",
  message:
    "A estrutura desta área foi criada para receber o refinamento dos pacotes, preços e escopos na próxima etapa.",
});
