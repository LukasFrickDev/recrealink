export interface ExperienciaItem {
  id: string;
  titulo: string;
  local: string;
  data: string;
  participantes: number;
  categoria: string;
  avaliacao: number;
  descricao: string;
  destaques: string[];
  fotos: number;
  visualizacoes: number;
  curtidas: number;
}

export const recreadorRegistroMock = {
  areaLabel: "Recreador",
  userName: "Rafael Santos",
  title: "Registro de experiências",
  description:
    "Linha de experiências do recreador com evidências de entrega, feedbacks e portfólio visual.",
  stats: [
    { title: "Experiências", value: "12", helper: "Publicadas no portfólio" },
    { title: "Pessoas atendidas", value: "135", helper: "Base dos últimos registros" },
    { title: "Fotos", value: "35", helper: "Material publicado" },
    { title: "Avaliação média", value: "4.8", helper: "Média das entregas" },
  ],
  experiencias: [
    {
      id: "exp-1",
      titulo: "Recreação de verão · Resort Paradise",
      local: "Florianópolis, SC",
      data: "15 Jan 2026",
      participantes: 45,
      categoria: "Recreação infantil",
      avaliacao: 5,
      descricao:
        "Programação com atividades aquáticas e dinâmicas temáticas para crianças em alta temporada.",
      destaques: ["Gincana aquática", "Teatro infantil", "Pintura facial"],
      fotos: 8,
      visualizacoes: 45,
      curtidas: 12,
    },
    {
      id: "exp-2",
      titulo: "Noite cultural · Hotel Seaside",
      local: "Bombinhas, SC",
      data: "10 Jan 2026",
      participantes: 60,
      categoria: "Recreação adulta",
      avaliacao: 4,
      descricao:
        "Noite especial com música ao vivo, dinâmicas em grupo e atividades integradas para famílias.",
      destaques: ["Karaokê", "Dança", "Bingo"],
      fotos: 15,
      visualizacoes: 32,
      curtidas: 8,
    },
    {
      id: "exp-3",
      titulo: "Gincana familiar · Pousada Costa Verde",
      local: "Balneário Camboriú, SC",
      data: "05 Jan 2026",
      participantes: 30,
      categoria: "Recreação familiar",
      avaliacao: 5,
      descricao:
        "Atividades de integração entre pais e crianças com foco em colaboração e experiência do hóspede.",
      destaques: ["Caça ao tesouro", "Corrida do saco", "Quiz familiar"],
      fotos: 12,
      visualizacoes: 67,
      curtidas: 15,
    },
  ] as ExperienciaItem[],
};
