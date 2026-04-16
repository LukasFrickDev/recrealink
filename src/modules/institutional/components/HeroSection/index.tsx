import { CalendarClock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Badge } from "@/shared/ui";
import * as S from "./styles";

interface HeroSectionProps {
  content: {
    highlightedTitle: string;
    subtitle: string;
    stats: Array<{ label: string }>;
    cards: Array<{
      role: string;
      company: string;
      type: string;
      date: string;
    }>;
  };
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <S.Section id="inicio">
      <S.Container>
        <S.Left>
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
              <Button size="lg">Explorar a Plataforma</Button>
            </Link>
            <Link to="/acesso/escolher-perfil">
              <Button variant="outline" size="lg">
                Conhecer os Beneficios
              </Button>
            </Link>
          </S.Actions>
        </S.Left>

        <S.Right>
          <S.RightHeader>
            <strong>Vagas em Destaque</strong>
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
            </S.JobCard>
          ))}

          <S.Alert>
            <div>
              <Star size={16} />
              <span>Alertas de vagas de recreação</span>
            </div>
            <small>Receba oportunidades exclusivas</small>
          </S.Alert>
        </S.Right>
      </S.Container>
    </S.Section>
  );
};
