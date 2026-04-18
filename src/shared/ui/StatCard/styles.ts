import styled from "styled-components";

export const Wrapper = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.surfaces.panelElevated};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    right: -16px;
    top: -16px;
    width: 56px;
    height: 56px;
    border-radius: 999px;
    background: ${({ theme }) => theme.status.infoSoft};
    pointer-events: none;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: 700;
`;

export const Icon = styled.div`
  display: inline-flex;
  color: var(--statcard-icon-color, ${({ theme }) => theme.colors.brandBlue});
  border: 1px solid ${({ theme }) => theme.status.infoBorder};
  border-radius: 10px;
  padding: 4px;
  background: ${({ theme }) => theme.surfaces.panel};
`;

export const Value = styled.strong`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: clamp(1.75rem, 4vw, 2.125rem);
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.textStrong};
`;

export const Helper = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;
