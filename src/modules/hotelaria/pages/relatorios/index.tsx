import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_RELATORIOS_FEATURE_ID } from "./data";
import * as S from "./styles";

export const HotelariaRelatoriosPage = () => {
  return (
    <S.Page>
      <HotelariaOperacaoFeaturePage featureId={HOTELARIA_RELATORIOS_FEATURE_ID} />
    </S.Page>
  );
};

