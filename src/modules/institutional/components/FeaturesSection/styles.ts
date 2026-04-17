import styled from "styled-components";
import type { AudienceKey } from "@/modules/institutional/mocks/home";

export const Section = styled.section<{ $tone: AudienceKey }>`
  padding: 62px 0;
  background: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "linear-gradient(180deg, rgba(249, 111, 38, 0.07) 0%, #ffffff 100%)";
    }

    if ($tone === "eventos") {
      return "linear-gradient(180deg, rgba(138, 97, 212, 0.07) 0%, #ffffff 100%)";
    }

    if ($tone === "pais") {
      return "linear-gradient(180deg, rgba(225, 105, 124, 0.07) 0%, #ffffff 100%)";
    }

    return "linear-gradient(180deg, rgba(46, 127, 240, 0.07) 0%, #ffffff 100%)";
  }};
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Header = styled.header`
  max-width: 780px;

  h2 {
    font-size: clamp(28px, 5vw, 42px);
    line-height: 1.1;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
    line-height: 1.5;
  }
`;

export const Flavor = styled.span`
  margin-top: 14px;
  display: inline-flex;
  border: 1px solid rgba(46, 127, 240, 0.28);
  background: rgba(46, 127, 240, 0.1);
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const EmptyIntro = styled.article`
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.82) 100%);
  padding: 16px;
  box-shadow: 0 10px 20px rgba(28, 38, 64, 0.08);

  strong {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const PreviewGrid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  article {
    border: 1px solid rgba(215, 224, 243, 0.88);
    border-radius: ${({ theme }) => theme.radii.md};
    background: rgba(255, 255, 255, 0.95);
    padding: 10px;
    display: grid;
    gap: 6px;
  }

  span {
    font-size: 20px;
  }

  strong {
    font-size: 12px;
    line-height: 1.35;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Card = styled.article`
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.84) 100%);
  padding: 16px;
  box-shadow: 0 10px 20px rgba(28, 38, 64, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 24px rgba(28, 38, 64, 0.12);
  }

  h3 {
    margin-top: 8px;
    font-size: 19px;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  span {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    border: 1px solid rgba(46, 127, 240, 0.2);
    background: rgba(46, 127, 240, 0.1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  small {
    border: 1px solid rgba(138, 97, 212, 0.24);
    background: rgba(138, 97, 212, 0.1);
    color: ${({ theme }) => theme.colors.brandPurple};
    border-radius: ${({ theme }) => theme.radii.pill};
    padding: 5px 9px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
`;
