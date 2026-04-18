import styled, { css } from "styled-components";

type PillTone = "neutral" | "info" | "warning" | "success";
type SlotState = "disponivel" | "bloqueio-manual" | "bloqueio-compromisso" | "conflito";
type CalendarViewMode = "mes" | "semana";
type CalendarEventTone = "disponivel" | "manual" | "compromisso" | "conflito" | "recorrencia" | "pendente";
type CalendarStatusTone = "neutral" | "info" | "warning" | "success";
type DayPriorityLevel = "baixa" | "media" | "alta";

const toneMap = {
  neutral: css`
    border-color: rgba(100, 116, 139, 0.32);
    background: rgba(100, 116, 139, 0.1);
    color: #475569;
  `,
  info: css`
    border-color: rgba(46, 127, 240, 0.32);
    background: rgba(46, 127, 240, 0.1);
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  warning: css`
    border-color: rgba(227, 154, 18, 0.34);
    background: rgba(227, 154, 18, 0.12);
    color: #9a6811;
  `,
  success: css`
    border-color: rgba(23, 167, 102, 0.32);
    background: rgba(23, 167, 102, 0.12);
    color: #0f7a4d;
  `,
};

const slotCardToneMap = {
  disponivel: css`
    border-left-color: ${({ theme }) => theme.colors.success};
  `,
  "bloqueio-manual": css`
    border-left-color: ${({ theme }) => theme.colors.textMuted};
  `,
  "bloqueio-compromisso": css`
    border-left-color: ${({ theme }) => theme.colors.brandBlue};
  `,
  conflito: css`
    border-left-color: ${({ theme }) => theme.colors.warning};
  `,
};

const calendarEventToneMap = {
  disponivel: css`
    border-left-color: ${({ theme }) => theme.colors.success};
    background: rgba(23, 167, 102, 0.12);
  `,
  manual: css`
    border-left-color: ${({ theme }) => theme.colors.textMuted};
    background: rgba(91, 104, 136, 0.11);
  `,
  compromisso: css`
    border-left-color: ${({ theme }) => theme.colors.brandBlue};
    background: rgba(46, 127, 240, 0.12);
  `,
  conflito: css`
    border-left-color: ${({ theme }) => theme.colors.warning};
    background: rgba(227, 154, 18, 0.14);
  `,
  recorrencia: css`
    border-left-color: #1f9b8a;
    background: rgba(31, 155, 138, 0.14);
  `,
  pendente: css`
    border-left-color: #a56a10;
    background: rgba(227, 154, 18, 0.16);
  `,
};

const calendarStatusToneMap = {
  neutral: css`
    border-color: rgba(100, 116, 139, 0.3);
    background: rgba(100, 116, 139, 0.1);
    color: #475569;
  `,
  info: css`
    border-color: rgba(46, 127, 240, 0.32);
    background: rgba(46, 127, 240, 0.1);
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  warning: css`
    border-color: rgba(227, 154, 18, 0.34);
    background: rgba(227, 154, 18, 0.12);
    color: #9a6811;
  `,
  success: css`
    border-color: rgba(23, 167, 102, 0.32);
    background: rgba(23, 167, 102, 0.12);
    color: #0f7a4d;
  `,
};

const dayPriorityToneMap = {
  baixa: css`
    border-color: rgba(100, 116, 139, 0.32);
    background: rgba(100, 116, 139, 0.1);
    color: #475569;
  `,
  media: css`
    border-color: rgba(46, 127, 240, 0.32);
    background: rgba(46, 127, 240, 0.1);
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  alta: css`
    border-color: rgba(227, 154, 18, 0.34);
    background: rgba(227, 154, 18, 0.12);
    color: #9a6811;
  `,
};

export const Wrapper = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};

  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brandBlue};
    outline-offset: 2px;
  }

  button:disabled,
  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.64;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const HeaderCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.14) 0%, rgba(46, 127, 240, 0) 44%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.98), rgba(236, 244, 255, 0.9));
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.typography.sectionTitle};
    display: inline-flex;
    align-items: center;
    gap: 0.42rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.5;
    max-width: 62ch;
  }
`;

export const HeaderMeta = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.9);
  min-width: 132px;
  padding: 0.56rem 0.68rem;
  display: grid;
  gap: 0.16rem;

  strong {
    color: ${({ theme }) => theme.colors.textStrong};
    font-size: clamp(1.04rem, 2vw, 1.2rem);
    line-height: 1;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
`;

export const LegendGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const LegendCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  padding: 0.66rem;
  display: grid;
  gap: 0.2rem;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.meta};
    line-height: 1.45;
  }
`;

export const ConflictBanner = styled.article`
  border: 1px solid rgba(227, 154, 18, 0.34);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 247, 232, 0.88);
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  strong {
    color: #9a6811;
    font-size: ${({ theme }) => theme.typography.label};
  }

  span {
    display: block;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.45;
    margin-top: 0.16rem;
  }
`;

export const SectionCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panel};
  padding: 0.86rem;
  display: grid;
  gap: 0.66rem;
