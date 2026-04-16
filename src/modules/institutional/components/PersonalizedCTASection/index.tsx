import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button, Badge } from "@/shared/ui";
import type { AudienceKey } from "@/modules/institutional/mocks/home";
import * as S from "./styles";

interface PersonalizedCTASectionProps {
  selectedAudience: AudienceKey | null;
  content: {
    default: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
      badge: string;
      stats: Array<{ value: string; label: string }>;
    };
    recreador: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
      badge: string;
      stats: Array<{ value: string; label: string }>;
    };
    hotelaria: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
      badge: string;
      stats: Array<{ value: string; label: string }>;
    };
    eventos: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
      badge: string;
      stats: Array<{ value: string; label: string }>;
    };
    pais: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
      badge: string;
      stats: Array<{ value: string; label: string }>;
    };
  };
}

export const PersonalizedCTASection = ({
  selectedAudience,
  content,
}: PersonalizedCTASectionProps) => {
  const data = selectedAudience ? content[selectedAudience] : content.default;

  return (
    <S.Section>
      <S.Container>
        <S.Content>
          <div>
            <Badge tone="warning">{data.badge}</Badge>
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>

            <S.Actions>
              <Link to="/acesso/cadastro">
                <Button size="lg">
                  {data.primary} <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/acesso/entrar">
                <Button variant="outline" size="lg">
                  {data.secondary}
                </Button>
              </Link>
            </S.Actions>
          </div>

          <S.Stats>
            {data.stats.map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </S.Stats>
        </S.Content>
      </S.Container>
    </S.Section>
  );
};
