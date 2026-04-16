import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  border: 1px solid rgba(111, 74, 178, 0.18);
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(111, 74, 178, 0.14) 0%, rgba(111, 74, 178, 0) 42%),
    linear-gradient(158deg, rgba(255, 255, 255, 0.99) 0%, rgba(247, 240, 255, 0.88) 100%);
  padding: 12px;
  box-shadow: 0 12px 20px rgba(28, 38, 64, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px;
  }
`;
