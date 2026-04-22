import styled, { css } from "styled-components";

export const Page = styled.div<{
  $tone: "recreador" | "hotelaria" | "empresa" | "pais";
  $accent: string;
  $accentHover: string;
  $brandGradient: string;
  $accentSoft: string;
  $accentBorder: string;
  $accentSubLabel: string;
  $sidebarRadial: string;
  $sidebarLinear: string;
  $profileGradientStart: string;
  $profileGradientEnd: string;
  $topbarBorder: string;
  $topbarShadow: string;
  $navActiveBg: string;
  $navHoverBg: string;
}>`
  --shell-accent: ${({ $accent }) => $accent};
  --shell-accent-hover: ${({ $accentHover }) => $accentHover};
  --shell-brand-gradient: ${({ $brandGradient }) => $brandGradient};
  --shell-accent-soft: ${({ $accentSoft }) => $accentSoft};
  --shell-accent-border: ${({ $accentBorder }) => $accentBorder};
  --shell-accent-sub-label: ${({ $accentSubLabel }) => $accentSubLabel};
  --shell-sidebar-radial: ${({ $sidebarRadial }) => $sidebarRadial};
  --shell-sidebar-linear: ${({ $sidebarLinear }) => $sidebarLinear};
  --shell-profile-gradient-start: ${({ $profileGradientStart }) => $profileGradientStart};
  --shell-profile-gradient-end: ${({ $profileGradientEnd }) => $profileGradientEnd};
  --shell-topbar-border: ${({ $topbarBorder }) => $topbarBorder};
  --shell-topbar-shadow: ${({ $topbarShadow }) => $topbarShadow};
  --shell-nav-active-bg: ${({ $navActiveBg }) => $navActiveBg};
  --shell-nav-hover-bg: ${({ $navHoverBg }) => $navHoverBg};
  --badge-brand-bg: var(--shell-accent-soft);
  --badge-brand-color: var(--shell-accent-hover);
  --statcard-icon-color: var(--shell-accent);
  --shell-surface-base: ${({ theme }) => theme.surfaces.panel};
  --shell-surface-soft: ${({ theme }) => theme.surfaces.panelSoft};
  --shell-surface-elevated: ${({ theme }) => theme.surfaces.panelElevated};
  --shell-border-default: ${({ theme }) => theme.colors.border};
  --shell-border-strong: ${({ theme }) => theme.colors.borderStrong};
  --shell-shadow-soft: ${({ theme }) => theme.shadows.sm};

  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  background:
    radial-gradient(circle at 100% -6%, var(--shell-accent-soft) 0%, rgba(255, 255, 255, 0) 36%),
    radial-gradient(circle at -10% 106%, rgba(249, 111, 38, 0.08) 0%, rgba(249, 111, 38, 0) 44%),
    ${({ theme }) => theme.surfaces.canvas};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--shell-accent);
    outline-offset: 2px;
  }

  button:disabled,
  input:disabled,
  textarea:disabled,
  select:disabled {
    opacity: 0.64;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    filter: none;
  }
`;

export const Sidebar = styled.aside<{ $collapsed: boolean; $mobileOpen: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "104px" : "306px")};
  border-right: 1px solid var(--shell-border-strong);
  background:
    radial-gradient(circle at 0% 0%, var(--shell-sidebar-radial) 0%, rgba(255, 255, 255, 0) 45%),
    linear-gradient(180deg, #ffffff 0%, var(--shell-sidebar-linear) 50%, #ffffff 100%);
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: width 0.2s ease, transform 0.2s ease;
  box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.55);
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    min-height: 100vh;
    transform: translateX(${({ $mobileOpen }) => ($mobileOpen ? "0" : "-100%")});
    width: min(304px, calc(100vw - 20px));
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const SidebarTop = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "space-between")};
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const BrandHomeButton = styled.button<{ $collapsed: boolean }>`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  min-height: 36px;
  width: ${({ $collapsed }) => ($collapsed ? "100%" : "auto")};
`;

export const BrandBlock = styled.div<{ $collapsed: boolean }>`
  display: grid;
  gap: 3px;

  strong {
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.typography.sectionTitle};
    line-height: 1;
    display: ${({ $collapsed }) => ($collapsed ? "none" : "block")};
    background: var(--shell-brand-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  span {
    font-size: ${({ theme }) => theme.typography.micro};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--shell-accent-sub-label);
    font-weight: 800;
    display: ${({ $collapsed }) => ($collapsed ? "none" : "block")};
  }
`;

