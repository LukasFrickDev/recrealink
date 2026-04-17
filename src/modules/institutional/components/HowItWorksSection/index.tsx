import * as S from "./styles";

interface HowItWorksSectionProps {
  steps: Array<{ step: string; title: string; description: string; icon: string }>;
}

export const HowItWorksSection = ({ steps }: HowItWorksSectionProps) => {
  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <h2>Como a RecreaLink funciona na prática</h2>
          <p>
            Em quatro etapas, você entra no fluxo certo para contratar, executar e crescer com mais
            previsibilidade.
          </p>
        </S.Header>

        <S.Grid>
          {steps.map((item, index) => (
            <S.Step key={item.step}>
              <S.StepTop>
                <span>{item.step}</span>
                <small>{item.icon}</small>
              </S.StepTop>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {index < steps.length - 1 ? <S.StepConnector aria-hidden="true" /> : null}
            </S.Step>
          ))}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};
