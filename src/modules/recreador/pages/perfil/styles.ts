import styled, { css } from "styled-components";

type MinorButtonTone = "default" | "neutral" | "danger";

const controlField = css`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.7rem 0.84rem;
  background: ${({ theme }) => theme.surfaces.panel};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandBlue};
    box-shadow: 0 0 0 3px rgba(46, 127, 240, 0.16);
  }
`;

const minorButtonTone = {
  default: css`
    border-color: rgba(46, 127, 240, 0.32);
    background: rgba(46, 127, 240, 0.1);
    color: ${({ theme }) => theme.colors.brandBlue};
  `,
  neutral: css`
    border-color: ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.surfaces.panel};
    color: ${({ theme }) => theme.colors.text};
  `,
  danger: css`
    border-color: rgba(211, 77, 98, 0.3);
    background: rgba(211, 77, 98, 0.1);
    color: #b53b53;
  `,
};

export const Wrapper = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SummaryCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  background:
    radial-gradient(circle at 100% 0%, rgba(46, 127, 240, 0.18) 0%, rgba(46, 127, 240, 0) 44%),
    radial-gradient(circle at 0% 100%, rgba(249, 111, 38, 0.16) 0%, rgba(249, 111, 38, 0) 46%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(236, 244, 255, 0.84));
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const SummaryTop = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const AvatarBadge = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid rgba(46, 127, 240, 0.24);
  background: linear-gradient(150deg, rgba(46, 127, 240, 0.14), rgba(255, 255, 255, 0.95));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: 1rem;
  font-weight: 900;
`;

export const SummaryIdentity = styled.div`
  display: grid;
  gap: 2px;
  margin-right: auto;

  h2 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: clamp(1.05rem, 2.2vw, 1.34rem);
    line-height: 1.2;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.45;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
`;

export const SummaryStats = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SummaryStat = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.7rem 0.8rem;
  display: grid;
  gap: 0.2rem;
  background: rgba(255, 255, 255, 0.86);

  strong {
    font-size: clamp(1rem, 2vw, 1.15rem);
    color: ${({ theme }) => theme.colors.textStrong};
    line-height: 1;
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-weight: 700;
  }
`;

export const SectionCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.surfaces.panel};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;
  padding-bottom: 0.55rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.typography.sectionTitle};
  display: inline-flex;
  align-items: center;
  gap: 0.46rem;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Field = styled.label`
  display: grid;
  gap: 0.42rem;

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: 0.02em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  input,
  textarea,
  select {
    ${controlField}
  }

  textarea {
    min-height: 108px;
    resize: vertical;
    line-height: 1.5;
  }
`;

export const FormColumns = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SubsectionTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.cardTitle};
  color: ${({ theme }) => theme.colors.textStrong};
  letter-spacing: 0.01em;
`;

export const InlineRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: minmax(0, 1fr) auto auto;

  input {
    ${controlField}
    min-height: 40px;
    padding: 0 0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const InlineActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const MinorButton = styled.button<{ $tone?: MinorButtonTone }>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 36px;
  padding: 0 0.7rem;
  font-size: ${({ theme }) => theme.typography.meta};
  font-weight: 800;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;

  ${({ $tone = "default" }) => minorButtonTone[$tone]}
`;

export const EmptyInlineList = styled.p`
  margin: 0;
  border: ${({ theme }) => theme.borders.dashed};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
  padding: 0.72rem 0.8rem;
`;

export const ManagedList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ManagedItemCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surfaces.panelSoft};
  padding: 0.72rem;
  display: grid;
  gap: 0.34rem;
`;

export const ManagedItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.52rem;
  flex-wrap: wrap;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    word-break: break-word;
  }
`;

export const ManagedItemActions = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const ManagedMeta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.45;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;

  span {
    border-radius: ${({ theme }) => theme.radii.pill};
    border: ${({ theme }) => theme.borders.subtle};
    background: #fff;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.micro};
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    padding: 0.14rem 0.46rem;
  }
