export type AudienceKey = "recreador" | "hotelaria" | "eventos" | "pais";

export interface HeroCard {
  role: string;
  company: string;
  type: string;
  date: string;
  context: string;
}

export interface AudienceOption {
  id: AudienceKey;
  title: string;
  description: string;
  icon: string;
  mood: string;
  image: string;
}

export interface PersonalizedCtaItem {
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  badge: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  checklist: string[];
  stats: Array<{ value: string; label: string }>;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  badge: string;
}

export interface AudienceFeatureBlock {
  title: string;
  subtitle: string;
  flavor: string;
  cards: FeatureCard[];
}

export const navLinks = [
  { id: "inicio", label: "Início" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "contato", label: "Contato" },
];

export const heroData = {
  highlightedTitle: "conecta recreadores, contratantes e empresas",
  subtitle:
    "Profissionalize sua operação com uma plataforma viva: contratação, gestão, comunicação e crescimento em um só lugar.",
  spotlightTitle: "Conexão real entre perfis",
  spotlightDescription:
    "Recreadores, hotelaria, empresas e famílias em uma experiência integrada, com fluxo visual claro e ferramentas práticas.",
  spotlightImage:
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
  stats: [
    { label: "+1.200 recreadores ativos" },
    { label: "300+ operações em hotelaria" },
    { label: "Cobertura em todo o Brasil" },
  ],
  cards: [
    {
      role: "Recreador Infantil",
      company: "Resort Paradise · São Paulo",
      type: "Temporada",
      date: "Início em 15/06/2026",
      context: "Famílias e férias escolares",
    },
    {
      role: "Coordenador de Recreação",
      company: "Hotel Marina · Rio de Janeiro",
      type: "Efetivo",
      date: "Início imediato",
      context: "Operação de alto fluxo",
    },
  ] as HeroCard[],
  alertLabel: "Alertas inteligentes de vagas",
  alertDescription: "Receba oportunidades compatíveis com seu momento profissional.",
};

export const audienceOptions: AudienceOption[] = [
  {
    id: "recreador",
    title: "Recreador",
    description: "Energia criativa, agenda organizada e visibilidade para novas oportunidades.",
    icon: "🎯",
    mood: "Criatividade e presença humana",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "hotelaria",
    title: "Hotelaria",
    description: "Confiança operacional para contratar, distribuir equipe e manter padrão de serviço.",
    icon: "🏨",
    mood: "Estrutura e organização",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "eventos",
    title: "Empresa e Eventos",
    description: "Dinamismo comercial para fechar propostas, alocar time e acelerar entregas.",
    icon: "🎉",
    mood: "Movimento e oportunidade",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pais",
    title: "Pais e Mães",
    description: "Acolhimento e segurança para encontrar experiências confiáveis para a família.",
    icon: "👨‍👩‍👧‍👦",
    mood: "Confiança e descoberta",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
  },
];

