import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  CheckSquare,
  Heart,
  Info,
  LifeBuoy,
  MapPin,
  MessageCircle,
  Palette,
  Star,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import * as S from "./styles";
import {
  recreadorDashboardMock,
  type HeroMetricIconKey,
  type RecommendationIconKey,
  type ToolIconKey,
  type WorkSourceIconKey,
} from "@/modules/recreador/mocks/dashboard";

const heroMetricIconMap: Record<HeroMetricIconKey, LucideIcon> = {
  users: Users,
  map: MapPin,
  building: Building,
  calendar: Calendar,
};

const toolIconMap: Record<ToolIconKey, LucideIcon> = {
  profile: UserRound,
  hotels: Building,
  agenda: Calendar,
  checklist: CheckSquare,
  registro: BookOpen,
  support: LifeBuoy,
};

const workSourceIconMap: Record<WorkSourceIconKey, LucideIcon> = {
  building: Building,
  map: MapPin,
  calendar: Calendar,
  users: Users,
  palette: Palette,
};

const recommendationIconMap: Record<RecommendationIconKey, LucideIcon> = {
  calendar: Calendar,
  building: Building,
  users: Users,
};

const opportunityUrgencyLabel = {
  alta: "Urgente",
  media: "Médio prazo",
  baixa: "Flexivel",
} as const;

