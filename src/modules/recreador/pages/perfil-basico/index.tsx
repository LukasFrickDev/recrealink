import { Camera, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorPerfilBasicoMock } from "@/modules/recreador/mocks/perfil-basico";
import * as S from "./styles";

export const RecreadorPerfilBasicoPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.recreador.profile);

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorPerfilBasicoMock.title}
      pageDescription={recreadorPerfilBasicoMock.description}
      stats={recreadorPerfilBasicoMock.stats}
    >
      <S.Wrapper>
        <S.SummaryCard>
          <S.SummaryGrid>
            <S.Avatar>{profile.avatarPreview}</S.Avatar>
            <S.SummaryContent>
              <h2>{profile.fullName}</h2>
              <h3>{profile.roleTitle}</h3>
              <S.BadgeRow>
                <S.Badge $tone="blue">
                  <MapPin size={11} /> {profile.city}
                </S.Badge>
                <S.Badge $tone="green">Perfil ativo</S.Badge>
              </S.BadgeRow>
              <p>{profile.shortBio}</p>
              <S.BadgeRow>
                {profile.specialties.map((item) => (
                  <S.Badge key={item} $tone="neutral">
                    {item}
                  </S.Badge>
                ))}
              </S.BadgeRow>
              <S.EditButton
                type="button"
                onClick={() => navigate("/app/recreador/ferramentas/editar-perfil")}
              >
                Editar portfólio
              </S.EditButton>
            </S.SummaryContent>
          </S.SummaryGrid>
        </S.SummaryCard>

        <S.TwoColumnGrid>
          <S.SectionCard>
            <S.SectionTitle>Certificações</S.SectionTitle>
            <S.CertificationList>
              {recreadorPerfilBasicoMock.certificacoes.map((certificacao) => (
                <S.CertificationCard key={certificacao.id}>
                  <S.CertificationTop>
                    <strong>{certificacao.nome}</strong>
                    <S.Badge $tone={certificacao.status === "valido" ? "green" : "neutral"}>
                      {certificacao.status === "valido" ? "Válido" : "Atualizar"}
                    </S.Badge>
                  </S.CertificationTop>
                  <S.CertificationMeta>{certificacao.instituicao}</S.CertificationMeta>
                  <S.CertificationMeta>
                    Obtido em {certificacao.obtidoEm} · Validade {certificacao.validade}
                  </S.CertificationMeta>
                </S.CertificationCard>
              ))}
            </S.CertificationList>
            <S.SecondaryButton
              type="button"
              onClick={() => {
                dispatch(setLastVisualAction("Nova certificação preparada para edição visual."));
                navigate("/app/recreador/ferramentas/editar-perfil");
              }}
            >
              Adicionar certificação
            </S.SecondaryButton>
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionTitle>Depoimentos</S.SectionTitle>
            <S.FeedbackList>
              {recreadorPerfilBasicoMock.depoimentos.map((depoimento) => (
                <S.FeedbackCard key={depoimento.id}>
                  <S.FeedbackTop>
                    <div>
                      <strong>{depoimento.autor}</strong>
                      <span>{depoimento.cargo}</span>
                    </div>
                    <S.Stars>
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={`${depoimento.id}-${index + 1}`}
                          size={12}
                          fill={index < depoimento.avaliacao ? "currentColor" : "none"}
                        />
                      ))}
                    </S.Stars>
                  </S.FeedbackTop>
                  <S.FeedbackText>{depoimento.texto}</S.FeedbackText>
                  <S.CertificationMeta>{depoimento.data}</S.CertificationMeta>
                </S.FeedbackCard>
              ))}
            </S.FeedbackList>
          </S.SectionCard>
        </S.TwoColumnGrid>

        <S.GalleryCard>
          <S.GalleryHeader>
            <S.SectionTitle>Galeria de eventos</S.SectionTitle>
            <S.SecondaryButton
              type="button"
              onClick={() => navigate("/app/recreador/ferramentas/editar-perfil")}
            >
              <Camera size={13} /> Adicionar fotos
            </S.SecondaryButton>
          </S.GalleryHeader>
          <S.GalleryGrid>
            {recreadorPerfilBasicoMock.galeria.map((foto) => (
              <S.GalleryItem key={foto.id}>
                <S.GalleryImage $image={foto.imagem} />
                <S.GalleryCaption>{foto.descricao}</S.GalleryCaption>
              </S.GalleryItem>
            ))}
          </S.GalleryGrid>
        </S.GalleryCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
