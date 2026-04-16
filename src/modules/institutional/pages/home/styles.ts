import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const Main = styled.main`
  display: grid;
`;
