import styled from "styled-components";

export const Wrapper = styled.section`
  display: grid;
  gap: 1rem;
`;

export const ProgressCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  display: grid;
  gap: 0.6rem;

  p {
    margin: 0;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;

  h2 {
    margin: 0;
    font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  span {
    font-size: 0.76rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const ProgressBar = styled.div`
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #2e7ff0 0%, #6c5ce7 100%);
  }
`;

export const ListCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
`;

export const ItemRow = styled.article<{ $done?: boolean }>`
  border: 1px solid ${({ theme, $done }) => ($done ? "rgba(23, 167, 102, 0.35)" : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $done }) => ($done ? "rgba(23, 167, 102, 0.08)" : theme.colors.surface)};
  padding: 0.7rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.6rem;
`;

export const CheckButton = styled.button<{ $done?: boolean }>`
  border: 1px solid ${({ theme, $done }) => ($done ? theme.colors.success : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $done }) => ($done ? "rgba(23, 167, 102, 0.14)" : theme.colors.surface)};
  color: ${({ theme, $done }) => ($done ? theme.colors.success : theme.colors.textMuted)};
  cursor: pointer;
`;

export const ItemContent = styled.div`
  display: grid;
  gap: 0.25rem;

  strong {
    font-size: 0.86rem;
  }

  p {
    margin: 0;
    font-size: 0.76rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const StatusBadge = styled.span<{ $done?: boolean }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.2rem 0.55rem;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ theme, $done }) => ($done ? theme.colors.success : theme.colors.textMuted)};
  background: ${({ theme, $done }) => ($done ? "rgba(23, 167, 102, 0.16)" : theme.colors.surfaceSoft)};
`;

export const ReviewCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  display: grid;
  gap: 0.7rem;

  h3 {
    margin: 0;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  ul {
    margin: 0;
    padding-left: 1rem;
    display: grid;
    gap: 0.45rem;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.8rem;
  }
`;

export const SaveButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandBlue};
  color: #fff;
  width: fit-content;
  padding: 0.5rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
`;

export const Feedback = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.8rem;
  font-weight: 700;
`;
