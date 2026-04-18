import fs from "node:fs";
import path from "node:path";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { useToast } from "@/shared/ui/Toast";
import { renderWithProviders } from "../../utils/renderWithProviders";

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

const ToastTrigger = () => {
  const { info } = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        info({
          title: "Teste de viewport",
          description: "Confirmando posicionamento do toast no canto inferior direito.",
        })
      }
    >
      Disparar toast
    </button>
  );
};

describe("T3 - Toast e guardrails tecnicos", () => {
  it("mantem o toast no canto inferior direito", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ToastTrigger />);

    await user.click(screen.getByRole("button", { name: "Disparar toast" }));

    expect(screen.getByText("Teste de viewport")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();

    const styleSource = Array.from(document.head.querySelectorAll("style"))
      .map((styleElement) => styleElement.textContent ?? "")
      .join("\n");

    expect(styleSource).toMatch(/top:\s*auto/);
    expect(styleSource).toMatch(/right:\s*0\.95rem/);
    expect(styleSource).toMatch(/bottom:\s*0\.95rem/);
  });

  it("nao possui alert() nem referencias mortas de contexto no modulo recreador", () => {
    const recreadorDir = path.join(process.cwd(), "src/modules/recreador");
    const sharedDir = path.join(process.cwd(), "src/shared");

    const sourceFiles = [...collectSourceFiles(recreadorDir), ...collectSourceFiles(sharedDir)];
    const source = sourceFiles.map((filePath) => fs.readFileSync(filePath, "utf8")).join("\n");

    expect(source).not.toMatch(/\balert\s*\(/);
    expect(source).not.toContain("RecreadorCoreFlowContext");
  });

  it("nao possui implementacao ativa em core/utils mortos do recreador", () => {
    const coreDir = path.join(process.cwd(), "src/modules/recreador/core");
    const utilsDir = path.join(process.cwd(), "src/modules/recreador/utils");

    const coreFiles = fs.existsSync(coreDir)
      ? fs.readdirSync(coreDir).filter((entry) => entry.endsWith(".ts") || entry.endsWith(".tsx"))
      : [];

    const utilsFiles = fs.existsSync(utilsDir)
      ? fs.readdirSync(utilsDir).filter((entry) => entry.endsWith(".ts") || entry.endsWith(".tsx"))
      : [];

    expect(coreFiles.length).toBe(0);
    expect(utilsFiles.length).toBe(0);
  });
});
