import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { Link } from "react-router-dom";
import { CalendarDays, Heart, MapPin, MessageCircle, Search, Star } from "lucide-react";
import { Badge, Card } from "@/shared/ui";
import * as S from "./styles";
import { paisDashboardMock } from "@/modules/pais/mocks/dashboard";

const getShortcutIcon = (to: string) => {
  if (to === "/app/pais/empresas") {
    return Search;
  }

  if (to === "/app/pais/favoritos") {
    return Heart;
  }

  if (to === "/app/pais/mapa") {
    return MapPin;
  }

  if (to === "/app/pais/agenda") {
    return CalendarDays;
  }

  if (to === "/app/pais/chat") {
    return MessageCircle;
  }

  return Search;
};

export const PaisDashboardPage = () => {
  return (
    <PaisDashboardShell
      userName={paisDashboardMock.userName}
      pageTitle={paisDashboardMock.title}
      pageDescription={paisDashboardMock.description}
    >
      <S.Wrapper>
        <S.WelcomePanel>
          <S.WelcomeHeader>
            <S.WelcomeAvatar>
              <Heart size={16} />
            </S.WelcomeAvatar>
            <div>
              <h3>{paisDashboardMock.welcome.title}</h3>
              <p>{paisDashboardMock.welcome.subtitle}</p>
            </div>
          </S.WelcomeHeader>

          <S.HighlightStrip>
            {paisDashboardMock.highlights.map((item) => (
              <S.HighlightCard key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.helper}</p>
              </S.HighlightCard>
            ))}
          </S.HighlightStrip>

          <S.PrimaryActions>
            {paisDashboardMock.primaryActions.map((action) => (
              <Link key={action.label} to={action.to}>
                {action.label}
              </Link>
            ))}
          </S.PrimaryActions>
        </S.WelcomePanel>

        <S.QuickActionsGrid>
          {paisDashboardMock.quickActions.map((action) => {
            const ActionIcon = getShortcutIcon(action.to);

            return (
              <S.QuickActionLink key={action.id} to={action.to}>
                <ActionIcon size={16} />
                <div>
                  <strong>{action.title}</strong>
                  <p>{action.description}</p>
                </div>
              </S.QuickActionLink>
            );
          })}
        </S.QuickActionsGrid>

        <S.MainGrid>
          <Card title="Empresas em destaque" subtitle="Perfis bem avaliados para sua família">
            <S.ProviderGrid>
              {paisDashboardMock.featuredProviders.map((provider) => (
                <S.ProviderCard key={provider.id}>
                  <S.ProviderTop>
                    <div>
                      <h4>{provider.name}</h4>
                      <p>{provider.location}</p>
                    </div>
                    <Badge tone="brand">{provider.providerType}</Badge>
                  </S.ProviderTop>

                  <S.ProviderRating>
                    <Star size={14} />
                    <span>{provider.rating}</span>
                    <small>{provider.priceRange}</small>
                  </S.ProviderRating>

                  <S.ProviderTags>
                    {provider.specialties.map((specialty) => (
                      <Badge key={`${provider.id}-${specialty}`} tone="neutral">
                        {specialty}
                      </Badge>
                    ))}
                  </S.ProviderTags>
                </S.ProviderCard>
              ))}
            </S.ProviderGrid>
          </Card>

          <Card title="Dicas para contratação" subtitle="Boas práticas para fechar com segurança">
            <S.TipsGrid>
              {paisDashboardMock.tips.map((tip) => (
                <S.TipCard key={tip.title}>
                  <strong>{tip.title}</strong>
                  <p>{tip.description}</p>
                </S.TipCard>
              ))}
            </S.TipsGrid>
          </Card>
        </S.MainGrid>
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
