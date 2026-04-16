import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;

  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid rgba(249, 111, 38, 0.58);
    outline-offset: 2px;
  }

  button:disabled,
  input:disabled,
  textarea:disabled,
  select:disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }
`;

export const SectionStack = styled.section`
  display: grid;
  gap: 16px;
`;

export const StatusBanner = styled.section<{ $mode: "active" | "planned" | "parked" }>`
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid
    ${({ $mode }) =>
      $mode === "active"
        ? "rgba(23, 167, 102, 0.36)"
        : $mode === "planned"
          ? "rgba(249, 111, 38, 0.38)"
          : "rgba(211, 77, 98, 0.36)"};
  background:
    ${({ $mode }) =>
      $mode === "active"
        ? "linear-gradient(165deg, rgba(23, 167, 102, 0.14) 0%, rgba(255, 255, 255, 0.95) 100%)"
        : $mode === "planned"
          ? "linear-gradient(165deg, rgba(249, 111, 38, 0.14) 0%, rgba(255, 255, 255, 0.95) 100%)"
          : "linear-gradient(165deg, rgba(211, 77, 98, 0.14) 0%, rgba(255, 255, 255, 0.95) 100%)"};
  padding: 13px;
  display: grid;
  gap: 6px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.07);

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
  }
`;

export const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;

  strong {
    font-size: 15px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ToolbarGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const IconSquare = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(180deg, #fff 0%, rgba(248, 251, 255, 0.95) 100%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandOrange};
    color: ${({ theme }) => theme.colors.brandOrange};
    transform: translateY(-1px);
  }
`;

export const MonthLabel = styled.strong`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MiniStatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const MiniStatCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 245, 238, 0.58) 100%);
  padding: 10px;
  display: grid;
  gap: 4px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.07);

  strong {
    font-size: 20px;
    line-height: 1;
  }

  span {
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const TabRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.brandOrange : theme.colors.border)};
  background: ${({ $active }) => ($active ? "rgba(249, 111, 38, 0.12)" : "#fff")};
  color: ${({ $active, theme }) => ($active ? theme.colors.brandOrange : theme.colors.text)};
  font-size: 12px;
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandOrange};
    color: ${({ theme }) => theme.colors.brandOrange};
  }
`;

export const FilterRow = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const WeekCard = styled.article<{ $status: "confirmado" | "pendente" | "em_edicao" }>`
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 10px;
  display: grid;
  gap: 8px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.06);
  transition: transform 0.2s ease;

  ${({ $status }) =>
    $status === "confirmado"
      ? css`
          border-color: rgba(23, 167, 102, 0.35);
          background: rgba(23, 167, 102, 0.06);
        `
      : $status === "pendente"
        ? css`
            border-color: rgba(249, 111, 38, 0.35);
            background: rgba(249, 111, 38, 0.06);
          `
        : css`
            border-color: rgba(225, 105, 124, 0.35);
            background: rgba(225, 105, 124, 0.08);
          `}

  &:hover {
    transform: translateY(-1px);
  }
`;

export const WeekHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: 13px;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const WeekCounts = styled.div`
  display: grid;
  gap: 6px;
`;

export const WeekCountItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 11px;

  span {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const InlineActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const InlineActionButton = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid rgba(249, 111, 38, 0.35);
  background: rgba(249, 111, 38, 0.08);
  color: ${({ theme }) => theme.colors.brandOrange};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(249, 111, 38, 0.14);
    transform: translateY(-1px);
  }
`;

export const SecondaryInlineButton = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandOrange};
    color: ${({ theme }) => theme.colors.brandOrange};
    transform: translateY(-1px);
  }
`;

export const HotelPageActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ListBlock = styled.div`
  display: grid;
  gap: 10px;
`;

