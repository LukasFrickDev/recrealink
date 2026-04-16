import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaIndicadoresFeatureMock: HotelariaFeatureMock = {
  featureId: "indicadores",
  menuLabel: "Indicadores",
  title: "Indicadores da operação",
  description: "Painel de performance com períodos, tendências e watchlist operacional.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Estrutura focada em leitura executiva: KPI, tendência e responsável por frente.",
  stats: [
    { title: "KPIs monitorados", value: "12", helper: "Painel principal" },
    { title: "Metas atingidas", value: "9", helper: "Ciclo atual" },
    { title: "Satisfação geral", value: "98%", helper: "Feedback de hóspedes" },
    { title: "Efetividade", value: "94%", helper: "Execução de programações" },
  ],
  checkpoints: [
    "Atualizar indicadores no mesmo horário todos os dias.",
    "Sinalizar tendência negativa acima de 5% no período.",
    "Definir responsável para cada KPI em risco.",
  ],
  layout: {
    type: "indicadores",
    periods: ["Esta semana", "Este mês", "Trimestre", "Ano"],
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
        title: "Atividades no horário",
        value: "89%",
        trend: "-3% em relação ao último ciclo",
        tone: "warning",
      },
      {
        title: "Incidentes críticos",
        value: "1",
        trend: "Redução após revisão de protocolo",
        tone: "danger",
      },
    ],
    watchlist: [
      {
        title: "Briefing de teens",
        detail: "Oscilação de pontualidade no turno noturno de sexta.",
        owner: "Coordenação de programações",
      },
      {
        title: "Reposição de líder kids",
        detail: "Cobertura parcial para o próximo feriado prolongado.",
        owner: "Time de recrutamento",
      },
      {
        title: "Checklist de materiais",
        detail: "Ajuste necessário para atividades aquáticas.",
        owner: "Operação de apoio",
      },
    ],
  },
};
