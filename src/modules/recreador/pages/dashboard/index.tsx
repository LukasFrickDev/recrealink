import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  LifeBuoy,
  MapPin,
  Send,
  ShieldAlert,
  Star,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import {
  recreadorDashboardMock,
  type OperationalAlertSeverity,
  type OperationalPriorityTone,
} from "@/modules/recreador/mocks/dashboard";
import * as S from "@/modules/recreador/pages/dashboard/styles";

const priorityIconMap: Record<OperationalPriorityTone, LucideIcon> = {
  warning: AlertTriangle,
  info: Send,
  success: CheckCircle2,
  danger: ShieldAlert,
};

const alertIconMap: Record<OperationalAlertSeverity, LucideIcon> = {
  warning: AlertTriangle,
  danger: ShieldAlert,
  info: CheckCircle2,
};

const quickActionIconMap: Record<string, LucideIcon> = {
  perfil: UserRound,
  oportunidades: Send,
  convites: AlertTriangle,
  disponibilidade: CalendarClock,
  suporte: LifeBuoy,
};

const getApplicationTone = (statusLabel: string): "warning" | "info" =>
  statusLabel === "Convite recebido" ? "warning" : "info";

const renderRatingStars = (rating: number, idPrefix: string) => (
  <S.Stars>
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={`${idPrefix}-${index + 1}`}
        size={13}
        fill={index < Math.round(rating) ? "currentColor" : "none"}
      />
    ))}
  </S.Stars>
);

