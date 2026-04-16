import { empresaBaseIdentity } from "@/modules/empresa/mocks/shared";

export const empresarioEquipePageMock = {
  ...empresaBaseIdentity,
  title: "Equipe da Empresa",
  description: "Gestão do time por squad, disponibilidade operacional e evolução dos profissionais.",
  stats: [
    { title: "Equipe cadastrada", value: "26", helper: "Profissionais ativos" },
    { title: "Líderes de operação", value: "05", helper: "Coordenação por frente" },
    { title: "Treinamentos", value: "03", helper: "Ciclos no mês" },
    { title: "Disponibilidade", value: "91%", helper: "Média semanal" },
  ],
  squads: [
    {
      name: "Squad Festa Kids",
      leader: "Camila Pires",
      members: "6 pessoas",
      specialty: "Eventos infantis de alto fluxo",
      status: "Alocada",
    },
    {
      name: "Squad Corporativo",
      leader: "Paulo Mendes",
      members: "5 pessoas",
      specialty: "Dinâmicas para empresas e RH",
      status: "Confirmada",
    },
    {
      name: "Squad Reserva",
      leader: "Rafael Nunes",
      members: "4 pessoas",
      specialty: "Cobertura de última hora",
      status: "Stand-by",
    },
  ],
  teamMovements: [
    {
      title: "Treinamento interno",
      detail: "Boas práticas de atendimento para eventos infantis",
      time: "Hoje",
    },
    {
      title: "Nova líder de operação",
      detail: "Camila Pires assumiu a frente corporativa",
      time: "Ontem",
    },
    {
      title: "Escala revisada",
      detail: "Cobertura confirmada para o fim de semana",
      time: "2 dias",
    },
  ],
  professionals: [
    {
      name: "Lucas Silva",
      role: "Recreador infantil",
      availability: "Disponível sábado",
      score: "4,9",
    },
    {
      name: "Ana Ribeiro",
      role: "Facilitadora de oficinas",
      availability: "Alocada domingo",
      score: "4,8",
    },
    {
      name: "Pedro Matos",
      role: "Líder de campo",
      availability: "Disponível terça",
      score: "4,7",
    },
  ],
  developmentTracks: [
    {
      title: "Atendimento em eventos premium",
      owner: "Camila Pires",
      cycle: "Abril",
    },
    {
      title: "Gestão de conflitos em campo",
      owner: "Paulo Mendes",
      cycle: "Maio",
    },
    {
      title: "Padronização de briefings",
      owner: "Júlia Prado",
      cycle: "Maio",
    },
  ],
  hiringPriorities: [
    "Contratar 2 recreadores infantis para cobertura fixa de sábado.",
    "Ampliar banco de reservas para eventos corporativos de última hora.",
    "Mapear talentos com experiência em atividades aquáticas.",
  ],
};

