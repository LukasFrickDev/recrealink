import { recreadorConvitesMock } from "@/modules/recreador/mocks/convites";
import { recreadorDisponibilidadeMock } from "@/modules/recreador/mocks/disponibilidade";
import {
  recreadorOportunidadesMock,
  type OpportunityInviteStatus,
} from "@/modules/recreador/mocks/oportunidades";
import { recreadorPerfilMock } from "@/modules/recreador/mocks/perfil";

export type OperationalPriorityTone = "warning" | "info" | "success" | "danger";

export type OperationalAlertSeverity = "warning" | "danger" | "info";

export type AvailabilitySummaryTone = "success" | "warning" | "danger" | "info";

interface DashboardAction {
  label: string;
  route: string;
}

export interface DashboardPriorityItem {
  id: string;
  title: string;
  value: string;
  helper: string;
  tone: OperationalPriorityTone;
  action: DashboardAction;
}

export interface DashboardQuickAction {
  id: string;
  label: string;
  helper: string;
  route: string;
}

export interface PendingInviteSummary {
  id: string;
  code: string;
  originName: string;
  periodLabel: string;
  deadlineLabel: string;
  route: string;
}

export interface FeaturedOpportunitySummary {
  id: string;
  code: string;
  originLabel: string;
  originName: string;
  roleLabel: string;
  cityLabel: string;
  periodLabel: string;
  compensationLabel: string;
  route: string;
}

export interface ActiveApplicationSummary {
  id: string;
  code: string;
  roleLabel: string;
  originName: string;
  statusLabel: string;
  helper: string;
  route: string;
}

export interface NextCommitmentSummary {
  id: string;
  code: string;
  originName: string;
  roleLabel: string;
  dateLabel: string;
  scheduleLabel: string;
  helper: string;
  route: string;
}

export interface AvailabilitySummaryItem {
  id: string;
  label: string;
  value: string;
  helper: string;
  tone: AvailabilitySummaryTone;
}

export interface ReviewSummaryItem {
  id: string;
  sourceLabel: string;
  rating: number;
  comment: string;
  dateLabel: string;
  route: string;
}

export interface OperationalAlertItem {
  id: string;
  title: string;
  message: string;
  severity: OperationalAlertSeverity;
  action: DashboardAction;
}

const originLabelByKind = {
  hotelaria: "Hotelaria",
  eventos: "Eventos",
} as const;

const pendingInvitesRaw = recreadorConvitesMock.items.filter((item) => item.status === "pendente");

const activeApplicationsRaw = recreadorOportunidadesMock.items.filter(
  (item) => item.applicationStatus === "candidatura-enviada" && item.lifecycleStatus === "aberta",
);

const highlightedOpportunitiesRaw = recreadorOportunidadesMock.items.filter(
  (item) => item.lifecycleStatus === "aberta",
);

const slots = recreadorDisponibilidadeMock.slots;
const manualBlocks = recreadorDisponibilidadeMock.manualBlocks;
const futureCommitments = recreadorDisponibilidadeMock.futureCommitments;
const recurrenceRules = recreadorDisponibilidadeMock.recurrenceRules;

const availableSlotsCount = slots.filter((item) => item.state === "disponivel").length;
const manualBlockedSlotsCount = slots.filter((item) => item.state === "bloqueio-manual").length;
const commitmentBlockedSlotsCount = slots.filter(
  (item) => item.state === "bloqueio-compromisso",
).length;
const conflictSlotsCount = slots.filter((item) => item.state === "conflito").length;
const activeRecurrenceCount = recurrenceRules.filter((item) => item.enabled).length;

const inviteStatusToLabel = (status: OpportunityInviteStatus) => {
  if (status === "convite-recebido") {
    return "Convite recebido";
  }

  if (status === "convite-aceito") {
    return "Convite aceito";
  }

  if (status === "convite-recusado") {
    return "Convite recusado";
  }

  return "Aguardando retorno";
};