`;

export const PlannerLayout = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: minmax(0, 1.45fr) minmax(330px, 1fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const AgendaStage = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  align-content: start;
`;

export const CalendarToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  padding-bottom: 0.2rem;
  border-bottom: ${({ theme }) => theme.borders.subtle};
`;

export const CalendarTitleWrap = styled.div`
  display: grid;
  gap: 0.12rem;

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.sectionTitle};
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.textStrong};
    font-size: clamp(1.12rem, 2vw, 1.36rem);
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
  }
`;

export const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.46rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: stretch;
    width: 100%;
  }
`;

export const ViewSwitch = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.surfaces.panel};
  display: inline-flex;
  padding: 2px;
`;

export const ViewButton = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  min-width: 78px;
  min-height: 30px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  cursor: pointer;
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.textMuted)};
  background: ${({ $active, theme }) =>
    $active ? `linear-gradient(120deg, ${theme.colors.brandBlue}, ${theme.colors.brandOrange})` : "transparent"};
`;

export const CalendarNav = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const CalendarNavButton = styled.button<{ $highlight?: boolean }>`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $highlight }) => ($highlight ? "rgba(46, 127, 240, 0.12)" : "#fff")};
  color: ${({ $highlight, theme }) => ($highlight ? theme.colors.brandBlue : theme.colors.textStrong)};
  min-height: 33px;
  padding: 0 0.62rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1;
  }
`;

export const CalendarPeriodBar = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PeriodField = styled.label`
  display: grid;
  gap: 0.34rem;

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  input,
  select {
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.surfaces.panel};
    color: ${({ theme }) => theme.colors.text};
    min-height: 38px;
    padding: 0 0.62rem;
    font-size: ${({ theme }) => theme.typography.bodySm};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandBlue};
      box-shadow: 0 0 0 3px rgba(46, 127, 240, 0.14);
    }
  }
`;

export const CalendarStatusRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.34rem;
`;

export const CalendarStatusBadge = styled.span<{ $tone: CalendarStatusTone }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid transparent;
  min-height: 24px;
  padding: 0 0.52rem;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 800;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;

  ${({ $tone }) => calendarStatusToneMap[$tone]}
`;

export const CalendarQuickAction = styled.button`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 28px;
  padding: 0 0.56rem;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  cursor: pointer;
`;

export const AgendaIntegrationHint = styled.p`
  margin: 0;
  border: 1px solid rgba(46, 127, 240, 0.24);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(46, 127, 240, 0.08);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
  padding: 0.58rem 0.66rem;
`;

export const MonthWeekHeaderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.3rem;

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 800;
    padding: 0 0.14rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(7, 136px);
    overflow-x: auto;
    padding-bottom: 2px;
  }
`;

export const CalendarGrid = styled.div<{ $mode: CalendarViewMode }>`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.3rem;
  grid-auto-rows: ${({ $mode }) => ($mode === "mes" ? "196px" : "236px")};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(7, 136px);
    overflow-x: auto;
    padding-bottom: 2px;
  }
`;

export const CalendarDayCell = styled.article<{ $outside: boolean; $today: boolean; $mode: CalendarViewMode }>`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(241, 247, 255, 0.72));
  padding: 0.44rem;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 0.44rem;
  height: 100%;
  overflow: hidden;

  ${({ $outside }) =>
    $outside &&
    css`
      opacity: 0.56;
      background: rgba(238, 242, 250, 0.76);
    `}

  ${({ $today, theme }) =>
    $today &&
    css`
      border-color: ${theme.colors.brandBlue};
      box-shadow: 0 0 0 2px rgba(46, 127, 240, 0.14);
    `}
`;

export const DayCellHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.35rem;

  min-height: 28px;
`;

export const DayCellDate = styled.div`
  display: grid;
  gap: 0;

  strong {
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textStrong};
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
    text-transform: uppercase;
  }
`;

