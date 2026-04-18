export type RecreadorAvailabilityStatus = "Disponível" | "Ocupada";

export interface RecreadorDomainEntity {
  id: string;
  fullName: string;
  artisticName: string;
  role: string;
  experienceLabel: string;
  city: string;
  state: string;
  locationLabel: string;
  coverageLabel: string;
  bio: string;
  specialties: string[];
  email: string;
  phone: string;
  rating: number;
  availability: RecreadorAvailabilityStatus;
  lastWorkDate: string;
}

export interface RecreadorCertificationDomainEntity {
  id: string;
  recreadorId: string;
  title: string;
  institution: string;
  year: number;
  status?: string;
  validity?: string;
}

export interface RecreadorFeedbackDomainEntity {
  id: string;
  recreadorId: string;
  author: string;
  role: string;
  rating: number;
  message: string;
  dateLabel: string;
}

export interface RecreadorSummaryDomainEntity {
  id: string;
  name: string;
  artisticName: string;
  rating: number;
  location: string;
  experience: string;
  bio: string;
  specialties: string[];
  availability: RecreadorAvailabilityStatus;
  lastWork: string;
}

const recreadoresDomainList: RecreadorDomainEntity[] = [
  {
    id: "rec-rafael-santos",
    fullName: "Rafael Santos",
    artisticName: "Rafa Smile",
    role: "Recreador profissional",
    experienceLabel: "7 anos de experiência",
    city: "São Paulo",
    state: "SP",
    locationLabel: "São Paulo - SP",
    coverageLabel: "Atuação em até 30 km",
    bio: "Recreador com experiência em resorts e hotéis familiares, com foco em segurança, acolhimento e alta energia nas atividades.",
    specialties: [
      "Recreação infantil",
      "Recreação aquática",
      "Eventos temáticos",
      "Gincanas e competições",
      "Jogos cooperativos",
    ],
    email: "rafael.santos@email.com",
    phone: "(11) 99999-1234",
    rating: 4.8,
    availability: "Disponível",
    lastWorkDate: "15 Jan 2026",
  },
  {
    id: "rec-carlos-eduardo",
    fullName: "Carlos Eduardo Nunes",
    artisticName: "Carlinhos Edu",
    role: "Lider de recreação e eventos",
    experienceLabel: "6 anos de operação em resorts",
    city: "Campinas",
    state: "SP",
    locationLabel: "Campinas - SP",
    coverageLabel: "Atuação em Campinas e região",
    bio: "Especialista em programação para famílias, coordenação de equipes e operação de atividades sazonais.",
    specialties: [
      "Coordenação de equipes",
      "Programação para famílias",
      "Atividades esportivas",
      "Eventos noturnos",
      "Treinamento operacional",
    ],
    email: "carlos.eduardo@email.com",
    phone: "(19) 98888-4455",
    rating: 4.9,
    availability: "Disponível",
    lastWorkDate: "09 Fev 2026",
  },
  {
    id: "rec-ana-silva",
    fullName: "Ana Silva",
    artisticName: "Ana S",
    role: "Recreadora sênior",
    experienceLabel: "5 anos de experiência",
    city: "São Paulo",
    state: "SP",
    locationLabel: "São Paulo - SP",
    coverageLabel: "Capital e litoral paulista",
    bio: "Especialista em criação de atividades lúdicas e oficinas para diferentes faixas etárias.",
    specialties: ["Atividades lúdicas", "Oficinas criativas", "Recreação infantil"],
    email: "ana.silva@email.com",
    phone: "(11) 97777-3300",
    rating: 4.9,
    availability: "Disponível",
    lastWorkDate: "03 Mar 2026",
  },
  {
    id: "rec-carlos-santos",
    fullName: "Carlos Santos",
    artisticName: "Carlos S",
    role: "Coordenador de equipe",
    experienceLabel: "4 anos de experiência",
    city: "São Paulo",
    state: "SP",
    locationLabel: "São Paulo - SP",
    coverageLabel: "Interior e capital",
    bio: "Atua com planejamento de escala, suporte em campo e liderança operacional.",
    specialties: ["Gestão de equipe", "Eventos corporativos", "Escalas"],
    email: "carlos.santos@email.com",
    phone: "(11) 96666-2211",
    rating: 4.7,
    availability: "Ocupada",
    lastWorkDate: "28 Fev 2026",
  },
  {
    id: "rec-marina-costa",
    fullName: "Marina Costa",
    artisticName: "Marina C",
    role: "Recreadora",
    experienceLabel: "3 anos de experiência",
    city: "Campinas",
    state: "SP",
    locationLabel: "Campinas - SP",
    coverageLabel: "Campinas e circuito das águas",
    bio: "Foco em recreação para público infantil e eventos de fim de semana.",
    specialties: ["Recreação infantil", "Gincanas", "Teatro infantil"],
    email: "marina.costa@email.com",
    phone: "(19) 95555-1444",
    rating: 4.6,
    availability: "Disponível",
    lastWorkDate: "16 Fev 2026",
  },
  {
    id: "rec-pedro-lima",
    fullName: "Pedro Lima",
    artisticName: "Pedro L",
    role: "Monitor recreativo",
    experienceLabel: "2 anos de experiência",
    city: "Santos",
    state: "SP",
    locationLabel: "Santos - SP",
    coverageLabel: "Baixada santista",
    bio: "Monitor voltado para atividades de praia, integração e dinâmicas em grupo.",
    specialties: ["Atividades ao ar livre", "Integração", "Dinâmicas em grupo"],
    email: "pedro.lima@email.com",
    phone: "(13) 94444-7788",
    rating: 4.5,
    availability: "Disponível",
    lastWorkDate: "20 Fev 2026",
  },
  {
    id: "rec-juliana-rocha",
    fullName: "Juliana Rocha",
    artisticName: "Juju Rocha",
    role: "Recreadora aquática",
    experienceLabel: "5 anos de experiência",
    city: "Guaruja",
    state: "SP",
    locationLabel: "Guarujá - SP",
    coverageLabel: "Litoral e interior",
    bio: "Especialista em atividades aquáticas e segurança para crianças em ambientes de piscina.",
    specialties: ["Recreação aquática", "Segurança em piscina", "Atividades para famílias"],
    email: "juliana.rocha@email.com",
    phone: "(13) 93333-5566",
    rating: 4.9,
    availability: "Disponível",
    lastWorkDate: "25 Fev 2026",
  },
  {
    id: "rec-fernanda-lopes",
    fullName: "Fernanda Lopes",
    artisticName: "Fefa Lopes",
    role: "Recreadora",
    experienceLabel: "4 anos de experiência",
    city: "São Paulo",
    state: "SP",
    locationLabel: "São Paulo - SP",
    coverageLabel: "Capital e grande SP",
    bio: "Atua em eventos infantis e experiências temáticas com foco em engajamento do público.",
    specialties: ["Eventos temáticos", "Animação infantil", "Gincanas"],
    email: "fernanda.lopes@email.com",
    phone: "(11) 92222-3344",
    rating: 4.8,
    availability: "Disponível",
    lastWorkDate: "12 Fev 2026",
  },
  {
    id: "rec-rafael-matos",
    fullName: "Rafael Matos",
    artisticName: "Rafa Matos",
    role: "Recreador líder",
    experienceLabel: "5 anos de experiência",
    city: "Campinas",
    state: "SP",
    locationLabel: "Campinas - SP",
    coverageLabel: "Campinas e interior",
    bio: "Conduz escalas em eventos de médio porte e integra times de alta temporada.",
    specialties: ["Liderança de equipe", "Operação em resort", "Programação mista"],
    email: "rafael.matos@email.com",
    phone: "(19) 91111-2233",
    rating: 4.7,
    availability: "Ocupada",
    lastWorkDate: "18 Fev 2026",
  },
  {
    id: "rec-bianca-souza",
    fullName: "Bianca Souza",
    artisticName: "Bia Souza",
    role: "Recreadora",
    experienceLabel: "3 anos de experiência",
    city: "Santos",
    state: "SP",
    locationLabel: "Santos - SP",
    coverageLabel: "Litoral paulista",
    bio: "Especialista em acolhimento de famílias e oficinas artísticas para crianças.",
    specialties: ["Oficinas artísticas", "Atendimento familiar", "Recreação infantil"],
    email: "bianca.souza@email.com",
    phone: "(13) 90000-7788",
    rating: 4.6,
    availability: "Disponível",
    lastWorkDate: "27 Fev 2026",
  },
];

