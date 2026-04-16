import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px dashed rgba(46, 127, 240, 0.32);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 30px;
  text-align: center;
  background: linear-gradient(175deg, rgba(238, 244, 255, 0.88) 0%, rgba(255, 255, 255, 0.98) 100%);

  h3 {
    font-size: 23px;
    margin-bottom: 9px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.55;
    max-width: 56ch;
    margin: 0 auto;
  }
`;

export const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid rgba(46, 127, 240, 0.24);
  background: rgba(255, 255, 255, 0.94);
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.brandBlue};
`;
