import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const ActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(180deg, #ffffff 0%, rgba(246, 250, 255, 0.94) 100%);
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 38px;
  padding: 0 13px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: #8a61d4;
    transform: translateY(-1px);
  }
`;

export const KpiGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const KpiCard = styled.article<{ $tone: "blue" | "purple" | "green" | "amber" }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 15px;
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 255, 0.9) 100%);
  display: grid;
  gap: 6px;
  box-shadow: 0 8px 18px rgba(28, 38, 64, 0.07);

  ${({ $tone }) =>
    $tone === "blue"
      ? css`
          border-left: 4px solid #2e7ff0;
        `
      : $tone === "purple"
        ? css`
            border-left: 4px solid #8a61d4;
          `
        : $tone === "green"
          ? css`
              border-left: 4px solid #1f9f63;
            `
          : css`
              border-left: 4px solid #d18a0d;
            `}

  strong {
    font-size: 13px;
  }

  h3 {
    font-size: 24px;
    line-height: 1;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
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

export const QuickActionList = styled.div`
  display: grid;
  gap: 10px;
`;

export const QuickAction = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.94);
  padding: 12px;
  display: grid;
  gap: 4px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  strong {
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: #8a61d4;
    background: #faf7ff;
    transform: translateY(-1px);
  }
`;

export const ActivityList = styled.div`
  display: grid;
  gap: 10px;
`;

export const ActivityItem = styled.article<{ $tone: "blue" | "purple" | "green" }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: grid;
  gap: 4px;
  box-shadow: 0 6px 14px rgba(28, 38, 64, 0.06);

  ${({ $tone }) =>
    $tone === "blue"
      ? css`
          background: #eef5ff;
        `
      : $tone === "purple"
        ? css`
            background: #f6f0ff;
          `
        : css`
            background: #edf9f2;
          `}

  strong {
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CompanyGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const CompanyBlock = styled.div`
  display: grid;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 11px;
  background: rgba(255, 255, 255, 0.9);

  h4 {
    font-size: 14px;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Specialties = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const SpecialtyChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surfaceSoft} 0%, #fff 100%);
  font-size: 12px;
  font-weight: 600;
`;
