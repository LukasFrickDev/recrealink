import { keyframes, styled } from "styled-components";
import type { ToastTone } from "./types";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const tonePalette = (tone: ToastTone) => {
  if (tone === "success") {
    return {
      border: "rgba(5, 150, 105, 0.35)",
      background: "rgba(5, 150, 105, 0.12)",
      iconBackground: "rgba(5, 150, 105, 0.2)",
      iconColor: "#047857",
    };
  }

  if (tone === "warning") {
    return {
      border: "rgba(202, 138, 4, 0.35)",
      background: "rgba(202, 138, 4, 0.12)",
      iconBackground: "rgba(202, 138, 4, 0.2)",
      iconColor: "#a16207",
    };
  }

  if (tone === "danger") {
    return {
      border: "rgba(220, 38, 38, 0.35)",
      background: "rgba(220, 38, 38, 0.11)",
      iconBackground: "rgba(220, 38, 38, 0.18)",
      iconColor: "#b91c1c",
    };
  }

  return {
    border: "rgba(29, 78, 216, 0.35)",
    background: "rgba(29, 78, 216, 0.1)",
    iconBackground: "rgba(29, 78, 216, 0.16)",
    iconColor: "#1d4ed8",
  };
};

export const ToastViewport = styled.div`
  position: fixed;
  top: 0.95rem;
  right: 0.95rem;
  width: min(360px, calc(100vw - 1.6rem));
  display: grid;
  gap: 0.56rem;
  z-index: 1500;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: auto;
    right: 0.72rem;
    left: 0.72rem;
    bottom: 0.8rem;
    width: auto;
  }
`;

export const ToastCard = styled.article<{ $tone: ToastTone }>`
  pointer-events: auto;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ $tone }) => tonePalette($tone).border};
  background: ${({ $tone }) => tonePalette($tone).background};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 0.6rem 0.65rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 0.5rem;
  animation: ${slideIn} 190ms ease-out;
`;

export const IconWrap = styled.span<{ $tone: ToastTone }>`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $tone }) => tonePalette($tone).iconBackground};
  color: ${({ $tone }) => tonePalette($tone).iconColor};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: grid;
  gap: 0.22rem;

  strong {
    font-size: 0.76rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.4;
  }
`;

export const CloseButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  width: 1.45rem;
  height: 1.45rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(100, 116, 139, 0.12);
  }
`;