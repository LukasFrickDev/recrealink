import { hotelariaCurrentTeamEntries } from "@/modules/hotelaria/mocks/shared";
import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export const hotelariaOcorrenciasFeatureMock: HotelariaFeatureMock = {
  featureId: "ocorrencias",
  menuLabel: "Ocorrencias",
  title: "Controle de ocorrencias",
  description: "Registro de incidentes com severidade, status e plano de tratativa.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Componente de compliance operacional com codificacao por risco e ação recomendada.",
  stats: [
    { title: "Ocorrencias no mes", value: "3", helper: "Total registrado" },
    { title: "Incidentes menores", value: "2", helper: "Sem impacto critico" },
    { title: "Pendentes", value: "1", helper: "Em acompanhamento" },
    { title: "Tempo medio de resposta", value: "35 min", helper: "SLA da equipe" },
  ],
  checkpoints: [
    "Classificar severidade no momento do registro.",
    "Atribuir responsavel para toda ocorrencia aberta.",
    "Fechar incidentes com evidencias da resolucao.",
  ],
  layout: {
    type: "ocorrencias",
    summary: [
      { title: "Ocorrencias no mes", value: "3", helper: "Em acompanhamento" },
      { title: "Incidentes menores", value: "2", helper: "Sem gravidade" },
      { title: "Última ocorrencia", value: "Hoje", helper: "15h40" },
    ],
    incidents: [
      {
        description: "Atraso na abertura da atividade kids por troca de local.",
        date: "05/12/2026 15:40",
        type: "Operacional",
        recreador: hotelariaCurrentTeamEntries[0]?.name ?? "Ana Silva",
        status: "Resolvido",
        severity: "Media",
        action: "Checklist de transicao atualizado e repassado ao turno noturno.",
      },
      {
        description: "Falta de material para oficina de artes no bloco B.",
        date: "04/12/2026 10:15",
        type: "Material",
        recreador: hotelariaCurrentTeamEntries[2]?.name ?? "Marina Costa",
        status: "Pendente",
        severity: "Baixa",
        action: "Solicitacao enviada para almoxarifado com prioridade media.",
      },
      {
        description: "Comunicação incompleta sobre alteracao de escala do domingo.",
        date: "03/12/2026 18:30",
        type: "Comunicação",
        recreador: hotelariaCurrentTeamEntries[1]?.name ?? "Carlos Santos",
        status: "Aberto",
        severity: "Alta",
        action: "Reforcar protocolo de aviso no chat e validar leitura dos lideres.",
      },
    ],
  },
};
