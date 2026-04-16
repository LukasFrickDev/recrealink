import { useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  ModuleDashboardShell,
  type ModuleDashboardNavGroup,
  type ModuleDashboardProfileMode,
  type ModuleDashboardQuickLink,
  type ModuleDashboardStatItem,
} from "@/shared/layouts/ModuleDashboardShell";
import {
  getHotelariaTopbarContext,
  hotelariaSidebarGroups,
  hotelariaTopbarQuickLinks,
} from "@/shared/config/moduleDashboardNavigation";

export type HotelariaStatItem = ModuleDashboardStatItem;

interface HotelariaDashboardShellProps {
  pageTitle: string;
  pageDescription: string;
  stats?: HotelariaStatItem[];
  compactContent?: boolean;
  userName: string;
  hotelName?: string;
  children: ReactNode;
}

export const HotelariaDashboardShell = ({
  pageTitle,
  pageDescription,
  stats,
  compactContent,
  userName,
  hotelName = "Hotel Maresias Resort",
  children,
}: HotelariaDashboardShellProps) => {
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [profileMode, setProfileMode] = useState<"hotel" | "contratante">("contratante");

  const topbarContext = getHotelariaTopbarContext(location.pathname);

  const searchPlaceholder = useMemo(() => {
    if (location.pathname.startsWith("/app/hotelaria/recreadores")) {
      return "Buscar por recreador, cidade ou especialidade...";
    }

    if (location.pathname.startsWith("/app/hotelaria/eventos")) {
      return "Buscar evento, tema ou público...";
    }

    return "Buscar escalas, recreadores, programações e alertas...";
  }, [location.pathname]);


  const sidebarGroups: ModuleDashboardNavGroup[] = useMemo(
    () =>
      hotelariaSidebarGroups.map((group) => ({
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

  const quickLinks: ModuleDashboardQuickLink[] = hotelariaTopbarQuickLinks;

  const profileModeConfig: ModuleDashboardProfileMode = {
    groupId: "meu-perfil",
    activeId: profileMode,
    options: [
      { id: "hotel", label: "Hotel", to: "/app/hotelaria/hotel" },
      { id: "contratante", label: "Contratante", to: "/app/hotelaria/perfil" },
    ],
  };

  return (
    <ModuleDashboardShell
      tone="hotelaria"
      areaSubLabel="Área da hotelaria"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      stats={stats}
      compactContent={compactContent}
      userName={userName}
      userRoleLabel="Contratante responsável"
      profileActionLabel="Ver perfil"
      profileActionRoute="/app/hotelaria/perfil"
      profileActionTitle="Abrir perfil do contratante"
      homeRoute="/app/hotelaria"
      chatRoute="/app/hotelaria/chat"
      notificationsRoute="/app/hotelaria/notificacoes"
      settingsRoute="/app/hotelaria/configuracoes"
      logoutRoute="/acesso/escolher-perfil"
      context={topbarContext}
      sidebarGroups={sidebarGroups}
      quickLinks={quickLinks}
      searchValue={searchValue}
      searchPlaceholder={searchPlaceholder}
      onSearchChange={setSearchValue}
      secondaryIdentity={{
        title: hotelName,
        subtitle: "Hotel vinculado",
      }}
      profileMode={profileModeConfig}
      onProfileModeChange={(id) => setProfileMode(id as "hotel" | "contratante")}
    >
      {children}
    </ModuleDashboardShell>
  );
};
