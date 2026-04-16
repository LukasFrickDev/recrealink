import { buildEmpresaUnderConstructionPageMock } from "@/modules/empresa/mocks/shared";

export const empresarioGaleriaPageMock = buildEmpresaUnderConstructionPageMock({
  title: "Galeria da Empresa",
  description: "Estrutura base para organização das fotos, vídeos e registros dos eventos.",
  stats: [
    { title: "Álbuns ativos", value: "07", helper: "Portfólio atual" },
    { title: "Conteúdos recentes", value: "19", helper: "Últimos 30 dias" },
    { title: "Status", value: "Em evolução", helper: "Refino na próxima fase" },
  ],
  subtitle: "Galeria empresarial em preparação",
  message:
    "A estrutura desta área foi criada para receber a curadoria visual e organização final da galeria na próxima etapa.",
});