export const personalizedCta: Record<"default" | AudienceKey, PersonalizedCtaItem> = {
  default: {
    title: "Transforme carreira, operação e resultados na recreação",
    subtitle:
      "A RecreaLink conecta as pontas do mercado com clareza visual, métricas práticas e fluxo de contratação mais rápido.",
    primary: "Começar gratuitamente",
    secondary: "Explorar recursos",
    badge: "Acesso inicial sem custo",
    eyebrow: "Plataforma institucional",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Equipe colaborando em planejamento estratégico",
    checklist: [
      "Fluxos específicos para cada perfil",
      "Interface madura e orientada a operação",
      "Dados para decisões com mais segurança",
    ],
    stats: [
      { value: "1.200+", label: "Usuários ativos" },
      { value: "22+", label: "Ferramentas" },
      { value: "98%", label: "Satisfação" },
    ],
  },
  recreador: {
    title: "Encontre o próximo trabalho com presença profissional",
    subtitle:
      "Vagas qualificadas, histórico organizado e ferramentas para tornar sua rotina mais previsível.",
    primary: "Ver vagas disponíveis",
    secondary: "Criar perfil grátis",
    badge: "23 novas vagas hoje",
    eyebrow: "Perfil recreador",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Recreador conduzindo atividade com crianças ao ar livre",
    checklist: [
      "Painel de oportunidades por região",
      "Portfólio e histórico de experiências",
      "Agenda visual para escalas e entrevistas",
    ],
    stats: [
      { value: "1.200+", label: "Recreadores ativos" },
      { value: "R$ 2.800", label: "Média mensal" },
      { value: "95%", label: "Taxa de contratação" },
    ],
  },
  hotelaria: {
    title: "Contrate com confiança e mantenha operação estável",
    subtitle:
      "Equipe certa no turno certo, com visibilidade de performance para decisões rápidas no dia a dia.",
    primary: "Contratar recreadores",
    secondary: "Publicar vaga",
    badge: "Redução de 60% no tempo de recrutamento",
    eyebrow: "Perfil hotelaria",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Equipe de hotelaria organizada em ambiente de recepção",
    checklist: [
      "Banco de talentos com filtros avançados",
      "Escalas com visão por operação",
      "Relatórios e feedbacks consolidados",
    ],
    stats: [
      { value: "48h", label: "Tempo médio de contratação" },
      { value: "4.8", label: "Avaliação média" },
      { value: "300+", label: "Hotéis parceiros" },
    ],
  },
  eventos: {
    title: "Acelere propostas e ganho de tração comercial",
    subtitle:
      "Estruture serviços, equipe e agenda para transformar oportunidades em contratos recorrentes.",
    primary: "Cadastrar empresa",
    secondary: "Ver demonstração",
    badge: "40% de ganho em produtividade",
    eyebrow: "Perfil empresa e eventos",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Evento corporativo com equipe em ação",
    checklist: [
      "Pipeline de orçamentos por prioridade",
      "Visão operacional de equipe por evento",
      "Indicadores para expansão sustentável",
    ],
    stats: [
      { value: "22+", label: "Ferramentas incluídas" },
      { value: "150%", label: "ROI médio" },
      { value: "500+", label: "Empresas ativas" },
    ],
  },
  pais: {
    title: "Descubra atividades seguras com mais tranquilidade",
    subtitle:
      "Encontre empresas confiáveis, compare propostas e organize experiências para toda a família.",
    primary: "Encontrar eventos",
    secondary: "Contratar recreador",
    badge: "Novas experiências toda semana",
    eyebrow: "Perfil pais e mães",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Família com crianças participando de atividade recreativa",
    checklist: [
      "Busca por faixa etária e localização",
      "Avaliações reais de outras famílias",
      "Histórico de conversas e favoritos",
    ],
    stats: [
      { value: "200+", label: "Eventos mensais" },
      { value: "100%", label: "Profissionais verificados" },
      { value: "4.9", label: "Satisfação das famílias" },
    ],
  },
};

