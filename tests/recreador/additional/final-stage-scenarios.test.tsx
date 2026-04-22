import fs from "node:fs";
import path from "node:path";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  createInitialRecreadorFlowSmokeState,
  getRecreadorFlowSmokeView,
  updateInviteStatusSmokeState,
  validateApplyToOpportunity,
  validateInviteStatusTransition,
  type RecreadorFlowSmokeState,
} from "@/app/store/slices/recreadorFlowSlice";
import { RecreadorDashboardPage } from "@/modules/recreador/pages/dashboard";
import { RecreadorOportunidadesPage } from "@/modules/recreador/pages/oportunidades";
import { RecreadorConfiguracoesPage } from "@/modules/recreador/pages/configuracoes";
import { RecreadorPerfilPublicoPage } from "@/modules/recreador/pages/perfil-publico";
import { UnifiedChatPage } from "@/shared/pages/UnifiedChatPage";
import { UnifiedNotificationsPage } from "@/shared/pages/UnifiedNotificationsPage";
import { renderWithProviders } from "../../utils/renderWithProviders";
import { createTestStore } from "../../utils/testStore";

const PUBLIC_PROFILE_SNAPSHOT_STORAGE_KEY = "recreador.public-profile-snapshot.v1";

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

const collectSourceFiles = (directory: string): string[] => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const absolute = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectSourceFiles(absolute);
    }

    if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      return [absolute];
    }

    return [];
  });
};

