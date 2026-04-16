import { empresaProfileIdentity } from "@/modules/empresa/mocks/shared";
import { getEmpresaDomainById } from "@/shared/mocks/domains";

const empresa = getEmpresaDomainById("emp-recreacao-diversao-total");

export const empresarioEmpresaPageMock = {
  ...empresaProfileIdentity,
  title: "Perfil da Empresa",
  description:
    "Página institucional da empresa com foco em apresentação pública, edição de informações e confiança comercial.",
  stats: [
    { title: "Perfil público", value: "94%", helper: "Completude atual" },
    { title: "Eventos entregues", value: "320", helper: "Histórico validado" },
    {
      title: "Avaliação média",
      value: (empresa?.rating ?? 4.8).toFixed(1).replace(".", ","),
      helper: "Base de 47 avaliações",
    },
    { title: "Clientes recorrentes", value: "21", helper: "Últimos 12 meses" },
  ],
  hero: {
    companyName: empresa?.displayName ?? "Recreação & Diversão",
    legalName: empresa?.legalName ?? "Recreação & Diversão Ltda.",
    cnpj: empresa?.cnpj ?? "12.345.678/0001-90",
    location: empresa ? `${empresa.city} - ${empresa.state}` : "São Paulo - SP",
    founded: "Desde 2020",
    coverage: empresa?.coverageLabel ?? "Atendimento em até 30 km",
    tagline:
      "Especialistas em experiências lúdicas para festas, colônias de férias e ativações corporativas com operação assistida ponta a ponta.",
  },
  about: {
    summary:
      "Somos uma empresa de recreação com metodologia própria, equipe treinada e operação orientada à segurança, previsibilidade e qualidade percebida em cada entrega.",
    differentiators: [
      "Roteiros personalizados por faixa etária",
      "Equipe com capacitação contínua",
      "Supervisão operacional em eventos de alta demanda",
      "Comunicação ativa com clientes antes, durante e após a entrega",
    ],
  },
  services: [
    {
      title: "Festa infantil premium",
      description: "Programação completa com recreadores por faixa etária.",
      format: "Pacotes de 4h a 6h",
    },
    {
      title: "Colônia de férias guiada",
      description: "Planejamento semanal com atividades lúdicas e esportivas.",
      format: "Módulos de 5 dias",
    },
    {
      title: "Family day corporativo",
      description: "Dinâmicas de integração para famílias em ambiente corporativo.",
      format: "Projetos sob medida",
    },
  ],
  team: [
    {
      name: "Camila Pires",
      role: "Coordenação de operações",
      note: "Planejamento de escalas e acompanhamento de eventos estratégicos.",
    },
    {
      name: "Paulo Mendes",
      role: "Gestão comercial",
      note: "Responsável por propostas, negociação e relacionamento com clientes.",
    },
    {
      name: "Júlia Prado",
      role: "Atendimento e pós-evento",
      note: "Condução de feedbacks e plano de continuidade com clientes recorrentes.",
    },
  ],
  gallery: [
    {
      title: "Festival Kids no Clube Horizonte",
      description: "Circuito temático com mais de 90 crianças em cinco estações.",
    },
    {
      title: "Colônia de inverno no Espaço Verde",
      description: "Programação de férias com oficinas, esportes e teatro interativo.",
    },
    {
      title: "Family day na TechNova",
      description: "Ativação corporativa com jogos cooperativos para famílias.",
    },
  ],
  contacts: [
    { label: "Telefone", value: empresa?.contactPhone ?? "(11) 98888-0000" },
    { label: "E-mail", value: empresa?.contactEmail ?? "contato@recreacaoediversao.com.br" },
    { label: "Site", value: empresa?.website ?? "www.recreacaoediversao.com.br" },
    { label: "Instagram", value: "@recreacaoediversao" },
  ],
  reviews: [
    {
      author: "Clube Estação Kids",
      role: "Cliente recorrente",
      rating: 5,
      message:
        "Equipe muito preparada, excelente comunicação e atividades bem conduzidas do início ao fim.",
    },
    {
      author: "Condomínio Jardim Azul",
      role: "Cliente mensal",
      rating: 5,
      message:
        "As crianças ficaram engajadas durante todo o evento e os responsáveis elogiaram bastante a organização.",
    },
    {
      author: "Resort Vale Verde",
      role: "Parceria corporativa",
      rating: 4,
      message:
        "Ótimo nível de execução, com postura profissional e adaptação rápida ao perfil do público.",
    },
  ],
};
