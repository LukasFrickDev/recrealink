import styled from "styled-components";

export const BackButton = styled.button<{ $tone: "dark" | "light" | "tertiary" }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: ${({ $tone }) => ($tone === "tertiary" ? "34px" : "38px")};
  padding: ${({ $tone }) => ($tone === "tertiary" ? "0 8px" : "0 14px")};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid
    ${({ $tone }) =>
      $tone === "tertiary"
        ? "transparent"
        : $tone === "light"
        ? "rgba(46, 127, 240, 0.26)"
        : "rgba(255, 255, 255, 0.38)"};
  background: ${({ $tone }) =>
    $tone === "tertiary"
      ? "transparent"
      : $tone === "light"
      ? "rgba(46, 127, 240, 0.08)"
      : "rgba(255, 255, 255, 0.14)"};
  color: ${({ theme, $tone }) => ($tone === "dark" ? "#ffffff" : theme.colors.brandBlue)};
  font-size: 13px;
  font-weight: ${({ $tone }) => ($tone === "tertiary" ? 600 : 700)};
  cursor: pointer;
  backdrop-filter: ${({ $tone }) => ($tone === "tertiary" ? "none" : "blur(5px)")};
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ $tone }) =>
      $tone === "tertiary"
        ? "rgba(46, 127, 240, 0.06)"
        : $tone === "light"
        ? "rgba(46, 127, 240, 0.13)"
        : "rgba(255, 255, 255, 0.22)"};
    border-color: ${({ $tone }) =>
      $tone === "tertiary"
        ? "transparent"
        : $tone === "light"
        ? "rgba(46, 127, 240, 0.42)"
        : "rgba(255, 255, 255, 0.52)"};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Arrow = styled.span`
  font-size: 15px;
  line-height: 1;
`;
