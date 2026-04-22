export type ChatTemplatePresence = "online" | "away" | "busy" | "offline";

export type ChatTemplateReadState = "unread" | "read";
export type ChatTemplateMessageDirection = "self" | "other";

export interface ChatTemplateParticipant {
  id: string;
  name: string;
  role: string;
  organization?: string;
}

export interface ChatTemplateLastMessageMeta {
  messageId: string;
  direction: ChatTemplateMessageDirection;
  readState: ChatTemplateReadState;
  timestampIso: string;
}

export interface ChatTemplateConversation {
  id: string;
  name: string;
  subtitle: string;
  detail?: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online?: boolean;
  presence?: ChatTemplatePresence;
  lastSeenLabel?: string;
  participants?: ChatTemplateParticipant[];
  lastMessageMeta?: ChatTemplateLastMessageMeta;
  updatedAtIso?: string;
}

export type ChatTemplateDeliveryState = "sending" | "sent" | "delivered" | "read";

export interface ChatTemplateReplyReference {
  author: string;
  content: string;
}

export interface ChatTemplateMessage {
  id: string;
  author: string;
  authorId?: string;
  content: string;
  time: string;
  timestampIso?: string;
  mine: boolean;
  readState?: ChatTemplateReadState;
  deliveryState?: ChatTemplateDeliveryState;
  replyTo?: ChatTemplateReplyReference;
  imageUrl?: string;
  imageName?: string;
}

export interface ChatPageTemplateData {
  sectionTitle: string;
  sectionSubtitle: string;
  searchPlaceholder: string;
  composePlaceholder: string;
  sendButtonLabel: string;
  conversations: ChatTemplateConversation[];
  messagesByConversation: Record<string, ChatTemplateMessage[]>;
  quickReplies?: string[];
}

export interface ChatTemplateExternalContext {
  contactName?: string;
  opportunityCode?: string;
  source?: string;
}
