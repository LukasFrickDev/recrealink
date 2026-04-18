import {
  applyToOpportunitySmokeState,
  createInitialRecreadorFlowSmokeState,
  getRecreadorFlowSmokeView,
  saveAvailabilitySmokeState,
  updateInviteStatusSmokeState,
  type CoreAvailabilitySnapshot,
  type RecreadorFlowSmokeState,
} from "../src/app/store/slices/recreadorFlowSlice";

type SmokeStatus = "Passou" | "Falhou" | "Parcial";

type SmokeResult = {
  scenario: string;
  status: SmokeStatus;
  details: string;
};

const results: SmokeResult[] = [];

const pushResult = (scenario: string, ok: boolean, passDetail: string, failDetail: string) => {
  results.push({
    scenario,
    status: ok ? "Passou" : "Falhou",
    details: ok ? passDetail : failDetail,
  });
};

let state: RecreadorFlowSmokeState = createInitialRecreadorFlowSmokeState();
let view = getRecreadorFlowSmokeView(state);

pushResult(
  "Visualizar oportunidades no nucleo",
  state.opportunities.length > 0,
  `Base carregada com ${state.opportunities.length} oportunidades.`,
  "Nenhuma oportunidade encontrada na base integrada.",
);

const initialPendingInvites = state.invites.filter((item) => item.status === "pendente").length;
pushResult(
  "Visualizar convites pendentes",
  initialPendingInvites > 0,
  `Ha ${initialPendingInvites} convite(s) pendente(s) na base inicial.`,
  "Nao ha convites pendentes para decisao no estado inicial.",
);

const applyOpen = applyToOpportunitySmokeState(state, "opp-htl-001");
state = applyOpen.state;
view = getRecreadorFlowSmokeView(state);

pushResult(
  "Candidatar-se em oportunidade aberta",
  applyOpen.result.status === "applied",
  "Candidatura aplicada com sucesso em oportunidade aberta.",
  `Aplicacao nao concluida: ${applyOpen.result.status}.`,
);

const generatedInviteId =
  applyOpen.result.status === "applied" && applyOpen.result.generatedInvite
    ? applyOpen.result.generatedInvite.id
    : null;

pushResult(
  "Refletir candidatura em Convites (quando aplicavel no mock)",
  generatedInviteId !== null,
  `Convite ${generatedInviteId} foi gerado apos candidatura.`,
  "Nenhum convite foi gerado para a candidatura aplicada.",
);

const applyAgain = applyToOpportunitySmokeState(state, "opp-htl-001");
pushResult(
  "Bloqueio de candidatura duplicada",
  applyAgain.result.status === "already-applied",
  "Candidatura duplicada foi bloqueada corretamente.",
  `Candidatura duplicada nao foi bloqueada (status ${applyAgain.result.status}).`,
);

const applyClosed = applyToOpportunitySmokeState(state, "opp-evt-003");
pushResult(
  "Bloqueio de candidatura em oportunidade fechada",
  applyClosed.result.status === "blocked",
  "Candidatura em oportunidade fechada foi bloqueada corretamente.",
  `Candidatura em oportunidade fechada retornou ${applyClosed.result.status}.`,
);

const acceptInvite = updateInviteStatusSmokeState(state, "invite-001", "aceito");
state = acceptInvite.state;
view = getRecreadorFlowSmokeView(state);

const invite001 = state.invites.find((item) => item.id === "invite-001");
const oppHtl002 = state.opportunities.find((item) => item.id === "opp-htl-002");
const commitmentHtl002 = view.futureCommitments.find((item) => item.opportunityCode === "HTL-002");
const slotHtl002 = state.availabilitySnapshot.slots.find(
  (slot) => slot.dateLabel === commitmentHtl002?.dateLabel && slot.state === "bloqueio-compromisso",
);

pushResult(
  "Aceitar convite e atualizar status",
  acceptInvite.result.status === "updated" && invite001?.status === "aceito",
  "Convite foi aceito e status atualizado para aceito.",
  "Convite nao foi atualizado para aceito.",
);

