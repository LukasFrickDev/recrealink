export interface ChatTemplateConversation {
  id: string;
  name: string;
  subtitle: string;
  detail?: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online?: boolean;
}

export interface ChatTemplateMessage {
  id: string;
  author: string;
  content: string;
  time: string;
  mine: boolean;
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
