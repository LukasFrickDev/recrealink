import { Card, SectionHeader } from "@/shared/ui";
import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { empresarioDashboardPageMock } from "@/modules/empresa/mocks/dashboard";
import * as S from "./styles";

export const EmpresarioDashboardPage = () => {
  return (
    <DashboardShell
      userName={empresarioDashboardPageMock.userName}
      pageTitle={empresarioDashboardPageMock.title}
      pageDescription={empresarioDashboardPageMock.description}
      stats={empresarioDashboardPageMock.stats}
    >
      <S.Wrapper>
        <SectionHeader
          title="Visão executiva"
          subtitle="Acompanhe as métricas centrais, priorize ações e mantenha a operação da empresa previsível."
          action={<S.ActionButton type="button">Gerar relatório completo</S.ActionButton>}
        />

        <S.KpiGrid>
          {empresarioDashboardPageMock.kpis.map((item) => (
            <S.KpiCard key={item.title} $tone={item.tone as "blue" | "purple" | "green" | "amber"}>
              <strong>{item.title}</strong>
              <h3>{item.value}</h3>
              <p>{item.helper}</p>
            </S.KpiCard>
          ))}
        </S.KpiGrid>

        <S.ContentGrid>
          <Card title="Ações rápidas" subtitle="Atalhos operacionais para o dia a dia da empresa">
            <S.QuickActionList>
              {empresarioDashboardPageMock.quickActions.map((item) => (
                <S.QuickAction key={item.title} type="button">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </S.QuickAction>
              ))}
            </S.QuickActionList>
          </Card>

          <Card title="Atividades recentes" subtitle="Últimas movimentações da operação">
            <S.ActivityList>
              {empresarioDashboardPageMock.recentActivities.map((item) => (
                <S.ActivityItem key={`${item.title}-${item.time}`} $tone={item.tone as "blue" | "purple" | "green"}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <span>{item.time}</span>
                </S.ActivityItem>
              ))}
            </S.ActivityList>
          </Card>
        </S.ContentGrid>

        <Card title="Informações da empresa" subtitle="Base institucional para propostas e apresentação comercial">
          <S.CompanyGrid>
            <S.CompanyBlock>
              <h4>{empresarioDashboardPageMock.company.corporateName}</h4>
              <p>{empresarioDashboardPageMock.company.cnpj}</p>
              <p>{empresarioDashboardPageMock.company.founded}</p>
            </S.CompanyBlock>

            <S.CompanyBlock>
              <h4>Especialidades</h4>
              <S.Specialties>
                {empresarioDashboardPageMock.company.specialties.map((item) => (
                  <S.SpecialtyChip key={item}>{item}</S.SpecialtyChip>
                ))}
              </S.Specialties>
            </S.CompanyBlock>

            <S.CompanyBlock>
              <h4>Área de atuação</h4>
              <p>{empresarioDashboardPageMock.company.city}</p>
              <p>{empresarioDashboardPageMock.company.range}</p>
            </S.CompanyBlock>
          </S.CompanyGrid>
        </Card>
      </S.Wrapper>
    </DashboardShell>
  );
};
