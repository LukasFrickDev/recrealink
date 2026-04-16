import { HotelariaOperacaoFeaturePage } from "@/modules/hotelaria/pages/operacoes-base";
import { HOTELARIA_CONFIGURACOES_FEATURE_ID } from "./data";

export const HotelariaConfiguracoesPage = () => {
  return <HotelariaOperacaoFeaturePage featureId={HOTELARIA_CONFIGURACOES_FEATURE_ID} />;
};

