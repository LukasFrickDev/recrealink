import { expect, test } from "@playwright/test";

const routes = [
  "/app/recreador",
  "/app/recreador/perfil",
  "/app/recreador/perfil-publico",
  "/app/recreador/oportunidades",
  "/app/recreador/convites",
  "/app/recreador/disponibilidade",
  "/app/recreador/checklist",
  "/app/recreador/suporte",
  "/app/recreador/configuracoes",
  "/app/recreador/chat",
  "/app/recreador/notificacoes",
] as const;

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test(`T4 responsivo: paginas do recreador sem overflow em ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1").first()).toBeVisible();

      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });

      expect(
        hasHorizontalOverflow,
        `Encontrado overflow horizontal em ${route} no viewport ${viewport.name}`,
      ).toBeFalsy();
    }
  });
}

test("T4 oportunidades: abrir card atualiza contexto sem modal de detalhe", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/app/recreador/oportunidades");

  const cards = page.getByRole("button", { name: /Abrir oportunidade/i });
  const cardCount = await cards.count();
  test.skip(cardCount === 0, "Nenhum card de oportunidade encontrado no mock atual.");

  await cards.first().click();

  await expect(page).toHaveURL(/codigo=/);
  await expect(page.getByText("Fechar detalhe")).toHaveCount(0);
});

test("T4 modal de conflito em mobile nao quebra o layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/app/recreador/oportunidades");

  const applyButtons = page.getByRole("button", { name: /Candidatar-se/i });
  const applyCount = await applyButtons.count();
  test.skip(applyCount === 0, "Nenhum botao de candidatura disponivel para validar modal.");

  await applyButtons.first().click();

  const overflowAfterAction = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 1;
  });

  expect(overflowAfterAction).toBeFalsy();

  const conflictTitle = page.getByText("Conflito de agenda detectado").first();
  const conflictVisible = await conflictTitle.isVisible().catch(() => false);

  if (conflictVisible) {
    const box = await conflictTitle.boundingBox();
    expect(box).not.toBeNull();

    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(390 + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(844 + 1);
    }
  }
});
