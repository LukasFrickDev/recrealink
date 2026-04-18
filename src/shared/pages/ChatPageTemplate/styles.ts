import styled, { css } from "styled-components";

export const Wrapper = styled.section<{ $tone: "default" | "hotelaria" | "pais" | "recreador" }>`
  --chat-accent: ${({ $tone, theme }) => {
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
  --chat-accent-strong: ${({ $tone, theme }) => {
    if ($tone === "hotelaria") {
      return "#cf6727";
    }

    if ($tone === "pais") {
      return "#cf556a";
    }

    if ($tone === "recreador") {
      return theme.colors.brandOrange;
    }

    return "#4f76b4";
  }};
  --chat-accent-soft: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.12)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.12)";
    }

    if ($tone === "recreador") {
      return "rgba(46, 127, 240, 0.12)";
    }

    return "rgba(46, 127, 240, 0.12)";
  }};
  --chat-accent-soft-strong: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.16)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.16)";
    }

    if ($tone === "recreador") {
      return "rgba(46, 127, 240, 0.18)";
    }

    return "rgba(46, 127, 240, 0.14)";
  }};
  --chat-accent-border: ${({ $tone }) => {
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

  display: grid;
  gap: 14px;

  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--chat-accent);
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

export const ChatGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: minmax(280px, 0.7fr) minmax(0, 1.3fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
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
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const PanelHeader = styled.header`
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

export const SearchInput = styled.input`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.bodySm};
  background: rgba(255, 255, 255, 0.92);

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: var(--chat-accent-border);
    box-shadow: 0 0 0 4px var(--chat-accent-soft);
  }
`;

export const ConversationList = styled.div`
  display: grid;
  gap: 8px;
  max-height: min(460px, 52dvh);
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(101, 112, 138, 0.28);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-height: min(300px, 46dvh);
  }
`;

export const ConversationItem = styled.button<{ $active: boolean }>`
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.94);
  text-align: left;
  padding: 11px;
  cursor: pointer;
  display: grid;
  gap: 6px;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  ${({ $active }) =>
    $active
      ? css`
          border-color: var(--chat-accent-border);
          background: var(--chat-accent-soft);
          box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);
        `
      : null}

  &:hover:not(:disabled) {
    border-color: var(--chat-accent-border);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--chat-accent);
    outline-offset: 2px;
  }
`;

export const ConversationTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    flex-shrink: 0;
  }
`;

export const ConversationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Dot = styled.i<{ $online?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ $online }) => ($online ? "#17a766" : "#c6cfdf")};
`;

export const ConversationDetail = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LastMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const UnreadBadge = styled.span`
  justify-self: start;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: var(--chat-accent-soft-strong);
  color: var(--chat-accent);
  font-size: 10px;
  font-weight: 800;
  padding: 4px 8px;
`;

export const ChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: ${({ theme }) => theme.borders.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    gap: 6px;
  }
`;

export const ChatContact = styled.div`
  display: grid;
  gap: 2px;

  strong {
    font-size: ${({ theme }) => theme.typography.cardTitle};
  }

  span {
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const MessageList = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    radial-gradient(circle at 100% 0%, var(--chat-accent-soft) 0%, rgba(255, 255, 255, 0) 35%),
    #fff;
  padding: ${({ theme }) => theme.spacing.sm};
  display: grid;
  gap: 9px;
  min-height: 260px;
  max-height: min(460px, 56dvh);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(101, 112, 138, 0.24);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 220px;
    max-height: min(340px, 42dvh);
    padding: 10px;
  }
`;

export const EmptyMessages = styled.p`
  margin: 0;
  align-self: center;
  justify-self: center;
  max-width: 44ch;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MessageBubble = styled.article<{ $mine: boolean }>`
  max-width: 82%;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 9px 11px;
  display: grid;
  gap: 4px;
  justify-self: ${({ $mine }) => ($mine ? "end" : "start")};
  box-shadow: 0 5px 12px rgba(28, 38, 64, 0.08);

  ${({ $mine }) =>
    $mine
      ? css`
          background: var(--chat-accent-soft);
          border: 1px solid var(--chat-accent-border);
        `
      : css`
          background: ${({ theme }) => theme.surfaces.panelSoft};
          border: ${({ theme }) => theme.borders.subtle};
        `}

  strong {
    font-size: ${({ theme }) => theme.typography.meta};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
  }

  span {
    font-size: ${({ theme }) => theme.typography.micro};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 92%;

    p {
      font-size: 12px;
      line-height: 1.45;
    }
  }
`;

export const QuickReplyRow = styled.div`
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

export const QuickReplyButton = styled.button`
  min-height: 30px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--chat-accent-border);
    color: var(--chat-accent);
    transform: translateY(-1px);
  }
`;

export const ComposeRow = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ComposeInput = styled.input`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.bodySm};
  background: rgba(255, 255, 255, 0.94);

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: var(--chat-accent-border);
    box-shadow: 0 0 0 4px var(--chat-accent-soft);
  }
`;

export const SendButton = styled.button`
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: linear-gradient(120deg, var(--chat-accent), var(--chat-accent-strong));
  color: #fff;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  padding: 0 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(28, 38, 64, 0.18);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

export const EmptyPanel = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(246, 250, 255, 0.9) 0%, #fff 100%);
  min-height: 280px;
  display: grid;
  place-items: center;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
`;
