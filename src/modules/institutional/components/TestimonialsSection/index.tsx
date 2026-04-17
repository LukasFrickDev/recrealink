import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, Button } from "@/shared/ui";
import * as S from "./styles";

interface TestimonialsSectionProps {
  content: Array<{ name: string; role: string; content: string; result: string; image: string }>;
}

export const TestimonialsSection = ({ content }: TestimonialsSectionProps) => {
  const [index, setIndex] = useState(0);
  const current = content[index];

  const sideItems = useMemo(() => {
    return content.filter((_, itemIndex) => itemIndex !== index).slice(0, 3);
  }, [content, index]);

  const next = () => {
    setIndex((currentIndex) => (currentIndex + 1) % content.length);
  };

  const previous = () => {
    setIndex((currentIndex) => (currentIndex - 1 + content.length) % content.length);
  };

  return (
    <S.Section id="depoimentos">
      <S.Container>
        <S.Header>
          <h2>Resultados reais de quem usa nossas ferramentas</h2>
          <p>
            Histórias de profissionais e operações que ganharam previsibilidade, produtividade e confiança
            com a RecreaLink.
          </p>
        </S.Header>

        <S.Wrapper>
          <S.HighlightCard>
            <S.HighlightTop>
              <S.Person>
                <Avatar name={current.name} imageUrl={current.image} size="lg" />
                <div>
                  <strong>{current.name}</strong>
                  <small>{current.role}</small>
                </div>
              </S.Person>
              <S.ResultBadge>{current.result}</S.ResultBadge>
            </S.HighlightTop>

            <blockquote>{current.content}</blockquote>

            <S.Controls>
              <Button variant="outline" size="sm" onClick={previous} aria-label="Depoimento anterior">
                <ChevronLeft size={16} />
              </Button>
              <S.Dots>
                {content.map((item, itemIndex) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Ir para depoimento de ${item.name}`}
                    aria-current={itemIndex === index}
                    onClick={() => setIndex(itemIndex)}
                  />
                ))}
              </S.Dots>
              <Button variant="outline" size="sm" onClick={next} aria-label="Próximo depoimento">
                <ChevronRight size={16} />
              </Button>
            </S.Controls>
          </S.HighlightCard>

          <S.SideGrid>
            {sideItems.map((item) => (
              <S.SideCard key={item.name}>
                <Avatar name={item.name} imageUrl={item.image} size="md" />
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </div>
              </S.SideCard>
            ))}
          </S.SideGrid>
        </S.Wrapper>
      </S.Container>
    </S.Section>
  );
};