export const recreadoresDomainById = Object.fromEntries(
  recreadoresDomainList.map((recreador) => [recreador.id, recreador]),
) as Record<string, RecreadorDomainEntity>;

export const recreadoresDomainMock = recreadoresDomainList;

export const recreadorCertificationsDomainMock: RecreadorCertificationDomainEntity[] = [
  {
    id: "cert-primeiros-socorros-rafael",
    recreadorId: "rec-rafael-santos",
    title: "Primeiros Socorros",
    institution: "Cruz Vermelha Brasileira",
    year: 2024,
    status: "Valido",
    validity: "Validade até 2026",
  },
  {
    id: "cert-gestao-equipes-rafael",
    recreadorId: "rec-rafael-santos",
    title: "Gestão de Equipes de Lazer",
    institution: "SENAC",
    year: 2023,
    status: "Valido",
    validity: "Validade até 2027",
  },
  {
    id: "cert-animacao-cultural-carlos",
    recreadorId: "rec-carlos-eduardo",
    title: "Animação Cultural em Resorts",
    institution: "Instituto de Hospitalidade",
    year: 2022,
  },
  {
    id: "cert-seguranca-atividades-carlos",
    recreadorId: "rec-carlos-eduardo",
    title: "Segurança em Atividades Recreativas",
    institution: "SENAC",
    year: 2021,
  },
  {
    id: "cert-recreacao-aquatica-juliana",
    recreadorId: "rec-juliana-rocha",
    title: "Recreação Aquática",
    institution: "Academia Aquática Brasil",
    year: 2024,
  },
];

