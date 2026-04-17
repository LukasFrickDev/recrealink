import styled from "styled-components";

export const Section = styled.section`
  padding: 64px 0;
  background:
    radial-gradient(circle at 12% 16%, rgba(138, 97, 212, 0.1) 0%, rgba(138, 97, 212, 0) 38%),
    radial-gradient(circle at 88% 84%, rgba(46, 127, 240, 0.1) 0%, rgba(46, 127, 240, 0) 34%),
    #ffffff;
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Header = styled.header`
  max-width: 760px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: clamp(30px, 5vw, 42px);
    line-height: 1.1;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
    line-height: 1.55;
  }
`;

export const Wrapper = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 14px;
  grid-template-columns: 1.2fr 0.8fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HighlightCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(168deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.9) 100%);
  padding: 20px;
  box-shadow: 0 14px 30px rgba(28, 38, 64, 0.12);

  blockquote {
    margin: 14px 0 0;
    font-size: 20px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;

    blockquote {
      font-size: 17px;
    }
  }
`;

export const HighlightTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  strong {
    display: block;
    font-size: 17px;
  }

  small {
    display: block;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 13px;
  }
`;

export const ResultBadge = styled.span`
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(249, 111, 38, 0.32);
  background: rgba(249, 111, 38, 0.12);
  color: ${({ theme }) => theme.colors.brandOrange};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 7px 11px;
`;

export const Controls = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  button {
    min-width: 38px;
    padding: 0;
  }
`;

export const Dots = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  button {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: none;
    background: rgba(91, 104, 136, 0.32);
    cursor: pointer;
  }

  button[aria-current="true"] {
    background: ${({ theme }) => theme.colors.brandBlue};
    transform: scale(1.14);
  }
`;

export const SideGrid = styled.div`
  display: grid;
  gap: 10px;
  align-content: start;
`;

export const SideCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.94);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);

  strong {
    display: block;
    font-size: 14px;
  }

  small {
    display: block;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }
`;
