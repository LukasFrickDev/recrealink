import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { Badge, Card, SectionHeader } from "@/shared/ui";
import { empresarioOrcamentosPageMock } from "@/modules/empresa/mocks/orcamentos";
import * as S from "./styles";

export const EmpresarioOrcamentosPage = () => {
  return (
    <DashboardShell
      userName={empresarioOrcamentosPageMock.userName}
      pageTitle={empresarioOrcamentosPageMock.title}
      pageDescription={empresarioOrcamentosPageMock.description}
      stats={empresarioOrcamentosPageMock.stats}
    >
      <S.Wrapper>
        <SectionHeader
          title="Pipeline comercial"
          subtitle="Visualize o fluxo de propostas por etapa e mantenha o fechamento previsível."
          action={<S.PrimaryAction type="button">Nova proposta</S.PrimaryAction>}
        />

        <S.PipelineGrid>
          {empresarioOrcamentosPageMock.pipeline.map((column) => (
            <S.PipelineColumn key={column.id}>
              <S.PipelineHeader>
                <div>
                  <strong>{column.title}</strong>
                  <span>{column.amount}</span>
                </div>
                <Badge tone="brand">{column.opportunities.length}</Badge>
              </S.PipelineHeader>

              <S.OpportunityList>
                {column.opportunities.map((opportunity) => (
                  <S.OpportunityCard key={`${column.id}-${opportunity.client}`}>
                    <header>
                      <strong>{opportunity.client}</strong>
                      <Badge tone={opportunity.priority === "Alta" ? "warning" : "neutral"}>
                        {opportunity.priority}
                      </Badge>
                    </header>
                    <p>{opportunity.service}</p>
                    <S.OpportunityMeta>
                      <span>{opportunity.value}</span>
                      <span>{opportunity.deadline}</span>
                    </S.OpportunityMeta>
                  </S.OpportunityCard>
                ))}
              </S.OpportunityList>
            </S.PipelineColumn>
          ))}
        </S.PipelineGrid>

        <S.ContentGrid>
          <Card title="Modelos de proposta" subtitle="Pacotes comerciais prontos para adaptação">
            <S.TemplateList>
              {empresarioOrcamentosPageMock.templates.map((template) => (
                <S.TemplateItem key={template.name}>
                  <strong>{template.name}</strong>
                  <p>{template.audience}</p>
                  <span>{template.range}</span>
                </S.TemplateItem>
              ))}
            </S.TemplateList>
          </Card>

          <Card title="Follow-ups de hoje" subtitle="Ações com prioridade operacional">
            <S.FollowUpList>
              {empresarioOrcamentosPageMock.followUps.map((item) => (
                <S.FollowUpItem key={`${item.title}-${item.client}`}>
                  <strong>{item.title}</strong>
                  <p>{item.client}</p>
                  <S.FollowUpMeta>
                    <span>{item.owner}</span>
                    <span>{item.deadline}</span>
                  </S.FollowUpMeta>
                </S.FollowUpItem>
              ))}
            </S.FollowUpList>
          </Card>
        </S.ContentGrid>

        <Card title="Playbook de fechamento" subtitle="Rotina comercial para elevar taxa de conversão">
          <S.PlaybookList>
            {empresarioOrcamentosPageMock.closingPlaybook.map((step) => (
              <S.PlaybookItem key={step}>{step}</S.PlaybookItem>
            ))}
          </S.PlaybookList>
        </Card>
      </S.Wrapper>
    </DashboardShell>
  );
};
