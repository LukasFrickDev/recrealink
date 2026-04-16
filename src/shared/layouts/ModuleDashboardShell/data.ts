export type ModuleDashboardTone = "recreador" | "hotelaria" | "empresa" | "pais";

export interface ModuleDashboardThemeTokens {
  accent: string;
  accentHover: string;
  brandGradient: string;
  accentSoft: string;
  accentBorder: string;
  accentSubLabel: string;
  sidebarRadial: string;
  sidebarLinear: string;
  profileGradientStart: string;
  profileGradientEnd: string;
  topbarBorder: string;
  topbarShadow: string;
  navActiveBg: string;
  navHoverBg: string;
}

const sharedBrandGradient =
  "linear-gradient(120deg, #2e7ff0 0%, #8a61d4 36%, #e1697c 68%, #f96f26 100%)";

export const moduleDashboardThemeByTone: Record<ModuleDashboardTone, ModuleDashboardThemeTokens> = {
  recreador: {
    accent: "#2e7ff0",
    accentHover: "#1f67c8",
    brandGradient: sharedBrandGradient,
    accentSoft: "rgba(46, 127, 240, 0.08)",
    accentBorder: "rgba(46, 127, 240, 0.28)",
    accentSubLabel: "#2e7ff0",
    sidebarRadial: "rgba(46, 127, 240, 0.1)",
    sidebarLinear: "#edf4ff",
    profileGradientStart: "rgba(46, 127, 240, 0.32)",
    profileGradientEnd: "rgba(227, 118, 239, 0.32)",
    topbarBorder: "rgba(46, 127, 240, 0.28)",
    topbarShadow: "rgba(46, 127, 240, 0.12)",
    navActiveBg: "rgba(46, 127, 240, 0.14)",
    navHoverBg: "rgba(46, 127, 240, 0.08)",
  },
  hotelaria: {
    accent: "#f96f26",
    accentHover: "#ea5f16",
    brandGradient: sharedBrandGradient,
    accentSoft: "rgba(249, 111, 38, 0.08)",
    accentBorder: "rgba(249, 111, 38, 0.3)",
    accentSubLabel: "#f96f26",
    sidebarRadial: "rgba(249, 111, 38, 0.14)",
    sidebarLinear: "#fff6f0",
    profileGradientStart: "rgba(249, 111, 38, 0.34)",
    profileGradientEnd: "rgba(225, 105, 124, 0.34)",
    topbarBorder: "rgba(249, 111, 38, 0.34)",
    topbarShadow: "rgba(249, 111, 38, 0.15)",
    navActiveBg: "rgba(249, 111, 38, 0.14)",
    navHoverBg: "rgba(249, 111, 38, 0.08)",
  },
  empresa: {
    accent: "#8a61d4",
    accentHover: "#6f4ab2",
    brandGradient: sharedBrandGradient,
    accentSoft: "rgba(138, 97, 212, 0.1)",
    accentBorder: "rgba(138, 97, 212, 0.3)",
    accentSubLabel: "#7b55c3",
    sidebarRadial: "rgba(138, 97, 212, 0.14)",
    sidebarLinear: "#f5efff",
    profileGradientStart: "rgba(138, 97, 212, 0.35)",
    profileGradientEnd: "rgba(193, 140, 255, 0.35)",
    topbarBorder: "rgba(138, 97, 212, 0.34)",
    topbarShadow: "rgba(138, 97, 212, 0.16)",
    navActiveBg: "rgba(138, 97, 212, 0.16)",
    navHoverBg: "rgba(138, 97, 212, 0.09)",
  },
  pais: {
    accent: "#e1697c",
    accentHover: "#c85063",
    brandGradient: sharedBrandGradient,
    accentSoft: "rgba(225, 105, 124, 0.1)",
    accentBorder: "rgba(225, 105, 124, 0.34)",
    accentSubLabel: "#e1697c",
    sidebarRadial: "rgba(225, 105, 124, 0.16)",
    sidebarLinear: "#fff3f6",
    profileGradientStart: "rgba(225, 105, 124, 0.36)",
    profileGradientEnd: "rgba(227, 118, 239, 0.3)",
    topbarBorder: "rgba(225, 105, 124, 0.34)",
    topbarShadow: "rgba(225, 105, 124, 0.16)",
    navActiveBg: "rgba(225, 105, 124, 0.16)",
    navHoverBg: "rgba(225, 105, 124, 0.08)",
  },
};
