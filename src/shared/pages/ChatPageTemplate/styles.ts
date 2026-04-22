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
  gap: 12px;

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
  gap: 12px;
  grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Panel = styled.section`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 120% 0%, var(--chat-accent-soft) 0%, rgba(255, 255, 255, 0) 32%),
    ${({ theme }) => theme.surfaces.panelElevated};
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
  gap: 4px;

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

export const SearchField = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 10px;
  min-height: 38px;
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.textMuted};

  &:focus-within {
    border-color: var(--chat-accent-border);
    box-shadow: 0 0 0 4px var(--chat-accent-soft);
  }
`;

export const SearchInput = styled.input`
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  background: transparent;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const presenceColorByStatus = {
  online: "#17a766",
  away: "#e39a12",
  busy: "#d1495b",
  offline: "#a5b1c7",
} as const;

export const Dot = styled.i<{ $presence: "online" | "away" | "busy" | "offline" }>`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: ${({ $presence }) => presenceColorByStatus[$presence]};
  display: inline-flex;
  flex-shrink: 0;
`;

export const ConversationList = styled.div`
  display: grid;
  gap: 7px;
  max-height: min(560px, 68dvh);
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
  padding: 10px;
  cursor: pointer;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 8px;
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

export const ConversationIdentity = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  min-width: 0;
`;

export const AvatarWrap = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;

  ${Dot} {
    position: absolute;
    right: -1px;
    bottom: -1px;
    box-shadow: 0 0 0 2px #fff;
  }
`;

export const ConversationBody = styled.div`
  display: grid;
  gap: 3px;
  min-width: 0;
`;

export const ConversationTop = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

`;

export const ConversationMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 5px;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};

  span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const PresenceLabel = styled.span<{ $presence: "online" | "away" | "busy" | "offline" }>`
  padding: 0;
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
  color: ${({ $presence }) => presenceColorByStatus[$presence]};
`;

export const ConversationDetail = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.35;
`;

export const LastMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ConversationSide = styled.div`
  display: grid;
  justify-items: end;
  gap: 5px;

  > span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const UnreadBadge = styled.span`
  color: var(--chat-accent);
  font-size: 14px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

export const MobileBackButton = styled.button`
  min-height: 32px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    border-color: var(--chat-accent-border);
    color: var(--chat-accent);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const ChatContact = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;

  strong {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ChatTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
`;

export const ChatHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ChatMetaPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 4px 9px;
  font-size: ${({ theme }) => theme.typography.meta};

  span {
    white-space: nowrap;
  }
`;

export const OwnStatusControl = styled.div`
  display: grid;
  gap: 2px;

  > label {
    font-size: ${({ theme }) => theme.typography.micro};
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

export const OwnStatusSelect = styled.select`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  min-height: 32px;
  font-size: ${({ theme }) => theme.typography.meta};
  padding: 0 8px;

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: var(--chat-accent-border);
    box-shadow: 0 0 0 3px var(--chat-accent-soft);
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
  width: min(84%, 460px);
  max-width: min(84%, 460px);
  min-height: 56px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px 13px;
  display: grid;
  gap: 6px;
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
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.45;
    word-break: break-word;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(92%, 360px);
    max-width: min(92%, 360px);
    min-height: 52px;
    padding: 10px 12px;

    p {
      font-size: 12px;
      line-height: 1.45;
    }
  }
`;

export const MessageReplyReference = styled.div`
  border-left: 3px solid var(--chat-accent-border);
  background: rgba(255, 255, 255, 0.76);
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 6px 8px;
  display: grid;
  gap: 2px;

  strong {
    margin: 0;
    color: var(--chat-accent);
    font-size: ${({ theme }) => theme.typography.micro};
    font-weight: 800;
  }

  span {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const MessageImage = styled.img`
  width: 100%;
  max-width: 280px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  object-fit: cover;
`;

export const MessageMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;

  > span {
    font-size: ${({ theme }) => theme.typography.micro};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const DeliveryState = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: ${({ theme }) => theme.typography.micro};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MessageContextMenu = styled.div`
  position: fixed;
  z-index: 60;
  min-width: 170px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  box-shadow: 0 12px 22px rgba(28, 38, 64, 0.18);
  padding: 6px;
`;

export const MessageContextMenuItem = styled.button`
  width: 100%;
  min-height: 34px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  cursor: pointer;

  &:hover {
    background: var(--chat-accent-soft);
    color: var(--chat-accent);
  }
`;

export const ReplyComposer = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-left: 3px solid var(--chat-accent);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const ReplyComposerIdentity = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 7px;
  min-width: 0;
  color: var(--chat-accent);

  div {
    min-width: 0;
    display: grid;
    gap: 1px;
  }

  strong {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: var(--chat-accent);
  }

  span {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const ReplyComposerDismiss = styled.button`
  min-width: 30px;
  min-height: 30px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: #fff;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--chat-accent);
    border-color: var(--chat-accent-border);
  }
`;

export const PendingImageComposer = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: 8px;
  display: grid;
  gap: 8px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
`;

export const PendingImagePreview = styled.img`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.radii.sm};
  object-fit: cover;
  border: ${({ theme }) => theme.borders.subtle};
`;

export const PendingImageMeta = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;

  strong {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.text};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.micro};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const PendingImageDismiss = styled.button`
  min-width: 30px;
  min-height: 30px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: #fff;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--chat-accent);
    border-color: var(--chat-accent-border);
  }
`;

export const ComposeRow = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: minmax(0, 1fr) auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr) auto;
  }
`;

export const ComposeActions = styled.div`
  display: inline-flex;
  align-items: stretch;
  gap: 6px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 5px;
  }
`;

export const AttachButton = styled.button`
  min-width: 40px;
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.95);
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--chat-accent-border);
    color: var(--chat-accent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 36px;
    min-height: 36px;
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
    width: auto;
    justify-content: center;
    min-height: 36px;
    padding: 0 10px;
  }
`;

export const HiddenImageInput = styled.input`
  display: none;
`;

export const ComposeHint = styled.span`
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
  justify-self: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-self: start;
  }
`;

export const VisibleStatusHelper = styled.span`
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
  justify-self: start;
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
