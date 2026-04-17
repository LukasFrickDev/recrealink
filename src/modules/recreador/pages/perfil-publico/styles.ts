import styled from "styled-components";

export const Wrapper = styled.section`
  display: grid;
  gap: 1rem;
`;

export const HeroCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  display: grid;
  gap: 0.75rem;
`;

export const HeroTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.85rem;
  flex-wrap: wrap;
`;

export const IdentityBlock = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.brandBlue};
`;

export const Identity = styled.div`
  display: grid;
  gap: 0.12rem;

  h2 {
    margin: 0;
    font-size: 1rem;
  }

  strong {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  p {
    margin: 0;
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 56ch;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

export const MetaBadge = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.22rem 0.52rem;
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
`;

export const Bio = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const Grid = styled.section`
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

export const Card = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.8rem;
  display: grid;
  gap: 0.6rem;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 0.88rem;
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const Chip = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 0.2rem 0.54rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const RuleList = styled.ul`
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.32rem;

  li {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.74rem;
    line-height: 1.4;
  }
`;

export const ReputationLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.44rem;

  strong {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.warning};
  }

  span {
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Policy = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Stars = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  display: inline-flex;
  align-items: center;
  gap: 0.16rem;
`;

export const ReviewGrid = styled.div`
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export const ReviewCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 0.65rem;
  display: grid;
  gap: 0.35rem;
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;

  strong {
    font-size: 0.8rem;
  }

  span {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
  }
`;

export const ReviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;

  span {
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.66rem;
    padding: 0.12rem 0.42rem;
    font-weight: 600;
  }
`;

export const ReviewText = styled.p`
  margin: 0;
  font-size: 0.76rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;
