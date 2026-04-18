import styled, { css } from "styled-components";

export const Item = styled.div<{ $active: boolean; $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ $collapsed, theme }) =>
    $collapsed ? theme.spacing.sm : `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid transparent;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  a:focus-visible & {
    outline: 2px solid var(--sidebar-active-border, ${({ theme }) => theme.colors.brandBlue});
    outline-offset: 2px;
  }

  ${({ $active, theme }) =>
    $active
      ? css`
          background: var(--sidebar-active-bg, rgba(46, 127, 240, 0.12));
          border-color: var(--sidebar-active-border, ${theme.colors.brandBlue});
          box-shadow: ${theme.shadows.sm};
        `
      : css`
          &:hover {
            background: var(--sidebar-hover-bg, rgba(46, 127, 240, 0.06));
            border-color: ${theme.colors.borderStrong};
            transform: translateY(-1px);
          }
        `}

  ${({ $collapsed }) =>
    $collapsed
      ? css`
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 62px;
          padding: 8px 6px;
          gap: 4px;
        `
      : null}
`;

export const Icon = styled.div`
  color: var(--sidebar-icon-color, ${({ theme }) => theme.colors.brandBlue});
  display: inline-flex;
  transition: color 0.2s ease;
`;

export const TextBlock = styled.div<{ $active: boolean }>`
  display: grid;
  gap: 3px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    color: ${({ theme }) => theme.colors.textStrong};
    line-height: 1.28;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.42;
    display: ${({ $active }) => ($active ? "block" : "none")};
  }
`;

export const CollapsedLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.micro};
  color: ${({ theme }) => theme.colors.textStrong};
  line-height: 1.25;
  text-align: center;
  max-width: 7ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
