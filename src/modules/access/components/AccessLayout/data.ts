import type { AccessProfile } from "@/app/store/slices/profileSlice";
import heroImage from "@/assets/hero.png";

export const accessProfiles: { id: AccessProfile; label: string; description: string }[] = [
  {
    id: "recreador",
    label: "Recreador",
    description: "Quero vagas, agenda e crescimento profissional",
  },
  {
    id: "hotelaria",
    label: "Hotelaria",
    description: "Quero contratar equipe para meu hotel",
  },
  {
    id: "empresa",
    label: "Empresa",
    description: "Quero organizar agenda, equipe e operação",
  },
  {
    id: "pais",
    label: "Pais",
    description: "Quero encontrar opções para minha família",
  },
];

export const profileRouteMap: Record<AccessProfile, string> = {
  recreador: "/app/recreador",
  hotelaria: "/app/hotelaria",
  empresa: "/app/empresa",
  pais: "/app/pais",
};

export const accessProfileContext: Record<
  AccessProfile,
  {
    loginTitle: string;
    registerTitle: string;
    registerButton: string;
    backgroundGradient: string;
    backgroundOverlay: string;
    backgroundImage: string;
    backgroundImagePosition: string;
    actionColor: string;
  }
> = {
  recreador: {
    loginTitle: "Acesso para Recreadores",
    registerTitle: "Cadastro de Recreador",
    registerButton: "Cadastrar",
    backgroundGradient: "linear-gradient(145deg, #2e7ff0 0%, #7fa3eb 100%)",
    backgroundOverlay: "linear-gradient(160deg, rgba(20, 44, 81, 0.68) 0%, rgba(46, 127, 240, 0.34) 100%)",
    backgroundImage: heroImage,
    backgroundImagePosition: "center 30%",
    actionColor: "#2e7ff0",
  },
  hotelaria: {
    loginTitle: "Acesso para Hotéis",
    registerTitle: "Cadastro de Hotel",
    registerButton: "Cadastrar",
    backgroundGradient: "linear-gradient(145deg, #f96f26 0%, #f0a56d 100%)",
    backgroundOverlay: "linear-gradient(160deg, rgba(62, 36, 20, 0.66) 0%, rgba(249, 111, 38, 0.3) 100%)",
    backgroundImage: heroImage,
    backgroundImagePosition: "center 42%",
    actionColor: "#f96f26",
  },
  empresa: {
    loginTitle: "Acesso para Empresas",
    registerTitle: "Cadastro de Empresa",
    registerButton: "Cadastrar",
    backgroundGradient: "linear-gradient(145deg, #8a61d4 0%, #b087e8 100%)",
    backgroundOverlay: "linear-gradient(160deg, rgba(39, 29, 68, 0.66) 0%, rgba(138, 97, 212, 0.34) 100%)",
    backgroundImage: heroImage,
    backgroundImagePosition: "center 36%",
    actionColor: "#8a61d4",
  },
  pais: {
    loginTitle: "Acesso para Pais e Mães",
    registerTitle: "Cadastro para Pais e Mães",
    registerButton: "Criar conta",
    backgroundGradient: "linear-gradient(145deg, #e1697c 0%, #e9a3ad 100%)",
    backgroundOverlay: "linear-gradient(160deg, rgba(74, 34, 44, 0.64) 0%, rgba(225, 105, 124, 0.28) 100%)",
    backgroundImage: heroImage,
    backgroundImagePosition: "center 32%",
    actionColor: "#e1697c",
  },
};
