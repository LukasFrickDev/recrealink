import { Link } from "react-router-dom";
import { Badge, Card } from "@/shared/ui";
import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { paisPerfilMock } from "@/modules/pais/mocks/perfil";
import * as S from "./styles";

export const PaisPerfilPage = () => {
  return (
    <PaisDashboardShell
      userName={paisPerfilMock.userName}
      pageTitle={paisPerfilMock.title}
      pageDescription={paisPerfilMock.description}
      stats={paisPerfilMock.stats}
    >
      <S.Wrapper>
        <S.HeroCard>
          <S.HeroTop>
            <S.Avatar>LF</S.Avatar>
            <S.HeroMeta>
              <h3>{paisPerfilMock.profile.familyName}</h3>
              <p>{paisPerfilMock.profile.city}</p>
            </S.HeroMeta>
          </S.HeroTop>

          <S.CompletionLine>
            Perfil preenchido: <strong>{paisPerfilMock.profile.completion}</strong>
          </S.CompletionLine>

          <S.Bio>{paisPerfilMock.profile.bio}</S.Bio>
        </S.HeroCard>

        <S.MainGrid>
          <Card title="Responsáveis" subtitle="Pessoas autorizadas na conta">
            <S.InfoList>
              {paisPerfilMock.guardians.map((guardian) => (
                <S.InfoItem key={guardian.id}>
                  <strong>{guardian.name}</strong>
                  <span>{guardian.role}</span>
                  <p>{guardian.contact}</p>
                </S.InfoItem>
              ))}
            </S.InfoList>
          </Card>

          <Card title="Crianças" subtitle="Perfil para personalizar recomendações">
            <S.InfoList>
              {paisPerfilMock.children.map((child) => (
                <S.InfoItem key={child.id}>
                  <strong>
                    {child.name} • {child.age}
                  </strong>
                  <p>{child.profile}</p>
                </S.InfoItem>
              ))}
            </S.InfoList>
          </Card>

          <Card title="Preferências de evento" subtitle="Sinais usados na busca das empresas">
            <S.PreferenceRow>
              {paisPerfilMock.eventPreferences.map((preference) => (
                <Badge key={preference} tone="neutral">
                  {preference}
                </Badge>
              ))}
            </S.PreferenceRow>
          </Card>

          <Card title="Ações rápidas" subtitle="Atalhos para manter o perfil atualizado">
            <S.ActionList>
              {paisPerfilMock.quickActions.map((action) => (
                <Link key={action.label} to={action.to}>
                  <strong>{action.label}</strong>
                  <p>{action.helper}</p>
                </Link>
              ))}
            </S.ActionList>
          </Card>
        </S.MainGrid>
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
