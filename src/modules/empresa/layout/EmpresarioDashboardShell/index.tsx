import { useMemo, useState, type ReactNode } from "react";
import { useAppSelector } from "@/app/store/hooks";
import type { ChatVisiblePresence } from "@/app/store/slices/mockSlice";
import {
  ModuleDashboardShell,
  type ModuleDashboardNavGroup,
  type ModuleDashboardQuickLink,
  type ModuleDashboardStatItem,
  type ModuleDashboardUserPresence,
} from "@/shared/layouts/ModuleDashboardShell";
import {
  empresarioSidebarGroups,
  empresarioTopbarQuickLinks,
} from "@/shared/config/moduleDashboardNavigation";

interface EmpresarioDashboardShellProps {
  userName: string;
  pageTitle: string;
  pageDescription: string;
  stats?: ModuleDashboardStatItem[];
  compactContent?: boolean;
  children: ReactNode;
}

const mapChatPresenceToShellPresence = (
  chatPresence: ChatVisiblePresence,
): ModuleDashboardUserPresence => {
  if (chatPresence === "online") {
    return "ativo";
  }

  if (chatPresence === "away") {
    return "ausente";
  }

  if (chatPresence === "busy") {
    return "ocupado";
  }

  return "offline";
};

export const EmpresarioDashboardShell = ({
  userName,
  pageTitle,
  pageDescription,
  stats,
  compactContent,
  children,
}: EmpresarioDashboardShellProps) => {
  const chatVisiblePresence = useAppSelector((state) => state.mock.chatPresenceByModule.empresa);
  const [searchValue, setSearchValue] = useState("");

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
      moduleKey="empresa"
      tone="empresa"
      areaSubLabel="Área da empresa"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      stats={stats}
      compactContent={compactContent}
      userName={userName}
      userRoleLabel="Gestora da empresa"
      userPresence={mapChatPresenceToShellPresence(chatVisiblePresence)}
      profileActionLabel="Editar perfil"
      profileActionRoute="/app/empresa/perfil"
      profileActionTitle="Editar perfil institucional"
      homeRoute="/app/empresa"
      chatRoute="/app/empresa/chat"
      notificationsRoute="/app/empresa/notificacoes"
      settingsRoute="/app/empresa/configuracoes"
      logoutRoute="/acesso/escolher-perfil"
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