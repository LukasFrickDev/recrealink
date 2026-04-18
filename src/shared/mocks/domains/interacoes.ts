import { empresasDomainById } from "@/shared/mocks/domains/empresas";
import { hoteisDomainById } from "@/shared/mocks/domains/hoteis";
import { recreadoresDomainById } from "@/shared/mocks/domains/recreadores";

export type ProviderRefKind = "empresa" | "hotel" | "recreador";

export interface ProviderRef {
  kind: ProviderRefKind;
  id: string;
}

export interface ProviderCatalogDomainEntity {
  id: string;
  provider: ProviderRef;
  providerType: "Empresa" | "Recreador autonomo" | "Hotel parceiro";
  neighborhood: string;
  rating: number;
  reviews: number;
  verified: boolean;
  priceRange: string;
  description: string;
  specialties: string[];
  nextSlots: string[];
  displayNameOverride?: string;
}

export interface FavoritoDomainEntity {
  id: string;
  provider: ProviderRef;
  lastContact: string;
  nextAvailability: string;
}

export interface HistoricoEventoDomainEntity {
  id: string;
  provider: ProviderRef;
  title: string;
  when: string;
  duration: string;
  audience: string;
  rating: number;
  amount: string;
  photos: number;
  notes: string;
  locationOverride?: string;
}

export interface AvaliacaoPendenteDomainEntity {
  id: string;
  provider: ProviderRef;
  event: string;
  deadline: string;
}

export interface AvaliacaoPublicadaDomainEntity {
  id: string;
  provider: ProviderRef;
  event: string;
  status: "Publicado" | "Rascunho";
  date: string;
  score: number;
  comment: string;
  likes: number;
  helpfulCount: number;
}

export interface AgendaEventoDomainEntity {
  id: string;
  provider: ProviderRef;
  title: string;
  date: string;
  period: string;
  location: string;
  attendees: string;
  budget: string;
  status: "Confirmado" | "Pendente";
  note: string;
}

export interface AgendaEventoConcluidoDomainEntity {
  id: string;
  provider: ProviderRef;
  title: string;
  when: string;
  result: string;
}

const isDefined = <T>(value: T | null): value is T => value !== null;

const getProviderKey = (provider: ProviderRef) => `${provider.kind}:${provider.id}`;

export const toPrimaryCityLabel = (cityLabel: string) => cityLabel.split(",")[0]?.trim() ?? cityLabel;

export const toChipCityLabel = (cityLabel: string) => cityLabel.replace(",", " •");

export const toRatingLabel = (rating: number) => rating.toFixed(1).replace(".", ",");

const resolveProviderNameAndCity = (provider: ProviderRef) => {
  if (provider.kind === "empresa") {
    const empresa = empresasDomainById[provider.id];
    if (!empresa) {
      return null;
    }

    return {
      name: empresa.displayName,
      city: `${empresa.city}, ${empresa.state}`,
    };
  }

  if (provider.kind === "hotel") {
    const hotel = hoteisDomainById[provider.id];
    if (!hotel) {
      return null;
    }

    return {
      name: hotel.name,
      city: `${hotel.city}, ${hotel.state}`,
    };
  }

  const recreador = recreadoresDomainById[provider.id];
  if (!recreador) {
    return null;
  }

  return {
    name: recreador.fullName,
    city: `${recreador.city}, ${recreador.state}`,
  };
};

const providerCatalogDomainList: ProviderCatalogDomainEntity[] = [
  {
    id: "catalog-empresa-principal",
    provider: { kind: "empresa", id: "emp-recreacao-diversao-total" },
    providerType: "Empresa",
    neighborhood: "Vila Mariana",
    rating: 4.9,
    reviews: 128,
    verified: true,
    priceRange: "A partir de R$ 850",
    description: "Equipe completa para festas infantis, eventos escolares e recreação em condomínio.",
    specialties: ["Festas infantis", "Monitores para eventos", "Oficinas criativas"],
    nextSlots: ["Sábado manhã", "Domingo à tarde", "Quarta à noite"],
  },
  {
    id: "catalog-recreador-autonomo",
    provider: { kind: "recreador", id: "rec-rafael-matos" },
    providerType: "Recreador autonomo",
    neighborhood: "Cambuí",
    rating: 4.8,
    reviews: 57,
    verified: true,
    priceRange: "Pacotes a partir de R$ 420",
    description: "Profissional autônomo com foco em festas, condomínio e pequenas temporadas.",
    specialties: ["Recreação infantil", "Gincanas", "Atividades para famílias"],
    nextSlots: ["Sábado à tarde", "Segunda manhã"],
    displayNameOverride: "Rafa Kids Recreação",
  },
  {
    id: "catalog-hotel-parceiro",
    provider: { kind: "hotel", id: "hotel-encanto-family" },
    providerType: "Hotel parceiro",
    neighborhood: "Distrito de Barão Geraldo",
    rating: 4.6,
    reviews: 87,
    verified: false,
    priceRange: "Sob consulta",
    description: "Hotel com equipe interna e parceiros para temporadas de alta demanda.",
    specialties: ["Pacotes de feriado", "Eventos em resort", "Operação de fim de semana"],
    nextSlots: ["Quinta à noite", "Domingo manhã"],
  },
];

