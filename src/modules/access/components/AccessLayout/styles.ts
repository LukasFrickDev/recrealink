import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #2e7ff0 0%, #8a61d4 100%);
  padding: 24px 16px;
`;

export const Card = styled.main`
  width: min(980px, 100%);
  background: #fff;
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Intro = styled.aside`
  padding: 34px 30px;
  background: linear-gradient(170deg, #f4f8ff 0%, #fff2e7 100%);

  h1 {
    font-size: clamp(30px, 4vw, 46px);
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const IntroList = styled.ul`
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;

  li {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    background: #fff;
    padding: 10px;

    strong {
      display: block;
      font-size: 14px;
    }

    span {
      display: block;
      margin-top: 4px;
      color: ${({ theme }) => theme.colors.textMuted};
      font-size: 12px;
    }
  }
`;

export const FormColumn = styled.section`
  padding: 34px 30px;
  display: grid;
  align-content: center;
  gap: 14px;
`;
