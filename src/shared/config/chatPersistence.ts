import type {
  ChatTemplateConversation,
  ChatTemplateMessage,
} from "@/shared/pages/ChatPageTemplate/data";

type StoredConversationCandidate = Partial<ChatTemplateConversation> & { id?: string };

export interface StoredChatState {
  version: 2;
  activeConversationId?: string;
  conversations: Array<StoredConversationCandidate & { id: string }>;
  messagesByConversation: Record<string, ChatTemplateMessage[]>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isStoredConversation = (
  value: unknown,
): value is StoredConversationCandidate & { id: string } =>
  isRecord(value) && typeof value.id === "string";

const isStoredMessage = (value: unknown): value is ChatTemplateMessage =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.author === "string" &&
  typeof value.content === "string" &&
  typeof value.time === "string" &&
  typeof value.mine === "boolean";

const sanitizeStoredMessages = (
  value: unknown,
): Record<string, ChatTemplateMessage[]> => {
  if (!isRecord(value)) {
    return {};
  }

  return Object.entries(value).reduce(
    (accumulator, [conversationId, messages]) => {
      if (!Array.isArray(messages)) {
        return accumulator;
      }

      const safeMessages = messages.filter(isStoredMessage).map((message) => ({
        ...message,
        replyTo: message.replyTo ? { ...message.replyTo } : undefined,
      }));

      return {
        ...accumulator,
        [conversationId]: safeMessages,
      };
    },
    {} as Record<string, ChatTemplateMessage[]>,
  );
};

export const getChatStorageKey = (persistenceKey: string) =>
  `recrealink.chat.${persistenceKey}`;

export const parseStoredChatState = (raw: string | null): StoredChatState | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (Array.isArray(parsed)) {
      return {
        version: 2,
        conversations: parsed.filter(isStoredConversation),
        messagesByConversation: {},
      };
    }

    if (!isRecord(parsed) || !Array.isArray(parsed.conversations)) {
      return null;
    }

    return {
      version: 2,
      activeConversationId:
        typeof parsed.activeConversationId === "string" ? parsed.activeConversationId : undefined,
      conversations: parsed.conversations.filter(isStoredConversation),
      messagesByConversation: sanitizeStoredMessages(parsed.messagesByConversation),
    };
  } catch {
    return null;
  }
};

export const readStoredChatUnreadCount = (
  moduleKey: string,
  fallbackCount: number,
): number => {
  if (typeof window === "undefined") {
    return fallbackCount;
  }

  const storedState = parseStoredChatState(window.localStorage.getItem(getChatStorageKey(moduleKey)));

  if (!storedState) {
    return fallbackCount;
  }

  return storedState.conversations.reduce((total, conversation) => {
    if (typeof conversation.unread !== "number" || !Number.isFinite(conversation.unread)) {
      return total;
    }

    return total + Math.max(0, Math.trunc(conversation.unread));
  }, 0);
};
