import styled, { css } from "styled-components";
import type { BadgeTone } from "./index";

const toneStyles = {
  neutral: css`
    border-color: rgba(80, 96, 129, 0.24);
    background: #eef1f8;
    color: #506081;
  `,
  success: css`
    border-color: rgba(18, 134, 84, 0.24);
    background: rgba(23, 167, 102, 0.14);
    color: #128654;
  `,
  warning: css`
    border-color: rgba(171, 114, 8, 0.24);
    background: rgba(227, 154, 18, 0.14);
    color: #ab7208;
  `,
  danger: css`
    border-color: rgba(171, 47, 70, 0.24);
    background: rgba(211, 77, 98, 0.14);
    color: #ab2f46;
  `,
  brand: css`
    border-color: rgba(31, 99, 198, 0.24);
    background: var(--badge-brand-bg, rgba(46, 127, 240, 0.14));
    color: var(--badge-brand-color, #1f63c6);
  `,
};

export const BadgeBase = styled.span<{ $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid transparent;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.02em;
  white-space: nowrap;

  ${({ $tone }) => toneStyles[$tone]}
`;
