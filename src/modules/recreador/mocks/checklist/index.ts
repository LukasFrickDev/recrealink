export const recreadorChecklistMock = {
  title: "Checklist",
  description:
    "Checklist complementar para revisar pontos essenciais sem competir com os eixos núcleo do módulo.",
  stats: [
    { title: "Itens concluídos", value: "16/20", helper: "Checklist semanal" },
    { title: "Pendências críticas", value: "2", helper: "Revisão imediata" },
    { title: "Frequência", value: "Semanal", helper: "Atualização recomendada" },
  ],
  items: [
    {
      id: "uniforme",
      title: "Uniforme e identificação",
      helper: "Confirmar kit principal e crachá visível.",
      done: true,
    },
    {
      id: "materiais",
      title: "Materiais de atividade",
      helper: "Conferir itens para faixa etária e plano do dia.",
      done: true,
    },
    {
      id: "briefing",
      title: "Briefing com coordenação",
      helper: "Validar horários, público e necessidades especiais.",
      done: false,
    },
    {
      id: "contingencia",
      title: "Plano de contingência",
      helper: "Revisar ações para chuva, ausência e mudanças de espaço.",
      done: false,
    },
  ],
  routine: [
    "Revisar checklist no dia anterior e uma hora antes do início.",
    "Registrar ajustes após cada atuação para melhoria contínua.",
    "Priorizar itens críticos relacionados à segurança e comunicação.",
  ],
};