export const BrandMark = styled.span<{ $collapsed: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid var(--shell-accent-border);
  background: linear-gradient(145deg, var(--shell-accent-soft), rgba(255, 255, 255, 0.92));
  color: var(--shell-accent);
  display: ${({ $collapsed }) => ($collapsed ? "inline-flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 11px;
  letter-spacing: 0.06em;
  font-weight: 800;
  text-transform: uppercase;
`;

export const IconButton = styled.button`
  min-width: 36px;
  min-height: 36px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: var(--shell-surface-base);
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: var(--shell-accent);
    color: var(--shell-accent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 32px;
    min-height: 32px;
  }
`;

export const DesktopCollapseButton = styled(IconButton)`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const MobileCloseButton = styled(IconButton)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
  }
`;

export const ProfileCard = styled.section<{ $collapsed: boolean }>`
  border: ${({ $collapsed, theme }) => ($collapsed ? "none" : theme.borders.subtle)};
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    ${({ $collapsed }) =>
      $collapsed
        ? "transparent"
        : "linear-gradient(170deg, rgba(255, 255, 255, 0.98) 0%, var(--shell-accent-soft) 118%)"};
  padding: ${({ $collapsed, theme }) => ($collapsed ? "0" : theme.spacing.md)};
  display: grid;
  gap: ${({ $collapsed }) => ($collapsed ? "8px" : "12px")};
  box-shadow: ${({ $collapsed }) => ($collapsed ? "none" : "0 10px 20px rgba(28, 38, 64, 0.08)")};
`;

export const ProfileIdentity = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  gap: ${({ $collapsed }) => ($collapsed ? "0" : "10px")};
`;

export const ProfileAvatarWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 2px;
  background: linear-gradient(
    145deg,
    var(--shell-profile-gradient-start),
    var(--shell-profile-gradient-end)
  );
`;

const profilePresencePalette = {
  ativo: {
    color: "#17a766",
    bg: "rgba(23, 167, 102, 0.14)",
    border: "rgba(23, 167, 102, 0.35)",
  },
  ausente: {
    color: "#d0911e",
    bg: "rgba(227, 154, 18, 0.14)",
    border: "rgba(227, 154, 18, 0.34)",
  },
  ocupado: {
    color: "#c44d5e",
    bg: "rgba(211, 77, 98, 0.16)",
    border: "rgba(211, 77, 98, 0.38)",
  },
  offline: {
    color: "#64738f",
    bg: "rgba(101, 112, 138, 0.14)",
    border: "rgba(101, 112, 138, 0.3)",
  },
} as const;

export const ProfilePresenceDot = styled.i<{ $presence: "ativo" | "ausente" | "ocupado" | "offline" }>`
  width: 11px;
  height: 11px;
  border-radius: 999px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: ${({ $presence }) => profilePresencePalette[$presence].color};
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(28, 38, 64, 0.16);
`;

export const ProfileMeta = styled.div<{ $collapsed: boolean }>`
  display: grid;
  gap: 4px;
  justify-items: ${({ $collapsed }) => ($collapsed ? "center" : "start")};

  strong {
    font-size: ${({ $collapsed, theme }) => ($collapsed ? theme.typography.meta : theme.typography.label)};
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    display: ${({ $collapsed }) => ($collapsed ? "none" : "block")};
  }
`;

export const ProfilePresenceBadge = styled.span<{ $presence: "ativo" | "ausente" | "ocupado" | "offline" }>`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ $presence }) => profilePresencePalette[$presence].border};
  background: ${({ $presence }) => profilePresencePalette[$presence].bg};
  color: ${({ $presence }) => profilePresencePalette[$presence].color};
  padding: 6px 12px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1;
`;

export const ProfilePresenceWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
`;

export const ProfilePresenceButton = styled.button<{
  $presence: "ativo" | "ausente" | "ocupado" | "offline";
  $open: boolean;
}>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid transparent;
  background: transparent;
  color: ${({ $presence }) => profilePresencePalette[$presence].color};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 100%;

  ${ProfilePresenceBadge} {
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);

  }

  svg {
    flex-shrink: 0;
  }
