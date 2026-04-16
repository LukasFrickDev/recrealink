import styled from "styled-components";

export const Page = styled.main<{ $backgroundImage: string }>`
  min-height: 100vh;
  padding: 30px 16px;
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #2e7ff0 0%, #8a61d4 100%);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${({ $backgroundImage }) => $backgroundImage});
    background-size: cover;
    background-position: center;
    opacity: 0.12;
    transform: scale(1.04);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(18, 38, 72, 0.6) 0%, rgba(138, 97, 212, 0.28) 100%);
  }
`;

export const Glow = styled.div`
  position: absolute;
  z-index: 1;
  width: 360px;
  height: 360px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  filter: blur(60px);
  pointer-events: none;

  &[data-side="right"] {
    top: -150px;
    right: -150px;
  }

  &[data-side="left"] {
    bottom: -150px;
    left: -150px;
  }
`;

export const Container = styled.section`
  width: min(940px, 100%);
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

export const Brand = styled.header`
  display: grid;
  justify-items: center;
  text-align: center;
  margin-bottom: 14px;

  img {
    width: clamp(126px, 28vw, 184px);
    height: auto;
    object-fit: contain;
    margin-bottom: 8px;
  }

  span {
    margin-top: 2px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 14px;
    max-width: 560px;
    line-height: 1.45;
  }
`;

export const Panel = styled.div`
  border-radius: 28px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 251, 255, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.42);
  box-shadow: 0 24px 56px rgba(16, 29, 54, 0.28);
  backdrop-filter: blur(10px);
  padding: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px;
    border-radius: 22px;
  }
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const Header = styled.header`
  text-align: center;

  h1 {
    font-size: clamp(28px, 4vw, 40px);
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 16px;
    max-width: 680px;
    margin-inline: auto;
    line-height: 1.5;
  }
`;

export const Grid = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ProfileCard = styled.button<{ $active: boolean }>`
  text-align: left;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(46, 127, 240, 0.6)" : "rgba(125, 146, 184, 0.32)"};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ $active }) => ($active ? "linear-gradient(145deg, rgba(46,127,240,0.16) 0%, rgba(227,118,239,0.1) 100%)" : "rgba(255,255,255,0.92)")};
  padding: 18px 16px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(46, 127, 240, 0.55);
    box-shadow: 0 14px 28px rgba(46, 127, 240, 0.16);
  }

  strong {
    display: block;
    font-size: 19px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const ProfileHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const ProfileLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileIconWrap = styled.span<{ $tone: "recreador" | "hotelaria" | "empresa" | "pais" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $tone }) =>
    $tone === "recreador"
      ? "#2e7ff0"
      : $tone === "hotelaria"
      ? "#f96f26"
      : $tone === "empresa"
      ? "#8a61d4"
      : "#e1697c"};
  flex-shrink: 0;
`;


export const Actions = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ $secondary?: boolean }>`
  min-height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 20px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid ${({ $secondary }) => ($secondary ? "rgba(46, 127, 240, 0.35)" : "#2e7ff0")};
  background: ${({ $secondary }) => ($secondary ? "rgba(255, 255, 255, 0.86)" : "#2e7ff0")};
  color: ${({ $secondary }) => ($secondary ? "#2e7ff0" : "#ffffff")};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const MobileBackAction = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 8px;
    display: flex;
    justify-content: center;
  }
`;
