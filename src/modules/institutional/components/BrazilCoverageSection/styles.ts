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
  text-align: center;
  max-width: 760px;
  margin: 0 auto;

  h2 {
    font-size: clamp(30px, 5vw, 42px);
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
  }
`;

export const MapCard = styled.div`
  margin-top: 20px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(150deg, #ffffff 0%, #eaf3ff 100%);
  padding: 18px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const CityCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 14px;
  }
`;
