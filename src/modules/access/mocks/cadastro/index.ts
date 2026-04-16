import type { AccessProfile } from "@/app/store/slices/profileSlice";
import { stageMessages } from "@/shared/constants/stageMessages";

export const registerPageData = {
  subtitle: "Preencha os dados abaixo para se cadastrar.",
  helper: stageMessages.accessRegisterVisualOnly,
};

export const registerTaglineByProfile: Record<AccessProfile, string> = {
  recreador: "Cadastre seu perfil para se conectar a oportunidades e ampliar sua atuação em recreação.",
  hotelaria: "Estruture o cadastro do seu hotel para montar equipes e programações com mais agilidade.",
  empresa: "Crie o acesso da sua empresa para organizar agenda, operação e crescimento.",
  pais: "Cadastre sua família para encontrar opções de recreação acolhedoras e confiáveis.",
};

export const registerCopyByProfile: Record<
  AccessProfile,
  { title: string; submit: string; loginLink: string }
> = {
  recreador: {
    title: "Cadastro de Recreador",
    submit: "Cadastrar",
    loginLink: "Já sou recreador e quero entrar",
  },
  hotelaria: {
    title: "Cadastro de Hotel",
    submit: "Cadastrar",
    loginLink: "Já tenho conta de hotel",
  },
  empresa: {
    title: "Cadastro de Empresa",
    submit: "Cadastrar",
    loginLink: "Já tenho conta empresarial",
  },
  pais: {
    title: "Cadastro para Pais e Mães",
    submit: "Criar conta",
    loginLink: "Já tenho conta da família",
  },
};

export const regionOptions = [
  { value: "norte", label: "Norte" },
  { value: "nordeste", label: "Nordeste" },
  { value: "centro-oeste", label: "Centro-Oeste" },
  { value: "sudeste", label: "Sudeste" },
  { value: "sul", label: "Sul" },
];

export const availabilityOptions = [
  { value: "finais-de-semana", label: "Finais de semana" },
  { value: "feriados", label: "Feriados" },
  { value: "temporada", label: "Temporada" },
  { value: "integral", label: "Tempo integral" },
];
