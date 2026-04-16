import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { Badge, Card, SectionHeader } from "@/shared/ui";
import { empresarioVagasPageMock } from "@/modules/empresa/mocks/vagas";
import * as S from "./styles";

export const EmpresarioVagasPage = () => {
  return (
    <DashboardShell
      userName={empresarioVagasPageMock.userName}
      pageTitle={empresarioVagasPageMock.title}
      pageDescription={empresarioVagasPageMock.description}
      stats={empresarioVagasPageMock.stats}
    >
      <S.Wrapper>
        <SectionHeader
          title="Gestão de vagas"
          subtitle="Publique posições, acompanhe candidaturas e acelere o processo seletivo."
          action={<S.PrimaryAction type="button">Publicar vaga</S.PrimaryAction>}
        />

        <S.MainGrid>
          <Card title="Vagas abertas" subtitle="Pontos ativos do recrutamento empresarial">
            <S.PositionList>
              {empresarioVagasPageMock.openPositions.map((position) => (
                <S.PositionItem key={`${position.title}-${position.date}`}>
                  <header>
                    <strong>{position.title}</strong>
                    <Badge tone={position.status === "Ativa" ? "success" : "warning"}>{position.status}</Badge>
                  </header>
                  <p>{position.location}</p>
                  <S.PositionMeta>
                    <span>{position.contract}</span>
                    <span>{position.date}</span>
                    <span>{position.compensation}</span>
                  </S.PositionMeta>
                  <S.PositionApplications>{position.applications}</S.PositionApplications>
                </S.PositionItem>
              ))}
            </S.PositionList>
          </Card>

          <Card title="Candidaturas em análise" subtitle="Perfis priorizados pela operação">
            <S.ApplicationList>
              {empresarioVagasPageMock.applications.map((application) => (
                <S.ApplicationItem key={`${application.name}-${application.targetRole}`}>
                  <header>
                    <strong>{application.name}</strong>
                    <Badge
                      tone={
                        application.status === "Aprovado"
                          ? "success"
                          : application.status === "Entrevista"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {application.status}
                    </Badge>
                  </header>
                  <p>{application.targetRole}</p>
                  <S.ApplicationMeta>
                    <span>{application.experience}</span>
                    <span>Nota {application.score}</span>
                  </S.ApplicationMeta>
                  <S.ApplicationHighlight>{application.highlight}</S.ApplicationHighlight>
                </S.ApplicationItem>
              ))}
            </S.ApplicationList>
          </Card>
        </S.MainGrid>

        <S.BottomGrid>
          <Card title="Etapas do processo seletivo" subtitle="Fluxo padrão para novas contratações">
            <S.StageList>
              {empresarioVagasPageMock.hiringStages.map((stage) => (
                <S.StageItem key={stage.title}>
                  <strong>{stage.title}</strong>
                  <p>{stage.description}</p>
                </S.StageItem>
              ))}
            </S.StageList>
          </Card>

          <Card title="Recomendações imediatas" subtitle="Ajustes para reduzir tempo de contratação">
            <S.RecommendationList>
              {empresarioVagasPageMock.recommendations.map((item) => (
                <S.RecommendationItem key={item}>{item}</S.RecommendationItem>
              ))}
            </S.RecommendationList>
          </Card>
        </S.BottomGrid>
      </S.Wrapper>
    </DashboardShell>
  );
};
