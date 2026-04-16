import styled from "styled-components";

const accentStrong = "rgba(225, 105, 124, 0.34)";
const accentSoft = "rgba(225, 105, 124, 0.1)";
const accentText = "#c85063";

export const Wrapper = styled.div`
  display: grid;
  gap: 12px;
`;

export const HeaderRow = styled.header`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fff;
  padding: 11px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;

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

export const ReportButton = styled.button`
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
`;

export const HighlightGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HighlightCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fff;
  padding: 11px;
  display: grid;
  gap: 2px;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-size: 14px;
    color: ${accentText};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const MainGrid = styled.section`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 12px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const EventList = styled.div`
  display: grid;
  gap: 9px;
`;

export const EventCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fff;
  padding: 11px;
  display: grid;
  gap: 8px;
`;

export const EventTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;

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

export const EventMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 11px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  svg {
    color: ${accentText};
  }
`;

export const EventScore = styled.strong`
  font-size: 13px;
  color: ${accentText};
`;

export const EventNotes = styled.p`
  margin: 0;
  border: 1px solid ${accentStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${accentSoft};
  padding: 8px 9px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const EventFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const EventActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  button {
    min-height: 30px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: #fff;
    color: ${({ theme }) => theme.colors.text};
    font-size: 11px;
    font-weight: 700;
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      border-color: ${accentStrong};
      color: ${accentText};
    }
  }
`;

export const InsightList = styled.ul`
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
