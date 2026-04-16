import styled from "styled-components";

export const Section = styled.section`
  padding: 56px 0;
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
  }
`;

export const Frame = styled.article`
  margin-top: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 18px;
  display: grid;
  gap: 16px;
`;

export const Welcome = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(135deg, #eaf3ff 0%, #fff2e7 100%);
  padding: 16px;

  p {
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.textMuted};
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
  gap: 8px;

  p {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  small {
    color: ${({ theme }) => theme.colors.brandBlue};
    font-weight: 700;
  }
`;
