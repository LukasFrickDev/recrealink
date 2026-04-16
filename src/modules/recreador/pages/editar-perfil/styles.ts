import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 16px;
`;

export const Banner = styled.section`
  border: 1px solid rgba(46, 127, 240, 0.24);
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(227, 118, 239, 0.14) 0%, rgba(227, 118, 239, 0) 44%),
    linear-gradient(135deg, rgba(46, 127, 240, 0.1), rgba(138, 97, 212, 0.08));
  padding: 16px;
  display: grid;
  gap: 6px;

  h2 {
    margin: 0;
    font-size: 22px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 68ch;
  }
`;

export const VisualNote = styled.span`
  justify-self: start;
  border: 1px solid rgba(249, 111, 38, 0.25);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(249, 111, 38, 0.1);
  color: ${({ theme }) => theme.colors.brandOrange};
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
`;

export const TwoColumn = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 0.72fr 1.28fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Card = styled.section`
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

export const AvatarPanel = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
`;

export const AvatarPreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background: linear-gradient(150deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandPurple});
  color: #fff;
  font-size: 38px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarHint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  text-align: center;
  line-height: 1.45;
`;

export const Button = styled.button<{ $primary?: boolean; $full?: boolean }>`
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 12px;
  font-weight: 700;
  padding: 0 12px;
  cursor: pointer;
  width: ${({ $full }) => ($full ? "100%" : "auto")};

  ${({ $primary, theme }) =>
    $primary
      ? css`
          border: none;
          background: ${theme.colors.brandBlue};
          color: #fff;
        `
      : css`
          border: 1px solid ${theme.colors.border};
          background: #fff;
          color: ${theme.colors.text};
        `}
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 10px;
`;

export const InputRow = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

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
  }

  textarea {
    min-height: 90px;
    resize: vertical;
  }
`;

export const SpecialtyGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const SpecialtyChip = styled.button<{ $selected: boolean }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;

  ${({ $selected }) =>
    $selected
      ? css`
          border-color: rgba(46, 127, 240, 0.32);
          background: rgba(46, 127, 240, 0.1);
          color: #1f67c8;
        `
      : css`
          background: #fff;
          color: #4f5c7f;
        `}
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Feedback = styled.p<{ $success?: boolean }>`
  margin: 0;
  font-size: 12px;
  font-weight: 700;

  ${({ $success, theme }) =>
    $success
      ? css`
          color: ${theme.colors.success};
        `
      : css`
          color: ${theme.colors.brandOrange};
        `}
`;
