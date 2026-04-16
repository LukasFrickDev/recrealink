import type { AccessProfile } from "@/app/store/slices/profileSlice";
import heroImage from "@/assets/hero.png";

export const chooseProfilePageData = {
  brandTagline: "Escolha o perfil ideal e continue com uma experiência de acesso personalizada.",
  title: "Escolha seu perfil de acesso",
  subtitle: "Selecione como deseja usar a plataforma para continuar com cadastro ou login.",
  primaryAction: "Cadastrar com o perfil selecionado",
  secondaryAction: "Fazer login",
  selectionRequiredMessage: "Selecione um perfil para continuar.",
};

export const chooseProfileData: {
  id: AccessProfile;
  image: string;
  imagePosition: string;
  title: string;
  description: string;
}[] = [
  {
    id: "recreador",
    image: heroImage,
    imagePosition: "18% 36%",
    title: "Sou Recreador",
    description: "Quero vagas, agenda e painel de perfil profissional.",
  },
  {
    id: "hotelaria",
    image: heroImage,
    imagePosition: "72% 40%",
    title: "Sou da Hotelaria",
    description: "Quero contratar equipes e organizar atividades no hotel.",
  },
  {
    id: "empresa",
    image: heroImage,
    imagePosition: "56% 24%",
    title: "Tenho uma Empresa",
    description: "Quero gerenciar agenda, vagas e equipe da empresa.",
  },
  {
    id: "pais",
    image: heroImage,
    imagePosition: "30% 64%",
    title: "Sou Pai ou Mãe",
    description: "Quero encontrar empresas de recreação para minha família.",
  },
];
