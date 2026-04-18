import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("T5 - Gates de consolidacao final", () => {
  it("preserva scripts por fase e pipeline completa no package.json", () => {
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts["build"]).toBe("tsc -b && vite build");
    expect(packageJson.scripts["test:recreador:t1"]).toContain("vitest run tests/recreador/t1");
    expect(packageJson.scripts["test:recreador:t2"]).toContain("vitest run tests/recreador/t2");
    expect(packageJson.scripts["test:recreador:t3"]).toContain("vitest run tests/recreador/t3");
    expect(packageJson.scripts["test:recreador:t4"]).toContain("playwright test");
    expect(packageJson.scripts["test:recreador:t5"]).toContain("vitest run tests/recreador/t5");
    expect(packageJson.scripts["test:recreador:additional"]).toContain(
      "vitest run tests/recreador/additional",
    );
    expect(packageJson.scripts["test:recreador:all"]).toContain("test:recreador:t1");
    expect(packageJson.scripts["test:recreador:all"]).toContain("test:recreador:t5");
  });

  it("mantem estrutura de suites por fase e adicional", () => {
    const requiredPaths = [
      "tests/recreador/t1",
      "tests/recreador/t2",
      "tests/recreador/t3",
      "tests/recreador/t4",
      "tests/recreador/t5",
      "tests/recreador/additional",
      "vitest.config.ts",
      "playwright.config.ts",
      "tests/setup/vitest.setup.ts",
    ];

    requiredPaths.forEach((relativePath) => {
      const absolutePath = path.join(process.cwd(), relativePath);
      expect(fs.existsSync(absolutePath)).toBe(true);
    });
  });
});
