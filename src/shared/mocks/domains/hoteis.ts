export interface HotelDomainEntity {
  id: string;
  name: string;
  city: string;
  state: string;
  locationLabel: string;
  category: "Resort" | "Hotel" | "Pousada";
  description: string;
  image: string;
  rating: number;
  reviews: number;
  structure: string[];
  contactName: string;
  contactRole: string;
}

const hoteisDomainList: HotelDomainEntity[] = [
  {
    id: "hotel-cyan-resort",
    name: "Cyan Resort by Atlantica",
    city: "São Paulo",
    state: "SP",
    locationLabel: "São Paulo - SP",
    category: "Resort",
    description: "Resort familiar com programacao diaria e grande fluxo de criancas.",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/285193572.jpg?k=b072a6646fc6f8d7677b48e265354058fa02bc5fc8fedd9a3d824859f1decdc9&o=&hp=1",
    rating: 4.9,
    reviews: 412,
    structure: ["Piscina infantil", "Kids club", "Espaco família", "Auditorio"],
    contactName: "Marina Costa",
    contactRole: "Coordenadora de lazer",
  },
  {
    id: "hotel-royal-palm-plaza",
    name: "Royal Palm Plaza Resort Campinas",
    city: "Campinas",
    state: "SP",
    locationLabel: "Campinas - SP",
    category: "Resort",
    description: "Operação completa em alta temporada com foco em famílias.",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/19364498.jpg?k=94ade9228c42bd4282b471ae07bbc130b79acc99818e8700e77f6cea7c69cd3f&o=&hp=1",
    rating: 4.8,
    reviews: 366,
    structure: ["Piscinas", "Teatro", "Área kids", "Espaco gastronomico"],
    contactName: "Ricardo Mota",
    contactRole: "Gerente de recreação",
  },
  {
    id: "hotel-grande-sao-pedro",
    name: "Grande Hotel São Pedro",
    city: "Aguas de São Pedro",
    state: "SP",
    locationLabel: "Aguas de São Pedro - SP",
    category: "Hotel",
    description: "Hotel tradicional com projetos para diferentes faixas etarias.",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/36338742.jpg?k=08df9f6979322c8c62c79ae0f5beffaef980f64bf1f65f3d0c40541c71a69a0a&o=&hp=1",
    rating: 4.7,
    reviews: 241,
    structure: ["Sala de jogos", "Espaco infantil", "Campo aberto"],
    contactName: "Juliana Rocha",
    contactRole: "Supervisora de lazer",
  },
  {
    id: "hotel-resort-aguas",
    name: "Resort das Aguas",
    city: "Angra dos Reis",
    state: "RJ",
    locationLabel: "Angra dos Reis - RJ",
    category: "Resort",
    description: "Ambiente premium para recreação aquatica e equipes sazonais.",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/263154452.jpg?k=d3f289e10b1d0c8208822b1576513c6f3668be29e6b0c3e839cc3e474eefd135&o=&hp=1",
    rating: 4.7,
    reviews: 198,
    structure: ["Parque aquatico", "Kids club", "Sala multimidia"],
    contactName: "Pedro Lima",
    contactRole: "Coordenador de atividades",
  },
  {
    id: "hotel-fazenda-boa-vista",
    name: "Hotel Fazenda Boa Vista",
    city: "Atibaia",
    state: "SP",
    locationLabel: "Atibaia - SP",
    category: "Hotel",
    description: "Programacao infantil em ambiente rural e lazer familiar.",
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1600&auto=format&fit=crop",
    rating: 4.6,
    reviews: 150,
    structure: ["Área verde", "Brinquedoteca", "Trilhas guiadas"],
    contactName: "Ana Silva",
    contactRole: "Gestora de experiências",
  },
  {
    id: "hotel-pousada-recanto-verde",
    name: "Pousada Recanto Verde",
    city: "Campos do Jordao",
    state: "SP",
    locationLabel: "Campos do Jordao - SP",
    category: "Pousada",
    description: "Operações menores com calendario frequente de atividades.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop",
    rating: 4.5,
    reviews: 122,
    structure: ["Espaco coberto", "Sala de apoio", "Lazer ao ar livre"],
    contactName: "Carla Menezes",
    contactRole: "Supervisora de atendimento",
  },
  {
    id: "hotel-pousada-vista-mar",
    name: "Pousada Vista Mar",
    city: "Santos",
    state: "SP",
    locationLabel: "Santos - SP",
    category: "Pousada",
    description: "Unidade litoranea com calendario frequente para finais de semana e feriados.",
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 134,
    structure: ["Sala kids", "Deck externo", "Área de convivio"],
    contactName: "Carla Mendes",
    contactRole: "Coordenadora de lazer",
  },
  {
    id: "hotel-resort-costa-verde",
    name: "Resort Costa Verde",
    city: "Guaruja",
    state: "SP",
    locationLabel: "Guaruja - SP",
    category: "Resort",
    description: "Resort de médio porte com alta demanda em temporadas e feriados prolongados.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1600&auto=format&fit=crop",
    rating: 4.6,
    reviews: 176,
    structure: ["Piscina", "Espaco de jogos", "Sala de oficinas"],
    contactName: "Marcelo Faria",
    contactRole: "Supervisor de hospedagem",
  },
  {
    id: "hotel-atlantico",
    name: "Hotel Atlantico",
    city: "Santos",
    state: "SP",
    locationLabel: "Santos - SP",
    category: "Hotel",
    description: "Hotel urbano com programacao de fim de semana para famílias e grupos.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop",
    rating: 4.5,
    reviews: 109,
    structure: ["Sala de recreação", "Lobby kids", "Área gourmet"],
    contactName: "Bruno Castro",
    contactRole: "Gerente de eventos",
  },
  {
    id: "hotel-encanto-family",
    name: "Hotel Encanto Family Resort",
    city: "Campinas",
    state: "SP",
    locationLabel: "Campinas - SP",
    category: "Resort",
    description: "Estrutura de lazer completa para famílias com equipes de recreação dedicadas.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1600&auto=format&fit=crop",
    rating: 4.6,
    reviews: 87,
    structure: ["Kids club", "Piscina aquecida", "Sala de jogos"],
    contactName: "Isabela Rocha",
    contactRole: "Gerente de experiências",
  },
  {
    id: "hotel-maresias-resort-spa",
    name: "Hotel Maresias Resort & Spa",
    city: "São Sebastiao",
    state: "SP",
    locationLabel: "São Sebastiao - SP",
    category: "Resort",
    description: "Resort beira-mar com operação de lazer para criancas, jovens e famílias.",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 290,
    structure: ["Piscinas", "Quadras", "Espaco kids", "Auditorio"],
    contactName: "Mariana Leite",
    contactRole: "Gerente geral",
  },
];

export const hoteisDomainMock = hoteisDomainList;

export const hoteisDomainById = Object.fromEntries(
  hoteisDomainList.map((hotel) => [hotel.id, hotel]),
) as Record<string, HotelDomainEntity>;

export const getHotelDomainById = (id: string) => hoteisDomainById[id];

export const getHoteisDomainByIds = (ids: string[]) =>
  ids.map((id) => hoteisDomainById[id]).filter((hotel): hotel is HotelDomainEntity => Boolean(hotel));
