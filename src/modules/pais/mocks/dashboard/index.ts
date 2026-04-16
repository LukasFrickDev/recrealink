import { paisProvidersCatalogDomainMock } from "@/shared/mocks/domains/interacoes";

const featuredProviders = paisProvidersCatalogDomainMock.map((provider) => ({
  id: provider.id,
  name: provider.name,
  location: `${provider.neighborhood} • ${provider.city.split(",")[0]?.trim() ?? provider.city}`,
  rating: provider.rating.toFixed(1).replace(".", ","),
  specialties: provider.specialties,
  priceRange: provider.priceRange,
  providerType:
    provider.providerType === "Empresa"
      ? ("Empresa" as const)
      : provider.providerType === "Hotel parceiro"
        ? ("Hotel" as const)
        : ("Recreador" as const),
}));

export const paisDashboardMock = {
  areaLabel: "Pais",
  userName: "Lúcia Fernandes",
  title: "Painel da família",
  description:
    "Organize sua busca por empresas, acompanhe a agenda e conduza a contratação com mais segurança.",
  stats: [
    { title: "Empresas no catálogo", value: String(featuredProviders.length), helper: "Cobertura na região" },
    { title: "Favoritos salvos", value: "09", helper: "Lista da família" },
    { title: "Eventos sugeridos", value: "14", helper: "Faixa 4 a 10 anos" },
    { title: "Avaliação média", value: "4,8", helper: "Base de contratações" },
  ],
  welcome: {
    title: "Bem-vinda, Lúcia",
    subtitle:
      "Encontre fornecedores de recreação para sua família, compare propostas e acompanhe os próximos passos da contratação.",
  },
  quickActions: [
    {
      id: "buscar",
      title: "Buscar empresas",
      description: "Filtre por cidade, especialidade e faixa etária.",
      to: "/app/pais/empresas",
    },
    {
      id: "mapa",
      title: "Abrir mapa",
      description: "Visualize cobertura e distância por região.",
      to: "/app/pais/mapa",
    },
    {
      id: "agenda",
      title: "Ver agenda",
      description: "Acompanhe compromissos e datas de retorno.",
      to: "/app/pais/agenda",
    },
    {
      id: "mensagens",
      title: "Mensagens",
      description: "Converse com empresas e confirme detalhes.",
      to: "/app/pais/chat",
    },
  ],
  featuredProviders,
  highlights: [
    {
      title: "Perfil infantil mapeado",
      helper: "Faixa 4 a 10 anos com interesse em teatro e oficinas.",
    },
    {
      title: "Resposta rápida",
      helper: "7 empresas responderam em até 2 horas nesta semana.",
    },
    {
      title: "Janela de decisão",
      helper: "Defina o fornecedor final até sexta para garantir disponibilidade.",
    },
  ],
  tips: [
    {
      title: "Planeje com antecedência",
      description: "Priorize contato com ao menos 30 dias para ampliar opções de agenda.",
    },
    {
      title: "Compare escopo completo",
      description: "Análise equipe mínima, materiais inclusos e plano de contingência no orçamento.",
    },
    {
      title: "Valide localização",
      description: "Use o mapa para reduzir deslocamento e risco de atraso no dia do evento.",
    },
    {
      title: "Finalize com checklist",
      description: "Confirme duração, faixa etária e responsáveis antes de fechar a contratação.",
    },
  ],
  primaryActions: [
    {
      label: "Ir para busca",
      to: "/app/pais/empresas",
    },
    {
      label: "Abrir favoritos",
      to: "/app/pais/favoritos",
    },
    {
      label: "Organizar agenda",
      to: "/app/pais/agenda",
    },
  ],
};
