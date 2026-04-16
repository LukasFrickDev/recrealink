import styled, { css } from "styled-components";
import type { HeroMetricTone, OpportunityUrgency } from "@/modules/recreador/mocks/dashboard";

const metricToneMap = {
  blue: css`
    border-color: rgba(46, 127, 240, 0.28);
    background: linear-gradient(145deg, rgba(46, 127, 240, 0.14), rgba(46, 127, 240, 0.03));
  `,
  purple: css`
    border-color: rgba(138, 97, 212, 0.28);
    background: linear-gradient(145deg, rgba(138, 97, 212, 0.14), rgba(138, 97, 212, 0.03));
  `,
  orange: css`
    border-color: rgba(249, 111, 38, 0.28);
    background: linear-gradient(145deg, rgba(249, 111, 38, 0.14), rgba(249, 111, 38, 0.03));
  `,
  rose: css`
    border-color: rgba(225, 105, 124, 0.28);
    background: linear-gradient(145deg, rgba(225, 105, 124, 0.14), rgba(225, 105, 124, 0.03));
  `,
};

const urgencyToneMap = {
  alta: css`
    background: rgba(211, 77, 98, 0.12);
    color: #b53b53;
    border-color: rgba(211, 77, 98, 0.26);
  `,
  media: css`
    background: rgba(227, 154, 18, 0.12);
    color: #b57a0f;
    border-color: rgba(227, 154, 18, 0.24);
  `,
  baixa: css`
    background: rgba(23, 167, 102, 0.12);
    color: #148655;
    border-color: rgba(23, 167, 102, 0.24);
  `,
};

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const HeroCard = styled.section`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 24px;
  background:
    radial-gradient(circle at 88% 6%, rgba(227, 118, 239, 0.15) 0%, rgba(227, 118, 239, 0) 46%),
    radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.14) 0%, rgba(249, 111, 38, 0) 50%),
    linear-gradient(138deg, rgba(46, 127, 240, 0.09) 0%, rgba(138, 97, 212, 0.08) 100%);
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 18px;
  }
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HeroCopy = styled.div`
  display: grid;
  align-content: flex-start;
  gap: 12px;
`;

export const StatusPill = styled.span`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(46, 127, 240, 0.28);
  background: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.03em;
`;

export const StatusDot = styled.i`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.success};
  box-shadow: 0 0 0 5px rgba(23, 167, 102, 0.17);
`;

export const HeroTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: clamp(24px, 4vw, 38px);
  line-height: 1.12;
`;

export const HeroDescription = styled.p`
  margin: 0;
  max-width: 62ch;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

export const PrimaryButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 42px;
  padding: 0 16px;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandPurple});
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(46, 127, 240, 0.24);
  }
`;

export const SecondaryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 42px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.85);
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const HeroMetricsGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HeroMetricCard = styled.article<{ $tone: HeroMetricTone }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 8px;

  ${({ $tone }) => metricToneMap[$tone]}
`;

export const HeroMetricTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const HeroMetricValue = styled.strong`
  font-size: 22px;
  line-height: 1;
`;

export const HeroMetricTitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
`;

export const HeroMetricHelper = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SectionCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 18px;
  display: grid;
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 14px;
  }
`;

export const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const SectionTitleWrap = styled.div`
  display: grid;
  gap: 5px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 20px;
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

export const HeaderActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 12px;
  font-weight: 700;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 8px 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    background: rgba(46, 127, 240, 0.06);
  }
`;

export const ToolsGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ToolCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 14px;
  background: linear-gradient(180deg, #fff 0%, rgba(238, 244, 255, 0.55) 100%);
  display: grid;
  gap: 10px;
`;

export const ToolTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`;

export const ToolIconWrap = styled.span`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.brandBlue};
  background: rgba(46, 127, 240, 0.12);
`;

export const ToolBadge = styled.span`
  border: 1px solid rgba(23, 167, 102, 0.24);
  color: ${({ theme }) => theme.colors.success};
  background: rgba(23, 167, 102, 0.08);
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 4px 8px;
`;

export const ToolTitle = styled.h4`
  margin: 0;
  font-size: 14px;
`;

export const ToolDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1.45;
`;

export const ToolActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 34px;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const HotelsGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HotelCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  display: grid;
  grid-template-rows: 132px auto;
`;

export const HotelImage = styled.div<{ $image: string }>`
  background-image:
    linear-gradient(180deg, rgba(28, 38, 64, 0.14), rgba(28, 38, 64, 0.48)),
    url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
`;

export const HotelBody = styled.div`
  padding: 12px;
  display: grid;
  gap: 8px;
`;

export const HotelTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

export const HotelName = styled.h4`
  margin: 0;
  font-size: 14px;
