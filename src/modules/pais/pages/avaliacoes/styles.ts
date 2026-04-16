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

export const NewReviewButton = styled.button`
  min-height: 32px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${accentStrong};
  background: ${accentSoft};
  color: ${accentText};
  font-size: 11px;
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
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

export const PendingList = styled.div`
  display: grid;
  gap: 8px;
`;

export const PendingItem = styled.article`
  border: 1px dashed ${accentStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${accentSoft};
  padding: 9px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;

  > div {
    display: grid;
    gap: 2px;
  }

  strong {
    font-size: 13px;
  }

  span,
  p {
    margin: 0;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  p {
    color: ${accentText};
    font-weight: 700;
  }

  button {
    min-height: 30px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${accentStrong};
    background: #fff;
    color: ${accentText};
    font-size: 11px;
    font-weight: 700;
    padding: 0 10px;
    cursor: pointer;
  }
`;

export const ReviewList = styled.div`
  display: grid;
  gap: 9px;
`;

export const ReviewItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fff;
  padding: 11px;
  display: grid;
  gap: 8px;
`;

export const ReviewTop = styled.div`
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

export const ReviewBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Score = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #d39b18;
  font-size: 13px;
`;

export const Comment = styled.p`
  margin: 0;
  border: 1px solid ${accentStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${accentSoft};
  padding: 8px 9px;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.text};
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  span,
  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  > div {
    display: flex;
    gap: 8px;
  }

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

export const FeedbackList = styled.ul`
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
