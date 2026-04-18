import styled, { css } from "styled-components";
import type {
  AvailabilitySummaryTone,
  OperationalAlertSeverity,
  OperationalPriorityTone,
} from "@/modules/recreador/mocks/dashboard";

type SectionTone = "core" | "support" | "review";
type PillTone = "neutral" | "info" | "warning" | "success" | "danger";

const priorityToneMap = {
  warning: css`
    border-color: rgba(227, 154, 18, 0.3);
    background: linear-gradient(165deg, rgba(227, 154, 18, 0.14), rgba(255, 255, 255, 0.96));
  `,
  info: css`
    border-color: rgba(46, 127, 240, 0.28);
    background: linear-gradient(165deg, rgba(46, 127, 240, 0.13), rgba(255, 255, 255, 0.96));
  `,
  success: css`
    border-color: rgba(23, 167, 102, 0.28);
    background: linear-gradient(165deg, rgba(23, 167, 102, 0.12), rgba(255, 255, 255, 0.96));
  `,
  danger: css`
    border-color: rgba(211, 77, 98, 0.3);
    background: linear-gradient(165deg, rgba(211, 77, 98, 0.13), rgba(255, 255, 255, 0.96));
  `,
};

const priorityIconToneMap = {
  warning: css`
    background: rgba(227, 154, 18, 0.16);
    color: #a56e0e;
  `,
  info: css`
    background: rgba(46, 127, 240, 0.16);
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  success: css`
    background: rgba(23, 167, 102, 0.16);
    color: ${({ theme }) => theme.colors.success};
  `,
  danger: css`
    background: rgba(211, 77, 98, 0.16);
    color: #b53b53;
  `,
};

const alertToneMap = {
  warning: css`
    border-color: rgba(227, 154, 18, 0.28);
    background: rgba(255, 247, 232, 0.84);

    svg {
      color: #a56e0e;
    }
  `,
  danger: css`
    border-color: rgba(211, 77, 98, 0.28);
    background: rgba(255, 239, 244, 0.88);

    svg {
      color: #b53b53;
    }
  `,
  info: css`
    border-color: rgba(46, 127, 240, 0.28);
    background: rgba(235, 244, 255, 0.88);

    svg {
      color: ${({ theme }) => theme.colors.brandBlue};
    }
  `,
};

const availabilityToneMap = {
  success: css`
    border-left-color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    border-left-color: ${({ theme }) => theme.colors.warning};
  `,
  danger: css`
    border-left-color: #b53b53;
  `,
  info: css`
    border-left-color: ${({ theme }) => theme.colors.brandBlue};
  `,
};

const sectionToneMap = {
  core: css`
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.surfaces.panelElevated};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  `,
  support: css`
    border-color: ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.surfaces.panel};
    box-shadow: none;
  `,
  review: css`
    border-color: ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.surfaces.panelSoft};
    box-shadow: none;
  `,
};

const pillToneMap = {
  neutral: css`
    border-color: rgba(91, 104, 136, 0.24);
    background: rgba(91, 104, 136, 0.08);
    color: ${({ theme }) => theme.colors.textMuted};
  `,
  info: css`
    border-color: rgba(46, 127, 240, 0.28);
    background: rgba(46, 127, 240, 0.1);
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  warning: css`
    border-color: rgba(227, 154, 18, 0.28);
    background: rgba(227, 154, 18, 0.12);
    color: #a56e0e;
  `,
  success: css`
    border-color: rgba(23, 167, 102, 0.28);
    background: rgba(23, 167, 102, 0.12);
    color: ${({ theme }) => theme.colors.success};
  `,
  danger: css`
    border-color: rgba(211, 77, 98, 0.3);
    background: rgba(211, 77, 98, 0.1);
    color: #b53b53;
  `,
};

export const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const HeroRow = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: minmax(0, 1.5fr) minmax(320px, 1fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HeroCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.18) 0%, rgba(46, 127, 240, 0) 42%),
    radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.15) 0%, rgba(249, 111, 38, 0) 46%),
    linear-gradient(155deg, rgba(46, 127, 240, 0.08), rgba(255, 255, 255, 0.97));
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const HeroBadge = styled.span`
  width: fit-content;
  min-height: 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(46, 127, 240, 0.28);
  background: rgba(255, 255, 255, 0.88);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
`;

export const HeroTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: clamp(1.45rem, 3.2vw, 2rem);
  line-height: 1.14;
`;

export const HeroDescription = styled.p`
  margin: 0;
  max-width: 66ch;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.6;
