import styled, { css } from "styled-components";

type DecisionTone = "aguardando" | "pendente" | "aceito" | "recusado";

const decisionToneMap = {
  aguardando: css`
    border-left-color: ${({ theme }) => theme.colors.brandBlue};
    background: rgba(46, 127, 240, 0.12);
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  pendente: css`
    border-left-color: ${({ theme }) => theme.colors.warning};
    background: rgba(227, 154, 18, 0.12);
    color: #9a6811;
  `,
  aceito: css`
    border-left-color: ${({ theme }) => theme.colors.success};
    background: rgba(23, 167, 102, 0.12);
    color: #0f7a4d;
  `,
  recusado: css`
    border-left-color: ${({ theme }) => theme.colors.borderStrong};
    background: rgba(91, 104, 136, 0.1);
    color: ${({ theme }) => theme.colors.textMuted};
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

export const StatusTabs = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const StatusTabButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.brandBlue : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(154deg, rgba(46, 127, 240, 0.14), rgba(255, 255, 255, 0.95))"
      : "linear-gradient(154deg, rgba(255, 255, 255, 0.88), rgba(246, 250, 255, 0.84))"};
  min-height: 48px;
  padding: 0.46rem 0.62rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.42rem;
  cursor: pointer;
  transition: border-color 160ms ease, transform 160ms ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    transform: translateY(-1px);
  }
`;

export const StatusTabLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.34rem;
  color: ${({ theme }) => theme.colors.textStrong};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
`;

export const StatusTabCount = styled.strong`
  min-width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(46, 127, 240, 0.3);
  background: rgba(46, 127, 240, 0.1);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const StatusPanel = styled.section`
  display: grid;
`;

export const ColumnCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panel};
  padding: 0.64rem;
  display: grid;
  gap: 0.52rem;
  min-height: 420px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 0;
  }
`;

export const ColumnHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.cardTitle};
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMuted};
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.radii.pill};
    padding: 0.12rem 0.4rem;
    background: ${({ theme }) => theme.surfaces.panelSoft};
  }
`;

export const ColumnHelper = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.45;
`;

export const InviteList = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const InviteCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(164deg, rgba(255, 255, 255, 0.92), rgba(242, 248, 255, 0.74));
  padding: 0.5rem;
  display: grid;
  gap: 0.34rem;
`;

export const InviteTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.4rem;

  min-width: 0;

  > span {
    flex-shrink: 0;
  }
`;

export const InviteIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.46rem;
  min-width: 0;
`;

export const InviteThumb = styled.span`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  display: inline-flex;
  border: 1px solid rgba(46, 127, 240, 0.24);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const InviteHeading = styled.div`
  display: grid;
  gap: 0.1rem;
  min-width: 0;

  strong {
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textStrong};
    line-height: 1.25;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.35;
    text-transform: none;
    letter-spacing: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const OriginBadge = styled.span<{ $origin: "hotelaria" | "eventos" }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.12rem 0.4rem;
  border: 1px solid
    ${({ $origin }) => ($origin === "hotelaria" ? "rgba(46, 127, 240, 0.34)" : "rgba(211, 77, 98, 0.34)")};
  background: ${({ $origin }) => ($origin === "hotelaria" ? "rgba(46, 127, 240, 0.1)" : "rgba(211, 77, 98, 0.1)")};
  color: ${({ $origin }) => ($origin === "hotelaria" ? "#1e5fb4" : "#b53b53")};
`;

export const MetaPillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.26rem;
`;

export const MetaPill = styled.span`
  border: 1px solid rgba(46, 127, 240, 0.18);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.86);
  min-height: 24px;
  padding: 0 0.44rem;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  gap: 0.24rem;

  svg {
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const MetaLine = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.35;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

export const DecisionHint = styled.p<{ $status: DecisionTone }>`
  margin: 0;
  border-left: 4px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.5rem 0.56rem;
  font-size: ${({ theme }) => theme.typography.meta};
  line-height: 1.4;

  ${({ $status }) => decisionToneMap[$status]}
`;

export const TimelineList = styled.ul`
  margin: 0;
  padding-left: 0.94rem;
  display: grid;
  gap: 0.22rem;

  li {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.35;
  }
`;

export const CommitmentNote = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.success};
  font-weight: 700;
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.34rem;
`;

const BaseButton = styled.button`
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 34px;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 800;
  letter-spacing: 0.01em;
  padding: 0 0.62rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: border-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.64;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const AcceptButton = styled(BaseButton)`
  border: 1px solid rgba(23, 167, 102, 0.36);
  background: linear-gradient(146deg, rgba(23, 167, 102, 0.12), rgba(255, 255, 255, 0.78));
  color: #0f7a4d;
  box-shadow: 0 8px 14px rgba(23, 167, 102, 0.14);
`;

export const RejectButton = styled(BaseButton)`
  border: 1px solid rgba(91, 104, 136, 0.38);
  background: linear-gradient(146deg, rgba(91, 104, 136, 0.12), rgba(255, 255, 255, 0.78));
  color: #475569;
`;

export const OpenOpportunityButton = styled(BaseButton)`
  border: 1px solid rgba(46, 127, 240, 0.22);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.colors.text};
`;

export const DecisionOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1400;
  background: rgba(15, 23, 42, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const DecisionModal = styled.article`
  width: min(460px, 100%);
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.surfaces.panel};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.sectionTitle};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const DecisionActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.45rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const DecisionBaseButton = styled.button`
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  padding: 0 0.72rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.64;
    cursor: not-allowed;
  }
`;

export const DecisionCancelButton = styled(DecisionBaseButton)`
  border: ${({ theme }) => theme.borders.subtle};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
`;

export const DecisionConfirmButton = styled(DecisionBaseButton)<{ $tone: "aceito" | "recusado" }>`
  border: 1px solid
    ${({ $tone }) => ($tone === "aceito" ? "rgba(23, 167, 102, 0.4)" : "rgba(91, 104, 136, 0.42)")};
  background: ${({ $tone }) => ($tone === "aceito" ? "rgba(23, 167, 102, 0.14)" : "rgba(91, 104, 136, 0.14)")};
  color: ${({ $tone }) => ($tone === "aceito" ? "#0f7a4d" : "#475569")};
`;

export const EmptyState = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
  border: ${({ theme }) => theme.borders.dashed};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.64rem;
  background: ${({ theme }) => theme.surfaces.panel};
  line-height: 1.45;
`;