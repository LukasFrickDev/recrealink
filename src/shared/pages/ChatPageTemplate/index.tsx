import { Check, CheckCheck, ChevronLeft, MessageCircle, Paperclip, Reply, Search, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { uiMessages } from "@/shared/constants/uiMessages";
import { Avatar } from "@/shared/ui";
import type {
  ChatPageTemplateData,
  ChatTemplateDeliveryState,
  ChatTemplateExternalContext,
  ChatTemplateMessage,
  ChatTemplatePresence,
  ChatTemplateReplyReference,
} from "./data";
import * as S from "./styles";

interface ChatPageTemplateProps {
  data: ChatPageTemplateData;
  tone?: "default" | "hotelaria" | "pais" | "recreador";
  onUnreadCountChange?: (count: number) => void;
  externalContext?: ChatTemplateExternalContext;
  persistenceKey?: string;
  ownPresence?: ChatTemplatePresence;
  onOwnPresenceChange?: (presence: ChatTemplatePresence) => void;
}

type ChatTemplateConversation = ChatPageTemplateData["conversations"][number];
type ReplyTarget = ChatTemplateReplyReference & { messageId: string };

interface PendingImage {
  name: string;
  dataUrl: string;
}

interface MessageContextMenuState {
  messageId: string;
  x: number;
  y: number;
}

type ChatMobileView = "list" | "thread";

const pendingImagePlaceholder =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const cloneConversations = (items: ChatTemplateConversation[]) => items.map((item) => ({ ...item }));

const resolveConversationRecency = (conversation: ChatTemplateConversation): number => {
  const timestamp = conversation.updatedAtIso ?? conversation.lastMessageMeta?.timestampIso;

  if (!timestamp) {
    return 0;
  }

  const parsed = Date.parse(timestamp);
  return Number.isFinite(parsed) ? parsed : 0;
};

const readStoredConversations = (
  storageKey: string,
  fallback: ChatTemplateConversation[],
): ChatTemplateConversation[] => {
  if (typeof window === "undefined") {
    return cloneConversations(fallback);
  }

  try {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return cloneConversations(fallback);
    }

    const parsed = JSON.parse(raw) as Array<Partial<ChatTemplateConversation> & { id?: string }>;

    if (!Array.isArray(parsed)) {
      return cloneConversations(fallback);
    }

    const byId = new Map(
      parsed
        .filter((item): item is Partial<ChatTemplateConversation> & { id: string } => typeof item.id === "string")
        .map((item) => [item.id, item]),
    );

    return fallback.map((item) => {
      const stored = byId.get(item.id);

      if (!stored) {
        return { ...item };
      }

      return {
        ...item,
        unread:
          typeof stored.unread === "number" && Number.isFinite(stored.unread)
            ? Math.max(0, Math.trunc(stored.unread))
            : item.unread,
        lastMessage: typeof stored.lastMessage === "string" ? stored.lastMessage : item.lastMessage,
        lastTime: typeof stored.lastTime === "string" ? stored.lastTime : item.lastTime,
        updatedAtIso: typeof stored.updatedAtIso === "string" ? stored.updatedAtIso : item.updatedAtIso,
        lastMessageMeta:
          stored.lastMessageMeta && typeof stored.lastMessageMeta === "object"
            ? {
                ...item.lastMessageMeta,
                ...stored.lastMessageMeta,
              }
            : item.lastMessageMeta,
      };
    });
  } catch {
    return cloneConversations(fallback);
  }
};

const presenceLabel: Record<ChatTemplatePresence, string> = {
  online: "Online",
  away: "Ausente",
  busy: "Ocupado",
  offline: "Offline",
};

const ownPresenceOptions: Array<{ value: ChatTemplatePresence; label: string }> = [
  { value: "online", label: "Online" },
  { value: "away", label: "Ausente" },
  { value: "busy", label: "Ocupado" },
  { value: "offline", label: "Offline" },
];

const deliveryLabel: Record<ChatTemplateDeliveryState, string> = {
  sending: "Enviando",
  sent: "Enviada",
  delivered: "Entregue",
  read: "Visualizada",
};

const resolvePresence = (conversation: ChatPageTemplateData["conversations"][number]): ChatTemplatePresence => {
  if (conversation.presence) {
    return conversation.presence;
  }

  if (typeof conversation.online === "boolean") {
    return conversation.online ? "online" : "offline";
  }

  return "offline";
};

const resolveMessagePreview = (message: ChatTemplateMessage): string => {
  const content = message.content.trim();

  if (content) {
    return content;
  }

  if (message.imageName) {
    return `Imagem: ${message.imageName}`;
  }

  return "Mensagem";
};

