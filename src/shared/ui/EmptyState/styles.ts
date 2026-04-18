import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px dashed rgba(46, 127, 240, 0.32);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: linear-gradient(175deg, rgba(238, 244, 255, 0.88) 0%, rgba(255, 255, 255, 0.98) 100%);

  h3 {
    margin: 0;
    font-size: clamp(1.1rem, 2.8vw, 1.35rem);
    line-height: 1.2;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.55;
    max-width: 56ch;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(46, 127, 240, 0.24);
  background: rgba(255, 255, 255, 0.94);
  margin-bottom: 2px;
  color: ${({ theme }) => theme.colors.brandBlue};
`;
