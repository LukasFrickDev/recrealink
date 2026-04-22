import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  --recreador-settings-accent: ${({ theme }) => theme.colors.brandBlue};
  --recreador-settings-accent-soft: rgba(46, 127, 240, 0.1);
  --recreador-settings-accent-border: rgba(46, 127, 240, 0.34);

  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const ProfileGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: minmax(230px, 270px) minmax(0, 760px);
  align-items: start;
  width: 100%;
  max-width: 1060px;
  justify-self: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
    max-width: 760px;
  }
`;

export const ProfileAside = styled.aside`
  border: 1px solid var(--recreador-settings-accent-border);
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.16), rgba(46, 127, 240, 0) 44%),
    radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.12), rgba(249, 111, 38, 0) 52%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.98), rgba(237, 245, 255, 0.92));
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-auto-flow: row;
  gap: 9px;
  justify-items: center;
  justify-self: start;
  align-self: start;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const AvatarPreview = styled.div`
  width: 92px;
  height: 92px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.44);
  background: linear-gradient(150deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
  font-size: 32px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 20px rgba(28, 38, 64, 0.18);
`;

export const ProfileName = styled.strong`
  font-size: ${({ theme }) => theme.typography.cardTitle};
  line-height: 1.2;
`;

export const ProfileRole = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const OutlineButton = styled.button`
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid var(--recreador-settings-accent-border);
  background: #fff;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  padding: 0 12px;
  cursor: pointer;
  width: 100%;
  max-width: 220px;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: var(--recreador-settings-accent-soft);
    border-color: var(--recreador-settings-accent-border);
    transform: translateY(-1px);
  }
`;

export const ProfileForm = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelElevated};
  padding: ${({ theme }) => theme.spacing.sm};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  width: 100%;
  max-width: 760px;
  justify-self: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
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
  textarea {
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px;
    font-size: ${({ theme }) => theme.typography.bodySm};
    font-family: ${({ theme }) => theme.fonts.body};
    background: rgba(255, 255, 255, 0.96);
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--recreador-settings-accent-border);
      box-shadow: 0 0 0 4px var(--recreador-settings-accent-soft);
    }
  }

  textarea {
    min-height: 82px;
    resize: vertical;
  }
`;

export const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.button<{ $selected: boolean }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  min-height: 30px;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  ${({ $selected }) =>
    $selected
      ? css`
          border-color: var(--recreador-settings-accent-border);
          background: var(--recreador-settings-accent-soft);
          color: var(--recreador-settings-accent);
        `
      : null}

  &:hover {
    border-color: var(--recreador-settings-accent-border);
    transform: translateY(-1px);
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const PrimaryButton = styled.button`
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid rgba(255, 255, 255, 0.34);
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(28, 38, 64, 0.18);
  }
`;
