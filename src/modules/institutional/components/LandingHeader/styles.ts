import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const Actions = styled.div`
  display: inline-flex;
  gap: 10px;
`;
