import { hotelariaPayments } from "@/modules/hotelaria/mocks/shared";
import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaRelatoriosFeatureMock: HotelariaFeatureMock = {
  featureId: "relatorios",
  menuLabel: "Relatórios",
  title: "Relatórios e resultados",
  description: "Visão executiva com impacto do período, métricas e histórico de pagamentos.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Componente analitico com seletor de período, tabela financeira e exportacao.",
  stats: [
    { title: "Relatórios emitidos", value: "22", helper: "Último mes" },
    { title: "Horas economizadas", value: "18h", helper: "Ganho operacional" },
    { title: "Taxa de preenchimento", value: "87%", helper: "Funil de vagas" },
    { title: "Pagamentos do ciclo", value: "R$ 3.600", helper: "Resumo financeiro" },
  ],
  checkpoints: [
    "Conferir fontes antes de exportar PDF executivo.",
    "Separar períodos por semana, mes, trimestre e ano.",
    "Evidenciar impacto principal no topo do relatorio.",
  ],
  layout: {
    type: "relatorios",
    periods: ["Esta semana", "Este mes", "Trimestre", "Ano"],
    impact: {
      title: "Economia operacional no período",
      highlight: "18 horas",
      description: "Redução de retrabalho com uso combinado de escalas, chat e indicadores.",
    },
    metrics: [
      { title: "Recreadores contratados", value: "31", helper: "Mes corrente" },
      { title: "Escalas criadas", value: "42", helper: "Cobertura semanal" },
      { title: "Programacoes executadas", value: "26", helper: "Com checklist completo" },
      { title: "Feedback médio", value: "4.7", helper: "Escala de 1 a 5" },
      { title: "Tempo médio de escala", value: "2h20", helper: "Do rascunho ao fechamento" },
      { title: "Vagas preenchidas", value: "87%", helper: "Taxa do funil" },
    ],
    payments: hotelariaPayments,
  },
};
