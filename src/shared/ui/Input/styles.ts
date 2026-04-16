import styled from "styled-components";

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const InputBase = styled.input`
  width: 100%;
  min-height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandBlue};
    box-shadow: 0 0 0 4px rgba(46, 127, 240, 0.15);
  }
`;

export const Hint = styled.span<{ $error: boolean }>`
  font-size: 12px;
  color: ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.textMuted)};
`;
