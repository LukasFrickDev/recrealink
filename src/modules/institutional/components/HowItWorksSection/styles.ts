import styled from "styled-components";

export const Section = styled.section`
  padding: 68px 0;
  background:
    radial-gradient(circle at 12% 14%, rgba(46, 127, 240, 0.1) 0%, rgba(46, 127, 240, 0) 34%),
    radial-gradient(circle at 88% 84%, rgba(249, 111, 38, 0.1) 0%, rgba(249, 111, 38, 0) 36%),
    linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
`;

export const Header = styled.header`
  max-width: 780px;
  text-align: center;
  margin: 0 auto;

  h2 {
    font-size: clamp(30px, 5vw, 44px);
    line-height: 1.1;
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
    line-height: 1.55;
  }
`;

export const Grid = styled.div`
  margin-top: 30px;
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Step = styled.article`
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(162deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.82) 100%);
  padding: 18px;
  box-shadow: 0 10px 20px rgba(28, 38, 64, 0.08);
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 24px rgba(28, 38, 64, 0.12);
  }

  h3 {
    margin-top: 10px;
    font-size: 20px;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
  }
`;

export const StepTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  span {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.brandBlue};
    color: #fff;
    font-weight: 800;
    font-size: 12px;
    box-shadow: 0 8px 14px rgba(46, 127, 240, 0.24);
  }

  small {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(249, 111, 38, 0.28);
    background: rgba(249, 111, 38, 0.12);
    font-size: 15px;
  }
`;

export const StepConnector = styled.div`
  position: absolute;
  top: 34px;
  right: -16px;
  width: 18px;
  height: 2px;
  background: linear-gradient(90deg, rgba(46, 127, 240, 0.32) 0%, rgba(138, 97, 212, 0.26) 100%);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;
