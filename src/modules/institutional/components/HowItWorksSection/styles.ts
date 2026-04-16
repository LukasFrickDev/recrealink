import styled from "styled-components";

export const Section = styled.section`
  padding: 62px 0;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Header = styled.header`
  max-width: 760px;

  h2 {
    font-size: clamp(30px, 5vw, 44px);
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
  }
`;

export const Grid = styled.div`
  margin-top: 26px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Step = styled.article`
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 18px;

  span {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.brandBlue};
    color: #fff;
    font-weight: 800;
    font-size: 12px;
  }

  h3 {
    margin-top: 10px;
    font-size: 20px;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
