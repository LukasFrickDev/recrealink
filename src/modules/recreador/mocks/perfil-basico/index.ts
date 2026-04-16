import {
  getRecreadorCertifications,
  getRecreadorDomainById,
  getRecreadorFeedbacks,
} from "@/shared/mocks/domains";

export interface CertificacaoItem {
  id: string;
  nome: string;
  instituicao: string;
  obtidoEm: string;
  validade: string;
  status: "valido" | "atualizar";
}

export interface DepoimentoItem {
  id: string;
  autor: string;
  cargo: string;
  texto: string;
  avaliacao: number;
  data: string;
}

export interface GaleriaItem {
  id: string;
  imagem: string;
  descricao: string;
}

const recreador = getRecreadorDomainById("rec-rafael-santos");

const certificacoes = getRecreadorCertifications("rec-rafael-santos").map((certificacao) => ({
  id: certificacao.id,
  nome: certificacao.title,
  instituicao: certificacao.institution,
  obtidoEm: String(certificacao.year),
  validade: certificacao.validity ?? "Permanente",
  status: certificacao.status === "Valido" ? ("valido" as const) : ("atualizar" as const),
})) satisfies CertificacaoItem[];

const depoimentos = [
  ...getRecreadorFeedbacks("rec-rafael-santos").map((feedback) => ({
    id: feedback.id,
    autor: feedback.author,
    cargo: feedback.role,
    texto: feedback.message,
    avaliacao: feedback.rating,
    data: feedback.dateLabel,
  })),
  {
    id: "dep-familia-rodriguez",
    autor: "Família Rodriguez",
    cargo: "Hóspedes",
    texto: "As criancas adoraram as atividades e pediram para repetir no dia seguinte.",
    avaliacao: 5,
    data: "12 Jan 2026",
  },
] satisfies DepoimentoItem[];

export const recreadorPerfilBasicoMock = {
  areaLabel: "Recreador",
  userName: recreador?.fullName ?? "Rafael Santos",
  title: "Perfil básico do recreador",
  description:
    "Portfólio público com certificações, avaliações e galeria de experiências profissionais.",
  stats: [
    { title: "Eventos realizados", value: "47", helper: "Histórico total" },
    { title: "Avaliação média", value: "4.8", helper: "Feedback dos contratantes" },
    { title: "Crianças atendidas", value: "340", helper: "Base aproximada" },
    { title: "Hotéis parceiros", value: "08", helper: "Rede ativa" },
  ],
  resumo: {
    nome: recreador?.fullName ?? "Rafael Santos",
    funcao: recreador?.role ?? "Recreador profissional",
    bio:
      recreador?.bio ??
      "Especialista em recreação infantil e familiar com foco em atividades de engajamento e segurança.",
    localidade: recreador?.locationLabel ?? "São Paulo - SP",
    especialidades: recreador?.specialties ?? [],
  },
  certificacoes,
  depoimentos,
  galeria: [
    {
      id: "gal-1",
      imagem:
        "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200&auto=format&fit=crop",
      descricao: "Gincana aquática em resort familiar",
    },
    {
      id: "gal-2",
      imagem:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
      descricao: "Show de talentos com crianças e adolescentes",
    },
    {
      id: "gal-3",
      imagem:
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop",
      descricao: "Oficina criativa com famílias",
    },
    {
      id: "gal-4",
      imagem:
        "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1200&auto=format&fit=crop",
      descricao: "Caça ao tesouro temática",
    },
  ] as GaleriaItem[],
};
