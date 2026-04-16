import styled, { css } from "styled-components";

export const Wrapper = styled.section<{ $tone: "default" | "hotelaria" | "pais" }>`
  --notifications-accent: ${({ $tone, theme }) => {
    if ($tone === "hotelaria") {
      return theme.colors.brandOrange;
    }

    if ($tone === "pais") {
      return theme.colors.brandRose;
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

    return "rgba(46, 127, 240, 0.34)";
  }};
  --notifications-accent-soft: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.1)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.1)";
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

    return "rgba(46, 127, 240, 0.06)";
  }};
  --notifications-accent-color: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "#c35a1f";
    }

    if ($tone === "pais") {
      return "#c85063";
    }

    return "#1f67c8";
  }};

  display: grid;
  gap: 16px;
`;

export const Panel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 255, 0.9) 100%);
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: 0 12px 24px rgba(28, 38, 64, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px;
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
    font-size: 19px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
    line-height: 1.45;
  }
`;

export const ActionButton = styled.button`
  min-height: 32px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.text};
  font-size: 11px;
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.text};
  font-size: 11px;
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

  &:hover {
    border-color: var(--notifications-accent-border);
  }
`;

export const SearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 11px;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.92);

  &:focus {
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: 11px 12px;
  display: grid;
  gap: 7px;
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
    font-size: 13px;
    min-width: 0;
    line-height: 1.35;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    flex-shrink: 0;
  }
`;

export const NotificationTypeTag = styled.span<{ $type: string }>`
  justify-self: start;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 4px 8px;
  background: ${({ $type }) => {
    if ($type === "oportunidade") return "var(--notifications-accent-soft)";
    if ($type === "mensagem") return "rgba(138, 97, 212, 0.12)";
    if ($type === "comunidade") return "rgba(227, 118, 239, 0.14)";
    if ($type === "urgente") return "rgba(211, 77, 98, 0.14)";
    if ($type === "importante") return "rgba(249, 111, 38, 0.14)";
    if ($type === "informativa") return "var(--notifications-accent-soft)";

    return "rgba(101, 112, 138, 0.14)";
  }};
  color: ${({ $type }) => {
    if ($type === "oportunidade") return "var(--notifications-accent-color)";
    if ($type === "mensagem") return "#6e49b8";
    if ($type === "comunidade") return "#a13cb4";
    if ($type === "urgente") return "#c54559";
    if ($type === "importante") return "#c35a1f";
    if ($type === "informativa") return "var(--notifications-accent-color)";

    return "#55607a";
  }};
`;

export const NotificationDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1.45;
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text};
  font-size: 11px;
  font-weight: 700;
  padding: 0 9px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--notifications-accent-border);
    color: var(--notifications-accent-color);
  }
`;

export const EmptyState = styled.div`
  border: 1px dashed var(--notifications-accent-border);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, var(--notifications-accent-soft-light) 0%, rgba(255, 255, 255, 0.96) 100%);
  padding: 18px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  text-align: center;
`;
