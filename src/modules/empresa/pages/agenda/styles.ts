import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 20px;
`;

export const ActionButton = styled.button`
  border: 1px solid #cbb1f4;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 240, 255, 0.92) 100%);
  color: #5f3f99;
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: #f8f3ff;
    box-shadow: 0 10px 18px rgba(111, 74, 178, 0.2);
  }
`;

export const FocusText = styled.p`
  font-size: 13px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MainGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Timeline = styled.div`
  display: grid;
  gap: 10px;
`;

export const TimelineItem = styled.article`
  border: 1px solid #e4d8f8;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 240, 255, 0.88) 100%);
  padding: 10px 12px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: start;
  box-shadow: 0 8px 14px rgba(28, 38, 64, 0.06);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(111, 74, 178, 0.34);
  }
`;

export const TimelineHour = styled.span`
  font-size: 12px;
  font-weight: 800;
  color: #6f4ab2;
`;

export const TimelineContent = styled.div`
  display: grid;
  gap: 4px;

  strong {
    font-size: 13px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const WeeklyList = styled.div`
  display: grid;
  gap: 10px;
`;

export const WeeklyItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 242, 255, 0.78) 100%);
  padding: 12px;
  display: grid;
  gap: 4px;
  box-shadow: 0 8px 14px rgba(28, 38, 64, 0.06);

  header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
  }

  strong {
    font-size: 13px;
  }

  h4 {
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 12px;
    font-weight: 700;
    color: #6f4ab2;
  }
`;

export const BottomGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ChecklistGrid = styled.div`
  display: grid;
  gap: 10px;
`;

export const ChecklistItem = styled.article`
  border: 1px solid #e7ddf8;
  background: linear-gradient(160deg, rgba(252, 250, 255, 0.98) 0%, rgba(248, 242, 255, 0.86) 100%);
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 12px;
  display: grid;
  gap: 4px;
  box-shadow: 0 7px 13px rgba(28, 38, 64, 0.05);

  strong {
    font-size: 13px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 12px;
    font-weight: 700;
    color: #6f4ab2;
  }
`;

export const AlertList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
`;

export const AlertItem = styled.li`
  border-left: 4px solid #8a61d4;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(120deg, rgba(248, 242, 255, 0.96) 0%, rgba(255, 255, 255, 0.94) 100%);
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: inset 0 0 0 1px rgba(111, 74, 178, 0.08);
`;
