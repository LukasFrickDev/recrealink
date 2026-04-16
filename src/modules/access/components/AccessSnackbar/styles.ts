import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const Toast = styled.div`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  z-index: 30;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(255, 255, 255, 0.26);
  background: rgba(28, 38, 64, 0.92);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.shadows.md};
  animation: ${slideUp} 0.2s ease;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.brandOrange};
  }
`;
