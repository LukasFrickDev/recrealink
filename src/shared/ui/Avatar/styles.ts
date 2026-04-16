import styled, { css } from "styled-components";

const sizeStyles = {
  sm: css`
    width: 32px;
    height: 32px;
    font-size: 12px;
  `,
  md: css`
    width: 42px;
    height: 42px;
    font-size: 13px;
  `,
  lg: css`
    width: 56px;
    height: 56px;
    font-size: 16px;
  `,
};

export const AvatarBase = styled.div<{ $size: "sm" | "md" | "lg" }>`
  border-radius: 50%;
  background: linear-gradient(140deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandPurple});
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  overflow: hidden;

  ${({ $size }) => sizeStyles[$size]}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
