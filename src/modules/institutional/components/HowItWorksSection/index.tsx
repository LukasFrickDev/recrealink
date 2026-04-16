import * as S from "./styles";

interface HowItWorksSectionProps {
  steps: Array<{ step: string; title: string; description: string }>;
}

export const HowItWorksSection = ({ steps }: HowItWorksSectionProps) => {
  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <h2>Como a RecreaLink funciona na pratica</h2>
          <p>Em 4 passos simples você se conecta ao ecossistema de recreação.</p>
        </S.Header>

        <S.Grid>
          {steps.map((item) => (
            <S.Step key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </S.Step>
          ))}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};
