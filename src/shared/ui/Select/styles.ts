import styled from "styled-components";

export const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.3;
`;

export const SelectBase = styled.select`
  width: 100%;
  min-height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.4;
  transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandBlue};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.focusRing};
  }

  &:disabled {
    background: ${({ theme }) => theme.surfaces.panelSoft};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;
