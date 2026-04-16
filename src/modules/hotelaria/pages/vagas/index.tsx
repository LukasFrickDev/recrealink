import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_VAGAS_FEATURE_ID } from "./data";
import * as S from "./styles";

export const HotelariaVagasPage = () => {
  return (
    <S.Page>
      <HotelariaOperacaoFeaturePage featureId={HOTELARIA_VAGAS_FEATURE_ID} />
    </S.Page>
  );
};

