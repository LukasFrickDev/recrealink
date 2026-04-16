import styled from "styled-components";

const accentStrong = "rgba(225, 105, 124, 0.35)";
const accentSoft = "rgba(225, 105, 124, 0.1)";
const accentText = "#c85063";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const FiltersPanel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 245, 248, 0.72) 100%);
  padding: 16px;
  display: grid;
  gap: 14px;
  box-shadow: 0 10px 22px rgba(28, 38, 64, 0.08);
`;

export const FiltersHeader = styled.header`
  display: grid;
  gap: 5px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  gap: 10px;
`;

export const SearchField = styled.label`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.94);
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 11px;

  svg {
    color: ${accentText};
    flex-shrink: 0;
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 13px;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      outline: none;
    }
  }

  &:focus-within {
    border-color: ${accentStrong};
    box-shadow: 0 0 0 4px ${accentSoft};
  }
`;

export const FilterChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FilterChip = styled.button<{ $active: boolean }>`
  min-height: 30px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ $active, theme }) => ($active ? accentStrong : theme.colors.border)};
  background: ${({ $active }) => ($active ? accentSoft : "#fff")};
  color: ${({ $active, theme }) => ($active ? accentText : theme.colors.text)};
  font-size: 11px;
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${accentStrong};
    color: ${accentText};
    transform: translateY(-1px);
  }
`;

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 12px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ResultsColumn = styled.div`
  display: grid;
  gap: 12px;
`;

export const ResultsHeader = styled.header`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 245, 248, 0.58) 100%);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  > div {
    display: grid;
    gap: 2px;
  }

  strong {
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.07);
`;

export const ResultsHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const ViewModeToggle = styled.div`
  display: inline-flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background: linear-gradient(180deg, #fff 0%, rgba(249, 252, 255, 0.96) 100%);
`;

export const ViewModeButton = styled.button<{ $active: boolean }>`
  min-height: 30px;
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $active }) => ($active ? accentSoft : "#fff")};
  color: ${({ $active, theme }) => ($active ? accentText : theme.colors.text)};
  font-size: 11px;
  font-weight: 700;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:last-child {
    border-right: none;
  }
`;

export const ResultsGrid = styled.div<{ $viewMode: "grid" | "list" }>`
  display: grid;
  gap: 10px;

  ${({ $viewMode }) =>
    $viewMode === "grid"
      ? `
        grid-template-columns: repeat(2, minmax(0, 1fr));
      `
      : `
        grid-template-columns: minmax(0, 1fr);
      `}

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const CompanyCard = styled.article<{ $viewMode: "grid" | "list" }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 245, 248, 0.64) 100%);
  padding: 12px;
  display: grid;
  gap: 10px;
  box-shadow: 0 9px 18px rgba(28, 38, 64, 0.07);
  transition: transform 0.2s ease, border-color 0.2s ease;

  ${({ $viewMode }) =>
    $viewMode === "list"
      ? `
        gap: 8px;
      `
      : ""}

  &:hover {
    transform: translateY(-1px);
    border-color: ${accentStrong};
  }
`;

export const CompanyTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  > div {
    display: grid;
    gap: 3px;
  }

  h4 {
    margin: 0;
    font-size: 15px;
  }

  p {
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  svg {
    color: ${accentText};
  }
`;

export const CompanyBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
`;

export const CompanyDescription = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const RatingLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 700;
  }

  svg {
    color: #d39b18;
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-size: 13px;
    color: ${accentText};
  }
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const AvailabilityLine = styled.div`
  display: grid;
  gap: 4px;

  span {
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  a {
    min-height: 30px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: #fff;
    color: ${({ theme }) => theme.colors.text};
    font-size: 12px;
    font-weight: 700;
    padding: 0 10px;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

    &:hover {
      border-color: ${accentStrong};
      color: ${accentText};
      transform: translateY(-1px);
    }
  }
`;

export const SideColumn = styled.aside`
  display: grid;
  gap: 12px;
`;

export const GuidanceList = styled.ul`
  margin: 0;
  padding-left: 16px;
  display: grid;
  gap: 6px;

  li {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const ShortcutList = styled.div`
  display: grid;
  gap: 8px;

  a {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 245, 248, 0.62) 100%);
    padding: 10px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    text-decoration: none;
    box-shadow: 0 7px 14px rgba(28, 38, 64, 0.06);
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

    svg {
      color: ${accentText};
      margin-top: 2px;
    }

    strong {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.text};
    }

    p {
      margin: 2px 0 0;
      font-size: 11px;
      color: ${({ theme }) => theme.colors.textMuted};
    }

    &:hover {
      border-color: ${accentStrong};
      background: ${accentSoft};
      transform: translateY(-1px);
    }
  }
`;

export const EmptyMessage = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;
