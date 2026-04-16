import { Badge, Card, SectionHeader } from "@/shared/ui";
import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { empresarioRecreadorPageMock } from "@/modules/empresa/mocks/perfil-recreador";
import * as S from "./styles";

const buildInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, index) => (index < rating ? "★" : "☆")).join("");

export const EmpresarioRecreadorPage = () => {
  const { profile } = empresarioRecreadorPageMock;

  return (
    <DashboardShell
      userName={empresarioRecreadorPageMock.userName}
      pageTitle={empresarioRecreadorPageMock.title}
      pageDescription={empresarioRecreadorPageMock.description}
      stats={empresarioRecreadorPageMock.stats}
    >
      <S.Wrapper>
        <SectionHeader
          title="Perfil do recreador"
          subtitle="Avalie experiência, especialidades e aderência ao padrão de execução da empresa."
        />

        <S.HeroCard>
          <S.HeroTop>
            <S.ProfileIdentity>
              <S.AvatarBubble>{buildInitials(profile.fullName)}</S.AvatarBubble>
              <S.IdentityText>
                <h3>{profile.fullName}</h3>
                <strong>{profile.artisticName}</strong>
                <p>{profile.role}</p>
              </S.IdentityText>
            </S.ProfileIdentity>

            <S.HeroMeta>
              <S.MetaTag>{profile.experience}</S.MetaTag>
              <S.MetaTag>{profile.location}</S.MetaTag>
              <S.MetaTag>{profile.coverage}</S.MetaTag>
            </S.HeroMeta>
          </S.HeroTop>

          <S.HeroAbout>{profile.about}</S.HeroAbout>
        </S.HeroCard>

        <S.Grid>
          <Card title="Especialidades" subtitle="Competências com maior aderência aos contratos da empresa">
            <S.Chips>
              {profile.specialties.map((specialty) => (
                <S.Chip key={specialty}>{specialty}</S.Chip>
              ))}
            </S.Chips>
          </Card>

          <Card title="Disponibilidade" subtitle="Janelas de atuação para novas escalas">
            <S.List>
              {profile.availability.map((slot) => (
                <S.ListItem key={slot}>
                  <strong>{slot}</strong>
                  <p>Disponibilidade validada para operação.</p>
                </S.ListItem>
              ))}
            </S.List>
          </Card>
        </S.Grid>

        <S.Grid>
          <Card title="Certificações" subtitle="Formações relevantes para eventos e segurança">
            <S.List>
              {empresarioRecreadorPageMock.certifications.map((certification) => (
                <S.ListItem key={certification.title}>
                  <strong>{certification.title}</strong>
                  <span>{certification.institution}</span>
                  <p>Conclusão em {certification.year}</p>
                </S.ListItem>
              ))}
            </S.List>
          </Card>

          <Card title="Contatos" subtitle="Canais profissionais para alinhamento rápido">
            <S.ContactList>
              {profile.contacts.map((contact) => (
                <S.ContactRow key={contact.label}>
                  <span>{contact.label}</span>
                  <strong>{contact.value}</strong>
                </S.ContactRow>
              ))}
            </S.ContactList>
          </Card>
        </S.Grid>

        <Card title="Portfólio recente" subtitle="Entregas com maior relevância para o perfil de contratação">
          <S.List>
            {empresarioRecreadorPageMock.portfolio.map((project) => (
              <S.ListItem key={project.title}>
                <strong>{project.title}</strong>
                <span>{project.audience}</span>
                <p>{project.summary}</p>
              </S.ListItem>
            ))}
          </S.List>
        </Card>

        <Card title="Feedbacks recentes" subtitle="Percepção de clientes sobre desempenho em campo">
          <S.List>
            {empresarioRecreadorPageMock.recentFeedbacks.map((feedback) => (
              <S.ListItem key={`${feedback.author}-${feedback.message}`}>
                <strong>{feedback.author}</strong>
                <S.Rating>{renderStars(feedback.rating)}</S.Rating>
                <p>{feedback.message}</p>
                <Badge tone="brand">Validação operacional</Badge>
              </S.ListItem>
            ))}
          </S.List>
        </Card>
      </S.Wrapper>
    </DashboardShell>
  );
};
