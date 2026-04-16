export interface RecreadorDevelopmentView {
  featureKey: string;
  title: string;
  description: string;
  subtitle: string;
  message: string;
  stats: Array<{ title: string; value: string; helper: string }>;
}

const views: Record<string, RecreadorDevelopmentView> = {
  comunidade: {
    featureKey: "comunidade",
    title: "Comunidade",
    description: "Espaco colaborativo em preparacao para conexao entre recreadores.",
    subtitle: "Espaco colaborativo em preparacao para conexao entre recreadores.",
    message: "Em desenvolvimento.",
    stats: [],
  },
  default: {
    featureKey: "default",
    title: "Funcionalidade em desenvolvimento",
    description: "Espaco colaborativo",
    subtitle: "Espaco colaborativo",
    message: "Em desenvolvimento.",
    stats: [],
  },
};

export const resolveRecreadorDevelopmentView = (featureKey?: string): RecreadorDevelopmentView => {
  if (!featureKey) {
    return views.comunidade;
  }

  return views[featureKey] ?? views.default;
};
