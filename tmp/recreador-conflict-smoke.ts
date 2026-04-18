import {
  createInitialRecreadorFlowSmokeState,
  validateApplyToOpportunity,
  validateInviteStatusTransition,
  type RecreadorFlowSmokeState,
} from "../src/app/store/slices/recreadorFlowSlice";

type SmokeStatus = "Passou" | "Falhou";

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

const cloneState = (state: RecreadorFlowSmokeState): RecreadorFlowSmokeState => ({
  opportunities: state.opportunities.map((item) => ({ ...item })),
  invites: state.invites.map((item) => ({
    ...item,
    timeline: item.timeline.map((event: (typeof item.timeline)[number]) => ({ ...event })),
  })),
  availabilitySnapshot: {
    slots: state.availabilitySnapshot.slots.map((item) => ({ ...item })),
    manualBlocks: state.availabilitySnapshot.manualBlocks.map((item) => ({ ...item })),
    recurrenceRules: state.availabilitySnapshot.recurrenceRules.map((item) => ({ ...item })),
    conflicts: state.availabilitySnapshot.conflicts.map((item) => ({ ...item })),
  },
});

const withOpportunityPeriod = (
  state: RecreadorFlowSmokeState,
  opportunityId: string,
  periodLabel: string,
  startDateLabel: string,
): RecreadorFlowSmokeState => ({
  ...state,
  opportunities: state.opportunities.map((item) =>
    item.id === opportunityId
      ? {
          ...item,
          periodLabel,
          startDateLabel,
        }
      : item,
  ),
});

