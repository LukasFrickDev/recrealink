import type { AccessProfile } from "@/app/store/slices/profileSlice";
import { stageMessages } from "@/shared/constants/stageMessages";

export const forgotPasswordData = {
  title: "Recuperar acesso",
  subtitle: "Informe seu e-mail para receber as instruções de recuperação.",
  helper: stageMessages.accessRecoveryVisualOnly,
};

export const forgotPasswordTaglineByProfile: Record<AccessProfile, string> = {
  recreador: "Recupere seu acesso e continue acompanhando vagas e experiências profissionais.",
  hotelaria: "Volte ao painel para retomar o planejamento de equipes e atividades no hotel.",
  empresa: "Recupere a conta para voltar ao controle de agenda, equipe e operação da empresa.",
  pais: "Recupere seu acesso para continuar buscando experiências de recreação para sua família.",
};
