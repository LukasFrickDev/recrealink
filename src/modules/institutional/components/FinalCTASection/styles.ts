import styled from "styled-components";

export const Section = styled.section`
  padding: 68px 0;
  color: #fff;
  background: linear-gradient(145deg, #2e7ff0 0%, #f96f26 100%);
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
  text-align: center;

  h2 {
    font-size: clamp(34px, 6vw, 52px);
  }

  p {
    margin: 10px auto 0;
    max-width: 780px;
    font-size: 19px;
    opacity: 0.94;
  }
`;

export const StatsGrid = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  article {
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  strong {
    display: block;
    font-size: 28px;
  }

  span {
    font-size: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Actions = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;