`;

export const ProfilePresenceMenu = styled.div`
  position: absolute;
  top: calc(100% - 4px);
  left: 0;
  z-index: 8;
  min-width: 182px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 18px 30px rgba(28, 38, 64, 0.16);
  padding: 6px;
  display: grid;
  gap: 4px;
`;

export const ProfilePresenceMenuItem = styled.button<{ $active: boolean }>`
  width: 100%;
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ $active }) => ($active ? "var(--shell-accent-border)" : "transparent")};
  background: ${({ $active }) => ($active ? "var(--shell-accent-soft)" : "transparent")};
  color: ${({ $active, theme }) => ($active ? "var(--shell-accent)" : theme.colors.text)};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--shell-accent-border);
    background: var(--shell-accent-soft);
    color: var(--shell-accent);
  }
`;

export const ProfilePresenceDotMini = styled.i<{
  $presence: "ativo" | "ausente" | "ocupado" | "offline";
}>`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: ${({ $presence }) => profilePresencePalette[$presence].color};
  display: inline-flex;
  flex-shrink: 0;
`;

export const ProfileAction = styled.button<{ $collapsed: boolean }>`
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid var(--shell-accent-border);
  background: var(--shell-accent-soft);
  color: var(--shell-accent);
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: var(--shell-accent);
    background: rgba(255, 255, 255, 0.92);
  }

  ${({ $collapsed }) =>
    $collapsed
      ? css`
          padding: 0;
        `
      : css`
          padding: 0 10px;
        `}
`;

export const SecondaryIdentity = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.88);
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  display: grid;
  gap: 3px;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: var(--shell-accent);
    font-weight: 700;
  }
`;

export const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: flex-start;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 0;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const GroupSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 0 0 auto;
`;

export const GroupTitle = styled.h4<{ $collapsed: boolean }>`
  margin: 0;
  font-size: ${({ $collapsed, theme }) => ($collapsed ? theme.typography.micro : theme.typography.meta)};
  text-transform: ${({ $collapsed }) => ($collapsed ? "uppercase" : "none")};
  letter-spacing: ${({ $collapsed }) => ($collapsed ? "0.08em" : "0.01em")};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ $collapsed }) => ($collapsed ? 800 : 700)};
  padding: ${({ $collapsed }) => ($collapsed ? "0" : "0 6px")};
  text-align: ${({ $collapsed }) => ($collapsed ? "center" : "left")};
`;

export const NavList = styled.nav<{ $collapsed: boolean }>`
  --sidebar-icon-color: var(--shell-accent);
  --sidebar-active-bg: var(--shell-nav-active-bg);
  --sidebar-active-border: var(--shell-accent);
  --sidebar-hover-bg: var(--shell-nav-hover-bg);

  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ $collapsed }) =>
    $collapsed
      ? css`
          a > div {
            justify-content: center;
            padding: 8px 6px;
          }
        `
      : null}
`;

export const ProfileModeCard = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.92);
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

export const ProfileModeButton = styled.button<{ $active: boolean }>`
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ $active, theme }) => ($active ? "var(--shell-accent)" : theme.colors.border)};
  background: ${({ $active }) => ($active ? "var(--shell-accent-soft)" : "#fff")};
  color: ${({ $active, theme }) => ($active ? "var(--shell-accent)" : theme.colors.text)};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const MobileOverlay = styled.button<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    inset: 0;
    border: none;
    background: ${({ theme }) => theme.colors.overlay};
    z-index: 20;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
`;

export const Topbar = styled.header`
  min-height: 74px;
  border-bottom: 1px solid var(--shell-border-strong);
  background: rgba(255, 255, 255, 0.96);
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  position: sticky;
  top: 0;
  z-index: 15;
  box-shadow: 0 10px 20px var(--shell-topbar-shadow);
  backdrop-filter: blur(8px);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.sm}`};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const TopbarMain = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const MobileMenuButton = styled(IconButton)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
    min-width: 32px;
    min-height: 32px;
  }
`;

export const TopbarLogoButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.92);
  background: var(--shell-surface-base);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 34px;
    height: 34px;
  }
`;

export const TopbarLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SearchInputWrap = styled.span`
  width: 100%;
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  background: var(--shell-surface-base);
  color: ${({ theme }) => theme.colors.textMuted};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: var(--shell-accent-border);
    box-shadow: 0 0 0 4px var(--shell-accent-soft);
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.body};
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.bodySm};

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

