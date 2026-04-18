import styled, { css } from "styled-components";

type PillTone = "neutral" | "info" | "warning" | "success";

const stateTone = {
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

export const Wrapper = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FiltersCard = styled.article`
  border: 1px solid rgba(46, 127, 240, 0.18);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.92));
  backdrop-filter: blur(6px);
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FiltersHeader = styled.div`
  display: grid;
  gap: 4px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    color: ${({ theme }) => theme.colors.textStrong};
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: 2fr repeat(4, minmax(140px, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const SearchField = styled.label`
  border: 1px solid rgba(46, 127, 240, 0.18);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.88);
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0 ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  input {
    border: 0;
    background: transparent;
    width: 100%;
    min-height: 42px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.bodySm};

    &:focus {
      outline: none;
    }
  }
`;

export const SelectField = styled.select`
  border: 1px solid rgba(46, 127, 240, 0.14);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.9);
  min-height: 42px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.text};
`;

export const ContextCard = styled.div`
  border: 1px solid ${({ theme }) => theme.status.infoBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(155deg, rgba(235, 244, 255, 0.76), rgba(235, 244, 255, 0.92));
  backdrop-filter: blur(6px);
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  flex-wrap: wrap;

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.45;
  }
`;

export const OpportunitiesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
`;

export const OpportunityCard = styled.article<{ $highlighted?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(164deg, rgba(255, 255, 255, 0.94), rgba(244, 249, 255, 0.78));
  padding: 0.5rem;
  display: grid;
  gap: 0.42rem;
  overflow: hidden;

  ${({ $highlighted }) =>
    $highlighted
      ? `
    border-color: rgba(46, 127, 240, 0.44);
    box-shadow: 0 10px 20px rgba(46, 127, 240, 0.12);
  `
      : ""}
`;

export const OpportunityVisual = styled.div`
  height: 108px;
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
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.04), rgba(15, 23, 42, 0.54));
  }
`;

export const OpportunityVisualOverlay = styled.div`
  position: absolute;
  left: 0.52rem;
  right: 0.52rem;
  bottom: 0.44rem;
  z-index: 1;
  display: grid;
  gap: 0.08rem;

  strong {
    color: #fff;
    font-size: ${({ theme }) => theme.typography.bodySm};
    font-weight: 800;
    line-height: 1.25;
  }

  span {
    color: rgba(248, 250, 252, 0.92);
    font-size: ${({ theme }) => theme.typography.micro};
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
`;

export const OpportunityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;
`;

export const CodeBadge = styled.span`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.12rem 0.44rem;
`;

export const OriginBadge = styled.span<{ $origin: "hotelaria" | "eventos" }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.12rem 0.42rem;
  border: 1px solid
    ${({ $origin }) => ($origin === "hotelaria" ? "rgba(46, 127, 240, 0.35)" : "rgba(211, 77, 98, 0.35)")};
  background: ${({ $origin }) => ($origin === "hotelaria" ? "rgba(46, 127, 240, 0.1)" : "rgba(211, 77, 98, 0.1)")};
  color: ${({ $origin }) => ($origin === "hotelaria" ? "#1e5fb4" : "#b53b53")};
`;

export const RoleTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.cardTitle};
  line-height: 1.3;
`;

export const OriginSummary = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const HighlightRow = styled.div`
  display: grid;
  gap: 0.34rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HighlightPill = styled.span`
  border: 1px solid rgba(46, 127, 240, 0.2);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.84);
  min-height: 28px;
  padding: 0 0.52rem;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textStrong};
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;

  svg {
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const DetailList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.26rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.34rem;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.35;
  }
`;

export const StateRow = styled.div`
  display: flex;
  gap: 0.36rem;
  flex-wrap: wrap;
`;

export const StatePill = styled.span<{ $tone: PillTone }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.12rem 0.42rem;
  border: 1px solid transparent;

  ${({ $tone }) => stateTone[$tone]}
`;

export const CommitmentNote = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.success};
  font-weight: 700;
`;

export const DecisionHint = styled.p<{ $tone: PillTone }>`
  margin: 0;
  border-left: 4px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.55rem 0.62rem;
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
      background: ${({ theme }) => theme.surfaces.panelSoft};
      color: ${({ theme }) => theme.colors.textMuted};
    `;
  }}
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 0.42rem;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 38px;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  letter-spacing: 0.01em;
  padding: 0 0.76rem;
  display: inline-flex;
  align-items: center;
  gap: 0.34rem;
  cursor: pointer;
  box-shadow: 0 9px 14px rgba(46, 127, 240, 0.2);
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 18px rgba(46, 127, 240, 0.24);
  }
`;

export const SecondaryButton = styled.button`
  border: 1px solid rgba(46, 127, 240, 0.18);
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 38px;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  padding: 0 0.74rem;
  cursor: pointer;
  transition: border-color 150ms ease, transform 150ms ease, color 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
    transform: translateY(-1px);
  }
`;

export const EmptyCard = styled.article`
  border: ${({ theme }) => theme.borders.dashed};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panel};
  padding: 1rem;
  display: grid;
  gap: 0.55rem;

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.5;
  }
`;