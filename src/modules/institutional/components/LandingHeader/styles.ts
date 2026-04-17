import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.88);
  border-bottom: 1px solid rgba(215, 224, 243, 0.84);
  box-shadow: 0 8px 18px rgba(28, 38, 64, 0.08);
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Brand = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandPurple});
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 18px;

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
    border-radius: ${({ theme }) => theme.radii.pill};
    padding: 8px 10px;
    transition: color 0.2s ease, background 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.brandBlue};
      background: rgba(46, 127, 240, 0.1);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const Actions = styled.div`
  display: inline-flex;
  gap: 10px;

  > a:first-child button {
    border-color: rgba(46, 127, 240, 0.4);
    background: rgba(46, 127, 240, 0.06);
  }
`;
