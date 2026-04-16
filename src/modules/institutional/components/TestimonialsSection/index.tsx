import * as S from "./styles";

interface TestimonialsSectionProps {
  content: Array<{ name: string; role: string; content: string }>;
}

export const TestimonialsSection = ({ content }: TestimonialsSectionProps) => {
  return (
    <S.Section id="depoimentos">
      <S.Container>
        <S.Header>
          <h2>Resultados reais de quem usa nossas ferramentas</h2>
          <p>
            Profissionais aumentaram produtividade, organizaram rotinas e expandiram carreiras com a
            RecreaLink.
          </p>
        </S.Header>

        <S.Grid>
          {content.map((item) => (
            <S.Card key={item.name}>
              <strong>{item.name}</strong>
              <small>{item.role}</small>
              <p>{item.content}</p>
            </S.Card>
          ))}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};
