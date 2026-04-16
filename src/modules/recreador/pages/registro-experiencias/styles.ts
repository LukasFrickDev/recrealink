import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 16px;
`;

export const AddCard = styled.section`
  border: 1px dashed rgba(46, 127, 240, 0.35);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(46, 127, 240, 0.06);
  padding: 16px;
  display: grid;
  gap: 10px;
`;

export const AddTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 20px;
`;

export const AddDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

export const AddButton = styled.button`
  justify-self: start;
  border: none;
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.brandBlue};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const ExperienceList = styled.div`
  display: grid;
  gap: 12px;
`;

export const ExperienceCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 12px;
  display: grid;
  gap: 10px;
`;

export const ExperienceTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  h4 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 18px;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const MetaItem = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const CategoryBadge = styled.span`
  border: 1px solid rgba(138, 97, 212, 0.25);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(138, 97, 212, 0.1);
  color: ${({ theme }) => theme.colors.brandPurple};
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 800;
`;

export const Stars = styled.div`
  display: inline-flex;
  gap: 2px;
  color: ${({ theme }) => theme.colors.warning};
`;

export const Description = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

export const HighlightList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const HighlightBadge = styled.span`
  border: 1px solid rgba(46, 127, 240, 0.25);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(46, 127, 240, 0.1);
  color: ${({ theme }) => theme.colors.brandBlue};
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 700;
`;

export const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Stat = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  ${({ $primary, theme }) =>
    $primary
      ? css`
          border: none;
          background: ${theme.colors.brandBlue};
          color: #fff;
        `
      : css`
          border: 1px solid ${theme.colors.border};
          background: #fff;
          color: ${theme.colors.text};
        `}
`;

export const PreviewCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 16px;
  text-align: center;
  display: grid;
  gap: 8px;

  h4 {
    margin: 0;
    font-size: 18px;
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 13px;
  }
`;