describe("Cenarios adicionais - Consolidacao final Recreador", () => {
  it("dashboard principal sem mini stats e com avaliacao no bloco de avaliacoes", () => {
    renderWithProviders(<RecreadorDashboardPage />, {
      route: "/app/recreador",
    });

    expect(screen.queryByText("Pendências agora")).not.toBeInTheDocument();
    expect(screen.queryByText("Avaliação média")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Avaliações recentes" })).toBeInTheDocument();
  });

  it("oportunidades abre contexto por codigo sem modal de abertura indevido", async () => {
    const user = userEvent.setup();

    renderWithProviders(<RecreadorOportunidadesPage />, {
      route: "/app/recreador/oportunidades?codigo=HTL-001",
    });

    await user.click(screen.getByRole("button", { name: /Abrir oportunidade HTL-001/i }));

    expect(screen.queryByText(/Fechar detalhe/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Conflito de agenda detectado")).not.toBeInTheDocument();
  });

  it("aplica conflito por intervalo completo e fronteira em candidatura e aceite", () => {
    const base = createInitialRecreadorFlowSmokeState();

    const rangedState: RecreadorFlowSmokeState = {
      ...cloneState(base),
      opportunities: cloneState(base).opportunities.map((item) => {
        if (item.id === "opp-htl-001") {
          return {
            ...item,
            type: "evento-corporativo",
            periodLabel: "22 Mai a 25 Mai 2026",
            startDateLabel: "Inicio em 22 Mai",
          };
        }

        if (item.id === "opp-htl-002") {
          return {
            ...item,
            periodLabel: "22 Mai a 25 Mai 2026",
            startDateLabel: "Inicio em 22 Mai",
          };
        }

        return item;
      }),
    };

    const applyValidation = validateApplyToOpportunity(rangedState, "opp-htl-001");
    const inviteValidation = validateInviteStatusTransition(rangedState, "invite-001", "aceito");

    expect(applyValidation.status).toBe("ready");
    expect(inviteValidation.status).toBe("ready");

    if (applyValidation.status === "ready") {
      expect(applyValidation.commitmentConflictDetected).toBe(true);
    }

    if (inviteValidation.status === "ready") {
      expect(inviteValidation.commitmentConflictDetected).toBe(true);
    }
  });

  it("sincroniza aceite com disponibilidade em todos os dias do intervalo", () => {
    const base = createInitialRecreadorFlowSmokeState();

    const rangedState: RecreadorFlowSmokeState = {
      ...cloneState(base),
      opportunities: cloneState(base).opportunities.map((item) =>
        item.id === "opp-htl-002"
          ? {
              ...item,
              periodLabel: "22 Mai a 25 Mai 2026",
              startDateLabel: "Inicio em 22 Mai",
            }
          : item,
      ),
    };

    const accepted = updateInviteStatusSmokeState(rangedState, "invite-001", "aceito");
    const view = getRecreadorFlowSmokeView(accepted.state);

    const commitments = view.futureCommitments.filter(
      (item) => item.opportunityCode === "HTL-002" && item.status === "confirmado",
    );

    const commitmentDateSet = new Set(commitments.map((item) => item.dateLabel));
    const commitmentSlots = accepted.state.availabilitySnapshot.slots.filter(
      (slot) => slot.state === "bloqueio-compromisso" && commitmentDateSet.has(slot.dateLabel),
    );
    const coveredDates = new Set(commitmentSlots.map((slot) => slot.dateLabel));

    expect(commitments.length).toBe(4);
    expect(commitmentSlots.length).toBeGreaterThanOrEqual(4);
    expect(coveredDates.size).toBe(4);
    expect(commitmentSlots.every((slot) => slot.helper.includes("Compromisso vindo de convite aceito"))).toBe(
      true,
    );
  });

  it("mantem perfil/configuracoes/perfil publico sincronizados em fonte unica", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    window.localStorage.setItem(
      PUBLIC_PROFILE_SNAPSHOT_STORAGE_KEY,
      JSON.stringify({
        displayName: "Nome antigo localStorage",
        roleLabel: "Cargo antigo",
        headline: "Headline antiga",
        bio: "Bio antiga",
        city: "Cidade antiga",
        specialties: ["Especialidade antiga"],
        ageGroups: ["4 a 6 anos"],
        cacheRangeLabel: "A partir de R$ 200",
        portfolioLinks: ["https://exemplo-antigo.com"],
        updatedAt: new Date().toISOString(),
      }),
    );

    const { unmount } = renderWithProviders(<RecreadorConfiguracoesPage />, {
      route: "/app/recreador/configuracoes",
      store,
    });

    const fullNameInput = screen.getByDisplayValue(store.getState().recreador.profile.fullName);

    await user.clear(fullNameInput);
    await user.type(fullNameInput, "Nome Consolidado QA");
    await user.click(screen.getByRole("button", { name: /Salvar dados do perfil/i }));

    expect(store.getState().recreador.profile.fullName).toBe("Nome Consolidado QA");

    unmount();

    renderWithProviders(<RecreadorPerfilPublicoPage />, {
      route: "/app/recreador/perfil-publico",
      store,
    });

    expect(screen.getByRole("heading", { name: "Nome Consolidado QA" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Nome antigo localStorage/i })).not.toBeInTheDocument();
  });

  it("sincroniza unread entre chat/notificacoes/shell sem contexto quebrado", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    const chatRender = renderWithProviders(<UnifiedChatPage moduleKey="recreador" />, {
      route: "/app/recreador/chat",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(5);
    });

    chatRender.unmount();

    renderWithProviders(<UnifiedNotificationsPage moduleKey="recreador" />, {
      route: "/app/recreador/notificacoes",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadNotifications).toBe(3);
    });

    await user.click(screen.getByRole("button", { name: /Marcar tudo como lido/i }));

    await waitFor(() => {
      expect(store.getState().mock.unreadNotifications).toBe(0);
    });
  }, 10000);

  it("garante ausencia de referencias mortas, alert() e regressao de toast", () => {
    const recreadorSourceFiles = collectSourceFiles(path.join(process.cwd(), "src/modules/recreador"));
    const sharedSourceFiles = collectSourceFiles(path.join(process.cwd(), "src/shared"));
    const source = [...recreadorSourceFiles, ...sharedSourceFiles]
      .map((filePath) => fs.readFileSync(filePath, "utf8"))
      .join("\n");

    const toastStyleSource = fs.readFileSync(
      path.join(process.cwd(), "src/shared/ui/Toast/styles.ts"),
      "utf8",
    );

    expect(source).not.toMatch(/\balert\s*\(/);
    expect(source).not.toContain("RecreadorCoreFlowContext");
    expect(toastStyleSource).toContain("right: 0.95rem");
    expect(toastStyleSource).toContain("bottom: 0.95rem");
  });
});
