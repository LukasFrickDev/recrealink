export const recreadorSupportMock = {
  areaLabel: "Recreador",
  userName: "Rafael Santos",
  title: "Suporte",
  description:
    "Central de ajuda para dúvidas técnicas, uso das ferramentas gratuitas e acompanhamento de chamados.",
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
      title: "Email direto",
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
      description: "Perguntas frequentes sobre cadastro, agenda e candidaturas",
    },
  ],
};
