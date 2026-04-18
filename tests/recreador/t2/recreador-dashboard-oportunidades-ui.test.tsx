import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RecreadorDashboardPage } from "@/modules/recreador/pages/dashboard";
import { RecreadorOportunidadesPage } from "@/modules/recreador/pages/oportunidades";
import { recreadorPerfilMock } from "@/modules/recreador/mocks/perfil";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("T2 - Dashboard e oportunidades (regras finais)", () => {
  it("remove mini dashboard no topo e mantem media em Avaliacoes recentes", () => {
    renderWithProviders(<RecreadorDashboardPage />, {
      route: "/app/recreador",
    });

    expect(screen.queryByText("Pendências agora")).not.toBeInTheDocument();
    expect(screen.queryByText("Avaliação média")).not.toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Avaliações recentes" })).toBeInTheDocument();
    expect(
      screen.getByText(`${recreadorPerfilMock.dashboardReviewSummary.totalReviews} avaliações`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(recreadorPerfilMock.dashboardReviewSummary.ratingAverage.toFixed(1)),
    ).toBeInTheDocument();
  });

  it("abre oportunidade sem modal de detalhe e sem duplicar bloco de detalhe", async () => {
    const user = userEvent.setup();

    renderWithProviders(<RecreadorOportunidadesPage />, {
      route: "/app/recreador/oportunidades?codigo=HTL-001",
    });

    const cardButton = screen.getByRole("button", {
      name: /Abrir oportunidade HTL-001/i,
    });

    await user.click(cardButton);

    expect(screen.queryByText(/Fechar detalhe/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Conflito de agenda detectado")).not.toBeInTheDocument();
    expect(screen.getByText(/Contexto global ativo/i)).toBeInTheDocument();
  });
});
