import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ChatPageTemplate } from "@/shared/pages/ChatPageTemplate";
import { NotificationsPageTemplate } from "@/shared/pages/NotificationsPageTemplate";
import { unifiedChatPageByModule } from "@/shared/pages/UnifiedChatPage/data";
import { unifiedNotificationsPageByModule } from "@/shared/pages/UnifiedNotificationsPage/data";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("T3 - Chat e Notificacoes compartilhados", () => {
  it("usa respostas rapidas e so atualiza unread ao marcar a conversa como lida", async () => {
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
      expect(onUnreadCountChange).toHaveBeenLastCalledWith(5);
    });

    const composeInput = screen.getByPlaceholderText("Digite sua mensagem");
    const message = "Mensagem enviada em fluxo manual";

    await user.click(screen.getByRole("button", { name: /Posso confirmar ate o final do dia/i }));
    expect(composeInput).toHaveValue("Posso confirmar ate o final do dia.");
    await user.clear(composeInput);

    await user.type(composeInput, message);

    await user.click(screen.getByRole("button", { name: /Enviar/i }));

    expect(composeInput).toHaveValue("");
    expect(screen.getByText(message)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Tiago Souza/i }));

    await waitFor(() => {
      expect(onUnreadCountChange).toHaveBeenLastCalledWith(3);
    });

    await user.click(screen.getByRole("button", { name: /Marcar conversa como lida/i }));

    await waitFor(() => {
      expect(onUnreadCountChange).toHaveBeenLastCalledWith(1);
    });
  });

  it("permite responder por clique direito, enviar imagem e alterar status visivel", async () => {
    const user = userEvent.setup();
    const onOwnPresenceChange = vi.fn();

    renderWithProviders(
      <ChatPageTemplate
        data={unifiedChatPageByModule.recreador.templateData}
        tone="recreador"
        ownPresence="online"
        onOwnPresenceChange={onOwnPresenceChange}
      />,
      { route: "/app/recreador/chat" },
    );

    await user.click(screen.getByRole("button", { name: /Seu status visível/i }));
    await user.click(screen.getByRole("menuitemradio", { name: "Ocupado" }));

    expect(onOwnPresenceChange).toHaveBeenLastCalledWith("busy");

    const messageList = screen.getByLabelText("Mensagens da conversa");
    const targetMessage = within(messageList).getByText("Consegue confirmar disponibilidade para sábado?");

    fireEvent.contextMenu(targetMessage);

    await user.click(screen.getByRole("menuitem", { name: /Responder/i }));

    expect(screen.getByText(/Respondendo a Contato/i)).toBeInTheDocument();

    const imageInput = screen.getByTestId("chat-image-input");
    const imageFile = new File(["fake-image"], "comprovante.png", { type: "image/png" });

    await user.upload(imageInput, imageFile);

    expect(screen.getByText("comprovante.png")).toBeInTheDocument();

    const composeInput = screen.getByPlaceholderText("Digite sua mensagem");
    await user.type(composeInput, "Segue em anexo.");
    await user.click(screen.getByRole("button", { name: /Enviar/i }));

    expect(within(messageList).getByText("Segue em anexo.")).toBeInTheDocument();
    expect(within(messageList).getByAltText("comprovante.png")).toBeInTheDocument();
  });

  it("isola draft, reply e imagem por thread ao alternar conversas", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <ChatPageTemplate data={unifiedChatPageByModule.recreador.templateData} tone="recreador" />,
      { route: "/app/recreador/chat" },
    );

    const composeInput = screen.getByPlaceholderText("Digite sua mensagem");
    await user.type(composeInput, "Rascunho da Ana");

    const messageList = screen.getByLabelText("Mensagens da conversa");
    await user.click(
      within(messageList).getAllByRole("button", { name: /Responder mensagem de Contato/i })[0]!,
    );

    const imageInput = screen.getByTestId("chat-image-input");
    const imageFile = new File(["fake-image"], "ana-thread.png", { type: "image/png" });
    await user.upload(imageInput, imageFile);

    expect(screen.getByText(/Respondendo a Contato/i)).toBeInTheDocument();
    expect(screen.getByText("ana-thread.png")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Tiago Souza/i }));

    expect(screen.getByPlaceholderText("Digite sua mensagem")).toHaveValue("");
    expect(screen.queryByText(/Respondendo a Contato/i)).not.toBeInTheDocument();
    expect(screen.queryByText("ana-thread.png")).not.toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Digite sua mensagem"), "Rascunho do Tiago");
    await user.click(screen.getByRole("button", { name: /Ana Martins/i }));

    expect(screen.getByPlaceholderText("Digite sua mensagem")).toHaveValue("Rascunho da Ana");
    expect(screen.getByText(/Respondendo a Contato/i)).toBeInTheDocument();
    expect(screen.getByText("ana-thread.png")).toBeInTheDocument();
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

    expect(screen.getAllByText(/^Destino$/).length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /Marcar como lida/i })).not.toBeInTheDocument();
  });
});
