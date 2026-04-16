import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_FEEDBACK_FEATURE_ID } from "./data";
import * as S from "./styles";

export const HotelariaFeedbackPage = () => {
  return (
    <S.Page>
      <HotelariaOperacaoFeaturePage featureId={HOTELARIA_FEEDBACK_FEATURE_ID} />
    </S.Page>
  );
};

