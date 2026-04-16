import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_ORCAMENTO_FEATURE_ID } from "./data";
import * as S from "./styles";

export const HotelariaOrcamentoPage = () => {
  return (
    <S.Page>
      <HotelariaOperacaoFeaturePage featureId={HOTELARIA_ORCAMENTO_FEATURE_ID} />
    </S.Page>
  );
};

