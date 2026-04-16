import styled, { css } from "styled-components";

const paddingBySize = {
  sm: css`
    padding: 14px;
  `,
  md: css`
    padding: 18px;
  `,
  lg: css`
    padding: 24px;
  `,
};

export const CardBase = styled.article<{ $padding: "sm" | "md" | "lg" }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 255, 0.96) 100%);
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 10px 24px rgba(28, 38, 64, 0.08);

  ${({ $padding }) => paddingBySize[$padding]}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: ${({ theme }) => theme.radii.md};
    padding: ${({ $padding }) => {
      if ($padding === "lg") {
        return "16px";
      }

      if ($padding === "md") {
        return "14px";
      }

      return "12px";
    }};
  }
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 12px;
    gap: 8px;
  }
`;

export const CardTitleBlock = styled.div`
  display: grid;
  gap: 5px;
`;

export const CardTitle = styled.h3`
  font-size: clamp(17px, 3.2vw, 19px);
  line-height: 1.2;
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const CardSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.5;
`;

export const CardBody = styled.div`
  display: grid;
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;
  }
`;
