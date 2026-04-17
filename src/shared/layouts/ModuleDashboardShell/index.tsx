import type { ReactNode } from "react";
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
import { useEffect } from "react";
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

interface ModuleDashboardShellProps {
  tone: ModuleDashboardTone;
  areaSubLabel: string;
  pageTitle: string;
  pageDescription: string;
  stats?: ModuleDashboardStatItem[];
  compactContent?: boolean;
  userName: string;
  userRoleLabel: string;
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
  searchValue: string;
  searchPlaceholder: string;
  onSearchChange: (value: string) => void;
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
  tone,
  areaSubLabel,
  pageTitle,
  pageDescription,
  stats = [],
  compactContent = false,
  userName,
  userRoleLabel,
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
  searchValue,
  searchPlaceholder,
  onSearchChange,
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
  const { unreadMessages, unreadNotifications } = useAppSelector((state) => state.mock);

  useEffect(() => {
    dispatch(setMobileMenuOpen(false));
  }, [dispatch, location.pathname]);

  const navigateInsideModule = (to: string, beforeNavigate?: () => void) => {
    beforeNavigate?.();
    navigate(to);
    dispatch(setMobileMenuOpen(false));
  };

  const theme = moduleDashboardThemeByTone[tone];

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
          <S.BrandBlock $collapsed={isSidebarCollapsed}>
            <strong>RecreaLink</strong>
            <span>{areaSubLabel}</span>
          </S.BrandBlock>

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
            </S.ProfileAvatarWrap>

            <S.ProfileMeta $collapsed={isSidebarCollapsed}>
              <strong>{isSidebarCollapsed ? "Perfil" : userName}</strong>
              <p>{userRoleLabel}</p>
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
                <S.GroupTitle $collapsed={isSidebarCollapsed}>{group.title}</S.GroupTitle>

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

            <S.SearchWrap>
              <Search size={16} />
              <input
                type="text"
                value={searchValue}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
              />
            </S.SearchWrap>
          </S.TopbarMain>

          <S.TopbarActions>
            {quickLinks.map((link) => (
              <S.QuickButton key={link.id} type="button" onClick={() => navigateInsideModule(link.to)}>
                {link.label}
              </S.QuickButton>
            ))}

            <S.IconButton
              type="button"
              aria-label="Chat"
              onClick={() => navigateInsideModule(chatRoute, onChatNavigation)}
            >
              <MessageCircle size={17} />
              <S.CounterBadge>{String(unreadMessages)}</S.CounterBadge>
            </S.IconButton>

            <S.IconButton
              type="button"
              aria-label="Notificações"
              onClick={() => navigateInsideModule(notificationsRoute, onNotificationsNavigation)}
            >
              <Bell size={17} />
              <S.CounterBadge>{String(unreadNotifications)}</S.CounterBadge>
            </S.IconButton>

            <S.IconButton
              type="button"
              aria-label="Configurações"
              onClick={() => navigateInsideModule(settingsRoute, onSettingsNavigation)}
            >
              <Settings size={17} />
            </S.IconButton>

            <S.LogoutButton
              type="button"
              aria-label="Sair"
              onClick={() => navigateInsideModule(logoutRoute, onLogout)}
            >
              <LogOut size={17} />
            </S.LogoutButton>
          </S.TopbarActions>
        </S.Topbar>

        <S.Main $compact={compactContent}>
          <S.PageHeader $compact={compactContent}>
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
