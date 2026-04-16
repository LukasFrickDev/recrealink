import { empresaBaseIdentity } from "@/modules/empresa/mocks/shared";

export const empresarioOrcamentosPageMock = {
  ...empresaBaseIdentity,
  title: "Gestão de Orçamentos",
  description: "Pipeline comercial com propostas abertas, negociação ativa e previsões de fechamento.",
  stats: [
    { title: "Propostas abertas", value: "18", helper: "Em análise comercial" },
    { title: "Em negociação", value: "07", helper: "Aguardando retorno" },
    { title: "Fechadas", value: "11", helper: "Últimos 30 dias" },
    { title: "Ticket médio", value: "R$ 3.420", helper: "Média mensal" },
  ],
  pipeline: [
    {
      id: "entrada",
      title: "Entrada",
      amount: "R$ 21.400",
      opportunities: [
        {
          client: "Condomínio Parque Sul",
          service: "Festival Kids",
          value: "R$ 4.800",
          deadline: "Responder até hoje",
          priority: "Alta",
        },
        {
          client: "Colégio Horizonte",
          service: "Colônia de férias",
          value: "R$ 6.900",
          deadline: "Retorno em 24h",
          priority: "Média",
        },
      ],
    },
    {
      id: "negociacao",
      title: "Negociação",
      amount: "R$ 18.600",
      opportunities: [
        {
          client: "Resort Vale Azul",
          service: "Pacote premium",
          value: "R$ 8.200",
          deadline: "Call amanhã",
          priority: "Alta",
        },
        {
          client: "Empresa Neon",
          service: "Confraternização interna",
          value: "R$ 5.300",
          deadline: "Revisão de escopo",
          priority: "Média",
        },
      ],
    },
    {
      id: "fechamento",
      title: "Fechamento",
      amount: "R$ 11.900",
      opportunities: [
        {
          client: "Buffet Estação Kids",
          service: "Recreação temática",
          value: "R$ 3.700",
          deadline: "Assinatura pendente",
          priority: "Alta",
        },
        {
          client: "Clube Girassol",
          service: "Oficinas de fim de semana",
          value: "R$ 4.200",
          deadline: "Aprovação financeira",
          priority: "Baixa",
        },
      ],
    },
  ],
  templates: [
    {
      name: "Pacote Festa Infantil",
      audience: "Famílias e condomínios",
      range: "R$ 3.900 a R$ 6.200",
    },
    {
      name: "Pacote Corporativo",
      audience: "RH e eventos empresariais",
      range: "R$ 5.400 a R$ 9.500",
    },
    {
      name: "Colônia de Férias",
      audience: "Escolas e clubes",
      range: "R$ 7.800 a R$ 12.400",
    },
  ],
  followUps: [
    {
      title: "Enviar proposta revisada",
      client: "Resort Vale Azul",
      owner: "Paulo Mendes",
      deadline: "Hoje, 16:00",
    },
    {
      title: "Confirmar equipe disponível",
      client: "Empresa Neon",
      owner: "Camila Pires",
      deadline: "Hoje, 18:00",
    },
    {
      title: "Ajustar condições comerciais",
      client: "Condomínio Parque Sul",
      owner: "Marina Costa",
      deadline: "Amanhã, 10:00",
    },
  ],
  closingPlaybook: [
    "Priorizar propostas com valor alto e janela curta de decisão.",
    "Padronizar follow-up em até 24 horas após o envio.",
    "Anexar prova social relevante para o perfil do cliente.",
    "Registrar objeções para melhoria dos próximos pacotes.",
  ],
};

