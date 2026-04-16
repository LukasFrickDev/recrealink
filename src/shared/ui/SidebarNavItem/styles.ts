import styled, { css } from "styled-components";

export const Item = styled.div<{ $active: boolean; $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ $collapsed }) => ($collapsed ? "10px" : "10px 12px")};
  border: 1px solid transparent;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  ${({ $active, theme }) =>
    $active
      ? css`
          background: var(--sidebar-active-bg, rgba(46, 127, 240, 0.12));
          border-color: var(--sidebar-active-border, ${theme.colors.brandBlue});
          box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);
        `
      : css`
          &:hover {
            background: var(--sidebar-hover-bg, rgba(46, 127, 240, 0.06));
            border-color: rgba(101, 112, 138, 0.24);
            transform: translateY(-1px);
          }
        `}
`;

export const Icon = styled.div`
  color: var(--sidebar-icon-color, ${({ theme }) => theme.colors.brandBlue});
  display: inline-flex;
  transition: color 0.2s ease;
`;

export const TextBlock = styled.div`
  display: grid;
  gap: 2px;

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.35;
  }
`;