`;

export const HotelBadge = styled.span`
  border: 1px solid rgba(46, 127, 240, 0.25);
  background: rgba(46, 127, 240, 0.1);
  color: ${({ theme }) => theme.colors.brandBlue};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 10px;
  font-weight: 800;
  padding: 3px 8px;
`;

export const HotelLocation = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const HotelDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1.45;
`;

export const HotelActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 32px;
  background: #fff;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    background: rgba(46, 127, 240, 0.06);
  }
`;

export const WorkSourcesGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const WorkSourceCard = styled.article<{ $active: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 8px;
  background: ${({ $active }) => ($active ? "#fff" : "#f9fbff")};
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
`;

export const WorkSourceTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const WorkSourceNameWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  strong {
    font-size: 13px;
  }
`;

export const WorkSourceIconWrap = styled.span<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active }) => ($active ? "rgba(138, 97, 212, 0.14)" : "rgba(215, 224, 243, 0.75)")};
  color: ${({ $active, theme }) => ($active ? theme.colors.brandPurple : theme.colors.textMuted)};
`;

export const WorkSourceStatus = styled.span<{ $active: boolean }>`
  border: 1px solid
    ${({ $active }) => ($active ? "rgba(23, 167, 102, 0.24)" : "rgba(91, 104, 136, 0.22)")};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 10px;
  font-weight: 800;
  padding: 3px 8px;
  color: ${({ $active, theme }) => ($active ? theme.colors.success : theme.colors.textMuted)};
  background: ${({ $active }) => ($active ? "rgba(23, 167, 102, 0.08)" : "rgba(215, 224, 243, 0.4)")};
`;

export const WorkSourceDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1.4;
`;

export const WorkSourceVacancies = styled.p`
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const RegionBox = styled.div`
  border: 1px solid rgba(46, 127, 240, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(125deg, rgba(46, 127, 240, 0.08), rgba(227, 118, 239, 0.08));
  padding: 16px;
  display: grid;
  gap: 10px;
`;

export const RegionCity = styled.h4`
  margin: 0;
  font-size: 19px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const RegionDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.5;
`;

export const RegionHelper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 12px;
  font-weight: 700;
`;

export const CommunityList = styled.div`
  display: grid;
  gap: 10px;
`;

export const CommunityCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 8px;
  background: #fff;
`;

export const CommunityTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.brandBlue};
  background: rgba(46, 127, 240, 0.12);
`;

export const CommunityAuthorWrap = styled.div`
  display: grid;
  gap: 1px;

  strong {
    font-size: 13px;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CommunityActivity = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
`;

export const CommunityAgeGroup = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CommunityMeta = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 11px;
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

export const RecommendationList = styled.div`
  display: grid;
  gap: 10px;
`;

export const RecommendationCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const RecommendationMain = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const RecommendationIcon = styled.span`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.warning};
  background: rgba(227, 154, 18, 0.14);
`;

export const RecommendationText = styled.div`
  display: grid;
  gap: 4px;

  h4 {
    margin: 0;
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const RecommendationAction = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 34px;
  padding: 0 12px;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.brandBlue};
    border-color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const OpportunityList = styled.div`
  display: grid;
  gap: 12px;
`;

export const OpportunityCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 10px;
`;

export const OpportunityTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

export const OpportunityHotel = styled.h4`
  margin: 0;
  font-size: 14px;
`;

export const UrgencyBadge = styled.span<{ $urgency: OpportunityUrgency }>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 4px 8px;
  text-transform: uppercase;

  ${({ $urgency }) => urgencyToneMap[$urgency]}
`;

export const OpportunityMeta = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const OpportunityMetaItem = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const OpportunityActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const OutlineActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 34px;
  padding: 0 12px;
  background: #fff;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    background: rgba(46, 127, 240, 0.06);
  }
`;

export const SolidActionButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 34px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.brandOrange};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const PerformanceGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 0.92fr 1.08fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const RatingBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 14px;
  display: grid;
  gap: 12px;
  background: linear-gradient(160deg, rgba(23, 167, 102, 0.1), rgba(46, 127, 240, 0.05));
`;

export const RatingValueLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  strong {
    font-size: 32px;
    line-height: 1;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }
`;

export const Stars = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: ${({ theme }) => theme.colors.warning};
`;

export const PerformanceMetrics = styled.div`
  display: grid;
  gap: 8px;
`;

export const MetricItem = styled.div`
  display: grid;
  gap: 4px;
`;

export const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;

  span:last-child {
    font-weight: 700;
  }
`;

export const MetricTrack = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(28, 38, 64, 0.08);
  overflow: hidden;
`;

export const MetricFill = styled.div<{ $value: number }>`
  width: ${({ $value }) => `${$value}%`};
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandMagenta});
`;

export const FeedbackList = styled.div`
  display: grid;
  gap: 10px;
`;

export const FeedbackCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 8px;
`;

export const FeedbackTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;

  strong {
    font-size: 13px;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FeedbackText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1.45;
`;
