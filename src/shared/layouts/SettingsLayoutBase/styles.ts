import styled, { css } from "styled-components";

export const Wrapper = styled.section<{ $tone: "default" | "hotelaria" | "pais" }>`
  --settings-accent: ${({ $tone, theme }) => {
    if ($tone === "hotelaria") {
      return theme.colors.brandOrange;
    }

    if ($tone === "pais") {
      return theme.colors.brandRose;
    }

    return theme.colors.brandBlue;
  }};
  --settings-accent-soft: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.08)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.08)";
    }

    return "rgba(46, 127, 240, 0.08)";
  }};
  --settings-accent-border: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.35)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.35)";
    }

    return "rgba(46, 127, 240, 0.35)";
  }};
  --settings-action-border: ${({ $tone }) =>
    $tone === "pais" ? "rgba(225, 105, 124, 0.35)" : "rgba(249, 111, 38, 0.35)"};
  --settings-action-bg: ${({ $tone }) =>
    $tone === "pais" ? "rgba(225, 105, 124, 0.08)" : "rgba(249, 111, 38, 0.08)"};
  --settings-action-bg-hover: ${({ $tone }) =>
    $tone === "pais" ? "rgba(225, 105, 124, 0.14)" : "rgba(249, 111, 38, 0.14)"};
  --settings-action-color: ${({ $tone, theme }) =>
    $tone === "pais" ? theme.colors.brandRose : theme.colors.brandOrange};
  --settings-warning-border: ${({ $tone }) =>
    $tone === "pais" ? "rgba(225, 105, 124, 0.36)" : "rgba(249, 111, 38, 0.36)"};
  --settings-warning-bg: ${({ $tone }) =>
    $tone === "pais" ? "rgba(225, 105, 124, 0.1)" : "rgba(249, 111, 38, 0.1)"};
  --settings-warning-color: ${({ $tone }) => ($tone === "pais" ? "#b9495b" : "#b8651d")};

  display: grid;
  gap: 10px;
`;

export const BodyLayout = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Sidebar = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.9);
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    position: sticky;
    top: 94px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    overflow-x: auto;
    padding: 8px;
    gap: 8px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 999px;
      background: rgba(101, 112, 138, 0.24);
    }
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  cursor: pointer;
  display: grid;
  gap: 4px;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    line-height: 1.2;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.4;
  }

  ${({ $active }) =>
    $active
      ? css`
          border-color: var(--settings-accent-border);
          background: var(--settings-accent-soft);
          box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);
        `
      : null}

  &:hover {
    border-color: var(--settings-accent-border);
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: min(240px, 78vw);
    padding: 10px;

    span {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

export const Content = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelElevated};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 320px;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    min-height: 0;
  }
`;
