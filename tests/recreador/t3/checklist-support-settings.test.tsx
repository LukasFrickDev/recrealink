import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RecreadorChecklistPage } from "@/modules/recreador/pages/checklist";
import { RecreadorSupportPage } from "@/modules/recreador/pages/suporte";
import { RecreadorConfiguracoesPage } from "@/modules/recreador/pages/configuracoes";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("T3 - Checklist, Suporte e Configuracoes", () => {
  it("adiciona item no checklist operacional", async () => {
    const user = userEvent.setup();

    renderWithProviders(<RecreadorChecklistPage />, {
      route: "/app/recreador/checklist",
    });

    await user.type(
      screen.getByPlaceholderText("Ex.: Confirmar roteiro com a coordenação"),
      "Testar checklist em ambiente permanente",
    );

    await user.type(
      screen.getByPlaceholderText("Descreva rapidamente como validar este item"),
      "Executar o item e confirmar atualização visual na lista.",
    );

    await user.click(screen.getByRole("button", { name: "Adicionar item" }));

    expect(screen.getByText("Testar checklist em ambiente permanente")).toBeInTheDocument();
  });

  it("envia chamado no suporte quando formulario esta completo", async () => {
    const user = userEvent.setup();

    renderWithProviders(<RecreadorSupportPage />, {
      route: "/app/recreador/suporte",
    });

    await user.type(screen.getByPlaceholderText("Digite seu nome completo"), "Rafael QA");
    await user.type(screen.getByPlaceholderText("seu@email.com"), "rafael.qa@recrealink.com");

    await user.selectOptions(screen.getByRole("combobox"), "duvida-tecnica");

    await user.type(
      screen.getByPlaceholderText("Descreva com detalhes a dúvida, erro ou sugestão."),
      "Fluxo consolidado em teste permanente.",
    );

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(
      screen.getByText("Chamado enviado. Abra um novo chamado se precisar complementar informações."),
    ).toBeInTheDocument();
  });

  it("exibe feedback ao validar senha divergente nas configuracoes", async () => {
    const user = userEvent.setup();

    const { container } = renderWithProviders(<RecreadorConfiguracoesPage />, {
      route: "/app/recreador/configuracoes",
    });

    await user.click(screen.getByText("Segurança"));

    const passwordInputs = container.querySelectorAll("input[type='password']");
    expect(passwordInputs.length).toBe(3);

    await user.type(passwordInputs[0]!, "senha-atual");
    await user.type(passwordInputs[1]!, "nova-senha");
    await user.type(passwordInputs[2]!, "senha-diferente");

    await user.click(screen.getByRole("button", { name: "Atualizar segurança" }));

    expect(screen.getByText("A nova senha e a confirmação precisam ser iguais.")).toBeInTheDocument();
  });
});
