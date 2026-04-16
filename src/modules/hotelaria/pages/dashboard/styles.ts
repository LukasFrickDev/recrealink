import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 20px;

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

export const SummaryStrip = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SummaryCard = styled.article`
  border: 1px solid rgba(249, 111, 38, 0.24);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(249, 111, 38, 0.12) 0%, rgba(255, 255, 255, 0.96) 62%);
  padding: 12px;
  display: grid;
  gap: 5px;
  box-shadow: 0 10px 20px rgba(28, 38, 64, 0.08);

  strong {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  h3 {
    margin: 0;
    font-size: clamp(22px, 3.4vw, 28px);
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.1;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const SurfaceCard = styled.article`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 16px;
  display: grid;
  gap: 14px;
`;

export const CardTitle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.title};
  }
`;

export const TitleIconWrap = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(249, 111, 38, 0.12);
  color: ${({ theme }) => theme.colors.brandOrange};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const ImpactItem = styled.article`
  border: 1px solid rgba(249, 111, 38, 0.2);
  background: linear-gradient(145deg, rgba(249, 111, 38, 0.1) 0%, rgba(225, 105, 124, 0.07) 100%);
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 14px;
  display: grid;
  gap: 6px;
  justify-items: center;
  text-align: center;

  strong {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.title};
    line-height: 1;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ImpactIconWrap = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const MainGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const ShiftList = styled.div`
  display: grid;
  gap: 10px;
`;

export const ShiftItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  strong {
    display: block;
    font-size: 14px;
  }

  p {
    margin: 2px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ShiftBadge = styled.span<{ $tone: "warning" | "success" }>`
  min-height: 24px;
  padding: 0 9px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid
    ${({ $tone, theme }) => ($tone === "success" ? theme.colors.success : theme.colors.warning)};
  color: ${({ $tone, theme }) => ($tone === "success" ? theme.colors.success : theme.colors.warning)};
  background: ${({ $tone }) => ($tone === "success" ? "rgba(23, 167, 102, 0.1)" : "rgba(227, 154, 18, 0.1)")};
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const TeamList = styled.div`
  display: grid;
  gap: 10px;
`;

export const TeamItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
`;

export const TeamPosition = styled.div<{ $rank: number }>`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid
    ${({ $rank }) =>
      $rank === 1
        ? "rgba(227, 154, 18, 0.5)"
        : $rank === 2
          ? "rgba(138, 97, 212, 0.42)"
          : "rgba(46, 127, 240, 0.42)"};
  color: ${({ $rank, theme }) =>
    $rank === 1 ? theme.colors.warning : $rank === 2 ? theme.colors.brandPurple : theme.colors.brandBlue};
  background: ${({ $rank }) =>
    $rank === 1
      ? "rgba(227, 154, 18, 0.12)"
      : $rank === 2
        ? "rgba(138, 97, 212, 0.12)"
        : "rgba(46, 127, 240, 0.12)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
`;

export const TeamMeta = styled.div`
  display: grid;
  gap: 2px;

  strong {
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const TeamStats = styled.div`
  text-align: right;
  display: grid;
  gap: 2px;

  strong {
    font-size: 13px;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const AlertList = styled.div`
  display: grid;
  gap: 10px;
`;

export const AlertItem = styled.article<{ $tone: "warning" | "brand" | "success" }>`
  border-left: 4px solid
    ${({ $tone, theme }) =>
      $tone === "warning"
        ? theme.colors.warning
        : $tone === "success"
          ? theme.colors.success
          : theme.colors.brandOrange};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 12px;
  background:
    ${({ $tone }) =>
      $tone === "warning"
        ? "rgba(227, 154, 18, 0.12)"
        : $tone === "success"
          ? "rgba(23, 167, 102, 0.1)"
          : "rgba(249, 111, 38, 0.1)"};

  strong {
    font-size: 14px;
  }

  p {
    margin: 4px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const NextEventHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Checklist = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
`;

export const ChecklistItem = styled.li<{ $done: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $done }) => ($done ? "rgba(23, 167, 102, 0.3)" : theme.colors.border)};
  background: ${({ $done }) => ($done ? "rgba(23, 167, 102, 0.08)" : "#fff")};
  padding: 10px 12px;

  i {
    font-style: normal;
    width: 16px;
    text-align: center;
    color: ${({ theme, $done }) => ($done ? theme.colors.success : theme.colors.textMuted)};
    font-weight: 800;
  }

  span {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const QuickReportList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const QuickReportItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 10px 12px;
  display: grid;
  gap: 4px;

  strong {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.brandOrange};
    font-weight: 700;
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ToolsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;

  h3 {
    margin: 0;
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 3px 0 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const ToolButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fcfdff;
  padding: 12px;
  text-align: left;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandOrange};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.84;
    cursor: default;

    &:hover {
      border-color: ${({ theme }) => theme.colors.border};
      transform: none;
    }
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.4;
  }
`;

export const ToolIconWrap = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ToolContent = styled.div`
  display: grid;
  gap: 4px;

  strong {
    font-size: 14px;
  }
`;
