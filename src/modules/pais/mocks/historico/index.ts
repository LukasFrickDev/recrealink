import {
  paisHistoricoEventsDomainMock,
  paisHistoricoHighlightsDomainMock,
  toChipCityLabel,
  toRatingLabel,
} from "@/shared/mocks/domains/interacoes";

const events = paisHistoricoEventsDomainMock.map((event) => ({
  ...event,
  rating: toRatingLabel(event.rating),
  location: toChipCityLabel(event.location),
}));

export const paisHistoricoMock = {
  userName: "Lúcia Fernandes",
  title: "Histórico da família",
  description:
    "Consulte eventos passados, desempenho de fornecedores e padrões para próximas contratações.",
  stats: [
    { title: "Eventos realizados", value: String(events.length), helper: "Últimos 12 meses" },
    {
      title: "Fornecedores contratados",
      value: String(new Set(events.map((event) => event.company)).size),
      helper: "Entre empresas, recreadores e hotéis",
    },
    {
      title: "Média de satisfação",
      value:
        (events.reduce((sum, event) => sum + Number(event.rating.replace(",", ".")), 0) /
          Math.max(events.length, 1))
          .toFixed(1)
          .replace(".", ","),
      helper: "Avaliação geral",
    },
    { title: "Total investido", value: "R$ 8.420", helper: "Período acumulado" },
  ],
  highlights: paisHistoricoHighlightsDomainMock,
  events,
  nextInsights: [
    "Eventos com até 30 crianças têm melhor avaliação quando a equipe possui ao menos 3 recreadores.",
    "Contratações com visita prévia ao local reduzem ajustes de última hora.",
    "Fornecedores com resposta em até 2 horas tiveram maior taxa de fechamento.",
  ],
};
