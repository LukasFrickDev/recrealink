import {
  hotelariaChatQuickReplies,
  paisChatQuickReplies,
  recreadorChatQuickReplies,
} from "@/shared/constants/chatQuickReplies";
import type {
  ChatPageTemplateData,
  ChatTemplateConversation,
  ChatTemplateMessage,
} from "@/shared/pages/ChatPageTemplate/data";
import type { ModuleDashboardStatItem } from "@/shared/layouts/ModuleDashboardShell";
import type { SharedModuleKey } from "@/shared/pages/moduleSharedShell";

interface UnifiedChatModuleConfig {
  pageTitle: string;
  pageDescription: string;
  stats: ModuleDashboardStatItem[];
  templateData: ChatPageTemplateData;
  tone?: "default" | "hotelaria" | "pais" | "recreador";
}

const timelineReference = Date.parse("2026-04-21T12:00:00.000Z");

const buildConversationParticipants = (
  conversation: ChatTemplateConversation,
): NonNullable<ChatTemplateConversation["participants"]> => {
  return [
    {
      id: `self-${conversation.id}`,
      name: "Você",
      role: "Conta atual",
    },
    {
      id: `contact-${conversation.id}`,
      name: conversation.name,
      role: conversation.subtitle,
      organization: conversation.detail,
    },
  ];
};

const enrichMessagesByConversation = (
  messagesByConversation: ChatPageTemplateData["messagesByConversation"],
): Record<string, ChatTemplateMessage[]> => {
  const entries = Object.entries(messagesByConversation);

  return Object.fromEntries(
    entries.map(([conversationId, messages], conversationIndex) => {
      const enrichedMessages = messages.map((message, messageIndex) => {
        const fallbackTimestamp = new Date(
          timelineReference - conversationIndex * 50 * 60_000 - messageIndex * 8 * 60_000,
        ).toISOString();

        return {
          ...message,
          authorId: message.authorId ?? `${conversationId}-${message.mine ? "self" : "contact"}`,
          readState: message.readState ?? (message.mine ? "read" : "unread"),
          timestampIso: message.timestampIso ?? fallbackTimestamp,
        };
      });

      return [conversationId, enrichedMessages];
    }),
  );
};

const enrichChatTemplateData = (templateData: ChatPageTemplateData): ChatPageTemplateData => {
  const enrichedMessagesByConversation = enrichMessagesByConversation(templateData.messagesByConversation);

  const enrichedConversations = templateData.conversations.map((conversation, index) => {
    const messages = enrichedMessagesByConversation[conversation.id] ?? [];
    const latestMessage = messages[messages.length - 1];
    const fallbackTimestamp = new Date(timelineReference - index * 45 * 60_000).toISOString();
    const lastTimestampIso = latestMessage?.timestampIso ?? fallbackTimestamp;

    return {
      ...conversation,
      participants: conversation.participants ?? buildConversationParticipants(conversation),
      updatedAtIso: conversation.updatedAtIso ?? lastTimestampIso,
      lastMessageMeta: conversation.lastMessageMeta ?? {
        messageId: latestMessage?.id ?? `${conversation.id}-preview`,
        direction: latestMessage?.mine ? "self" : "other",
        readState: conversation.unread > 0 ? "unread" : "read",
        timestampIso: lastTimestampIso,
      },
    };
  });

  return {
    ...templateData,
    conversations: enrichedConversations,
    messagesByConversation: enrichedMessagesByConversation,
  };
};