export const featuresByAudience: Record<AudienceKey, AudienceFeatureBlock> = {
  recreador: {
    title: "Ferramentas profissionais para acelerar sua jornada",
    subtitle: "Da candidatura à entrega no evento, tudo em um fluxo visual simples e eficiente.",
    flavor: "Energia criativa com foco em carreira",
    cards: [
      {
        title: "Perfil profissional completo",
        description: "Portfólio, competências e histórico em um cartão de apresentação forte.",
        icon: "🧩",
        badge: "Presença",
      },
      {
        title: "Agenda inteligente",
        description: "Organize entrevistas, escalas e compromissos sem perder oportunidades.",
        icon: "📅",
        badge: "Rotina",
      },
      {
        title: "Banco de atividades",
        description: "Biblioteca pronta para executar atividades com diferentes públicos.",
        icon: "🎨",
        badge: "Criatividade",
      },
      {
        title: "Histórico e reputação",
        description: "Consolide resultados e construa confiança com provas de entrega.",
        icon: "🏅",
        badge: "Credibilidade",
      },
      {
        title: "Mapa de oportunidades",
        description: "Visualize vagas por região e priorize deslocamentos com estratégia.",
        icon: "🗺️",
        badge: "Mobilidade",
      },
      {
        title: "Comunicação ágil",
        description: "Mantenha conversas com contratantes sem ruído e com histórico organizado.",
        icon: "💬",
        badge: "Conexão",
      },
    ],
  },
  hotelaria: {
    title: "Operação de lazer com previsibilidade e controle",
    subtitle: "Padronize contratação, escala e qualidade para manter a experiência do hóspede no nível esperado.",
    flavor: "Confiança operacional para hotelaria",
    cards: [
      {
        title: "Banco de talentos",
        description: "Filtre recreadores por experiência, idioma e disponibilidade real.",
        icon: "🔎",
        badge: "Contratação",
      },
      {
        title: "Escalas por turno",
        description: "Distribua equipe por demanda e acompanhe cobertura em tempo real.",
        icon: "🧭",
        badge: "Operação",
      },
      {
        title: "Programações sazonais",
        description: "Monte calendário por temporada, faixa etária e perfil de hóspede.",
        icon: "🏖️",
        badge: "Experiência",
      },
      {
        title: "Indicadores de qualidade",
        description: "Acompanhe satisfação e ajuste rapidamente o plano de recreação.",
        icon: "📈",
        badge: "Gestão",
      },
      {
        title: "Ocorrências e alertas",
        description: "Centralize incidentes e decisões com histórico auditável.",
        icon: "🛡️",
        badge: "Segurança",
      },
      {
        title: "Orçamentos e custos",
        description: "Controle investimento de equipe e mantenha previsibilidade mensal.",
        icon: "💼",
        badge: "Financeiro",
      },
    ],
  },
  eventos: {
    title: "Mais tração comercial para empresas de recreação",
    subtitle: "Conecte vendas e operação com uma visão clara de proposta, equipe e resultado.",
    flavor: "Dinamismo e crescimento com método",
    cards: [
      {
        title: "Pipeline de propostas",
        description: "Priorize negociações com maior chance de fechamento.",
        icon: "📨",
        badge: "Comercial",
      },
      {
        title: "Equipe por evento",
        description: "Alocação inteligente por senioridade e tipo de entrega.",
        icon: "👥",
        badge: "Alocação",
      },
      {
        title: "Agenda corporativa",
        description: "Sincronize produção, atendimento e operação com menos atrito.",
        icon: "🗓️",
        badge: "Sincronia",
      },
      {
        title: "Catálogo de serviços",
        description: "Apresente escopo e diferenciais com linguagem comercial clara.",
        icon: "📚",
        badge: "Oferta",
      },
      {
        title: "Galeria e provas sociais",
        description: "Use resultados visuais para elevar confiança em novas negociações.",
        icon: "📸",
        badge: "Conversão",
      },
      {
        title: "Relatórios de performance",
        description: "Mensure margem, produtividade e recorrência para crescer com controle.",
        icon: "📊",
        badge: "Escala",
      },
    ],
  },
  pais: {
    title: "Escolhas mais seguras para momentos especiais",
    subtitle: "Compare empresas, organize experiências e contrate com confiança para sua família.",
    flavor: "Acolhimento e confiança para decidir",
    cards: [
      {
        title: "Busca por perfil familiar",
        description: "Encontre opções por idade, estilo e localização.",
        icon: "🧒",
        badge: "Descoberta",
      },
      {
        title: "Favoritos e comparativos",
        description: "Guarde opções e compare propostas com calma.",
        icon: "❤️",
        badge: "Decisão",
      },
      {
        title: "Cobertura por região",
        description: "Visualize ofertas próximas e reduza deslocamento.",
        icon: "📍",
        badge: "Proximidade",
      },
      {
        title: "Agenda da família",
        description: "Organize datas importantes e eventos recorrentes.",
        icon: "🗓️",
        badge: "Organização",
      },
      {
        title: "Chat com histórico",
        description: "Converse com empresas e mantenha tudo documentado.",
        icon: "💌",
        badge: "Comunicação",
      },
      {
        title: "Avaliações verificadas",
        description: "Use experiências reais de outras famílias para contratar melhor.",
        icon: "⭐",
        badge: "Segurança",
      },
    ],
  },
};

