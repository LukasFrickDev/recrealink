import styled, { css } from "styled-components";

export const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  align-content: start;
`;

export const PreferenceList = styled.div`
  display: grid;
  gap: 9px;
`;

export const PreferenceItem = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.92);
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const PreferenceText = styled.div`
  display: grid;
  gap: 2px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SwitchButton = styled.button<{ $active: boolean }>`
  width: 48px;
  height: 26px;
  border-radius: 999px;
  border: none;
  padding: 3px;
  background: ${({ $active }) => ($active ? "var(--settings-accent)" : "#d8deea")};
  cursor: pointer;
  display: inline-flex;
  transition: background 0.2s ease;

  i {
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background: #fff;
    transform: translateX(${({ $active }) => ($active ? "22px" : "0")});
    transition: transform 0.2s ease;
  }
`;

export const UserList = styled.div`
  display: grid;
  gap: 9px;
`;

export const UserItem = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.92);
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  display: grid;
  gap: 7px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const UserTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }
`;

export const UserMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const StatusTag = styled.span<{ $active: boolean }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${({ $active }) => ($active ? "rgba(23, 167, 102, 0.14)" : "rgba(176, 71, 84, 0.12)")};
  color: ${({ $active, theme }) => ($active ? theme.colors.success : theme.colors.danger)};
`;

export const OutlineButton = styled.button`
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--settings-accent-border);
    color: var(--settings-accent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
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
  gap: 6px;

  span {
    font-size: ${({ theme }) => theme.typography.bodySm};
    font-weight: 700;
  }

  input {
    border: ${({ theme }) => theme.borders.subtle};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px;
    font-size: ${({ theme }) => theme.typography.bodySm};
    font-family: ${({ theme }) => theme.fonts.body};
    background: rgba(255, 255, 255, 0.94);

    &:focus {
      outline: none;
      border-color: var(--settings-accent-border);
      box-shadow: 0 0 0 4px var(--settings-accent-soft);
    }
  }
`;

export const SecurityTips = styled.ul`
  margin: 0;
  padding: 0 0 0 16px;
  display: grid;
  gap: 5px;

  li {
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
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
  border: none;
  background: linear-gradient(120deg, var(--settings-accent), rgba(138, 97, 212, 0.88));
  color: #fff;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(28, 38, 64, 0.16);
  }
`;

export const Feedback = styled.p<{ $success?: boolean }>`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  color: ${({ $success, theme }) => ($success ? theme.colors.success : theme.colors.brandOrange)};
`;

export const RestrictedNotice = styled.p`
  margin: 0;
  border: 1px solid var(--settings-warning-border, rgba(249, 111, 38, 0.35));
  border-radius: ${({ theme }) => theme.radii.md};
  background: var(--settings-warning-bg, rgba(249, 111, 38, 0.1));
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 10px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.45;
`;

export const DataList = styled.div`
  display: grid;
  gap: 9px;
`;

export const DataItem = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.9);
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  > div {
    display: grid;
    gap: 2px;
    flex: 1;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 6px;
  }
`;

export const DataInput = styled.input`
  min-height: 32px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 10px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  text-align: right;
  width: min(280px, 100%);
  color: ${({ theme }) => theme.colors.text};
  background: rgba(255, 255, 255, 0.96);

  &:focus {
    outline: none;
    border-color: var(--settings-accent-border);
    box-shadow: 0 0 0 4px var(--settings-accent-soft);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surfaceSoft};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    text-align: left;
  }
`;

export const DataTopBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  min-height: 34px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;

export const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;

    > button {
      flex: 1;
      justify-content: center;
    }
  }
`;

export const HeaderPrimaryAction = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid var(--settings-action-border, rgba(249, 111, 38, 0.35));
  background: var(--settings-action-bg, rgba(249, 111, 38, 0.08));
  color: var(--settings-action-color, ${({ theme }) => theme.colors.brandOrange});
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--settings-action-bg-hover, rgba(249, 111, 38, 0.14));
    transform: translateY(-1px);
  }
`;

export const HeaderSecondaryAction = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--settings-accent);
    color: var(--settings-accent);
  }
`;

export const HeaderBadge = styled.span<{ $tone: "warning" | "neutral" }>`
  min-height: 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;

  ${({ $tone }) =>
    $tone === "warning"
      ? css`
          border: 1px solid var(--settings-warning-border, rgba(249, 111, 38, 0.36));
          background: var(--settings-warning-bg, rgba(249, 111, 38, 0.1));
          color: var(--settings-warning-color, #b8651d);
        `
      : css`
          border: 1px solid rgba(101, 112, 138, 0.3);
          background: rgba(101, 112, 138, 0.1);
          color: #566178;
        `}
`;