`;

export const StatusChip = styled.span<{ $status: "valido" | "atualizar" }>`
  width: fit-content;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.typography.micro};
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.16rem 0.48rem;
  border: 1px solid
    ${({ $status }) => ($status === "valido" ? "rgba(23, 167, 102, 0.32)" : "rgba(227, 154, 18, 0.34)")};
  background: ${({ $status }) => ($status === "valido" ? "rgba(23, 167, 102, 0.12)" : "rgba(227, 154, 18, 0.12)")};
  color: ${({ $status }) => ($status === "valido" ? "#0f7a4d" : "#9a6811")};
`;

export const ChipsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ChipButton = styled.button<{ $selected?: boolean }>`
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.colors.brandBlue : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $selected }) => ($selected ? "rgba(46, 127, 240, 0.12)" : "#fff")};
  color: ${({ theme, $selected }) => ($selected ? theme.colors.brandBlue : theme.colors.text)};
  padding: 0.36rem 0.72rem;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandBlue};
  }
`;

export const OptionsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

export const OptionButton = styled.button<{ $selected?: boolean }>`
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.colors.brandBlue : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $selected }) =>
    $selected ? "linear-gradient(150deg, rgba(46, 127, 240, 0.14), rgba(255, 255, 255, 0.96))" : "#fff"};
  padding: 0.7rem 0.78rem;
  text-align: left;
  display: grid;
  gap: 0.22rem;
  cursor: pointer;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
    color: ${({ theme, $selected }) => ($selected ? theme.colors.brandBlue : theme.colors.textStrong)};
  }

  small {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const InlineHelper = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.5;
`;

export const ExperienceList = styled.ul`
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.45rem;

  li {
    display: grid;
    gap: 0.1rem;
  }

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }

  span,
  small,
  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
`;

export const GalleryCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background: #fff;
  display: grid;
`;

export const GalleryImage = styled.div<{ $image: string }>`
  height: 136px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
`;

export const GalleryCaption = styled.p`
  margin: 0;
  padding: 0.64rem 0.72rem;
  font-size: ${({ theme }) => theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`;

export const GalleryActions = styled.div`
  padding: 0 0.72rem 0.72rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const ReputationCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(175deg, rgba(255, 255, 255, 0.98), rgba(248, 251, 255, 0.94));
  padding: 0.78rem;
  display: grid;
  gap: 0.64rem;
`;

export const ReputationLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;

  strong {
    font-size: clamp(1.02rem, 2vw, 1.2rem);
    color: ${({ theme }) => theme.colors.warning};
    line-height: 1;
  }

  span {
    font-size: ${({ theme }) => theme.typography.bodySm};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Stars = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  display: inline-flex;
  align-items: center;
  gap: 0.18rem;
`;

export const MetricsGrid = styled.div`
  display: grid;
  gap: 0.56rem;
`;

export const MetricItem = styled.article`
  display: grid;
  gap: 0.3rem;
`;

export const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const MetricTrack = styled.div`
  width: 100%;
  height: 9px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.surfaces.panel};
  border: ${({ theme }) => theme.borders.subtle};
`;

export const MetricFill = styled.div<{ $value: number }>`
  width: ${({ $value }) => $value}%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
`;

export const ReviewGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

export const ReviewCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  padding: 0.74rem;
  display: grid;
  gap: 0.44rem;
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;

  strong {
    font-size: ${({ theme }) => theme.typography.label};
  }

  span {
    font-size: ${({ theme }) => theme.typography.meta};
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 700;
  }
`;

export const ReviewMeta = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;

  span {
    border-radius: ${({ theme }) => theme.radii.pill};
    border: ${({ theme }) => theme.borders.subtle};
    background: ${({ theme }) => theme.surfaces.panelSoft};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.micro};
    padding: 0.15rem 0.45rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

export const ReviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.bodySm};
  line-height: 1.45;
`;

export const ActionsRow = styled.div`
  position: sticky;
  bottom: ${({ theme }) => theme.spacing.sm};
  z-index: 20;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const BaseButton = styled.button`
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 40px;
  font-size: ${({ theme }) => theme.typography.bodySm};
  font-weight: 800;
  letter-spacing: 0.01em;
  padding: 0 0.92rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
`;

export const PrimaryButton = styled(BaseButton)`
  border: none;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.brandBlue}, ${({ theme }) => theme.colors.brandOrange});
  color: #fff;
`;

export const SecondaryButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  width: fit-content;
`;