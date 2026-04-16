import { hotelariaChatFeatureMock } from "@/modules/hotelaria/mocks/chat";
import { hotelariaComunidadeFeatureMock } from "@/modules/hotelaria/mocks/comunidade";
import { hotelariaConfiguracoesFeatureMock } from "@/modules/hotelaria/mocks/configuracoes";
import { hotelariaEscalasFeatureMock } from "@/modules/hotelaria/mocks/escalas";
import { hotelariaFeedbackFeatureMock } from "@/modules/hotelaria/mocks/feedback";
import { hotelariaIndicadoresFeatureMock } from "@/modules/hotelaria/mocks/indicadores";
import { hotelariaMeuHotelFeatureMock } from "@/modules/hotelaria/mocks/meu-hotel/feature";
import { hotelariaNotificacoesFeatureMock } from "@/modules/hotelaria/mocks/notificacoes";
import { hotelariaOcorrenciasFeatureMock } from "@/modules/hotelaria/mocks/ocorrencias";
import { hotelariaOrcamentoFeatureMock } from "@/modules/hotelaria/mocks/orcamento";
import { hotelariaProgramacoesFeatureMock } from "@/modules/hotelaria/mocks/programacoes";
import { hotelariaRecreadoresFeatureMock } from "@/modules/hotelaria/mocks/recreadores";
import { hotelariaRelatoriosFeatureMock } from "@/modules/hotelaria/mocks/relatorios";
import { hotelariaVagasFeatureMock } from "@/modules/hotelaria/mocks/vagas";
import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";

export type {
  HotelariaEscalasLayout,
  HotelariaFeatureLayout,
  HotelariaFeatureMock,
  HotelariaMeuHotelLayout,
  HotelariaRecreadoresLayout,
  HotelariaSummaryItem,
} from "@/modules/hotelaria/mocks/shared";

const hotelariaFeatures: Record<string, HotelariaFeatureMock> = {
  "meu-hotel": hotelariaMeuHotelFeatureMock,
  escalas: hotelariaEscalasFeatureMock,
  recreadores: hotelariaRecreadoresFeatureMock,
  vagas: hotelariaVagasFeatureMock,
  programacoes: hotelariaProgramacoesFeatureMock,
  "feedback-recreadores": hotelariaFeedbackFeatureMock,
  indicadores: hotelariaIndicadoresFeatureMock,
  relatorios: hotelariaRelatoriosFeatureMock,
  orcamento: hotelariaOrcamentoFeatureMock,
  ocorrencias: hotelariaOcorrenciasFeatureMock,
  comunidade: hotelariaComunidadeFeatureMock,
  chat: hotelariaChatFeatureMock,
  notifications: hotelariaNotificacoesFeatureMock,
  settings: hotelariaConfiguracoesFeatureMock,
};

const defaultFeatureId = "escalas";

export const hotelariaFeatureMocks = hotelariaFeatures;

export const getHotelariaFeatureMock = (featureId?: string): HotelariaFeatureMock => {
  if (featureId && featureId in hotelariaFeatures) {
    return hotelariaFeatures[featureId];
  }

  return hotelariaFeatures[defaultFeatureId];
};
