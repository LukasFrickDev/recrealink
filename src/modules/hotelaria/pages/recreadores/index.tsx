import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_RECREADORES_FEATURE_ID } from "./data";
import * as S from "./styles";

export const HotelariaRecreadoresPage = () => {
  return (
    <S.Page>
      <HotelariaOperacaoFeaturePage featureId={HOTELARIA_RECREADORES_FEATURE_ID} />
    </S.Page>
  );
};

