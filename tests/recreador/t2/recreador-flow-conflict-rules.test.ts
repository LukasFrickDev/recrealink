import { describe, expect, it } from "vitest";
import {
  createInitialRecreadorFlowSmokeState,
  validateApplyToOpportunity,
  validateInviteStatusTransition,
  type RecreadorFlowSmokeState,
} from "@/app/store/slices/recreadorFlowSlice";

const cloneState = (state: RecreadorFlowSmokeState): RecreadorFlowSmokeState => ({
  opportunities: state.opportunities.map((item) => ({ ...item })),
  invites: state.invites.map((item) => ({ ...item, timeline: item.timeline.map((event) => ({ ...event })) })),
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

describe("T2 - Regras criticas de conflito", () => {
  it("detecta conflito na candidatura com compromisso confirmado", () => {
    const base = createInitialRecreadorFlowSmokeState();
    const state = withOpportunityPeriod(cloneState(base), "opp-htl-001", "18 Mai 2026", "Inicio em 18 Mai");

    const validation = validateApplyToOpportunity(state, "opp-htl-001");

    expect(validation.status).toBe("ready");
    if (validation.status === "ready") {
      expect(validation.commitmentConflictDetected).toBe(true);
    }
  });

  it("detecta conflito na borda de intervalo multi-dia na candidatura", () => {
    const base = createInitialRecreadorFlowSmokeState();
    const state: RecreadorFlowSmokeState = {
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

    const validation = validateApplyToOpportunity(state, "opp-htl-001");

    expect(validation.status).toBe("ready");
    if (validation.status === "ready") {
      expect(validation.commitmentConflictDetected).toBe(true);
    }
  });

  it("detecta conflito na candidatura com bloqueio manual", () => {
    const base = createInitialRecreadorFlowSmokeState();
    const state = withOpportunityPeriod(cloneState(base), "opp-evt-002", "19 Mai 2026", "Inicio em 19 Mai");

    const validation = validateApplyToOpportunity(state, "opp-evt-002");

    expect(validation.status).toBe("ready");
    if (validation.status === "ready") {
      expect(validation.commitmentConflictDetected).toBe(true);
    }
  });

  it("nao detecta conflito critico com recorrencia isolada na candidatura", () => {
    const base = createInitialRecreadorFlowSmokeState();
    const candidate = cloneState(base).opportunities.find((item) => item.id === "opp-htl-001");

    expect(candidate).toBeDefined();

    const state = withOpportunityPeriod(
      {
        ...cloneState(base),
        opportunities: [
          {
            ...candidate!,
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

    const validation = validateApplyToOpportunity(state, "opp-htl-001");

    expect(validation.status).toBe("ready");
    if (validation.status === "ready") {
      expect(validation.commitmentConflictDetected).toBe(false);
    }
  });

  it("detecta conflito no aceite com compromisso confirmado", () => {
    const base = createInitialRecreadorFlowSmokeState();
    const state = withOpportunityPeriod(cloneState(base), "opp-htl-002", "18 Mai 2026", "Inicio em 18 Mai");

    const validation = validateInviteStatusTransition(state, "invite-001", "aceito");

    expect(validation.status).toBe("ready");
    if (validation.status === "ready") {
      expect(validation.commitmentConflictDetected).toBe(true);
    }
  });

  it("detecta conflito no aceite com bloqueio manual", () => {
    const base = createInitialRecreadorFlowSmokeState();
    const state = withOpportunityPeriod(
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

    const validation = validateInviteStatusTransition(state, "invite-001", "aceito");

    expect(validation.status).toBe("ready");
    if (validation.status === "ready") {
      expect(validation.commitmentConflictDetected).toBe(true);
    }
  });

  it("nao detecta conflito critico com recorrencia isolada no aceite", () => {
    const base = createInitialRecreadorFlowSmokeState();
    const opportunity = cloneState(base).opportunities.find((item) => item.id === "opp-htl-002");
    const invite = cloneState(base).invites.find((item) => item.id === "invite-001");

    expect(opportunity).toBeDefined();
    expect(invite).toBeDefined();

    const state: RecreadorFlowSmokeState = {
      opportunities: [
        {
          ...opportunity!,
          periodLabel: "18 Mai 2026",
          startDateLabel: "Inicio em 18 Mai",
          lifecycleStatus: "aberta",
          inviteStatus: "convite-recebido",
        },
      ],
      invites: [
        {
          ...invite!,
          status: "pendente",
          timeline: invite!.timeline.map((event) => ({ ...event })),
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

    const validation = validateInviteStatusTransition(state, "invite-001", "aceito");

    expect(validation.status).toBe("ready");
    if (validation.status === "ready") {
      expect(validation.commitmentConflictDetected).toBe(false);
    }
  });
});
