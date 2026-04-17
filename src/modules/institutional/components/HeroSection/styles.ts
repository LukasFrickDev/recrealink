import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 8% 14%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 26%),
    radial-gradient(circle at 88% 84%, rgba(249, 111, 38, 0.3) 0%, rgba(249, 111, 38, 0) 30%),
    linear-gradient(132deg, #1f67dc 0%, #7351cb 54%, #f96f26 100%);
  color: #fff;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(120deg, rgba(12, 32, 79, 0.26), rgba(12, 32, 79, 0) 44%),
      repeating-linear-gradient(
        -42deg,
        rgba(255, 255, 255, 0.06) 0,
        rgba(255, 255, 255, 0.06) 2px,
        rgba(255, 255, 255, 0) 2px,
        rgba(255, 255, 255, 0) 16px
      );
    pointer-events: none;
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  padding: 92px 18px 78px;
  display: grid;
  grid-template-columns: 1.02fr 0.98fr;
  gap: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    padding: 76px 18px 62px;
  }
`;

export const Left = styled.div`
  align-self: center;

  p {
    margin-top: 16px;
    max-width: 620px;
    font-size: clamp(18px, 2.3vw, 22px);
    line-height: 1.5;
    opacity: 0.92;
  }
`;

export const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Title = styled.h1`
  margin-top: 18px;
  font-size: clamp(36px, 6vw, 62px);
  line-height: 1;
  max-width: 760px;

  span {
    color: #ffe1c0;
    text-shadow: 0 12px 24px rgba(28, 38, 64, 0.24);
  }
`;

export const StatPills = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 9px;
  flex-wrap: wrap;

  span {
    border: 1px solid rgba(255, 255, 255, 0.42);
    background: rgba(255, 255, 255, 0.16);
    color: #fff;
    font-weight: 700;
  }
`;

export const Actions = styled.div`
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  button {
    box-shadow: 0 12px 24px rgba(20, 31, 58, 0.24);
  }

  button svg {
    margin-left: 6px;
  }

  a:nth-child(2) button {
    border-color: rgba(255, 255, 255, 0.66);
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
  }

  a:nth-child(2) button:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

export const Right = styled.aside`
  display: grid;
  gap: 14px;
`;

export const Spotlight = styled.article`
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 20px;
  min-height: 220px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 38px rgba(16, 26, 52, 0.34);

  img {
    width: 100%;
    height: 100%;
    min-height: 220px;
    object-fit: cover;
    display: block;
  }
`;

export const SpotlightOverlay = styled.div`
  position: absolute;
  inset: auto 0 0;
  padding: 16px;
  background: linear-gradient(180deg, rgba(11, 22, 48, 0) 0%, rgba(11, 22, 48, 0.86) 84%);

  strong {
    display: block;
    font-size: 18px;
    line-height: 1.2;
    color: #fff;
  }

  p {
    margin-top: 6px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 13px;
    line-height: 1.45;
  }
`;

export const RightPanel = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(12px);
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: 0 16px 28px rgba(20, 31, 58, 0.24);
`;

export const RightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    letter-spacing: 0.01em;
    text-transform: capitalize;
  }

  span {
    background: rgba(23, 167, 102, 0.22);
    border: 1px solid rgba(23, 167, 102, 0.42);
    color: #ffffff;
  }
`;

export const JobCard = styled.article`
  background: rgba(255, 255, 255, 0.95);
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 16px rgba(14, 29, 62, 0.14);

  h4 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 4px 0 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  small {
    margin-top: 10px;
    display: block;
    color: ${({ theme }) => theme.colors.brandBlue};
    font-size: 12px;
    font-weight: 700;
  }
`;

export const JobMeta = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }

  > span:first-child {
    border: 1px solid rgba(249, 111, 38, 0.32);
    background: rgba(249, 111, 38, 0.12);
    color: ${({ theme }) => theme.colors.brandOrange};
  }
`;

export const Alert = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.26);

  div {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-weight: 700;
  }

  small {
    margin-top: 4px;
    display: block;
    opacity: 0.88;
  }
`;
