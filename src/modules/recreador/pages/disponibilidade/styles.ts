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
    display: inline-flex;
    align-items: center;
    gap: 0.42rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.81rem;
    line-height: 1.45;
  }
`;

export const LegendGrid = styled.section`
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
  }
`;

export const SectionCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.82rem;
  display: grid;
  gap: 0.62rem;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: 0.88rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`;

export const SlotGrid = styled.div`
  display: grid;
  gap: 0.62rem;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
`;

export const SlotCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 0.65rem;
  display: grid;
  gap: 0.35rem;
`;

export const SlotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.45rem;

  strong {
    font-size: 0.8rem;
  }
`;

export const StatePill = styled.span<{ $tone: "neutral" | "info" | "warning" | "success" }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.66rem;
  font-weight: 700;
  padding: 0.14rem 0.43rem;
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

export const MetaText = styled.p`
  margin: 0;
  font-size: 0.73rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

export const RowButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
`;

export const TwoColumn = styled.section`
  display: grid;
  gap: 0.72rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const ItemList = styled.div`
  display: grid;
  gap: 0.55rem;
`;

export const ItemCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 0.62rem;
  display: grid;
  gap: 0.28rem;

  strong {
    font-size: 0.8rem;
  }
`;

export const EmptyState = styled.p`
  margin: 0;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.62rem;
  font-size: 0.74rem;
`;

const BaseButton = styled.button`
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.45rem 0.68rem;
  cursor: pointer;
`;

export const PrimaryButton = styled(BaseButton)`
  border: none;
  background: ${({ theme }) => theme.colors.brandBlue};
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`;

export const SecondaryButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const FooterCard = styled.footer`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.82rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.62rem;

  p {
    margin: 0;
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const Feedback = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.8rem;
  font-weight: 700;
`;
