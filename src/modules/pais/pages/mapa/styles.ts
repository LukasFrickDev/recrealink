import styled from "styled-components";

const accentStrong = "rgba(225, 105, 124, 0.34)";
const accentSoft = "rgba(225, 105, 124, 0.1)";
const accentText = "#c85063";

export const Wrapper = styled.div`
  display: grid;
  gap: 12px;
`;

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 12px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const MapPanel = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fff;
  padding: 12px;
  display: grid;
  gap: 10px;
`;

export const MapHeader = styled.header`
  display: grid;
  gap: 3px;

  h3 {
    margin: 0;
    font-size: 17px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }
`;

export const MapCanvas = styled.div`
  min-height: 248px;
  position: relative;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${accentStrong};
  background:
    radial-gradient(circle at 18% 24%, rgba(225, 105, 124, 0.14) 0%, rgba(225, 105, 124, 0) 34%),
    radial-gradient(circle at 72% 38%, rgba(46, 163, 106, 0.18) 0%, rgba(46, 163, 106, 0) 36%),
    radial-gradient(circle at 52% 72%, rgba(197, 138, 45, 0.16) 0%, rgba(197, 138, 45, 0) 36%),
    linear-gradient(145deg, #fff 0%, ${accentSoft} 100%);
`;

export const MapSpot = styled.button<{ $left: number; $top: number; $tone: "empresa" | "recreador" | "hotel" }>`
  position: absolute;
  left: ${({ $left }) => `${$left}%`};
  top: ${({ $top }) => `${$top}%`};
  transform: translate(-50%, -50%);
  min-width: 78px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ $tone }) => {
      if ($tone === "empresa") {
        return "rgba(200, 80, 99, 0.44)";
      }

      if ($tone === "recreador") {
        return "rgba(46, 163, 106, 0.45)";
      }

      return "rgba(197, 138, 45, 0.44)";
    }};
  background: #fff;
  padding: 6px 8px;
  display: grid;
  gap: 1px;
  cursor: default;
  text-align: left;

  strong {
    font-size: 12px;
    color: ${({ $tone }) => {
      if ($tone === "empresa") {
        return "#c85063";
      }

      if ($tone === "recreador") {
        return "#2ea36a";
      }

      return "#c58a2d";
    }};
  }

  span {
    font-size: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
  }
`;

export const LegendRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const LegendItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: #fff;
  padding: 4px 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  i {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    display: inline-block;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
  }
`;

export const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const RegionCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 9px 10px;
  display: grid;
  gap: 3px;

  strong {
    font-size: 13px;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SideColumn = styled.aside`
  display: grid;
  gap: 12px;
`;

export const NearbyList = styled.div`
  display: grid;
  gap: 8px;
`;

export const NearbyItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 9px;
  display: grid;
  gap: 5px;

  h4 {
    margin: 0;
    font-size: 13px;
  }

  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const MetaLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 11px;
    color: ${accentText};
    font-weight: 700;
  }
`;

export const HintList = styled.ul`
  margin: 0;
  padding-left: 16px;
  display: grid;
  gap: 6px;

  li {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;
