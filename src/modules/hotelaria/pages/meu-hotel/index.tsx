import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AirVent,
  ArrowLeft,
  Baby,
  Building2,
  Calendar,
  Car,
  Clock,
  Dumbbell,
  Gamepad2,
  Globe,
  Images,
  Mail,
  MapPin,
  MessageCircle,
  Music,
  Phone,
  Share2,
  Shield,
  Shirt,
  Star,
  Trophy,
  Users,
  Utensils,
  Waves,
} from "lucide-react";
import {
  hotelariaMeuHotelMock,
  type HotelariaContactItem,
  type HotelariaFacility,
  type HotelariaMeuHotelProfile,
  type HotelariaReviewItem,
  type HotelariaService,
  type HotelariaWorkingCondition,
} from "@/modules/hotelaria/mocks/meu-hotel";
import * as S from "./styles";

interface HotelDraft extends Pick<HotelariaMeuHotelProfile,
  | "hotelName"
  | "location"
  | "ratingLabel"
  | "partnerSince"
  | "heroDescription"
  | "dailyRate"
  | "workingConditions"
  | "compensationBenefits"
  | "rules"
  | "requirements"
  | "contacts"
> {}

const workingConditionIconMap: Record<string, typeof Clock> = {
  "Horário de trabalho": Clock,
  Alimentação: Utensils,
  Uniforme: Shirt,
  Acomodação: MapPin,
};

const facilityIconMap: Record<string, typeof Waves> = {
  Piscina: Waves,
  Academia: Dumbbell,
  Estacionamento: Car,
  Restaurante: Utensils,
  "Wi-Fi gratuito": Globe,
  "Ar-condicionado": AirVent,
};

const serviceIconMap: Record<string, typeof Gamepad2> = {
  "Recreação infantil": Gamepad2,
  "Recreação adulta": Users,
  "Baby club": Baby,
  "Programação noturna": Clock,
  "Esportes e competições": Trophy,
  "Shows e espetáculos": Music,
};

const contactIconMap: Record<HotelariaContactItem["key"], typeof Phone> = {
  phone: Phone,
  email: Mail,
  whatsapp: MessageCircle,
  address: MapPin,
  website: Globe,
  checkin: Clock,
};

const toDraft = (): HotelDraft => ({
  hotelName: hotelariaMeuHotelMock.hotelName,
  location: hotelariaMeuHotelMock.location,
  ratingLabel: hotelariaMeuHotelMock.ratingLabel,
  partnerSince: hotelariaMeuHotelMock.partnerSince,
  heroDescription: hotelariaMeuHotelMock.heroDescription,
  dailyRate: hotelariaMeuHotelMock.dailyRate,
  workingConditions: hotelariaMeuHotelMock.workingConditions.map((item) => ({ ...item })),
  compensationBenefits: [...hotelariaMeuHotelMock.compensationBenefits],
  rules: [...hotelariaMeuHotelMock.rules],
  requirements: [...hotelariaMeuHotelMock.requirements],
  contacts: hotelariaMeuHotelMock.contacts.map((item) => ({ ...item })),
});

const toLines = (items: string[]) => items.join("\n");

const fromLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

