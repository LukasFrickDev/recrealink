import {
  convitesDomainMock,
  getHoteisDomainByIds,
  hoteisDomainById,
  oportunidadesDomainMock,
} from "@/shared/mocks/domains";

export type HoteisTabId = "atuados" | "vagas" | "convites";

export interface HotelHistoryItem {
  id: string;
  nome: string;
  cidade: string;
  categoria: string;
  imagem: string;
  avaliacaoHotel: number;
  avaliacaoRecreador: number;
  status: "ativo" | "inativo";
  ultimoTrabalho: string;
  totalTrabalhos: number;
  estrutura: string[];
  contatoNome: string;
  contatoCargo: string;
}

export interface HotelVagaItem {
  id: string;
  hotel: string;
  cidade: string;
  categoria: string;
  imagem: string;
  valorDiaria: string;
  periodo: string;
  vagas: number;
  urgencia: "normal" | "urgente";
  tags: string[];
}

export interface HotelConviteItem {
  id: string;
  hotel: string;
  cidade: string;
  dataConvite: string;
  dataEvento: string;
  valorProposto: string;
  prazoResposta: string;
  observacoes: string;
}

const categoryLabelMap = {
  Resort: "Resort familiar",
  Hotel: "Hotel família",
  Pousada: "Pousada boutique",
} as const;

const hotelHistoryExtras = {
  "hotel-cyan-resort": {
    avaliacaoRecreador: 4.9,
    status: "ativo" as const,
    ultimoTrabalho: "15 Jan 2026",
    totalTrabalhos: 8,
  },
  "hotel-royal-palm-plaza": {
    avaliacaoRecreador: 4.7,
    status: "ativo" as const,
    ultimoTrabalho: "08 Jan 2026",
    totalTrabalhos: 12,
  },
};

const hoteisAtuados = getHoteisDomainByIds([
  "hotel-cyan-resort",
  "hotel-royal-palm-plaza",
]).map((hotel) => {
  const extra = hotelHistoryExtras[hotel.id as keyof typeof hotelHistoryExtras];

  return {
    id: hotel.id,
    nome: hotel.name,
    cidade: `${hotel.city}, ${hotel.state}`,
    categoria: categoryLabelMap[hotel.category],
    imagem: hotel.image,
    avaliacaoHotel: hotel.rating,
    avaliacaoRecreador: extra?.avaliacaoRecreador ?? 4.8,
    status: extra?.status ?? "ativo",
    ultimoTrabalho: extra?.ultimoTrabalho ?? "--",
    totalTrabalhos: extra?.totalTrabalhos ?? 0,
    estrutura: hotel.structure,
    contatoNome: hotel.contactName,
    contatoCargo: hotel.contactRole,
  };
}) satisfies HotelHistoryItem[];

const vagasAbertas = oportunidadesDomainMock
  .filter((opportunity) => opportunity.ownerKind === "hotel")
  .filter(
    (opportunity) =>
      opportunity.id === "opp-hotel-vista-mar-julho" || opportunity.id === "opp-hotel-costa-verde-julho",
  )
  .map((opportunity) => {
    const hotel = hoteisDomainById[opportunity.ownerId];

    return {
      id: opportunity.id,
      hotel: hotel?.name ?? "Hotel parceiro",
      cidade: opportunity.locationLabel,
      categoria: hotel ? categoryLabelMap[hotel.category] : "Hotel parceiro",
      imagem:
        hotel?.image ??
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop",
      valorDiaria: opportunity.compensationLabel,
      periodo: opportunity.periodLabel,
      vagas: opportunity.openings ?? 1,
      urgencia: opportunity.urgencyLabel ?? "normal",
      tags: opportunity.tags ?? [],
    };
  }) satisfies HotelVagaItem[];

const convitesRecebidos = convitesDomainMock.map((convite) => {
  const hotel = hoteisDomainById[convite.hotelId];

  return {
    id: convite.id,
    hotel: hotel?.name ?? "Hotel parceiro",
    cidade: hotel ? `${hotel.city}, ${hotel.state}` : "Cidade não informada",
    dataConvite: convite.inviteDateLabel,
    dataEvento: convite.eventDateLabel,
    valorProposto: convite.proposedValueLabel,
    prazoResposta: convite.responseDeadlineLabel,
    observacoes: convite.notes,
  };
}) satisfies HotelConviteItem[];

export const recreadorHoteisMock = {
  areaLabel: "Recreador",
  userName: "Rafael Santos",
  title: "Perfil dos Hotéis",
  description:
    "Área principal para monitorar onde já atuou, vagas abertas e convites diretos de contratação.",
  stats: [
    { title: "Hotéis monitorados", value: "24", helper: "Rede principal da semana" },
    { title: "Vagas abertas", value: String(vagasAbertas.length), helper: "Compatíveis com seu perfil" },
    {
      title: "Convites diretos",
      value: String(convitesRecebidos.length).padStart(2, "0"),
      helper: "Com resposta pendente",
    },
    { title: "Média das avaliações", value: "4.8", helper: "Histórico em hotéis parceiros" },
  ],
  tabs: [
    { id: "atuados" as HoteisTabId, label: "Onde já atuei" },
    { id: "vagas" as HoteisTabId, label: "Vagas abertas" },
    { id: "convites" as HoteisTabId, label: "Convites" },
  ],
  hoteisAtuados,
  vagasAbertas,
  convitesRecebidos,
};
