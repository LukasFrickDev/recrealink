import styled from "styled-components";

export const Wrapper = styled.section`
  display: grid;
  gap: 1rem;
`;

const BaseCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
`;

export const SummaryCard = styled(BaseCard)`
  display: grid;
  gap: 0.9rem;
`;

export const SummaryTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
`;

export const AvatarBadge = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.brandBlue};
`;

export const SummaryIdentity = styled.div`
  display: grid;
  gap: 0.1rem;
  margin-right: auto;

  h2 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.84rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
  }
`;

export const SummaryStats = styled.div`
  display: grid;
  gap: 0.65rem;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
`;

export const SummaryStat = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 0.68rem 0.75rem;
  display: grid;
  gap: 0.22rem;

  strong {
    font-size: 0.92rem;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SectionCard = styled(BaseCard)`
  display: grid;
  gap: 0.9rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 0.96rem;
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const Field = styled.label`
  display: grid;
  gap: 0.4rem;

  span {
    font-size: 0.78rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMuted};
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  input,
  textarea {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 0.68rem 0.82rem;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.84rem;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandBlue};
      box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.14);
    }
  }

  textarea {
    min-height: 102px;
    resize: vertical;
  }
`;

export const ChipsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.48rem;
`;

export const ChipButton = styled.button<{ $selected?: boolean }>`
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.colors.brandBlue : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $selected }) => ($selected ? "rgba(29, 78, 216, 0.1)" : theme.colors.surface)};
  color: ${({ theme, $selected }) => ($selected ? theme.colors.brandBlue : theme.colors.text)};
  padding: 0.34rem 0.7rem;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
`;

export const OptionsGrid = styled.div`
  display: grid;
  gap: 0.55rem;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
`;

export const OptionButton = styled.button<{ $selected?: boolean }>`
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.colors.brandBlue : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $selected }) => ($selected ? "rgba(29, 78, 216, 0.08)" : theme.colors.surface)};
  padding: 0.62rem 0.74rem;
  text-align: left;
  display: grid;
  gap: 0.2rem;
  cursor: pointer;

  strong {
    font-size: 0.8rem;
    color: ${({ theme, $selected }) => ($selected ? theme.colors.brandBlue : theme.colors.text)};
  }

  small {
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const InlineHelper = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
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
    font-size: 0.8rem;
  }

  span,
  small,
  p {
    margin: 0;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
`;

export const GalleryCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

export const GalleryImage = styled.div<{ $image: string }>`
  height: 126px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
`;

export const GalleryCaption = styled.p`
  margin: 0;
  padding: 0.58rem 0.68rem;
  font-size: 0.76rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ReputationCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  padding: 0.72rem;
  display: grid;
  gap: 0.62rem;
`;

export const ReputationLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;

  strong {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.warning};
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Stars = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  display: inline-flex;
  align-items: center;
  gap: 0.16rem;
`;

export const MetricsGrid = styled.div`
  display: grid;
  gap: 0.54rem;
`;

export const MetricItem = styled.article`
  display: grid;
  gap: 0.28rem;
`;

export const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 700;
`;

export const MetricTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MetricFill = styled.div<{ $value: number }>`
  width: ${({ $value }) => $value}%;
  height: 100%;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.brandBlue};
`;

export const ReviewGrid = styled.div`
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

export const ReviewCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.7rem;
  display: grid;
  gap: 0.42rem;
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;

  strong {
    font-size: 0.82rem;
  }

  span {
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
  }
`;

export const ReviewMeta = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;

  span {
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surfaceSoft};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.68rem;
    padding: 0.14rem 0.44rem;
    font-weight: 600;
  }
`;

export const ReviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.79rem;
  line-height: 1.42;
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BaseButton = styled.button`
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.54rem 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
`;

export const PrimaryButton = styled(BaseButton)`
  border: none;
  background: ${({ theme }) => theme.colors.brandBlue};
  color: #fff;
`;

export const SecondaryButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  width: fit-content;
`;

export const Feedback = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.8rem;
  font-weight: 600;
`;
