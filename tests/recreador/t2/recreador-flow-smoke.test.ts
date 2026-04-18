import { describe, expect, it } from "vitest";
import {
  applyToOpportunitySmokeState,
  createInitialRecreadorFlowSmokeState,
  getRecreadorFlowSmokeView,
  saveAvailabilitySmokeState,
  updateInviteStatusSmokeState,
  type CoreAvailabilitySnapshot,
  type RecreadorFlowSmokeState,
} from "@/app/store/slices/recreadorFlowSlice";

describe("T2 - Smoke do fluxo integrado", () => {
  it("mantem o fluxo de oportunidades, convites e disponibilidade coerente", () => {
    let state: RecreadorFlowSmokeState = createInitialRecreadorFlowSmokeState();
    let view = getRecreadorFlowSmokeView(state);

    expect(state.opportunities.length).toBeGreaterThan(0);
    expect(state.invites.filter((item) => item.status === "pendente").length).toBeGreaterThan(0);

    const applyOpen = applyToOpportunitySmokeState(state, "opp-htl-001");
    state = applyOpen.state;
    view = getRecreadorFlowSmokeView(state);

    expect(applyOpen.result.status).toBe("applied");

    const generatedInviteId =
      applyOpen.result.status === "applied" && applyOpen.result.generatedInvite
        ? applyOpen.result.generatedInvite.id
        : null;

    expect(generatedInviteId).toBeTruthy();

    const applyAgain = applyToOpportunitySmokeState(state, "opp-htl-001");
    expect(applyAgain.result.status).toBe("already-applied");

    const applyClosed = applyToOpportunitySmokeState(state, "opp-evt-003");
    expect(applyClosed.result.status).toBe("blocked");

    const acceptInvite = updateInviteStatusSmokeState(state, "invite-001", "aceito");
    state = acceptInvite.state;
    view = getRecreadorFlowSmokeView(state);

    const invite001 = state.invites.find((item) => item.id === "invite-001");
    const oppHtl002 = state.opportunities.find((item) => item.id === "opp-htl-002");
    const commitmentHtl002 = view.futureCommitments.find((item) => item.opportunityCode === "HTL-002");
    const slotHtl002 = state.availabilitySnapshot.slots.find(
      (slot) => slot.dateLabel === commitmentHtl002?.dateLabel && slot.state === "bloqueio-compromisso",
    );

    expect(acceptInvite.result.status).toBe("updated");
    expect(invite001?.status).toBe("aceito");
    expect(oppHtl002?.inviteStatus).toBe("convite-aceito");
    expect(oppHtl002?.lifecycleStatus).toBe("confirmada");
    expect(Boolean(commitmentHtl002 && slotHtl002)).toBe(true);

    if (generatedInviteId) {
      const recuseGenerated = updateInviteStatusSmokeState(state, generatedInviteId, "recusado");
      state = recuseGenerated.state;

      expect(recuseGenerated.result.status).toBe("updated");
      expect(state.invites.find((item) => item.id === generatedInviteId)?.status).toBe("recusado");
    }

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

    expect(conflictsAfterSave).toBeGreaterThan(snapshotBeforeConflict.conflicts.length);

    const resolvedSnapshot: CoreAvailabilitySnapshot = {
      ...state.availabilitySnapshot,
      manualBlocks: state.availabilitySnapshot.manualBlocks.filter((item) => item.id !== "smoke-block-htl-002"),
    };

    state = saveAvailabilitySmokeState(state, resolvedSnapshot);

    const hasConflictBlock = state.availabilitySnapshot.conflicts.some((item) =>
      item.id.includes("smoke-block-htl-002"),
    );

    expect(hasConflictBlock).toBe(false);
    expect(state.availabilitySnapshot.manualBlocks.every((item) => item.id !== "smoke-block-htl-002")).toBe(true);
  });
});
