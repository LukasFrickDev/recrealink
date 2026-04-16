import styled from "styled-components";

export const Wrapper = styled.section<{ $tone: "recreador" | "hotelaria" | "empresa" | "pais" }>`
  --uc-accent: ${({ $tone, theme }) => {
    if ($tone === "hotelaria") {
      return theme.colors.brandOrange;
    }

    if ($tone === "empresa") {
      return theme.colors.brandPurple;
    }

    if ($tone === "pais") {
      return theme.colors.brandRose;
    }

    return theme.colors.brandBlue;
  }};
  --uc-accent-soft: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.12)";
    }

    if ($tone === "empresa") {
      return "rgba(138, 97, 212, 0.12)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.12)";
    }

    return "rgba(46, 127, 240, 0.12)";
  }};
  --uc-accent-border: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "rgba(249, 111, 38, 0.34)";
    }

    if ($tone === "empresa") {
      return "rgba(138, 97, 212, 0.34)";
    }

    if ($tone === "pais") {
      return "rgba(225, 105, 124, 0.34)";
    }

    return "rgba(46, 127, 240, 0.34)";
  }};

  display: grid;
  gap: 14px;
  width: min(100%, 920px);
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, var(--uc-accent-soft) 0%, rgba(227, 118, 239, 0) 42%),
    linear-gradient(165deg, rgba(238, 244, 255, 0.84) 0%, #ffffff 100%);
  box-shadow: 0 14px 30px rgba(28, 38, 64, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const Header = styled.header`
  display: grid;
  gap: 8px;
`;

export const StatusBadge = styled.span`
  justify-self: start;
  min-height: 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid var(--uc-accent-border);
  background: var(--uc-accent-soft);
  color: var(--uc-accent);
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const Subtitle = styled.h2`
  margin: 0;
  font-size: clamp(20px, 3vw, 26px);
  font-family: ${({ theme }) => theme.fonts.title};
  line-height: 1.15;
`;

export const Message = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
  max-width: 72ch;
`;

export const InfoGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const InfoCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.92);
  padding: 12px;
  display: grid;
  gap: 8px;

  h4 {
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
  }

  ul {
    margin: 0;
    padding-left: 18px;
    display: grid;
    gap: 6px;
  }

  li {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const BackButton = styled.button`
  justify-self: end;
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid var(--uc-accent-border);
  background: var(--uc-accent-soft);
  color: var(--uc-accent);
  font-size: 12px;
  font-weight: 700;
  padding: 0 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--uc-accent-border);
    background: var(--uc-accent-soft);
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-self: start;
  }
`;
