import styled from "styled-components";

export const Wrapper = styled.section`
  display: grid;
  gap: 1rem;
`;

export const HeaderCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  display: grid;
  gap: 0.35rem;

  h2 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.81rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const LegendGrid = styled.div`
  display: grid;
  gap: 0.55rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

export const LegendCard = styled.article`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 0.72rem;
  display: grid;
  gap: 0.3rem;

  strong {
    font-size: 0.8rem;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.4;
  }
`;

export const BoardGrid = styled.section`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

export const ColumnCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.75rem;
  display: grid;
  gap: 0.6rem;
`;

export const ColumnHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;

  h3 {
    margin: 0;
    font-size: 0.86rem;
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
  }

  span {
    font-size: 0.69rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMuted};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.pill};
    padding: 0.12rem 0.42rem;
    background: ${({ theme }) => theme.colors.surfaceSoft};
  }
`;

export const InviteList = styled.div`
  display: grid;
  gap: 0.6rem;
`;

export const InviteCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 0.62rem;
  display: grid;
  gap: 0.38rem;
`;

export const InviteTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;

  strong {
    font-size: 0.81rem;
  }
`;

export const OriginBadge = styled.span<{ $origin: "hotelaria" | "eventos" }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  padding: 0.14rem 0.42rem;
  border: 1px solid
    ${({ $origin }) => ($origin === "hotelaria" ? "rgba(29, 78, 216, 0.34)" : "rgba(194, 65, 12, 0.34)")};
  background: ${({ $origin }) => ($origin === "hotelaria" ? "rgba(29, 78, 216, 0.1)" : "rgba(194, 65, 12, 0.1)")};
  color: ${({ $origin }) => ($origin === "hotelaria" ? "#1d4ed8" : "#9a3412")};
`;

export const MetaLine = styled.p`
  margin: 0;
  font-size: 0.73rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.35;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

export const TimelineList = styled.ul`
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.26rem;

  li {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.35;
  }
`;

export const CommitmentNote = styled.p`
  margin: 0;
  font-size: 0.73rem;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 600;
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
`;

const BaseButton = styled.button`
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.73rem;
  font-weight: 700;
  padding: 0.43rem 0.64rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

export const AcceptButton = styled(BaseButton)`
  border: 1px solid rgba(5, 150, 105, 0.35);
  background: rgba(5, 150, 105, 0.12);
  color: #047857;
`;

export const RejectButton = styled(BaseButton)`
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(148, 163, 184, 0.13);
  color: #475569;
`;

export const OpenOpportunityButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

export const Feedback = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.8rem;
  font-weight: 700;
`;

export const EmptyState = styled.p`
  margin: 0;
  font-size: 0.76rem;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.62rem;
  background: ${({ theme }) => theme.colors.surface};
`;