`;

export const HeroFocus = styled.p`
  margin: 0;
  border: 1px solid rgba(46, 127, 240, 0.24);
  border-left: 4px solid ${({ theme }) => theme.colors.brandBlue};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textStrong};
  font-weight: 600;
`;

export const HeroContextGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HeroContextCard = styled.button`
  border: 1px solid rgba(46, 127, 240, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  padding: 0.38rem;
  display: grid;
  gap: 0.44rem;
  text-align: left;
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(46, 127, 240, 0.34);
    box-shadow: 0 9px 16px rgba(46, 127, 240, 0.14);
  }
`;

export const HeroContextMedia = styled.span`
  height: 88px;
  border-radius: calc(${({ theme }) => theme.radii.md} - 2px);
  overflow: hidden;
  display: block;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.03), rgba(15, 23, 42, 0.5));
  }
`;

export const HeroContextContent = styled.span`
  display: grid;
  gap: 0.14rem;

  strong {
    color: ${({ theme }) => theme.colors.textStrong};
    font-size: ${({ theme }) => theme.typography.label};
    line-height: 1.25;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.meta};
    line-height: 1.35;
  }

  small {
    color: ${({ theme }) => theme.colors.brandBlue};
    font-size: ${({ theme }) => theme.typography.micro};
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const PrimaryButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.36);
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 40px;
  padding: 0 14px;
  background: linear-gradient(116deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: 0 10px 16px rgba(46, 127, 240, 0.2);
  transition: transform 150ms ease, filter 150ms ease, box-shadow 150ms ease;

  &:hover {
    filter: brightness(0.98);
    transform: translateY(-1px);
    box-shadow: 0 14px 20px rgba(46, 127, 240, 0.24);
  }
`;

export const SecondaryButton = styled.button`
  border: 1px solid rgba(46, 127, 240, 0.18);
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 40px;
  padding: 0 14px;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
    transform: translateY(-1px);
  }
`;

export const PrioritiesGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PriorityCard = styled.article<{ $tone: OperationalPriorityTone }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};

  ${({ $tone }) => priorityToneMap[$tone]}
`;

export const PriorityTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PriorityIconWrap = styled.span<{ $tone: OperationalPriorityTone }>`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ $tone }) => priorityIconToneMap[$tone]}
`;

export const PriorityValue = styled.strong`
  font-size: clamp(1.35rem, 2vw, 1.55rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.textStrong};
`;

export const PriorityTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.cardTitle};
`;

export const PriorityHelper = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.meta};
  line-height: 1.5;
`;

export const CardActionButton = styled.button`
  border: 1px solid rgba(46, 127, 240, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 34px;
  padding: 0 10px;
  width: fit-content;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.92));
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: border-color 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    transform: translateY(-1px);
  }
`;

export const SectionCard = styled.section<{ $tone?: SectionTone }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ $tone = "support" }) => sectionToneMap[$tone]}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const QuickActionsCard = styled(SectionCard)`
  align-content: start;
`;

export const CoreGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SupportGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SectionTitleWrap = styled.div`
  display: grid;
  gap: 4px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.typography.sectionTitle};
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
`;

export const HeaderActionButton = styled.button`
  border: 1px solid rgba(46, 127, 240, 0.22);
  border-radius: ${({ theme }) => theme.radii.pill};
  min-height: 32px;
  padding: 0 10px;
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    transform: translateY(-1px);
  }
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const QuickActionButton = styled.button`
  border: 1px solid rgba(46, 127, 240, 0.16);
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.74), rgba(236, 244, 255, 0.68));
  backdrop-filter: blur(6px);
  text-align: left;
  display: grid;
  gap: 6px;
  cursor: pointer;
  transition: transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    transform: translateY(-1px);
    box-shadow: 0 9px 16px rgba(46, 127, 240, 0.12);
  }
`;

export const QuickActionHeader = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textStrong};

  svg {
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const QuickActionCopy = styled.span`
  font-size: ${({ theme }) => theme.typography.meta};
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmptyState = styled.p`
  margin: 0;
  border: ${({ theme }) => theme.borders.dashed};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
`;

export const DataList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FeatureRowList = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  overflow-x: auto;
  padding-bottom: 2px;
  scroll-snap-type: x proximity;

  &::-webkit-scrollbar {
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(46, 127, 240, 0.3);
    border-radius: ${({ theme }) => theme.radii.pill};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-auto-columns: minmax(250px, 72vw);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-auto-columns: minmax(238px, 88vw);
  }
