import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;

  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid rgba(249, 111, 38, 0.58);
    outline-offset: 2px;
  }

  button:disabled,
  input:disabled,
  textarea:disabled,
  select:disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }
`;

export const HeaderCard = styled.section`
  border: 1px solid rgba(249, 111, 38, 0.28);
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(225, 105, 124, 0.16) 0%, rgba(225, 105, 124, 0) 45%),
    linear-gradient(142deg, rgba(249, 111, 38, 0.16), rgba(225, 105, 124, 0.1));
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: 0 14px 24px rgba(28, 38, 64, 0.1);
`;

export const HeaderMain = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

export const AvatarArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AvatarCircle = styled.span`
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: linear-gradient(145deg, #f96f26, #e1697c);
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(249, 111, 38, 0.3);
`;

export const AvatarMeta = styled.div`
  display: grid;
  gap: 3px;

  strong {
    font-size: 17px;
    line-height: 1.1;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ActionGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.brandOrange};
  background: ${({ theme }) => theme.colors.brandOrange};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: #ea5f16;
    border-color: #ea5f16;
    box-shadow: 0 10px 18px rgba(249, 111, 38, 0.26);
  }
`;

export const SecondaryButton = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.brandOrange};
    color: ${({ theme }) => theme.colors.brandOrange};
  }
`;

export const HeaderBadges = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGrid = styled.div`
  display: grid;
  gap: 10px;
`;

export const BioField = styled.div`
  display: grid;
  gap: 6px;

  textarea {
    min-height: 120px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
    resize: vertical;
    background: #fff;

    &:disabled {
      background: ${({ theme }) => theme.colors.surfaceSoft};
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    justify-self: end;
  }
`;

export const SpecialtyPanel = styled.div`
  display: grid;
  gap: 10px;
`;

export const SpecialtyRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const SpecialtyChip = styled.span`
  min-height: 26px;
  border-radius: 999px;
  padding: 0 10px;
  border: 1px solid rgba(249, 111, 38, 0.35);
  background: rgba(249, 111, 38, 0.1);
  color: ${({ theme }) => theme.colors.brandOrange};
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 6px 12px rgba(249, 111, 38, 0.12);

  button {
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 999px;
    background: rgba(249, 111, 38, 0.16);
    color: ${({ theme }) => theme.colors.brandOrange};
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(249, 111, 38, 0.28);
    }
  }
`;

export const AddSpecialtyRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const CertificationList = styled.div`
  display: grid;
  gap: 8px;
`;

export const CertificationItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 241, 235, 0.84) 100%);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0 8px 14px rgba(28, 38, 64, 0.06);

  strong {
    font-size: 13px;
  }

  p {
    margin: 2px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Notice = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
  border-left: 4px solid ${({ theme }) => theme.colors.brandOrange};
  background: linear-gradient(132deg, rgba(249, 111, 38, 0.14) 0%, rgba(255, 255, 255, 0.92) 100%);
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 12px;
  box-shadow: inset 0 0 0 1px rgba(249, 111, 38, 0.12);
`;