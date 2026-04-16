import styled, { css } from "styled-components";

export const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: 56px 0;
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
  }
`;

export const Grid = styled.div`
  margin-top: 28px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Card = styled.button<{ $selected: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  ${({ $selected }) =>
    $selected
      ? css`
          border-color: #2e7ff0;
          box-shadow: 0 14px 30px rgba(46, 127, 240, 0.16);
        `
      : null}

  &:hover {
    transform: translateY(-2px);
  }

  span {
    font-size: 34px;
  }

  h3 {
    margin-top: 10px;
    font-size: 20px;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
  }
`;