`;

export const FeatureRowCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 274px;
  background: linear-gradient(164deg, rgba(255, 255, 255, 0.93), rgba(244, 248, 255, 0.78));
  display: grid;
  grid-template-rows: 96px 1fr;
  overflow: hidden;
  scroll-snap-align: start;
`;

export const FeatureBody = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
`;

export const FeatureTitle = styled.h4<{ $fallback?: boolean }>`
  margin: 0;
  min-height: 2.48em;
  font-size: ${({ theme }) => theme.typography.cardTitle};
  line-height: 1.24;
  color: ${({ theme, $fallback }) => ($fallback ? theme.colors.textMuted : theme.colors.textStrong)};
  font-style: ${({ $fallback }) => ($fallback ? "italic" : "normal")};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const FeatureSecondary = styled.p<{ $fallback?: boolean }>`
  margin: 0;
  min-height: 2.5em;
  font-size: ${({ theme }) => theme.typography.meta};
  line-height: 1.34;
  color: ${({ theme, $fallback }) => ($fallback ? theme.colors.textMuted : theme.colors.text)};
  font-style: ${({ $fallback }) => ($fallback ? "italic" : "normal")};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const FeatureSupportRow = styled.p<{ $fallback?: boolean }>`
  margin: 0;
  min-height: 1.3rem;
  font-size: ${({ theme }) => theme.typography.meta};
  line-height: 1.32;
  color: ${({ theme, $fallback }) => ($fallback ? theme.colors.textMuted : theme.colors.textMuted)};
  font-style: ${({ $fallback }) => ($fallback ? "italic" : "normal")};
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  svg {
    color: ${({ theme }) => theme.colors.brandBlue};
    flex-shrink: 0;
  }
`;

export const FeatureActionRow = styled.div`
  margin-top: auto;
  padding-top: 0.14rem;
`;

export const DataCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.46rem;
  display: grid;
  gap: 0.38rem;
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.92), rgba(244, 248, 255, 0.74));
`;

export const DataMedia = styled.div`
  height: 96px;
  border-radius: calc(${({ theme }) => theme.radii.md} - 3px);
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.04), rgba(15, 23, 42, 0.5));
  }
`;

export const DataMediaOverlay = styled.div`
  position: absolute;
  left: 0.44rem;
  right: 0.44rem;
  bottom: 0.42rem;
  z-index: 1;

  span {
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid rgba(255, 255, 255, 0.38);
    background: rgba(15, 23, 42, 0.44);
    color: #f8fafc;
    font-size: ${({ theme }) => theme.typography.micro};
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    padding: 0.12rem 0.38rem;
    display: inline-flex;
    align-items: center;
  }
`;

export const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CodeBadge = styled.span`
  border: 1px solid rgba(46, 127, 240, 0.24);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(46, 127, 240, 0.1);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.03em;
  padding: 2px 7px;
`;

export const StateBadge = styled.span<{ $tone: PillTone }>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.03em;
  padding: 2px 7px;
  text-transform: uppercase;

  ${({ $tone }) => pillToneMap[$tone]}
`;

export const ItemTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.cardTitle};
  color: ${({ theme }) => theme.colors.textStrong};
`;

export const ItemMeta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  line-height: 1.45;
`;

export const RowActionButton = styled.button`
  border: 1px solid rgba(46, 127, 240, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 32px;
  width: fit-content;
  padding: 0 9px;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.92));
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 800;
  cursor: pointer;
  transition: border-color 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    transform: translateY(-1px);
  }
`;

export const AlertList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const AlertCard = styled.article<{ $severity: OperationalAlertSeverity }>`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};

  ${({ $severity }) => alertToneMap[$severity]}
`;

export const AlertHeader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    color: ${({ theme }) => theme.colors.textStrong};
  }
`;

export const AlertMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const AvailabilityList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const AvailabilityRow = styled.article<{ $tone: AvailabilitySummaryTone }>`
  border: ${({ theme }) => theme.borders.subtle};
  border-left: 4px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  background: #fff;

  ${({ $tone }) => availabilityToneMap[$tone]}
`;

export const AvailabilityCopy = styled.div`
  display: grid;
  gap: 4px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }

  span {
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const AvailabilityValue = styled.strong`
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.textStrong};
`;

export const ReviewList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ReviewSummaryLine = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;

  strong {
    font-size: clamp(1.02rem, 2vw, 1.2rem);
    color: ${({ theme }) => theme.colors.warning};
    line-height: 1;
  }

  span {
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ReviewCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  background: #fff;
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: flex-start;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Stars = styled.div`
  display: inline-flex;
  gap: 3px;
  align-items: center;
  color: ${({ theme }) => theme.colors.warning};
`;

export const ReviewText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;