export const HotelariaMeuHotelPage = () => {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<HotelDraft>(() => toDraft());
  const [draft, setDraft] = useState<HotelDraft>(() => toDraft());
  const [isEditing, setIsEditing] = useState(false);

  const headerDescription = useMemo(
    () =>
      `${hotelariaMeuHotelMock.description} Gestão responsável: ${hotelariaMeuHotelMock.userName}.`,
    [],
  );

  const averageRating = useMemo(() => {
    const total = hotelariaMeuHotelMock.reviews.reduce((acc, review) => acc + review.rating, 0);

    return total / hotelariaMeuHotelMock.reviews.length;
  }, []);

  const startEdit = () => {
    setDraft(hotel);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(hotel);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setHotel(draft);
    setIsEditing(false);
  };

  const renderStarRow = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star key={`${rating}-${index}`} size={14} color={index < rating ? "#facc15" : "#cbd5e1"} fill={index < rating ? "#facc15" : "none"} />
    ));

  const updateWorkingCondition = (index: number, field: keyof HotelariaWorkingCondition, value: string) => {
    setDraft((previous) => ({
      ...previous,
      workingConditions: previous.workingConditions.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const updateContact = (index: number, value: string) => {
    setDraft((previous) => ({
      ...previous,
      contacts: previous.contacts.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              value,
            }
          : item,
      ),
    }));
  };

  const buildInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");

  return (
    <S.Page>
      <S.Container>
        <S.Header>
          <S.HeaderInfo>
            <S.AreaLabel>{hotelariaMeuHotelMock.areaLabel}</S.AreaLabel>
            <S.Title>{hotelariaMeuHotelMock.title}</S.Title>
            <S.Description>{headerDescription}</S.Description>
          </S.HeaderInfo>

          <S.HeaderActions>
            <S.SecondaryButton type="button" onClick={() => navigate("/app/hotelaria/perfil")}>
              <ArrowLeft size={14} />
              Voltar
            </S.SecondaryButton>
            <S.PrimaryButton type="button">
              <Star size={14} />
              Favoritar
            </S.PrimaryButton>
            <S.PrimaryButton type="button">
              <Share2 size={14} />
              Compartilhar
            </S.PrimaryButton>

            {isEditing ? (
              <>
                <S.GhostButton type="button" onClick={cancelEdit}>
                  Cancelar
                </S.GhostButton>
                <S.PrimaryButton type="button" onClick={saveEdit}>
                  Salvar alterações
                </S.PrimaryButton>
              </>
            ) : (
              <S.PrimaryButton type="button" onClick={startEdit}>
                Editar informações
              </S.PrimaryButton>
            )}
          </S.HeaderActions>
        </S.Header>

        <S.Hero>
          <S.HeroBanner />

          <S.HeroContent>
            <S.HeroTop>
              <S.HotelLogo>
                <Building2 size={42} />
              </S.HotelLogo>

              <S.HeroIdentity>
                {isEditing ? (
                  <S.Input
                    value={draft.hotelName}
                    onChange={(event) => setDraft((prev) => ({ ...prev, hotelName: event.target.value }))}
                    aria-label="Nome do hotel"
                  />
                ) : (
                  <h2>{hotel.hotelName}</h2>
                )}

                <S.BadgeRow>
                  <S.Badge>
                    <MapPin size={12} />
                    {isEditing ? (
                      <S.Input
                        value={draft.location}
                        onChange={(event) => setDraft((prev) => ({ ...prev, location: event.target.value }))}
                        aria-label="Localização"
                      />
                    ) : (
                      <span>{hotel.location}</span>
                    )}
                  </S.Badge>

                  <S.Badge>
                    <Star size={12} />
                    {isEditing ? (
                      <S.Input
                        value={draft.ratingLabel}
                        onChange={(event) => setDraft((prev) => ({ ...prev, ratingLabel: event.target.value }))}
                        aria-label="Avaliação"
                      />
                    ) : (
                      <span>{hotel.ratingLabel}</span>
                    )}
                  </S.Badge>

                  <S.Badge>
                    <Calendar size={12} />
                    {isEditing ? (
                      <S.Input
                        value={draft.partnerSince}
                        onChange={(event) => setDraft((prev) => ({ ...prev, partnerSince: event.target.value }))}
                        aria-label="Parceria"
                      />
                    ) : (
                      <span>{hotel.partnerSince}</span>
                    )}
                  </S.Badge>
                </S.BadgeRow>

                {isEditing ? (
                  <S.Textarea
                    value={draft.heroDescription}
                    onChange={(event) => setDraft((prev) => ({ ...prev, heroDescription: event.target.value }))}
                  />
                ) : (
                  <S.HeroDescription>{hotel.heroDescription}</S.HeroDescription>
                )}
              </S.HeroIdentity>
            </S.HeroTop>
          </S.HeroContent>
        </S.Hero>

        <S.GridTwo>
          <S.Card>
            <S.CardHeader>
              <h3>
                <Clock size={18} color="#059669" />
                Condições de trabalho
              </h3>
            </S.CardHeader>

            <S.InfoList>
              {draft.workingConditions.map((item, index) => {
                const Icon = workingConditionIconMap[item.label] ?? Clock;

                return (
                  <S.InfoRow key={`${item.label}-${index}`}>
                    <S.InfoIcon>
                      <Icon size={18} />
                    </S.InfoIcon>
                    <S.InfoText>
                      {isEditing ? (
                        <>
                          <S.Input
                            value={item.label}
                            onChange={(event) => updateWorkingCondition(index, "label", event.target.value)}
                            aria-label={`Rótulo da condição ${index + 1}`}
                          />
                          <S.Input
                            value={item.value}
                            onChange={(event) => updateWorkingCondition(index, "value", event.target.value)}
                            aria-label={`Valor da condição ${index + 1}`}
                          />
                        </>
                      ) : (
                        <>
                          <strong>{item.label}</strong>
                          <p>{item.value}</p>
                        </>
                      )}
                    </S.InfoText>
                  </S.InfoRow>
                );
              })}
            </S.InfoList>
          </S.Card>

          <S.Card>
            <S.CardHeader>
              <h3>
                <Users size={18} color="#059669" />
                Remuneração e benefícios
              </h3>
            </S.CardHeader>

            <S.DailyRate>
              {isEditing ? (
                <S.Input
                  value={draft.dailyRate}
                  onChange={(event) => setDraft((prev) => ({ ...prev, dailyRate: event.target.value }))}
                  aria-label="Valor da diária"
                />
              ) : (
                <>
                  <strong>{draft.dailyRate}</strong>
                  <p>Por diária</p>
                </>
              )}
            </S.DailyRate>

            {isEditing ? (
              <S.Textarea
                value={toLines(draft.compensationBenefits)}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    compensationBenefits: fromLines(event.target.value),
                  }))
                }
              />
            ) : (
              <S.BulletList>
                {draft.compensationBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </S.BulletList>
            )}
          </S.Card>
        </S.GridTwo>

        <S.GridTwo>
          <S.Card>
            <S.CardHeader>
              <h3>
                <Shield size={18} color="#059669" />
                Regras e condutas
              </h3>
            </S.CardHeader>

            {isEditing ? (
              <S.Textarea
                value={toLines(draft.rules)}
                onChange={(event) => setDraft((prev) => ({ ...prev, rules: fromLines(event.target.value) }))}
              />
            ) : (
              <S.BulletList>
                {draft.rules.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </S.BulletList>
            )}
          </S.Card>

          <S.Card>
            <S.CardHeader>
              <h3>
                <Building2 size={18} color="#059669" />
                Requisitos para recreadores
              </h3>
            </S.CardHeader>

            {isEditing ? (
              <S.Textarea
                value={toLines(draft.requirements)}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    requirements: fromLines(event.target.value),
                  }))
                }
              />
            ) : (
              <S.BulletList>
                {draft.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </S.BulletList>
            )}
          </S.Card>
        </S.GridTwo>

        <S.Card>
          <S.CardHeader>
            <h3>
              <Waves size={18} color="#059669" />
              Instalações e facilidades
            </h3>
          </S.CardHeader>

          <S.FacilitiesGrid>
            {hotelariaMeuHotelMock.facilities.map((facility: HotelariaFacility) => {
              const Icon = facilityIconMap[facility.title] ?? Building2;

              return (
                <S.FacilityItem key={facility.title}>
                  <S.InfoIcon>
                    <Icon size={17} />
                  </S.InfoIcon>
                  <div>
                    <strong>{facility.title}</strong>
                    <p>{facility.description}</p>
                  </div>
                </S.FacilityItem>
              );
            })}
          </S.FacilitiesGrid>
        </S.Card>

        <S.Card>
          <S.CardHeader>
            <h3>
              <Gamepad2 size={18} color="#059669" />
              Serviços de recreação
            </h3>
          </S.CardHeader>

          <S.ServicesGrid>
            {hotelariaMeuHotelMock.services.map((service: HotelariaService) => {
              const Icon = serviceIconMap[service.title] ?? Gamepad2;

              return (
                <S.ServiceItem key={service.title}>
                  <S.InfoIcon>
                    <Icon size={17} />
                  </S.InfoIcon>
                  <div>
                    <strong>{service.title}</strong>
                    <p>{service.description}</p>
                    <span>{service.schedule}</span>
                  </div>
                </S.ServiceItem>
              );
            })}
          </S.ServicesGrid>
        </S.Card>

        <S.Card>
          <S.CardHeader>
            <h3>
              <Images size={18} color="#059669" />
              Galeria do hotel
            </h3>
          </S.CardHeader>

          <S.GalleryGrid>
            {hotelariaMeuHotelMock.gallery.map((item) => (
              <S.GalleryItem key={item.id} type="button" aria-label={item.alt}>
                <img src={item.url} alt={item.alt} loading="lazy" />
              </S.GalleryItem>
            ))}
          </S.GalleryGrid>

          <S.CardFooterAction type="button">Ver todas as fotos ({hotelariaMeuHotelMock.gallery.length + 20}+)</S.CardFooterAction>
        </S.Card>

        <S.Card>
          <S.CardHeader>
            <h3>
              <Phone size={18} color="#059669" />
              Informações de contato
            </h3>
          </S.CardHeader>

          <S.ContactGrid>
            {draft.contacts.map((contact, index) => {
              const Icon = contactIconMap[contact.key];

              return (
                <S.ContactItem key={contact.label}>
                  <S.InfoIcon>
                    <Icon size={16} />
                  </S.InfoIcon>
                  <div>
                    <span>{contact.label}</span>
                    {isEditing ? (
                      <S.Input
                        value={contact.value}
                        onChange={(event) => updateContact(index, event.target.value)}
                        aria-label={`Contato ${contact.label}`}
                      />
                    ) : (
                      <strong>{contact.value}</strong>
                    )}
                  </div>
                </S.ContactItem>
              );
            })}
          </S.ContactGrid>

          <S.ActionRow>
            <S.ActionButton $primary type="button">
              <Phone size={14} />
              Fazer reserva
            </S.ActionButton>
            <S.ActionButton type="button">
              <MessageCircle size={14} />
              WhatsApp
            </S.ActionButton>
            <S.ActionButton type="button">
              <MapPin size={14} />
              Ver localização
            </S.ActionButton>
          </S.ActionRow>
        </S.Card>

        <S.Card>
          <S.CardHeader>
            <h3>
              <Star size={18} color="#059669" />
              Avaliações dos hóspedes
            </h3>
          </S.CardHeader>

          <S.ReviewSummary>
            <S.StarRow>{renderStarRow(Math.round(averageRating))}</S.StarRow>
            <S.RatingValue>{averageRating.toFixed(1)}</S.RatingValue>
            <S.TotalReviews>{hotelariaMeuHotelMock.reviews.length + 120}+ avaliações</S.TotalReviews>
          </S.ReviewSummary>

          <S.ReviewList>
            {hotelariaMeuHotelMock.reviews.map((review: HotelariaReviewItem) => (
              <S.ReviewItem key={review.id}>
                <S.Avatar>{buildInitials(review.name)}</S.Avatar>

                <S.ReviewBody>
                  <S.ReviewHead>
                    <div>
                      <h4>{review.name}</h4>
                      <p>{review.stay}</p>
                    </div>
                    <div>
                      <S.StarRow>{renderStarRow(review.rating)}</S.StarRow>
                      <small>{new Date(review.date).toLocaleDateString("pt-BR")}</small>
                    </div>
                  </S.ReviewHead>

                  <S.QuoteText>{review.comment}</S.QuoteText>
                </S.ReviewBody>
              </S.ReviewItem>
            ))}
          </S.ReviewList>

          <S.CardFooterAction type="button">Ver todas as avaliações</S.CardFooterAction>
        </S.Card>
      </S.Container>
    </S.Page>
  );
};
