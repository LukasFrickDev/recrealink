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

  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  background:
    radial-gradient(circle at 100% -6%, var(--shell-accent-soft) 0%, rgba(255, 255, 255, 0) 36%),
    radial-gradient(circle at -10% 106%, rgba(28, 38, 64, 0.05) 0%, rgba(28, 38, 64, 0) 42%),
    ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }

  ${({ $tone }) =>
    $tone === "hotelaria"
      ? css`
          button:focus-visible,
          a:focus-visible,
          input:focus-visible,
          textarea:focus-visible,
          select:focus-visible {
            outline: 2px solid rgba(249, 111, 38, 0.58);
            outline-offset: 2px;
          }

          button:disabled,
          input:disabled,
          textarea:disabled,
          select:disabled {
            opacity: 0.72;
            cursor: not-allowed;
          }
        `
      : null}
`;

export const Sidebar = styled.aside<{ $collapsed: boolean; $mobileOpen: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "88px" : "306px")};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background:
    radial-gradient(circle at 0% 0%, var(--shell-sidebar-radial) 0%, rgba(255, 255, 255, 0) 45%),
    linear-gradient(180deg, #ffffff 0%, var(--shell-sidebar-linear) 50%, #ffffff 100%);
  padding: 16px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 14px;
  transition: width 0.2s ease, transform 0.2s ease;
  box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.55);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    min-height: 100vh;
    transform: translateX(${({ $mobileOpen }) => ($mobileOpen ? "0" : "-100%")});
    width: min(292px, calc(100vw - 20px));
    padding: 14px 12px;
  }
`;

export const SidebarTop = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "space-between")};
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 12px;
`;

export const BrandBlock = styled.div<{ $collapsed: boolean }>`
  display: grid;
  gap: 3px;

  strong {
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 20px;
    line-height: 1;
    display: ${({ $collapsed }) => ($collapsed ? "none" : "block")};
    background: var(--shell-brand-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  span {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--shell-accent-sub-label);
    font-weight: 800;
    display: ${({ $collapsed }) => ($collapsed ? "none" : "block")};
  }
`;

export const IconButton = styled.button`
  min-width: 34px;
  min-height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
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

export const CounterBadge = styled.span`
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--shell-accent);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  position: absolute;
  top: -6px;
  right: -6px;
`;

export const ProfileCard = styled.section<{ $collapsed: boolean }>`
  border: ${({ $collapsed, theme }) => ($collapsed ? "none" : `1px solid ${theme.colors.border}`)};
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    ${({ $collapsed }) =>
      $collapsed
        ? "transparent"
        : "linear-gradient(170deg, rgba(255, 255, 255, 0.98) 0%, var(--shell-accent-soft) 118%)"};
  padding: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
  display: grid;
  gap: ${({ $collapsed }) => ($collapsed ? "8px" : "12px")};
`;

export const ProfileIdentity = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  gap: ${({ $collapsed }) => ($collapsed ? "0" : "10px")};
`;

export const ProfileAvatarWrap = styled.div`
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

export const ProfileMeta = styled.div<{ $collapsed: boolean }>`
  display: grid;
  gap: 2px;
  justify-items: ${({ $collapsed }) => ($collapsed ? "center" : "start")};

  strong {
    font-size: ${({ $collapsed }) => ($collapsed ? "12px" : "13px")};
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    display: ${({ $collapsed }) => ($collapsed ? "none" : "block")};
  }
`;

export const ProfileAction = styled.button<{ $collapsed: boolean }>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid var(--shell-accent-border);
  background: var(--shell-accent-soft);
  color: var(--shell-accent);
  font-size: 12px;
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.88);
  padding: 8px 10px;
  display: grid;
  gap: 3px;

  strong {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-size: 11px;
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
  gap: 12px;
  overflow-y: auto;
  min-height: 0;
  padding-right: 2px;
  padding-bottom: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(101, 112, 138, 0.3);
    border-radius: 999px;
  }
`;

export const GroupSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 0 0 auto;
`;

export const GroupTitle = styled.h4<{ $collapsed: boolean }>`
  margin: 0;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0 6px;
  display: ${({ $collapsed }) => ($collapsed ? "none" : "block")};
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
            padding: 10px;
          }
        `
      : null}
`;

export const ProfileModeCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.92);
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

export const ProfileModeButton = styled.button<{ $active: boolean }>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ $active, theme }) => ($active ? "var(--shell-accent)" : theme.colors.border)};
  background: ${({ $active }) => ($active ? "var(--shell-accent-soft)" : "#fff")};
  color: ${({ $active, theme }) => ($active ? "var(--shell-accent)" : theme.colors.text)};
  font-size: 11px;
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
    background: rgba(28, 38, 64, 0.54);
    z-index: 20;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
`;

export const Topbar = styled.header`
  min-height: 78px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.92);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 15;
  box-shadow: 0 10px 20px var(--shell-topbar-shadow);
  backdrop-filter: blur(8px);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 10px 14px;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--shell-accent) 0%, rgba(255, 255, 255, 0) 52%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px 10px 10px;
    gap: 8px;
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
    gap: 6px;
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
  width: 36px;
  height: 36px;
  border-radius: 999px;
  padding: 0;
  border: 1px solid #fff;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
  }
`;

export const TopbarLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContextBlock = styled.div`
  display: grid;
  gap: 2px;

  h2 {
    margin: 0;
    font-size: 17px;
    line-height: 1.1;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: 1050px) {
    display: none;
  }
`;

export const SearchWrap = styled.label`
  max-width: 460px;
  width: 100%;
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.84);
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
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: none;
    width: auto;
    min-width: 0;
    flex: 1;
    min-height: 32px;
    padding: 0 8px;
    gap: 6px;

    input {
      font-size: 12px;
    }
  }
`;

export const TopbarActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
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

export const QuickButton = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(180deg, #ffffff 0%, rgba(246, 250, 255, 0.96) 100%);
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--shell-accent);
    color: var(--shell-accent);
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const LogoutButton = styled(IconButton)`
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
  padding: ${({ $compact }) => ($compact ? "8px 20px 18px" : "14px 20px 20px")};
  display: grid;
  gap: ${({ $compact }) => ($compact ? "8px" : "10px")};
  width: 100%;
  max-width: 1540px;
  margin: 0 auto;
  height: 45%;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ $compact }) => ($compact ? "8px 14px 14px" : "12px 14px 16px")};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ $compact }) => ($compact ? "6px 10px 12px" : "10px")};
    gap: ${({ $compact }) => ($compact ? "6px" : "8px")};

  }
`;
export const PageHeader = styled.section<{ $compact?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(160deg, var(--shell-accent-soft) 0%, rgba(255, 255, 255, 0.96) 56%);
  padding: ${({ $compact }) => ($compact ? "10px 14px" : "12px 16px")};
  box-shadow: 0 10px 22px rgba(28, 38, 64, 0.07);

  h1 {
    margin: 0;
    font-size: clamp(24px, 4vw, 34px);
    font-family: ${({ theme }) => theme.fonts.title};
    line-height: 1.1;
  }

  p {
    margin: ${({ $compact }) => ($compact ? "1px 0 0" : "4px 0 0")};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ $compact }) => ($compact ? "10px 12px" : "12px")};

    p {
      font-size: 13px;
      line-height: 1.45;
    }
  }
`;

export const StatsGrid = styled.section`
  display: grid;
  gap: 14px;
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
  gap: ${({ $compact }) => ($compact ? "8px" : "10px")};

  > :first-child {
    margin-top: 0;
  }
`;
