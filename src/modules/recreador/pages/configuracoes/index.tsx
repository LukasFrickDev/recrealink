import { CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SettingsPageTemplate } from "@/shared/pages/SettingsPageTemplate";
import {
  setLastVisualAction,
  setProfileSpecialties,
  updateProfile,
} from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorEditarPerfilMock } from "@/modules/recreador/mocks/editar-perfil";
import { recreadorConfiguracoesMock } from "@/modules/recreador/mocks/configuracoes";
import * as S from "./styles";

export const RecreadorConfiguracoesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.recreador.profile);

  const [profileFeedback, setProfileFeedback] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const [fullName, setFullName] = useState(profile.fullName);
  const [roleTitle, setRoleTitle] = useState(profile.roleTitle);
  const [city, setCity] = useState(profile.city);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [shortBio, setShortBio] = useState(profile.shortBio);
  const [portfolioHeadline, setPortfolioHeadline] = useState(profile.portfolioHeadline);
  const [specialties, setSpecialties] = useState(profile.specialties);

  const selectedSpecialtiesCount = useMemo(() => specialties.length, [specialties.length]);

  const toggleSpecialty = (label: string) => {
    setSpecialties((previous) => {
      if (previous.includes(label)) {
        return previous.filter((item) => item !== label);
      }

      return [...previous, label];
    });
  };

  const handleSaveProfileData = () => {
    dispatch(
      updateProfile({
        fullName,
        roleTitle,
        city,
        email,
        phone,
        shortBio,
        portfolioHeadline,
      }),
    );
    dispatch(setProfileSpecialties(specialties));
    dispatch(setLastVisualAction("Dados do perfil atualizados em Configurações."));

    setProfileFeedback({
      message: "Dados do perfil salvos no estado visual da Etapa 1.",
      success: true,
    });
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorConfiguracoesMock.title}
      pageDescription={recreadorConfiguracoesMock.description}
      stats={[]}
      compactContent
    >
      <S.Wrapper>
        <SettingsPageTemplate

          tabs={recreadorConfiguracoesMock.tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            helper: tab.helper,
          }))}
          defaultTabId={recreadorConfiguracoesMock.defaultTabId}
          notificationsTabId={recreadorConfiguracoesMock.notificationsTabId}
          usersTabId={recreadorConfiguracoesMock.usersTabId}
          securityTabId={recreadorConfiguracoesMock.securityTabId}
          notificationPreferences={recreadorConfiguracoesMock.notificationPreferences}
          userAccess={recreadorConfiguracoesMock.userAccess}
          securityTips={recreadorConfiguracoesMock.securityTips}
          feedbackMessages={recreadorConfiguracoesMock.feedbackMessages}
          onSaveNotifications={() => dispatch(setLastVisualAction("Preferências de notificação atualizadas."))}
          onSaveUsers={() => dispatch(setLastVisualAction("Permissões de usuário atualizadas."))}
          onSaveSecurity={() => dispatch(setLastVisualAction("Ajuste de segurança enviado sem persistência real."))}
          profileTabId="perfil"
          profileContent={
            <S.ProfileGrid>
              <S.ProfileAside>
                <S.AvatarPreview>{profile.avatarPreview}</S.AvatarPreview>
                <S.ProfileName>{fullName}</S.ProfileName>
                <S.ProfileRole>{roleTitle}</S.ProfileRole>
                <S.OutlineButton
                  type="button"
                  onClick={() => navigate("/app/recreador/ferramentas/editar-perfil")}
                >
                  Abrir edição detalhada
                </S.OutlineButton>
              </S.ProfileAside>

              <S.ProfileForm>
                <S.InputRow>
                  <S.Field>
                    <span>Nome completo</span>
                    <input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                  </S.Field>

                  <S.Field>
                    <span>Título profissional</span>
                    <input value={roleTitle} onChange={(event) => setRoleTitle(event.target.value)} />
                  </S.Field>
                </S.InputRow>

                <S.InputRow>
                  <S.Field>
                    <span>Cidade base</span>
                    <input value={city} onChange={(event) => setCity(event.target.value)} />
                  </S.Field>

                  <S.Field>
                    <span>Contato principal</span>
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} />
                  </S.Field>
                </S.InputRow>

                <S.Field>
                  <span>E-mail</span>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </S.Field>

                <S.Field>
                  <span>Resumo profissional</span>
                  <textarea value={shortBio} onChange={(event) => setShortBio(event.target.value)} />
                </S.Field>

                <S.Field>
                  <span>Resumo de portfólio</span>
                  <textarea
                    value={portfolioHeadline}
                    onChange={(event) => setPortfolioHeadline(event.target.value)}
                  />
                </S.Field>

                <S.Field>
                  <span>Especialidades ({selectedSpecialtiesCount})</span>
                  <S.ChipGrid>
                    {recreadorEditarPerfilMock.specialtyOptions.map((option) => (
                      <S.Chip
                        key={option.id}
                        type="button"
                        $selected={specialties.includes(option.label)}
                        onClick={() => toggleSpecialty(option.label)}
                      >
                        {option.label}
                      </S.Chip>
                    ))}
                  </S.ChipGrid>
                </S.Field>

                <S.ActionsRow>
                  <S.PrimaryButton type="button" onClick={handleSaveProfileData}>
                    <CheckCircle2 size={14} /> Salvar dados do perfil
                  </S.PrimaryButton>
                </S.ActionsRow>

                {profileFeedback ? (
                  <S.ProfileFeedback $success={profileFeedback.success}>
                    {profileFeedback.message}
                  </S.ProfileFeedback>
                ) : null}
              </S.ProfileForm>
            </S.ProfileGrid>
          }
        />
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
