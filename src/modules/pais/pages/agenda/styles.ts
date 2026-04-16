import styled from "styled-components";

const accentStrong = "rgba(225, 105, 124, 0.34)";
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

export const NewEventButton = styled.button`
  min-height: 32px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${accentStrong};
  background: ${accentSoft};
  color: ${accentText};
  font-size: 11px;
  font-weight: 700;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(225, 105, 124, 0.18);
    box-shadow: 0 8px 14px rgba(200, 80, 99, 0.2);
  }
`;

export const MainGrid = styled.section`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 14px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const AgendaColumn = styled.div`
  display: grid;
  gap: 10px;
`;

export const AgendaList = styled.div`
  display: grid;
  gap: 9px;
`;

export const AgendaItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 241, 246, 0.82) 100%);
  padding: 11px 12px;
  display: grid;
  gap: 8px;
  box-shadow: 0 9px 16px rgba(28, 38, 64, 0.06);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${accentStrong};
  }
`;

export const AgendaTop = styled.div`
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
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const MetaLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 12px;
    color: ${accentText};
    font-weight: 700;
  }
`;

export const AgendaNote = styled.p`
  margin: 0;
  border: 1px solid ${accentStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${accentSoft};
  padding: 8px 9px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const DetailGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const DetailItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    color: ${accentText};
  }
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  button {
    min-height: 30px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: rgba(255, 255, 255, 0.94);
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 11px;
    font-weight: 700;
    padding: 0 10px;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      border-color: ${accentStrong};
      color: ${accentText};
    }
  }
`;

export const SideColumn = styled.aside`
  display: grid;
  gap: 12px;
`;

export const Checklist = styled.ul`
  margin: 0;
  padding-left: 16px;
  display: grid;
  gap: 6px;

  li {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const HistoryList = styled.div`
  display: grid;
  gap: 8px;
`;

export const HistoryItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 241, 246, 0.76) 100%);
  padding: 8px 9px;
  display: grid;
  gap: 2px;
  box-shadow: 0 7px 13px rgba(28, 38, 64, 0.05);

  strong {
    font-size: 12px;
  }

  span,
  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
