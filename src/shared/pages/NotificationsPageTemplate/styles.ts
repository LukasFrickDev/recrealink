import styled, { css } from "styled-components";

export const Wrapper = styled.section<{ $tone: "default" | "hotelaria" | "pais" | "recreador" }>`
  --notifications-accent: ${({ $tone, theme }) => {
    if ($tone === "hotelaria") {
      return theme.colors.brandOrange;
    }

    if ($tone === "pais") {
      return theme.colors.brandRose;
    }

    if ($tone === "recreador") {
      return theme.colors.brandBlue;
    }

    return theme.colors.brandBlue;
  }};
  --notifications-accent-border: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.34)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.34)";
    }

    if ($tone === "recreador") {
      return "rgba(46, 127, 240, 0.38)";
    }

    return "rgba(46, 127, 240, 0.34)";
  }};
  --notifications-accent-soft: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.1)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.1)";
    }

    if ($tone === "recreador") {
      return "rgba(46, 127, 240, 0.12)";
    }

    return "rgba(46, 127, 240, 0.1)";
  }};
  --notifications-accent-soft-light: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.06)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.06)";
    }

    if ($tone === "recreador") {
      return "rgba(46, 127, 240, 0.08)";
    }

    return "rgba(46, 127, 240, 0.06)";
  }};
  --notifications-accent-color: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "#c35a1f";
    }

    if ($tone === "pais") {
      return "#c85063";
    }

    if ($tone === "recreador") {
      return "#1f67c8";
    }

    return "#1f67c8";
  }};
  --notifications-message-bg: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.12)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.14)";
    }

    if ($tone === "recreador") {
      return "rgba(46, 127, 240, 0.12)";
    }

    return "rgba(100, 116, 139, 0.12)";
  }};
  --notifications-message-color: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "#c35a1f";
    }

    if ($tone === "pais") {
      return "#c85063";
    }

    if ($tone === "recreador") {
      return "#1f67c8";
    }

    return "#4e5f7a";
  }};
  --notifications-community-bg: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(46, 127, 240, 0.12)";
    }

    if ($tone === "pais") {
      return "rgba(199, 90, 110, 0.14)";
    }

    if ($tone === "recreador") {
      return "rgba(249, 111, 38, 0.14)";
    }

    return "rgba(46, 127, 240, 0.12)";
  }};
  --notifications-community-color: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "#1f67c8";
    }

    if ($tone === "pais") {
      return "#bd4e64";
    }

    if ($tone === "recreador") {
      return "#c35a1f";
    }

    return "#1f67c8";
  }};

  display: grid;
  gap: 16px;

  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--notifications-accent);
    outline-offset: 2px;
  }

  button:disabled,
  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.64;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Panel = styled.section`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surfaces.panelElevated};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PanelHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Heading = styled.div`
  display: grid;
  gap: 5px;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.sectionTitle};
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.5;
  }
`;

export const ActionButton = styled.button`
  min-height: 32px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--notifications-accent-border);
    color: var(--notifications-accent-color);
    transform: translateY(-1px);
  }
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 2px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 999px;
      background: rgba(101, 112, 138, 0.24);
    }
  }
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  min-height: 30px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;

  ${({ $active }) =>
    $active
      ? css`
          border-color: var(--notifications-accent-border);
          background: var(--notifications-accent-soft);
          color: var(--notifications-accent-color);
        `
      : null}

  &:hover:not(:disabled) {
    border-color: var(--notifications-accent-border);
  }
`;

export const SearchInput = styled.input`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.bodySm};
  background: rgba(255, 255, 255, 0.92);

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: var(--notifications-accent-border);
    box-shadow: 0 0 0 4px var(--notifications-accent-soft);
  }
`;

export const NotificationList = styled.div`
  display: grid;
  gap: 9px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const NotificationCard = styled.article<{ $read: boolean }>`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: border-color 0.2s ease, transform 0.2s ease;
  min-height: 152px;

  ${({ $read }) =>
    !$read
      ? css`
          border-color: var(--notifications-accent-border);
          background: var(--notifications-accent-soft-light);
          box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);
        `
      : null}

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: auto;
  }
`;

export const NotificationTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    min-width: 0;
    line-height: 1.35;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    flex-shrink: 0;
  }
`;

export const NotificationTypeTag = styled.span<{ $type: string }>`
  justify-self: start;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 4px 8px;
  background: ${({ $type }) => {
    if ($type === "oportunidade") return "var(--notifications-accent-soft)";
    if ($type === "mensagem") return "var(--notifications-message-bg)";
    if ($type === "comunidade") return "var(--notifications-community-bg)";
    if ($type === "urgente") return "rgba(211, 77, 98, 0.14)";
    if ($type === "importante") return "rgba(249, 111, 38, 0.14)";
    if ($type === "informativa") return "var(--notifications-accent-soft)";

    return "rgba(101, 112, 138, 0.14)";
  }};
  color: ${({ $type }) => {
    if ($type === "oportunidade") return "var(--notifications-accent-color)";
    if ($type === "mensagem") return "var(--notifications-message-color)";
    if ($type === "comunidade") return "var(--notifications-community-color)";
    if ($type === "urgente") return "#c54559";
    if ($type === "importante") return "#c35a1f";
    if ($type === "informativa") return "var(--notifications-accent-color)";

    return "#55607a";
  }};
`;

export const NotificationDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > button {
      flex: 1;
      justify-content: center;
    }
  }
`;

export const MiniButton = styled.button`
  min-height: 28px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  padding: 0 9px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--notifications-accent-border);
    color: var(--notifications-accent-color);
  }
`;

export const EmptyState = styled.div`
  border: 1px dashed var(--notifications-accent-border);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, var(--notifications-accent-soft-light) 0%, rgba(255, 255, 255, 0.96) 100%);
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
  text-align: center;
`;
