import { buildEmpresaUnderConstructionPageMock } from "@/modules/empresa/mocks/shared";

export const empresarioFinancasPageMock = buildEmpresaUnderConstructionPageMock({
  title: "Finanças e Pagamentos",
  description: "Estrutura base para controle financeiro, repasses e visão de custos da operação.",
  stats: [
    { title: "Receita mensal", value: "R$ 24.500", helper: "Base atual" },
    { title: "Despesas previstas", value: "R$ 9.800", helper: "Mês corrente" },
    { title: "Status", value: "Em evolução", helper: "Refino na próxima fase" },
  ],
  subtitle: "Financeiro empresarial em preparação",
  message:
    "A estrutura desta área foi criada para receber dashboards de caixa, repasses e conciliação financeira na próxima etapa.",
});
