import { empresaProfileIdentity } from "@/modules/empresa/mocks/shared";
import {
  getRecreadorCertifications,
  getRecreadorDomainById,
  getRecreadorFeedbacks,
} from "@/shared/mocks/domains";

const recreador = getRecreadorDomainById("rec-carlos-eduardo");

const certifications = getRecreadorCertifications("rec-carlos-eduardo").map((certification) => ({
  title: certification.title,
  institution: certification.institution,
  year: String(certification.year),
}));

const recentFeedbacks = getRecreadorFeedbacks("rec-carlos-eduardo").map((feedback) => ({
  author: feedback.author,
  rating: feedback.rating,
  message: feedback.message,
}));

export const empresarioRecreadorPageMock = {
  ...empresaProfileIdentity,
  title: "Perfil do Recreador",
  description:
    "Visualização do perfil profissional para avaliação de histórico, competências e aderência aos eventos da empresa.",
  stats: [
    {
      title: "Avaliação média",
      value: (recreador?.rating ?? 4.9).toFixed(1).replace(".", ","),
      helper: "Base de 127 avaliações",
    },
    { title: "Eventos realizados", value: "234", helper: "Últimos 24 meses" },
    {
      title: "Disponibilidade",
      value: recreador?.availability === "Disponível" ? "Alta" : "Parcial",
      helper: "Próximos 30 dias",
    },
    { title: "Certificações", value: String(certifications.length), helper: "Validadas no sistema" },
  ],
  profile: {
    fullName: recreador?.fullName ?? "Carlos Eduardo Nunes",
    artisticName: recreador?.artisticName ?? "Tio Carlos",
    role: recreador?.role ?? "Recreador sênior",
    experience: recreador?.experienceLabel ?? "8 anos de experiência",
    location: recreador?.locationLabel ?? "São Paulo - SP",
    coverage: recreador?.coverageLabel ?? "Atuacao em ate 30 km",
    about:
      recreador?.bio ??
      "Profissional com foco em recreação infantil, conducao de dinâmicas em grupo e atividades tematicas.",
    specialties: recreador?.specialties ?? [],
    availability: [
      "Segunda a sexta: 14h às 22h",
      "Sábados: disponibilidade integral",
      "Domingos: sob consulta",
    ],
    contacts: [
      { label: "Telefone", value: recreador?.phone ?? "(11) 98765-4321" },
      { label: "E-mail", value: recreador?.email ?? "carlos.nunes@recrealink.com" },
      { label: "Cidade base", value: recreador?.locationLabel ?? "São Paulo - SP" },
    ],
  },
  certifications,
  portfolio: [
    {
      title: "Festival Kids no Parque",
      summary: "Condução de circuito lúdico com 120 crianças em quatro estações temáticas.",
      audience: "Condomínio residencial",
    },
    {
      title: "Colônia de Férias Criativa",
      summary: "Planejamento e execução de programação semanal para faixa etária de 6 a 12 anos.",
      audience: "Clube esportivo",
    },
    {
      title: "Family Day Corporativo",
      summary: "Integração entre famílias com jogos cooperativos e oficinas guiadas.",
      audience: "Empresa de tecnologia",
    },
  ],
  recentFeedbacks,
};
