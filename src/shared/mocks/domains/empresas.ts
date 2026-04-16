export interface EmpresaDomainEntity {
  id: string;
  displayName: string;
  legalName: string;
  cnpj: string;
  city: string;
  state: string;
  neighborhood: string;
  rating: number;
  reviews: number;
  verified: boolean;
  priceRange: string;
  description: string;
  specialties: string[];
  nextSlots: string[];
  coverageLabel: string;
  contactPhone: string;
  contactEmail: string;
  website: string;
}

const empresasDomainList: EmpresaDomainEntity[] = [
  {
    id: "emp-recreacao-diversao-total",
    displayName: "Recreação & Diversao Total",
    legalName: "Recreação e Diversao Total LTDA",
    cnpj: "12.345.678/0001-90",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Vila Mariana",
    rating: 4.9,
    reviews: 128,
    verified: true,
    priceRange: "A partir de R$ 850",
    description: "Equipe completa para festas infantis, eventos escolares e recreação em condominio.",
    specialties: ["Festas infantis", "Monitores para eventos", "Oficinas criativas"],
    nextSlots: ["Sabado manha", "Domingo tarde", "Quarta noite"],
    coverageLabel: "Capital e grande São Paulo",
    contactPhone: "(11) 4002-0900",
    contactEmail: "contato@recreacaodiversao.com.br",
    website: "www.recreacaodiversao.com.br",
  },
  {
    id: "emp-mundo-da-crianca",
    displayName: "Mundo da Crianca Eventos",
    legalName: "Mundo da Crianca Eventos LTDA",
    cnpj: "98.765.432/0001-11",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Moema",
    rating: 4.7,
    reviews: 94,
    verified: true,
    priceRange: "A partir de R$ 920",
    description: "Empresa especializada em eventos infantis personalizados e recreação para escolas.",
    specialties: ["Eventos escolares", "Oficinas artisticas", "Animacao tematica"],
    nextSlots: ["Sexta tarde", "Sabado noite"],
    coverageLabel: "Capital e ABC",
    contactPhone: "(11) 3555-0808",
    contactEmail: "atendimento@mundodacrianca.com.br",
    website: "www.mundodacrianca.com.br",
  },
  {
    id: "emp-show-kids-experience",
    displayName: "Show Kids Experience",
    legalName: "Show Kids Experience LTDA",
    cnpj: "66.555.444/0001-22",
    city: "Campinas",
    state: "SP",
    neighborhood: "Taquaral",
    rating: 4.8,
    reviews: 76,
    verified: true,
    priceRange: "A partir de R$ 780",
    description: "Operação para aniversarios premium, eventos corporativos familiares e feriados prolongados.",
    specialties: ["Eventos premium", "Programacao em resorts", "Pacotes de temporada"],
    nextSlots: ["Domingo manha", "Segunda tarde"],
    coverageLabel: "Campinas e regiao",
    contactPhone: "(19) 3777-2233",
    contactEmail: "contato@showkids.com.br",
    website: "www.showkids.com.br",
  },
];

export const empresasDomainMock = empresasDomainList;

export const empresasDomainById = Object.fromEntries(
  empresasDomainList.map((empresa) => [empresa.id, empresa]),
) as Record<string, EmpresaDomainEntity>;

export const getEmpresaDomainById = (id: string) => empresasDomainById[id];

export const getEmpresasDomainByIds = (ids: string[]) =>
  ids.map((id) => empresasDomainById[id]).filter((empresa): empresa is EmpresaDomainEntity => Boolean(empresa));
