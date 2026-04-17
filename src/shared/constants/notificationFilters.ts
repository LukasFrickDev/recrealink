export interface NotificationFilterOption {
  id: string;
  label: string;
}

const baseNotificationFilters: NotificationFilterOption[] = [
  { id: "todas", label: "Todas" },
  { id: "nao-lidas", label: "Não lidas" },
];

export const recreadorNotificationFilters: NotificationFilterOption[] = [
  ...baseNotificationFilters,
  { id: "oportunidade", label: "Oportunidades" },
  { id: "mensagem", label: "Mensagens" },
  { id: "sistema", label: "Sistema" },
];

export const hotelariaNotificationFilters: NotificationFilterOption[] = [
  { id: "todas", label: "Todas" },
  { id: "nao-lidas", label: "N\u00e3o lidas" },
  { id: "urgente", label: "Urgentes" },
  { id: "importante", label: "Importantes" },
  { id: "informativa", label: "Informativas" },
];

export const paisNotificationFilters: NotificationFilterOption[] = [
  ...baseNotificationFilters,
  { id: "empresas", label: "Empresas" },
  { id: "mensagem", label: "Mensagens" },
  { id: "favoritos", label: "Favoritos" },
  { id: "agenda", label: "Agenda" },
];
