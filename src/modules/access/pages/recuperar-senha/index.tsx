import { Link } from "react-router-dom";
import { Input } from "@/shared/ui";
import { accessProfileContext } from "@/modules/access/components/AccessLayout/data";
import { forgotPasswordData, forgotPasswordTaglineByProfile } from "@/modules/access/mocks/recuperar-senha";
import * as S from "./styles";
import { useAppSelector } from "@/app/store/hooks";
import logoBranca from "@/assets/logo-branca.png";

export const ForgotPasswordPage = () => {
  const selectedProfile = useAppSelector((state) => state.profile.selectedAccessProfile) ?? "recreador";
  const context = accessProfileContext[selectedProfile];
  const slogan = forgotPasswordTaglineByProfile[selectedProfile];

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
            <h2>{forgotPasswordData.title}</h2>
            <p>{forgotPasswordData.subtitle}</p>
          </S.CardHeader>

          <S.Form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Input id="recoveryEmail" label="Email cadastrado" type="email" required />

            <S.SubmitButton type="submit" $actionColor={context.actionColor}>
              Enviar orientações
            </S.SubmitButton>

            <S.Helper>{forgotPasswordData.helper}</S.Helper>
            <S.Links>
              <Link to="/acesso/entrar">Voltar ao login</Link>
              <Link to="/acesso/cadastro">Criar nova conta</Link>
            </S.Links>
          </S.Form>
        </S.Card>
      </S.Container>
    </S.Page>
  );
};
