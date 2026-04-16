export type AudienceKey = "recreador" | "hotelaria" | "eventos" | "pais";

export const navLinks = [
  { id: "inicio", label: "Início" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "contato", label: "Contato" },
];

export const heroData = {
  title: "Conecta Recreadores, Contratantes e Empresas",
  highlightedTitle: "conecta recreadores, contratantes e empresas",
  subtitle:
    "A plataforma que conecta e profissionaliza o mercado de recreação no Brasil com 1.200+ profissionais e 22+ ferramentas.",
  stats: [
    { label: "+1.200 recreadores" },
    { label: "Todo o Brasil" },
  ],
  cards: [
    {
      role: "Recreador Infantil",
      company: "Resort Paradise - São Paulo",
      type: "Temporada",
      date: "Inicio em 15/06/2024",
    },
    {
      role: "Coordenador de Recreação",
      company: "Hotel Marina - Rio de Janeiro",
      type: "Efetivo",
      date: "Início imediato",
    },
  ],
};

export const audienceOptions: { id: AudienceKey; title: string; description: string; icon: string }[] = [
  {
    id: "recreador",
    title: "Recreador",
    description: "Encontre vagas e organize sua carreira com ferramentas praticas.",
    icon: "🎯",
  },
  {
    id: "hotelaria",
    title: "Hotelaria",
    description: "Contrate recreadores qualificados e gerencie escalas com rapidez.",
    icon: "🏨",
  },
  {
    id: "eventos",
    title: "Eventos",
    description: "Estruture equipe, servicos e agenda da sua empresa de recreação.",
    icon: "🎉",
  },
  {
    id: "pais",
    title: "Pais",
    description: "Descubra empresas de recreação para experiências em família.",
    icon: "👨‍👩‍👧‍👦",
  },
];

export const personalizedCta = {
  default: {
    title: "Transforme sua carreira ou negócio na recreação",
    subtitle: "Junte-se a maior plataforma especializada em recreação do Brasil.",
    primary: "Comecar Gratuitamente",
    secondary: "Explorar Recursos",
    badge: "Cadastro 100% gratuito",
    stats: [
      { value: "1.200+", label: "Usuarios ativos" },
      { value: "22+", label: "Ferramentas" },
      { value: "98%", label: "Satisfacao" },
    ],
  },
  recreador: {
    title: "Encontre seu próximo trabalho em recreação",
    subtitle: "Vagas exclusivas em hoteis, resorts e empresas de todo o Brasil.",
    primary: "Ver Vagas Disponiveis",
    secondary: "Criar Perfil Gratis",
    badge: "23 novas vagas hoje",
    stats: [
      { value: "1.200+", label: "Recreadores ativos" },
      { value: "R$ 2.800", label: "Salario medio" },
      { value: "95%", label: "Taxa de contratação" },
    ],
  },
  hotelaria: {
    title: "Contrate recreadores qualificados rapidamente",
    subtitle: "Acesso aos melhores profissionais de recreação do mercado.",
    primary: "Contratar Recreadores",
    secondary: "Publicar Vaga",
    badge: "Reduz 60% do tempo de recrutamento",
    stats: [
      { value: "48h", label: "Tempo medio de contratação" },
      { value: "4.8", label: "Avaliação media" },
      { value: "300+", label: "Hoteis parceiros" },
    ],
  },
  eventos: {
    title: "Expanda seus negócios na recreação",
    subtitle: "Ferramentas profissionais para crescer e gerenciar sua empresa.",
    primary: "Cadastrar Empresa",
    secondary: "Ver Demonstracao",
    badge: "40% de aumento em produtividade",
    stats: [
      { value: "22+", label: "Ferramentas incluidas" },
      { value: "150%", label: "ROI medio" },
      { value: "500+", label: "Empresas ativas" },
    ],
  },
  pais: {
    title: "Descubra atividades incríveis para sua família",
    subtitle: "Eventos de recreação com profissionais verificados perto de você.",
    primary: "Encontrar Eventos",
    secondary: "Contratar Recreador",
    badge: "Eventos toda semana",
    stats: [
      { value: "200+", label: "Eventos mensais" },
      { value: "100%", label: "Profissionais verificados" },
      { value: "4.9", label: "Satisfacao das famílias" },
    ],
  },
};

