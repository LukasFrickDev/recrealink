import styled from "styled-components";

const accentStrong = "rgba(225, 105, 124, 0.34)";
const accentSoft = "rgba(225, 105, 124, 0.1)";
const accentText = "#c85063";

export const Wrapper = styled.div`
  display: grid;
  gap: 14px;
`;

export const HeroCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(225, 105, 124, 0.16) 0%, rgba(225, 105, 124, 0) 42%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 241, 246, 0.92) 100%);
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: 0 12px 22px rgba(28, 38, 64, 0.08);
`;

export const HeroTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: linear-gradient(145deg, ${accentText} 0%, #e376ef 100%);
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 18px rgba(200, 80, 99, 0.28);
`;

export const HeroMeta = styled.div`
  display: grid;
  gap: 2px;

  h3 {
    margin: 0;
    font-size: 18px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CompletionLine = styled.div`
  border: 1px solid ${accentStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${accentSoft};
  padding: 8px 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${accentText};
  }
`;

export const Bio = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`;

export const MainGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const InfoList = styled.div`
  display: grid;
  gap: 8px;
`;

export const InfoItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 241, 246, 0.84) 100%);
  padding: 10px;
  display: grid;
  gap: 2px;
  box-shadow: 0 8px 14px rgba(28, 38, 64, 0.06);

  strong {
    font-size: 13px;
  }

  span,
  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const PreferenceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const ActionList = styled.div`
  display: grid;
  gap: 8px;

  a {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    background: linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 241, 246, 0.82) 100%);
    padding: 9px 10px;
    display: grid;
    gap: 2px;
    text-decoration: none;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    box-shadow: 0 8px 14px rgba(28, 38, 64, 0.06);

    strong {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.text};
    }

    p {
      margin: 0;
      font-size: 11px;
      color: ${({ theme }) => theme.colors.textMuted};
    }

    &:hover {
      transform: translateY(-1px);
      border-color: ${accentStrong};
      background: ${accentSoft};
    }
  }
`;
