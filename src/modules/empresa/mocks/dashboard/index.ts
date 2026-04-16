import { empresaBaseIdentity } from "@/modules/empresa/mocks/shared";
import { getEmpresaDomainById } from "@/shared/mocks/domains";

const empresa = getEmpresaDomainById("emp-recreacao-diversao-total");

export const empresarioDashboardPageMock = {
  ...empresaBaseIdentity,
  title: "Painel da Empresa",
  description: "Visão geral do desempenho e do status da sua empresa de recreação.",
  stats: [
    { title: "Eventos no mês", value: "12", helper: "+3 em relação ao mês anterior" },
    { title: "Receita mensal", value: "R$ 24.500", helper: "+15% em relação ao mês anterior" },
    { title: "Equipe ativa", value: "08", helper: "Recreadores alocados" },
    {
      title: "Avaliação média",
      value: (empresa?.rating ?? 4.8).toFixed(1).replace(".", ","),
      helper: "Base de 47 avaliações",
    },
  ],
  kpis: [
    {
      title: "Eventos confirmados",
      value: "12",
      helper: "Programação fechada para este mês",
      tone: "blue",
    },
    {
      title: "Orçamentos em negociação",
      value: "09",
      helper: "Propostas aguardando resposta",
      tone: "purple",
    },
    {
      title: "Equipe disponível",
      value: "14",
      helper: "Profissionais prontos para alocação",
      tone: "green",
    },
    {
      title: "Clientes recorrentes",
      value: "21",
      helper: "Carteira ativa nos últimos 90 dias",
      tone: "amber",
    },
  ],
  quickActions: [
    {
      title: "Novo evento",
      description: "Criar evento com equipe e checklist inicial.",
    },
    {
      title: "Responder orçamento",
      description: "Enviar proposta comercial para novos leads.",
    },
    {
      title: "Abrir vaga",
      description: "Publicar oportunidade para ampliar o time.",
    },
    {
      title: "Atualizar empresa",
      description: "Revisar portfólio e dados públicos da marca.",
    },
  ],
  recentActivities: [
    {
      title: "Evento confirmado",
      description: "Festa infantil para 40 crianças - Zona Sul.",
      time: "Há 2 horas",
      tone: "green",
    },
    {
      title: "Novo orçamento recebido",
      description: "Solicitação para evento corporativo de 120 pessoas.",
      time: "Há 4 horas",
      tone: "blue",
    },
    {
      title: "Recreador adicionado",
      description: "Carlos Mendes entrou para a equipe fixa.",
      time: "Ontem",
      tone: "purple",
    },
  ],
  company: {
    corporateName: empresa?.legalName ?? "Recreação & Diversão Ltda",
    cnpj: empresa?.cnpj ?? "12.345.678/0001-90",
    founded: "Fundada em 2020",
    specialties: empresa?.specialties ?? ["Festas infantis", "Animacao", "Recreação tematica"],
    city: empresa ? `${empresa.city} - ${empresa.state}` : "São Paulo - SP",
    range: empresa?.coverageLabel ?? "Atuação em raio de 30 km",
  },
};

