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
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.81rem;
    line-height: 1.45;
  }
`;

export const FiltersCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.85rem;
`;

export const FiltersGrid = styled.div`
  display: grid;
  gap: 0.55rem;
  grid-template-columns: 2fr repeat(4, minmax(140px, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const SearchField = styled.label`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0 0.58rem;

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  input {
    border: 0;
    background: transparent;
    width: 100%;
    min-height: 38px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.8rem;

    &:focus {
      outline: none;
    }
  }
`;

export const SelectField = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  min-height: 38px;
  padding: 0 0.58rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.text};
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

export const Feedback = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.success};
`;

export const OpportunitiesGrid = styled.div`
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

export const OpportunityCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.82rem;
  display: grid;
  gap: 0.5rem;
`;

export const OpportunityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;
`;

export const CodeBadge = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 0.14rem 0.48rem;
`;

export const OriginBadge = styled.span<{ $origin: "hotelaria" | "eventos" }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.67rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  padding: 0.14rem 0.46rem;
  border: 1px solid
    ${({ $origin }) => ($origin === "hotelaria" ? "rgba(29, 78, 216, 0.35)" : "rgba(194, 65, 12, 0.35)")};
  background: ${({ $origin }) => ($origin === "hotelaria" ? "rgba(29, 78, 216, 0.1)" : "rgba(194, 65, 12, 0.1)")};
  color: ${({ $origin }) => ($origin === "hotelaria" ? "#1d4ed8" : "#9a3412")};
`;

export const RoleTitle = styled.h3`
  margin: 0;
  font-size: 0.88rem;
`;

export const OriginSummary = styled.p`
  margin: 0;
  font-size: 0.77rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

export const DetailList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.3rem;

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Compensation = styled.strong`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.brandBlue};
`;

export const StateRow = styled.div`
  display: flex;
  gap: 0.36rem;
  flex-wrap: wrap;
`;

export const StatePill = styled.span<{ $tone: "neutral" | "info" | "warning" | "success" }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.66rem;
  font-weight: 700;
  padding: 0.14rem 0.45rem;
  border: 1px solid
    ${({ $tone }) => {
      if ($tone === "success") {
        return "rgba(5, 150, 105, 0.32)";
      }

      if ($tone === "warning") {
        return "rgba(202, 138, 4, 0.32)";
      }

      if ($tone === "info") {
        return "rgba(29, 78, 216, 0.32)";
      }

      return "rgba(100, 116, 139, 0.3)";
    }};
  background: ${({ $tone }) => {
    if ($tone === "success") {
      return "rgba(5, 150, 105, 0.1)";
    }

    if ($tone === "warning") {
      return "rgba(202, 138, 4, 0.12)";
    }

    if ($tone === "info") {
      return "rgba(29, 78, 216, 0.1)";
    }

    return "rgba(100, 116, 139, 0.1)";
  }};
  color: ${({ $tone }) => {
    if ($tone === "success") {
      return "#047857";
    }

    if ($tone === "warning") {
      return "#a16207";
    }

    if ($tone === "info") {
      return "#1d4ed8";
    }

    return "#475569";
  }};
`;

export const CommitmentNote = styled.p`
  margin: 0;
  font-size: 0.74rem;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 600;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 0.42rem;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandBlue};
  color: #fff;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.46rem 0.72rem;
  display: inline-flex;
  align-items: center;
  gap: 0.33rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.46rem 0.72rem;
  cursor: pointer;
`;

export const EmptyCard = styled.article`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 1rem;
  font-size: 0.8rem;
`;