export const SearchWrap = styled.label`
  max-width: 640px;
  width: 100%;
  min-width: 0;
  flex: 1;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    flex: 1;
    max-width: none;

    ${SearchInputWrap} {
      min-height: 34px;
      padding: 0 ${({ theme }) => theme.spacing.xs};

      input {
        font-size: ${({ theme }) => theme.typography.meta};
      }
    }
  }
`;

export const TopbarActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
    justify-content: flex-end;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    gap: 4px;
    justify-content: flex-end;
    overflow-x: auto;
    padding-bottom: 2px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 999px;
      background: rgba(101, 112, 138, 0.24);
    }
  }
`;

export const QuickLinksGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-right: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const QuickButton = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: var(--shell-surface-soft);
  color: ${({ theme }) => theme.colors.textStrong};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 600;
  padding: 0 11px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--shell-accent);
    color: var(--shell-accent);
    transform: translateY(-1px);
  }
`;

export const ActionButton = styled.button`
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: var(--shell-surface-base);
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--shell-accent);
    color: var(--shell-accent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 32px;
    padding: 0 8px;
  }
`;

export const ActionLabel = styled.span`
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const ActionCount = styled.span`
  min-width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: var(--shell-accent-soft);
  color: var(--shell-accent-hover);
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
`;

export const LogoutActionButton = styled(ActionButton)`
  border-color: var(--shell-accent);
  background: var(--shell-accent);
  color: #fff;

  &:hover {
    border-color: var(--shell-accent-hover);
    background: var(--shell-accent-hover);
    color: #fff;
  }
`;

export const Main = styled.main<{ $compact?: boolean }>`
  padding: ${({ $compact, theme }) =>
    $compact
      ? `${theme.spacing.xs} ${theme.spacing.lg} ${theme.spacing.lg}`
      : `${theme.spacing.sm} ${theme.spacing.lg} ${theme.spacing.lg}`};
  display: grid;
  gap: ${({ $compact, theme }) => ($compact ? theme.spacing.sm : theme.spacing.md)};
  width: 100%;
  max-width: 1540px;
  margin: 0 auto;
  height: 45%;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ $compact, theme }) =>
      $compact
        ? `${theme.spacing.xs} ${theme.spacing.md} ${theme.spacing.md}`
        : `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.md}`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ $compact, theme }) => ($compact ? `${theme.spacing.xs} ${theme.spacing.sm}` : theme.spacing.sm)};
    gap: ${({ $compact, theme }) => ($compact ? theme.spacing.xs : theme.spacing.sm)};

  }
`;
export const PageHeader = styled.section<{ $compact?: boolean; $mode: "hero" | "contextual" }>`
  border: 1px solid var(--shell-border-strong);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ $mode, theme }) => ($mode === "hero" ? theme.surfaces.panelAccent : theme.surfaces.panel)};
  padding: ${({ $compact, $mode, theme }) =>
    $mode === "hero"
      ? $compact
        ? `${theme.spacing.sm} ${theme.spacing.md}`
        : `${theme.spacing.md} ${theme.spacing.lg}`
      : `${theme.spacing.sm} ${theme.spacing.md}`};
  box-shadow: ${({ $mode }) => ($mode === "hero" ? "var(--shell-shadow-soft)" : "none")};

  h1 {
    margin: 0;
    font-size: ${({ $mode, theme }) => ($mode === "hero" ? theme.typography.pageTitle : theme.typography.sectionTitle)};
    font-family: ${({ theme }) => theme.fonts.title};
    line-height: 1.18;
  }

  p {
    margin: ${({ $compact, theme }) => ($compact ? `${theme.spacing.xs} 0 0` : `${theme.spacing.xs} 0 0`)};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ $mode, theme }) => ($mode === "hero" ? theme.typography.body : theme.typography.bodySm)};
    line-height: 1.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ $compact, theme }) => ($compact ? `${theme.spacing.sm} ${theme.spacing.sm}` : theme.spacing.sm)};

    p {
      font-size: ${({ theme }) => theme.typography.bodySm};
    }
  }
`;

export const PageHeaderEyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.typography.micro};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 700;
`;

export const StatsGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Body = styled.section<{ $compact?: boolean }>`
  display: grid;
  gap: ${({ $compact, theme }) => ($compact ? theme.spacing.sm : theme.spacing.md)};

  > :first-child {
    margin-top: 0;
  }
`;
