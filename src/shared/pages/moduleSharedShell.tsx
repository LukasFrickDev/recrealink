import type { ReactNode } from "react";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell";
import { HotelariaDashboardShell } from "@/modules/hotelaria/layout/HotelariaDashboardShell";
import { EmpresarioDashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import type { ModuleDashboardStatItem } from "@/shared/layouts/ModuleDashboardShell";

export type SharedModuleKey = "recreador" | "hotelaria" | "empresa" | "pais";

interface SharedModuleShellPayload {
  pageTitle: string;
  pageDescription: string;
  stats?: ModuleDashboardStatItem[];
  compactContent?: boolean;
  children: ReactNode;
}

export const renderSharedModuleShell = (
  moduleKey: SharedModuleKey,
  payload: SharedModuleShellPayload,
) => {
  const stats = payload.stats ?? [];
  const compactContent = payload.compactContent ?? true;

  if (moduleKey === "recreador") {
    return (
      <RecreadorDashboardShell
        pageTitle={payload.pageTitle}
        pageDescription={payload.pageDescription}
        stats={stats}
        compactContent={compactContent}
      >
        {payload.children}
      </RecreadorDashboardShell>
    );
  }

  if (moduleKey === "hotelaria") {
    return (
      <HotelariaDashboardShell
        userName="Carla Menezes"
        pageTitle={payload.pageTitle}
        pageDescription={payload.pageDescription}
        stats={stats}
        compactContent={compactContent}
      >
        {payload.children}
      </HotelariaDashboardShell>
    );
  }

  if (moduleKey === "pais") {
    return (
      <PaisDashboardShell
        userName="Lucia Fernandes"
        pageTitle={payload.pageTitle}
        pageDescription={payload.pageDescription}
        stats={stats}
        compactContent={compactContent}
      >
        {payload.children}
      </PaisDashboardShell>
    );
  }

  return (
    <EmpresarioDashboardShell
      userName="Marina Costa"
      pageTitle={payload.pageTitle}
      pageDescription={payload.pageDescription}
      stats={stats}
      compactContent={compactContent}
    >
      {payload.children}
    </EmpresarioDashboardShell>
  );
};