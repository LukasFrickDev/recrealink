import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_OCORRENCIAS_FEATURE_ID } from "./data";
import * as S from "./styles";

export const HotelariaOcorrenciasPage = () => {
  return (
    <S.Page>
      <HotelariaOperacaoFeaturePage featureId={HOTELARIA_OCORRENCIAS_FEATURE_ID} />
    </S.Page>
  );
};

