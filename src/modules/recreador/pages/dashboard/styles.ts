import styled, { css } from "styled-components";
import type {
  AvailabilitySummaryTone,
  OperationalAlertSeverity,
  OperationalPriorityTone,
} from "@/modules/recreador/mocks/dashboard";

type PillTone = "neutral" | "info" | "warning" | "success" | "danger";

const priorityToneMap = {
  warning: css`
    border-color: rgba(227, 154, 18, 0.25);
    background: linear-gradient(150deg, rgba(227, 154, 18, 0.14), rgba(255, 255, 255, 0.95));
  `,
  info: css`
    border-color: rgba(46, 127, 240, 0.24);
    background: linear-gradient(150deg, rgba(46, 127, 240, 0.13), rgba(255, 255, 255, 0.95));
  `,
  success: css`
    border-color: rgba(23, 167, 102, 0.24);
    background: linear-gradient(150deg, rgba(23, 167, 102, 0.12), rgba(255, 255, 255, 0.95));
  `,
  danger: css`
    border-color: rgba(211, 77, 98, 0.25);
    background: linear-gradient(150deg, rgba(211, 77, 98, 0.13), rgba(255, 255, 255, 0.95));
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
    border-color: rgba(227, 154, 18, 0.24);
    background: rgba(255, 247, 232, 0.8);

    svg {
      color: #a56e0e;
    }
  `,
  danger: css`
    border-color: rgba(211, 77, 98, 0.24);
    background: rgba(255, 239, 244, 0.85);

    svg {
      color: #b53b53;
    }
  `,
  info: css`
    border-color: rgba(46, 127, 240, 0.24);
    background: rgba(235, 244, 255, 0.85);

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

const pillToneMap = {
  neutral: css`
    border-color: rgba(91, 104, 136, 0.24);
    background: rgba(91, 104, 136, 0.08);
    color: ${({ theme }) => theme.colors.textMuted};
  `,
  info: css`
    border-color: rgba(46, 127, 240, 0.25);
    background: rgba(46, 127, 240, 0.1);
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  warning: css`
    border-color: rgba(227, 154, 18, 0.25);
    background: rgba(227, 154, 18, 0.11);
    color: #a56e0e;
  `,
  success: css`
    border-color: rgba(23, 167, 102, 0.25);
    background: rgba(23, 167, 102, 0.11);
    color: ${({ theme }) => theme.colors.success};
  `,
  danger: css`
    border-color: rgba(211, 77, 98, 0.25);
    background: rgba(211, 77, 98, 0.1);
    color: #b53b53;
  `,
};

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const HeroCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 22px;
  display: grid;
  gap: 12px;
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.16) 0%, rgba(46, 127, 240, 0) 42%),
    radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.14) 0%, rgba(249, 111, 38, 0) 44%),
    linear-gradient(145deg, rgba(46, 127, 240, 0.09), rgba(255, 255, 255, 0.96));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const HeroBadge = styled.span`
  width: fit-content;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(46, 127, 240, 0.28);
  background: rgba(255, 255, 255, 0.86);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 5px 10px;
`;

export const HeroTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: clamp(24px, 4vw, 34px);
  line-height: 1.12;
`;

export const HeroDescription = styled.p`
  margin: 0;
  max-width: 70ch;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.55;
`;

export const HeroFocus = styled.p`
  margin: 0;
  border: 1px dashed rgba(46, 127, 240, 0.28);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.82);
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 40px;
  padding: 0 14px;
  background: linear-gradient(115deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(0.96);
  }
`;

export const SecondaryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 40px;
  padding: 0 14px;
  background: rgba(255, 255, 255, 0.88);
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const PrioritiesGrid = styled.div`
  display: grid;
  gap: 10px;
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
  padding: 12px;
  display: grid;
  gap: 8px;

  ${({ $tone }) => priorityToneMap[$tone]}
`;

export const PriorityTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
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
  font-size: 22px;
  line-height: 1;
`;

export const PriorityTitle = styled.h3`
  margin: 0;
  font-size: 14px;
`;

export const PriorityHelper = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1.45;
`;

export const CardActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 32px;
  padding: 0 10px;
  width: fit-content;
  background: #fff;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const SectionCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 16px;
  display: grid;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 14px;
  }
`;

export const QuickActionsCard = styled(SectionCard)``;

export const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`;

export const SectionTitleWrap = styled.div`
  display: grid;
  gap: 4px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 19px;
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1.45;
`;

export const HeaderActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  min-height: 34px;
  padding: 0 11px;
  background: transparent;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    background: rgba(46, 127, 240, 0.06);
  }
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const QuickActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 11px;
  background: linear-gradient(175deg, #fff, rgba(238, 244, 255, 0.55));
  text-align: left;
  display: grid;
  gap: 6px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const QuickActionHeader = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const QuickActionCopy = styled.span`
  font-size: 11px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TwoColumn = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const EmptyState = styled.p`
  margin: 0;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
`;

export const DataList = styled.div`
  display: grid;
  gap: 10px;
`;

export const DataCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 11px;
  display: grid;
  gap: 6px;
  background: #fff;
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
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 3px 8px;
`;

export const StateBadge = styled.span<{ $tone: PillTone }>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  text-transform: uppercase;

  ${({ $tone }) => pillToneMap[$tone]}
`;

export const ItemTitle = styled.h4`
  margin: 0;
  font-size: 14px;
`;

export const ItemMeta = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  line-height: 1.45;
`;

export const RowActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 32px;
  width: fit-content;
  padding: 0 10px;
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

export const AlertList = styled.div`
  display: grid;
  gap: 10px;
`;

export const AlertCard = styled.article<{ $severity: OperationalAlertSeverity }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 11px;
  display: grid;
  gap: 8px;

  ${({ $severity }) => alertToneMap[$severity]}
`;

export const AlertHeader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  strong {
    font-size: 13px;
  }
`;

export const AlertMessage = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const AvailabilityList = styled.div`
  display: grid;
  gap: 8px;
`;

export const AvailabilityRow = styled.article<{ $tone: AvailabilitySummaryTone }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  background: #fff;

  ${({ $tone }) => availabilityToneMap[$tone]}
`;

export const AvailabilityCopy = styled.div`
  display: grid;
  gap: 4px;

  strong {
    font-size: 13px;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.4;
  }
`;

export const AvailabilityValue = styled.strong`
  font-size: 22px;
  line-height: 1;
`;

export const ReviewList = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ReviewCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 7px;
  background: #fff;
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;

  strong {
    font-size: 13px;
  }

  span {
    font-size: 11px;
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
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textMuted};
`;