export const recreadorFeedbackDomainMock: RecreadorFeedbackDomainEntity[] = [
  {
    id: "feedback-rafael-1",
    recreadorId: "rec-rafael-santos",
    author: "Patricia Mendes",
    role: "Coordenadora de eventos",
    rating: 5,
    message: "Entregou dinâmicas com alta energia e excelente relação com as famílias.",
    dateLabel: "10 Fev 2026",
  },
  {
    id: "feedback-rafael-2",
    recreadorId: "rec-rafael-santos",
    author: "Lucas Andrade",
    role: "Supervisor operacional",
    rating: 4,
    message: "Pontual, organizado e com boa leitura de público durante as atividades.",
    dateLabel: "30 Jan 2026",
  },
  {
    id: "feedback-carlos-1",
    recreadorId: "rec-carlos-eduardo",
    author: "Renata Gomes",
    role: "Gerente de operações",
    rating: 5,
    message: "Excelente liderança em campo e alta aderência ao padrão operacional.",
    dateLabel: "22 Jan 2026",
  },
  {
    id: "feedback-carlos-2",
    recreadorId: "rec-carlos-eduardo",
    author: "Mauricio Lopes",
    role: "Coordenador de lazer",
    rating: 4,
    message: "Boa comunicação com equipe e participação ativa no planejamento.",
    dateLabel: "18 Jan 2026",
  },
];

export const getRecreadorDomainById = (id: string) => recreadoresDomainById[id];

export const getRecreadoresDomainByIds = (ids: string[]) =>
  ids
    .map((id) => recreadoresDomainById[id])
    .filter((recreador): recreador is RecreadorDomainEntity => Boolean(recreador));

export const getRecreadorCertifications = (recreadorId: string) =>
  recreadorCertificationsDomainMock.filter((certification) => certification.recreadorId === recreadorId);

export const getRecreadorFeedbacks = (recreadorId: string) =>
  recreadorFeedbackDomainMock.filter((feedback) => feedback.recreadorId === recreadorId);

export const toRecreadorSummary = (recreador: RecreadorDomainEntity): RecreadorSummaryDomainEntity => ({
  id: recreador.id,
  name: recreador.fullName,
  artisticName: recreador.artisticName,
  rating: recreador.rating,
  location: `${recreador.city}, ${recreador.state}`,
  experience: recreador.experienceLabel,
  bio: recreador.bio,
  specialties: recreador.specialties,
  availability: recreador.availability,
  lastWork: recreador.lastWorkDate,
});

export const getRecreadorSummariesByIds = (ids: string[]) =>
  getRecreadoresDomainByIds(ids).map(toRecreadorSummary);
