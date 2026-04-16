import { hotelariaCurrentTeamEntries, hotelariaHiringHistoryEntries } from "@/modules/hotelaria/mocks/shared";
import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaRecreadoresFeatureMock: HotelariaFeatureMock = {
  featureId: "recreadores",
  menuLabel: "Recreadores",
  title: "Banco de recreadores",
  description: "Gestao de equipe atual e histórico de contratacoes com filtros por disponibilidade.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Lista estruturada com avatar, rating, funções, especialidades e ações operacionais.",
  stats: [
    { title: "Ativos no mes", value: "24", helper: "Com escala registrada" },
    { title: "Disponiveis", value: "16", helper: "Prontos para nova escala" },
    { title: "Histórico", value: "71", helper: "Perfis com contratação previa" },
    { title: "Avaliação media", value: "4.8", helper: "Escala de 1 a 5" },
  ],
  checkpoints: [
    "Validar disponibilidade antes de fechar weekend.",
    "Registrar data da última atuacao para ranking interno.",
    "Usar feedback consolidado para priorizar recontratacoes.",
  ],
  layout: {
    type: "recreadores",
    currentTeam: hotelariaCurrentTeamEntries,
    hiringHistory: hotelariaHiringHistoryEntries,
  },
};
