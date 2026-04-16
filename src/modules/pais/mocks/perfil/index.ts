export const paisPerfilMock = {
  userName: "Lúcia Fernandes",
  title: "Perfil da família",
  description:
    "Dados do responsável, preferências das crianças e contexto usado para recomendações da plataforma.",
  stats: [
    { title: "Perfil preenchido", value: "91%", helper: "Campos essenciais completos" },
    { title: "Responsáveis", value: "02", helper: "Acessos ativos" },
    { title: "Crianças cadastradas", value: "02", helper: "Faixa 4 a 10 anos" },
    { title: "Preferências mapeadas", value: "07", helper: "Usadas na busca" },
  ],
  profile: {
    familyName: "Família Fernandes",
    city: "São Paulo • SP",
    completion: "91%",
    bio:
      "Família com foco em eventos infantis no condomínio, priorizando segurança, dinamismo e atividades por faixa etária.",
  },
  guardians: [
    { id: "guard-01", name: "Lúcia Fernandes", role: "Responsável principal", contact: "(11) 98888-1122" },
    { id: "guard-02", name: "Marcos Fernandes", role: "Responsável secundário", contact: "(11) 97777-3344" },
  ],
  children: [
    { id: "child-01", name: "Sofia", age: "8 anos", profile: "Extrovertida, gosta de teatro e dança" },
    { id: "child-02", name: "Miguel", age: "5 anos", profile: "Energia alta, prefere atividades esportivas" },
  ],
  eventPreferences: [
    "Festas em condomínio",
    "Oficinas criativas",
    "Teatro infantil",
    "Circuito esportivo",
    "Música e dança",
  ],
  quickActions: [
    {
      label: "Refinar busca de serviços",
      helper: "Volte para o catálogo de empresas, recreadores e hotéis.",
      to: "/app/pais/empresas",
    },
    {
      label: "Gerenciar favoritos",
      helper: "Reorganize a shortlist que está em negociação.",
      to: "/app/pais/favoritos",
    },
    {
      label: "Consultar histórico",
      helper: "Use eventos passados para decidir com mais segurança.",
      to: "/app/pais/historico",
    },
  ],
};
