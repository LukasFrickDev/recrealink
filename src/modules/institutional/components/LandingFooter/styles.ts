import styled from "styled-components";

export const Footer = styled.footer`
  background:
    radial-gradient(circle at 12% 20%, rgba(46, 127, 240, 0.22) 0%, rgba(46, 127, 240, 0) 38%),
    radial-gradient(circle at 86% 82%, rgba(249, 111, 38, 0.2) 0%, rgba(249, 111, 38, 0) 34%),
    linear-gradient(180deg, #1a2033 0%, #0f1422 100%);
  color: #fff;
  padding: 46px 0 16px;
`;

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
  display: grid;
  gap: 18px;
  grid-template-columns: 1.2fr 1fr 1fr 1fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const BrandColumn = styled.div`
  h2 {
    color: #fff;
    font-size: 28px;
    line-height: 1;
  }

  p {
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.6;
  }
`;

export const BrandHighlight = styled.div`
  margin-top: 12px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.08);
  padding: 10px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 13px;
  line-height: 1.45;
`;

export const ListColumn = styled.div`
  h3 {
    color: #fff;
    font-size: 17px;
  }

  ul {
    margin: 10px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 7px;
  }

  li {
    color: rgba(255, 255, 255, 0.72);
    font-size: 14px;
    transition: color 0.2s ease;

    &:hover {
      color: rgba(255, 255, 255, 0.96);
    }
  }
`;

export const Bottom = styled.div`
  max-width: 1180px;
  margin: 20px auto 0;
  padding: 12px 18px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  color: rgba(255, 255, 255, 0.66);
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
`;
