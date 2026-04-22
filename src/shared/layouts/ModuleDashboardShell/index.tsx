import { useEffect, useMemo, type KeyboardEvent, type ReactNode } from "react";
import {
  Bell,
  LogOut,
  Menu,
  MessageCircle,
  PencilLine,
  Search,
  Settings,
  SidebarClose,
  SidebarOpen,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setMobileMenuOpen, toggleSidebarCollapsed } from "@/app/store/slices/uiSlice";
import logoColorida from "@/assets/logo-colorida.png";
import { Avatar, SidebarNavItem, StatCard } from "@/shared/ui";
import { moduleDashboardThemeByTone, type ModuleDashboardTone } from "./data";
import * as S from "./styles";

export interface ModuleDashboardStatItem {
  title: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
}

export interface ModuleDashboardQuickLink {
  id: string;
  label: string;
  to: string;
}

export interface ModuleDashboardContext {
  title: string;
  helper: string;
}

export interface ModuleDashboardNavItem {
  to: string;
  label: string;
  description: string;
  icon: ReactNode;
}

export interface ModuleDashboardNavGroup {
  id: string;
  title: string;
  items: ModuleDashboardNavItem[];
}

export interface ModuleDashboardProfileModeOption {
  id: string;
  label: string;
  to: string;
}

export interface ModuleDashboardProfileMode {
  groupId: string;
  activeId: string;
  options: [ModuleDashboardProfileModeOption, ModuleDashboardProfileModeOption];
}

type ModuleDashboardModuleKey = "recreador" | "hotelaria" | "empresa" | "pais";

export type ModuleDashboardUserPresence = "ativo" | "ausente" | "ocupado" | "offline";

export type ModuleDashboardHeaderMode = "hero" | "contextual";

interface ModuleDashboardShellProps {
  moduleKey: ModuleDashboardModuleKey;
  tone: ModuleDashboardTone;
  areaSubLabel: string;
  pageTitle: string;
  pageDescription: string;
  headerMode?: ModuleDashboardHeaderMode;
  stats?: ModuleDashboardStatItem[];
  compactContent?: boolean;
  userName: string;
  userRoleLabel: string;
  userPresence?: ModuleDashboardUserPresence;
  profileActionLabel: string;
  profileActionRoute: string;
  profileActionTitle?: string;
  homeRoute: string;
  chatRoute: string;
  notificationsRoute: string;
  settingsRoute: string;
  logoutRoute: string;
  sidebarGroups: ModuleDashboardNavGroup[];
  quickLinks: ModuleDashboardQuickLink[];
  showQuickLinks?: boolean;
  quickLinksLimit?: number;
  showSearch?: boolean;
  searchValue: string;
  searchPlaceholder: string;
  searchAriaLabel?: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  onChatNavigation?: () => void;
  onNotificationsNavigation?: () => void;
  onSettingsNavigation?: () => void;
  onLogout?: () => void;
  secondaryIdentity?: {
    title: string;
    subtitle: string;
  };
  profileMode?: ModuleDashboardProfileMode;
  onProfileModeChange?: (id: string, to: string) => void;
  children: ReactNode;
}

