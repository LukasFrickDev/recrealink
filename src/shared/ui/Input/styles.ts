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

export const InputBase = styled.input`
  width: 100%;
  min-height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.4;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandBlue};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.focusRing};
  }

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.colors.danger};
    box-shadow: 0 0 0 4px rgba(211, 77, 98, 0.16);
  }

  &:disabled {
    background: ${({ theme }) => theme.surfaces.panelSoft};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;

export const Hint = styled.span<{ $error: boolean }>`
  font-size: 12px;
  color: ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.textMuted)};
`;
