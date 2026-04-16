import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 16px;
`;

export const HeaderCard = styled.section<{ $success: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 16px;

  ${({ $success }) =>
    $success
      ? css`
          background: linear-gradient(135deg, rgba(23, 167, 102, 0.12), rgba(46, 127, 240, 0.1));
        `
      : css`
          background: linear-gradient(135deg, rgba(46, 127, 240, 0.12), rgba(138, 97, 212, 0.1));
        `}
`;

export const HeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  h2 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 28px;
  }

  p {
    margin: 4px 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
  }
`;

export const IconWrap = styled.span<{ $success: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  ${({ $success, theme }) =>
    $success
      ? css`
          background: linear-gradient(120deg, ${theme.colors.success}, ${theme.colors.brandBlue});
        `
      : css`
          background: linear-gradient(120deg, ${theme.colors.brandBlue}, ${theme.colors.brandPurple});
        `}
`;

export const SectionCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 14px;
  display: grid;
  gap: 12px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 19px;
`;

export const Form = styled.form`
  display: grid;
  gap: 10px;
`;

export const Field = styled.label`
  display: grid;
  gap: 5px;

  span {
    font-size: 12px;
    font-weight: 700;
  }

  input,
  select,
  textarea {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 13px;
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }
`;

export const Counter = styled.span`
  justify-self: end;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SubmitButton = styled.button`
  border: none;
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.brandBlue};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChannelsGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ChannelCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px;
  background: linear-gradient(180deg, #fff 0%, rgba(238, 244, 255, 0.58) 100%);

  strong {
    display: block;
    font-size: 13px;
    margin-bottom: 4px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const ChannelButton = styled.button`
  margin-top: 8px;
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;
