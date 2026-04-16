import styled from "styled-components";

export const Section = styled.section`
  padding: 40px 0 50px;
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Content = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(145deg, #ffffff 0%, #eef4ff 100%);
  padding: 24px;
  display: grid;
  gap: 18px;
  grid-template-columns: 1.1fr 0.9fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }

  h2 {
    margin-top: 12px;
    font-size: clamp(30px, 4vw, 40px);
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
    max-width: 640px;
  }
`;

export const Actions = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  align-content: center;

  article {
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: #fff;
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 14px;
    text-align: center;
  }

  strong {
    font-size: 24px;
    display: block;
  }

  span {
    margin-top: 4px;
    display: block;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }
`;
