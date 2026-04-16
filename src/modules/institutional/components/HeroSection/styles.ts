import styled from "styled-components";

export const Section = styled.section`
  background: linear-gradient(140deg, #2e7ff0 0%, #8a61d4 100%);
  color: #fff;
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 88px 18px 72px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 26px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div`
  p {
    margin-top: 14px;
    max-width: 620px;
    font-size: 20px;
    opacity: 0.92;
  }
`;

export const Title = styled.h1`
  font-size: clamp(34px, 6vw, 58px);
  line-height: 1.02;

  span {
    color: #ffd39b;
  }
`;

export const StatPills = styled.div`
  margin-top: 22px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Actions = styled.div`
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Right = styled.aside`
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  padding: 16px;
  display: grid;
  gap: 12px;
`;

export const RightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const JobCard = styled.article`
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 14px;

  h4 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 4px 0 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
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
`;

export const Alert = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  background: rgba(255, 255, 255, 0.2);

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
