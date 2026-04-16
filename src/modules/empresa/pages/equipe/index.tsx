import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { Badge, Card, SectionHeader } from "@/shared/ui";
import { empresarioEquipePageMock } from "@/modules/empresa/mocks/equipe";
import * as S from "./styles";

export const EmpresarioEquipePage = () => {
  return (
    <DashboardShell
      userName={empresarioEquipePageMock.userName}
      pageTitle={empresarioEquipePageMock.title}
      pageDescription={empresarioEquipePageMock.description}
      stats={empresarioEquipePageMock.stats}
    >
      <S.Wrapper>
        <SectionHeader
          title="Estrutura de equipes"
          subtitle="Acompanhe squads, movimentações e formação contínua do time operacional."
          action={<S.ActionButton type="button">Atualizar escala</S.ActionButton>}
        />

        <S.MainGrid>
          <Card title="Squads ativos" subtitle="Frentes de atendimento da semana">
            <S.SquadList>
              {empresarioEquipePageMock.squads.map((squad) => (
                <S.SquadItem key={squad.name}>
                  <header>
                    <strong>{squad.name}</strong>
                    <Badge tone={squad.status === "Stand-by" ? "warning" : "success"}>
                      {squad.status}
                    </Badge>
                  </header>
                  <p>{squad.specialty}</p>
                  <S.SquadMeta>
                    <span>Líder: {squad.leader}</span>
                    <span>{squad.members}</span>
                  </S.SquadMeta>
                </S.SquadItem>
              ))}
            </S.SquadList>
          </Card>

          <Card title="Movimentações do time" subtitle="Atualizações recentes da operação">
            <S.MovementList>
              {empresarioEquipePageMock.teamMovements.map((item) => (
                <S.MovementItem key={`${item.title}-${item.time}`}>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <span>{item.time}</span>
                </S.MovementItem>
              ))}
            </S.MovementList>
          </Card>
        </S.MainGrid>

        <S.SecondaryGrid>
          <Card title="Profissionais em destaque" subtitle="Disponibilidade para próximas entregas">
            <S.ProfessionalList>
              {empresarioEquipePageMock.professionals.map((professional) => (
                <S.ProfessionalItem key={professional.name}>
                  <div>
                    <strong>{professional.name}</strong>
                    <p>{professional.role}</p>
                  </div>
                  <S.ProfessionalMeta>
                    <span>{professional.availability}</span>
                    <span>Nota {professional.score}</span>
                  </S.ProfessionalMeta>
                </S.ProfessionalItem>
              ))}
            </S.ProfessionalList>
          </Card>

          <Card title="Trilha de desenvolvimento" subtitle="Ciclos de evolução do time">
            <S.TrackList>
              {empresarioEquipePageMock.developmentTracks.map((track) => (
                <S.TrackItem key={track.title}>
                  <strong>{track.title}</strong>
                  <p>{track.owner}</p>
                  <span>{track.cycle}</span>
                </S.TrackItem>
              ))}
            </S.TrackList>
          </Card>
        </S.SecondaryGrid>

        <Card title="Prioridades de contratação" subtitle="Demandas imediatas para sustentar a escala">
          <S.PriorityList>
            {empresarioEquipePageMock.hiringPriorities.map((priority) => (
              <S.PriorityItem key={priority}>{priority}</S.PriorityItem>
            ))}
          </S.PriorityList>
        </Card>
      </S.Wrapper>
    </DashboardShell>
  );
};
