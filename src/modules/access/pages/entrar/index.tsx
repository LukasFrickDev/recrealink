import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/shared/ui";
import { accessProfileContext, profileRouteMap } from "@/modules/access/components/AccessLayout/data";
import { loginLinkCopyByProfile, loginPageData, loginTaglineByProfile } from "@/modules/access/mocks/entrar";
import * as S from "./styles";
import { useAppSelector } from "@/app/store/hooks";
import { BackNavigation } from "@/modules/access/components/BackNavigation";
import logoBranca from "@/assets/logo-branca.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const selectedProfile = useAppSelector((state) => state.profile.selectedAccessProfile) ?? "recreador";
  const context = accessProfileContext[selectedProfile];
  const linkCopy = loginLinkCopyByProfile[selectedProfile];
  const slogan = loginTaglineByProfile[selectedProfile];

  return (
    <S.Page
      $backgroundGradient={context.backgroundGradient}
      $backgroundOverlay={context.backgroundOverlay}
      $backgroundImage={context.backgroundImage}
      $backgroundImagePosition={context.backgroundImagePosition}
    >
      <S.Glow data-side="right" />
      <S.Glow data-side="left" />

      <S.Container>
        <S.Brand>
          <img src={logoBranca} alt="RecreaLink" />
          <span>{slogan}</span>
        </S.Brand>

        <S.Card>
          <S.CardHeader>
            <h2>{context.loginTitle}</h2>
            <p>{loginPageData.subtitle}</p>
          </S.CardHeader>

          <S.Form
            onSubmit={(event) => {
              event.preventDefault();
              navigate(profileRouteMap[selectedProfile]);
            }}
          >
            <Input id="email" label="Email" type="email" placeholder="seu@email.com" required />
            <Input id="password" label="Senha" type="password" required />

            <S.LinksRow>
              <Link to="/acesso/recuperar-senha">Esqueci minha senha</Link>
              <Link to="/acesso/cadastro">{linkCopy.register}</Link>
            </S.LinksRow>

            <S.SubmitButton type="submit" $actionColor={context.actionColor}>
              Entrar
            </S.SubmitButton>

            <S.BackAction>
              <BackNavigation fallbackPath="/acesso/escolher-perfil" tone="tertiary" />
            </S.BackAction>

            <S.Helper>{loginPageData.helper}</S.Helper>
          </S.Form>
        </S.Card>
      </S.Container>
    </S.Page>
  );
};