const priorities = [
  {
    id: "convites-pendentes",
    title: "Convites pendentes",
    value: String(pendingInvitesRaw.length),
    helper: "Decisoes que exigem resposta imediata.",
    tone: "warning",
    action: {
      label: "Responder convites",
      route: "/app/recreador/convites",
    },
  },
  {
    id: "candidaturas-andamento",
    title: "Candidaturas em andamento",
    value: String(activeApplicationsRaw.length),
    helper: "Itens enviados aguardando evolucao.",
    tone: "info",
    action: {
      label: "Abrir oportunidades",
      route: "/app/recreador/oportunidades",
    },
  },
  {
    id: "proximos-compromissos",
    title: "Proximos compromissos",
    value: String(futureCommitments.length),
    helper: "Aceites e confirmacoes que impactam agenda.",
    tone: "success",
    action: {
      label: "Gerenciar disponibilidade",
      route: "/app/recreador/disponibilidade",
    },
  },
  {
    id: "conflitos-disponibilidade",
    title: "Conflitos de disponibilidade",
    value: String(conflictSlotsCount),
    helper: "Sobreposicoes para revisar antes de novos aceites.",
    tone: conflictSlotsCount > 0 ? "danger" : "success",
    action: {
      label: "Revisar conflitos",
      route: "/app/recreador/disponibilidade",
    },
  },
] satisfies DashboardPriorityItem[];

const pendingInvites = pendingInvitesRaw.slice(0, 3).map((item) => ({
  id: item.id,
  code: item.opportunityCode,
  originName: item.originName,
  periodLabel: item.periodLabel,
  deadlineLabel: item.responseDeadlineLabel,
  route: "/app/recreador/convites",
})) satisfies PendingInviteSummary[];

const featuredOpportunities = highlightedOpportunitiesRaw.slice(0, 3).map((item) => ({
  id: item.id,
  code: item.code,
  originLabel: originLabelByKind[item.originKind],
  originName: item.originName,
  roleLabel: item.roleLabel,
  cityLabel: item.cityLabel,
  periodLabel: item.periodLabel,
  compensationLabel: item.compensationLabel,
  route: "/app/recreador/oportunidades",
})) satisfies FeaturedOpportunitySummary[];

const activeApplications = activeApplicationsRaw.slice(0, 3).map((item) => ({
  id: item.id,
  code: item.code,
  roleLabel: item.roleLabel,
  originName: item.originName,
  statusLabel: inviteStatusToLabel(item.inviteStatus),
  helper:
    item.inviteStatus === "convite-recebido"
      ? "Convite recebido. Decisao fica em Convites."
      : "Candidatura enviada e aguardando retorno.",
  route: item.inviteStatus === "convite-recebido" ? "/app/recreador/convites" : "/app/recreador/oportunidades",
})) satisfies ActiveApplicationSummary[];

const nextCommitments = futureCommitments.slice(0, 3).map((item) => ({
  id: item.id,
  code: item.opportunityCode,
  originName: item.originName,
  roleLabel: item.roleLabel,
  dateLabel: item.dateLabel,
  scheduleLabel: `${item.weekdayLabel} · ${item.startTime} - ${item.endTime}`,
  helper: item.helper,
  route: "/app/recreador/disponibilidade",
})) satisfies NextCommitmentSummary[];

const availabilitySummary = [
  {
    id: "disponiveis",
    label: "Janelas disponiveis",
    value: String(availableSlotsCount),
    helper: "Espacos livres para novas oportunidades.",
    tone: "success",
  },
  {
    id: "bloqueios-manuais",
    label: "Bloqueios manuais",
    value: String(manualBlockedSlotsCount),
    helper: `${manualBlocks.length} bloqueios cadastrados.`,
    tone: "info",
  },
  {
    id: "bloqueios-compromisso",
    label: "Bloqueios por compromisso",
    value: String(commitmentBlockedSlotsCount),
    helper: "Aceites e confirmacoes ja reservados.",
    tone: "warning",
  },
  {
    id: "conflitos",
    label: "Conflitos detectados",
    value: String(conflictSlotsCount),
    helper: "Revise sobreposicoes antes de assumir novos itens.",
    tone: conflictSlotsCount > 0 ? "danger" : "success",
  },
  {
    id: "recorrencias",
    label: "Recorrencias ativas",
    value: String(activeRecurrenceCount),
    helper: "Padroes semanais ligados para previsibilidade.",
    tone: "info",
  },
] satisfies AvailabilitySummaryItem[];

const recentReviews = recreadorPerfilMock.dashboardReviewSummary.recent.map((item) => ({
  id: item.id,
  sourceLabel: item.sourceLabel,
  rating: item.rating,
  comment: item.comment,
  dateLabel: item.timeLabel,
  route: "/app/recreador/perfil",
})) satisfies ReviewSummaryItem[];

const profileCompletionRaw = recreadorPerfilMock.stats.find((item) => item.title === "Completude")?.value;
const profileCompletionPercent = Number((profileCompletionRaw ?? "0").replace("%", ""));

const alerts: OperationalAlertItem[] = [];