export const ModuleDashboardShell = ({
  moduleKey,
  tone,
  areaSubLabel,
  pageTitle,
  pageDescription,
  headerMode = "hero",
  stats = [],
  compactContent = false,
  userName,
  userRoleLabel,
  userPresence = "ativo",
  profileActionLabel,
  profileActionRoute,
  profileActionTitle,
  homeRoute,
  chatRoute,
  notificationsRoute,
  settingsRoute,
  logoutRoute,
  sidebarGroups,
  quickLinks,
  showQuickLinks = true,
  quickLinksLimit = 2,
  showSearch = true,
  searchValue,
  searchPlaceholder,
  searchAriaLabel,
  onSearchChange,
  onSearchSubmit,
  onChatNavigation,
  onNotificationsNavigation,
  onSettingsNavigation,
  onLogout,
  secondaryIdentity,
  profileMode,
  onProfileModeChange,
  children,
}: ModuleDashboardShellProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isSidebarCollapsed, isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const { unreadMessages, unreadNotifications, unreadMessagesByModule, unreadNotificationsByModule } =
    useAppSelector((state) => state.mock);

  const currentModuleUnreadMessages = unreadMessagesByModule[moduleKey] ?? unreadMessages;
  const currentModuleUnreadNotifications = unreadNotificationsByModule[moduleKey] ?? unreadNotifications;

  useEffect(() => {
    dispatch(setMobileMenuOpen(false));
  }, [dispatch, location.pathname]);

  const navigateInsideModule = (to: string, beforeNavigate?: () => void) => {
    beforeNavigate?.();
    navigate(to);
    dispatch(setMobileMenuOpen(false));
  };

  const theme = moduleDashboardThemeByTone[tone];

  const visibleQuickLinks = useMemo(() => {
    if (!showQuickLinks) {
      return [];
    }

    return quickLinks.slice(0, Math.max(0, quickLinksLimit));
  }, [quickLinks, quickLinksLimit, showQuickLinks]);

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    onSearchSubmit?.(searchValue.trim());
  };

  const formatUnreadCount = (value: number) => (value > 99 ? "99+" : String(value));

  const userPresenceLabel =
    userPresence === "ativo"
      ? "Ativo agora"
      : userPresence === "ausente"
        ? "Ausente"
        : userPresence === "ocupado"
          ? "Ocupado"
          : "Offline";

  return (
    <S.Page
      $tone={tone}
      $accent={theme.accent}
      $accentHover={theme.accentHover}
      $brandGradient={theme.brandGradient}
      $accentSoft={theme.accentSoft}
      $accentBorder={theme.accentBorder}
      $accentSubLabel={theme.accentSubLabel}
      $sidebarRadial={theme.sidebarRadial}
      $sidebarLinear={theme.sidebarLinear}
      $profileGradientStart={theme.profileGradientStart}
      $profileGradientEnd={theme.profileGradientEnd}
      $topbarBorder={theme.topbarBorder}
      $topbarShadow={theme.topbarShadow}
      $navActiveBg={theme.navActiveBg}
      $navHoverBg={theme.navHoverBg}
    >
      <S.Sidebar $collapsed={isSidebarCollapsed} $mobileOpen={isMobileMenuOpen}>
        <S.SidebarTop $collapsed={isSidebarCollapsed}>
          <S.BrandHomeButton
            type="button"
            $collapsed={isSidebarCollapsed}
            onClick={() => navigateInsideModule(homeRoute)}
            aria-label="Ir para o painel"
          >
            <S.BrandBlock $collapsed={isSidebarCollapsed}>
              <strong>RecreaLink</strong>
              <span>{areaSubLabel}</span>
            </S.BrandBlock>
            <S.BrandMark $collapsed={isSidebarCollapsed}>RL</S.BrandMark>
          </S.BrandHomeButton>

          <S.DesktopCollapseButton
            type="button"
            onClick={() => dispatch(toggleSidebarCollapsed())}
            aria-label="Alternar barra lateral"
          >
            {isSidebarCollapsed ? <SidebarOpen size={16} /> : <SidebarClose size={16} />}
          </S.DesktopCollapseButton>

          <S.MobileCloseButton
            type="button"
            onClick={() => dispatch(setMobileMenuOpen(false))}
            aria-label="Fechar menu"
          >
            <X size={16} />
          </S.MobileCloseButton>
        </S.SidebarTop>

        <S.ProfileCard $collapsed={isSidebarCollapsed}>
          <S.ProfileIdentity $collapsed={isSidebarCollapsed}>
            <S.ProfileAvatarWrap>
              <Avatar name={userName} size={isSidebarCollapsed ? "sm" : "md"} />
              <S.ProfilePresenceDot $presence={userPresence} aria-hidden="true" />
            </S.ProfileAvatarWrap>

            <S.ProfileMeta $collapsed={isSidebarCollapsed}>
              <strong>{isSidebarCollapsed ? "Perfil" : userName}</strong>
              <p>{userRoleLabel}</p>
              {!isSidebarCollapsed ? (
                <S.ProfilePresenceBadge $presence={userPresence}>{userPresenceLabel}</S.ProfilePresenceBadge>
              ) : null}
            </S.ProfileMeta>
          </S.ProfileIdentity>

          <S.ProfileAction
            type="button"
            $collapsed={isSidebarCollapsed}
            onClick={() => navigateInsideModule(profileActionRoute)}
            title={profileActionTitle}
          >
            <PencilLine size={14} />
            {!isSidebarCollapsed ? profileActionLabel : null}
          </S.ProfileAction>

          {!isSidebarCollapsed && secondaryIdentity ? (
            <S.SecondaryIdentity>
              <strong>{secondaryIdentity.title}</strong>
              <span>{secondaryIdentity.subtitle}</span>
            </S.SecondaryIdentity>
          ) : null}
        </S.ProfileCard>

        <S.GroupList>
          {sidebarGroups.map((group) => {
            const shouldRenderProfileMode =
              !isSidebarCollapsed && profileMode && group.id === profileMode.groupId;

            return (
              <S.GroupSection key={group.id}>
                <S.GroupTitle $collapsed={isSidebarCollapsed} title={group.title}>
                  {isSidebarCollapsed ? group.title.split(" ")[0] : group.title}
                </S.GroupTitle>

                <S.NavList $collapsed={isSidebarCollapsed}>
                  {group.items.map((item) => (
                    <SidebarNavItem
                      key={item.to}
                      to={item.to}
                      label={item.label}
                      description={item.description}
                      icon={item.icon}
                      collapsed={isSidebarCollapsed}
                    />
                  ))}
                </S.NavList>

                {shouldRenderProfileMode ? (
                  <S.ProfileModeCard>
                    {profileMode.options.map((option) => (
                      <S.ProfileModeButton
                        key={option.id}
                        type="button"
                        $active={profileMode.activeId === option.id}
                        onClick={() => {
                          onProfileModeChange?.(option.id, option.to);
                          navigateInsideModule(option.to);
                        }}
                      >
                        {option.label}
                      </S.ProfileModeButton>
                    ))}
                  </S.ProfileModeCard>
                ) : null}
              </S.GroupSection>
            );
          })}
        </S.GroupList>
      </S.Sidebar>

      <S.MobileOverlay $open={isMobileMenuOpen} onClick={() => dispatch(setMobileMenuOpen(false))} />

      <S.Content>
        <S.Topbar>
          <S.TopbarMain>
            <S.MobileMenuButton
              type="button"
              onClick={() => dispatch(setMobileMenuOpen(!isMobileMenuOpen))}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <Menu size={17} />
            </S.MobileMenuButton>

            <S.TopbarLogoButton
              type="button"
              onClick={() => navigateInsideModule(homeRoute)}
              aria-label="Ir para o painel"
            >
              <S.TopbarLogoImage src={logoColorida} alt="RecreaLink" />
            </S.TopbarLogoButton>

            {showSearch ? (
              <S.SearchWrap>
                <S.SearchInputWrap>
                  <Search size={16} />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => onSearchChange(event.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder={searchPlaceholder}
                    aria-label={searchAriaLabel ?? "Busca global"}
                  />
                </S.SearchInputWrap>
              </S.SearchWrap>
            ) : null}
          </S.TopbarMain>

          <S.TopbarActions>
            {visibleQuickLinks.length > 0 ? (
              <S.QuickLinksGroup role="navigation" aria-label="Atalhos de navegação">
                {visibleQuickLinks.map((link) => (
                  <S.QuickButton key={link.id} type="button" onClick={() => navigateInsideModule(link.to)}>
                    {link.label}
                  </S.QuickButton>
                ))}
              </S.QuickLinksGroup>
            ) : null}

            <S.ActionButton
              type="button"
              aria-label="Chat"
              onClick={() => navigateInsideModule(chatRoute, onChatNavigation)}
            >
              <MessageCircle size={16} />
              <S.ActionLabel>Chat</S.ActionLabel>
              {currentModuleUnreadMessages > 0 ? (
                <S.ActionCount>{formatUnreadCount(currentModuleUnreadMessages)}</S.ActionCount>
              ) : null}
            </S.ActionButton>

            <S.ActionButton
              type="button"
              aria-label="Notificações"
              onClick={() => navigateInsideModule(notificationsRoute, onNotificationsNavigation)}
            >
              <Bell size={16} />
              <S.ActionLabel>Notificações</S.ActionLabel>
              {currentModuleUnreadNotifications > 0 ? (
                <S.ActionCount>{formatUnreadCount(currentModuleUnreadNotifications)}</S.ActionCount>
              ) : null}
            </S.ActionButton>

            <S.ActionButton
              type="button"
              aria-label="Configurações"
              onClick={() => navigateInsideModule(settingsRoute, onSettingsNavigation)}
            >
              <Settings size={16} />
              <S.ActionLabel>Configurações</S.ActionLabel>
            </S.ActionButton>

            <S.LogoutActionButton
              type="button"
              aria-label="Sair"
              onClick={() => navigateInsideModule(logoutRoute, onLogout)}
            >
              <LogOut size={16} />
              <S.ActionLabel>Sair</S.ActionLabel>
            </S.LogoutActionButton>
          </S.TopbarActions>
        </S.Topbar>

        <S.Main $compact={compactContent}>
          <S.PageHeader $compact={compactContent} $mode={headerMode}>
            {headerMode === "contextual" ? <S.PageHeaderEyebrow>{areaSubLabel}</S.PageHeaderEyebrow> : null}
            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
          </S.PageHeader>

          {stats.length > 0 ? (
            <S.StatsGrid>
              {stats.map((item) => (
                <StatCard
                  key={`${item.title}-${item.value}`}
                  title={item.title}
                  value={item.value}
                  helper={item.helper}
                  icon={item.icon}
                />
              ))}
            </S.StatsGrid>
          ) : null}

          <S.Body $compact={compactContent}>{children}</S.Body>
        </S.Main>
      </S.Content>
    </S.Page>
  );
};