export const RecreadorDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorDashboardMock.title}
      pageDescription={recreadorDashboardMock.description}
      stats={recreadorDashboardMock.stats}
    >
      <S.Wrapper>
        <S.HeroCard>
          <S.HeroGrid>
            <S.HeroCopy>
              <S.StatusPill>
                <S.StatusDot />
                {recreadorDashboardMock.hero.badge}
              </S.StatusPill>
              <S.HeroTitle>{recreadorDashboardMock.hero.title}</S.HeroTitle>
              <S.HeroDescription>{recreadorDashboardMock.hero.description}</S.HeroDescription>
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
            </S.HeroCopy>

            <S.HeroMetricsGrid>
              {recreadorDashboardMock.hero.metrics.map((metric) => {
                const Icon = heroMetricIconMap[metric.icon];

                return (
                  <S.HeroMetricCard key={metric.title} $tone={metric.tone}>
                    <S.HeroMetricTop>
                      <S.HeroMetricValue>{metric.value}</S.HeroMetricValue>
                      <Icon size={18} />
                    </S.HeroMetricTop>
                    <S.HeroMetricTitle>{metric.title}</S.HeroMetricTitle>
                    <S.HeroMetricHelper>{metric.helper}</S.HeroMetricHelper>
                  </S.HeroMetricCard>
                );
              })}
            </S.HeroMetricsGrid>
          </S.HeroGrid>
        </S.HeroCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Ferramentas básicas do plano FREE</S.SectionTitle>
              <S.SectionSubtitle>
                Atalhos essenciais da home do recreador sem aprofundar subpáginas nesta rodada.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.ToolsGrid>
            {recreadorDashboardMock.freeTools.map((tool) => {
              const Icon = toolIconMap[tool.icon];

              return (
                <S.ToolCard key={tool.id}>
                  <S.ToolTop>
                    <S.ToolIconWrap>
                      <Icon size={17} />
                    </S.ToolIconWrap>
                    <S.ToolBadge>{tool.badge}</S.ToolBadge>
                  </S.ToolTop>
                  <S.ToolTitle>{tool.title}</S.ToolTitle>
                  <S.ToolDescription>{tool.description}</S.ToolDescription>
                  <S.ToolActionButton type="button" onClick={() => navigate(tool.route)}>
                    Abrir ferramenta
                  </S.ToolActionButton>
                </S.ToolCard>
              );
            })}
          </S.ToolsGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Hotéis em destaque</S.SectionTitle>
              <S.SectionSubtitle>
                Base principal de oportunidades para a camada gratuita nesta etapa.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
            <S.HeaderActionButton
              type="button"
              onClick={() => navigate("/app/recreador/ferramentas/hoteis")}
            >
              Ver vitrine
              <ArrowRight size={14} />
            </S.HeaderActionButton>
          </S.SectionHeader>

          <S.HotelsGrid>
            {recreadorDashboardMock.featuredHotels.map((hotel) => (
              <S.HotelCard key={hotel.id}>
                <S.HotelImage $image={hotel.image} />
                <S.HotelBody>
                  <S.HotelTop>
                    <S.HotelName>{hotel.name}</S.HotelName>
                    <S.HotelBadge>{hotel.badge}</S.HotelBadge>
                  </S.HotelTop>
                  <S.HotelLocation>
                    <MapPin size={13} />
                    {hotel.location}
                  </S.HotelLocation>
                  <S.HotelDescription>{hotel.description}</S.HotelDescription>
                  <S.HotelActionButton type="button" onClick={() => navigate(hotel.route)}>
                    Ver hotel
                  </S.HotelActionButton>
                </S.HotelBody>
              </S.HotelCard>
            ))}
          </S.HotelsGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Hotéis populares entre recreadores</S.SectionTitle>
              <S.SectionSubtitle>
                Operações com maior procura e histórico frequente de contratação.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.HotelsGrid>
            {recreadorDashboardMock.popularHotels.map((hotel) => (
              <S.HotelCard key={hotel.id}>
                <S.HotelImage $image={hotel.image} />
                <S.HotelBody>
                  <S.HotelTop>
                    <S.HotelName>{hotel.name}</S.HotelName>
                    <S.HotelBadge>{hotel.badge}</S.HotelBadge>
                  </S.HotelTop>
                  <S.HotelLocation>
                    <MapPin size={13} />
                    {hotel.location}
                  </S.HotelLocation>
                  <S.HotelDescription>{hotel.description}</S.HotelDescription>
                  <S.HotelActionButton type="button" onClick={() => navigate(hotel.route)}>
                    Ver detalhes
                  </S.HotelActionButton>
                </S.HotelBody>
              </S.HotelCard>
            ))}
          </S.HotelsGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Fontes de trabalho</S.SectionTitle>
              <S.SectionSubtitle>
                Leitura clara do que já está ativo e do que ficará para próximas etapas.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.WorkSourcesGrid>
            {recreadorDashboardMock.workSources.map((source) => {
              const Icon = workSourceIconMap[source.icon];
              const isActive = source.status === "ativo";

              return (
                <S.WorkSourceCard key={source.id} $active={isActive}>
                  <S.WorkSourceTop>
                    <S.WorkSourceNameWrap>
                      <S.WorkSourceIconWrap $active={isActive}>
                        <Icon size={16} />
                      </S.WorkSourceIconWrap>
                      <strong>{source.title}</strong>
                    </S.WorkSourceNameWrap>
                    <S.WorkSourceStatus $active={isActive}>
                      {isActive ? "Ativo" : "Em breve"}
                    </S.WorkSourceStatus>
                  </S.WorkSourceTop>
                  <S.WorkSourceDescription>{source.description}</S.WorkSourceDescription>
                  <S.WorkSourceVacancies>{source.vacancies}</S.WorkSourceVacancies>
                </S.WorkSourceCard>
              );
            })}
          </S.WorkSourcesGrid>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Região de atuação ativa</S.SectionTitle>
              <S.SectionSubtitle>
                Posicionamento territorial da home para manter foco e clareza de oportunidades.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.RegionBox>
            <S.RegionCity>
              <MapPin size={18} />
              {recreadorDashboardMock.region.city}
            </S.RegionCity>
            <S.RegionDescription>{recreadorDashboardMock.region.description}</S.RegionDescription>
            <S.RegionHelper>
              <Info size={14} />
              {recreadorDashboardMock.region.helper}
            </S.RegionHelper>
          </S.RegionBox>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Mural da comunidade</S.SectionTitle>
              <S.SectionSubtitle>
                Destaques recentes do feed, sem abrir ainda a pagina dedicada da comunidade.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.CommunityList>
            {recreadorDashboardMock.communityPosts.map((post) => (
              <S.CommunityCard key={post.id}>
                <S.CommunityTop>
                  <S.Avatar>{post.avatar}</S.Avatar>
                  <S.CommunityAuthorWrap>
                    <strong>{post.author}</strong>
                    <span>{post.time}</span>
                  </S.CommunityAuthorWrap>
                </S.CommunityTop>
                <S.CommunityActivity>{post.activity}</S.CommunityActivity>
                <S.CommunityAgeGroup>Faixa etária: {post.ageGroup}</S.CommunityAgeGroup>
                <S.CommunityMeta>
                  <S.MetaItem>
                    <Heart size={12} />
                    {post.likes}
                  </S.MetaItem>
                  <S.MetaItem>
                    <MessageCircle size={12} />
                    {post.comments}
                  </S.MetaItem>
                </S.CommunityMeta>
              </S.CommunityCard>
            ))}
          </S.CommunityList>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Recomendações personalizadas</S.SectionTitle>
              <S.SectionSubtitle>
                Ajustes simples para fortalecer perfil e aumentar match com contratantes.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.RecommendationList>
            {recreadorDashboardMock.recommendations.map((recommendation) => {
              const Icon = recommendationIconMap[recommendation.icon];

              return (
                <S.RecommendationCard key={recommendation.id}>
                  <S.RecommendationMain>
                    <S.RecommendationIcon>
                      <Icon size={16} />
                    </S.RecommendationIcon>
                    <S.RecommendationText>
                      <h4>{recommendation.title}</h4>
                      <p>{recommendation.description}</p>
                    </S.RecommendationText>
                  </S.RecommendationMain>
                  <S.RecommendationAction
                    type="button"
                    onClick={() => navigate(recommendation.route)}
                  >
                    {recommendation.cta}
                  </S.RecommendationAction>
                </S.RecommendationCard>
              );
            })}
          </S.RecommendationList>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Oportunidades rápidas</S.SectionTitle>
              <S.SectionSubtitle>
                Convites em evidência para apoiar a tomada de decisão sem sair do painel inicial.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
            <S.HeaderActionButton
              type="button"
              onClick={() => navigate("/app/recreador/ferramentas/hoteis?aba=vagas")}
            >
              Ver todas
              <ArrowRight size={14} />
            </S.HeaderActionButton>
          </S.SectionHeader>

          <S.OpportunityList>
            {recreadorDashboardMock.quickOpportunities.map((opportunity) => (
              <S.OpportunityCard key={opportunity.id}>
                <S.OpportunityTop>
                  <S.OpportunityHotel>
                    <Briefcase size={14} /> {opportunity.hotel}
                  </S.OpportunityHotel>
                  <S.UrgencyBadge $urgency={opportunity.urgency}>
                    {opportunityUrgencyLabel[opportunity.urgency]}
                  </S.UrgencyBadge>
                </S.OpportunityTop>

                <S.OpportunityMeta>
                  <S.OpportunityMetaItem>
                    <MapPin size={12} /> {opportunity.location}
                  </S.OpportunityMetaItem>
                  <S.OpportunityMetaItem>
                    <Users size={12} /> {opportunity.ageGroup}
                  </S.OpportunityMetaItem>
                  <S.OpportunityMetaItem>
                    <Calendar size={12} /> {opportunity.date}
                  </S.OpportunityMetaItem>
                  <S.OpportunityMetaItem>
                    <Target size={12} /> {opportunity.workType}
                  </S.OpportunityMetaItem>
                </S.OpportunityMeta>

                <S.OpportunityActions>
                  <S.OutlineActionButton
                    type="button"
                    onClick={() => navigate(opportunity.detailsRoute)}
                  >
                    Ver detalhes
                  </S.OutlineActionButton>
                  <S.SolidActionButton
                    type="button"
                    onClick={() => navigate(opportunity.applyRoute)}
                  >
                    Candidatar-se
                  </S.SolidActionButton>
                </S.OpportunityActions>
              </S.OpportunityCard>
            ))}
          </S.OpportunityList>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Avaliações e feedbacks</S.SectionTitle>
              <S.SectionSubtitle>
                Desempenho recente do seu perfil no ecossistema da recreação.
              </S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.PerformanceGrid>
            <S.RatingBox>
              <S.RatingValueLine>
                <Star size={19} />
                <strong>{recreadorDashboardMock.performance.rating.toFixed(1)}</strong>
                <span>Baseado em {recreadorDashboardMock.performance.totalReviews} avaliações</span>
              </S.RatingValueLine>

              <S.Stars>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={`rating-star-${index + 1}`}
                    size={15}
                    fill={index < Math.round(recreadorDashboardMock.performance.rating) ? "currentColor" : "none"}
                  />
                ))}
              </S.Stars>

              <S.PerformanceMetrics>
                {recreadorDashboardMock.performance.metrics.map((metric) => (
                  <S.MetricItem key={metric.label}>
                    <S.MetricHeader>
                      <span>{metric.label}</span>
                      <span>{metric.value}%</span>
                    </S.MetricHeader>
                    <S.MetricTrack>
                      <S.MetricFill $value={metric.value} />
                    </S.MetricTrack>
                  </S.MetricItem>
                ))}
              </S.PerformanceMetrics>
            </S.RatingBox>

            <S.FeedbackList>
              {recreadorDashboardMock.performance.recentFeedbacks.map((feedback) => (
                <S.FeedbackCard key={feedback.id}>
                  <S.FeedbackTop>
                    <strong>{feedback.hotel}</strong>
                    <span>{feedback.time}</span>
                  </S.FeedbackTop>
                  <S.Stars>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={`${feedback.id}-star-${index + 1}`}
                        size={13}
                        fill={index < feedback.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </S.Stars>
                  <S.FeedbackText>{feedback.comment}</S.FeedbackText>
                </S.FeedbackCard>
              ))}
            </S.FeedbackList>
          </S.PerformanceGrid>
        </S.SectionCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
