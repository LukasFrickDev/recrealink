import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  --support-accent: ${({ theme }) => theme.colors.brandBlue};
  --support-accent-soft: rgba(46, 127, 240, 0.12);
  --support-accent-border: rgba(46, 127, 240, 0.34);
  --support-success-border: rgba(23, 167, 102, 0.34);
  --support-success-soft: rgba(23, 167, 102, 0.12);

  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const HeaderCard = styled.section<{ $success: boolean }>`
  border: 1px solid ${({ $success }) => ($success ? "var(--support-success-border)" : "var(--support-accent-border)")};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  ${({ $success }) =>
    $success
      ? css`
          background:
            radial-gradient(circle at 100% 0%, rgba(23, 167, 102, 0.2), rgba(23, 167, 102, 0) 46%),
            linear-gradient(152deg, rgba(255, 255, 255, 0.98), rgba(238, 252, 245, 0.92));
        `
      : css`
          background:
            radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.18), rgba(46, 127, 240, 0) 44%),
            radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.12), rgba(249, 111, 38, 0) 52%),
            linear-gradient(152deg, rgba(255, 255, 255, 0.98), rgba(237, 245, 255, 0.92));
        `}
`;

export const HeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center;
  }

  h2 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.typography.sectionTitle};
    line-height: 1.2;
  }

  p {
    margin: 5px 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.5;
    max-width: 62ch;
  }
`;

export const IconWrap = styled.span<{ $success: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;

  ${({ $success, theme }) =>
    $success
      ? css`
          background: linear-gradient(120deg, ${theme.colors.success}, ${theme.colors.brandBlue});
        `
      : css`
          background: linear-gradient(120deg, ${theme.colors.brandBlue}, ${theme.colors.brandOrange});
        `}
`;

export const SectionCard = styled.section`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surfaces.panelElevated};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.typography.cardTitle};
`;

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Field = styled.label`
  display: grid;
  gap: 6px;

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  input,
  select,
  textarea {
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255, 255, 255, 0.96);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--support-accent-border);
      box-shadow: 0 0 0 4px var(--support-accent-soft);
    }
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }
`;

export const Counter = styled.span`
  justify-self: end;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SubmitButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.34);
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 14px;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  cursor: pointer;
  width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(28, 38, 64, 0.18);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ChannelsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ChannelCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 11px;
  background: linear-gradient(175deg, rgba(255, 255, 255, 0.98), rgba(238, 245, 255, 0.9));
  display: grid;
  gap: 4px;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--support-accent-border);
    transform: translateY(-1px);
  }

  strong {
    display: block;
    font-size: ${({ theme }) => theme.typography.label};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const ChannelButton = styled.button`
  margin-top: 8px;
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid var(--support-accent-border);
  background: #fff;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: var(--support-accent-border);
    background: var(--support-accent-soft);
    transform: translateY(-1px);
  }
`;

export const KnowledgeGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const KnowledgeItem = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  background: linear-gradient(175deg, rgba(255, 255, 255, 0.98), rgba(238, 245, 255, 0.9));
  display: grid;
  gap: 4px;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--support-accent-border);
    transform: translateY(-1px);
  }

  strong {
    display: block;
    font-size: ${({ theme }) => theme.typography.label};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;