export const RecreadorDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorDashboardMock.title}
      pageDescription={recreadorDashboardMock.description}
      stats={[...recreadorDashboardMock.stats]}
    >
      <S.Wrapper>
        <S.HeroCard>
          <S.HeroBadge>{recreadorDashboardMock.hero.badge}</S.HeroBadge>
          <S.HeroTitle>{recreadorDashboardMock.hero.title}</S.HeroTitle>
          <S.HeroDescription>{recreadorDashboardMock.hero.description}</S.HeroDescription>
          <S.HeroFocus>{recreadorDashboardMock.focusMessage}</S.HeroFocus>
          <S.HeroActions>
            <S.PrimaryButton
              type="button"
              onClick={() => navigate(recreadorDashboardMock.hero.primaryAction.route)}
            >
              {recreadorDashboardMock.hero.primaryAction.label}
            </S.PrimaryButton>
            <S.SecondaryButton
              type="button"
              onClick={() => navigate(recreadorDashboardMock.hero.secondaryAction.route)}
            >
              {recreadorDashboardMock.hero.secondaryAction.label}
            </S.SecondaryButton>
          </S.HeroActions>
        </S.HeroCard>

        <S.PrioritiesGrid>
          {recreadorDashboardMock.priorities.map((item) => {
            const Icon = priorityIconMap[item.tone];

            return (
              <S.PriorityCard key={item.id} $tone={item.tone}>
                <S.PriorityTop>
                  <S.PriorityIconWrap $tone={item.tone}>
                    <Icon size={16} />
                  </S.PriorityIconWrap>
                  <S.PriorityValue>{item.value}</S.PriorityValue>
                </S.PriorityTop>
                <S.PriorityTitle>{item.title}</S.PriorityTitle>
                <S.PriorityHelper>{item.helper}</S.PriorityHelper>
                <S.CardActionButton type="button" onClick={() => navigate(item.action.route)}>
                  {item.action.label}
                  <ArrowRight size={14} />
                </S.CardActionButton>
              </S.PriorityCard>
            );
          })}
        </S.PrioritiesGrid>

        <S.QuickActionsCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Acesso rapido aos eixos do modulo</S.SectionTitle>
              <S.SectionSubtitle>
                O dashboard resume e direciona. A execucao detalhada permanece nas paginas nucleo.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.QuickActionsGrid>
            {recreadorDashboardMock.quickActions.map((action) => {
              const Icon = quickActionIconMap[action.id] ?? ArrowRight;

              return (
                <S.QuickActionButton key={action.id} type="button" onClick={() => navigate(action.route)}>
                  <S.QuickActionHeader>
                    <Icon size={15} />
                    <span>{action.label}</span>
                  </S.QuickActionHeader>
                  <S.QuickActionCopy>{action.helper}</S.QuickActionCopy>
                </S.QuickActionButton>
              );
            })}
          </S.QuickActionsGrid>
        </S.QuickActionsCard>

        <S.TwoColumn>
          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Convites pendentes</S.SectionTitle>
                <S.SectionSubtitle>Decisoes com prazo para aceite ou recusa.</S.SectionSubtitle>
              </S.SectionTitleWrap>
              <S.HeaderActionButton type="button" onClick={() => navigate("/app/recreador/convites")}>
                Abrir convites
                <ArrowRight size={14} />
              </S.HeaderActionButton>
            </S.SectionHeader>

            {recreadorDashboardMock.pendingInvites.length === 0 ? (
              <S.EmptyState>Sem convites pendentes no momento.</S.EmptyState>
            ) : (
              <S.DataList>
                {recreadorDashboardMock.pendingInvites.map((item) => (
                  <S.DataCard key={item.id}>
                    <S.DataHeader>
                      <S.CodeBadge>{item.code}</S.CodeBadge>
                      <S.StateBadge $tone="warning">Prazo ativo</S.StateBadge>
                    </S.DataHeader>
                    <S.ItemTitle>{item.originName}</S.ItemTitle>
                    <S.ItemMeta>{item.periodLabel}</S.ItemMeta>
                    <S.ItemMeta>
                      <Clock3 size={13} /> Responder ate {item.deadlineLabel}
                    </S.ItemMeta>
                    <S.RowActionButton type="button" onClick={() => navigate(item.route)}>
                      Ver convite
                    </S.RowActionButton>
                  </S.DataCard>
                ))}
              </S.DataList>
            )}
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Alertas importantes</S.SectionTitle>
                <S.SectionSubtitle>
                  Itens que exigem ajuste para manter operacao previsivel.
                </S.SectionSubtitle>
              </S.SectionTitleWrap>
            </S.SectionHeader>

            <S.AlertList>
              {recreadorDashboardMock.alerts.map((item) => {
                const Icon = alertIconMap[item.severity];

                return (
                  <S.AlertCard key={item.id} $severity={item.severity}>
                    <S.AlertHeader>
                      <Icon size={15} />
                      <strong>{item.title}</strong>
                    </S.AlertHeader>
                    <S.AlertMessage>{item.message}</S.AlertMessage>
                    <S.RowActionButton type="button" onClick={() => navigate(item.action.route)}>
                      {item.action.label}
                    </S.RowActionButton>
                  </S.AlertCard>
                );
              })}
            </S.AlertList>
          </S.SectionCard>
        </S.TwoColumn>

        <S.TwoColumn>
          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Oportunidades em destaque</S.SectionTitle>
                <S.SectionSubtitle>
                  Recorte rapido para iniciar novas candidaturas com contexto.
                </S.SectionSubtitle>
              </S.SectionTitleWrap>
              <S.HeaderActionButton
                type="button"
                onClick={() => navigate("/app/recreador/oportunidades")}
              >
                Ver oportunidades
                <ArrowRight size={14} />
              </S.HeaderActionButton>
            </S.SectionHeader>

            <S.DataList>
              {recreadorDashboardMock.featuredOpportunities.map((item) => (
                <S.DataCard key={item.id}>
                  <S.DataHeader>
                    <S.CodeBadge>{item.code}</S.CodeBadge>
                    <S.StateBadge $tone="info">{item.originLabel}</S.StateBadge>
                  </S.DataHeader>
                  <S.ItemTitle>{item.roleLabel}</S.ItemTitle>
                  <S.ItemMeta>{item.originName}</S.ItemMeta>
                  <S.ItemMeta>
                    <MapPin size={13} /> {item.cityLabel}
                  </S.ItemMeta>
                  <S.ItemMeta>{item.periodLabel}</S.ItemMeta>
                  <S.ItemMeta>{item.compensationLabel}</S.ItemMeta>
                  <S.RowActionButton type="button" onClick={() => navigate(item.route)}>
                    Abrir oportunidade
                  </S.RowActionButton>
                </S.DataCard>
              ))}
            </S.DataList>
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Candidaturas em andamento</S.SectionTitle>
                <S.SectionSubtitle>Status do que ja foi enviado no fluxo de vagas.</S.SectionSubtitle>
              </S.SectionTitleWrap>
            </S.SectionHeader>

            {recreadorDashboardMock.activeApplications.length === 0 ? (
              <S.EmptyState>Nenhuma candidatura em andamento no momento.</S.EmptyState>
            ) : (
              <S.DataList>
                {recreadorDashboardMock.activeApplications.map((item) => (
                  <S.DataCard key={item.id}>
                    <S.DataHeader>
                      <S.CodeBadge>{item.code}</S.CodeBadge>
                      <S.StateBadge $tone={getApplicationTone(item.statusLabel)}>
                        {item.statusLabel}
                      </S.StateBadge>
                    </S.DataHeader>
                    <S.ItemTitle>{item.roleLabel}</S.ItemTitle>
                    <S.ItemMeta>{item.originName}</S.ItemMeta>
                    <S.ItemMeta>{item.helper}</S.ItemMeta>
                    <S.RowActionButton type="button" onClick={() => navigate(item.route)}>
                      Acompanhar
                    </S.RowActionButton>
                  </S.DataCard>
                ))}
              </S.DataList>
            )}
          </S.SectionCard>
        </S.TwoColumn>

        <S.TwoColumn>
          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Proximos compromissos</S.SectionTitle>
                <S.SectionSubtitle>
                  Itens aceitos ou confirmados que impactam a agenda operacional.
                </S.SectionSubtitle>
              </S.SectionTitleWrap>
            </S.SectionHeader>

            {recreadorDashboardMock.nextCommitments.length === 0 ? (
              <S.EmptyState>Sem compromissos futuros no momento.</S.EmptyState>
            ) : (
              <S.DataList>
                {recreadorDashboardMock.nextCommitments.map((item) => (
                  <S.DataCard key={item.id}>
                    <S.DataHeader>
                      <S.CodeBadge>{item.code}</S.CodeBadge>
                      <S.StateBadge $tone="success">Compromisso</S.StateBadge>
                    </S.DataHeader>
                    <S.ItemTitle>{item.roleLabel}</S.ItemTitle>
                    <S.ItemMeta>{item.originName}</S.ItemMeta>
                    <S.ItemMeta>
                      <CalendarClock size={13} /> {item.dateLabel}
                    </S.ItemMeta>
                    <S.ItemMeta>{item.scheduleLabel}</S.ItemMeta>
                    <S.ItemMeta>{item.helper}</S.ItemMeta>
                    <S.RowActionButton type="button" onClick={() => navigate(item.route)}>
                      Ajustar disponibilidade
                    </S.RowActionButton>
                  </S.DataCard>
                ))}
              </S.DataList>
            )}
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Resumo de disponibilidade</S.SectionTitle>
                <S.SectionSubtitle>
                  Panorama rapido da agenda para decidir novos convites e candidaturas.
                </S.SectionSubtitle>
              </S.SectionTitleWrap>
              <S.HeaderActionButton
                type="button"
                onClick={() => navigate("/app/recreador/disponibilidade")}
              >
                Abrir disponibilidade
                <ArrowRight size={14} />
              </S.HeaderActionButton>
            </S.SectionHeader>

            <S.AvailabilityList>
              {recreadorDashboardMock.availabilitySummary.map((item) => (
                <S.AvailabilityRow key={item.id} $tone={item.tone}>
                  <S.AvailabilityCopy>
                    <strong>{item.label}</strong>
                    <span>{item.helper}</span>
                  </S.AvailabilityCopy>
                  <S.AvailabilityValue>{item.value}</S.AvailabilityValue>
                </S.AvailabilityRow>
              ))}
            </S.AvailabilityList>
          </S.SectionCard>
        </S.TwoColumn>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Avaliacoes recentes</S.SectionTitle>
              <S.SectionSubtitle>
                Sinal de reputacao para orientar ajustes no perfil e na execucao operacional.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
            <S.HeaderActionButton type="button" onClick={() => navigate("/app/recreador/perfil")}>
              Abrir perfil
              <ArrowRight size={14} />
            </S.HeaderActionButton>
          </S.SectionHeader>

          <S.ReviewList>
            {recreadorDashboardMock.recentReviews.map((item) => (
              <S.ReviewCard key={item.id}>
                <S.ReviewTop>
                  <strong>{item.sourceLabel}</strong>
                  <span>{item.dateLabel}</span>
                </S.ReviewTop>
                {renderRatingStars(item.rating, item.id)}
                <S.ReviewText>{item.comment}</S.ReviewText>
                <S.RowActionButton type="button" onClick={() => navigate(item.route)}>
                  Ver perfil e avaliacoes
                </S.RowActionButton>
              </S.ReviewCard>
            ))}
          </S.ReviewList>
        </S.SectionCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};