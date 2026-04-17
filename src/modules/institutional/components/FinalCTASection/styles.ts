import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 74px 0;
  color: #fff;
  background:
    radial-gradient(circle at 8% 16%, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0) 36%),
    radial-gradient(circle at 88% 84%, rgba(249, 111, 38, 0.34) 0%, rgba(249, 111, 38, 0) 36%),
    linear-gradient(136deg, #2e7ff0 0%, #8a61d4 56%, #f96f26 100%);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(124deg, rgba(11, 24, 52, 0.3), rgba(11, 24, 52, 0) 44%);
    pointer-events: none;
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: left;
  }

  h2 {
    margin-top: 10px;
    font-size: clamp(34px, 6vw, 52px);
    line-height: 1.05;
  }

  p {
    margin: 10px auto 0;
    max-width: 780px;
    font-size: 19px;
    opacity: 0.94;
    line-height: 1.55;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin: 10px 0 0;
    }
  }
`;

export const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(255, 255, 255, 0.38);
  background: rgba(255, 255, 255, 0.14);
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const StatsGrid = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  article {
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 13px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.17);
    box-shadow: 0 10px 20px rgba(14, 28, 58, 0.2);
  }

  strong {
    display: block;
    font-size: 28px;
  }

  span {
    font-size: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Actions = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  button {
    box-shadow: 0 12px 24px rgba(14, 28, 58, 0.22);
  }

  button svg {
    margin-right: 6px;
  }

  a:nth-child(2) button,
  a:nth-child(3) button {
    border-color: rgba(255, 255, 255, 0.54);
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }

  a:nth-child(2) button:hover,
  a:nth-child(3) button:hover {
    background: rgba(255, 255, 255, 0.14);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;
