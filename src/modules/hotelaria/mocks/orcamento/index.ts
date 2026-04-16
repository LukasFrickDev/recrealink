import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaOrcamentoFeatureMock: HotelariaFeatureMock = {
  featureId: "orcamento",
  menuLabel: "Orcamento",
  title: "Orcamento da hotelaria",
  description: "Controle de gastos e solicitacoes de materiais com duas trilhas operacionais.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Estrutura de orcamento com abas separadas para gastos e materiais, sem página estacionada.",
  stats: [
    { title: "Gastos no mes", value: "R$ 18.400", helper: "Despesas aprovadas" },
    { title: "Materiais solicitados", value: "21", helper: "Pedidos registrados" },
    { title: "Eventos contabilizados", value: "13", helper: "Com centro de custo" },
    { title: "Desvio vs meta", value: "-4%", helper: "Dentro da margem" },
  ],
  checkpoints: [
    "Classificar todo gasto por categoria e data.",
    "Registrar prioridade em pedidos de material.",
    "Conferir status de aprovacao antes do fechamento mensal.",
  ],
  layout: {
    type: "orcamento",
    summary: [
      { title: "Gastos no mes", value: "R$ 18.400", helper: "Consolidado" },
      { title: "Materiais pedidos", value: "21", helper: "Fila atual" },
      { title: "Eventos registrados", value: "13", helper: "Base de custo" },
    ],
    expenses: [
      {
        description: "Kit esportivo de reposicao",
        value: "R$ 1.250",
        date: "02/12/2026",
        category: "Materiais",
        status: "Aprovado",
      },
      {
        description: "Reforco de equipe fim de semana",
        value: "R$ 2.040",
        date: "03/12/2026",
        category: "Pessoal",
        status: "Pendente",
      },
      {
        description: "Montagem de cenario tematico",
        value: "R$ 3.600",
        date: "04/12/2026",
        category: "Eventos",
        status: "Enviado",
      },
    ],
    materials: [
      {
        material: "Pulseiras de identificacao",
        quantity: "350 un",
        date: "02/12/2026",
        status: "Aprovado",
        priority: "Alta",
      },
      {
        material: "Tintas para oficina",
        quantity: "24 kits",
        date: "03/12/2026",
        status: "Pendente",
        priority: "Media",
      },
      {
        material: "Bolas inflaveis",
        quantity: "40 un",
        date: "04/12/2026",
        status: "Enviado",
        priority: "Baixa",
      },
    ],
  },
};
