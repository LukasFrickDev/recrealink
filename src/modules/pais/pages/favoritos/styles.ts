import styled from "styled-components";

const accentStrong = "rgba(225, 105, 124, 0.35)";
const accentSoft = "rgba(225, 105, 124, 0.1)";
const accentText = "#c85063";

export const Wrapper = styled.div`
  display: grid;
  gap: 14px;
`;

export const HeaderRow = styled.header`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(225, 105, 124, 0.16) 0%, rgba(225, 105, 124, 0) 42%),
    linear-gradient(156deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 241, 246, 0.9) 100%);
  padding: 12px 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  box-shadow: 0 12px 22px rgba(28, 38, 64, 0.08);

  h3 {
    margin: 0;
    font-size: 17px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 2px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FavoritesGrid = styled.section`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const FavoriteCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 241, 246, 0.82) 100%);
  padding: 12px;
  display: grid;
  gap: 8px;
  box-shadow: 0 10px 18px rgba(28, 38, 64, 0.07);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${accentStrong};
  }
`;

export const FavoriteTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;

  > div {
    display: grid;
    gap: 2px;
  }

  h4 {
    margin: 0;
    font-size: 15px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FavoriteHeart = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid ${accentStrong};
  background: ${accentSoft};
  color: ${accentText};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 12px rgba(200, 80, 99, 0.2);
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 700;
  }

  svg {
    color: #d39b18;
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Price = styled.strong`
  font-size: 13px;
  color: ${accentText};
`;

export const TagLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const InfoList = styled.ul`
  margin: 0;
  padding-left: 16px;
  display: grid;
  gap: 4px;

  li {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.4;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  a {
    min-height: 30px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: rgba(255, 255, 255, 0.94);
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
    font-weight: 700;
    padding: 0 10px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      border-color: ${accentStrong};
      color: ${accentText};
    }
  }
`;
