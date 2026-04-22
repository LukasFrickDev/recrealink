import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { UnifiedChatPage } from "@/shared/pages/UnifiedChatPage";
import { UnifiedNotificationsPage } from "@/shared/pages/UnifiedNotificationsPage";
import { renderWithProviders } from "../../utils/renderWithProviders";
import { createTestStore } from "../../utils/testStore";

describe("T3 - Sincronizacao de unread no shell", () => {
  it("mantem unread do chat ate que a conversa seja marcada como lida", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    renderWithProviders(<UnifiedChatPage moduleKey="recreador" />, {
      route: "/app/recreador/chat",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(5);
    });

    const messagesTopbarButton = screen.getByRole("button", { name: /Chat/i });
    expect(within(messagesTopbarButton).getByText("5")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Tiago Souza/i }));

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(5);
    });

    await user.click(screen.getByRole("button", { name: /Marcar conversa como lida/i }));

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(3);
    });

    expect(within(messagesTopbarButton).getByText("3")).toBeInTheDocument();
  });

  it("mantem o contador do chat apos abrir conversa e retornar para a tela", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    const firstRender = renderWithProviders(<UnifiedChatPage moduleKey="recreador" />, {
      route: "/app/recreador/chat",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(5);
    });

    await user.click(screen.getByRole("button", { name: /Tiago Souza/i }));
    await user.click(screen.getByRole("button", { name: /Marcar conversa como lida/i }));

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(3);
    });

    firstRender.unmount();

    renderWithProviders(<UnifiedChatPage moduleKey="recreador" />, {
      route: "/app/recreador/chat",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadMessages).toBe(3);
    });

    const messagesTopbarButton = screen.getByRole("button", { name: /Chat/i });

    expect(within(messagesTopbarButton).getByText("3")).toBeInTheDocument();
  });

  it("altera status visivel no aside e reflete no chat", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    renderWithProviders(<UnifiedChatPage moduleKey="recreador" />, {
      route: "/app/recreador/chat",
      store,
    });

    const profileTitle = screen.getByText("Rafael Santos");
    const profileCard = profileTitle.closest("section");
    expect(profileCard).not.toBeNull();

    if (!profileCard) {
      return;
    }

    expect(within(profileCard).getByText("Ativo agora")).toBeInTheDocument();

    await user.click(within(profileCard).getByRole("button", { name: /Status visível/i }));
    await user.click(screen.getByRole("menuitemradio", { name: "Offline" }));

    await waitFor(() => {
      expect(store.getState().mock.chatPresenceByModule.recreador).toBe("offline");
    });

    expect(within(profileCard).getByText("Offline", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Seu status visível: Offline/i })).toBeInTheDocument();
  });

  it("hidrata unread do chat e reinicia notificacoes no refresh de demo", () => {
    window.localStorage.setItem(
      "recrealink.chat.recreador",
      JSON.stringify([
        { id: "conv-1", unread: 1 },
        { id: "conv-2", unread: 0 },
      ]),
    );

    window.localStorage.setItem(
      "recrealink.notifications.recreador",
      JSON.stringify([
        { id: "n-1", read: false },
        { id: "n-2", read: true },
      ]),
    );

    const store = createTestStore();

    expect(store.getState().mock.unreadMessages).toBe(1);
    expect(store.getState().mock.unreadNotifications).toBe(3);
  });

  it("hidrata presença persistida antes de abrir shell e chat", () => {
    window.localStorage.setItem("recrealink.presence.recreador", "offline");

    const store = createTestStore();

    expect(store.getState().mock.chatPresenceByModule.recreador).toBe("offline");
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

  it("mantem o contador de notificacoes apos abrir item e retornar para a tela", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    const firstRender = renderWithProviders(<UnifiedNotificationsPage moduleKey="recreador" />, {
      route: "/app/recreador/notificacoes",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadNotifications).toBe(3);
    });

    const targetCard = screen.getByText("Nova vaga em hotel parceiro").closest("article");
    expect(targetCard).not.toBeNull();

    if (!targetCard) {
      return;
    }

    await user.click(within(targetCard).getByRole("button", { name: /Abrir oportunidades/i }));

    await waitFor(() => {
      expect(store.getState().mock.unreadNotifications).toBe(2);
    });

    firstRender.unmount();

    renderWithProviders(<UnifiedNotificationsPage moduleKey="recreador" />, {
      route: "/app/recreador/notificacoes",
      store,
    });

    await waitFor(() => {
      expect(store.getState().mock.unreadNotifications).toBe(2);
    });

    const notificationsTopbarButton = screen.getByRole("button", {
      name: /Notificações/i,
    });

    expect(within(notificationsTopbarButton).getByText("2")).toBeInTheDocument();
  });

  it("restaura notificacoes padrao ao recriar a store, simulando refresh", async () => {
    const user = userEvent.setup();
    const firstStore = createTestStore();

    const firstRender = renderWithProviders(<UnifiedNotificationsPage moduleKey="recreador" />, {
      route: "/app/recreador/notificacoes",
      store: firstStore,
    });

    await waitFor(() => {
      expect(firstStore.getState().mock.unreadNotifications).toBe(3);
    });

    await user.click(screen.getByRole("button", { name: /Marcar tudo como lido/i }));

    await waitFor(() => {
      expect(firstStore.getState().mock.unreadNotifications).toBe(0);
    });

    firstRender.unmount();

    const refreshedStore = createTestStore();

    renderWithProviders(<UnifiedNotificationsPage moduleKey="recreador" />, {
      route: "/app/recreador/notificacoes",
      store: refreshedStore,
    });

    await waitFor(() => {
      expect(refreshedStore.getState().mock.unreadNotifications).toBe(3);
    });
  });

  it("abre a thread correta ao entrar por deep link de contexto", async () => {
    const store = createTestStore();

    renderWithProviders(<UnifiedChatPage moduleKey="recreador" />, {
      route: "/app/recreador/chat?conversa=conv-2&contato=Lucas%20Pereira&origem=notificacoes",
      store,
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Mensagens da conversa")).toBeInTheDocument();
    });

    expect(
      within(screen.getByLabelText("Mensagens da conversa")).getByText(
        "Perfeito, te envio o briefing final hoje.",
      ),
    ).toBeInTheDocument();
  });
});