export const ListItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(175deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.72) 100%);
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0 6px 14px rgba(28, 38, 64, 0.06);

  strong {
    font-size: 14px;
  }

  p {
    margin: 3px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ListItemMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const RosterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const RosterCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(168deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 247, 241, 0.6) 100%);
  padding: 12px;
  display: grid;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(28, 38, 64, 0.08);

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const RosterHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > div {
    flex: 1;
  }

  strong {
    font-size: 14px;
  }

  p {
    margin: 2px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const AvatarCircle = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(145deg, rgba(249, 111, 38, 0.2), rgba(225, 105, 124, 0.2));
  color: ${({ theme }) => theme.colors.brandOrange};
  font-size: 12px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const RosterInfo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.brandOrange};
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ChipRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const RoleChip = styled.span<{ $tone: "brand" | "gray" | "purple" | "orange" | "green" }>`
  height: 24px;
  border-radius: 999px;
  padding: 0 10px;
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;

  ${({ $tone }) => {
    if ($tone === "brand") {
      return css`
        color: #f96f26;
        border-color: rgba(249, 111, 38, 0.35);
        background: rgba(249, 111, 38, 0.12);
      `;
    }

    if ($tone === "purple") {
      return css`
        color: #8a61d4;
        border-color: rgba(138, 97, 212, 0.35);
        background: rgba(138, 97, 212, 0.12);
      `;
    }

    if ($tone === "orange") {
      return css`
        color: #f96f26;
        border-color: rgba(249, 111, 38, 0.35);
        background: rgba(249, 111, 38, 0.12);
      `;
    }

    if ($tone === "green") {
      return css`
        color: #17a766;
        border-color: rgba(23, 167, 102, 0.35);
        background: rgba(23, 167, 102, 0.12);
      `;
    }

    return css`
      color: #65708a;
      border-color: rgba(101, 112, 138, 0.35);
      background: rgba(101, 112, 138, 0.12);
    `;
  }}
`;

export const TagChip = styled.span`
  height: 22px;
  border-radius: 999px;
  padding: 0 9px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  display: inline-flex;
  align-items: center;
`;

export const ActionRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const ActionGhostButton = styled.button`
  min-height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 11px;
  font-weight: 700;
  padding: 0 8px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandOrange};
    color: ${({ theme }) => theme.colors.brandOrange};
    transform: translateY(-1px);
  }
`;

export const VacancyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const VacancyCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 246, 239, 0.62) 100%);
  padding: 12px;
  display: grid;
  gap: 10px;
  box-shadow: 0 9px 18px rgba(28, 38, 64, 0.08);
`;

export const VacancyHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: 15px;
  }

  p {
    margin: 3px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const VacancyMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const PositionList = styled.div`
  display: grid;
  gap: 6px;
`;

export const PositionItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SalaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;

  strong {
    color: ${({ theme }) => theme.colors.brandOrange};
    font-size: 14px;
  }
`;

export const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const TemplateCard = styled.article`
  border: 1px solid rgba(249, 111, 38, 0.28);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(249, 111, 38, 0.08);
  padding: 10px;
  display: grid;
  gap: 6px;

  strong {
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const CalendarEventCard = styled.article`
  border: 1px dashed rgba(249, 111, 38, 0.42);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(249, 111, 38, 0.11) 0%, rgba(255, 255, 255, 0.95) 100%);
  padding: 10px;
  display: grid;
  gap: 4px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.07);

  strong {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.brandOrange};
  }

  p {
    margin: 0;
    font-size: 12px;
  }

  small {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 11px;
  }
`;

export const FeedbackList = styled.div`
  display: grid;
  gap: 10px;
`;

export const FeedbackCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.78) 100%);
  padding: 10px;
  display: grid;
  gap: 8px;
  box-shadow: 0 7px 15px rgba(28, 38, 64, 0.06);

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FeedbackHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: 14px;
  }

  p {
    margin: 2px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const StarsRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.brandOrange};
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const KpiCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 247, 241, 0.64) 100%);
  padding: 10px;
  display: grid;
  gap: 4px;
  box-shadow: 0 7px 15px rgba(28, 38, 64, 0.06);

  strong {
    font-size: 20px;
    line-height: 1;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
`;

