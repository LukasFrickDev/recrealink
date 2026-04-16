import {
  paisProvidersCatalogDomainMock,
  toPrimaryCityLabel,
} from "@/shared/mocks/domains/interacoes";

const providerTypeMap = {
  Empresa: "Empresa",
  "Recreador autonomo": "Recreador autônomo",
  "Hotel parceiro": "Hotel parceiro",
} as const;

const companies = paisProvidersCatalogDomainMock.map((provider) => {
  const city = toPrimaryCityLabel(provider.city);

  return {
    id: provider.id,
    name: provider.name,
    providerType:
      providerTypeMap[provider.providerType as keyof typeof providerTypeMap] ?? "Empresa",
    city,
    neighborhood: provider.neighborhood,
    rating: provider.rating.toFixed(1).replace(".", ","),
    reviews: provider.reviews,
    verified: provider.verified,
    priceRange: provider.priceRange,
    description: provider.description,
    specialties: provider.specialties,
    nextSlots: provider.nextSlots,
  };
});

const cityFilters = [
  "Todas",
  ...new Set(companies.map((company) => company.city)),
];

const serviceFilters = [
  "Todos",
  "Festa infantil",
  "Oficinas",
  "Teatro",
  "Esporte",
  "Música",
  "Hotel com recreação",
];

export const paisEmpresasMock = {
  areaLabel: "Pais",
  userName: "Lúcia Fernandes",
  title: "Buscar serviços para crianças",
  description:
    "Catálogo híbrido com empresas, recreadores autônomos e hotéis parceiros para facilitar a contratação da família.",
  stats: [
    {
      title: "Perfis no catálogo",
      value: String(companies.length),
      helper: "Entre empresas, recreadores e hotéis",
    },
    {
      title: "Perfis verificados",
      value: String(companies.filter((company) => company.verified).length),
      helper: "Com documentação revisada",
    },
    { title: "Resposta rápida", value: "21", helper: "Retorno em até 2 horas" },
    { title: "Comparações da semana", value: "07", helper: "Feitas pela família" },
  ],
  cityFilters,
  serviceFilters,
  companies,
  guidanceChecklist: [
    "Confira se a faixa etária atendida bate com o perfil das crianças.",
    "Compare escopo por tipo de fornecedor: empresa, recreador autônomo ou hotel parceiro.",
    "Priorize perfis verificados para reduzir risco de troca de equipe no dia do evento.",
    "Salve até 3 favoritos para montar uma shortlist antes da decisão final.",
  ],
  shortcuts: [
    {
      label: "Abrir favoritos",
      helper: "Monte sua seleção final para comparar propostas.",
      to: "/app/pais/favoritos",
    },
    {
      label: "Comparar no mapa",
      helper: "Valide distância e cobertura por região da família.",
      to: "/app/pais/mapa",
    },
    {
      label: "Ir para agenda",
      helper: "Organize as datas e prazos para fechar a contratação.",
      to: "/app/pais/agenda",
    },
  ],
};
