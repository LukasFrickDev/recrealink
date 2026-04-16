import { ArrowLeft } from "lucide-react";
import type { MouseEventHandler } from "react";
import {
  underConstructionBackLabel,
  underConstructionDefaultHighlights,
  underConstructionDefaultNextSteps,
  underConstructionStatusLabel,
} from "./data";
import * as S from "./styles";

interface UnderConstructionPageTemplateProps {
  subtitle: string;
  message: string;
  onBack: MouseEventHandler<HTMLButtonElement>;
  backLabel?: string;
  statusLabel?: string;
  highlights?: string[];
  nextSteps?: string[];
  tone?: "recreador" | "hotelaria" | "empresa" | "pais";
}

export const UnderConstructionPageTemplate = ({
  subtitle,
  message,
  onBack,
  backLabel = underConstructionBackLabel,
  statusLabel = underConstructionStatusLabel,
  highlights = underConstructionDefaultHighlights,
  nextSteps = underConstructionDefaultNextSteps,
  tone = "recreador",
}: UnderConstructionPageTemplateProps) => {
  return (
    <S.Wrapper $tone={tone}>
      <S.Header>
        <S.StatusBadge>{statusLabel}</S.StatusBadge>
        <S.Subtitle>{subtitle}</S.Subtitle>
        <S.Message>{message}</S.Message>
      </S.Header>

      <S.InfoGrid>
        <S.InfoCard>
          <h4>Base já preparada</h4>
          <ul>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </S.InfoCard>

        <S.InfoCard>
          <h4>Próximos passos</h4>
          <ul>
            {nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </S.InfoCard>
      </S.InfoGrid>

      <S.BackButton type="button" onClick={onBack}>
        <ArrowLeft size={14} /> {backLabel}
      </S.BackButton>
    </S.Wrapper>
  );
};
