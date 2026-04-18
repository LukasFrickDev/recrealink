import { recreadorConvitesMock } from "@/modules/recreador/mocks/convites";
import { recreadorDisponibilidadeMock } from "@/modules/recreador/mocks/disponibilidade";
import {
  recreadorOportunidadesMock,
  type OpportunityInviteStatus,
  type OpportunityOriginKind,
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
  originKind: OpportunityOriginKind;
  originName: string;
  roleLabel: string;
  periodLabel: string;
  deadlineLabel: string;
  route: string;
}

export interface FeaturedOpportunitySummary {
  id: string;
  code: string;
  originKind: OpportunityOriginKind;
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
    helper: "Decisões que exigem resposta imediata.",
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
    helper: "Itens enviados aguardando evolução.",
    tone: "info",
    action: {
      label: "Abrir oportunidades",
      route: "/app/recreador/oportunidades",
    },
  },
  {
    id: "proximos-compromissos",
    title: "Próximos compromissos",
    value: String(futureCommitments.length),
    helper: "Aceites e confirmações que impactam a agenda.",
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
    helper: "Sobreposições para revisar antes de novos aceites.",
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
  originKind: item.originKind,
  originName: item.originName,
  roleLabel: item.roleLabel,
  periodLabel: item.periodLabel,
  deadlineLabel: item.responseDeadlineLabel,
  route: "/app/recreador/convites",
})) satisfies PendingInviteSummary[];

const featuredOpportunities = highlightedOpportunitiesRaw.slice(0, 3).map((item) => ({
  id: item.id,
  code: item.code,
  originKind: item.originKind,
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
      ? "Convite recebido. A decisão fica em Convites."
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
    label: "Janelas disponíveis",
    value: String(availableSlotsCount),
    helper: "Espaços livres para novas oportunidades.",
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
    helper: "Aceites e confirmações já reservados.",
    tone: "warning",
  },
  {
    id: "conflitos",
    label: "Conflitos detectados",
    value: String(conflictSlotsCount),
    helper: "Revise sobreposições antes de assumir novos itens.",
    tone: conflictSlotsCount > 0 ? "danger" : "success",
  },
  {
    id: "recorrencias",
    label: "Recorrências ativas",
    value: String(activeRecurrenceCount),
    helper: "Padrões semanais ligados para previsibilidade.",
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
    message: `Completude atual em ${profileCompletionPercent}%. Ajustes no perfil aumentam relevância em oportunidades.`,
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
    title: "Operação sem pendências imediatas",
    message: "Dashboard sem alertas críticos no momento. Continue monitorando oportunidades e convites.",
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
    helper: "Atualizar reputação e vitrine pública.",
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
    helper: "Abrir canal para dúvidas operacionais.",
    route: "/app/recreador/suporte",
  },
] satisfies DashboardQuickAction[];

export const recreadorDashboardMock = {
  title: "Dashboard operacional do recreador",
  description:
    "Hub da operação diária com foco em pendências, decisões e próximos movimentos do módulo.",
  stats: [
    {
      title: "Pendências agora",
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
      helper: "Aceites e confirmações",
    },
    {
      title: "Avaliação média",
      value: recreadorPerfilMock.dashboardReviewSummary.ratingAverage.toFixed(1),
      helper: `${recreadorPerfilMock.dashboardReviewSummary.totalReviews} avaliações`,
    },
  ],
  hero: {
    badge: "Hub operacional ativo",
    title: "Priorize suas próximas ações",
    description:
      "Acompanhe o que exige resposta agora, mantenha a disponibilidade sob controle e avance com segurança nas oportunidades.",
    primaryAction,
    secondaryAction: {
      label: "Ajustar disponibilidade",
      route: "/app/recreador/disponibilidade",
    },
  },
  focusMessage:
    pendingActionsCount > 0
      ? `Você tem ${pendingActionsCount} ponto(s) de atenção imediata no fluxo operacional.`
      : "Nenhuma pendência crítica no momento. Use o painel para orientar seu próximo passo.",
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