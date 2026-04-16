import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { empresarioEmpresaPageMock } from "@/modules/empresa/mocks/perfil-empresa";
import * as S from "./styles";

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, index) => (index < rating ? "★" : "☆")).join("");

interface EmpresaProfileDraft {
  tagline: string;
  summary: string;
  contacts: Record<string, string>;
}

const buildDraftState = (): EmpresaProfileDraft => ({
  tagline: empresarioEmpresaPageMock.hero.tagline,
  summary: empresarioEmpresaPageMock.about.summary,
  contacts: empresarioEmpresaPageMock.contacts.reduce<Record<string, string>>((acc, contact) => {
    acc[contact.label] = contact.value;
    return acc;
  }, {}),
});

export const EmpresarioEmpresaPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EmpresaProfileDraft>(() => buildDraftState());

  const handleCancel = () => {
    setDraft(buildDraftState());
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <S.Page>
      <S.Container>
        <S.Header>
          <S.HeaderContent>
            <S.AreaLabel>{empresarioEmpresaPageMock.areaLabel}</S.AreaLabel>
            <S.Title>{empresarioEmpresaPageMock.title}</S.Title>
            <S.Description>{empresarioEmpresaPageMock.description}</S.Description>
          </S.HeaderContent>

          <S.HeaderActions>
            <S.SecondaryButton type="button" onClick={() => navigate("/app/empresa")}>Voltar ao painel</S.SecondaryButton>

            {isEditing ? (
              <>
                <S.GhostButton type="button" onClick={handleCancel}>
                  Cancelar
                </S.GhostButton>
                <S.PrimaryButton type="button" onClick={handleSave}>
                  Salvar alterações
                </S.PrimaryButton>
              </>
            ) : (
              <S.PrimaryButton type="button" onClick={() => setIsEditing(true)}>
                Editar perfil
              </S.PrimaryButton>
            )}
          </S.HeaderActions>
        </S.Header>

        <S.HeroCard>
          <S.HeroTop>
            <S.HeroBrand>
              <h2>{empresarioEmpresaPageMock.hero.companyName}</h2>
              <strong>{empresarioEmpresaPageMock.hero.legalName}</strong>
              <p>{empresarioEmpresaPageMock.hero.cnpj}</p>
              <p>{empresarioEmpresaPageMock.hero.location}</p>
            </S.HeroBrand>

            <S.HeroMeta>
              <S.MetaTag>{empresarioEmpresaPageMock.hero.founded}</S.MetaTag>
              <S.MetaTag>{empresarioEmpresaPageMock.hero.coverage}</S.MetaTag>
            </S.HeroMeta>
          </S.HeroTop>

          {isEditing ? (
            <S.Textarea
              value={draft.tagline}
              onChange={(event) => setDraft((previous) => ({ ...previous, tagline: event.target.value }))}
              rows={3}
            />
          ) : (
            <S.HeroTagline>{draft.tagline}</S.HeroTagline>
          )}

          <S.StatsGrid>
            {empresarioEmpresaPageMock.stats.map((item) => (
              <S.StatItem key={item.title}>
                <span>{item.title}</span>
                <strong>{item.value}</strong>
                <p>{item.helper}</p>
              </S.StatItem>
            ))}
          </S.StatsGrid>
        </S.HeroCard>

        <S.SectionGrid>
          <S.SectionCard>
            <S.SectionHeader>
              <h3>Sobre a empresa</h3>
              <p>Posicionamento e diferenciais operacionais</p>
            </S.SectionHeader>

            {isEditing ? (
              <S.Textarea
                value={draft.summary}
                onChange={(event) => setDraft((previous) => ({ ...previous, summary: event.target.value }))}
                rows={6}
              />
            ) : (
              <S.Paragraph>{draft.summary}</S.Paragraph>
            )}

            <S.BulletList>
              {empresarioEmpresaPageMock.about.differentiators.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </S.BulletList>
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeader>
              <h3>Serviços oferecidos</h3>
              <p>Principais frentes da operação</p>
            </S.SectionHeader>

            <S.ServiceList>
              {empresarioEmpresaPageMock.services.map((service) => (
                <S.ServiceItem key={service.title}>
                  <strong>{service.title}</strong>
                  <p>{service.description}</p>
                  <span>{service.format}</span>
                </S.ServiceItem>
              ))}
            </S.ServiceList>
          </S.SectionCard>
        </S.SectionGrid>

        <S.SectionGrid>
          <S.SectionCard>
            <S.SectionHeader>
              <h3>Equipe da empresa</h3>
              <p>Referências principais da operação</p>
            </S.SectionHeader>

            <S.TeamList>
              {empresarioEmpresaPageMock.team.map((member) => (
                <S.TeamItem key={member.name}>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                  <p>{member.note}</p>
                </S.TeamItem>
              ))}
            </S.TeamList>
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeader>
              <h3>Contatos</h3>
              <p>Canais oficiais da empresa</p>
            </S.SectionHeader>

            <S.ContactGrid>
              {empresarioEmpresaPageMock.contacts.map((contact) => (
                <S.ContactItem key={contact.label}>
                  <span>{contact.label}</span>
                  {isEditing ? (
                    <S.Input
                      value={draft.contacts[contact.label]}
                      onChange={(event) =>
                        setDraft((previous) => ({
                          ...previous,
                          contacts: {
                            ...previous.contacts,
                            [contact.label]: event.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    <strong>{draft.contacts[contact.label]}</strong>
                  )}
                </S.ContactItem>
              ))}
            </S.ContactGrid>
          </S.SectionCard>
        </S.SectionGrid>

        <S.SectionCard>
          <S.SectionHeader>
            <h3>Galeria de trabalhos</h3>
            <p>Destaques recentes da operação</p>
          </S.SectionHeader>

          <S.GalleryGrid>
            {empresarioEmpresaPageMock.gallery.map((item) => (
              <S.GalleryItem key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </S.GalleryItem>
            ))}
          </S.GalleryGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <h3>Avaliações e depoimentos</h3>
            <p>Percepção de clientes sobre a execução da empresa</p>
          </S.SectionHeader>

          <S.ReviewList>
            {empresarioEmpresaPageMock.reviews.map((review) => (
              <S.ReviewItem key={`${review.author}-${review.message}`}>
                <strong>{review.author}</strong>
                <span>{review.role}</span>
                <S.Rating>{renderStars(review.rating)}</S.Rating>
                <p>{review.message}</p>
                <S.ValidatedBadge>Depoimento validado</S.ValidatedBadge>
              </S.ReviewItem>
            ))}
          </S.ReviewList>
        </S.SectionCard>
      </S.Container>
    </S.Page>
  );
};
