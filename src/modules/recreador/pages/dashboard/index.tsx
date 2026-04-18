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
import { recreadorPerfilMock } from "@/modules/recreador/mocks/perfil";
import * as S from "./styles";

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

const originVisualMap = {
  hotelaria: {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    label: "Operação em hotelaria",
  },
  eventos: {
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    label: "Operação em eventos",
  },
} as const;

const getApplicationTone = (statusLabel: string): "warning" | "info" =>
  statusLabel === "Convite recebido" ? "warning" : "info";

type FieldCopy = {
  text: string;
  isFallback: boolean;
};

const resolveFieldCopy = (value: string | undefined, fallback: string): FieldCopy => {
  const normalized = value?.trim();

  if (normalized && normalized.length > 0) {
    return {
      text: normalized,
      isFallback: false,
    };
  }

  return {
    text: fallback,
    isFallback: true,
  };
};

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
      stats={[]}
    >
      <S.Wrapper>
        <S.HeroRow>
          <S.HeroCard>
            <S.HeroBadge>{recreadorDashboardMock.hero.badge}</S.HeroBadge>
            <S.HeroTitle>{recreadorDashboardMock.hero.title}</S.HeroTitle>
            <S.HeroDescription>{recreadorDashboardMock.hero.description}</S.HeroDescription>
            <S.HeroFocus>{recreadorDashboardMock.focusMessage}</S.HeroFocus>

            <S.HeroContextGrid>
              {recreadorDashboardMock.featuredOpportunities.slice(0, 2).map((item) => {
                const visual = originVisualMap[item.originKind];

                return (
                  <S.HeroContextCard
                    key={item.id}
                    type="button"
                    onClick={() => navigate(`/app/recreador/oportunidades?codigo=${item.code}`)}
                  >
                    <S.HeroContextMedia>
                      <img src={visual.image} alt={`${item.originName} - ${visual.label}`} loading="lazy" />
                    </S.HeroContextMedia>
                    <S.HeroContextContent>
                      <strong>{item.originName}</strong>
                      <span>{item.roleLabel}</span>
                      <small>{item.periodLabel}</small>
                    </S.HeroContextContent>
                  </S.HeroContextCard>
                );
              })}
            </S.HeroContextGrid>

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

          <S.QuickActionsCard>
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Atalhos do dia</S.SectionTitle>
                <S.SectionSubtitle>Acoes frequentes para manter o fluxo em movimento.</S.SectionSubtitle>
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
        </S.HeroRow>

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

        <S.CoreGrid>
          <S.SectionCard $tone="core">
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Convites pendentes</S.SectionTitle>
              </S.SectionTitleWrap>
              <S.HeaderActionButton type="button" onClick={() => navigate("/app/recreador/convites")}>
                Abrir convites
                <ArrowRight size={14} />
              </S.HeaderActionButton>
            </S.SectionHeader>

            {recreadorDashboardMock.pendingInvites.length === 0 ? (
              <S.EmptyState>
                Sem convites pendentes no momento. Revise Oportunidades para ampliar novas candidaturas.
              </S.EmptyState>
            ) : (
              <S.FeatureRowList>
                {recreadorDashboardMock.pendingInvites.map((item) => (
                  <S.FeatureRowCard key={item.id}>
                    {(() => {
                      const originName = resolveFieldCopy(item.originName, "Origem ainda não informada.");
                      const roleLabel = resolveFieldCopy(item.roleLabel, "Detalhes da função em atualização.");
                      const periodLabel = resolveFieldCopy(item.periodLabel, "Período em definição.");
                      const deadlineLabel = resolveFieldCopy(item.deadlineLabel, "Prazo de resposta em atualização.");

                      return (
                        <>
                          <S.DataMedia>
                            <img
                              src={originVisualMap[item.originKind].image}
                              alt={`${item.originName} - ${originVisualMap[item.originKind].label}`}
                              loading="lazy"
                            />
                            <S.DataMediaOverlay>
                              <span>{originVisualMap[item.originKind].label}</span>
                            </S.DataMediaOverlay>
                          </S.DataMedia>

                          <S.FeatureBody>
                            <S.DataHeader>
                              <S.CodeBadge>{item.code}</S.CodeBadge>
                              <S.StateBadge $tone="warning">Resposta pendente</S.StateBadge>
                            </S.DataHeader>

                            <S.FeatureTitle $fallback={originName.isFallback}>{originName.text}</S.FeatureTitle>

                            <S.FeatureSecondary $fallback={roleLabel.isFallback}>{roleLabel.text}</S.FeatureSecondary>

                            <S.FeatureSupportRow $fallback={deadlineLabel.isFallback}>
                              <Clock3 size={13} />
                              {deadlineLabel.isFallback ? deadlineLabel.text : `Responder até ${deadlineLabel.text}`}
                            </S.FeatureSupportRow>

                            <S.FeatureSupportRow $fallback={periodLabel.isFallback}>
                              {periodLabel.text}
                            </S.FeatureSupportRow>

                            <S.FeatureActionRow>
                              <S.RowActionButton type="button" onClick={() => navigate(item.route)}>
                                Ver convite
                              </S.RowActionButton>
                            </S.FeatureActionRow>
                          </S.FeatureBody>
                        </>
                      );
                    })()}
                  </S.FeatureRowCard>
                ))}
              </S.FeatureRowList>
            )}
          </S.SectionCard>

          <S.SectionCard $tone="core">
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Oportunidades em destaque</S.SectionTitle>
              </S.SectionTitleWrap>
              <S.HeaderActionButton
                type="button"
                onClick={() => navigate("/app/recreador/oportunidades")}
              >
                Ver oportunidades
                <ArrowRight size={14} />
              </S.HeaderActionButton>
            </S.SectionHeader>

            <S.FeatureRowList>
              {recreadorDashboardMock.featuredOpportunities.map((item) => (
                <S.FeatureRowCard key={item.id}>
                  {(() => {
                    const originName = resolveFieldCopy(item.originName, "Origem ainda não informada.");
                    const roleLabel = resolveFieldCopy(item.roleLabel, "Detalhes da função em atualização.");
                    const cityLabel = resolveFieldCopy(item.cityLabel, "Local ainda não informado.");
                    const periodLabel = resolveFieldCopy(item.periodLabel, "");
                    const compensationLabel = resolveFieldCopy(item.compensationLabel, "");

                    const scheduleChunks = [periodLabel, compensationLabel]
                      .filter((chunk) => !chunk.isFallback)
                      .map((chunk) => chunk.text);

                    const scheduleSummary =
                      scheduleChunks.length > 0
                        ? scheduleChunks.join(" · ")
                        : "Detalhes de período e cachê em atualização.";

                    const scheduleIsFallback = scheduleChunks.length === 0;

                    return (
                      <>
                        <S.DataMedia>
                          <img
                            src={originVisualMap[item.originKind].image}
                            alt={`${item.originName} - ${originVisualMap[item.originKind].label}`}
                            loading="lazy"
                          />
                          <S.DataMediaOverlay>
                            <span>{item.originLabel}</span>
                          </S.DataMediaOverlay>
                        </S.DataMedia>

                        <S.FeatureBody>
                          <S.DataHeader>
                            <S.CodeBadge>{item.code}</S.CodeBadge>
                            <S.StateBadge $tone="info">Apta para candidatura</S.StateBadge>
                          </S.DataHeader>

                          <S.FeatureTitle $fallback={originName.isFallback}>{originName.text}</S.FeatureTitle>

                          <S.FeatureSecondary $fallback={roleLabel.isFallback}>{roleLabel.text}</S.FeatureSecondary>

                          <S.FeatureSupportRow $fallback={cityLabel.isFallback}>
                            <MapPin size={13} /> {cityLabel.text}
                          </S.FeatureSupportRow>

                          <S.FeatureSupportRow $fallback={scheduleIsFallback}>
                            {scheduleSummary}
                          </S.FeatureSupportRow>

                          <S.FeatureActionRow>
                            <S.RowActionButton type="button" onClick={() => navigate(item.route)}>
                              Abrir oportunidade
                            </S.RowActionButton>
                          </S.FeatureActionRow>
                        </S.FeatureBody>
                      </>
                    );
                  })()}
                </S.FeatureRowCard>
              ))}
            </S.FeatureRowList>
          </S.SectionCard>
        </S.CoreGrid>

        <S.SupportGrid>
          <S.SectionCard $tone="support">
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Alertas importantes</S.SectionTitle>
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

          <S.SectionCard $tone="support">
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Candidaturas em andamento</S.SectionTitle>
              </S.SectionTitleWrap>
            </S.SectionHeader>

            {recreadorDashboardMock.activeApplications.length === 0 ? (
              <S.EmptyState>
                Nenhuma candidatura em andamento no momento. Use Oportunidades para iniciar novos envios.
              </S.EmptyState>
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

          <S.SectionCard $tone="support">
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Próximos compromissos</S.SectionTitle>
              </S.SectionTitleWrap>
            </S.SectionHeader>

            {recreadorDashboardMock.nextCommitments.length === 0 ? (
              <S.EmptyState>
                Sem compromissos futuros no momento. Convites aceitos aparecerão aqui para acompanhamento.
              </S.EmptyState>
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

          <S.SectionCard $tone="support">
            <S.SectionHeader>
              <S.SectionTitleWrap>
                <S.SectionTitle>Resumo de disponibilidade</S.SectionTitle>
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
        </S.SupportGrid>

        <S.SectionCard $tone="review">
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Avaliações recentes</S.SectionTitle>
            </S.SectionTitleWrap>
            <S.HeaderActionButton type="button" onClick={() => navigate("/app/recreador/perfil")}>
              Abrir perfil
              <ArrowRight size={14} />
            </S.HeaderActionButton>
          </S.SectionHeader>

          <S.ReviewSummaryLine>
            <strong>{recreadorPerfilMock.dashboardReviewSummary.ratingAverage.toFixed(1)}</strong>
            {renderRatingStars(recreadorPerfilMock.dashboardReviewSummary.ratingAverage, "dashboard-summary")}
            <span>{recreadorPerfilMock.dashboardReviewSummary.totalReviews} avaliações</span>
          </S.ReviewSummaryLine>

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
                  Ver perfil e avaliações
                </S.RowActionButton>
              </S.ReviewCard>
            ))}
          </S.ReviewList>
        </S.SectionCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};