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

const toneByWeight = {
  flat: css`
    background: ${({ theme }) => theme.surfaces.panel};
    box-shadow: none;
  `,
  soft: css`
    background: ${({ theme }) => theme.surfaces.panelSoft};
    box-shadow: 0 6px 14px rgba(28, 38, 64, 0.06);
  `,
  elevated: css`
    background: ${({ theme }) => theme.surfaces.panelElevated};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  `,
};

export const CardBase = styled.article<{
  $padding: "sm" | "md" | "lg";
  $tone: "flat" | "soft" | "elevated";
}>`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.lg};

  ${({ $tone }) => toneByWeight[$tone]}

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
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    gap: 8px;
  }
`;

export const CardTitleBlock = styled.div`
  display: grid;
  gap: 5px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: clamp(17px, 3.2vw, 19px);
  line-height: 1.2;
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const CardSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
`;

export const CardBody = styled.div`
  display: grid;
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;
  }
`;
