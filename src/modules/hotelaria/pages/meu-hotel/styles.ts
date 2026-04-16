import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 100% 0%, rgba(249, 111, 38, 0.16) 0%, rgba(249, 111, 38, 0) 32%),
    radial-gradient(circle at 0% 26%, rgba(225, 105, 124, 0.14) 0%, rgba(225, 105, 124, 0) 36%),
    ${({ theme }) => theme.colors.background};
  padding: 28px 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px;
  }
`;

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    radial-gradient(circle at 100% 0%, rgba(249, 111, 38, 0.16) 0%, rgba(249, 111, 38, 0) 40%),
    linear-gradient(152deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 243, 236, 0.92) 100%);
  padding: 14px;
  gap: 12px;
  box-shadow: 0 12px 22px rgba(15, 23, 42, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeaderInfo = styled.div`
  display: grid;
  gap: 3px;
`;

export const AreaLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.brandOrange};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const HeaderActions = styled.div`
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const BaseButton = styled.button`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid transparent;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(120deg, #f96f26 0%, #e1697c 100%);
  border-color: #e1697c;
  color: #ffffff;

  &:hover {
    box-shadow: 0 10px 18px rgba(249, 111, 38, 0.24);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: rgba(255, 255, 255, 0.94);
  border-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    border-color: #f96f26;
    color: #f96f26;
  }
`;

export const GhostButton = styled(BaseButton)`
  background: rgba(249, 111, 38, 0.12);
  border-color: rgba(249, 111, 38, 0.3);
  color: #c9511a;

  &:hover {
    background: rgba(249, 111, 38, 0.18);
  }
`;

export const Hero = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 243, 236, 0.84) 100%);
  overflow: hidden;
  box-shadow: 0 15px 28px rgba(15, 23, 42, 0.1);
`;

export const HeroBanner = styled.div`
  height: 196px;
  background: linear-gradient(112deg, #f96f26 0%, #e1697c 52%, #8a61d4 100%);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(17, 24, 39, 0.2);
  }
`;

export const HeroContent = styled.div`
  margin-top: -62px;
  position: relative;
  z-index: 2;
  padding: 0 22px 22px;
  display: grid;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 14px 14px;
  }
`;

export const HeroTop = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HotelLogo = styled.div`
  width: 128px;
  height: 128px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 4px solid #ffffff;
  background: linear-gradient(160deg, #f96f26, #e1697c);
  box-shadow: ${({ theme }) => theme.shadows.md};
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 104px;
    height: 104px;
  }
`;

export const HeroIdentity = styled.div`
  display: grid;
  gap: 8px;
  flex: 1;

  h2 {
    margin: 0;
    font-size: 30px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  min-height: 28px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.9);
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  backdrop-filter: blur(4px);
`;

export const HeroDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 760px;
`;

export const GridTwo = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.86) 100%);
  box-shadow: 0 12px 22px rgba(15, 23, 42, 0.08);
  padding: 16px;
  display: grid;
  gap: 12px;
`;

export const CardHeader = styled.header`
  display: grid;
  gap: 4px;

  h3 {
    margin: 0;
    font-size: 19px;
    color: ${({ theme }) => theme.colors.text};
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const InfoList = styled.div`
  display: grid;
  gap: 10px;
`;

export const InfoRow = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const InfoIcon = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(140deg, rgba(249, 111, 38, 0.18) 0%, rgba(225, 105, 124, 0.22) 100%);
  color: #c9511a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const InfoText = styled.div`
  display: grid;
  gap: 2px;

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const DailyRate = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid rgba(249, 111, 38, 0.24);
  background: linear-gradient(150deg, rgba(249, 111, 38, 0.16) 0%, rgba(255, 255, 255, 0.96) 100%);
  padding: 14px;
  text-align: center;

  strong {
    color: #f96f26;
    font-size: 28px;
    line-height: 1;
  }

  p {
    margin: 4px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const BulletList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;

  li {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
    padding-left: 14px;
    position: relative;

    &::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: #f96f26;
      position: absolute;
      left: 0;
      top: 7px;
    }
  }
`;

export const FacilitiesGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FacilityItem = styled.article`
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(248, 250, 252, 0.98) 0%, rgba(255, 243, 236, 0.72) 100%);
  padding: 12px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  box-shadow: 0 7px 14px rgba(15, 23, 42, 0.06);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(249, 111, 38, 0.3);
  }

  div {
    display: grid;
    gap: 3px;
  }

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const ServiceItem = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 243, 236, 0.8) 100%);
  padding: 12px;
  display: flex;
  gap: 10px;
  box-shadow: 0 8px 15px rgba(15, 23, 42, 0.06);

  div {
    display: grid;
    gap: 3px;
    flex: 1;
  }

  strong {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }

  span {
    font-size: 12px;
    font-weight: 700;
    color: #f96f26;
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const GalleryItem = styled.button`
  border: none;
  padding: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  background: #e2e8f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 180ms ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

export const CardFooterAction = styled.button`
  border: 1px solid rgba(249, 111, 38, 0.28);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(249, 111, 38, 0.1);
  color: #c9511a;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  justify-self: center;
  min-height: 32px;
  padding: 0 12px;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(249, 111, 38, 0.16);
  }
`;

export const ContactGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const ContactItem = styled.article`
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(160deg, rgba(248, 250, 252, 0.98) 0%, rgba(255, 243, 236, 0.66) 100%);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 7px 14px rgba(15, 23, 42, 0.05);

  div {
    display: grid;
    gap: 2px;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ActionRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ $primary }) => ($primary ? "#e1697c" : "rgba(249, 111, 38, 0.32)")};
  background: ${({ $primary }) => ($primary ? "linear-gradient(120deg, #f96f26 0%, #e1697c 100%)" : "#ffffff")};
  color: ${({ $primary }) => ($primary ? "#ffffff" : "#c9511a")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ $primary }) => ($primary ? "0 10px 16px rgba(249, 111, 38, 0.24)" : "none")};
    background: ${({ $primary }) => ($primary ? "linear-gradient(120deg, #e1697c 0%, #8a61d4 100%)" : "#fff3ec")};
  }
`;

export const ReviewSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StarRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
`;

export const RatingValue = styled.strong`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TotalReviews = styled.span`
  min-height: 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(249, 111, 38, 0.24);
  background: rgba(255, 243, 236, 0.88);
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ReviewList = styled.div`
  display: grid;
  gap: 14px;
`;

export const ReviewItem = styled.article`
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.88);
  padding: 12px;
  display: flex;
  gap: 12px;
  box-shadow: 0 7px 13px rgba(15, 23, 42, 0.05);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Avatar = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: linear-gradient(140deg, rgba(249, 111, 38, 0.16) 0%, rgba(225, 105, 124, 0.2) 100%);
  color: #c9511a;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ReviewBody = styled.div`
  flex: 1;
  display: grid;
  gap: 6px;
`;

export const ReviewHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  h4 {
    margin: 0;
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const QuoteText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
  padding-left: 14px;
  position: relative;

  &::before {
    content: "\201C";
    color: #cbd5e1;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 16px;
    line-height: 1;
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
    outline: 2px solid rgba(249, 111, 38, 0.25);
    border-color: #f96f26;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #ffffff;
  padding: 10px;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: 2px solid rgba(249, 111, 38, 0.25);
    border-color: #f96f26;
  }
`;
