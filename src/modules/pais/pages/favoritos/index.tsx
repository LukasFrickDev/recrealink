import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { Link } from "react-router-dom";
import { CalendarDays, Heart, MessageCircle, Star } from "lucide-react";
import { Badge } from "@/shared/ui";
import * as S from "./styles";
import { paisFavoritosMock } from "@/modules/pais/mocks/favoritos";

export const PaisFavoritosPage = () => {
  return (
    <PaisDashboardShell
      userName={paisFavoritosMock.userName}
      pageTitle={paisFavoritosMock.title}
      pageDescription={paisFavoritosMock.description}
      stats={paisFavoritosMock.stats}
    >
      <S.Wrapper>
        <S.HeaderRow>
          <div>
            <h3>Empresas favoritas</h3>
            <p>Sua lista de preferidas para negociar e fechar contratação.</p>
          </div>
          <Badge tone="brand">{paisFavoritosMock.favorites.length} favoritos</Badge>
        </S.HeaderRow>

        <S.FavoritesGrid>
          {paisFavoritosMock.favorites.map((favorite) => (
            <S.FavoriteCard key={favorite.id}>
              <S.FavoriteTop>
                <div>
                  <h4>{favorite.name}</h4>
                  <p>{favorite.city}</p>
                </div>
                <S.FavoriteHeart>
                  <Heart size={14} />
                </S.FavoriteHeart>
              </S.FavoriteTop>

              <S.MetaRow>
                <span>
                  <Star size={14} /> {favorite.rating}
                </span>
                <small>{favorite.reviews} avaliações</small>
              </S.MetaRow>

              <S.Price>{favorite.priceRange}</S.Price>

              <S.TagLine>
                {favorite.specialties.map((specialty) => (
                  <Badge key={`${favorite.id}-${specialty}`} tone="neutral">
                    {specialty}
                  </Badge>
                ))}
              </S.TagLine>

              <S.InfoList>
                <li>{favorite.lastContact}</li>
                <li>{favorite.nextAvailability}</li>
              </S.InfoList>

              <S.Actions>
                <Link to="/app/pais/agenda">
                  <CalendarDays size={14} /> Ver agenda
                </Link>
                <Link to="/app/pais/chat">
                  <MessageCircle size={14} /> Mensagens
                </Link>
              </S.Actions>
            </S.FavoriteCard>
          ))}
        </S.FavoritesGrid>
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
