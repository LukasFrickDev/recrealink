import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const scenarioMap = {
  critical: [
    "dashboard-principal",
    "oportunidades-candidatura",
    "convites-aceite",
    "disponibilidade-conflitos",
    "chat-notificacoes-unread",
  ],
  complementary: [
    "checklist-operacional",
    "suporte-formulario",
    "configuracoes-seguranca",
    "perfil-publico-snapshot",
    "toast-feedback-position",
  ],
  shared: [
    "module-dashboard-shell",
    "settings-template",
    "chat-template",
    "notifications-template",
  ],
} as const;

const recreadorRoutes = [
  "/app/recreador",
  "/app/recreador/perfil",
  "/app/recreador/perfil-publico",
  "/app/recreador/disponibilidade",
  "/app/recreador/oportunidades",
  "/app/recreador/convites",
  "/app/recreador/checklist",
  "/app/recreador/suporte",
  "/app/recreador/chat",
  "/app/recreador/notificacoes",
  "/app/recreador/configuracoes",
] as const;

const requiredFiles = [
  "src/modules/recreador/pages/dashboard/index.tsx",
  "src/modules/recreador/pages/oportunidades/index.tsx",
  "src/modules/recreador/pages/convites/index.tsx",
  "src/modules/recreador/pages/disponibilidade/index.tsx",
  "src/modules/recreador/pages/checklist/index.tsx",
  "src/modules/recreador/pages/suporte/index.tsx",
  "src/modules/recreador/pages/configuracoes/index.tsx",
  "src/modules/recreador/pages/perfil/index.tsx",
  "src/modules/recreador/pages/perfil-publico/index.tsx",
  "src/shared/pages/UnifiedChatPage/index.tsx",
  "src/shared/pages/UnifiedNotificationsPage/index.tsx",
] as const;

describe("T1 - Mapa de cenarios do modulo Recreador", () => {
  it("mantem cenarios criticos/complementares/compartilhados sem duplicidade", () => {
    const allScenarios = [
      ...scenarioMap.critical,
      ...scenarioMap.complementary,
      ...scenarioMap.shared,
    ];

    expect(scenarioMap.critical.length).toBeGreaterThan(0);
    expect(scenarioMap.complementary.length).toBeGreaterThan(0);
    expect(scenarioMap.shared.length).toBeGreaterThan(0);
    expect(new Set(allScenarios).size).toBe(allScenarios.length);
  });

  it("preserva inventario de rotas do Recreador no AppRouter", () => {
    const routerPath = path.join(process.cwd(), "src/routes/AppRouter.tsx");
    const routerSource = fs.readFileSync(routerPath, "utf8");

    recreadorRoutes.forEach((routePath) => {
      expect(routerSource).toContain(`path=\"${routePath}\"`);
    });
  });

  it("garante presenca dos arquivos-base para cobertura por fases", () => {
    requiredFiles.forEach((filePath) => {
      const absolutePath = path.join(process.cwd(), filePath);
      expect(fs.existsSync(absolutePath)).toBe(true);
    });
  });
});
