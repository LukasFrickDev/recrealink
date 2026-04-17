import { useMemo, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setLastVisualAction, setTopbarSearch } from "@/app/store/slices/recreadorSlice";
import {
  ModuleDashboardShell,
  type ModuleDashboardNavGroup,
  type ModuleDashboardQuickLink,
  type ModuleDashboardStatItem,
} from "@/shared/layouts/ModuleDashboardShell";
import {
  recreadorSidebarGroups,
  recreadorTopbarQuickLinks,
} from "@/shared/config/moduleDashboardNavigation";

export type RecreadorStatItem = ModuleDashboardStatItem;

interface RecreadorDashboardShellProps {
  pageTitle: string;
  pageDescription: string;
  stats?: RecreadorStatItem[];
  compactContent?: boolean;
  children: ReactNode;
}

export const RecreadorDashboardShell = ({
  pageTitle,
  pageDescription,
  stats,
  compactContent,
  children,
}: RecreadorDashboardShellProps) => {
  const dispatch = useAppDispatch();

  const { profile, ui } = useAppSelector((state) => state.recreador);

  const sidebarGroups: ModuleDashboardNavGroup[] = useMemo(
    () =>
      recreadorSidebarGroups.map((group) => ({
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

  const quickLinks: ModuleDashboardQuickLink[] = recreadorTopbarQuickLinks;

  return (
    <ModuleDashboardShell
      tone="recreador"
      areaSubLabel="Área do Recreador"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      stats={stats}
      compactContent={compactContent}
      userName={profile.fullName}
      userRoleLabel={profile.roleTitle}
      profileActionLabel="Editar perfil"
      profileActionRoute="/app/recreador/perfil"
      profileActionTitle="Editar perfil"
      homeRoute="/app/recreador"
      chatRoute="/app/recreador/chat"
      notificationsRoute="/app/recreador/notificacoes"
      settingsRoute="/app/recreador/configuracoes"
      logoutRoute="/acesso/escolher-perfil"
      sidebarGroups={sidebarGroups}
      quickLinks={quickLinks}
      searchValue={ui.topbarSearch}
      searchPlaceholder="Buscar oportunidades, convites e disponibilidade..."
      onSearchChange={(value) => dispatch(setTopbarSearch(value))}
      onChatNavigation={() => dispatch(setLastVisualAction("Chat visual aberto."))}
      onNotificationsNavigation={() =>
        dispatch(setLastVisualAction("Notificações visuais abertas."))
      }
      onLogout={() => dispatch(setLastVisualAction("Sessão encerrada visualmente."))}
    >
      {children}
    </ModuleDashboardShell>
  );
};
