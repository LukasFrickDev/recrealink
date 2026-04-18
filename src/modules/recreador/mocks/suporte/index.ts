export const recreadorSupportMock = {
  areaLabel: "Recreador",
  userName: "Rafael Santos",
  title: "Suporte",
  description:
    "Central de apoio para dúvidas técnicas, fluxo operacional e acompanhamento de chamados.",
  stats: [
    { title: "Chamados abertos", value: "04", helper: "2 com retorno em andamento" },
    { title: "Tempo médio", value: "6h", helper: "Primeiro atendimento" },
    { title: "Guias disponíveis", value: "48", helper: "Base de conhecimento" },
    { title: "Satisfação", value: "96%", helper: "Último trimestre" },
  ],
  assuntos: [
    { value: "duvida-tecnica", label: "Dúvida técnica" },
    { value: "problema-ferramenta", label: "Problema com ferramenta" },
    { value: "sugestao", label: "Sugestão" },
    { value: "outro", label: "Outro" },
  ],
  canais: [
    {
      id: "email",
      title: "E-mail direto",
      description: "Envie prints e detalhes para suporte@recrealink.com",
    },
    {
      id: "chat",
      title: "Chat de atendimento",
      description: "Disponível de segunda a sexta, 08h às 18h",
    },
    {
      id: "base",
      title: "Base de conhecimento",
      description: "Artigos de ajuda sobre perfil, convites, disponibilidade e notificações",
    },
    {
      id: "notifications",
      title: "Notificações",
      description: "Resumo de alertas de oportunidades, mensagens e sistema",
    },
  ],
  knowledgeBase: [
    {
      id: "kb-perfil",
      title: "Como manter o perfil público atualizado",
      description: "Revise dados principais, especialidades e links de portfólio.",
      route: "/app/recreador/perfil",
    },
    {
      id: "kb-convites",
      title: "Como decidir convites com prazo curto",
      description: "Avalie agenda, tipo de oportunidade e prazo antes de aceitar.",
      route: "/app/recreador/convites",
    },
    {
      id: "kb-disponibilidade",
      title: "Como evitar conflitos de disponibilidade",
      description: "Use bloqueio manual e recorrência para reduzir sobreposições.",
      route: "/app/recreador/disponibilidade",
    },
    {
      id: "kb-notificacoes",
      title: "Como organizar notificações do módulo",
      description: "Filtre por tipo e trate itens de sistema antes de novos aceites.",
      route: "/app/recreador/notificacoes",
    },
  ],
};
