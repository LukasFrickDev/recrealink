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
  max-width: 760px;

  h2 {
    font-size: clamp(30px, 5vw, 42px);
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
  }
`;

export const Grid = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Card = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fff;
  padding: 20px;

  small {
    margin-top: 4px;
    display: block;
    color: ${({ theme }) => theme.colors.brandBlue};
    font-weight: 700;
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
  }
`;
