import { useMemo, useState } from "react";
import { Camera, Eye, Heart, MapPin, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorRegistroMock } from "@/modules/recreador/mocks/registro-experiencias";
import * as S from "./styles";

export const RecreadorRegistroExperienciasPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [experiencias, setExperiencias] = useState(recreadorRegistroMock.experiencias);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);

  const selectedExperience = useMemo(
    () => experiencias.find((item) => item.id === selectedExperienceId) ?? null,
    [experiencias, selectedExperienceId],
  );

  const handleAdicionarRegistro = () => {
    const novoRegistro = {
      id: `exp-${Date.now()}`,
      titulo: "Nova experiência em elaboração",
      local: "Definir local",
      data: "Definir data",
      participantes: 0,
      categoria: "Registro inicial",
      avaliacao: 0,
      descricao: "Adicione informações da atividade, resultados e diferenciais da entrega.",
      destaques: ["Novo registro"],
      fotos: 0,
      visualizacoes: 0,
      curtidas: 0,
    };

    setExperiencias((previous) => [novoRegistro, ...previous]);
    setSelectedExperienceId(novoRegistro.id);
    dispatch(setLastVisualAction("Novo registro criado visualmente."));
  };

  const handleCompartilhar = (id: string) => {
    setSelectedExperienceId(id);
    dispatch(setLastVisualAction("Compartilhamento simulado com sucesso."));
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorRegistroMock.title}
      pageDescription={recreadorRegistroMock.description}
      stats={recreadorRegistroMock.stats}
    >
      <S.Wrapper>
        <S.AddCard>
          <S.AddTitle>Registrar nova experiência</S.AddTitle>
          <S.AddDescription>
            Documente contexto, público e resultados de cada entrega para fortalecer seu portfólio.
          </S.AddDescription>
          <S.AddButton type="button" onClick={handleAdicionarRegistro}>
            Adicionar registro
          </S.AddButton>
        </S.AddCard>

        <S.ExperienceList>
          {experiencias.map((experiencia) => (
            <S.ExperienceCard key={experiencia.id}>
              <S.ExperienceTop>
                <div>
                  <h4>{experiencia.titulo}</h4>
                  <S.MetaRow>
                    <S.MetaItem>
                      <MapPin size={12} /> {experiencia.local}
                    </S.MetaItem>
                    <S.MetaItem>{experiencia.data}</S.MetaItem>
                    <S.MetaItem>
                      <Users size={12} /> {experiencia.participantes} participantes
                    </S.MetaItem>
                  </S.MetaRow>
                </div>
                <div>
                  <S.CategoryBadge>{experiencia.categoria}</S.CategoryBadge>
                  <S.Stars>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={`${experiencia.id}-${index + 1}`}
                        size={13}
                        fill={index < experiencia.avaliacao ? "currentColor" : "none"}
                      />
                    ))}
                  </S.Stars>
                </div>
              </S.ExperienceTop>

              <S.Description>{experiencia.descricao}</S.Description>

              <S.HighlightList>
                {experiencia.destaques.map((item) => (
                  <S.HighlightBadge key={`${experiencia.id}-${item}`}>{item}</S.HighlightBadge>
                ))}
              </S.HighlightList>

              <S.FooterRow>
                <S.StatsRow>
                  <S.Stat>
                    <Camera size={12} /> {experiencia.fotos} fotos
                  </S.Stat>
                  <S.Stat>
                    <Eye size={12} /> {experiencia.visualizacoes} visualizacoes
                  </S.Stat>
                  <S.Stat>
                    <Heart size={12} /> {experiencia.curtidas} curtidas
                  </S.Stat>
                </S.StatsRow>

                <S.ActionsRow>
                  <S.ActionButton type="button" onClick={() => setSelectedExperienceId(experiencia.id)}>
                    Ver galeria
                  </S.ActionButton>
                  <S.ActionButton
                    type="button"
                    onClick={() => navigate("/app/recreador/ferramentas/editar-perfil")}
                  >
                    Editar
                  </S.ActionButton>
                  <S.ActionButton
                    type="button"
                    $primary
                    onClick={() => handleCompartilhar(experiencia.id)}
                  >
                    Compartilhar
                  </S.ActionButton>
                </S.ActionsRow>
              </S.FooterRow>
            </S.ExperienceCard>
          ))}
        </S.ExperienceList>

        {selectedExperience ? (
          <S.PreviewCard>
            <h4>Registro selecionado</h4>
            <p>{selectedExperience.titulo}</p>
            <S.ActionButton
              type="button"
              onClick={() => navigate("/app/recreador/ferramentas/editar-perfil")}
            >
              Editar este registro
            </S.ActionButton>
          </S.PreviewCard>
        ) : null}

        <S.PreviewCard>
          <h4>Prévia do portfólio</h4>
          <p>
            Seus registros são organizados automaticamente para apresentar experiência e consistência de entrega.
          </p>
          <S.ActionButton
            type="button"
            onClick={() => navigate("/app/recreador/ferramentas/perfil-basico")}
          >
            Ver portfólio completo
          </S.ActionButton>
        </S.PreviewCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