const catalogViewByProviderKey = Object.fromEntries(
  providerCatalogDomainList.map((entry) => {
    const providerData = resolveProviderNameAndCity(entry.provider);
    const providerName = entry.displayNameOverride ?? providerData?.name ?? "Fornecedor";
    const providerCity = providerData?.city ?? "Cidade não informada";

    return [
      getProviderKey(entry.provider),
      {
        id: entry.id,
        provider: entry.provider,
        name: providerName,
        city: providerCity,
        providerType: entry.providerType,
        neighborhood: entry.neighborhood,
        rating: entry.rating,
        reviews: entry.reviews,
        verified: entry.verified,
        priceRange: entry.priceRange,
        description: entry.description,
        specialties: entry.specialties,
        nextSlots: entry.nextSlots,
      },
    ];
  }),
);

export const paisProvidersCatalogDomainMock = Object.values(catalogViewByProviderKey);

const favoritesDomainList: FavoritoDomainEntity[] = [
  {
    id: "fav-empresa-principal",
    provider: { kind: "empresa", id: "emp-recreacao-diversao-total" },
    lastContact: "Último contato: ontem, 18h",
    nextAvailability: "Disponibilidade: sábado e domingo",
  },
  {
    id: "fav-recreador-autonomo",
    provider: { kind: "recreador", id: "rec-rafael-matos" },
    lastContact: "Último contato: há 2 dias",
    nextAvailability: "Disponibilidade: segunda e quarta",
  },
  {
    id: "fav-hotel-parceiro",
    provider: { kind: "hotel", id: "hotel-encanto-family" },
    lastContact: "Último contato: hoje, 09h",
    nextAvailability: "Disponibilidade: quinta e sexta",
  },
];

export const paisFavoritesDomainMock = favoritesDomainList
  .map((favorite) => {
    const catalogItem = catalogViewByProviderKey[getProviderKey(favorite.provider)];
    if (!catalogItem) {
      return null;
    }

    return {
      id: favorite.id,
      name: catalogItem.name,
      city: catalogItem.city,
      rating: catalogItem.rating,
      reviews: catalogItem.reviews,
      priceRange: catalogItem.priceRange,
      specialties: catalogItem.specialties,
      lastContact: favorite.lastContact,
      nextAvailability: favorite.nextAvailability,
    };
  })
  .filter(isDefined);

const historicoEventosDomainList: HistoricoEventoDomainEntity[] = [
  {
    id: "hist-festa-julia",
    provider: { kind: "empresa", id: "emp-recreacao-diversao-total" },
    title: "Festa de aniversário da Julia",
    when: "15 jan 2026",
    duration: "4 horas",
    audience: "25 convidados",
    rating: 5,
    amount: "R$ 1.850",
    photos: 42,
    notes: "Equipe pontual, excelente interação com crianças e cronograma cumprido.",
  },
  {
    id: "hist-colonia-ferias",
    provider: { kind: "hotel", id: "hotel-encanto-family" },
    title: "Colônia de férias de inverno",
    when: "03 jan 2026",
    duration: "6 horas",
    audience: "40 participantes",
    rating: 4,
    amount: "R$ 2.400",
    photos: 58,
    notes: "Boa organização geral, com necessidade de reforço na comunicação final.",
    locationOverride: "Campinas - SP",
  },
  {
    id: "hist-evento-condominio",
    provider: { kind: "empresa", id: "emp-show-kids-experience" },
    title: "Evento no condomínio Primavera",
    when: "18 dez 2025",
    duration: "3 horas",
    audience: "18 crianças",
    rating: 5,
    amount: "R$ 1.200",
    photos: 27,
    notes: "Atendimento muito elogiado pelas famílias e alta taxa de recomendação.",
    locationOverride: "Campinas - SP",
  },
];

export const paisHistoricoEventsDomainMock = historicoEventosDomainList
  .map((event) => {
    const provider = resolveProviderNameAndCity(event.provider);
    if (!provider) {
      return null;
    }

    return {
      id: event.id,
      title: event.title,
      company: provider.name,
      when: event.when,
      location: event.locationOverride ?? provider.city,
      duration: event.duration,
      audience: event.audience,
      amount: event.amount,
      rating: event.rating,
      notes: event.notes,
      photos: event.photos,
    };
  })
  .filter(isDefined);

export const paisHistoricoHighlightsDomainMock = [
  {
    title: "Eventos finalizados",
    value: "34",
    helper: "12 meses de histórico consolidado",
  },
  {
    title: "Média de satisfação",
    value: "4,8",
    helper: "Com base nas últimas avaliações",
  },
  {
    title: "Empresas recorrentes",
    value: "6",
    helper: "Parceiros com duas ou mais contratações",
  },
];

const avaliacoesPendentesDomainList: AvaliacaoPendenteDomainEntity[] = [
  {
    id: "pendente-julia",
    provider: { kind: "empresa", id: "emp-recreacao-diversao-total" },
    event: "Festa da Julia",
    deadline: "Prazo até 20 jan 2026",
  },
  {
    id: "pendente-colonia",
    provider: { kind: "hotel", id: "hotel-encanto-family" },
    event: "Colônia de férias",
    deadline: "Prazo até 25 jan 2026",
  },
];

