import type { HotelariaFeatureMock } from "@/modules/hotelaria/mocks/shared";
import { hotelMaresias, hotelMaresiasProfile } from "@/modules/hotelaria/mocks/shared";

export const hotelariaMeuHotelFeatureMock: HotelariaFeatureMock = {
  featureId: "meu-hotel",
  menuLabel: "Meu hotel",
  title: "Meu hotel",
  description: "Perfil institucional do hotel com visão pública, dados operacionais e conteúdo para contratação.",
  status: "active",
  statusLabel: "Ativo",
  statusDetail: "Painel institucional em modo informativo, com compartilhamento rápido para equipe e gestão.",
  stats: [
    { title: "Perfil institucional", value: "96%", helper: "Campos essenciais preenchidos" },
    { title: "Secoes informativas", value: "6", helper: "Informações, regras e operação" },
    { title: "Recados fixos", value: "3", helper: "Comunicados ativos para a equipe" },
    { title: "Atualização mensal", value: "14", helper: "Revisões no último ciclo" },
  ],
  checkpoints: [
    "Manter endereco, telefone e canais oficiais atualizados.",
    "Revisar regras internas antes de feriados e alta temporada.",
    "Publicar recado fixo com orientacoes de rotina para toda a equipe.",
  ],
  layout: {
    type: "meu-hotel",
    hotelName: hotelMaresias?.name ?? "Hotel Maresias Resort e Spa",
    category: hotelMaresiasProfile?.categoryLabel ?? "Resort 4 estrelas",
    capacity: hotelMaresiasProfile?.capacityLabel ?? "250 hóspedes",
    location: hotelMaresiasProfile?.address ?? "Rua das Palmeiras, 123 - Centro, Maresias - SP",
    phone: hotelMaresiasProfile?.phone ?? "(12) 3865-4321",
    email: hotelMaresiasProfile?.email ?? "contato@maresiasresort.com.br",
    website: hotelMaresiasProfile?.website ?? "www.maresiasresort.com.br",
    heroDescription:
      hotelMaresiasProfile?.heroDescription ??
      "Um dos resorts mais tradicionais do litoral paulista, com foco em experiências familiares e operação de recreação contínua durante todo o ano.",
    ratingLabel: hotelMaresiasProfile?.ratingLabel ?? "4,9 (127 avaliações)",
    partnerSince: hotelMaresiasProfile?.partnerSince ?? "Parceiro desde 2024",
    workingConditions: hotelMaresiasProfile?.workingConditions ?? [],
    benefits: hotelMaresiasProfile?.benefits ?? [],
    rules: hotelMaresiasProfile?.rules ?? [],
    requirements: hotelMaresiasProfile?.requirements ?? [],
    facilities: hotelMaresiasProfile?.facilities ?? [],
    services: hotelMaresiasProfile?.services ?? [],
    gallery:
      hotelMaresiasProfile?.gallery.map((item) => ({
        title: item.title,
        description: item.description,
      })) ?? [],
    reviews:
      hotelMaresiasProfile?.reviews.map((item) => ({
        author: item.author,
        stay: item.stayLabel,
        rating: item.rating,
        comment: item.comment,
      })) ?? [],
    sections: hotelMaresiasProfile?.sections ?? [],
  },
};
