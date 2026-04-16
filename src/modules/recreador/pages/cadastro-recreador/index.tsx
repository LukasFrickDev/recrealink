import { useMemo, useState } from "react";
import { Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setLastVisualAction,
  setProfileSpecialties,
  updateProfile,
} from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorCadastroMock } from "@/modules/recreador/mocks/cadastro-recreador";
import * as S from "./styles";

export const RecreadorCadastroRecreadorPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.recreador.profile);

  const [nomeArtistico, setNomeArtistico] = useState(profile.fullName);
  const [bio, setBio] = useState(profile.shortBio);
  const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState<string[]>(
    profile.specialties,
  );
  const [feedback, setFeedback] = useState<string>("");

  const progresso = useMemo(() => {
    const concluidas = recreadorCadastroMock.steps.filter((item) => item.done).length;
    return Math.round((concluidas / recreadorCadastroMock.steps.length) * 100);
  }, []);

  const toggleEspecialidade = (item: string) => {
    setEspecialidadesSelecionadas((prev) => {
      if (prev.includes(item)) {
        return prev.filter((value) => value !== item);
      }

      return [...prev, item];
    });
  };

  const handleSalvarEtapa = () => {
    dispatch(
      updateProfile({
        fullName: nomeArtistico,
        shortBio: bio,
      }),
    );
    dispatch(setProfileSpecialties(especialidadesSelecionadas));
    dispatch(setLastVisualAction("Cadastro atualizado visualmente na Etapa 1."));
    setFeedback("Etapa salva com sucesso na camada visual.");
  };

  const handleContinuarDepois = () => {
    dispatch(setLastVisualAction("Você pode continuar o cadastro quando quiser."));
    navigate("/app/recreador");
  };

  const handleProximoPasso = (id: string) => {
    if (id === "fotos") {
      navigate("/app/recreador/ferramentas/editar-perfil");
      return;
    }

    if (id === "agenda") {
      navigate("/app/recreador/ferramentas/agenda-basica");
      return;
    }

    if (id === "regiao") {
      navigate("/app/recreador/ferramentas/hoteis");
      return;
    }

    navigate("/app/recreador/ferramentas/registro-experiencias");
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorCadastroMock.title}
      pageDescription={recreadorCadastroMock.description}
      stats={recreadorCadastroMock.stats}
    >
      <S.Wrapper>
        <S.SectionCard>
          <S.SectionTitle>Progresso do cadastro ({progresso}%)</S.SectionTitle>
          <S.StepsGrid>
            {recreadorCadastroMock.steps.map((step) => (
              <S.StepCard key={step.id} $done={step.done}>
                <strong>{step.title}</strong>
                <p>{step.helper}</p>
                <S.StepStatus $done={step.done}>{step.done ? "Concluido" : "Pendente"}</S.StepStatus>
              </S.StepCard>
            ))}
          </S.StepsGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>
            <Award size={17} /> Informações básicas
          </S.SectionTitle>
          <S.FormGrid>
            <S.Field>
              <span>Nome artístico</span>
              <input
                value={nomeArtistico}
                onChange={(event) => setNomeArtistico(event.target.value)}
                placeholder="Como você deseja aparecer para os contratantes"
              />
            </S.Field>

            <S.Field>
              <span>Biografia profissional</span>
              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Resumo da sua experiência, estilo de trabalho e público atendido"
              />
            </S.Field>

            <S.Field>
              <span>Especialidades</span>
              <S.ChipsGrid>
                {recreadorCadastroMock.especialidades.map((especialidade) => {
                  const selected = especialidadesSelecionadas.includes(especialidade);

                  return (
                    <S.ChipButton
                      key={especialidade}
                      type="button"
                      $selected={selected}
                      onClick={() => toggleEspecialidade(especialidade)}
                    >
                      {especialidade}
                    </S.ChipButton>
                  );
                })}
              </S.ChipsGrid>
            </S.Field>
          </S.FormGrid>

          <S.ButtonRow>
            <S.PrimaryButton type="button" onClick={handleSalvarEtapa}>
              Salvar etapa
            </S.PrimaryButton>
            <S.SecondaryButton type="button" onClick={handleContinuarDepois}>
              Continuar depois
            </S.SecondaryButton>
          </S.ButtonRow>

          {feedback ? <S.Feedback>{feedback}</S.Feedback> : null}
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>Próximos passos</S.SectionTitle>
          <S.ActionsGrid>
            {recreadorCadastroMock.proximosPassos.map((item) => (
              <S.ActionCard key={item.id}>
                <strong>{item.title}</strong>
                <p>{item.helper}</p>
                <S.SecondaryButton type="button" onClick={() => handleProximoPasso(item.id)}>
                  Executar
                </S.SecondaryButton>
              </S.ActionCard>
            ))}
          </S.ActionsGrid>
        </S.SectionCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
