import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 18px;
`;

export const SummaryCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 16px;
  background:
    radial-gradient(circle at 95% 0%, rgba(227, 118, 239, 0.18) 0%, rgba(227, 118, 239, 0) 44%),
    linear-gradient(135deg, rgba(46, 127, 240, 0.14), rgba(138, 97, 212, 0.11));
  box-shadow: 0 14px 24px rgba(28, 38, 64, 0.1);
`;

export const SummaryGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 130px 1fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Avatar = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  background: linear-gradient(140deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandPurple});
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 800;
  box-shadow: 0 12px 20px rgba(46, 127, 240, 0.28);
`;

export const SummaryContent = styled.div`
  display: grid;
  gap: 8px;

  h2 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 28px;
    line-height: 1.15;
  }

  h3 {
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.55;
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Badge = styled.span<{ $tone?: "blue" | "green" | "neutral" }>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 800;

  ${({ $tone }) => {
    if ($tone === "blue") {
      return css`
        background: rgba(46, 127, 240, 0.1);
        border-color: rgba(46, 127, 240, 0.24);
        color: #1f67c8;
      `;
    }

    if ($tone === "green") {
      return css`
        background: rgba(23, 167, 102, 0.1);
        border-color: rgba(23, 167, 102, 0.24);
        color: #158b58;
      `;
    }

    return css`
      background: rgba(91, 104, 136, 0.1);
      border-color: rgba(91, 104, 136, 0.22);
      color: #4f5c7f;
    `;
  }}
`;

export const EditButton = styled.button`
  justify-self: start;
  border: none;
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 14px;
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.colors.brandBlue} 0%,
    ${({ theme }) => theme.colors.brandPurple} 100%
  );
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(46, 127, 240, 0.24);
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SectionCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.9) 100%);
  padding: 14px;
  display: grid;
  gap: 12px;
  box-shadow: 0 10px 18px rgba(28, 38, 64, 0.07);
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 19px;
`;

export const CertificationList = styled.div`
  display: grid;
  gap: 10px;
`;

export const CertificationCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.88);
  padding: 10px;
  display: grid;
  gap: 6px;
  box-shadow: 0 8px 14px rgba(28, 38, 64, 0.05);
`;

export const CertificationTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  strong {
    font-size: 14px;
  }
`;

export const CertificationMeta = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SecondaryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    color: ${({ theme }) => theme.colors.brandBlue};
    border-color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const FeedbackList = styled.div`
  display: grid;
  gap: 10px;
`;

export const FeedbackCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.88);
  padding: 10px;
  display: grid;
  gap: 6px;
  box-shadow: 0 8px 14px rgba(28, 38, 64, 0.05);
`;

export const FeedbackTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;

  strong {
    display: block;
    font-size: 13px;
  }

  span {
    display: block;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Stars = styled.div`
  display: inline-flex;
  gap: 2px;
  color: ${({ theme }) => theme.colors.warning};
`;

export const FeedbackText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  line-height: 1.45;
`;

export const GalleryCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(162deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 244, 255, 0.9) 100%);
  padding: 14px;
  display: grid;
  gap: 12px;
  box-shadow: 0 10px 18px rgba(28, 38, 64, 0.07);
`;

export const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

export const GalleryGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const GalleryItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  display: grid;
  grid-template-rows: 132px auto;
  box-shadow: 0 8px 15px rgba(28, 38, 64, 0.06);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(46, 127, 240, 0.3);
  }
`;

export const GalleryImage = styled.div<{ $image: string }>`
  background-image:
    linear-gradient(180deg, rgba(28, 38, 64, 0.12), rgba(28, 38, 64, 0.45)),
    url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
`;

export const GalleryCaption = styled.p`
  margin: 0;
  padding: 8px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