export const howItWorks = [
  {
    step: "01",
    title: "Escolha seu perfil",
    description: "Recreador, hotelaria, empresa ou família: cada jornada começa no contexto certo.",
    icon: "🎯",
  },
  {
    step: "02",
    title: "Ative seu painel",
    description: "A interface adapta visão, métricas e atalhos para o seu objetivo principal.",
    icon: "🧭",
  },
  {
    step: "03",
    title: "Execute com método",
    description: "Use ferramentas práticas para rotina, contratação, atendimento e comunicação.",
    icon: "⚙️",
  },
  {
    step: "04",
    title: "Evolua com dados",
    description: "Acompanhe indicadores e ajuste decisões para crescer com consistência.",
    icon: "📈",
  },
];

export const brazilCoverage = [
  { city: "Salvador, BA", vagas: 3, segment: "Resorts e férias", x: 66, y: 50 },
  { city: "Fortaleza, CE", vagas: 1, segment: "Lazer premium", x: 68, y: 38 },
  { city: "Rio de Janeiro, RJ", vagas: 2, segment: "Hotelaria urbana", x: 56, y: 66 },
  { city: "São Paulo, SP", vagas: 4, segment: "Eventos corporativos", x: 53, y: 73 },
  { city: "Foz do Iguaçu, PR", vagas: 1, segment: "Turismo familiar", x: 42, y: 78 },
  { city: "Manaus, AM", vagas: 6, segment: "Ecoturismo", x: 38, y: 24 },
];

export const dashboardPreview = {
  welcome: "Olá, Rafael!",
  highlight: "Você recebeu 3 alertas estratégicos e 5 oportunidades compatíveis para esta semana.",
  pills: ["Contratação ativa", "Agenda sincronizada", "Nível de serviço alto"],
  opportunities: [
    {
      title: "Recreador para Resort de Luxo",
      company: "Grand Resort · Porto de Galinhas",
      amount: "R$ 3.500,00",
      score: "Compatibilidade: 92%",
      schedule: "Temporada · Dez a Mar",
    },
    {
      title: "Coordenador de Recreação",
      company: "Hotel Paradise · Florianópolis",
      amount: "R$ 4.800,00",
      score: "Compatibilidade: 87%",
      schedule: "Efetivo · Início imediato",
    },
  ],
  quickStats: [
    { label: "Visualizações do perfil", value: "143" },
    { label: "Entrevistas agendadas", value: "04" },
    { label: "Eventos em andamento", value: "07" },
  ],
};

export const testimonials = [
  {
    name: "Ana Costa",
    role: "Recreadora Sênior · Plano Pro",
    content:
      "Com a agenda inteligente aumentei minha produtividade em 40% e organizei uma rotina de eventos sem sobrecarga.",
    result: "+40% produtividade",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Carlos Mendes",
    role: "Gerente de Lazer · Rede Hoteleira",
    content:
      "Contratamos 12 recreadores em 6 meses com muito mais assertividade. O tempo de recrutamento caiu drasticamente.",
    result: "-60% tempo de contratação",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Marina Silva",
    role: "Coordenadora de Operações",
    content:
      "Nosso planejamento ficou mais previsível com escalas e indicadores integrados. Hoje operamos com menos ruído.",
    result: "+30% eficiência operacional",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Luciana Ferreira",
    role: "Mãe e contratante recorrente",
    content:
      "Passei a escolher atividades com mais confiança graças às avaliações e ao histórico de atendimento das empresas.",
    result: "4,9 de satisfação familiar",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=320&q=80",
  },
];

export const finalStats = [
  { value: "1.200+", label: "Recreadores conectados" },
  { value: "300+", label: "Hotéis e contratantes" },
  { value: "98%", label: "Satisfação dos usuários" },
  { value: "22+", label: "Ferramentas profissionais" },
];

export const footerColumns = {
  plataforma: ["22+ Ferramentas", "Jornadas por perfil", "Depoimentos", "Vagas em destaque"],
  suporte: ["Central de ajuda", "Termos de uso", "Política de privacidade", "LGPD"],
  contato: ["contato@recrealink.com.br", "Instagram", "YouTube", "LinkedIn"],
};
