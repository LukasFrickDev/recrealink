import {
  getHotelDomainById,
  getHotelProfileDomainById,
  getOportunidadesByOwner,
  getRecreadorSummariesByIds,
} from "@/shared/mocks/domains";
import type { HotelariaRecreadorEntry, HotelariaVagaStatus } from "./types";

const isDefined = <T>(value: T | null): value is T => value !== null;

export const hotelMaresias = getHotelDomainById("hotel-maresias-resort-spa");
export const hotelMaresiasProfile = getHotelProfileDomainById("hotel-maresias-resort-spa");

const recreadorFunctionsById = {
  "rec-ana-silva": ["Lider", "Kids"],
  "rec-carlos-santos": ["Lider", "Teens"],
  "rec-marina-costa": ["Apoio", "Children"],
  "rec-pedro-lima": ["Central", "Teens"],
  "rec-juliana-rocha": ["Kids", "Apoio"],
} as const;

const mapRecreadoresByIds = (ids: string[]): HotelariaRecreadorEntry[] => {
  return getRecreadorSummariesByIds(ids).map((recreador) => ({
    ...recreador,
    functions: [...(recreadorFunctionsById[recreador.id as keyof typeof recreadorFunctionsById] ?? ["Apoio"])],
  }));
};

export const hotelariaCurrentTeamEntries = mapRecreadoresByIds([
  "rec-ana-silva",
  "rec-carlos-santos",
  "rec-marina-costa",
]);

export const hotelariaHiringHistoryEntries = mapRecreadoresByIds([
  "rec-pedro-lima",
  "rec-juliana-rocha",
]);

const hotelariaVacancyExtrasById = {
  "opp-hotelaria-lider-weekend": {
    startDate: "06/12/2026",
    endDate: "08/12/2026",
    candidates: 14,
    status: "Em análise" as HotelariaVagaStatus,
    positions: [
      { role: "Lider Kids", total: 2, filled: 1 },
      { role: "Apoio Children", total: 2, filled: 2 },
      { role: "Teens", total: 1, filled: 0 },
    ],
  },
  "opp-hotelaria-temporada-natal": {
    startDate: "24/12/2026",
    endDate: "26/12/2026",
    candidates: 26,
    status: "Aberta" as HotelariaVagaStatus,
    positions: [
      { role: "Kids", total: 3, filled: 1 },
      { role: "Children", total: 2, filled: 1 },
      { role: "Central", total: 2, filled: 0 },
    ],
  },
};

export const hotelariaVacancies = getOportunidadesByOwner("hotel", "hotel-maresias-resort-spa")
  .map((opportunity) => {
    const extra = hotelariaVacancyExtrasById[
      opportunity.id as keyof typeof hotelariaVacancyExtrasById
    ];

    if (!extra) {
      return null;
    }

    return {
      title: opportunity.title,
      description: opportunity.title.includes("Lider")
        ? "Coordenacao de equipe para pacote família de sexta a domingo."
        : "Reforco completo para programacao especial de fim de ano.",
      location: opportunity.locationLabel,
      startDate: extra.startDate,
      endDate: extra.endDate,
      salary: opportunity.compensationLabel,
      candidates: extra.candidates,
      status: extra.status,
      positions: extra.positions,
    };
  })
  .filter(isDefined);

export const hotelariaFeedbackEntries = [
  {
    recreador: hotelariaCurrentTeamEntries[0]?.name ?? "Ana Silva",
    artisticName: hotelariaCurrentTeamEntries[0]?.artisticName ?? "Aninha Kids",
    activityDate: "30/11/2026",
    type: "positivo" as const,
    rating: 5,
    comment: "Excelente condução da oficina infantil e boa gestão de fila.",
    createdAt: "01/12/2026",
  },
  {
    recreador: hotelariaCurrentTeamEntries[1]?.name ?? "Carlos Santos",
    artisticName: hotelariaCurrentTeamEntries[1]?.artisticName ?? "Cacau Showman",
    activityDate: "29/11/2026",
    type: "neutro" as const,
    rating: 4,
    comment: "Boa energia no palco, precisa melhorar briefing com equipe de apoio.",
    createdAt: "30/11/2026",
  },
  {
    recreador: hotelariaCurrentTeamEntries[2]?.name ?? "Marina Costa",
    artisticName: hotelariaCurrentTeamEntries[2]?.artisticName ?? "Mari Smile",
    activityDate: "28/11/2026",
    type: "negativo" as const,
    rating: 3,
    comment: "Atraso no início da atividade e baixa aderência ao roteiro previsto.",
    createdAt: "29/11/2026",
  },
];

export const hotelariaPayments = [
  {
    recreador: hotelariaCurrentTeamEntries[0]?.name ?? "Ana Silva",
    value: "R$ 860",
    date: "05/12/2026",
    status: "Pago" as const,
  },
  {
    recreador: hotelariaCurrentTeamEntries[1]?.name ?? "Carlos Santos",
    value: "R$ 790",
    date: "05/12/2026",
    status: "Pago" as const,
  },
  {
    recreador: hotelariaCurrentTeamEntries[2]?.name ?? "Marina Costa",
    value: "R$ 640",
    date: "07/12/2026",
    status: "Pendente" as const,
  },
];