if (pendingInvitesRaw.length > 0) {
  const firstPending = pendingInvitesRaw[0];

  alerts.push({
    id: "alert-convites",
    title: "Convites aguardando resposta",
    message: `${pendingInvitesRaw.length} convite(s) pendente(s). Primeiro prazo: ${firstPending.responseDeadlineLabel}.`,
    severity: "warning",
    action: {
      label: "Ir para convites",
      route: "/app/recreador/convites",
    },
  });
}

if (conflictSlotsCount > 0) {
  alerts.push({
    id: "alert-conflitos",
    title: "Conflitos na disponibilidade",
    message: `${conflictSlotsCount} conflito(s) visual(is) detectado(s). Revise antes de aceitar novos convites.`,
    severity: "danger",
    action: {
      label: "Revisar disponibilidade",
      route: "/app/recreador/disponibilidade",
    },
  });
}

if (profileCompletionPercent < 100) {
  alerts.push({
    id: "alert-perfil",
    title: "Perfil ainda pode evoluir",
    message: `Completude atual em ${profileCompletionPercent}%. Ajustes no perfil aumentam relevancia em oportunidades.`,
    severity: "info",
    action: {
      label: "Atualizar perfil",
      route: "/app/recreador/perfil",
    },
  });
}

if (alerts.length === 0) {
  alerts.push({
    id: "alert-ok",
    title: "Operacao sem pendencias imediatas",
    message: "Dashboard sem alertas criticos no momento. Continue monitorando oportunidades e convites.",
    severity: "info",
    action: {
      label: "Abrir oportunidades",
      route: "/app/recreador/oportunidades",
    },
  });
}

const pendingActionsCount = pendingInvitesRaw.length + conflictSlotsCount;

const primaryAction =
  pendingInvitesRaw.length > 0
    ? {
        label: "Responder convites pendentes",
        route: "/app/recreador/convites",
      }
    : {
        label: "Explorar oportunidades abertas",
        route: "/app/recreador/oportunidades",
      };

const quickActions = [
  {
    id: "perfil",
    label: "Perfil",
    helper: "Atualizar reputacao e vitrine publica.",
    route: "/app/recreador/perfil",
  },
  {
    id: "oportunidades",
    label: "Oportunidades",
    helper: "Buscar vagas e enviar candidaturas.",
    route: "/app/recreador/oportunidades",
  },
  {
    id: "convites",
    label: "Convites",
    helper: "Aceitar ou recusar demandas recebidas.",
    route: "/app/recreador/convites",
  },
  {
    id: "disponibilidade",
    label: "Disponibilidade",
    helper: "Organizar bloqueios e compromissos futuros.",
    route: "/app/recreador/disponibilidade",
  },
  {
    id: "suporte",
    label: "Suporte",
    helper: "Abrir canal para duvidas operacionais.",
    route: "/app/recreador/suporte",
  },
] satisfies DashboardQuickAction[];

export const recreadorDashboardMock = {
  title: "Dashboard operacional do recreador",
  description:
    "Hub da operacao diaria com foco em pendencias, decisoes e proximos movimentos do modulo.",
  stats: [
    {
      title: "Pendencias agora",
      value: String(pendingActionsCount),
      helper: "Convites pendentes + conflitos",
    },
    {
      title: "Candidaturas em andamento",
      value: String(activeApplicationsRaw.length),
      helper: "Aguardando retorno",
    },
    {
      title: "Compromissos futuros",
      value: String(futureCommitments.length),
      helper: "Aceites e confirmacoes",
    },
    {
      title: "Avaliacao media",
      value: recreadorPerfilMock.dashboardReviewSummary.ratingAverage.toFixed(1),
      helper: `${recreadorPerfilMock.dashboardReviewSummary.totalReviews} avaliacoes`,
    },
  ],
  hero: {
    badge: "Hub operacional ativo",
    title: "Priorize suas proximas acoes",
    description:
      "Acompanhe o que exige resposta agora, mantenha disponibilidade sob controle e avance com seguranca nas oportunidades.",
    primaryAction,
    secondaryAction: {
      label: "Ajustar disponibilidade",
      route: "/app/recreador/disponibilidade",
    },
  },
  focusMessage:
    pendingActionsCount > 0
      ? `Voce tem ${pendingActionsCount} ponto(s) de atencao imediata no fluxo operacional.`
      : "Nenhuma pendencia critica no momento. Use o painel para orientar seu proximo passo.",
  priorities,
  quickActions,
  pendingInvites,
  featuredOpportunities,
  activeApplications,
  nextCommitments,
  availabilitySummary,
  recentReviews,
  alerts,
} as const;