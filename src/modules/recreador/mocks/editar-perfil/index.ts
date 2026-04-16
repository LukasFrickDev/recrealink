export interface SpecialtyOption {
  id: string;
  label: string;
}

export const recreadorEditarPerfilMock = {
  title: "Editar perfil do recreador",
  description:
    "Área visual pronta para atualização de dados, foto e informações do portfólio na Etapa 1.",
  stats: [
    { title: "Campos principais", value: "08", helper: "Dados pessoais e contato" },
    { title: "Especialidades", value: "06", helper: "Seleções recomendadas" },
    { title: "Portfólio", value: "Pronto", helper: "Pré-visualização habilitada" },
    { title: "Upload real", value: "Não", helper: "Integração futura" },
  ],
  avatarPresets: ["RS", "RA", "RZ", "RV"],
  specialtyOptions: [
    { id: "esp-1", label: "Recreação infantil" },
    { id: "esp-2", label: "Recreação aquática" },
    { id: "esp-3", label: "Eventos temáticos" },
    { id: "esp-4", label: "Gincanas e competições" },
    { id: "esp-5", label: "Atividades para famílias" },
    { id: "esp-6", label: "Recreação noturna" },
    { id: "esp-7", label: "Oficinas criativas" },
    { id: "esp-8", label: "Jogos cooperativos" },
  ] as SpecialtyOption[],
};
