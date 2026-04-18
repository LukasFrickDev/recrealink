import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { UnifiedChatPage } from "@/shared/pages/UnifiedChatPage";
import { UnifiedNotificationsPage } from "@/shared/pages/UnifiedNotificationsPage";
import { renderWithProviders } from "../../utils/renderWithProviders";
import { createTestStore } from "../../utils/testStore";

describe("T3 - Sincronizacao de unread no shell", () => {
  it("sincroniza unread do chat no estado global e no contador da topbar", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    renderWithProviders(<UnifiedChatPage moduleKey="recreador" />, {
      route: "/app/recreador/chat",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(3);
    });

    const messagesTopbarButton = screen.getByRole("button", { name: /Chat/i });
    expect(within(messagesTopbarButton).getByText("3")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Tiago Souza/i }));

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(1);
    });

    expect(within(messagesTopbarButton).getByText("1")).toBeInTheDocument();
  });

  it("sincroniza unread das notificacoes no estado global e na topbar", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    renderWithProviders(<UnifiedNotificationsPage moduleKey="recreador" />, {
      route: "/app/recreador/notificacoes",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadNotifications).toBe(3);
    });

    const notificationsTopbarButton = screen.getByRole("button", {
      name: /Notificações/i,
    });

    expect(within(notificationsTopbarButton).getByText("3")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Marcar tudo como lido/i }));

    await waitFor(() => {
      expect(store.getState().mock.unreadNotifications).toBe(0);
    });

    expect(within(notificationsTopbarButton).queryByText("3")).not.toBeInTheDocument();
  });
});
