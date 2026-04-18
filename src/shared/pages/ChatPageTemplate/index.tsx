import { MessageCircle, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { uiMessages } from "@/shared/constants/uiMessages";
import type {
  ChatPageTemplateData,
  ChatTemplateExternalContext,
  ChatTemplateMessage,
} from "./data";
import * as S from "./styles";

interface ChatPageTemplateProps {
  data: ChatPageTemplateData;
  tone?: "default" | "hotelaria" | "pais" | "recreador";
  onUnreadCountChange?: (count: number) => void;
  externalContext?: ChatTemplateExternalContext;
}

export const ChatPageTemplate = ({
  data,
  tone = "default",
  onUnreadCountChange,
  externalContext,
}: ChatPageTemplateProps) => {
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState(() => data.conversations.map((item) => ({ ...item })));
  const [activeConversationId, setActiveConversationId] = useState(data.conversations[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [messagesByConversation, setMessagesByConversation] = useState<
    Record<string, ChatTemplateMessage[]>
  >(data.messagesByConversation);

  const contextContactName = externalContext?.contactName?.trim() ?? "";
  const contextOpportunityCode = externalContext?.opportunityCode?.trim() ?? "";
  const contextSource = externalContext?.source?.trim() ?? "";

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
        return previous;
      }

      const generatedId = `ctx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
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
        online: true,
      };

      setMessagesByConversation((prevMessages) => ({
        ...prevMessages,
        [generatedId]: [
          {
            id: `ctx-msg-${Date.now()}`,
            author: "Sistema",
            content: contextOpportunityCode
              ? `Contato iniciado a partir de ${contextSource || "origem desconhecida"} para ${contextOpportunityCode}.`
              : `Contato iniciado a partir de ${contextSource || "origem desconhecida"}.`,
            time: "Agora",
            mine: false,
          },
        ],
      }));
      setActiveConversationId(generatedId);

      return [nextConversation, ...previous];
    });
  }, [contextContactName, contextOpportunityCode, contextSource]);

  const unreadCount = useMemo(
    () => conversations.reduce((total, item) => total + Math.max(0, item.unread), 0),
    [conversations],
  );

  const filteredConversations = useMemo(
    () =>
      conversations.filter((item) =>
        `${item.name} ${item.subtitle} ${item.detail ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [conversations, search],
  );

  useEffect(() => {
    if (!activeConversationId) {
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
  }, [activeConversationId]);

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [onUnreadCountChange, unreadCount]);

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

  const handleSend = () => {
    if (!activeConversation || !draft.trim()) {
      return;
    }

    const nextMessage: ChatTemplateMessage = {
      id: `m-${Date.now()}`,
      author: "Você",
      content: draft.trim(),
      time: "Agora",
      mine: true,
    };

    setMessagesByConversation((previous) => ({
      ...previous,
      [activeConversation.id]: [...(previous[activeConversation.id] ?? []), nextMessage],
    }));
    setDraft("");
  };

  return (
    <S.Wrapper $tone={tone}>
      <S.ChatGrid>
        <S.Panel>
          <S.PanelHeader>
            <h3>{data.sectionTitle}</h3>
            <p>{data.sectionSubtitle}</p>
          </S.PanelHeader>

          <S.SearchInput
            placeholder={data.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <S.ConversationList>
            {filteredConversations.map((conversation) => (
              <S.ConversationItem
                key={conversation.id}
                type="button"
                $active={conversation.id === activeConversation?.id}
                onClick={() => setActiveConversationId(conversation.id)}
              >
                <S.ConversationTop>
                  <strong>{conversation.name}</strong>
                  <span>{conversation.lastTime}</span>
                </S.ConversationTop>

                <S.ConversationMeta>
                  <S.Dot $online={conversation.online} />
                  <span>{conversation.subtitle}</span>
                </S.ConversationMeta>

                {conversation.detail ? (
                  <S.ConversationDetail>{conversation.detail}</S.ConversationDetail>
                ) : null}

                <S.LastMessage>{conversation.lastMessage}</S.LastMessage>
                {conversation.unread > 0 ? (
                  <S.UnreadBadge>{conversation.unread} não lidas</S.UnreadBadge>
                ) : null}
              </S.ConversationItem>
            ))}
          </S.ConversationList>
        </S.Panel>

        <S.Panel>
          {activeConversation ? (
            <>
              <S.ChatHeader>
                <S.ChatContact>
                  <strong>{activeConversation.name}</strong>
                  <span>{activeConversation.detail ?? activeConversation.subtitle}</span>
                </S.ChatContact>

                <S.ConversationMeta>
                  <MessageCircle size={14} />
                  <span>{activeConversation.subtitle}</span>
                </S.ConversationMeta>
              </S.ChatHeader>

              <S.MessageList>
                {currentMessages.length === 0 ? (
                  <S.EmptyMessages>
                    Sem mensagens nesta conversa. Envie a primeira mensagem para iniciar o atendimento.
                  </S.EmptyMessages>
                ) : (
                  currentMessages.map((message) => (
                    <S.MessageBubble key={message.id} $mine={message.mine}>
                      <strong>{message.author}</strong>
                      <p>{message.content}</p>
                      <span>{message.time}</span>
                    </S.MessageBubble>
                  ))
                )}
              </S.MessageList>

              {data.quickReplies && data.quickReplies.length > 0 ? (
                <S.QuickReplyRow>
                  {data.quickReplies.map((reply) => (
                    <S.QuickReplyButton key={reply} type="button" onClick={() => setDraft(reply)}>
                      {reply}
                    </S.QuickReplyButton>
                  ))}
                </S.QuickReplyRow>
              ) : null}

              <S.ComposeRow>
                <S.ComposeInput
                  placeholder={data.composePlaceholder}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSend();
                    }
                  }}
                />
                <S.SendButton type="button" onClick={handleSend}>
                  <Send size={14} /> {data.sendButtonLabel}
                </S.SendButton>
              </S.ComposeRow>
            </>
          ) : (
            <S.EmptyPanel>{emptyPanelMessage}</S.EmptyPanel>
          )}
        </S.Panel>
      </S.ChatGrid>
    </S.Wrapper>
  );
};
