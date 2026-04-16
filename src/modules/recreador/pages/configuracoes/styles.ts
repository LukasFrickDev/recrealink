import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 16px;
`;

export const ProfileGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 0.6fr 1.4fr;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ProfileAside = styled.aside`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 12px;
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
  justify-items: center;
  justify-self: center;
  align-self: start;
  width: min(100%, 320px);
  text-align: center;
`;

export const AvatarPreview = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 22px;
  background: linear-gradient(150deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandPurple});
  color: #fff;
  font-size: 30px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled.strong`
  font-size: 14px;
`;

export const ProfileRole = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const OutlineButton = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
`;

export const ProfileForm = styled.div`
  display: grid;
  gap: 10px;
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 5px;

  span {
    font-size: 12px;
    font-weight: 700;
  }

  input,
  textarea {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px;
    font-size: 13px;
    font-family: ${({ theme }) => theme.fonts.body};
    background: #fff;
  }

  textarea {
    min-height: 88px;
    resize: vertical;
  }
`;

export const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Chip = styled.button<{ $selected: boolean }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 11px;
  font-weight: 700;
  padding: 5px 10px;
  cursor: pointer;

  ${({ $selected }) =>
    $selected
      ? css`
          border-color: rgba(46, 127, 240, 0.35);
          background: rgba(46, 127, 240, 0.1);
          color: #1f67c8;
        `
      : null}
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PrimaryButton = styled.button`
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: ${({ theme }) => theme.colors.brandBlue};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

export const ProfileFeedback = styled.p<{ $success?: boolean }>`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $success, theme }) => ($success ? theme.colors.success : theme.colors.brandOrange)};
`;
