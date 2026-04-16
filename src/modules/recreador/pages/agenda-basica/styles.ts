import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const SectionCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.12) 0%, rgba(46, 127, 240, 0) 42%),
    linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.92) 100%);
  padding: 16px;
  display: grid;
  gap: 14px;
  box-shadow: 0 12px 24px rgba(28, 38, 64, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: clamp(19px, 2.5vw, 22px);
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease,
    background 0.2s ease;

  ${({ $primary, theme }) =>
    $primary
      ? css`
          border: none;
          color: #fff;
          background: linear-gradient(
            120deg,
            ${theme.colors.brandBlue} 0%,
            ${theme.colors.brandPurple} 100%
          );

          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 18px rgba(46, 127, 240, 0.24);
          }
        `
      : css`
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.textMuted};
          background: rgba(255, 255, 255, 0.94);

          &:hover {
            border-color: ${theme.colors.brandBlue};
            color: ${theme.colors.brandBlue};
            transform: translateY(-1px);
          }
        `}
`;

export const EventoList = styled.div`
  display: grid;
  gap: 10px;
`;

export const EventoCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.97) 0%, rgba(238, 244, 255, 0.9) 100%);
  padding: 12px;
  display: grid;
  gap: 8px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.06);
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(46, 127, 240, 0.28);
    transform: translateY(-1px);
  }
`;

export const EventoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  h4 {
    margin: 0;
    font-size: 14px;
  }
`;

export const StatusBadge = styled.span<{ $status: "confirmado" | "pendente" }>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 10px;
  font-weight: 800;
  padding: 4px 8px;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  ${({ $status }) =>
    $status === "confirmado"
      ? css`
          background: rgba(23, 167, 102, 0.12);
          border-color: rgba(23, 167, 102, 0.24);
          color: #148655;
        `
      : css`
          background: rgba(227, 154, 18, 0.14);
          border-color: rgba(227, 154, 18, 0.24);
          color: #b57a0f;
        `}
`;

export const EventoMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const MetaItem = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const EventoActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const WeekGrid = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(7, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const DayCard = styled.article`
  border: 1px solid rgba(46, 127, 240, 0.22);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.74) 100%);
  padding: 10px;
  display: grid;
  gap: 6px;
  box-shadow: 0 7px 14px rgba(28, 38, 64, 0.06);
`;

export const DayName = styled.strong`
  font-size: 13px;
`;

export const DayEvent = styled.span`
  display: block;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

export const HighlightCard = styled.article`
  border: 1px solid rgba(46, 127, 240, 0.26);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(150deg, rgba(46, 127, 240, 0.14) 0%, rgba(255, 255, 255, 0.96) 100%);
  padding: 12px;
  display: grid;
  gap: 4px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.08);

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.brandBlue};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
