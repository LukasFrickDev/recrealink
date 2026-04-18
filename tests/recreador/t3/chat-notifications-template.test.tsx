import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ChatPageTemplate } from "@/shared/pages/ChatPageTemplate";
import { NotificationsPageTemplate } from "@/shared/pages/NotificationsPageTemplate";
import { recreadorChatQuickReplies } from "@/shared/constants/chatQuickReplies";
import { unifiedChatPageByModule } from "@/shared/pages/UnifiedChatPage/data";
import { unifiedNotificationsPageByModule } from "@/shared/pages/UnifiedNotificationsPage/data";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("T3 - Chat e Notificacoes compartilhados", () => {
  it("aplica quick reply, envia mensagem e atualiza unread no chat", async () => {
    const user = userEvent.setup();
    const onUnreadCountChange = vi.fn();

    renderWithProviders(
      <ChatPageTemplate
        data={unifiedChatPageByModule.recreador.templateData}
        tone="recreador"
        onUnreadCountChange={onUnreadCountChange}
      />,
      { route: "/app/recreador/chat" },
    );

    await waitFor(() => {
      expect(onUnreadCountChange).toHaveBeenLastCalledWith(3);
    });

    const quickReply = recreadorChatQuickReplies[0];
    await user.click(screen.getByRole("button", { name: quickReply }));

    const composeInput = screen.getByPlaceholderText("Digite sua mensagem");
    expect(composeInput).toHaveValue(quickReply);

    await user.click(screen.getByRole("button", { name: /Enviar/i }));

    expect(composeInput).toHaveValue("");
    expect(screen.getAllByText(quickReply).length).toBeGreaterThanOrEqual(2);

    await user.click(screen.getByRole("button", { name: /Tiago Souza/i }));

    await waitFor(() => {
      expect(onUnreadCountChange).toHaveBeenLastCalledWith(1);
    });
  });

  it("marca notificacoes individualmente e em lote com callback de unread", async () => {
    const user = userEvent.setup();
    const onUnreadCountChange = vi.fn();

    renderWithProviders(
      <NotificationsPageTemplate
        data={unifiedNotificationsPageByModule.recreador.templateData}
        tone="recreador"
        onUnreadCountChange={onUnreadCountChange}
      />,
      { route: "/app/recreador/notificacoes" },
    );

    await waitFor(() => {
      expect(onUnreadCountChange).toHaveBeenLastCalledWith(3);
    });

    await user.click(screen.getAllByRole("button", { name: /Marcar como lida/i })[0]!);

    await waitFor(() => {
      expect(onUnreadCountChange).toHaveBeenLastCalledWith(2);
    });

    await user.click(screen.getByRole("button", { name: /Marcar tudo como lido/i }));

    await waitFor(() => {
      expect(onUnreadCountChange).toHaveBeenLastCalledWith(0);
    });

    expect(screen.queryByRole("button", { name: /Marcar como lida/i })).not.toBeInTheDocument();
  });
});
