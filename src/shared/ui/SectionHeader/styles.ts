import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const Title = styled.h2`
  font-size: clamp(26px, 3.6vw, 34px);
  line-height: 1.08;
  letter-spacing: -0.01em;
`;

export const Subtitle = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.55;
  max-width: 70ch;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 6px;
    font-size: 13px;
  }
`;

export const Action = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: 2px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: flex-start;
  }
`;
