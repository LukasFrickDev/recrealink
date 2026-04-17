import styled, { css } from "styled-components";
import type { AudienceKey } from "@/modules/institutional/mocks/home";

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 8% 18%, rgba(46, 127, 240, 0.1) 0%, rgba(46, 127, 240, 0) 34%),
    radial-gradient(circle at 92% 82%, rgba(138, 97, 212, 0.1) 0%, rgba(138, 97, 212, 0) 34%),
    ${({ theme }) => theme.colors.surface};
  padding: 62px 0;
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Header = styled.header`
  text-align: center;
  max-width: 820px;
  margin: 0 auto;

  h2 {
    font-size: clamp(30px, 5vw, 44px);
  }

  p {
    margin-top: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
    line-height: 1.55;
  }
`;

export const SelectedState = styled.div`
  margin-top: 20px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(46, 127, 240, 0.28);
  background: rgba(46, 127, 240, 0.08);
  padding: 10px 14px;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 13px;

  strong {
    font-weight: 800;
  }

  button {
    border: 1px solid rgba(46, 127, 240, 0.32);
    border-radius: ${({ theme }) => theme.radii.pill};
    background: rgba(255, 255, 255, 0.9);
    color: ${({ theme }) => theme.colors.brandBlue};
    font-size: 12px;
    font-weight: 700;
    padding: 6px 10px;
    cursor: pointer;
  }
`;

export const Grid = styled.div`
  margin-top: 28px;
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

const toneAccent = (tone: AudienceKey) => {
  if (tone === "hotelaria") {
    return {
      border: "rgba(249, 111, 38, 0.36)",
      bg: "linear-gradient(165deg, rgba(249, 111, 38, 0.14) 0%, rgba(255, 255, 255, 0.98) 100%)",
      text: "#ca5d1f",
    };
  }

  if (tone === "eventos") {
    return {
      border: "rgba(138, 97, 212, 0.36)",
      bg: "linear-gradient(165deg, rgba(138, 97, 212, 0.14) 0%, rgba(255, 255, 255, 0.98) 100%)",
      text: "#6f4bb4",
    };
  }

  if (tone === "pais") {
    return {
      border: "rgba(225, 105, 124, 0.36)",
      bg: "linear-gradient(165deg, rgba(225, 105, 124, 0.14) 0%, rgba(255, 255, 255, 0.98) 100%)",
      text: "#bf4a5f",
    };
  }

  return {
    border: "rgba(46, 127, 240, 0.36)",
    bg: "linear-gradient(165deg, rgba(46, 127, 240, 0.14) 0%, rgba(255, 255, 255, 0.98) 100%)",
    text: "#2e7ff0",
  };
};

export const Card = styled.button<{ $selected: boolean; $tone: AudienceKey }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fff;
  padding: 0;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 10px 22px rgba(28, 38, 64, 0.08);

  ${({ $selected, $tone }) =>
    $selected
      ? css`
          border-color: ${toneAccent($tone).border};
          background: ${toneAccent($tone).bg};
          box-shadow: 0 16px 30px rgba(28, 38, 64, 0.16);
        `
      : null}

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ $tone }) => toneAccent($tone).border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 124px;
  overflow: hidden;
  border-bottom: 1px solid rgba(215, 224, 243, 0.8);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

export const CardBody = styled.div`
  padding: 16px;

  h3 {
    margin-top: 8px;
    font-size: 21px;
  }

  strong {
    margin-top: 6px;
    display: block;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const IconBubble = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(215, 224, 243, 0.8);
  font-size: 22px;
  box-shadow: 0 6px 14px rgba(28, 38, 64, 0.1);
`;
