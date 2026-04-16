import styled from "styled-components";

export const NotFoundWrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
  gap: 10px;

  h1 {
    font-size: 72px;
    color: ${({ theme }) => theme.colors.brandBlue};
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  a {
    color: ${({ theme }) => theme.colors.brandOrange};
    font-weight: 700;
  }
`;
