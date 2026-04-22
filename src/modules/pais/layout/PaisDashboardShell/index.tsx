import { useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
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
  paisSidebarGroups,
  paisTopbarQuickLinks,
} from "@/shared/config/moduleDashboardNavigation";

export type PaisStatItem = ModuleDashboardStatItem;

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

interface PaisDashboardShellProps {
  pageTitle: string;
  pageDescription: string;
  stats?: PaisStatItem[];
  compactContent?: boolean;
  userName: string;
  children: ReactNode;
}

export const PaisDashboardShell = ({
  pageTitle,
  pageDescription,
  stats,
  compactContent,
  userName,
  children,
}: PaisDashboardShellProps) => {
  const location = useLocation();
  const chatVisiblePresence = useAppSelector((state) => state.mock.chatPresenceByModule.pais);
  const [searchValue, setSearchValue] = useState("");

  const searchPlaceholder = useMemo(() => {
    if (location.pathname.startsWith("/app/pais/empresas")) {
      return "Buscar empresa, cidade ou atividade...";
    }

    if (location.pathname.startsWith("/app/pais/favoritos")) {
      return "Buscar favorito salvo pela família...";
    }

    if (location.pathname.startsWith("/app/pais/chat")) {
      return "Buscar conversa por empresa...";
    }

    if (location.pathname.startsWith("/app/pais/avaliacoes")) {
      return "Buscar por nota, bairro ou experiência...";
    }

    return "Buscar empresas, eventos, mensagens e recomendacoes...";
  }, [location.pathname]);

  const sidebarGroups: ModuleDashboardNavGroup[] = useMemo(
    () =>
      paisSidebarGroups.map((group) => ({
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

  const quickLinks: ModuleDashboardQuickLink[] = paisTopbarQuickLinks;

  return (
    <ModuleDashboardShell
      moduleKey="pais"
      tone="pais"
      areaSubLabel="Área da família"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      stats={stats}
      compactContent={compactContent}
      userName={userName}
      userRoleLabel="Responsável da família"
      userPresence={mapChatPresenceToShellPresence(chatVisiblePresence)}
      profileActionLabel="Abrir perfil"
      profileActionRoute="/app/pais/perfil"
      profileActionTitle="Visualizar perfil da família"
      homeRoute="/app/pais"
      chatRoute="/app/pais/chat"
      notificationsRoute="/app/pais/notificacoes"
      settingsRoute="/app/pais/configuracoes"
      logoutRoute="/acesso/escolher-perfil"
      sidebarGroups={sidebarGroups}
      quickLinks={quickLinks}
      searchValue={searchValue}
      searchPlaceholder={searchPlaceholder}
      onSearchChange={setSearchValue}
    >
      {children}
    </ModuleDashboardShell>
  );
};
