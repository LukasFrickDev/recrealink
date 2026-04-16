import styled from "styled-components";
import { Link } from "react-router-dom";

const accentStrong = "rgba(225, 105, 124, 0.34)";
const accentSoft = "rgba(225, 105, 124, 0.1)";
const accentText = "#c85063";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const WelcomePanel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(160deg, ${accentSoft} 0%, #fff 52%);
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: 0 10px 22px rgba(28, 38, 64, 0.08);
`;

export const WelcomeHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 3px 0 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const WelcomeAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid ${accentStrong};
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${accentText};
  flex-shrink: 0;
`;

export const HighlightStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HighlightCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.94);
  padding: 10px;
  display: grid;
  gap: 3px;

  strong {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const PrimaryActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  a {
    min-height: 32px;
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid ${accentStrong};
    background: rgba(255, 255, 255, 0.94);
    color: ${accentText};
    text-decoration: none;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 700;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: ${accentSoft};
      transform: translateY(-1px);
    }
  }
`;

export const QuickActionsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const QuickActionLink = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.95);
  min-height: 104px;
  padding: 10px;
  display: grid;
  gap: 8px;
  align-content: start;
  text-decoration: none;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.07);
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  svg {
    color: ${accentText};
  }

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 1px 0 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }

  &:hover {
    border-color: ${accentStrong};
    background: ${accentSoft};
    transform: translateY(-1px);
  }
`;

export const MainGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ProviderGrid = styled.div`
  display: grid;
  gap: 8px;
`;

export const ProviderCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.94);
  padding: 10px;
  display: grid;
  gap: 7px;
  box-shadow: 0 6px 14px rgba(28, 38, 64, 0.06);

  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ProviderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  h4 {
    margin: 0;
    font-size: 13px;
  }

  strong {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ProviderRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    color: #d39b18;
  }

  span {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ProviderTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const TipsGrid = styled.div`
  display: grid;
  gap: 8px;
`;

export const TipCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.94);
  padding: 10px;
  display: grid;
  gap: 3px;
  box-shadow: 0 6px 14px rgba(28, 38, 64, 0.06);

  strong {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;
