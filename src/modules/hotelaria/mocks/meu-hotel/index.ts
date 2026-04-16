import { getHotelDomainById, getHotelProfileDomainById } from "@/shared/mocks/domains";

export interface HotelariaWorkingCondition {
  label: string;
  value: string;
}

export interface HotelariaFacility {
  title: string;
  description: string;
}

export interface HotelariaService {
  title: string;
  description: string;
  schedule: string;
}

export interface HotelariaGalleryItem {
  id: number;
  url: string;
  alt: string;
}

export interface HotelariaContactItem {
  key: "phone" | "email" | "whatsapp" | "address" | "website" | "checkin";
  label: string;
  value: string;
}

export interface HotelariaReviewItem {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  stay: string;
}

export interface HotelariaMeuHotelProfile {
  areaLabel: string;
  userName: string;
  title: string;
  description: string;
  hotelName: string;
  location: string;
  ratingLabel: string;
  partnerSince: string;
  heroDescription: string;
  workingConditions: HotelariaWorkingCondition[];
  dailyRate: string;
  compensationBenefits: string[];
  rules: string[];
  requirements: string[];
  facilities: HotelariaFacility[];
  services: HotelariaService[];
  gallery: HotelariaGalleryItem[];
  contacts: HotelariaContactItem[];
  reviews: HotelariaReviewItem[];
}

const hotel = getHotelDomainById("hotel-royal-palm-plaza");
const hotelProfile = getHotelProfileDomainById("hotel-royal-palm-plaza");

export const hotelariaMeuHotelMock: HotelariaMeuHotelProfile = {
  areaLabel: "Área da hotelaria",
  userName: "Carla Menezes",
  title: "Meu Hotel",
  description:
    "Página institucional do hotel com foco em apresentação pública, condições de trabalho e alinhamento operacional para a equipe de recreação.",
  hotelName: hotel?.name ?? "Royal Palm Plaza Resort Campinas",
  location: hotel ? `${hotel.city}, ${hotel.state}` : "Campinas, SP",
  ratingLabel:
    hotelProfile?.ratingLabel ??
    `${(hotel?.rating ?? 4.9).toFixed(1).replace(".", ",")} (${hotel?.reviews ?? 127} avaliações)`,
  partnerSince: hotelProfile?.partnerSince ?? "Parceiro desde 2024",
  heroDescription:
    hotelProfile?.heroDescription ??
    hotel?.description ??
    "Um dos resorts mais tradicionais do interior de São Paulo. Com ampla area de lazer e foco em recreação familiar.",
  workingConditions: hotelProfile?.workingConditions ?? [],
  dailyRate: hotelProfile?.dailyRateLabel ?? "R$ 250,00",
  compensationBenefits: hotelProfile?.benefits ?? [],
  rules: hotelProfile?.rules ?? [],
  requirements: hotelProfile?.requirements ?? [],
  facilities: hotelProfile?.facilities ?? [],
  services: hotelProfile?.services ?? [],
  gallery:
    hotelProfile?.gallery.map((item) => ({
      id: item.id,
      url: item.imageUrl,
      alt: item.alt,
    })) ?? [],
  contacts: hotelProfile?.contacts ?? [],
  reviews:
    hotelProfile?.reviews.map((item) => ({
      id: item.id,
      name: item.author,
      rating: item.rating,
      date: item.dateLabel,
      comment: item.comment,
      stay: item.stayLabel,
    })) ?? [],
};
