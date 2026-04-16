import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const SectionCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 0% 0%, rgba(46, 127, 240, 0.14) 0%, rgba(46, 127, 240, 0) 36%),
    linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.9) 100%);
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

export const BoardList = styled.div`
  display: grid;
  gap: 10px;
`;

export const BoardCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.9) 100%);
  padding: 12px;
  display: grid;
  gap: 10px;
  box-shadow: 0 9px 16px rgba(28, 38, 64, 0.07);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(46, 127, 240, 0.3);
  }
`;

export const BoardTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;

  strong {
    font-size: 15px;
    display: block;
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Badge = styled.span<{ $tone: "blue" | "orange" | "green" | "neutral" }>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 800;

  ${({ $tone }) => {
    if ($tone === "blue") {
      return css`
        background: rgba(46, 127, 240, 0.1);
        border-color: rgba(46, 127, 240, 0.24);
        color: #1f67c8;
      `;
    }

    if ($tone === "orange") {
      return css`
        background: rgba(249, 111, 38, 0.12);
        border-color: rgba(249, 111, 38, 0.24);
        color: #ca5617;
      `;
    }

    if ($tone === "green") {
      return css`
        background: rgba(23, 167, 102, 0.1);
        border-color: rgba(23, 167, 102, 0.24);
        color: #148655;
      `;
    }

    return css`
      background: rgba(91, 104, 136, 0.1);
      border-color: rgba(91, 104, 136, 0.22);
      color: #4f5c7f;
    `;
  }}
`;

export const TasksList = styled.div`
  display: grid;
  gap: 8px;
`;

export const TaskItem = styled.label`
  border: 1px solid rgba(46, 127, 240, 0.16);
  border-radius: ${({ theme }) => theme.radii.sm};
  background: rgba(255, 255, 255, 0.82);
  padding: 9px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(46, 127, 240, 0.28);
    background: rgba(238, 244, 255, 0.7);
  }

  input {
    margin: 0;
    accent-color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const TaskText = styled.span<{ $done: boolean }>`
  font-size: 12px;
  color: ${({ theme, $done }) => ($done ? theme.colors.textMuted : theme.colors.text)};
  text-decoration: ${({ $done }) => ($done ? "line-through" : "none")};
`;

export const ModelsGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ModelCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(168deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.86) 100%);
  padding: 12px;
  display: grid;
  gap: 8px;
  box-shadow: 0 8px 15px rgba(28, 38, 64, 0.06);

  strong {
    font-size: 13px;
  }
`;

export const ModelList = styled.ul`
  margin: 0;
  padding-left: 16px;
  display: grid;
  gap: 5px;

  li {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
    line-height: 1.35;
  }
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease,
    background 0.2s ease;

  ${({ $primary, theme }) =>
    $primary
      ? css`
          border: none;
          background: linear-gradient(
            120deg,
            ${theme.colors.brandBlue} 0%,
            ${theme.colors.brandPurple} 100%
          );
          color: #fff;

          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 18px rgba(46, 127, 240, 0.24);
          }
        `
      : css`
          border: 1px solid ${theme.colors.border};
          background: rgba(255, 255, 255, 0.92);
          color: ${theme.colors.textMuted};

          &:hover {
            border-color: ${theme.colors.brandBlue};
            color: ${theme.colors.brandBlue};
            transform: translateY(-1px);
          }
        `}
`;

export const AddRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;

  input {
    min-height: 38px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 0 10px;
    font-size: 13px;
    font-family: ${({ theme }) => theme.fonts.body};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandBlue};
      box-shadow: 0 0 0 3px rgba(46, 127, 240, 0.16);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Feedback = styled.p`
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brandBlue};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid rgba(46, 127, 240, 0.24);
  border-radius: ${({ theme }) => theme.radii.pill};
  width: fit-content;
  padding: 4px 10px;
  background: rgba(46, 127, 240, 0.1);
`;
