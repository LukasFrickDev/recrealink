import type { AccessProfile } from "@/app/store/slices/profileSlice";
import { stageMessages } from "@/shared/constants/stageMessages";

export const loginPageData = {
  subtitle: "Digite suas credenciais para acessar sua conta.",
  helper: stageMessages.accessLoginVisualOnly,
};

export const loginTaglineByProfile: Record<AccessProfile, string> = {
  recreador: "Acesse seu painel para acompanhar oportunidades, agenda e evolução profissional.",
  hotelaria: "Entre para organizar equipes, atividades e experiências de recreação na hotelaria.",
  empresa: "Acesse sua operação para gerir agenda, equipe e vagas da sua empresa.",
  pais: "Entre para encontrar experiências de recreação com praticidade e cuidado para sua família.",
};

export const loginLinkCopyByProfile: Record<AccessProfile, { register: string }> = {
  recreador: {
    register: "Quero me cadastrar como recreador",
  },
  hotelaria: {
    register: "Quero cadastrar meu hotel",
  },
  empresa: {
    register: "Quero cadastrar minha empresa",
  },
  pais: {
    register: "Quero criar conta da família",
  },
};
