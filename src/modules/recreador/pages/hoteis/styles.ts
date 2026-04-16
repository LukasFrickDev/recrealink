import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const HeaderCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 90% 0%, rgba(138, 97, 212, 0.16) 0%, rgba(138, 97, 212, 0) 46%),
    linear-gradient(135deg, rgba(46, 127, 240, 0.08), rgba(249, 111, 38, 0.1));
  padding: 18px;
  box-shadow: 0 10px 22px rgba(28, 38, 64, 0.09);
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const TitleWrap = styled.div`
  display: grid;
  gap: 6px;

  h2 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: clamp(28px, 3.8vw, 34px);
    line-height: 1.15;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 72ch;
    font-size: 14px;
    line-height: 1.55;
  }
`;

export const FilterCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.9) 100%);
  padding: 14px;
  box-shadow: 0 9px 20px rgba(28, 38, 64, 0.08);
`;

export const FeedbackBanner = styled.section`
  border: 1px solid rgba(46, 127, 240, 0.25);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(46, 127, 240, 0.12) 0%, rgba(255, 255, 255, 0.96) 100%);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.brandBlue};
    font-weight: 700;
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const SearchField = styled.label`
  position: relative;
  display: grid;
  border-radius: ${({ theme }) => theme.radii.md};

  input {
    min-height: 42px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 0 12px 0 36px;
    font-size: 13px;
    font-family: ${({ theme }) => theme.fonts.body};
    background: rgba(255, 255, 255, 0.92);

    &:focus {
      outline: none;
    }
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-within {
    box-shadow: 0 0 0 4px rgba(46, 127, 240, 0.1);
  }
`;

export const SelectField = styled.select`
  min-height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 12px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  background: #fff;

  &:focus {
    outline: none;
    border-color: rgba(46, 127, 240, 0.34);
    box-shadow: 0 0 0 4px rgba(46, 127, 240, 0.1);
  }
`;

export const TabsCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.9) 100%);
  overflow: hidden;
  box-shadow: 0 10px 22px rgba(28, 38, 64, 0.08);
`;

export const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surfaceSoft} 0%, rgba(255, 255, 255, 0.92) 100%);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  border: none;
  min-height: 44px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  ${({ $active, theme }) =>
    $active
      ? css`
          background: ${theme.colors.brandBlue};
          color: #fff;
        `
      : css`
          &:hover {
            background: rgba(46, 127, 240, 0.08);
            color: ${theme.colors.text};
          }
        `}
`;

export const TabPanel = styled.div`
  padding: 14px;
  display: grid;
  gap: 12px;
`;

export const HistoryGrid = styled.div`
  display: grid;
  gap: 12px;
`;

export const HistoryCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.82) 100%);
  overflow: hidden;
  box-shadow: 0 8px 18px rgba(28, 38, 64, 0.07);
`;

export const HistoryBody = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr 220px;
  gap: 14px;
  padding: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HotelImage = styled.div<{ $image: string }>`
  min-height: 150px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-image:
    linear-gradient(180deg, rgba(28, 38, 64, 0.1), rgba(28, 38, 64, 0.5)),
    url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
`;

export const HistoryMain = styled.div`
  display: grid;
  gap: 8px;
`;

export const HotelName = styled.h3`
  margin: 0;
  font-size: 19px;
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const MetaLine = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const TextBadge = styled.span<{ $tone?: "blue" | "green" | "orange" | "neutral" }>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;

  ${({ $tone }) => {
    if ($tone === "green") {
      return css`
        background: rgba(23, 167, 102, 0.1);
        color: #158b58;
        border-color: rgba(23, 167, 102, 0.25);
      `;
    }

    if ($tone === "orange") {
      return css`
        background: rgba(249, 111, 38, 0.12);
        color: #ca5617;
        border-color: rgba(249, 111, 38, 0.24);
      `;
    }

    if ($tone === "blue") {
      return css`
        background: rgba(46, 127, 240, 0.1);
        color: #1f67c8;
        border-color: rgba(46, 127, 240, 0.24);
      `;
    }

    return css`
      background: rgba(91, 104, 136, 0.1);
      color: #4d5a7b;
      border-color: rgba(91, 104, 136, 0.22);
    `;
  }}