pushResult(
  "Sincronizar oportunidade apos aceite",
  oppHtl002?.inviteStatus === "convite-aceito" && oppHtl002.lifecycleStatus === "confirmada",
  "Oportunidade relacionada foi marcada como convite aceito e confirmada.",
  "Oportunidade relacionada nao refletiu corretamente o aceite.",
);

pushResult(
  "Refletir aceite na disponibilidade/agenda",
  Boolean(commitmentHtl002 && slotHtl002),
  "Aceite gerou compromisso e bloqueio por compromisso na agenda.",
  "Aceite nao gerou reflexo completo na agenda integrada.",
);

let recuseWorked = false;
if (generatedInviteId) {
  const recuseGenerated = updateInviteStatusSmokeState(state, generatedInviteId, "recusado");
  state = recuseGenerated.state;
  recuseWorked =
    recuseGenerated.result.status === "updated" &&
    state.invites.find((item) => item.id === generatedInviteId)?.status === "recusado";
}

pushResult(
  "Recusar convite e manter historico",
  recuseWorked,
  "Recusa aplicada e historico de convite atualizado.",
  "Recusa nao foi registrada corretamente no convite gerado.",
);

const snapshotBeforeConflict: CoreAvailabilitySnapshot = {
  slots: state.availabilitySnapshot.slots.map((item) => ({ ...item })),
  manualBlocks: state.availabilitySnapshot.manualBlocks.map((item) => ({ ...item })),
  recurrenceRules: state.availabilitySnapshot.recurrenceRules.map((item) => ({ ...item })),
  conflicts: state.availabilitySnapshot.conflicts.map((item) => ({ ...item })),
};

const conflictBlock = {
  id: "smoke-block-htl-002",
  dateLabel: commitmentHtl002?.dateLabel ?? "05 Mai 2026",
  period: "noite" as const,
  startTime: commitmentHtl002?.startTime ?? "18:00",
  endTime: commitmentHtl002?.endTime ?? "22:00",
  reason: "Smoke conflito manual",
};

const conflictSnapshot: CoreAvailabilitySnapshot = {
  ...snapshotBeforeConflict,
  manualBlocks: [...snapshotBeforeConflict.manualBlocks, conflictBlock],
};

state = saveAvailabilitySmokeState(state, conflictSnapshot);
const conflictsAfterSave = state.availabilitySnapshot.conflicts.length;

pushResult(
  "Detectar conflito apos bloqueio manual sobre compromisso aceito",
  conflictsAfterSave > snapshotBeforeConflict.conflicts.length,
  `Conflitos aumentaram de ${snapshotBeforeConflict.conflicts.length} para ${conflictsAfterSave}.`,
  "Nenhum novo conflito foi detectado apos sobreposicao manual.",
);

const resolvedSnapshot: CoreAvailabilitySnapshot = {
  ...state.availabilitySnapshot,
  manualBlocks: state.availabilitySnapshot.manualBlocks.filter((item) => item.id !== "smoke-block-htl-002"),
};

state = saveAvailabilitySmokeState(state, resolvedSnapshot);
const hasConflictBlock = state.availabilitySnapshot.conflicts.some((item) => item.id.includes("smoke-block-htl-002"));

pushResult(
  "Resolver conflito removendo bloqueio manual",
  !hasConflictBlock,
  "Conflito do bloqueio manual removido deixou de aparecer na agenda.",
  "Conflito permaneceu mesmo apos remover bloqueio manual.",
);

pushResult(
  "Salvar disponibilidade integrada",
  state.availabilitySnapshot.manualBlocks.every((item) => item.id !== "smoke-block-htl-002"),
  "Snapshot salvo e persistido na fonte unica de verdade do nucleo.",
  "Snapshot salvo nao refletiu o estado final esperado.",
);

const failed = results.filter((item) => item.status === "Falhou").length;

console.log(
  JSON.stringify(
    {
      failed,
      results,
    },
    null,
    2,
  ),
);

if (failed > 0) {
  process.exitCode = 1;
}
