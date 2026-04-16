import styled from "styled-components";

export const Page = styled.main<{
  $backgroundGradient: string;
  $backgroundOverlay: string;
  $backgroundImage: string;
  $backgroundImagePosition: string;
}>`
  min-height: 100vh;
  padding: 26px 16px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  background: ${({ $backgroundGradient }) => $backgroundGradient};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${({ $backgroundImage }) => $backgroundImage});
    background-size: cover;
    background-position: ${({ $backgroundImagePosition }) => $backgroundImagePosition};
    opacity: 0.13;
    transform: scale(1.04);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $backgroundOverlay }) => $backgroundOverlay};
  }
`;

export const Glow = styled.div`
  position: absolute;
  z-index: 1;
  width: 320px;
  height: 320px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(55px);
  pointer-events: none;

  &[data-side="right"] {
    top: -140px;
    right: -140px;
  }

  &[data-side="left"] {
    bottom: -140px;
    left: -140px;
  }
`;

export const Container = styled.section`
  width: min(500px, 100%);
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
    max-width: 460px;
    line-height: 1.45;
  }
`;

export const Card = styled.section`
  border-radius: 24px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 251, 255, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.42);
  box-shadow: 0 22px 52px rgba(16, 29, 54, 0.28);
  backdrop-filter: blur(10px);
  padding: 22px;
`;

export const CardHeader = styled.header`
  margin-bottom: 14px;
  text-align: center;

  h2 {
    font-size: clamp(24px, 4vw, 30px);
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 12px;
`;

export const SubmitButton = styled.button<{ $actionColor: string }>`
  width: 100%;
  min-height: 48px;
  border: 1px solid ${({ $actionColor }) => $actionColor};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $actionColor }) => $actionColor};
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const Helper = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1.5;
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;

  a {
    color: ${({ theme }) => theme.colors.brandBlue};
    font-weight: 600;
    opacity: 0.92;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  a:first-child {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &::before {
      content: "←";
      line-height: 1;
    }
  }
`;
