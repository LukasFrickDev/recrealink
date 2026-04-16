export const paisMapaMock = {
  userName: "Lúcia Fernandes",
  title: "Mapa de fornecedores",
  description:
    "Visualize cobertura por região, distância da família e disponibilidade de empresas, recreadores e hotéis parceiros.",
  stats: [
    { title: "Perfis no raio", value: "48", helper: "Até 15 km" },
    { title: "Bairros cobertos", value: "18", helper: "Região metropolitana" },
    { title: "Com resposta rápida", value: "21", helper: "Até 2 horas" },
    { title: "Rotas favoritas", value: "06", helper: "Salvas pela família" },
  ],
  mapRegions: [
    { name: "Centro", companies: 9, averageRating: "4,8", tone: "brand" as const },
    { name: "Zona Sul", companies: 12, averageRating: "4,9", tone: "success" as const },
    { name: "Zona Leste", companies: 7, averageRating: "4,7", tone: "warning" as const },
    { name: "ABC", companies: 14, averageRating: "4,8", tone: "neutral" as const },
  ],
  mapLegend: [
    { label: "Empresa", color: "#c85063" },
    { label: "Recreador autônomo", color: "#2ea36a" },
    { label: "Hotel parceiro", color: "#c58a2d" },
  ],
  mapHotspots: [
    { id: "spot-01", label: "Vila Mariana", providers: 5, left: 22, top: 40, tone: "empresa" as const },
    { id: "spot-02", label: "Cambuí", providers: 4, left: 52, top: 24, tone: "recreador" as const },
    { id: "spot-03", label: "Jardim do Mar", providers: 3, left: 72, top: 58, tone: "hotel" as const },
    { id: "spot-04", label: "Centro", providers: 6, left: 36, top: 63, tone: "empresa" as const },
  ],
  nearbyCompanies: [
    {
      id: "mapa-01",
      name: "Recreação Diversão Total",
      providerType: "empresa" as const,
      distance: "2,3 km",
      location: "Vila Mariana • São Paulo",
      availability: "Sábado 14h",
      specialties: ["Festa infantil", "Oficinas"],
    },
    {
      id: "mapa-02",
      name: "Rafa Kids Recreação",
      providerType: "recreador" as const,
      distance: "3,1 km",
      location: "Paraíso • São Paulo",
      availability: "Domingo 10h",
      specialties: ["Música", "Teatro"],
    },
    {
      id: "mapa-03",
      name: "Hotel Encanto Family Resort",
      providerType: "hotel" as const,
      distance: "5,8 km",
      location: "Jardim do Mar • São Bernardo",
      availability: "Quinta 16h",
      specialties: ["Hotel com recreação", "Integração"],
    },
  ],
  routeHints: [
    "Priorize bairros com melhor nota média e tempo de deslocamento menor.",
    "Compare tipo de fornecedor conforme o formato do evento: empresa, recreador ou hotel parceiro.",
    "Cruze disponibilidade com agenda antes de fechar a shortlist final.",
  ],
};
