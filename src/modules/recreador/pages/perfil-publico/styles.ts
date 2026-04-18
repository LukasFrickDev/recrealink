import styled from "styled-components";

export const Page = styled.main`
  min-height: 100dvh;
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.16) 0%, rgba(46, 127, 240, 0) 40%),
    radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.14) 0%, rgba(249, 111, 38, 0) 44%),
    linear-gradient(180deg, #f4f8ff 0%, #f9fbff 100%);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
  }
`;

export const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(125deg, rgba(46, 127, 240, 0.04), rgba(255, 255, 255, 0) 52%),
    repeating-linear-gradient(
      -45deg,
      rgba(46, 127, 240, 0.04) 0,
      rgba(46, 127, 240, 0.04) 1px,
      rgba(255, 255, 255, 0) 1px,
      rgba(255, 255, 255, 0) 18px
    );
`;

export const Container = styled.div`
  position: relative;
  width: min(1080px, 100%);
  margin: 0 auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Topbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const PublicBadge = styled.span`
  min-height: 28px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(46, 127, 240, 0.3);
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0 0.66rem;
  display: inline-flex;
  align-items: center;
  gap: 0.34rem;
`;

export const TopbarActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

export const GhostButton = styled.button`
  border: 1px solid rgba(46, 127, 240, 0.18);
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  padding: 0 0.72rem;
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
    transform: translateY(-1px);
  }
`;

export const HeroCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.18) 0%, rgba(46, 127, 240, 0) 42%),
    radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.16) 0%, rgba(249, 111, 38, 0) 48%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.99), rgba(236, 244, 255, 0.9));
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const HeroTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const IdentityBlock = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export const Avatar = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1px solid rgba(46, 127, 240, 0.28);
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.colors.brandBlue};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.06rem;
  font-weight: 900;
`;

export const Identity = styled.div`
  display: grid;
  gap: 2px;

  h1 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: clamp(1.28rem, 3vw, 1.66rem);
    line-height: 1.15;
  }

  strong {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.label};
    letter-spacing: 0.02em;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.5;
    max-width: 64ch;
  }
`;

export const MetaRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const MetaBadge = styled.span`
  min-height: 30px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(46, 127, 240, 0.24);
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  padding: 0 0.62rem;
  display: inline-flex;
  align-items: center;
  gap: 0.32rem;
`;

export const Bio = styled.p`
  margin: 0;
  border: 1px solid rgba(46, 127, 240, 0.2);
  border-left: 4px solid ${({ theme }) => theme.colors.brandBlue};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  padding: 0.76rem 0.84rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.6;
`;

export const ShowcaseGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ShowcaseCard = styled.article`
  border: 1px solid rgba(46, 127, 240, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(6px);
  overflow: hidden;
  display: grid;
`;

export const ShowcaseMedia = styled.div`
  height: 104px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.02), rgba(15, 23, 42, 0.38));
  }
`;

export const ShowcaseCopy = styled.div`
  padding: 0.56rem 0.62rem;
  display: grid;
  gap: 0.12rem;

  strong {
    color: ${({ theme }) => theme.colors.textStrong};
    font-size: ${({ theme }) => theme.typography.label};
    line-height: 1.3;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.meta};
    line-height: 1.4;
  }
`;

export const HeroFooter = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HeroStat = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.92);
  padding: 0.64rem 0.72rem;
  display: grid;
  gap: 0.18rem;

  strong {
    color: ${({ theme }) => theme.colors.textStrong};
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
`;

export const UpdatedLabel = styled.p`
  margin: 0;
  grid-column: 1 / -1;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.meta};
  line-height: 1.5;
`;

export const HighlightsGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const HighlightCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.95);
  padding: ${({ theme }) => theme.spacing.sm};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.cardTitle};
  display: inline-flex;
  align-items: center;
  gap: 0.36rem;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const Chip = styled.span`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 700;
  padding: 0.16rem 0.5rem;
`;

export const EmptyCopy = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;

export const RuleList = styled.ul`
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.34rem;

  li {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.45;
  }
`;

export const LinkList = styled.ul`
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.34rem;

  li {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
    line-height: 1.45;
    min-width: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.brandBlue};
    text-decoration: none;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ReviewsCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.98);
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const ReviewsHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const ReputationLine = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.42rem;

  strong {
    color: ${({ theme }) => theme.colors.warning};
    font-size: clamp(1.02rem, 2vw, 1.2rem);
    line-height: 1;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.bodySm};
  }
`;

export const Policy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
`;

export const Stars = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  display: inline-flex;
  align-items: center;
  gap: 0.16rem;
`;

export const ReviewGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

export const ReviewCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  padding: 0.72rem;
  display: grid;
  gap: 0.38rem;
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.44rem;
  flex-wrap: wrap;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 700;
  }
`;

export const ReviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.36rem;

  span {
    border-radius: ${({ theme }) => theme.radii.pill};
    border: ${({ theme }) => theme.borders.subtle};
    background: #fff;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.micro};
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    padding: 0.14rem 0.42rem;
  }
`;

export const ReviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
`;