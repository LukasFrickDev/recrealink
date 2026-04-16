import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  border: 1px solid rgba(225, 105, 124, 0.2);
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(225, 105, 124, 0.14) 0%, rgba(225, 105, 124, 0) 42%),
    linear-gradient(158deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 241, 246, 0.9) 100%);
  padding: 12px;
  box-shadow: 0 12px 20px rgba(28, 38, 64, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px;
  }
`;
