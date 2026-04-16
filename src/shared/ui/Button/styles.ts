import styled, { css } from "styled-components";
import type { ButtonSize, ButtonVariant } from "./index";

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.brandOrange};
    border: 1px solid ${({ theme }) => theme.colors.brandOrange};
    color: #fff;
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.brandBlue};
    border: 1px solid ${({ theme }) => theme.colors.brandBlue};
    color: #fff;
  `,
  outline: css`
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  ghost: css`
    background: transparent;
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.text};
  `,
};

const sizeStyles = {
  sm: css`
    min-height: 36px;
    padding: 0 14px;
    font-size: 13px;
  `,
  md: css`
    min-height: 42px;
    padding: 0 18px;
    font-size: 14px;
  `,
  lg: css`
    min-height: 50px;
    padding: 0 22px;
    font-size: 16px;
  `,
};

export const ButtonBase = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.56;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