export const paisPendingReviewsDomainMock = avaliacoesPendentesDomainList
  .map((review) => {
    const provider = resolveProviderNameAndCity(review.provider);
    if (!provider) {
      return null;
    }

    return {
      id: review.id,
      event: review.event,
      company: provider.name,
      deadline: review.deadline,
    };
  })
  .filter(isDefined);

const avaliacoesPublicadasDomainList: AvaliacaoPublicadaDomainEntity[] = [
  {
    id: "review-julia",
    provider: { kind: "empresa", id: "emp-recreacao-diversao-total" },
    event: "Festa da Julia",
    status: "Publicado",
    date: "16 jan 2026",
    score: 5,
    comment: "Equipe muito atenciosa, atividades dinâmicas e excelente organização do tempo.",
    likes: 23,
    helpfulCount: 18,
  },
  {
    id: "review-colonia",
    provider: { kind: "hotel", id: "hotel-encanto-family" },
    event: "Colônia de férias",
    status: "Rascunho",
    date: "04 jan 2026",
    score: 4,
    comment: "Boa experiência geral, com oportunidade de melhorar a comunicação no encerramento.",
    likes: 8,
    helpfulCount: 5,
  },
  {
    id: "review-condominio",
    provider: { kind: "empresa", id: "emp-show-kids-experience" },
    event: "Evento no condominio Primavera",
    status: "Publicado",
    date: "19 dez 2025",
    score: 5,
    comment: "Atividades criativas e interação excelente com crianças de diferentes idades.",
    likes: 14,
    helpfulCount: 11,
  },
];

export const paisPublishedReviewsDomainMock = avaliacoesPublicadasDomainList
  .map((review) => {
    const provider = resolveProviderNameAndCity(review.provider);
    if (!provider) {
      return null;
    }

    return {
      id: review.id,
      event: review.event,
      company: provider.name,
      status: review.status,
      date: review.date,
      score: review.score,
      comment: review.comment,
      likes: review.likes,
      helpfulCount: review.helpfulCount,
    };
  })
  .filter(isDefined);

const agendaEventosDomainList: AgendaEventoDomainEntity[] = [
  {
    id: "agenda-reuniao-proposta",
    provider: { kind: "empresa", id: "emp-recreacao-diversao-total" },
    title: "Reunião de proposta final",
    date: "Ter, 19 mar",
    period: "19h às 20h",
    location: "Videochamada",
    attendees: "Pais + coordenação",
    budget: "Faixa R$ 1.800 - R$ 2.500",
    status: "Confirmado",
    note: "Revisar cronograma, equipe e plano de contingência antes da aprovação final.",
  },
  {
    id: "agenda-visita-tecnica",
    provider: { kind: "hotel", id: "hotel-encanto-family" },
    title: "Visita técnica no local",
    date: "Qui, 21 mar",
    period: "10h às 11h30",
    location: "Campinas - SP",
    attendees: "Família + operação",
    budget: "Sem custo",
    status: "Pendente",
    note: "Validar estrutura para recreação e pontos de apoio para crianças.",
  },
  {
    id: "agenda-call-alinhamento",
    provider: { kind: "recreador", id: "rec-rafael-matos" },
    title: "Call de alinhamento da equipe",
    date: "Sex, 22 mar",
    period: "18h as 18h45",
    location: "Online",
    attendees: "Pais + recreador",
    budget: "Sem custo",
    status: "Confirmado",
    note: "Definir dinâmicas por faixa etária e materiais necessários.",
  },
];

export const paisUpcomingAgendaDomainMock = agendaEventosDomainList
  .map((event) => {
    const provider = resolveProviderNameAndCity(event.provider);
    if (!provider) {
      return null;
    }

    return {
      id: event.id,
      title: event.title,
      company: provider.name,
      date: event.date,
      period: event.period,
      location: event.location,
      attendees: event.attendees,
      budget: event.budget,
      status: event.status,
      note: event.note,
    };
  })
  .filter(isDefined);

const agendaConcluidaDomainList: AgendaEventoConcluidoDomainEntity[] = [
  {
    id: "agenda-ok-1",
    provider: { kind: "empresa", id: "emp-recreacao-diversao-total" },
    title: "Fechamento de contrato",
    when: "08 mar",
    result: "Contrato aprovado e sinal pago",
  },
  {
    id: "agenda-ok-2",
    provider: { kind: "empresa", id: "emp-show-kids-experience" },
    title: "Avaliação de proposta",
    when: "01 mar",
    result: "Escopo ajustado para 3h de evento",
  },
];

export const paisCompletedAgendaDomainMock = agendaConcluidaDomainList
  .map((event) => {
    const provider = resolveProviderNameAndCity(event.provider);
    if (!provider) {
      return null;
    }

    return {
      id: event.id,
      title: event.title,
      company: provider.name,
      when: event.when,
      result: event.result,
    };
  })
  .filter(isDefined);
