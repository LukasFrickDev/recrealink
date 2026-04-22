import { useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setLastVisualAction, setTopbarSearch } from "@/app/store/slices/recreadorSlice";
import type { ChatVisiblePresence } from "@/app/store/slices/mockSlice";
import {
  ModuleDashboardShell,
  type ModuleDashboardNavGroup,
  type ModuleDashboardUserPresence,
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

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const opportunityCodeRegex = /(HTL|EVT)-\d{3}/i;

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

export const RecreadorDashboardShell = ({
  pageTitle,
  pageDescription,
  stats,
  compactContent,
  children,
}: RecreadorDashboardShellProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { profile, ui } = useAppSelector((state) => state.recreador);
  const chatVisiblePresence = useAppSelector((state) => state.mock.chatPresenceByModule.recreador);

  const isHomePage = location.pathname === "/app/recreador";
  const isOpportunitiesPage =
    location.pathname === "/app/recreador/oportunidades" ||
    location.pathname.startsWith("/app/recreador/oportunidades/");

  const shouldShowStats = isHomePage || isOpportunitiesPage;
  const shellStats = shouldShowStats ? (stats ?? []) : [];
  const shellHeaderMode = isHomePage ? "hero" : "contextual";
  const shellCompactContent = compactContent ?? !isHomePage;

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

  const quickLinks: ModuleDashboardQuickLink[] = useMemo(() => {
    const availableLinks = recreadorTopbarQuickLinks.filter((link) => {
      const isCurrentRoute =
        location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);

      return !isCurrentRoute;
    });

    return isHomePage ? availableLinks.slice(0, 2) : availableLinks.slice(0, 1);
  }, [isHomePage, location.pathname]);

  const handleTopbarSearchSubmit = (rawValue: string) => {
    const value = rawValue.trim();

    if (!value) {
      dispatch(setLastVisualAction("Busca global sem termo. Digite uma página, ação ou código."));
      return;
    }

    const normalizedValue = normalize(value);
    const opportunityCodeMatch = value.match(opportunityCodeRegex);

    if (opportunityCodeMatch) {
      const code = opportunityCodeMatch[0].toUpperCase();
      navigate(`/app/recreador/oportunidades?codigo=${encodeURIComponent(code)}`);
      dispatch(setLastVisualAction(`Busca global direcionou para oportunidade ${code}.`));
      return;
    }

    const routeByKeyword: Array<{ terms: string[]; route: string }> = [
      { terms: ["convite", "convites"], route: "/app/recreador/convites" },
      {
        terms: ["disponibilidade", "agenda", "bloqueio", "horario", "horarios"],
        route: "/app/recreador/disponibilidade",
      },
      { terms: ["checklist", "rotina", "tarefas"], route: "/app/recreador/checklist" },
      { terms: ["perfil publico", "publico"], route: "/app/recreador/perfil-publico" },
      { terms: ["perfil", "portfolio", "certificacao", "bio"], route: "/app/recreador/perfil" },
      { terms: ["suporte", "ajuda", "atendimento"], route: "/app/recreador/suporte" },
      {
        terms: ["configuracao", "configuracoes", "preferencias", "senha"],
        route: "/app/recreador/configuracoes",
      },
      { terms: ["chat", "mensagem", "mensagens", "conversa"], route: "/app/recreador/chat" },
      {
        terms: ["notificacao", "notificacoes", "alerta", "alertas"],
        route: "/app/recreador/notificacoes",
      },
      {
        terms: ["inicio", "painel", "dashboard", "prioridades"],
        route: "/app/recreador",
      },
    ];

    const matchedRoute = routeByKeyword.find((item) =>
      item.terms.some((term) => normalizedValue.includes(term)),
    );

    if (matchedRoute) {
      navigate(matchedRoute.route);
      dispatch(setLastVisualAction(`Busca global direcionou para ${matchedRoute.route}.`));
      return;
    }

    navigate(`/app/recreador/oportunidades?termo=${encodeURIComponent(value)}`);
    dispatch(setLastVisualAction(`Busca global aplicada em Oportunidades com termo: ${value}.`));
  };

  return (
    <ModuleDashboardShell
      moduleKey="recreador"
      tone="recreador"
      areaSubLabel="Recreador"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      headerMode={shellHeaderMode}
      stats={shellStats}
      compactContent={shellCompactContent}
      userName={profile.fullName}
      userRoleLabel={profile.roleTitle}
      userPresence={mapChatPresenceToShellPresence(chatVisiblePresence)}
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
      showQuickLinks={quickLinks.length > 0}
      quickLinksLimit={isHomePage ? 2 : 1}
      showSearch
      searchValue={ui.topbarSearch}
      searchPlaceholder="Buscar página, ação ou código (ex.: convites, HTL-003)"
      searchAriaLabel="Busca global do módulo Recreador"
      onSearchChange={(value) => dispatch(setTopbarSearch(value))}
      onSearchSubmit={handleTopbarSearchSubmit}
      onChatNavigation={() => dispatch(setLastVisualAction("Chat aberto."))}
      onNotificationsNavigation={() =>
        dispatch(setLastVisualAction("Notificações abertas."))
      }
      onLogout={() => dispatch(setLastVisualAction("Sessão encerrada."))}
    >
      {children}
    </ModuleDashboardShell>
  );
};
