export interface ChecklistTask {
  id: string;
  texto: string;
  done: boolean;
}

export interface ChecklistBoard {
  id: string;
  titulo: string;
  categoria: "evento" | "rotina";
  prioridade: "alta" | "media" | "baixa";
  tarefas: ChecklistTask[];
}

export const recreadorChecklistsMock = {
  areaLabel: "Recreador",
  userName: "Rafael Santos",
  title: "Checklists simples",
  description:
    "Listas rápidas para preparar eventos, manter rotina operacional e reduzir falhas de execução.",
  stats: [
    { title: "Checklists ativos", value: "12", helper: "4 categorias principais" },
    { title: "Tarefas concluídas", value: "38", helper: "Semana atual" },
    { title: "Pendências", value: "07", helper: "Prioridade média" },
    { title: "Modelos prontos", value: "09", helper: "Aplicação imediata" },
  ],
  checklists: [
    {
      id: "check-1",
      titulo: "Preparação para evento · Hotel Seaside",
      categoria: "evento",
      prioridade: "alta",
      tarefas: [
        { id: "t-1", texto: "Verificar equipamentos de som", done: true },
        { id: "t-2", texto: "Preparar materiais das atividades", done: true },
        { id: "t-3", texto: "Confirmar público previsto", done: false },
        { id: "t-4", texto: "Revisar espaço da recreação", done: false },
      ],
    },
    {
      id: "check-2",
      titulo: "Checklist diário do recreador",
      categoria: "rotina",
      prioridade: "media",
      tarefas: [
        { id: "t-5", texto: "Revisar agenda do dia", done: true },
        { id: "t-6", texto: "Checar kit de primeiros socorros", done: true },
        { id: "t-7", texto: "Conferir previsão do tempo", done: false },
        { id: "t-8", texto: "Carregar equipamentos", done: false },
      ],
    },
  ] as ChecklistBoard[],
  modelos: [
    {
      id: "modelo-1",
      nome: "Recreação infantil",
      itens: [
        "Verificar faixa etária do grupo",
        "Preparar dinâmicas por idade",
        "Checar materiais lúdicos",
        "Confirmar apoio da equipe",
      ],
    },
    {
      id: "modelo-2",
      nome: "Recreação aquatica",
      itens: [
        "Validar segurança da piscina",
        "Confirmar salva-vidas",
        "Separar coletes e boias",
        "Revisar regras com participantes",
      ],
    },
    {
      id: "modelo-3",
      nome: "Evento noturno",
      itens: [
        "Checar iluminação",
        "Ajustar playlist",
        "Validar som e microfone",
        "Revisar dinâmicas para público adulto",
      ],
    },
  ],
};
