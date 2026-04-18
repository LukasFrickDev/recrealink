import { MessageCircle, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { uiMessages } from "@/shared/constants/uiMessages";
import type { ChatPageTemplateData, ChatTemplateMessage } from "./data";
import * as S from "./styles";

interface ChatPageTemplateProps {
  data: ChatPageTemplateData;
  tone?: "default" | "hotelaria" | "pais";
}

export const ChatPageTemplate = ({ data, tone = "default" }: ChatPageTemplateProps) => {
  const [search, setSearch] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(data.conversations[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [messagesByConversation, setMessagesByConversation] = useState<
    Record<string, ChatTemplateMessage[]>
  >(data.messagesByConversation);

  const filteredConversations = useMemo(
    () =>
      data.conversations.filter((item) =>
        `${item.name} ${item.subtitle} ${item.detail ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [data.conversations, search],
  );

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
    if (data.conversations.length === 0) {
      return uiMessages.conversationsEmptyInitial;
    }

    return uiMessages.conversationsEmptyFilter;
  }, [data.conversations.length]);

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