export const featuresByAudience = {
  recreador: {
    title: "Ferramentas profissionais que aceleram sua carreira",
    subtitle: "Mais de 22 ferramentas especializadas organizadas para o dia a dia.",
    cards: [
      {
        title: "Perfil Profissional Completo",
        description: "Cadastro visual com competências, experiência e portfolio organizado.",
      },
      {
        title: "Agenda Basica",
        description: "Controle semanal de compromissos, entrevistas e escalas essenciais.",
      },
      {
        title: "Checklists Simples",
        description: "Listas operacionais para reduzir falhas antes de cada atividade.",
      },
      {
        title: "Registro de Experiências",
        description: "Linha de histórico para consolidar resultados e reputacao profissional.",
      },
      {
        title: "Perfil dos Hoteis",
        description: "Vitrine de oportunidades com contexto de estrutura e público-alvo.",
      },
      {
        title: "Suporte Especializado",
        description: "Central de ajuda para onboarding, candidaturas e operação da plataforma.",
      },
    ],
  },
  hotelaria: {
    title: "Para hoteis e resorts: contrate recreadores qualificados",
    subtitle: "Busca avancada, gestao de equipes e planejamento de eventos em um unico painel.",
    cards: [
      {
        title: "Painel de Escalas",
        description: "Distribua equipe por turno com visão clara de cobertura operacional.",
      },
      {
        title: "Banco de Recreadores",
        description: "Filtre perfis por especialidade, experiência e disponibilidade.",
      },
      {
        title: "Programacoes",
        description: "Monte cronogramas de atividades por faixa etaria e temporada.",
      },
      {
        title: "Feedback e Qualidade",
        description: "Consolide avaliações para melhoria continua da entrega.",
      },
      {
        title: "Relatorios Visuais",
        description: "Indicadores de desempenho para tomada de decisao executiva.",
      },
      {
        title: "Orcamento",
        description: "Controle de custos e previsão de operação da recreação.",
      },
    ],
  },
  eventos: {
    title: "Impulsione sua empresa de recreação",
    subtitle: "Ferramentas para agenda, equipe, servicos e relacionamento com clientes.",
    cards: [
      {
        title: "Gestao de Orcamentos",
        description: "Pipeline de propostas com prioridade por chance de fechamento.",
      },
      {
        title: "Equipe da Empresa",
        description: "Alocacao operacional por evento e nivel de especialidade.",
      },
      {
        title: "Agenda Corporativa",
        description: "Cronograma integrado para producao, comercial e atendimento.",
      },
      {
        title: "Cadastro de Servicos",
        description: "Pacotes claros para apresentar escopo e valor de cada entrega.",
      },
      {
        title: "Galeria e Depoimentos",
        description: "Prova social para fortalecer negociações com novos clientes.",
      },
      {
        title: "Financas e Relatorios",
        description: "Resumo de resultado por evento para previsibilidade de caixa.",
      },
    ],
  },
  pais: {
    title: "Encontre as melhores atividades para sua família",
    subtitle: "Descubra opcoes seguras e educativas para cada momento.",
    cards: [
      {
        title: "Busca de Empresas",
        description: "Compare opcoes por cidade, faixa etaria e perfil de atividade.",
      },
      {
        title: "Favoritos",
        description: "Salve os melhores perfis para decidir com tranquilidade em família.",
      },
      {
        title: "Mapa de Cobertura",
        description: "Visualize ofertas próximas para reduzir deslocamento e custo.",
      },
      {
        title: "Agenda da Família",
        description: "Organize compromissos, visitas e datas de contratação.",
      },
      {
        title: "Chat e Histórico",
        description: "Converse com empresas e mantenha registro das combinacoes.",
      },
      {
        title: "Avaliações Reais",
        description: "Use feedback de outras famílias para contratar com segurança.",
      },
    ],
  },
};

export const howItWorks = [
  {
    step: "01",
    title: "Escolha seu perfil",
    description: "Defina se você e recreador, hotelaria, eventos ou família.",
  },
  {
    step: "02",
    title: "Acesse seu painel",
    description: "Cada perfil recebe um dashboard visual com fluxo proprio.",
  },
  {
    step: "03",
    title: "Use as ferramentas",
    description: "Gerencie agenda, equipes, oportunidades e comunicação visual.",
  },
  {
    step: "04",
    title: "Cresca com consistencia",
    description: "Acompanhe desempenho e evolua sua presenca na plataforma.",
  },
];

export const brazilCoverage = [
  { city: "Salvador, BA", vagas: 3 },
  { city: "Fortaleza, CE", vagas: 1 },
  { city: "Rio de Janeiro, RJ", vagas: 2 },
  { city: "São Paulo, SP", vagas: 4 },
  { city: "Foz do Iguacu, PR", vagas: 1 },
  { city: "Manaus, AM", vagas: 6 },
];

export const dashboardPreview = {
  welcome: "Ola, Rafael!",
  highlight: "Você tem 3 novas notificações e 5 vagas compativeis com seu perfil.",
  opportunities: [
    {
      title: "Recreador para Resort de Luxo",
      company: "Grand Resort - Porto de Galinhas",
      amount: "R$ 3.500,00",
      score: "Compatibilidade: 92%",
    },
    {
      title: "Coordenador de Recreação",
      company: "Hotel Paradise - Florianopolis",
      amount: "R$ 4.800,00",
      score: "Compatibilidade: 87%",
    },
  ],
};

export const testimonials = [
  {
    name: "Ana Costa",
    role: "Recreadora Senior",
    content:
      "Com a agenda semanal aumentei minha produtividade em 40% e organizei toda minha rotina de eventos.",
  },
  {
    name: "Carlos Mendes",
    role: "Gerente de Lazer",
    content:
      "Contratamos 12 recreadores em 6 meses. A plataforma reduziu muito nosso tempo de recrutamento.",
  },
  {
    name: "Marina Silva",
    role: "Coordenadora",
    content:
      "O painel de escalas e atividades economiza horas toda semana e melhora o planejamento com a equipe.",
  },
];

export const finalStats = [
  { value: "1.200+", label: "Recreadores conectados" },
  { value: "300+", label: "Hoteis e contratantes" },
  { value: "98%", label: "Satisfacao dos usuarios" },
  { value: "22+", label: "Ferramentas profissionais" },
];

export const footerColumns = {
  plataforma: ["22+ Ferramentas", "Recursos gratuitos", "Depoimentos", "Vagas"],
  suporte: ["Central de ajuda", "Termos de uso", "Politica de privacidade", "LGPD"],
  contato: ["contato@recrealink.com.br", "Instagram", "YouTube", "LinkedIn"],
};
