import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_PROGRAMACOES_FEATURE_ID } from "./data";
import * as S from "./styles";

export const HotelariaProgramacoesPage = () => {
  return (
    <S.Page>
      <HotelariaOperacaoFeaturePage featureId={HOTELARIA_PROGRAMACOES_FEATURE_ID} />
    </S.Page>
  );
};

