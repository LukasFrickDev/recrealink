import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  --checklist-accent: ${({ theme }) => theme.colors.brandBlue};
  --checklist-accent-soft: rgba(46, 127, 240, 0.12);
  --checklist-accent-border: rgba(46, 127, 240, 0.34);
  --checklist-success-soft: rgba(23, 167, 102, 0.12);
  --checklist-success-border: rgba(23, 167, 102, 0.32);

  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ProgressCard = styled.article`
  border: 1px solid var(--checklist-accent-border);
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.16), rgba(46, 127, 240, 0) 44%),
    radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.12), rgba(249, 111, 38, 0) 50%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.98), rgba(237, 245, 255, 0.92));
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
  }
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.cardTitle};
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  span {
    min-height: 28px;
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid var(--checklist-accent-border);
    background: var(--checklist-accent-soft);
    padding: 0 10px;
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 800;
    color: var(--checklist-accent);
    display: inline-flex;
    align-items: center;
    letter-spacing: 0.02em;
  }
`;

export const ProgressBar = styled.div`
  height: 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(46, 127, 240, 0.12);
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(46, 127, 240, 0.96) 0%, rgba(249, 111, 38, 0.9) 100%);
    transition: width 0.2s ease;
  }
`;

export const EditorCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelElevated};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.cardTitle};
  }
`;

export const EditorGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const EditorField = styled.label`
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
    background: rgba(255, 255, 255, 0.96);
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.bodySm};
    font-family: ${({ theme }) => theme.fonts.body};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--checklist-accent-border);
      box-shadow: 0 0 0 4px var(--checklist-accent-soft);
    }
  }

  textarea {
    min-height: 88px;
    resize: vertical;
  }
`;

export const EditorActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ListCard = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelElevated};
  padding: ${({ theme }) => theme.spacing.sm};
  display: grid;
  gap: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const EmptyState = styled.p`
  margin: 0;
  border: 1px dashed var(--checklist-accent-border);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const ItemRow = styled.article<{ $done?: boolean }>`
  border: 1px solid ${({ theme, $done }) => ($done ? "var(--checklist-success-border)" : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $done }) => ($done ? "var(--checklist-success-soft)" : "rgba(255, 255, 255, 0.96)")};
  padding: 10px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 10px;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ $done }) => ($done ? "var(--checklist-success-border)" : "var(--checklist-accent-border)")};
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: auto minmax(0, 1fr);
  }
`;

export const CheckButton = styled.button<{ $done?: boolean }>`
  border: 1px solid
    ${({ theme, $done }) => ($done ? "var(--checklist-success-border)" : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $done }) => ($done ? "var(--checklist-success-soft)" : "#fff")};
  color: ${({ theme, $done }) => ($done ? theme.colors.success : theme.colors.textMuted)};
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ $done }) => ($done ? "var(--checklist-success-border)" : "var(--checklist-accent-border)")};
    color: ${({ theme, $done }) => ($done ? theme.colors.success : theme.colors.brandBlue)};
  }
`;

export const ItemContent = styled.div`
  display: grid;
  gap: 3px;

  strong {
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.35;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const StatusBadge = styled.span<{ $done?: boolean }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 4px 10px;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ theme, $done }) => ($done ? theme.colors.success : theme.colors.textMuted)};
  background: ${({ $done }) => ($done ? "var(--checklist-success-soft)" : "rgba(101, 112, 138, 0.12)")};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
    justify-self: start;
  }
`;

export const ItemActions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
  }
`;

export const IconButton = styled.button<{ $tone?: "neutral" | "danger" }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $tone }) => ($tone === "danger" ? "rgba(220, 38, 38, 0.35)" : theme.colors.border)};
  background: ${({ $tone }) => ($tone === "danger" ? "rgba(220, 38, 38, 0.1)" : "#fff")};
  color: ${({ theme, $tone }) => ($tone === "danger" ? "#b91c1c" : theme.colors.text)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    ${({ $tone }) =>
      $tone === "danger"
        ? css`
            border-color: rgba(220, 38, 38, 0.5);
          `
        : css`
            border-color: var(--checklist-accent-border);
            color: var(--checklist-accent);
          `}
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const ReviewCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(244, 249, 255, 0.9));
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.cardTitle};
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  ul {
    margin: 0;
    padding-left: 16px;
    display: grid;
    gap: 6px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
  }
`;

export const FooterActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const ActionButton = styled.button<{ $tone?: "default" | "neutral" }>`
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  padding: 0 12px;
  border: 1px solid
    ${({ theme, $tone }) => ($tone === "neutral" ? theme.colors.border : "var(--checklist-accent-border)")};
  background: ${({ $tone }) => ($tone === "neutral" ? "#fff" : "var(--checklist-accent-soft)")};
  color: ${({ theme, $tone }) => ($tone === "neutral" ? theme.colors.text : theme.colors.brandBlue)};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--checklist-accent-border);
    transform: translateY(-1px);
  }
`;

export const SaveButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
  width: fit-content;
  padding: 0 14px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(28, 38, 64, 0.18);
  }
`;
