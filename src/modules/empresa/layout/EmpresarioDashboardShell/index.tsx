import { useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  ModuleDashboardShell,
  type ModuleDashboardNavGroup,
  type ModuleDashboardQuickLink,
  type ModuleDashboardStatItem,
} from "@/shared/layouts/ModuleDashboardShell";
import {
  empresarioSidebarGroups,
  empresarioTopbarQuickLinks,
  getEmpresarioTopbarContext,
} from "@/shared/config/moduleDashboardNavigation";

interface EmpresarioDashboardShellProps {
  userName: string;
  pageTitle: string;
  pageDescription: string;
  stats?: ModuleDashboardStatItem[];
  compactContent?: boolean;
  children: ReactNode;
}

export const EmpresarioDashboardShell = ({
  userName,
  pageTitle,
  pageDescription,
  stats,
  compactContent,
  children,
}: EmpresarioDashboardShellProps) => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const topbarContext = getEmpresarioTopbarContext(location.pathname);

  const sidebarGroups: ModuleDashboardNavGroup[] = useMemo(
    () =>
      empresarioSidebarGroups.map((group) => ({
        id: group.id,
        title: group.title,
        items: group.items.map((item) => {
          const ItemIcon = item.icon;

          return {
            to: item.to,
            label: item.label,
            description: item.description,
            icon: <ItemIcon size={16} />,
          };
        }),
      })),
    [],
  );

  const quickLinks: ModuleDashboardQuickLink[] = empresarioTopbarQuickLinks;

  return (
    <ModuleDashboardShell
      tone="empresa"
      areaSubLabel="Área da empresa"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      stats={stats}
      compactContent={compactContent}
      userName={userName}
      userRoleLabel="Gestora da empresa"
      profileActionLabel="Editar perfil"
      profileActionRoute="/app/empresa/perfil"
      profileActionTitle="Editar perfil institucional"
      homeRoute="/app/empresa"
      chatRoute="/app/empresa/chat"
      notificationsRoute="/app/empresa/notificacoes"
      settingsRoute="/app/empresa/configuracoes"
      logoutRoute="/acesso/escolher-perfil"
      context={topbarContext}
      sidebarGroups={sidebarGroups}
      quickLinks={quickLinks}
      searchValue={searchValue}
      searchPlaceholder="Buscar clientes, equipe, eventos e oportunidades..."
      onSearchChange={setSearchValue}
    >
      {children}
    </ModuleDashboardShell>
  );
};