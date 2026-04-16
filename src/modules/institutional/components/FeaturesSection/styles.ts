import styled from "styled-components";

export const Section = styled.section`
  padding: 56px 0;
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Header = styled.header`
  max-width: 780px;

  h2 {
    font-size: clamp(28px, 5vw, 42px);
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
  }
`;

export const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Card = styled.article`
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 16px;

  h3 {
    font-size: 18px;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 13px;
  }
`;
