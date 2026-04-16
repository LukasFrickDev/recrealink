import {
  hotelariaChatQuickReplies,
  paisChatQuickReplies,
  recreadorChatQuickReplies,
} from "@/shared/constants/chatQuickReplies";
import type { ChatPageTemplateData } from "@/shared/pages/ChatPageTemplate/data";
import type { ModuleDashboardStatItem } from "@/shared/layouts/ModuleDashboardShell";
import type { SharedModuleKey } from "@/shared/pages/moduleSharedShell";

interface UnifiedChatModuleConfig {
  pageTitle: string;
  pageDescription: string;
  stats: ModuleDashboardStatItem[];
  templateData: ChatPageTemplateData;
  tone?: "default" | "hotelaria" | "pais";
}

export const unifiedChatPageByModule: Record<SharedModuleKey, UnifiedChatModuleConfig> = {
  recreador: {
    pageTitle: "Chat do recreador",
    pageDescription: "Conversas visuais do módulo para comunicação com hotéis e equipe.",
    stats: [
      { title: "Conversas", value: "04", helper: "2 ativas agora" },
      { title: "Não lidas", value: "05", helper: "Priorize respostas" },
      { title: "Tempo médio", value: "7 min", helper: "Últimas 24h" },
      { title: "Status", value: "Visual", helper: "Sem backend nesta etapa" },
    ],
    templateData: {
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
          lastMessage: "Consegue confirmar disponibilidade para sabado?",
          lastTime: "10:24",
          unread: 2,
          online: true,
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
        },
        {
          id: "conv-3",
          name: "Marina Costa",
          subtitle: "Recreadora sênior",
          detail: "Equipe interna",
          lastMessage: "Vamos alinhar a dinamica da gincana aquatica.",
          lastTime: "Ontem",
          unread: 1,
          online: true,
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
            content: "Consegue confirmar disponibilidade para sabado?",
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
            content: "Vamos alinhar a dinamica da gincana aquatica.",
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
    },
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
    templateData: {
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
          },
        ],
      },
      quickReplies: [...hotelariaChatQuickReplies],
    },
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
    templateData: {
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
    },
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
    templateData: {
      sectionTitle: "Conversas da operação",
      sectionSubtitle: "Acompanhe solicitacoes de clientes e alinhamentos da equipe em tempo real.",
      searchPlaceholder: "Buscar por cliente, assunto ou equipe",
      composePlaceholder: "Digite sua mensagem...",
      sendButtonLabel: "Enviar",
      conversations: [
        {
          id: "conv-1",
          name: "Clube Estacao Kids",
          subtitle: "Evento de sabado",
          detail: "Responsável: Ana Ribeiro",
          lastMessage: "Podemos ajustar o início para 14h?",
          lastTime: "09:12",
          unread: 2,
          online: true,
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
        },
        {
          id: "conv-3",
          name: "Resort Vale Azul",
          subtitle: "Orcamento corporativo",
          detail: "Comercial: Julia Prado",
          lastMessage: "Aguardando proposta revisada.",
          lastTime: "Ontem",
          unread: 4,
          online: true,
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
          },
        ],
        "conv-2": [
          {
            id: "m-3",
            author: "Carlos Mendes",
            content: "Checklist final da equipe já esta no drive compartilhado.",
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
    },
  },
};