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
    min-height: 34px;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.bodySm};
  `,
  md: css`
    min-height: 40px;
    padding: 0 ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.bodySm};
  `,
  lg: css`
    min-height: 46px;
    padding: 0 ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.body};
  `,
};

export const ButtonBase = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 800;
  letter-spacing: 0.01em;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.36rem;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    opacity 0.16s ease,
    border-color 0.16s ease,
    color 0.16s ease,
    background 0.16s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.focusRing};
  }

  &:disabled {
    opacity: 0.56;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