`;

export const InfoGrid = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const InfoBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 8px;

  strong {
    font-size: 13px;
    display: block;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const HistorySide = styled.aside`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px;
  display: grid;
  gap: 8px;
  align-content: start;
  background: linear-gradient(175deg, ${({ theme }) => theme.colors.surfaceSoft} 0%, #fff 100%);
`;

export const SideMetric = styled.div`
  display: grid;
  gap: 2px;

  strong {
    font-size: 16px;
  }

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ActionButton = styled.button<{ $variant?: "solid" | "outline" }>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  ${({ $variant, theme }) =>
    $variant === "outline"
      ? css`
          border: 1px solid ${theme.colors.border};
          background: #fff;
          color: ${theme.colors.text};

          &:hover {
            border-color: ${theme.colors.brandBlue};
            color: ${theme.colors.brandBlue};
          }
        `
      : css`
          border: none;
          background: linear-gradient(120deg, ${theme.colors.brandBlue}, rgba(138, 97, 212, 0.92));
          color: #fff;

          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 18px rgba(28, 38, 64, 0.16);
          }
        `}
`;

export const VagasGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const VagaCard = styled.article<{ $highlighted?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(246, 250, 255, 0.72) 100%);
  box-shadow: 0 8px 18px rgba(28, 38, 64, 0.07);
  transition: transform 0.2s ease;

  ${({ $highlighted }) =>
    $highlighted
      ? css`
          border-color: rgba(46, 127, 240, 0.36);
          box-shadow: 0 10px 22px rgba(46, 127, 240, 0.15);
        `
      : null}

  &:hover {
    transform: translateY(-1px);
  }
`;

export const VagaImage = styled.div<{ $image: string }>`
  min-height: 140px;
  background-image:
    linear-gradient(180deg, rgba(28, 38, 64, 0.15), rgba(28, 38, 64, 0.52)),
    url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
`;

export const VagaBody = styled.div`
  padding: 12px;
  display: grid;
  gap: 10px;
`;

export const VagaHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
`;

export const VagaTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;

export const VagaValue = styled.strong`
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 14px;
`;

export const VagaActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ConviteList = styled.div`
  display: grid;
  gap: 10px;
`;

export const ConviteCard = styled.article`
  border: 1px solid rgba(227, 154, 18, 0.35);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(227, 154, 18, 0.12) 0%, rgba(255, 255, 255, 0.96) 100%);
  padding: 12px;
  display: grid;
  gap: 10px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.07);
`;

export const ConviteTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;

  strong {
    font-size: 15px;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }
`;

export const ConviteGrid = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ConviteInfo = styled.div`
  display: grid;
  gap: 2px;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-size: 13px;
  }
`;

export const ConviteNote = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(46, 127, 240, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 8px;
  background: rgba(46, 127, 240, 0.08);
`;

export const ConviteActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ResponseButton = styled.button<{ $tone: "accept" | "reject" | "neutral" }>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;

  ${({ $tone, theme }) => {
    if ($tone === "accept") {
      return css`
        border: none;
        background: ${theme.colors.success};
        color: #fff;
      `;
    }

    if ($tone === "reject") {
      return css`
        border: 1px solid rgba(211, 77, 98, 0.3);
        background: rgba(211, 77, 98, 0.1);
        color: ${theme.colors.danger};
      `;
    }

    return css`
      border: 1px solid ${theme.colors.border};
      background: #fff;
      color: ${theme.colors.text};
    `;
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

export const EmptyCard = styled.article`
  border: 1px dashed rgba(91, 104, 136, 0.3);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(91, 104, 136, 0.08) 0%, rgba(255, 255, 255, 0.96) 100%);
  padding: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;