export const unifiedChatPageByModule: Record<SharedModuleKey, UnifiedChatModuleConfig> = {
  recreador: {
    pageTitle: "Chat do recreador",
    pageDescription: "Conversas do módulo para comunicação com hotéis e equipe.",
    stats: [
      { title: "Conversas", value: "04", helper: "2 ativas agora" },
      { title: "Não lidas", value: "05", helper: "Priorize respostas" },
      { title: "Tempo médio", value: "7 min", helper: "Últimas 24h" },
      { title: "Com retorno pendente", value: "02", helper: "Aguardando resposta" },
    ],
    templateData: enrichChatTemplateData({
      sectionTitle: "Conversas",
      sectionSubtitle: "Contatos e histórico recente do módulo",
      searchPlaceholder: "Buscar por contato ou empresa",
      composePlaceholder: "Digite sua mensagem",
      sendButtonLabel: "Enviar",
      conversations: [
        {
          id: "conv-1",
          name: "Ana Martins",
          subtitle: "Coordenadora de lazer",
          detail: "Cyan Resort",
          lastMessage: "Consegue confirmar disponibilidade para sábado?",
          lastTime: "10:24",
          unread: 2,
          online: true,
          presence: "online",
          lastSeenLabel: "Ativo agora",
        },
        {
          id: "conv-2",
          name: "Lucas Pereira",
          subtitle: "RH operacional",
          detail: "Royal Palm",
          lastMessage: "Perfeito, te envio o briefing final hoje.",
          lastTime: "Ontem",
          unread: 0,
          online: false,
          presence: "away",
          lastSeenLabel: "Visto hoje, 08:16",
        },
        {
          id: "conv-3",
          name: "Marina Costa",
          subtitle: "Recreadora sênior",
          detail: "Equipe interna",
          lastMessage: "Vamos alinhar a dinâmica da gincana aquática.",
          lastTime: "Ontem",
          unread: 1,
          online: true,
          presence: "busy",
          lastSeenLabel: "Em atividade",
        },
        {
          id: "conv-4",
          name: "Tiago Souza",
          subtitle: "Supervisor de eventos",
          detail: "Hotel Boa Vista",
          lastMessage: "Obrigado pelo retorno rápido.",
          lastTime: "2 dias",
          unread: 2,
          online: false,
          presence: "offline",
          lastSeenLabel: "Visto ontem",
        },
      ],
      messagesByConversation: {
        "conv-1": [
          {
            id: "m-1",
            author: "Contato",
            content: "Oi, Rafael!",
            time: "10:10",
            mine: false,
          },
          {
            id: "m-2",
            author: "Contato",
            content: "Consegue confirmar disponibilidade para sábado?",
            time: "10:24",
            mine: false,
          },
        ],
        "conv-2": [
          {
            id: "m-3",
            author: "Contato",
            content: "Perfeito, te envio o briefing final hoje.",
            time: "Ontem",
            mine: false,
          },
        ],
        "conv-3": [
          {
            id: "m-4",
            author: "Contato",
            content: "Vamos alinhar a dinâmica da gincana aquática.",
            time: "Ontem",
            mine: false,
          },
        ],
        "conv-4": [
          {
            id: "m-5",
            author: "Contato",
            content: "Obrigado pelo retorno rápido.",
            time: "2 dias",
            mine: false,
          },
        ],
      },
      quickReplies: [...recreadorChatQuickReplies],
    }),
    tone: "recreador",
  },
  hotelaria: {
    pageTitle: "Chat da operação",
    pageDescription: "Comunicação em tempo real por canal com contagem de não lidas e membros online.",
    stats: [
      { title: "Canais ativos", value: "6", helper: "Frentes de operação" },
      { title: "Não lidas", value: "29", helper: "Pendências atuais" },
      { title: "Tempo de resposta", value: "7 min", helper: "Média de retorno" },
      { title: "Online agora", value: "14", helper: "Equipe conectada" },
    ],
    templateData: enrichChatTemplateData({
      sectionTitle: "Canais da operação",
      sectionSubtitle: "Canal de comunicação em tempo real com 14 participantes online.",
      searchPlaceholder: "Buscar por canal ou membro",
      composePlaceholder: "Enviar mensagem para o canal",
      sendButtonLabel: "Enviar",
      conversations: [
        {
          id: "Operação geral",
          name: "Operação geral",
          subtitle: "26 membros",
          detail: "Online agora: 14",
          lastMessage: "Troca confirmada com Ana e Marina, escala atualizada.",
          lastTime: "16:24",
          unread: 5,
          online: true,
          presence: "busy",
          lastSeenLabel: "Canal movimentado",
        },
        {
          id: "Escalas weekend",
          name: "Escalas weekend",
          subtitle: "18 membros",
          detail: "Online agora: 14",
          lastMessage: "Troca confirmada com Ana e Marina, escala atualizada.",
          lastTime: "16:24",
          unread: 2,
          online: true,
          presence: "online",
          lastSeenLabel: "Ativo agora",
        },
        {
          id: "Programações kids",
          name: "Programações kids",
          subtitle: "12 membros",
          detail: "Online agora: 14",
          lastMessage: "Troca confirmada com Ana e Marina, escala atualizada.",
          lastTime: "16:24",
          unread: 0,
          online: true,
          presence: "away",
          lastSeenLabel: "Sem novas mensagens",
        },
        {
          id: "Ocorrências",
          name: "Ocorrências",
          subtitle: "9 membros",
          detail: "Online agora: 14",
          lastMessage: "Troca confirmada com Ana e Marina, escala atualizada.",
          lastTime: "16:24",
          unread: 1,
          online: true,
          presence: "offline",
          lastSeenLabel: "Última atividade às 15:02",
        },
      ],
      messagesByConversation: {
        "Operação geral": [
          {
            id: "hotel-chat-1",
            author: "Coordenação",
            content: "Confirmar troca do turno da piscina até 17h.",
            time: "16:20",
            mine: false,
          },
          {
            id: "hotel-chat-2",
            author: "Carla",
            content: "Troca confirmada com Ana e Marina, escala atualizada.",
            time: "16:24",
            mine: true,
            deliveryState: "read",
          },
        ],
        "Escalas weekend": [
          {
            id: "hotel-chat-3",
            author: "Coordenação",
            content: "Confirmar troca do turno da piscina até 17h.",
            time: "16:20",
            mine: false,
          },
          {
            id: "hotel-chat-4",
            author: "Carla",
            content: "Troca confirmada com Ana e Marina, escala atualizada.",
            time: "16:24",
            mine: true,
            deliveryState: "delivered",
          },
        ],
        "Programações kids": [
          {
            id: "hotel-chat-5",
            author: "Coordenação",
            content: "Confirmar troca do turno da piscina até 17h.",
            time: "16:20",
            mine: false,
          },
          {
            id: "hotel-chat-6",
            author: "Carla",
            content: "Troca confirmada com Ana e Marina, escala atualizada.",
            time: "16:24",
            mine: true,
            deliveryState: "sent",
          },
        ],
        Ocorrências: [
          {
            id: "hotel-chat-7",
            author: "Coordenação",
            content: "Confirmar troca do turno da piscina até 17h.",
            time: "16:20",
            mine: false,
          },
          {
            id: "hotel-chat-8",
            author: "Carla",
            content: "Troca confirmada com Ana e Marina, escala atualizada.",
            time: "16:24",
            mine: true,
            deliveryState: "read",
          },
        ],
      },
      quickReplies: [...hotelariaChatQuickReplies],
    }),
    tone: "hotelaria",
  },
  pais: {
    pageTitle: "Chat da família",
    pageDescription: "Canal visual para contato com empresas e acompanhamento de respostas.",
    stats: [
      { title: "Conversas", value: "05", helper: "3 ativas agora" },
      { title: "Não lidas", value: "04", helper: "Prioridade da família" },
      { title: "Tempo médio", value: "11 min", helper: "Últimas 24h" },
      { title: "Status", value: "Visual", helper: "Sem backend nesta etapa" },
    ],
    templateData: enrichChatTemplateData({
      sectionTitle: "Conversas da família",
      sectionSubtitle: "Fale com empresas e acompanhe retornos para decidir com mais segurança.",
      searchPlaceholder: "Buscar por empresa ou assunto",
      composePlaceholder: "Digite sua mensagem",
      sendButtonLabel: "Enviar",
      conversations: [
        {
          id: "pais-conv-1",
          name: "Recreação Diversão Total",
          subtitle: "Atendimento comercial",
          detail: "São Paulo - SP",
          lastMessage: "Temos disponibilidade no sábado às 15h.",
          lastTime: "09:40",
          unread: 2,
          online: true,
          presence: "online",
          lastSeenLabel: "Ativo agora",
        },
        {
          id: "pais-conv-2",
          name: "Alegria & Cia",
          subtitle: "Equipe de agenda",
          detail: "Campinas - SP",
          lastMessage: "Podemos enviar dois formatos de pacote ainda hoje.",
          lastTime: "Ontem",
          unread: 1,
          online: false,
          presence: "away",
          lastSeenLabel: "Visto hoje, 11:05",
        },
        {
          id: "pais-conv-3",
          name: "Show Kids Experience",
          subtitle: "Coordenação de evento",
          detail: "São Bernardo - SP",
          lastMessage: "Conseguimos incluir oficina criativa no mesmo horário.",
          lastTime: "Ontem",
          unread: 1,
          online: true,
          presence: "offline",
          lastSeenLabel: "Visto ontem",
        },
      ],
      messagesByConversation: {
        "pais-conv-1": [
          {
            id: "pais-m-1",
            author: "Atendimento",
            content: "Olá! Recebemos sua solicitação para aniversário infantil.",
            time: "09:31",
            mine: false,
          },
          {
            id: "pais-m-2",
            author: "Atendimento",
            content: "Temos disponibilidade no sábado às 15h.",
            time: "09:40",
            mine: false,
          },
        ],
        "pais-conv-2": [
          {
            id: "pais-m-3",
            author: "Equipe Alegria & Cia",
            content: "Podemos enviar dois formatos de pacote ainda hoje.",
            time: "Ontem",
            mine: false,
          },
        ],
        "pais-conv-3": [
          {
            id: "pais-m-4",
            author: "Coordenação",
            content: "Conseguimos incluir oficina criativa no mesmo horário.",
            time: "Ontem",
            mine: false,
          },
        ],
      },
      quickReplies: [...paisChatQuickReplies],
    }),
    tone: "pais",
  },
  empresa: {
    pageTitle: "Chat empresarial",
    pageDescription: "Canal de conversa com clientes, equipe e parceiros operacionais.",
    stats: [
      { title: "Conversas ativas", value: "18", helper: "Últimas 24h" },
      { title: "Não lidas", value: "06", helper: "Prioridade alta" },
      { title: "Tempo de resposta", value: "9 min", helper: "Média semanal" },
      { title: "Clientes online", value: "11", helper: "No momento" },
    ],
    templateData: enrichChatTemplateData({
      sectionTitle: "Conversas da operação",
      sectionSubtitle: "Acompanhe solicitações de clientes e alinhamentos da equipe em tempo real.",
      searchPlaceholder: "Buscar por cliente, assunto ou equipe",
      composePlaceholder: "Digite sua mensagem...",
      sendButtonLabel: "Enviar",
      conversations: [
        {
          id: "conv-1",
          name: "Clube Estação Kids",
          subtitle: "Evento de sábado",
          detail: "Responsável: Ana Ribeiro",
          lastMessage: "Podemos ajustar o início para 14h?",
          lastTime: "09:12",
          unread: 2,
          online: true,
          presence: "online",
          lastSeenLabel: "Ativo agora",
        },
        {
          id: "conv-2",
          name: "Equipe Campo Norte",
          subtitle: "Alinhamento de escala",
          detail: "Lider: Carlos Mendes",
          lastMessage: "Checklist final enviado no grupo.",
          lastTime: "Ontem",
          unread: 0,
          online: false,
          presence: "away",
          lastSeenLabel: "Visto hoje, 07:58",
        },
        {
          id: "conv-3",
          name: "Resort Vale Azul",
          subtitle: "Orçamento corporativo",
          detail: "Comercial: Julia Prado",
          lastMessage: "Aguardando proposta revisada.",
          lastTime: "Ontem",
          unread: 4,
          online: true,
          presence: "busy",
          lastSeenLabel: "Em atendimento",
        },
      ],
      messagesByConversation: {
        "conv-1": [
          {
            id: "m-1",
            author: "Ana Ribeiro",
            content: "Bom dia! Precisamos ajustar o início do evento para 14h.",
            time: "09:10",
            mine: false,
          },
          {
            id: "m-2",
            author: "Você",
            content: "Perfeito, vou readequar a escala e confirmar em seguida.",
            time: "09:11",
            mine: true,
            deliveryState: "read",
          },
        ],
        "conv-2": [
          {
            id: "m-3",
            author: "Carlos Mendes",
            content: "Checklist final da equipe já está no drive compartilhado.",
            time: "18:35",
            mine: false,
          },
        ],
        "conv-3": [
          {
            id: "m-4",
            author: "Julia Prado",
            content: "Conseguimos uma versão com duas opções de pacote?",
            time: "17:12",
            mine: false,
          },
        ],
      },
      quickReplies: [
        "Recebido, vou validar com a equipe.",
        "Consigo te retornar ainda hoje.",
        "Vamos seguir com essa atualização.",
      ],
    }),
  },
};