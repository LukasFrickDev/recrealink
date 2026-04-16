import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaIndicadoresFeatureMock: HotelariaFeatureMock = {
  featureId: "indicadores",
  menuLabel: "Indicadores",
  title: "Indicadores da operação",
  description: "Painel de performance com períodos, tendencias e watchlist operacional.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Estrutura focada em leitura executiva: KPI, tendencia e responsavel por frente.",
  stats: [
    { title: "KPIs monitorados", value: "12", helper: "Painel principal" },
    { title: "Metas atingidas", value: "9", helper: "Ciclo atual" },
    { title: "Satisfacao geral", value: "98%", helper: "Feedback de hospedes" },
    { title: "Efetividade", value: "94%", helper: "Execucao de programacoes" },
  ],
  checkpoints: [
    "Atualizar indicadores no mesmo horario todos os dias.",
    "Sinalizar tendencia negativa acima de 5% no período.",
    "Definir responsavel para cada KPI em risco.",
  ],
  layout: {
    type: "indicadores",
    periods: ["Esta semana", "Este mes", "Trimestre", "Ano"],
    kpis: [
      {
        title: "Cobertura de escalas",
        value: "96%",
        trend: "+4% versus semana anterior",
        tone: "success",
      },
      {
        title: "SLA de resposta no chat",
        value: "7 min",
        trend: "Dentro da meta de 10 min",
        tone: "brand",
      },
      {
        title: "Atividades no horario",
        value: "89%",
        trend: "-3% em relacao ao último ciclo",
        tone: "warning",
      },
      {
        title: "Incidentes criticos",
        value: "1",
        trend: "Redução após revisão de protocolo",
        tone: "danger",
      },
    ],
    watchlist: [
      {
        title: "Briefing de teens",
        detail: "Oscilacao de pontualidade no turno noturno de sexta.",
        owner: "Coordenacao de programacoes",
      },
      {
        title: "Reposicao de lider kids",
        detail: "Cobertura parcial para o próximo feriado prolongado.",
        owner: "Time de recrutamento",
      },
      {
        title: "Checklist de materiais",
        detail: "Ajuste necessario para atividades aquaticas.",
        owner: "Operação de apoio",
      },
    ],
  },
};
