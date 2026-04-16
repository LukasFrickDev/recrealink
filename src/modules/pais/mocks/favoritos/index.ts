import {
  paisFavoritesDomainMock,
  toChipCityLabel,
  toRatingLabel,
} from "@/shared/mocks/domains/interacoes";

const favorites = paisFavoritesDomainMock.map((favorite) => ({
  ...favorite,
  city: toChipCityLabel(favorite.city),
  rating: toRatingLabel(favorite.rating),
}));

export const paisFavoritosMock = {
  areaLabel: "Pais",
  userName: "Lúcia Fernandes",
  title: "Favoritos da família",
  description: "Empresas salvas para comparação, contato e fechamento da contratação.",
  stats: [
    { title: "Favoritos ativos", value: String(favorites.length), helper: "Atualizado hoje" },
    {
      title: "Com disponibilidade",
      value: String(favorites.filter((favorite) => favorite.nextAvailability.length > 0).length),
      helper: "Próximo fim de semana",
    },
    { title: "Contato iniciado", value: "04", helper: "Em andamento" },
    {
      title: "Média de avaliação",
      value:
        (favorites.reduce((sum, favorite) => sum + Number(favorite.rating.replace(",", ".")), 0) /
          Math.max(favorites.length, 1))
          .toFixed(1)
          .replace(".", ","),
      helper: "Entre os favoritos",
    },
  ],
  favorites,
};
