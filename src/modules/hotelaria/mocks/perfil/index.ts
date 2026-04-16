import { getHotelDomainById, getHotelProfileDomainById } from "@/shared/mocks/domains";

export interface HotelariaCertification {
  title: string;
  issuer: string;
  date: string;
}

export interface HotelariaProfileModel {
  fullName: string;
  role: string;
  hotelName: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  website: string;
  experience: string;
  bio: string;
  profilePhotoHint: string;
  specialties: string[];
  certifications: HotelariaCertification[];
}

const hotel = getHotelDomainById("hotel-maresias-resort-spa");
const hotelProfile = getHotelProfileDomainById("hotel-maresias-resort-spa");

export const hotelariaPerfilMock = {
  userName: "Carla Menezes",
  title: "Meu perfil profissional",
  description: "Gerencie suas informações de contratante, contato e posicionamento da operação.",
  stats: [
    { title: "Perfil completo", value: "94%", helper: "Foto oficial ainda pendente" },
    { title: "Especialidades", value: "6", helper: "Etiquetas de atuação" },
    { title: "Certificações", value: "3", helper: "Cursos validados" },
    { title: "Última revisão", value: "Hoje", helper: "Atualizado há 2 horas" },
  ],
  profile: {
    fullName: "Carla Menezes",
    role: "Gestora de hotelaria",
    hotelName: hotel?.name ?? "Hotel Maresias Resort e Spa",
    city: hotel?.city ?? "São Sebastiao",
    state: hotel?.state ?? "SP",
    email: hotelProfile?.email ?? "carla.menezes@maresiasresort.com.br",
    phone: hotelProfile?.phone ?? "(12) 3865-4321",
    website: hotelProfile?.website ?? "www.maresiasresort.com.br",
    experience: "9 anos",
    bio:
      "Lidero a operação de recreação do hotel com foco em escalas de alta performance, experiência do hóspede e formação contínua da equipe. Atuo em planejamento de programações, contratação de recreadores e consolidação de indicadores de qualidade.",
    profilePhotoHint: "Foto profissional em ambiente de operação",
    specialties: [
      "Gestão operacional",
      "Programação infantil",
      "Coordenação de equipes",
      "Atendimento familiar",
      "Eventos de alta temporada",
      "Qualidade e feedback",
    ],
    certifications: [
      {
        title: "Gestão de Hospitalidade e Experiência",
        issuer: "RecreaLink Academy",
        date: "Mar/2025",
      },
      {
        title: "Liderança de Equipes de Recreação",
        issuer: "ABIH Formação",
        date: "Nov/2024",
      },
      {
        title: "Segurança em Atividades de Lazer",
        issuer: "Instituto Turismo Seguro",
        date: "Jun/2024",
      },
    ],
  } satisfies HotelariaProfileModel,
  specialtyOptions: [
    "Gestão operacional",
    "Programação infantil",
    "Programação teen",
    "Relatórios executivos",
    "Comunicação de crise",
    "Curadoria de recreadores",
    "Eventos corporativos",
    "Atividades aquáticas",
  ],
  fixedNotice:
    "Check-in da equipe com 15 minutos de antecedência. Alterações de escala devem ser sinalizadas no chat de operação e registradas em ocorrências quando houver impacto no atendimento.",
};