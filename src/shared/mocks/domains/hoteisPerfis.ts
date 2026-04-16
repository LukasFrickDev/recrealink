export interface HotelProfileWorkingConditionDomainEntity {
  label: string;
  value: string;
}

export interface HotelProfileFacilityDomainEntity {
  title: string;
  description: string;
}

export interface HotelProfileServiceDomainEntity {
  title: string;
  description: string;
  schedule: string;
}

export interface HotelProfileGalleryDomainEntity {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

export interface HotelProfileContactDomainEntity {
  key: "phone" | "email" | "whatsapp" | "address" | "website" | "checkin";
  label: string;
  value: string;
}

export interface HotelProfileReviewDomainEntity {
  id: number;
  author: string;
  rating: number;
  dateLabel: string;
  comment: string;
  stayLabel: string;
}

export interface HotelProfileSectionDomainEntity {
  title: string;
  subtitle: string;
  details: string[];
}

export interface HotelProfileDomainEntity {
  hotelId: string;
  categoryLabel: string;
  capacityLabel: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  heroDescription: string;
  ratingLabel: string;
  partnerSince: string;
  dailyRateLabel: string;
  workingConditions: HotelProfileWorkingConditionDomainEntity[];
  benefits: string[];
  rules: string[];
  requirements: string[];
  facilities: HotelProfileFacilityDomainEntity[];
  services: HotelProfileServiceDomainEntity[];
  gallery: HotelProfileGalleryDomainEntity[];
  contacts: HotelProfileContactDomainEntity[];
  reviews: HotelProfileReviewDomainEntity[];
  sections: HotelProfileSectionDomainEntity[];
}

const hotelProfilesDomainById: Record<string, HotelProfileDomainEntity> = {
  "hotel-royal-palm-plaza": {
    hotelId: "hotel-royal-palm-plaza",
    categoryLabel: "Resort 4 estrelas",
    capacityLabel: "250 hóspedes",
    address: "Av. Atlântica, 1500 - Copacabana, RJ",
    phone: "(11) 3333-4444",
    email: "contato@hotel.com",
    website: "www.hotel.com.br",
    heroDescription:
      "Um dos resorts mais tradicionais do interior de São Paulo. Com ampla area de lazer e foco em recreação familiar.",
    ratingLabel: "4,8 (366 avaliações)",
    partnerSince: "Parceiro desde 2024",
    dailyRateLabel: "R$ 250,00",
    workingConditions: [
      { label: "Horário de trabalho", value: "9h às 17h com 1h de intervalo" },
      { label: "Alimentação", value: "Café, almoço e jantar inclusos" },
      { label: "Uniforme", value: "Camiseta fornecida, calça preta própria" },
      { label: "Acomodação", value: "Quarto compartilhado (2 pessoas)" },
    ],
    benefits: [
      "Traslado incluído de e para a rodoviária.",
      "Acomodação compartilhada fornecida para equipe externa.",
      "Uniforme parcialmente fornecido pelo hotel.",
    ],
    rules: [
      "Uniforme completo obrigatório durante todo o expediente.",
      "Apresentação 15 minutos antes do início das atividades.",
      "Proibido uso de celular durante o expediente.",
      "Folgas aos domingos, conforme escala da coordenação.",
      "Participação obrigatória em reuniões diárias às 8h30.",
    ],
    requirements: [
      "Experiência mínima de 1 ano em recreação.",
      "Curso de primeiros socorros atualizado.",
      "Disponibilidade para feriados e finais de semana.",
      "Conhecimento em esportes aquáticos (diferencial).",
      "Saber nadar (obrigatório para atividades aquáticas).",
    ],
    facilities: [
      {
        title: "Piscina",
        description: "Piscina adulto e infantil com recreação aquática supervisionada.",
      },
      {
        title: "Academia",
        description: "Academia completa com equipamentos modernos.",
      },
      {
        title: "Estacionamento",
        description: "Estacionamento gratuito para hóspedes e equipe escalada.",
      },
      {
        title: "Restaurante",
        description: "Culinária regional e internacional para hóspedes e equipe.",
      },
      {
        title: "Wi-Fi gratuito",
        description: "Internet de alta velocidade em áreas comuns.",
      },
      {
        title: "Ar-condicionado",
        description: "Todos os quartos com climatização e manutenção ativa.",
      },
    ],
    services: [
      {
        title: "Recreação infantil",
        description: "Atividades diárias para crianças com monitores especializados.",
        schedule: "9h às 17h",
      },
      {
        title: "Recreação adulta",
        description: "Jogos e dinâmicas para adultos e terceira idade.",
        schedule: "14h às 22h",
      },
      {
        title: "Baby club",
        description: "Espaço dedicado para bebês e crianças até 3 anos.",
        schedule: "9h às 12h",
      },
      {
        title: "Programação noturna",
        description: "Shows, apresentações e entretenimento em família.",
        schedule: "20h às 23h",
      },
      {
        title: "Esportes e competições",
        description: "Torneios e atividades esportivas para toda a família.",
        schedule: "Conforme agenda",
      },
      {
        title: "Shows e espetáculos",
        description: "Apresentações musicais e teatrais temáticas.",
        schedule: "Fins de semana",
      },
    ],
    gallery: [
      {
        id: 1,
        title: "Área da piscina",
        description: "Espaço principal para atividades de verão e integração familiar.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        alt: "Área da piscina",
      },
      {
        id: 2,
        title: "Restaurante principal",
        description: "Estrutura de alimentação com funcionamento estendido.",
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
        alt: "Restaurante principal",
      },
      {
        id: 3,
        title: "Recreação infantil",
        description: "Ambiente dedicado para oficinas e jogos por faixa etária.",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
        alt: "Recreação infantil",
      },
      {
        id: 4,
        title: "Vista do hotel",
        description: "Vista panorâmica da área central do resort.",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        alt: "Vista do hotel",
      },
      {
        id: 5,
        title: "Quarto executivo",
        description: "Acomodação padrão para hóspedes de curta e média permanência.",
        imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400",
        alt: "Quarto executivo",
      },
      {
        id: 6,
        title: "Área de lazer",
        description: "Ambiente complementar para convivência e atividades em grupo.",
        imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400",
        alt: "Área de lazer",
      },
    ],
    contacts: [
      { key: "phone", label: "Telefone", value: "(11) 3333-4444" },
      { key: "email", label: "E-mail", value: "contato@hotel.com" },
      { key: "whatsapp", label: "WhatsApp", value: "Reservas via WhatsApp" },
      { key: "address", label: "Endereço", value: "Av. Atlântica, 1500 - Copacabana, RJ" },
      { key: "website", label: "Website", value: "www.hotel.com.br" },
      { key: "checkin", label: "Check-in/Check-out", value: "15h / 12h" },
    ],
    reviews: [
      {
        id: 1,
        author: "Maria Silva",
        rating: 5,
        dateLabel: "2024-01-20",
        comment:
          "Hotel maravilhoso! A recreação infantil é excepcional, as crianças se divertiram muito. Instalações impecáveis e atendimento nota 10.",
        stayLabel: "Estadia em janeiro de 2024",
      },
      {
        id: 2,
        author: "João Santos",
        rating: 5,
        dateLabel: "2024-01-15",
        comment:
          "Excelente experiência! A programação de recreação é muito bem organizada e os monitores são superatenciosos. Voltaremos com certeza!",
        stayLabel: "Estadia em janeiro de 2024",
      },
      {
        id: 3,
        author: "Ana Costa",
        rating: 4,
        dateLabel: "2023-12-28",
        comment:
          "Muito bom hotel, ótima localização e atividades de lazer diversificadas. O restaurante poderia ter mais opções vegetarianas.",
        stayLabel: "Estadia em dezembro de 2023",
      },
      {
        id: 4,
        author: "Carlos Oliveira",
        rating: 5,
        dateLabel: "2023-12-20",
        comment:
          "Perfeito para famílias! As crianças adoraram a piscina e os jogos. A equipe de recreação está de parabéns.",
        stayLabel: "Estadia em dezembro de 2023",
      },
    ],
    sections: [],
  },
  "hotel-maresias-resort-spa": {
    hotelId: "hotel-maresias-resort-spa",
    categoryLabel: "Resort 4 estrelas",
    capacityLabel: "250 hóspedes",
    address: "Rua das Palmeiras, 123 - Centro, Maresias - SP",
    phone: "(12) 3865-4321",
    email: "contato@maresiasresort.com.br",
    website: "www.maresiasresort.com.br",
    heroDescription:
      "Um dos resorts mais tradicionais do litoral paulista, com foco em experiências familiares e operação de recreação contínua durante todo o ano.",
    ratingLabel: "4,9 (127 avaliações)",
    partnerSince: "Parceiro desde 2024",
    dailyRateLabel: "R$ 250,00",
    workingConditions: [
      { label: "Horário de trabalho", value: "9h às 17h com 1h de intervalo" },
      { label: "Alimentação", value: "Café, almoço e jantar inclusos" },
      { label: "Uniforme", value: "Camiseta fornecida e calça preta" },
      { label: "Acomodação", value: "Quarto compartilhado para equipe externa" },
    ],
    benefits: [
      "Diária base de R$ 250,00 para recreadores credenciados.",
      "Traslado incluído da rodoviária para o hotel.",
      "Apoio de coordenação local em finais de semana e feriados.",
    ],
    rules: [
      "Uniforme completo obrigatório durante o expediente.",
      "Apresentação 15 minutos antes do início das atividades.",
      "Uso de celular apenas em áreas autorizadas e pausas.",
      "Participação obrigatória no briefing diário das 8h30.",
    ],
    requirements: [
      "Experiência mínima de 1 ano em recreação.",
      "Curso de primeiros socorros atualizado.",
      "Disponibilidade para feriados e finais de semana.",
      "Conhecimento em atividades aquáticas (diferencial).",
    ],
    facilities: [
      { title: "Piscina", description: "Piscina adulto e infantil com suporte da recreação." },
      { title: "Academia", description: "Estrutura completa com acompanhamento em horários definidos." },
      { title: "Restaurante", description: "Serviço interno para hóspedes e equipe escalada." },
      { title: "Wi-Fi", description: "Cobertura em áreas comuns e salas de apoio." },
    ],
    services: [
      {
        title: "Recreação infantil",
        description: "Atividades diárias com monitores especializados.",
        schedule: "9h às 17h",
      },
      {
        title: "Programação teens",
        description: "Jogos, desafios e dinâmica de integração.",
        schedule: "14h às 22h",
      },
      {
        title: "Programação noturna",
        description: "Shows, apresentações e entretenimento para famílias.",
        schedule: "20h às 23h",
      },
    ],
    gallery: [
      {
        id: 1,
        title: "Área da piscina",
        description: "Vista principal da área aquática.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        alt: "Área da piscina",
      },
      {
        id: 2,
        title: "Espaço kids",
        description: "Ambiente de recreação infantil interna.",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
        alt: "Espaço kids",
      },
      {
        id: 3,
        title: "Palco noturno",
        description: "Estrutura para apresentações e shows.",
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
        alt: "Palco noturno",
      },
      {
        id: 4,
        title: "Lounge família",
        description: "Área de convivência para descanso e jogos.",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        alt: "Lounge família",
      },
    ],
    contacts: [
      { key: "phone", label: "Telefone", value: "(12) 3865-4321" },
      { key: "email", label: "E-mail", value: "contato@maresiasresort.com.br" },
      { key: "whatsapp", label: "WhatsApp", value: "Atendimento da recepção" },
      { key: "address", label: "Endereço", value: "Rua das Palmeiras, 123 - Centro, Maresias - SP" },
      { key: "website", label: "Website", value: "www.maresiasresort.com.br" },
      { key: "checkin", label: "Check-in/Check-out", value: "15h / 12h" },
    ],
    reviews: [
      {
        id: 1,
        author: "Maria Silva",
        rating: 5,
        dateLabel: "2026-01-20",
        comment: "Equipe de recreação excelente, programação muito organizada e acolhedora.",
        stayLabel: "Estadia em janeiro/2026",
      },
      {
        id: 2,
        author: "João Santos",
        rating: 5,
        dateLabel: "2025-12-20",
        comment: "Ótima experiência para famílias, com atividades em todos os períodos.",
        stayLabel: "Estadia em dezembro/2025",
      },
      {
        id: 3,
        author: "Ana Costa",
        rating: 4,
        dateLabel: "2025-11-10",
        comment: "Hotel bem estruturado e equipe atenciosa; destaque para o time kids.",
        stayLabel: "Estadia em novembro/2025",
      },
    ],
    sections: [
      {
        title: "Informações gerais",
        subtitle: "Dados institucionais e descrição pública",
        details: [
          "Foco em experiências de lazer para famílias, teens e público premium.",
          "Timezone operacional: America/Sao_Paulo.",
          "Check-in da equipe 15 minutos antes do início da atividade.",
        ],
      },
      {
        title: "Regras internas",
        subtitle: "Conduta e organização da equipe",
        details: [
          "Crachá obrigatório e postura profissional em todas as interações.",
          "Respeitar horários de descanso e sinalização de área silenciosa.",
          "Protocolo de emergência revisado semanalmente com líderes de turno.",
        ],
      },
      {
        title: "Transporte",
        subtitle: "Acesso ao hotel e deslocamento",
        details: [
          "Van do hotel às 06h30 e 18h30 com parada na rodoviária.",
          "Ponto de ônibus a 200m da entrada principal.",
          "Estacionamento interno liberado para equipe em turno noturno.",
        ],
      },
      {
        title: "Uniformes",
        subtitle: "Padrão visual e segurança",
        details: [
          "Camiseta azul-marinho com logo oficial e calça ou bermuda bege.",
          "Tênis fechado obrigatório para atividades externas.",
          "Colete refletivo para operações noturnas em area externa.",
        ],
      },
      {
        title: "Pagamentos",
        subtitle: "Politicas e repasses",
        details: [
          "Pagamento mensal no dia 5 via PIX ou conta corrente.",
          "Adicional noturno para escalas com encerramento após 22h.",
          "Prestação de contas de materiais até o último dia útil do mês.",
        ],
      },
      {
        title: "Recados fixos",
        subtitle: "Mensagem oficial para a equipe",
        details: [
          "Objetivo do hotel: experiência leve, segura e memorável para os hóspedes.",
          "Toda alteração de escala precisa ser confirmada no chat de operação.",
          "Incidentes devem ser registrados no mesmo dia em ocorrências.",
        ],
      },
    ],
  },
};

export const getHotelProfileDomainById = (hotelId: string) => hotelProfilesDomainById[hotelId];
