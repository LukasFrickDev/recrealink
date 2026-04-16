import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const ActionButton = styled.button`
  border: 1px solid #cbb1f4;
  background: #ffffff;
  color: #6f4ab2;
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #f8f3ff;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SquadList = styled.div`
  display: grid;
  gap: 10px;
`;

export const SquadItem = styled.article`
  border: 1px solid #e4d8f8;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fcfaff;
  padding: 12px;
  display: grid;
  gap: 5px;

  header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
  }

  strong {
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SquadMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  span {
    font-size: 11px;
    font-weight: 700;
    color: #6f4ab2;
  }
`;

export const MovementList = styled.div`
  display: grid;
  gap: 10px;
`;

export const MovementItem = styled.article`
  border-left: 4px solid #8a61d4;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #f8f2ff;
  padding: 10px 12px;
  display: grid;
  gap: 4px;

  strong {
    font-size: 13px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 11px;
    color: #6f4ab2;
    font-weight: 700;
  }
`;

export const SecondaryGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ProfessionalList = styled.div`
  display: grid;
  gap: 10px;
`;

export const ProfessionalItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;

  strong {
    font-size: 14px;
  }

  p {
    margin-top: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ProfessionalMeta = styled.div`
  display: grid;
  gap: 4px;
  text-align: right;

  span {
    font-size: 11px;
    font-weight: 700;
    color: #6f4ab2;
  }
`;

export const TrackList = styled.div`
  display: grid;
  gap: 10px;
`;

export const TrackItem = styled.article`
  border: 1px solid #e7ddf8;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fcfaff;
  padding: 12px;
  display: grid;
  gap: 4px;

  strong {
    font-size: 13px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 11px;
    font-weight: 700;
    color: #6f4ab2;
  }
`;

export const PriorityList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
`;

export const PriorityItem = styled.li`
  border: 1px solid #e8def9;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #faf6ff;
  padding: 10px 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;
