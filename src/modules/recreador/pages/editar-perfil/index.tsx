import { useMemo, useState } from "react";
import { Camera, CheckCircle2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setLastVisualAction,
  setProfileSpecialties,
  updateProfile,
} from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorEditarPerfilMock } from "@/modules/recreador/mocks/editar-perfil";
import * as S from "./styles";

export const RecreadorEditarPerfilPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.recreador.profile);

  const [fullName, setFullName] = useState(profile.fullName);
  const [roleTitle, setRoleTitle] = useState(profile.roleTitle);
  const [city, setCity] = useState(profile.city);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [shortBio, setShortBio] = useState(profile.shortBio);
  const [portfolioHeadline, setPortfolioHeadline] = useState(profile.portfolioHeadline);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarPreview);
  const [specialties, setSpecialties] = useState(profile.specialties);
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const selectedCount = useMemo(() => specialties.length, [specialties.length]);

  const toggleSpecialty = (label: string) => {
    setSpecialties((previous) => {
      if (previous.includes(label)) {
        return previous.filter((item) => item !== label);
      }

      return [...previous, label];
    });
  };

  const handleAvatarPreset = () => {
    const currentIndex = recreadorEditarPerfilMock.avatarPresets.indexOf(avatarPreview);
    const nextIndex =
      currentIndex < recreadorEditarPerfilMock.avatarPresets.length - 1 ? currentIndex + 1 : 0;
    const nextValue = recreadorEditarPerfilMock.avatarPresets[nextIndex];

    setAvatarPreview(nextValue);
    setFeedback({
      message: "Pré-visualização de avatar atualizada (sem upload real nesta etapa).",
      success: true,
    });
  };

  const handleSave = () => {
    dispatch(
      updateProfile({
        fullName,
        roleTitle,
        city,
        email,
        phone,
        shortBio,
        portfolioHeadline,
        avatarPreview,
      }),
    );
    dispatch(setProfileSpecialties(specialties));
    dispatch(setLastVisualAction("Perfil atualizado visualmente."));

    setFeedback({
      message: "Dados salvos na camada visual da Etapa 1.",
      success: true,
    });
  };

  const handleReset = () => {
    setFullName(profile.fullName);
    setRoleTitle(profile.roleTitle);
    setCity(profile.city);
    setEmail(profile.email);
    setPhone(profile.phone);
    setShortBio(profile.shortBio);
    setPortfolioHeadline(profile.portfolioHeadline);
    setAvatarPreview(profile.avatarPreview);
    setSpecialties(profile.specialties);
    setFeedback({
      message: "Campos redefinidos para os valores atuais do perfil.",
      success: false,
    });
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorEditarPerfilMock.title}
      pageDescription={recreadorEditarPerfilMock.description}
      stats={recreadorEditarPerfilMock.stats}
    >
      <S.Wrapper>
        <S.Banner>
          <h2>Configuração visual de perfil</h2>
          <p>
            Esta área já está preparada para evolução futura com backend e upload real. Nesta etapa,
            as ações funcionam localmente com estado global do módulo.
          </p>
          <S.VisualNote>Etapa 1: alterações simuladas e navegáveis</S.VisualNote>
        </S.Banner>

        <S.TwoColumn>
          <S.Card>
            <S.SectionTitle>Foto e presença visual</S.SectionTitle>

            <S.AvatarPanel>
              <S.AvatarPreview>{avatarPreview}</S.AvatarPreview>
              <S.AvatarHint>
                Use o botão abaixo para alternar uma prévia de avatar. O upload real será conectado na
                próxima etapa.
              </S.AvatarHint>
              <S.Button type="button" $full onClick={handleAvatarPreset}>
                <Camera size={14} /> Trocar foto (prévia)
              </S.Button>
              <S.Button
                type="button"
                $full
                onClick={() => navigate("/app/recreador/ferramentas/perfil-basico")}
              >
                <Eye size={14} /> Ver perfil público
              </S.Button>
            </S.AvatarPanel>
          </S.Card>

          <S.Card>
            <S.SectionTitle>Dados principais</S.SectionTitle>

            <S.FormGrid>
              <S.InputRow>
                <S.Field>
                  <span>Nome completo</span>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Ex.: Rafael Santos"
                  />
                </S.Field>

                <S.Field>
                  <span>Título profissional</span>
                  <input
                    value={roleTitle}
                    onChange={(event) => setRoleTitle(event.target.value)}
                    placeholder="Ex.: Recreador profissional"
                  />
                </S.Field>
              </S.InputRow>

              <S.InputRow>
                <S.Field>
                  <span>Cidade base</span>
                  <input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Ex.: São Paulo, SP"
                  />
                </S.Field>

                <S.Field>
                  <span>Contato principal</span>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="(00) 90000-0000"
                  />
                </S.Field>
              </S.InputRow>

              <S.Field>
                <span>E-mail para contato</span>
                <input
                  value={email}
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nome@dominio.com"
                />
              </S.Field>

              <S.Field>
                <span>Resumo profissional</span>
                <textarea
                  value={shortBio}
                  onChange={(event) => setShortBio(event.target.value)}
                  placeholder="Descreva sua atuação, estilo e diferenciais."
                />
              </S.Field>

              <S.Field>
                <span>Resumo do portfólio</span>
                <textarea
                  value={portfolioHeadline}
                  onChange={(event) => setPortfolioHeadline(event.target.value)}
                  placeholder="Mensagem de apresentação para contratantes."
                />
              </S.Field>

              <S.Field>
                <span>Especialidades selecionadas ({selectedCount})</span>
                <S.SpecialtyGrid>
                  {recreadorEditarPerfilMock.specialtyOptions.map((option) => (
                    <S.SpecialtyChip
                      key={option.id}
                      type="button"
                      $selected={specialties.includes(option.label)}
                      onClick={() => toggleSpecialty(option.label)}
                    >
                      {option.label}
                    </S.SpecialtyChip>
                  ))}
                </S.SpecialtyGrid>
              </S.Field>
            </S.FormGrid>

            <S.ActionsRow>
              <S.Button type="button" $primary onClick={handleSave}>
                <CheckCircle2 size={14} /> Salvar alterações
              </S.Button>
              <S.Button
                type="button"
                onClick={() => navigate("/app/recreador/ferramentas/perfil-basico")}
              >
                Ir para perfil público
              </S.Button>
              <S.Button type="button" onClick={handleReset}>
                Cancelar edição
              </S.Button>
            </S.ActionsRow>

            {feedback ? <S.Feedback $success={feedback.success}>{feedback.message}</S.Feedback> : null}
          </S.Card>
        </S.TwoColumn>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