export const DayFlagBadge = styled.span<{ $tone: "warning" | "info" }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid transparent;
  min-height: 22px;
  padding: 0 0.42rem;
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;

  ${({ $tone }) =>
    $tone === "warning"
      ? css`
          border-color: rgba(227, 154, 18, 0.34);
          background: rgba(227, 154, 18, 0.14);
          color: #9a6811;
        `
      : css`
          border-color: rgba(46, 127, 240, 0.32);
          background: rgba(46, 127, 240, 0.12);
          color: ${({ theme }) => theme.colors.brandBlue};
        `}
`;

export const DayEventList = styled.div`
  display: grid;
  gap: 0.26rem;
  grid-template-rows: minmax(0, 1fr) auto;
  align-content: stretch;
  min-height: 0;
`;

export const DayEventEmpty = styled.p`
  margin: 0;
  border: ${({ theme }) => theme.borders.dashed};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.42rem;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.65);
`;

export const DayEventItem = styled.article<{ $tone: CalendarEventTone }>`
  border: 1px solid rgba(91, 104, 136, 0.2);
  border-left: 4px solid transparent;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.36rem 0.42rem;
  display: grid;
  gap: 0.12rem;
  min-height: 0;
  overflow: hidden;

  p,
  small {
    margin: 0;
    line-height: 1.3;
  }

  p {
    color: ${({ theme }) => theme.colors.textStrong};
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  small {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.micro};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  ${({ $tone }) => calendarEventToneMap[$tone]}
`;

export const DayEventTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.24rem;
`;

export const DayToneBadge = styled.span<{ $tone: CalendarEventTone }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid transparent;
  min-height: 20px;
  padding: 0 0.36rem;
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;

  ${({ $tone }) => calendarEventToneMap[$tone]}
`;

export const DayEventTime = styled.span`
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DayEventOverflowButton = styled.button`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 27px;
  padding: 0 0.44rem;
  background: #fff;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.brandBlue};
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  margin-top: auto;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ConflictSupportCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  padding: 0.66rem;
  display: grid;
  gap: 0.52rem;
`;

export const ConflictSupportHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.52rem;
  flex-wrap: wrap;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.label};
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  p {
    margin: 0.14rem 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.45;
    max-width: 62ch;
  }
`;

export const ConflictSupportList = styled.div`
  display: grid;
  gap: 0.4rem;
`;

export const ConflictSupportItem = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: #fff;
  padding: 0.5rem;
  display: grid;
  gap: 0.22rem;

  strong {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textStrong};
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.4;
  }
`;

export const AgendaInsights = styled.section`
  display: grid;
  gap: 0.52rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const AgendaInsightPanel = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  padding: 0.62rem;
  display: grid;
  gap: 0.42rem;
`;

export const AgendaInsightTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.label};
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`;

export const AgendaInsightCopy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.45;
`;

export const AgendaInsightList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.42rem;

  li {
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: #fff;
    padding: 0.48rem;
    display: grid;
    gap: 0.22rem;
  }

  strong {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textStrong};
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }

  button {
    justify-self: start;
    min-height: 30px;
    font-size: ${({ theme }) => theme.typography.meta};
    padding: 0 0.52rem;
  }
`;

export const DayDetailsOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1400;
  background: rgba(15, 23, 42, 0.52);
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const DayDetailsModal = styled.article`
  width: min(760px, 100%);
  max-height: min(78dvh, 100%);
  overflow: auto;
  overscroll-behavior: contain;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surfaces.panelElevated};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(760px, calc(100vw - 1rem));
    max-height: min(84dvh, 100%);
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DayDetailsHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.sectionTitle};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.45;
  }
`;

export const DayDetailsList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DayDetailsItem = styled.article<{ $tone: CalendarEventTone }>`
  border: ${({ theme }) => theme.borders.subtle};
  border-left: 4px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 0.58rem 0.62rem;
  display: grid;
  gap: 0.28rem;

  ${({ $tone }) => calendarEventToneMap[$tone]}

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    color: ${({ theme }) => theme.colors.textStrong};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const DayDetailsTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.34rem;
  flex-wrap: wrap;
`;

export const DayDetailsBadges = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  flex-wrap: wrap;
`;

export const DayPriorityBadge = styled.span<{ $level: DayPriorityLevel }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid transparent;
  min-height: 22px;
  padding: 0 0.42rem;
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;

  ${({ $level }) => dayPriorityToneMap[$level]}
`;

export const ToolsGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding-top: ${({ theme }) => theme.spacing.xs};
  border-top: ${({ theme }) => theme.borders.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }

  ${SectionCard} {
    background: ${({ theme }) => theme.surfaces.panelSoft};
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

export const AgendaHelper = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
`;

