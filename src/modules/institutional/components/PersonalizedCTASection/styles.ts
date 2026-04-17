import styled from "styled-components";

export const Section = styled.section<{ $tone: "default" | "recreador" | "hotelaria" | "eventos" | "pais" }>`
  padding: 44px 0 58px;
  background: ${({ $tone }) => {
    if ($tone === "hotelaria") {
      return "linear-gradient(180deg, rgba(249, 111, 38, 0.08) 0%, rgba(255, 255, 255, 0.98) 100%)";
    }

    if ($tone === "eventos") {
      return "linear-gradient(180deg, rgba(138, 97, 212, 0.08) 0%, rgba(255, 255, 255, 0.98) 100%)";
    }

    if ($tone === "pais") {
      return "linear-gradient(180deg, rgba(225, 105, 124, 0.08) 0%, rgba(255, 255, 255, 0.98) 100%)";
    }

    return "linear-gradient(180deg, rgba(46, 127, 240, 0.08) 0%, rgba(255, 255, 255, 0.98) 100%)";
  }};
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Content = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(158deg, #ffffff 0%, rgba(238, 244, 255, 0.86) 100%);
  padding: 24px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1.1fr 0.9fr;
  box-shadow: 0 16px 30px rgba(28, 38, 64, 0.12);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 18px;
  }

  h2 {
    margin-top: 12px;
    font-size: clamp(30px, 4vw, 40px);
    line-height: 1.1;
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
    line-height: 1.5;
    max-width: 640px;
  }
`;

export const Copy = styled.div`
  align-self: center;

  > span {
    border: 1px solid rgba(249, 111, 38, 0.26);
    background: rgba(249, 111, 38, 0.12);
    color: ${({ theme }) => theme.colors.brandOrange};
  }
`;

export const Eyebrow = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brandPurple};
  margin-bottom: 10px;
`;

export const Checklist = styled.ul`
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;

  li {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  li::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.brandBlue};
    box-shadow: 0 0 0 4px rgba(46, 127, 240, 0.16);
    flex: 0 0 auto;
  }
`;

export const Actions = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  button {
    box-shadow: 0 10px 18px rgba(28, 38, 64, 0.16);
  }
`;

export const Visual = styled.div`
  display: grid;
  gap: 12px;
`;

export const VisualImage = styled.figure`
  margin: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  min-height: 210px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 20px rgba(28, 38, 64, 0.12);

  img {
    width: 100%;
    height: 100%;
    min-height: 210px;
    display: block;
    object-fit: cover;
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  align-content: center;

  article {
    border: 1px solid rgba(215, 224, 243, 0.8);
    background: rgba(255, 255, 255, 0.94);
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 14px;
    text-align: center;
    box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);
  }

  strong {
    font-size: 24px;
    display: block;
    color: ${({ theme }) => theme.colors.brandBlue};
  }

  span {
    margin-top: 4px;
    display: block;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