const run = () => {
  const base = createInitialRecreadorFlowSmokeState();

  const applyCommitmentState = withOpportunityPeriod(
    cloneState(base),
    "opp-htl-001",
    "18 Mai 2026",
    "Inicio em 18 Mai",
  );
  const applyCommitmentValidation = validateApplyToOpportunity(applyCommitmentState, "opp-htl-001");
  pushResult(
    "Candidatura abre modal com compromisso confirmado",
    applyCommitmentValidation.status === "ready" && applyCommitmentValidation.commitmentConflictDetected,
    "Conflito critico detectado antes da candidatura por compromisso confirmado.",
    "Conflito critico nao detectado na candidatura com compromisso confirmado.",
  );

  const applyBoundaryRangeState: RecreadorFlowSmokeState = {
    ...cloneState(base),
    opportunities: cloneState(base).opportunities.map((item) =>
      item.id === "opp-htl-001"
        ? {
            ...item,
            type: "evento-corporativo",
            periodLabel: "22 Mai a 25 Mai 2026",
            startDateLabel: "Inicio em 22 Mai",
          }
        : item,
    ),
  };
  const applyBoundaryRangeValidation = validateApplyToOpportunity(
    applyBoundaryRangeState,
    "opp-htl-001",
  );
  pushResult(
    "Candidatura detecta sobreposicao de intervalo na borda",
    applyBoundaryRangeValidation.status === "ready" &&
      applyBoundaryRangeValidation.commitmentConflictDetected,
    "Conflito critico detectado com intersecao na borda do intervalo (dia compartilhado).",
    "Conflito critico nao detectado na intersecao da borda do intervalo.",
  );

  const applyManualBlockState = withOpportunityPeriod(
    cloneState(base),
    "opp-evt-002",
    "19 Mai 2026",
    "Inicio em 19 Mai",
  );
  const applyManualBlockValidation = validateApplyToOpportunity(applyManualBlockState, "opp-evt-002");
  pushResult(
    "Candidatura abre modal com bloqueio manual",
    applyManualBlockValidation.status === "ready" && applyManualBlockValidation.commitmentConflictDetected,
    "Conflito critico detectado antes da candidatura por bloqueio manual.",
    "Conflito critico nao detectado na candidatura com bloqueio manual.",
  );

  const applyRecurrenceOnlyState = withOpportunityPeriod(
    {
      ...cloneState(base),
      opportunities: [
        {
          ...cloneState(base).opportunities.find((item) => item.id === "opp-htl-001")!,
          applicationStatus: "disponivel",
          lifecycleStatus: "aberta",
          inviteStatus: "nenhum",
        },
      ],
      invites: [],
      availabilitySnapshot: {
        slots: [],
        manualBlocks: [],
        recurrenceRules: [
          {
            id: "rec-only-1",
            weekdayLabel: "Segunda-feira",
            period: "noite",
            startTime: "18:00",
            endTime: "21:00",
            mode: "disponivel",
            enabled: true,
          },
        ],
        conflicts: [],
      },
    },
    "opp-htl-001",
    "18 Mai 2026",
    "Inicio em 18 Mai",
  );
  const applyRecurrenceOnlyValidation = validateApplyToOpportunity(
    applyRecurrenceOnlyState,
    "opp-htl-001",
  );
  pushResult(
    "Candidatura nao dispara conflito critico com recorrencia isolada",
    applyRecurrenceOnlyValidation.status === "ready" && !applyRecurrenceOnlyValidation.commitmentConflictDetected,
    "Recorrencia isolada nao bloqueou candidatura e nao abriu conflito critico.",
    "Recorrencia isolada disparou conflito critico indevidamente na candidatura.",
  );

  const acceptCommitmentState = withOpportunityPeriod(
    cloneState(base),
    "opp-htl-002",
    "18 Mai 2026",
    "Inicio em 18 Mai",
  );
  const acceptCommitmentValidation = validateInviteStatusTransition(
    acceptCommitmentState,
    "invite-001",
    "aceito",
  );
  pushResult(
    "Aceite abre modal com compromisso confirmado",
    acceptCommitmentValidation.status === "ready" && acceptCommitmentValidation.commitmentConflictDetected,
    "Conflito critico detectado antes do aceite por compromisso confirmado.",
    "Conflito critico nao detectado no aceite com compromisso confirmado.",
  );

  const acceptManualBlockState = withOpportunityPeriod(
    {
      ...cloneState(base),
      availabilitySnapshot: {
        ...cloneState(base).availabilitySnapshot,
        manualBlocks: [
          ...cloneState(base).availabilitySnapshot.manualBlocks,
          {
            id: "manual-conflict-invite",
            dateLabel: "19 Mai 2026",
            period: "noite",
            startTime: "18:30",
            endTime: "20:00",
            reason: "Teste de conflito no aceite",
          },
        ],
      },
    },
    "opp-htl-002",
    "19 Mai 2026",
    "Inicio em 19 Mai",
  );
  const acceptManualBlockValidation = validateInviteStatusTransition(
    acceptManualBlockState,
    "invite-001",
    "aceito",
  );
  pushResult(
    "Aceite abre modal com bloqueio manual",
    acceptManualBlockValidation.status === "ready" && acceptManualBlockValidation.commitmentConflictDetected,
    "Conflito critico detectado antes do aceite por bloqueio manual.",
    "Conflito critico nao detectado no aceite com bloqueio manual.",
  );

  const recurrenceOnlyOpportunity = cloneState(base).opportunities.find((item) => item.id === "opp-htl-002");
  const recurrenceOnlyInvite = cloneState(base).invites.find((item) => item.id === "invite-001");

  if (!recurrenceOnlyOpportunity || !recurrenceOnlyInvite) {
    pushResult(
      "Aceite nao dispara conflito critico com recorrencia isolada",
      false,
      "",
      "Dados base para validar recorrencia isolada no aceite nao encontrados.",
    );
  } else {
    const acceptRecurrenceOnlyState: RecreadorFlowSmokeState = {
      opportunities: [
        {
          ...recurrenceOnlyOpportunity,
          periodLabel: "18 Mai 2026",
          startDateLabel: "Inicio em 18 Mai",
          lifecycleStatus: "aberta",
          inviteStatus: "convite-recebido",
        },
      ],
      invites: [
        {
          ...recurrenceOnlyInvite,
          status: "pendente",
          timeline: recurrenceOnlyInvite.timeline.map(
            (event: (typeof recurrenceOnlyInvite.timeline)[number]) => ({ ...event }),
          ),
        },
      ],
      availabilitySnapshot: {
        slots: [],
        manualBlocks: [],
        recurrenceRules: [
          {
            id: "rec-only-2",
            weekdayLabel: "Segunda-feira",
            period: "noite",
            startTime: "18:00",
            endTime: "21:00",
            mode: "disponivel",
            enabled: true,
          },
        ],
        conflicts: [],
      },
    };

    const acceptRecurrenceOnlyValidation = validateInviteStatusTransition(
      acceptRecurrenceOnlyState,
      "invite-001",
      "aceito",
    );

    pushResult(
      "Aceite nao dispara conflito critico com recorrencia isolada",
      acceptRecurrenceOnlyValidation.status === "ready" &&
        !acceptRecurrenceOnlyValidation.commitmentConflictDetected,
      "Recorrencia isolada nao bloqueou aceite e nao abriu conflito critico.",
      "Recorrencia isolada disparou conflito critico indevidamente no aceite.",
    );
  }

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
};

run();