export const TrendBadge = styled.span<{ $tone: "neutral" | "success" | "warning" | "danger" | "brand" }>`
  min-height: 22px;
  border-radius: 999px;
  padding: 0 8px;
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  width: fit-content;

  ${({ $tone }) => {
    if ($tone === "success") {
      return css`
        color: #0d7d4c;
        background: rgba(23, 167, 102, 0.14);
      `;
    }

    if ($tone === "warning") {
      return css`
        color: #a76611;
        background: rgba(249, 111, 38, 0.14);
      `;
    }

    if ($tone === "danger") {
      return css`
        color: #a53149;
        background: rgba(211, 77, 98, 0.14);
      `;
    }

    if ($tone === "brand") {
      return css`
        color: #c35a1f;
        background: rgba(249, 111, 38, 0.14);
      `;
    }

    return css`
      color: #65708a;
      background: rgba(101, 112, 138, 0.14);
    `;
  }}
`;

export const Watchlist = styled.div`
  display: grid;
  gap: 8px;
`;

export const WatchlistItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: 13px;
  }

  p {
    margin: 3px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ReportActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ImpactCard = styled.article`
  border: 1px solid rgba(249, 111, 38, 0.35);
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 95% 0%, rgba(225, 105, 124, 0.14) 0%, rgba(225, 105, 124, 0) 45%),
    linear-gradient(135deg, rgba(249, 111, 38, 0.14), rgba(249, 111, 38, 0.06));
  padding: 12px;
  display: grid;
  gap: 5px;

  h4 {
    margin: 0;
    font-size: 14px;
  }

  strong {
    font-size: 24px;
    line-height: 1;
    color: ${({ theme }) => theme.colors.brandOrange};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.7) 100%);
  padding: 10px;
  display: grid;
  gap: 4px;
  box-shadow: 0 7px 15px rgba(28, 38, 64, 0.06);

  strong {
    font-size: 18px;
    line-height: 1;
  }

  span {
    font-size: 12px;
    font-weight: 700;
  }

  small {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 11px;
  }
`;

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 620px;

  thead th {
    text-align: left;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textMuted};
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody td,
  tfoot td {
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
    vertical-align: middle;
  }

  tfoot td {
    font-weight: 700;
    border-bottom: none;
    background: ${({ theme }) => theme.colors.surfaceSoft};
  }
`;

export const HotelHero = styled.section`
  border: 1px solid rgba(249, 111, 38, 0.3);
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 95% 0%, rgba(225, 105, 124, 0.14) 0%, rgba(225, 105, 124, 0) 45%),
    linear-gradient(140deg, rgba(249, 111, 38, 0.12), rgba(249, 111, 38, 0.05));
  padding: 14px;
  display: grid;
  gap: 12px;
  box-shadow: 0 12px 24px rgba(28, 38, 64, 0.1);
`;

export const HotelHeroBanner = styled.div`
  height: 120px;
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    radial-gradient(circle at 90% 0%, rgba(225, 105, 124, 0.35) 0%, rgba(225, 105, 124, 0) 38%),
    linear-gradient(120deg, rgba(249, 111, 38, 0.62), rgba(225, 105, 124, 0.48));
