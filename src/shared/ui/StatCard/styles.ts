import styled from "styled-components";

export const Wrapper = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 16px;
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.8) 100%);
  box-shadow: 0 8px 18px rgba(28, 38, 64, 0.07);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    right: -16px;
    top: -16px;
    width: 56px;
    height: 56px;
    border-radius: 999px;
    background: rgba(46, 127, 240, 0.09);
    pointer-events: none;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 700;
`;

export const Icon = styled.div`
  display: inline-flex;
  color: var(--statcard-icon-color, ${({ theme }) => theme.colors.brandBlue});
  border: 1px solid rgba(46, 127, 240, 0.24);
  border-radius: 10px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.84);
`;

export const Value = styled.strong`
  display: block;
  margin-top: 12px;
  font-size: clamp(28px, 4vw, 34px);
  line-height: 1;
  letter-spacing: -0.01em;
`;

export const Helper = styled.p`
  margin-top: 9px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`;
