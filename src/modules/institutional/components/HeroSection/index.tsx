import { ArrowRight, BellRing, CalendarClock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Badge } from "@/shared/ui";
import * as S from "./styles";

interface HeroSectionProps {
  content: {
    highlightedTitle: string;
    subtitle: string;
    spotlightTitle: string;
    spotlightDescription: string;
    spotlightImage: string;
    stats: Array<{ label: string }>;
    cards: Array<{
      role: string;
      company: string;
      type: string;
      date: string;
      context: string;
    }>;
    alertLabel: string;
    alertDescription: string;
  };
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <S.Section id="inicio">
      <S.Container>
        <S.Left>
          <S.Kicker>
            <Sparkles size={16} /> Plataforma institucional de recreação
          </S.Kicker>

          <S.Title>
            A plataforma que <span>{content.highlightedTitle}</span>
          </S.Title>
          <p>{content.subtitle}</p>

          <S.StatPills>
            {content.stats.map((item) => (
              <Badge key={item.label} tone="brand">
                {item.label}
              </Badge>
            ))}
          </S.StatPills>

          <S.Actions>
            <Link to="/acesso/entrar">
              <Button size="lg">
                Explorar a Plataforma <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/acesso/escolher-perfil">
              <Button variant="outline" size="lg">
                Conhecer os Benefícios
              </Button>
            </Link>
          </S.Actions>
        </S.Left>

        <S.Right>
          <S.Spotlight>
            <img src={content.spotlightImage} alt="Profissionais em atividade recreativa" loading="lazy" />
            <S.SpotlightOverlay>
              <strong>{content.spotlightTitle}</strong>
              <p>{content.spotlightDescription}</p>
            </S.SpotlightOverlay>
          </S.Spotlight>

          <S.RightPanel>
            <S.RightHeader>
              <strong>Vagas em destaque</strong>
              <Badge tone="success">3 novas hoje</Badge>
            </S.RightHeader>

            {content.cards.map((card) => (
              <S.JobCard key={card.role}>
                <div>
                  <h4>{card.role}</h4>
                  <p>{card.company}</p>
                </div>
                <S.JobMeta>
                  <Badge tone="warning">{card.type}</Badge>
                  <span>
                    <CalendarClock size={14} /> {card.date}
                  </span>
                </S.JobMeta>
                <small>{card.context}</small>
              </S.JobCard>
            ))}

            <S.Alert>
              <div>
                <BellRing size={16} />
                <span>{content.alertLabel}</span>
              </div>
              <small>{content.alertDescription}</small>
            </S.Alert>
          </S.RightPanel>
        </S.Right>
      </S.Container>
    </S.Section>
  );
};