`;

export const HotelHeroTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;

  > div {
    display: grid;
    gap: 3px;
  }

  h3 {
    margin: 0;
    font-size: 24px;
    line-height: 1.1;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const HotelIcon = styled.span`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(249, 111, 38, 0.14);
  color: ${({ theme }) => theme.colors.brandOrange};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const ContactItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 10px;
  display: grid;
  gap: 4px;

  strong {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const HotelFieldInput = styled.input`
  min-height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 10px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  background: #fff;

  &:focus {
    outline: none;
    border-color: rgba(249, 111, 38, 0.42);
    box-shadow: 0 0 0 4px rgba(249, 111, 38, 0.12);
  }
`;

export const HotelSummaryField = styled.div`
  p {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.text};
  }

  textarea {
    width: 100%;
    min-height: 90px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px;
    font-size: 13px;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
    resize: vertical;
  }
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const SectionCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(172deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 252, 255, 0.76) 100%);
  padding: 12px;
  display: grid;
  gap: 8px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.07);

  header {
    display: grid;
    gap: 3px;
  }

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

export const SectionBullets = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 5px;

  li {
    font-size: 12px;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FeatureList = styled.div`
  display: grid;
  gap: 8px;
`;

export const FeatureListItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
    text-align: right;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(172deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 247, 241, 0.6) 100%);
  padding: 10px;
  display: grid;
  gap: 5px;
  box-shadow: 0 7px 14px rgba(28, 38, 64, 0.06);

  strong {
    font-size: 13px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.brandOrange};
    font-weight: 700;
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const GalleryCard = styled.article`
  min-height: 120px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid rgba(249, 111, 38, 0.35);
  background:
    linear-gradient(145deg, rgba(249, 111, 38, 0.14), rgba(225, 105, 124, 0.12));
  padding: 10px;
  display: grid;
  align-content: end;
  gap: 2px;

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ReviewList = styled.div`
  display: grid;
  gap: 10px;
`;

export const ReviewCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(238, 244, 255, 0.72) 100%);
  padding: 10px;
  display: grid;
  gap: 8px;
  box-shadow: 0 7px 14px rgba(28, 38, 64, 0.06);

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: 13px;
  }

  p {
    margin: 2px 0 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ComposerCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.78) 100%);
  padding: 10px;
  display: grid;
  gap: 8px;
  box-shadow: 0 7px 15px rgba(28, 38, 64, 0.06);

  label {
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  textarea {
    min-height: 90px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px;
    resize: vertical;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const PostList = styled.div`
  display: grid;
  gap: 10px;
`;

export const PostCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.76) 100%);
  padding: 10px;
  display: grid;
  gap: 8px;
  box-shadow: 0 7px 15px rgba(28, 38, 64, 0.06);

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const PostHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: 14px;
  }

  p {
    margin: 2px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const EngagementRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ChatShell = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const RoomList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 8px;
  display: grid;
  gap: 6px;
`;

export const RoomButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  min-height: 46px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(249, 111, 38, 0.4);
    transform: translateY(-1px);
  }

  strong {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }

  small {
    display: block;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: 2px;
  }
`;

export const ChatPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 8px;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 8px;
  min-height: 280px;
`;

export const MessageList = styled.div`
  display: grid;
  gap: 8px;
  align-content: start;
`;

export const MessageBubble = styled.article<{ $mine: boolean }>`
  max-width: min(520px, 92%);
  justify-self: ${({ $mine }) => ($mine ? "end" : "start")};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ $mine, theme }) => ($mine ? "rgba(249, 111, 38, 0.36)" : theme.colors.border)};
  background: ${({ $mine }) => ($mine ? "rgba(249, 111, 38, 0.1)" : "#fff")};
  padding: 8px;
  display: grid;
  gap: 3px;

  strong {
    font-size: 12px;
  }

  p {
    margin: 0;
    font-size: 12px;
  }

  small {
    justify-self: end;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const MessageComposer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 8px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;

  input {
    min-height: 34px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0 10px;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      outline: none;
      border-color: rgba(249, 111, 38, 0.42);
      box-shadow: 0 0 0 4px rgba(249, 111, 38, 0.12);
    }
  }

  button {
    width: 34px;
    height: 34px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid rgba(249, 111, 38, 0.35);
    background: rgba(249, 111, 38, 0.1);
    color: ${({ theme }) => theme.colors.brandOrange};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(249, 111, 38, 0.18);
      transform: translateY(-1px);
    }
  }
`;

export const IncidentList = styled.div`
  display: grid;
  gap: 10px;
`;

export const IncidentCard = styled.article<{ $severity: "Alta" | "Media" | "Baixa" }>`
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 10px;
  display: grid;
  gap: 8px;

  ${({ $severity }) =>
    $severity === "Alta"
      ? css`
          border-color: rgba(211, 77, 98, 0.4);
          background: rgba(211, 77, 98, 0.07);
        `
      : $severity === "Media"
        ? css`
            border-color: rgba(249, 111, 38, 0.4);
            background: rgba(249, 111, 38, 0.07);
          `
        : css`
            border-color: rgba(23, 167, 102, 0.4);
            background: rgba(23, 167, 102, 0.07);
          `}

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const IncidentHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: 14px;
  }

  p {
    margin: 2px 0 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CheckpointList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
`;

export const CheckpointItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`;