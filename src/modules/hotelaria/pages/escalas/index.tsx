import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_ESCALAS_FEATURE_ID } from "./data";
import * as S from "./styles";

export const HotelariaEscalasPage = () => {
  return (
    <S.Page>
      <HotelariaOperacaoFeaturePage featureId={HOTELARIA_ESCALAS_FEATURE_ID} />
    </S.Page>
  );
};

