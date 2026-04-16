import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const PrimaryAction = styled.button`
  border: 1px solid #cbb1f4;
  background: linear-gradient(120deg, #8a61d4 0%, #6f4ab2 100%);
  color: #fff;
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(0.96);
  }
`;

export const PipelineGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PipelineColumn = styled.article`
  border: 1px solid #e8def9;
  background: #fcfaff;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 12px;
  display: grid;
  gap: 10px;
`;

export const PipelineHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;

  div {
    display: grid;
    gap: 3px;
  }

  strong {
    font-size: 14px;
  }

  span {
    font-size: 12px;
    color: #6f4ab2;
    font-weight: 700;
  }
`;

export const OpportunityList = styled.div`
  display: grid;
  gap: 8px;
`;

export const OpportunityCard = styled.article`
  border: 1px solid #dfd1f6;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #ffffff;
  padding: 10px;
  display: grid;
  gap: 6px;

  header {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
  }

  strong {
    font-size: 13px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const OpportunityMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const TemplateList = styled.div`
  display: grid;
  gap: 10px;
`;

export const TemplateItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 5px;

  strong {
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

export const FollowUpList = styled.div`
  display: grid;
  gap: 10px;
`;

export const FollowUpItem = styled.article`
  border-left: 4px solid #8a61d4;
  background: #faf6ff;
  border-radius: ${({ theme }) => theme.radii.md};
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
`;

export const FollowUpMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
  }
`;

export const PlaybookList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
`;

export const PlaybookItem = styled.li`
  border: 1px solid #eadffb;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 12px;
  background: #fcfaff;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;
