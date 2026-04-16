import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 10% -10%, rgba(138, 97, 212, 0.16), transparent 42%),
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.14), transparent 38%),
    ${({ theme }) => theme.colors.background};
  padding: 34px 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 22px 14px;
  }
`;

export const Container = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 18px;
`;

export const Header = styled.header`
  border: 1px solid #d7dff0;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 251, 255, 0.92) 100%);
  box-shadow: 0 12px 24px rgba(28, 38, 64, 0.09);
  padding: 22px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

export const HeaderContent = styled.div`
  display: grid;
  gap: 6px;
`;

export const AreaLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.brandPurple};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(28px, 3.8vw, 34px);
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

const BaseButton = styled.button`
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid transparent;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
`;

export const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(126deg, ${({ theme }) => theme.colors.brandPurple}, ${({ theme }) => theme.colors.brandBlue});
  color: #ffffff;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(46, 127, 240, 0.2);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  border-color: #c7d1e8;
  color: ${({ theme }) => theme.colors.text};
  background: #ffffff;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
    background: #f7f9ff;
  }
`;

export const GhostButton = styled(BaseButton)`
  border-color: #d7c7f2;
  color: ${({ theme }) => theme.colors.brandPurple};
  background: #faf7ff;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.brandPurple};
    background: #f4efff;
  }
`;

export const HeroCard = styled.section`
  border: 1px solid #d8c8f4;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(126deg, #f7f2ff 0%, #ffffff 62%);
  box-shadow: 0 12px 22px rgba(28, 38, 64, 0.09);
  padding: 22px;
  display: grid;
  gap: 14px;
`;

export const HeroTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const HeroBrand = styled.div`
  display: grid;
  gap: 4px;

  h2 {
    margin: 0;
    font-size: clamp(24px, 3.4vw, 30px);
  }

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const HeroMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const MetaTag = styled.span`
  border: 1px solid #d8c8f4;
  color: ${({ theme }) => theme.colors.brandPurple};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 242, 255, 0.92) 100%);
  border-radius: ${({ theme }) => theme.radii.pill};
  min-height: 30px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
`;

export const HeroTagline = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatsGrid = styled.div`
  border-top: 1px solid #eadff8;
  padding-top: 14px;
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

export const StatItem = styled.article`
  border: 1px solid #e9def8;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(249, 244, 255, 0.85) 100%);
  padding: 12px;
  display: grid;
  gap: 3px;
  box-shadow: 0 8px 16px rgba(28, 38, 64, 0.06);

  span {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
  }

  strong {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SectionGrid = styled.section`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SectionCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 251, 255, 0.9) 100%);
  box-shadow: 0 10px 20px rgba(28, 38, 64, 0.08);
  padding: 18px;
  display: grid;
  gap: 12px;
`;

export const SectionHeader = styled.header`
  display: grid;
  gap: 4px;

  h3 {
    margin: 0;
    font-size: 20px;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Paragraph = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

export const BulletList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;

  li {
    border: 1px solid #ece3fb;
    background: linear-gradient(170deg, #faf7ff 0%, #ffffff 100%);
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 10px 12px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ServiceList = styled.div`
  display: grid;
  gap: 10px;
`;

export const ServiceItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: 12px;
  display: grid;
  gap: 4px;
  box-shadow: 0 7px 14px rgba(28, 38, 64, 0.05);

  strong {
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.brandPurple};
  }
`;

export const TeamList = styled.div`
  display: grid;
  gap: 10px;
`;

export const TeamItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: 12px;
  display: grid;
  gap: 4px;
  box-shadow: 0 7px 14px rgba(28, 38, 64, 0.05);

  strong {
    font-size: 14px;
  }

  span {
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.brandPurple};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ContactGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ContactItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 12px;
  display: grid;
  gap: 3px;
  box-shadow: 0 7px 14px rgba(28, 38, 64, 0.05);

  span {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
  }

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const GalleryItem = styled.article`
  border: 1px solid #e8def8;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fcfaff;
  padding: 12px;
  display: grid;
  gap: 4px;

  strong {
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ReviewList = styled.div`
  display: grid;
  gap: 10px;
`;

export const ReviewItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: 12px;
  display: grid;
  gap: 4px;
  box-shadow: 0 7px 14px rgba(28, 38, 64, 0.05);

  strong {
    font-size: 14px;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.brandPurple};
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Rating = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  letter-spacing: 0.03em;
  font-size: 14px;
  font-weight: 700;
`;

export const ValidatedBadge = styled.span`
  width: fit-content;
  min-height: 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  border: 1px solid #d8c8f4;
  background: #f8f3ff;
  color: ${({ theme }) => theme.colors.brandPurple};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const Textarea = styled.textarea`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #ffffff;
  padding: 10px 12px;
  font-size: 13px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  line-height: 1.5;

  &:focus {
    outline: 2px solid #d8c8f4;
    box-shadow: 0 0 0 4px rgba(216, 200, 244, 0.32);
    border-color: #ccb7f0;
  }
`;

export const Input = styled.input`
  width: 100%;
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #ffffff;
  padding: 0 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: 2px solid #d8c8f4;
    box-shadow: 0 0 0 4px rgba(216, 200, 244, 0.32);
    border-color: #ccb7f0;
  }
`;