export const ChatPageTemplate = ({
  data,
  tone = "default",
  onUnreadCountChange,
  externalContext,
  persistenceKey,
  ownPresence,
  onOwnPresenceChange,
}: ChatPageTemplateProps) => {
  const storageKey = persistenceKey ? `recrealink.chat.${persistenceKey}` : null;
  const [search, setSearch] = useState("");
  const [mobileView, setMobileView] = useState<ChatMobileView>("list");
  const [conversations, setConversations] = useState(() =>
    storageKey ? readStoredConversations(storageKey, data.conversations) : cloneConversations(data.conversations),
  );
  const [activeConversationId, setActiveConversationId] = useState(data.conversations[0]?.id ?? "");
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }

    return window.matchMedia("(max-width: 1024px)").matches;
  });
  const [draft, setDraft] = useState("");
  const [visiblePresence, setVisiblePresence] = useState<ChatTemplatePresence>(ownPresence ?? "online");
  const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null);
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);
  const [contextMenu, setContextMenu] = useState<MessageContextMenuState | null>(null);
  const [messagesByConversation, setMessagesByConversation] = useState<
    Record<string, ChatTemplateMessage[]>
  >(data.messagesByConversation);
  const composeInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const contextContactName = externalContext?.contactName?.trim() ?? "";
  const contextOpportunityCode = externalContext?.opportunityCode?.trim() ?? "";
  const contextSource = externalContext?.source?.trim() ?? "";

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (!contextContactName) {
      return;
    }

    const normalizedTarget = contextContactName.toLowerCase();

    if (!normalizedTarget) {
      return;
    }

    setConversations((previous) => {
      const existing = previous.find((item) => item.name.trim().toLowerCase() === normalizedTarget);

      if (existing) {
        setActiveConversationId(existing.id);

        if (isMobileViewport) {
          setMobileView("thread");
        }

        return previous;
      }

      const generatedId = `ctx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const generatedMessageId = `ctx-msg-${Date.now()}`;
      const generatedTimestamp = new Date().toISOString();
      const nextConversation = {
        id: generatedId,
        name: contextContactName || "Contato",
        subtitle: contextSource ? `Contato via ${contextSource}` : "Contato direto",
        detail: contextOpportunityCode
          ? `Oportunidade ${contextOpportunityCode}`
          : "Sem codigo de oportunidade",
        lastMessage: contextOpportunityCode
          ? `Conversa iniciada para ${contextOpportunityCode}`
          : "Conversa iniciada",
        lastTime: "Agora",
        unread: 0,
        presence: "online" as const,
        lastSeenLabel: "Ativo agora",
        updatedAtIso: generatedTimestamp,
        lastMessageMeta: {
          messageId: generatedMessageId,
          direction: "other" as const,
          readState: "read" as const,
          timestampIso: generatedTimestamp,
        },
      };

      setMessagesByConversation((prevMessages) => ({
        ...prevMessages,
        [generatedId]: [
          {
            id: generatedMessageId,
            author: "Sistema",
            authorId: "system",
            content: contextOpportunityCode
              ? `Contato iniciado a partir de ${contextSource || "origem desconhecida"} para ${contextOpportunityCode}.`
              : `Contato iniciado a partir de ${contextSource || "origem desconhecida"}.`,
            time: "Agora",
            timestampIso: generatedTimestamp,
            mine: false,
            readState: "read",
          },
        ],
      }));
      setActiveConversationId(generatedId);

      if (isMobileViewport) {
        setMobileView("thread");
      }

      return [nextConversation, ...previous];
    });
  }, [contextContactName, contextOpportunityCode, contextSource, isMobileViewport]);

  useEffect(() => {
    if (!ownPresence) {
      return;
    }

    setVisiblePresence(ownPresence);
  }, [ownPresence]);

  const unreadCount = useMemo(
    () => conversations.reduce((total, item) => total + Math.max(0, item.unread), 0),
    [conversations],
  );

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(conversations));
  }, [conversations, storageKey]);

  const filteredConversations = useMemo(
    () =>
      conversations.filter((item) =>
        `${item.name} ${item.subtitle} ${item.detail ?? ""} ${item.lastMessage}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
        .map((item, index) => ({ item, index }))
        .sort((a, b) => {
          const recencyDelta = resolveConversationRecency(b.item) - resolveConversationRecency(a.item);

          if (recencyDelta !== 0) {
            return recencyDelta;
          }

          return a.index - b.index;
        })
        .map(({ item }) => item),
    [conversations, search],
  );

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    if (isMobileViewport && mobileView !== "thread") {
      return;
    }

    setConversations((previous) =>
      previous.map((item) =>
        item.id === activeConversationId && item.unread > 0
          ? {
              ...item,
              unread: 0,
            }
          : item,
      ),
    );
  }, [activeConversationId, isMobileViewport, mobileView]);

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [onUnreadCountChange, unreadCount]);

  useEffect(() => {
    if (!contextMenu) {
      return;
    }

    const closeMenu = () => {
      setContextMenu(null);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContextMenu(null);
      }
    };

    window.addEventListener("click", closeMenu);
    window.addEventListener("scroll", closeMenu, true);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("scroll", closeMenu, true);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [contextMenu]);

  useEffect(() => {
    if (filteredConversations.length === 0) {
      return;
    }

    const activeStillVisible = filteredConversations.some(
      (conversation) => conversation.id === activeConversationId,
    );

    if (!activeStillVisible) {
      setActiveConversationId(filteredConversations[0].id);
    }
  }, [activeConversationId, filteredConversations]);

  const activeConversation = useMemo(
    () => filteredConversations.find((item) => item.id === activeConversationId) ?? filteredConversations[0],
    [activeConversationId, filteredConversations],
  );

  const emptyPanelMessage = useMemo(() => {
    if (conversations.length === 0) {
      return uiMessages.conversationsEmptyInitial;
    }

    return uiMessages.conversationsEmptyFilter;
  }, [conversations.length]);

  const currentMessages = activeConversation ? messagesByConversation[activeConversation.id] ?? [] : [];
  const messageById = useMemo(
    () => new Map(currentMessages.map((message) => [message.id, message])),
    [currentMessages],
  );

  const activeConversationPresence = activeConversation ? resolvePresence(activeConversation) : "offline";
  const ownPresenceLabel = presenceLabel[visiblePresence];
  const ownStatusSelectId = "chat-own-visible-status";
  const showListPanel = !isMobileViewport || mobileView === "list";
  const showThreadPanel = !isMobileViewport || mobileView === "thread";

  const contextMenuCoordinates = useMemo(() => {
    if (!contextMenu) {
      return null;
    }

    if (typeof window === "undefined") {
      return { x: contextMenu.x, y: contextMenu.y };
    }

    return {
      x: Math.min(contextMenu.x, Math.max(12, window.innerWidth - 186)),
      y: Math.min(contextMenu.y, Math.max(12, window.innerHeight - 68)),
    };
  }, [contextMenu]);

  const handleOwnPresenceUpdate = (nextPresence: ChatTemplatePresence) => {
    setVisiblePresence(nextPresence);
    onOwnPresenceChange?.(nextPresence);
  };

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);

    if (isMobileViewport) {
      setMobileView("thread");
    }
  };

  const handleOpenReplyComposer = (message: ChatTemplateMessage) => {
    setReplyTarget({
      messageId: message.id,
      author: message.mine ? "Você" : message.author,
      content: resolveMessagePreview(message),
    });

    composeInputRef.current?.focus();
  };

  const handleReplyFromContextMenu = () => {
    if (!contextMenu) {
      return;
    }

    const selectedMessage = messageById.get(contextMenu.messageId);

    if (!selectedMessage) {
      setContextMenu(null);
      return;
    }

    handleOpenReplyComposer(selectedMessage);
    setContextMenu(null);
  };

  const handleAttachImage = () => {
    imageInputRef.current?.click();
  };

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    setPendingImage({
      name: selectedFile.name,
      dataUrl: pendingImagePlaceholder,
    });

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setPendingImage({
        name: selectedFile.name,
        dataUrl: reader.result,
      });
    };

    reader.readAsDataURL(selectedFile);
    event.target.value = "";
  };

  const handleSend = () => {
    if (!activeConversation) {
      return;
    }

    const trimmedDraft = draft.trim();

    if (!trimmedDraft && !pendingImage) {
      return;
    }

    const inferredDeliveryState: ChatTemplateDeliveryState =
      activeConversationPresence === "online" ? "read" : "delivered";
    const lastMessagePreview = trimmedDraft || (pendingImage ? "Imagem enviada" : "Mensagem enviada");
    const sentAtIso = new Date().toISOString();
    const nextReadState: "read" | "unread" =
      inferredDeliveryState === "read" ? "read" : "unread";

    const nextMessage: ChatTemplateMessage = {
      id: `m-${Date.now()}`,
      author: "Você",
      authorId: "self",
      content: trimmedDraft,
      time: "Agora",
      timestampIso: sentAtIso,
      mine: true,
      readState: nextReadState,
      deliveryState: inferredDeliveryState,
      replyTo: replyTarget ? { author: replyTarget.author, content: replyTarget.content } : undefined,
      imageUrl: pendingImage?.dataUrl,
      imageName: pendingImage?.name,
    };

    setMessagesByConversation((previous) => ({
      ...previous,
      [activeConversation.id]: [...(previous[activeConversation.id] ?? []), nextMessage],
    }));

    setConversations((previous) => {
      const next = previous.map((item) =>
        item.id === activeConversation.id
          ? {
              ...item,
              lastMessage: lastMessagePreview,
              lastTime: "Agora",
              unread: 0,
              updatedAtIso: sentAtIso,
              lastMessageMeta: {
                messageId: nextMessage.id,
                direction: "self" as const,
                readState: nextReadState,
                timestampIso: sentAtIso,
              },
            }
          : item,
      );

      const targetIndex = next.findIndex((item) => item.id === activeConversation.id);

      if (targetIndex <= 0) {
        return next;
      }

      const [target] = next.splice(targetIndex, 1);

      return [target, ...next];
    });

    setDraft("");
    setReplyTarget(null);
    setPendingImage(null);
  };

  return (
    <S.Wrapper $tone={tone}>
      <S.ChatGrid>
        {showListPanel ? (
        <S.Panel>
          <S.PanelHeader>
            <h3>{data.sectionTitle}</h3>
            <p>{data.sectionSubtitle}</p>
          </S.PanelHeader>

          <S.SearchField>
            <Search size={15} />
            <S.SearchInput
              placeholder={data.searchPlaceholder}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </S.SearchField>

          <S.ConversationList>
            {filteredConversations.map((conversation) => (
              (() => {
                const conversationPresence = resolvePresence(conversation);
                const conversationContext = conversation.detail
                  ? `${conversation.subtitle} • ${conversation.detail}`
                  : conversation.subtitle;

                return (
                  <S.ConversationItem
                    key={conversation.id}
                    type="button"
                    $active={conversation.id === activeConversation?.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <S.ConversationIdentity>
                      <S.AvatarWrap>
                        <Avatar name={conversation.name} size="sm" />
                        <S.Dot $presence={conversationPresence} />
                      </S.AvatarWrap>

                      <S.ConversationBody>
                        <S.ConversationTop>
                          <strong>{conversation.name}</strong>
                        </S.ConversationTop>

                        <S.ConversationMeta>
                          <S.PresenceLabel $presence={conversationPresence}>
                            {presenceLabel[conversationPresence]}
                          </S.PresenceLabel>
                          <span>{conversationContext}</span>
                        </S.ConversationMeta>

                        <S.LastMessage>{conversation.lastMessage}</S.LastMessage>
                      </S.ConversationBody>
                    </S.ConversationIdentity>

                    <S.ConversationSide>
                      <span>{conversation.lastTime}</span>
                      {conversation.unread > 0 ? (
                        <S.UnreadBadge>{conversation.unread}</S.UnreadBadge>
                      ) : null}
                    </S.ConversationSide>
                  </S.ConversationItem>
                );
              })()
            ))}
          </S.ConversationList>
        </S.Panel>
        ) : null}

        {showThreadPanel ? (
        <S.Panel>
          {activeConversation ? (
            <>
              <S.ChatHeader>
                {isMobileViewport ? (
                  <S.MobileBackButton type="button" onClick={() => setMobileView("list")}>
                    <ChevronLeft size={14} /> Conversas
                  </S.MobileBackButton>
                ) : null}

                <S.ChatContact>
                  <S.ChatTitleRow>
                    <strong>{activeConversation.name}</strong>
                    <S.PresenceLabel $presence={activeConversationPresence}>
                      <S.Dot $presence={activeConversationPresence} />
                      {presenceLabel[activeConversationPresence]}
                    </S.PresenceLabel>
                  </S.ChatTitleRow>
                  <span>{activeConversation.lastSeenLabel ?? activeConversation.detail ?? activeConversation.subtitle}</span>
                </S.ChatContact>

                <S.ChatHeaderActions>
                  <S.ChatMetaPill>
                    <MessageCircle size={14} />
                    <span>{activeConversation.subtitle}</span>
                  </S.ChatMetaPill>

                  <S.OwnStatusControl>
                    <label htmlFor={ownStatusSelectId}>Seu status visível</label>
                    <S.OwnStatusSelect
                      id={ownStatusSelectId}
                      value={visiblePresence}
                      onChange={(event) => handleOwnPresenceUpdate(event.target.value as ChatTemplatePresence)}
                    >
                      {ownPresenceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </S.OwnStatusSelect>
                  </S.OwnStatusControl>
                </S.ChatHeaderActions>
              </S.ChatHeader>

              <S.MessageList aria-label="Mensagens da conversa">
                {currentMessages.length === 0 ? (
                  <S.EmptyMessages>
                    Sem mensagens nesta conversa. Envie a primeira mensagem para iniciar o atendimento.
                  </S.EmptyMessages>
                ) : (
                  currentMessages.map((message) => (
                    <S.MessageBubble
                      key={message.id}
                      $mine={message.mine}
                      onContextMenu={(event) => {
                        event.preventDefault();

                        setContextMenu({
                          messageId: message.id,
                          x: event.clientX,
                          y: event.clientY,
                        });
                      }}
                    >
                      {message.replyTo ? (
                        <S.MessageReplyReference>
                          <strong>{message.replyTo.author}</strong>
                          <span>{message.replyTo.content}</span>
                        </S.MessageReplyReference>
                      ) : null}

                      {!message.mine ? <strong>{message.author}</strong> : null}

                      {message.imageUrl ? (
                        <S.MessageImage src={message.imageUrl} alt={message.imageName ?? "Imagem enviada"} />
                      ) : null}

                      {message.content.trim() ? <p>{message.content}</p> : null}

                      <S.MessageMeta>
                        <span>{message.time}</span>

                        {message.mine ? (
                          <S.DeliveryState>
                            {(message.deliveryState ?? "read") === "read" ? (
                              <CheckCheck size={12} />
                            ) : (
                              <Check size={12} />
                            )}
                            {deliveryLabel[message.deliveryState ?? "read"]}
                          </S.DeliveryState>
                        ) : null}
                      </S.MessageMeta>
                    </S.MessageBubble>
                  ))
                )}
              </S.MessageList>

              {contextMenuCoordinates && contextMenu ? (
                <S.MessageContextMenu
                  role="menu"
                  aria-label="Menu da mensagem"
                  style={{ left: contextMenuCoordinates.x, top: contextMenuCoordinates.y }}
                >
                  <S.MessageContextMenuItem type="button" role="menuitem" onClick={handleReplyFromContextMenu}>
                    <Reply size={14} /> Responder
                  </S.MessageContextMenuItem>
                </S.MessageContextMenu>
              ) : null}

              {replyTarget ? (
                <S.ReplyComposer>
                  <S.ReplyComposerIdentity>
                    <Reply size={14} />
                    <div>
                      <strong>Respondendo a {replyTarget.author}</strong>
                      <span>{replyTarget.content}</span>
                    </div>
                  </S.ReplyComposerIdentity>

                  <S.ReplyComposerDismiss
                    type="button"
                    aria-label="Cancelar resposta"
                    onClick={() => setReplyTarget(null)}
                  >
                    <X size={14} />
                  </S.ReplyComposerDismiss>
                </S.ReplyComposer>
              ) : null}

              {pendingImage ? (
                <S.PendingImageComposer>
                  <S.PendingImagePreview
                    src={pendingImage.dataUrl}
                    alt={pendingImage.name}
                  />

                  <S.PendingImageMeta>
                    <strong>{pendingImage.name}</strong>
                    <span>Imagem pronta para envio</span>
                  </S.PendingImageMeta>

                  <S.PendingImageDismiss
                    type="button"
                    aria-label="Remover imagem"
                    onClick={() => setPendingImage(null)}
                  >
                    <X size={14} />
                  </S.PendingImageDismiss>
                </S.PendingImageComposer>
              ) : null}

              <S.ComposeRow>
                <S.ComposeInput
                  ref={composeInputRef}
                  placeholder={data.composePlaceholder}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                />

                <S.ComposeActions>
                  <S.AttachButton type="button" aria-label="Anexar imagem" onClick={handleAttachImage}>
                    <Paperclip size={14} />
                  </S.AttachButton>

                  <S.SendButton type="button" onClick={handleSend} disabled={!draft.trim() && !pendingImage}>
                    <Send size={14} /> {data.sendButtonLabel}
                  </S.SendButton>
                </S.ComposeActions>
              </S.ComposeRow>

              <S.HiddenImageInput
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelection}
                aria-label="Selecionar imagem"
                data-testid="chat-image-input"
              />

              <S.ComposeHint>Pressione Enter para enviar.</S.ComposeHint>
              <S.VisibleStatusHelper>Seu status atual: {ownPresenceLabel}</S.VisibleStatusHelper>
            </>
          ) : (
            <S.EmptyPanel>{emptyPanelMessage}</S.EmptyPanel>
          )}
        </S.Panel>
        ) : null}
      </S.ChatGrid>
    </S.Wrapper>
  );
};
