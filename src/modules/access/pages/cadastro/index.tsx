import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/shared/ui";
import { accessProfileContext, profileRouteMap } from "@/modules/access/components/AccessLayout/data";
import {
  availabilityOptions,
  regionOptions,
  registerCopyByProfile,
  registerPageData,
  registerTaglineByProfile,
} from "@/modules/access/mocks/cadastro";
import * as S from "./styles";
import { useAppSelector } from "@/app/store/hooks";
import { BackNavigation } from "@/modules/access/components/BackNavigation";
import logoBranca from "@/assets/logo-branca.png";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const selectedProfile = useAppSelector((state) => state.profile.selectedAccessProfile) ?? "recreador";
  const context = accessProfileContext[selectedProfile];
  const profileCopy = registerCopyByProfile[selectedProfile];
  const slogan = registerTaglineByProfile[selectedProfile];

  const renderRecreadorOuEmpresaFields = () => {
    const isEmpresa = selectedProfile === "empresa";

    return (
      <>
        <Input
          id="fullName"
          label={isEmpresa ? "Nome do responsável" : "Nome completo"}
          placeholder={isEmpresa ? "Ex: Marina Costa" : "Seu nome completo"}
          required
        />

        <S.Field>
          <S.Label htmlFor="region">Região de atuação</S.Label>
          <S.NativeSelect id="region" defaultValue="" required>
            <option value="" disabled>
              Selecione sua região
            </option>
            {regionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </S.NativeSelect>
        </S.Field>

        <S.Field>
          <S.Label htmlFor="portfolio">Portfólio (Opcional)</S.Label>
          <S.TextArea
            id="portfolio"
            placeholder={
              isEmpresa
                ? "Descreva a experiência da empresa com recreação e entretenimento..."
                : "Descreva suas experiências anteriores..."
            }
          />
        </S.Field>

        <S.Field>
          <S.Label htmlFor="availability">Disponibilidade</S.Label>
          <S.NativeSelect id="availability" defaultValue="" required>
            <option value="" disabled>
              Selecione sua disponibilidade
            </option>
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </S.NativeSelect>
        </S.Field>
      </>
    );
  };

  const renderHotelariaFields = () => {
    return (
      <>
        <Input id="email" label="Email" type="email" placeholder="seu@email.com" required />
        <Input id="password" label="Senha" type="password" required />
        <Input id="hotelName" label="Nome do hotel" placeholder="Nome do hotel" required />
        <Input id="hotelCity" label="Cidade" placeholder="Cidade do hotel" required />
        <Input id="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" required />
        <Input id="dailyRate" label="Valor da diária (Opcional)" placeholder="R$ ou A combinar" />

        <S.Field>
          <S.Label htmlFor="recreadorProfile">Perfil desejado do recreador</S.Label>
          <S.TextArea
            id="recreadorProfile"
            placeholder="Descreva o perfil de recreador que você busca..."
            required
          />
        </S.Field>
      </>
    );
  };

  const renderPaisFields = () => {
    return (
      <>
        <Input id="fullName" label="Nome completo" placeholder="Seu nome completo" required />

        <S.Row>
          <Input id="city" label="Cidade" placeholder="Sua cidade" required />
          <Input id="state" label="Estado" placeholder="Seu estado" required />
        </S.Row>

        <Input id="email" label="Email" type="email" placeholder="seu@email.com" required />

        <S.Row>
          <Input id="password" label="Senha" type="password" placeholder="Mínimo 6 caracteres" required />
          <Input id="passwordConfirm" label="Confirmar senha" type="password" required />
        </S.Row>
      </>
    );
  };

  const renderProfileFields = () => {
    if (selectedProfile === "hotelaria") {
      return renderHotelariaFields();
    }

    if (selectedProfile === "pais") {
      return renderPaisFields();
    }

    return (
      <>
        <Input id="email" label="Email" type="email" placeholder="seu@email.com" required />
        <Input id="password" label="Senha" type="password" required />
        {renderRecreadorOuEmpresaFields()}
      </>
    );
  };

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
            <h2>{profileCopy.title}</h2>
            <p>{registerPageData.subtitle}</p>
          </S.CardHeader>

          <S.Form
            onSubmit={(event) => {
              event.preventDefault();
              navigate(profileRouteMap[selectedProfile]);
            }}
          >
            {renderProfileFields()}

            <S.SubmitButton type="submit" $actionColor={context.actionColor}>
              {profileCopy.submit}
            </S.SubmitButton>

            <S.BackAction>
              <BackNavigation fallbackPath="/acesso/escolher-perfil" tone="tertiary" />
            </S.BackAction>

            <S.FooterLinks>
              <Link to="/acesso/entrar">{profileCopy.loginLink}</Link>
            </S.FooterLinks>

            <S.Helper>{registerPageData.helper}</S.Helper>
          </S.Form>
        </S.Card>
      </S.Container>
    </S.Page>
  );
};
