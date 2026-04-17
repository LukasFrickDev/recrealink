import styled from "styled-components";

export const Section = styled.section`
  padding: 62px 0;
  background: ${({ theme }) => theme.colors.surface};
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
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 18px;
    line-height: 1.55;
  }
`;

export const Frame = styled.article`
  margin-top: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.94) 100%);
  box-shadow: 0 18px 34px rgba(28, 38, 64, 0.14);
  padding: 14px;
  display: grid;
  gap: 12px;
`;

export const TopBar = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(130deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandPurple});
  color: #fff;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  strong {
    font-size: 14px;
    letter-spacing: 0.02em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TopBarTags = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  span {
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.12);
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
  }
`;

export const Welcome = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(135deg, rgba(234, 243, 255, 0.96) 0%, rgba(255, 242, 231, 0.94) 100%);
  padding: 16px;
  border: 1px solid rgba(215, 224, 243, 0.82);

  p {
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
  }
`;

export const HighlightPills = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    border: 1px solid rgba(46, 127, 240, 0.28);
    background: rgba(46, 127, 240, 0.1);
    color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Jobs = styled.div`
  display: grid;
  gap: 10px;
`;

export const Job = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 14px;
  display: grid;
  gap: 10px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);

  p {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-size: 15px;
  }
`;

export const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  small {
    color: ${({ theme }) => theme.colors.brandBlue};
    font-weight: 700;
    font-size: 12px;
  }

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }

  span {
    border: 1px solid rgba(23, 167, 102, 0.3);
    background: rgba(23, 167, 102, 0.1);
    color: ${({ theme }) => theme.colors.success};
  }
`;

export const SidePanel = styled.aside`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(168deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.88) 100%);
  padding: 12px;
  display: grid;
  gap: 10px;

  article {
    border: 1px solid rgba(215, 224, 243, 0.86);
    border-radius: ${({ theme }) => theme.radii.md};
    background: rgba(255, 255, 255, 0.95);
    padding: 12px;
    box-shadow: 0 8px 14px rgba(28, 38, 64, 0.08);
  }

  strong {
    display: block;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.brandBlue};
  }

  span {
    margin-top: 3px;
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
