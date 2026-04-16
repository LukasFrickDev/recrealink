export interface CadastroStep {
  id: string;
  title: string;
  helper: string;
  done: boolean;
}

export const recreadorCadastroMock = {
  areaLabel: "Recreador",
  userName: "Rafael Santos",
  title: "Cadastro como recreador",
  description:
    "Onboarding principal do recreador para consolidar perfil, experiência e disponibilidade de atuação.",
  stats: [
    { title: "Progresso", value: "82%", helper: "Faltam 2 etapas" },
    { title: "Documentos", value: "04/05", helper: "Checklist de validação" },
    { title: "Especialidades", value: "06", helper: "Selecionadas" },
    { title: "Regiões", value: "03", helper: "Atuação ativa" },
  ],
  steps: [
    {
      id: "dados-basicos",
      title: "Informações básicas",
      helper: "Nome artístico, bio e dados de contato",
      done: true,
    },
    {
      id: "experiencia",
      title: "Experiência profissional",
      helper: "Histórico de entregas e tipo de público",
      done: true,
    },
    {
      id: "portfolio",
      title: "Portfólio visual",
      helper: "Fotos e evidências de campo",
      done: false,
    },
    {
      id: "disponibilidade",
      title: "Disponibilidade",
      helper: "Dias e turnos preferenciais",
      done: false,
    },
    {
      id: "regioes",
      title: "Regiões de atuação",
      helper: "Cidade principal e cobertura extra",
      done: true,
    },
  ] as CadastroStep[],
  especialidades: [
    "Recreação infantil",
    "Recreação adulta",
    "Recreação aquática",
    "Gincanas e competições",
    "Recreação temática",
    "Recreação esportiva",
    "Recreação cultural",
    "Eventos noturnos",
  ],
  proximosPassos: [
    { id: "fotos", title: "Adicionar fotos de portfólio", helper: "Mínimo recomendado: 6 imagens" },
    { id: "agenda", title: "Configurar disponibilidade", helper: "Defina turnos e dias da semana" },
    { id: "regiao", title: "Revisar regiões", helper: "Priorize locais com maior demanda" },
    { id: "referencias", title: "Solicitar recomendações", helper: "Fortalece confiança do perfil" },
  ],
};
