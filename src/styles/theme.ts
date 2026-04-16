export const theme = {
  colors: {
    brandBlue: "#2E7FF0",
    brandOrange: "#F96F26",
    brandPurple: "#8A61D4",
    brandRose: "#E1697C",
    brandMagenta: "#E376EF",
    background: "#F4F7FC",
    surface: "#FFFFFF",
    surfaceSoft: "#EEF4FF",
    text: "#1C2640",
    textMuted: "#5B6888",
    border: "#D7E0F3",
    success: "#17A766",
    warning: "#E39A12",
    danger: "#D34D62",
  },
  fonts: {
    title: '"Manrope", "Sora", sans-serif',
    body: '"Inter", sans-serif',
  },
  breakpoints: {
    mobile: "640px",
    tablet: "900px",
    desktop: "1200px",
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "18px",
    pill: "999px",
  },
  shadows: {
    sm: "0 8px 20px rgba(46, 127, 240, 0.08)",
    md: "0 14px 34px rgba(28, 38, 64, 0.12)",
    lg: "0 20px 52px rgba(28, 38, 64, 0.18)",
  },
};

export type AppTheme = typeof theme;