export const AgendaColumns = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(250px, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  overflow-x: auto;
  padding-bottom: 2px;

  &::-webkit-scrollbar {
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(46, 127, 240, 0.3);
    border-radius: ${({ theme }) => theme.radii.pill};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-auto-columns: minmax(240px, 74vw);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-auto-columns: minmax(220px, 88vw);
  }
`;

export const AgendaDayColumn = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(164deg, rgba(255, 255, 255, 0.93), rgba(242, 248, 255, 0.78));
  padding: 0.52rem;
  display: grid;
  gap: 0.44rem;
  align-content: start;
`;

export const AgendaDayHeader = styled.header`
  display: grid;
  gap: 0.08rem;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    color: ${({ theme }) => theme.colors.textStrong};
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SlotList = styled.div`
  display: grid;
  gap: 0.42rem;
`;

export const SlotTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
`;

export const PeriodChip = styled.span`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(46, 127, 240, 0.24);
  background: rgba(46, 127, 240, 0.1);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.12rem 0.42rem;
`;

export const SlotTime = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textStrong};
  font-weight: 700;
`;

export const ToolsColumn = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  align-content: start;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 0.62rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const FormField = styled.label`
  display: grid;
  gap: 0.34rem;

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  input,
  select {
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.surfaces.panel};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.bodySm};
    padding: 0.56rem 0.7rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandBlue};
      box-shadow: 0 0 0 3px rgba(46, 127, 240, 0.15);
    }
  }

  input[type="time"],
  input[type="date"] {
    font-variant-numeric: tabular-nums;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.cardTitle};
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`;

export const SlotGrid = styled.div`
  display: grid;
  gap: 0.64rem;
  grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
`;

export const SlotCard = styled.article<{ $state: SlotState }>`
  border: ${({ theme }) => theme.borders.subtle};
  border-left: 4px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  padding: 0.66rem;
  display: grid;
  gap: 0.36rem;

  ${({ $state }) => slotCardToneMap[$state]}
`;

export const SlotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.45rem;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }
`;

export const StatePill = styled.span<{ $tone: PillTone }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.14rem 0.44rem;
  border: 1px solid transparent;

  ${({ $tone }) => toneMap[$tone]}
`;

export const MetaText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`;

export const DecisionHint = styled.p<{ $tone: PillTone }>`
  margin: 0;
  border-left: 4px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.5rem 0.58rem;
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.45;

  ${({ $tone }) => {
    if ($tone === "success") {
      return css`
        border-left-color: ${({ theme }) => theme.colors.success};
        background: rgba(23, 167, 102, 0.1);
        color: #0f7a4d;
      `;
    }

    if ($tone === "warning") {
      return css`
        border-left-color: ${({ theme }) => theme.colors.warning};
        background: rgba(227, 154, 18, 0.12);
        color: #9a6811;
      `;
    }

    if ($tone === "info") {
      return css`
        border-left-color: ${({ theme }) => theme.colors.brandBlue};
        background: rgba(46, 127, 240, 0.1);
        color: ${({ theme }) => theme.colors.brandBlue};
      `;
    }

    return css`
      border-left-color: ${({ theme }) => theme.colors.borderStrong};
      background: rgba(91, 104, 136, 0.08);
      color: ${({ theme }) => theme.colors.textMuted};
    `;
  }}
`;

export const RowButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
`;

export const TwoColumn = styled.section`
  display: grid;
  gap: 0.74rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const ItemList = styled.div`
  display: grid;
  gap: 0.56rem;
`;

export const ItemCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  padding: 0.64rem;
  display: grid;
  gap: 0.3rem;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }
`;

export const ItemActions = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const EmptyState = styled.p`
  margin: 0;
  border: ${({ theme }) => theme.borders.dashed};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panel};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.64rem;
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.45;
`;

const BaseButton = styled.button`
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  letter-spacing: 0.01em;
  padding: 0 0.72rem;
  cursor: pointer;
`;

export const PrimaryButton = styled(BaseButton)`
  border: none;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`;

export const SecondaryButton = styled(BaseButton)`
  border: ${({ theme }) => theme.borders.subtle};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled(BaseButton)`
  border: 1px solid rgba(211, 77, 98, 0.34);
  background: rgba(211, 77, 98, 0.1);
  color: #b53b53;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`;

export const FooterCard = styled.footer`
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.96);
  padding: 0.86rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.62rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
  }
`;