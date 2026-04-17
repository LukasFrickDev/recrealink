import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button, Badge } from "@/shared/ui";
import type { AudienceKey, PersonalizedCtaItem } from "@/modules/institutional/mocks/home";
import * as S from "./styles";

interface PersonalizedCTASectionProps {
  selectedAudience: AudienceKey | null;
  content: Record<"default" | AudienceKey, PersonalizedCtaItem>;
}

export const PersonalizedCTASection = ({
  selectedAudience,
  content,
}: PersonalizedCTASectionProps) => {
  const data = selectedAudience ? content[selectedAudience] : content.default;
  const tone = selectedAudience ?? "default";

  return (
    <S.Section $tone={tone}>
      <S.Container>
        <S.Content>
          <S.Copy>
            <S.Eyebrow>{data.eyebrow}</S.Eyebrow>
            <Badge tone="warning">{data.badge}</Badge>
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>

            <S.Checklist>
              {data.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </S.Checklist>

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
          </S.Copy>

          <S.Visual>
            <S.VisualImage>
              <img src={data.image} alt={data.imageAlt} loading="lazy" />
            </S.VisualImage>

            <S.Stats>
              {data.stats.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </S.Stats>
          </S.Visual>
        </S.Content>
      </S.Container>
    </S.Section>
  );
};
