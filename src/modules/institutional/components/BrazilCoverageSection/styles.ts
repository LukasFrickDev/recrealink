import styled from "styled-components";

export const Section = styled.section`
  padding: 62px 0;
  background: linear-gradient(180deg, rgba(238, 244, 255, 0.55) 0%, rgba(255, 255, 255, 0.98) 100%);
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Header = styled.header`
  text-align: center;
  max-width: 760px;
  margin: 0 auto;

  h2 {
    font-size: clamp(30px, 5vw, 42px);
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
    line-height: 1.55;
  }
`;

export const Layout = styled.div`
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const MapCard = styled.article`
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(160deg, #ffffff 0%, rgba(234, 243, 255, 0.9) 100%);
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: 0 12px 24px rgba(28, 38, 64, 0.1);
`;

export const MapTitle = styled.div`
  display: grid;
  gap: 4px;

  strong {
    font-size: 18px;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 13px;
  }
`;

export const MapSurface = styled.div`
  position: relative;
  min-height: 290px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid rgba(215, 224, 243, 0.84);
  background:
    radial-gradient(circle at 18% 18%, rgba(46, 127, 240, 0.16) 0%, rgba(46, 127, 240, 0) 34%),
    radial-gradient(circle at 84% 82%, rgba(249, 111, 38, 0.18) 0%, rgba(249, 111, 38, 0) 32%),
    linear-gradient(168deg, rgba(255, 255, 255, 0.96) 0%, rgba(238, 244, 255, 0.8) 100%);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 22px;
    background: linear-gradient(160deg, rgba(46, 127, 240, 0.14) 0%, rgba(138, 97, 212, 0.1) 100%);
    border: 1px solid rgba(46, 127, 240, 0.18);
    border-radius: 54% 46% 60% 40% / 52% 38% 62% 48%;
    opacity: 0.8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 240px;
  }
`;

export const Pin = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: center;
  gap: 4px;
  z-index: 2;

  i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.brandBlue};
    box-shadow: 0 0 0 6px rgba(46, 127, 240, 0.18);
    animation: pulse-marker 2.4s ease-in-out infinite;
  }

  small {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(215, 224, 243, 0.92);
    white-space: nowrap;
  }

  @keyframes pulse-marker {
    0%,
    100% {
      box-shadow: 0 0 0 6px rgba(46, 127, 240, 0.18);
    }

    50% {
      box-shadow: 0 0 0 10px rgba(46, 127, 240, 0.1);
    }
  }
`;

export const CityList = styled.div`
  display: grid;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const CityCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 255, 0.82) 100%);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);

  strong {
    font-size: 14px;
    display: block;
  }

  small {
    margin-top: 3px;
    display: block;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }

  span {
    border: 1px solid rgba(46, 127, 240, 0.26);
    background: rgba(46, 127, 240, 0.1);
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;
