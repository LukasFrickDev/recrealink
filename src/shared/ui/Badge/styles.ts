import styled, { css } from "styled-components";
import type { BadgeTone } from "./index";

const toneStyles = {
  neutral: css`
    background: #eef1f8;
    color: #506081;
  `,
  success: css`
    background: rgba(23, 167, 102, 0.14);
    color: #128654;
  `,
  warning: css`
    background: rgba(227, 154, 18, 0.14);
    color: #ab7208;
  `,
  danger: css`
    background: rgba(211, 77, 98, 0.14);
    color: #ab2f46;
  `,
  brand: css`
    background: var(--badge-brand-bg, rgba(46, 127, 240, 0.14));
    color: var(--badge-brand-color, #1f63c6);
  `,
};

export const BadgeBase = styled.span<{ $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 11px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;

  ${({ $tone }) => toneStyles[$tone]}
`;
