import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const SectionCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.13) 0%, rgba(46, 127, 240, 0) 38%),
    linear-gradient(164deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.9) 100%);
  padding: 16px;
  display: grid;
  gap: 14px;
  box-shadow: 0 12px 24px rgba(28, 38, 64, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: clamp(19px, 2.4vw, 22px);
`;

export const StepsGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const StepCard = styled.article<{ $done: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 8px;
  min-height: 130px;
  box-shadow: 0 9px 16px rgba(28, 38, 64, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 22px rgba(28, 38, 64, 0.1);
  }

  ${({ $done }) =>
    $done
      ? css`
          background: rgba(23, 167, 102, 0.08);
          border-color: rgba(23, 167, 102, 0.24);
        `
      : css`
          background: rgba(46, 127, 240, 0.06);
          border-color: rgba(46, 127, 240, 0.2);
        `}

  strong {
    font-size: 13px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const StepStatus = styled.span<{ $done: boolean }>`
  justify-self: start;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  ${({ $done }) =>
    $done
      ? css`
          background: rgba(23, 167, 102, 0.12);
          color: #148655;
          border-color: rgba(23, 167, 102, 0.24);
        `
      : css`
          background: rgba(227, 154, 18, 0.12);
          color: #b57a0f;
          border-color: rgba(227, 154, 18, 0.24);
        `}
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 12px;
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
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 13px;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandBlue};
      box-shadow: 0 0 0 3px rgba(46, 127, 240, 0.16);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

export const ChipsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const ChipButton = styled.button<{ $selected: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, color 0.2s ease, background 0.2s ease;

  ${({ $selected }) =>
    $selected
      ? css`
          background: rgba(46, 127, 240, 0.12);
          color: #1f67c8;
          border-color: rgba(46, 127, 240, 0.3);
        `
      : css`
          background: rgba(255, 255, 255, 0.92);
          color: #4f5c7f;
        `}

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(46, 127, 240, 0.32);
    color: #1f67c8;
  }
`;

export const ActionsGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ActionCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 8px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.86) 100%);
  box-shadow: 0 8px 15px rgba(28, 38, 64, 0.06);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(46, 127, 240, 0.26);
  }

  strong {
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PrimaryButton = styled.button`
  border: none;
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 14px;
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.colors.brandBlue} 0%,
    ${({ theme }) => theme.colors.brandPurple} 100%
  );
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(46, 127, 240, 0.24);
  }
`;

export const SecondaryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 14px;
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const Feedback = styled.p`
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.success};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid rgba(23, 167, 102, 0.24);
  border-radius: ${({ theme }) => theme.radii.pill};
  width: fit-content;
  padding: 4px 10px;
  background: rgba(23, 167, 102, 0.1);
`;
