import type { AudienceKey, AudienceOption } from "@/modules/institutional/mocks/home";
import * as S from "./styles";

interface AudienceSelectorSectionProps {
  options: AudienceOption[];
  selectedAudience: AudienceKey | null;
  onSelect: (audience: AudienceKey | null) => void;
}

export const AudienceSelectorSection = ({
  options,
  selectedAudience,
  onSelect,
}: AudienceSelectorSectionProps) => {
  const selectedOption = selectedAudience ? options.find((option) => option.id === selectedAudience) : null;

  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <h2>Para quem é a RecreaLink?</h2>
          <p>
            A plataforma conecta diferentes perfis do ecossistema de recreação. Selecione seu contexto
            para ver uma experiência visual e funcional sob medida.
          </p>

          {selectedOption ? (
            <S.SelectedState>
              <span>
                Perfil selecionado: <strong>{selectedOption.title}</strong> · {selectedOption.mood}
              </span>
              <button type="button" onClick={() => onSelect(null)}>
                Limpar seleção
              </button>
            </S.SelectedState>
          ) : null}
        </S.Header>

        <S.Grid>
          {options.map((option) => {
            const isSelected = selectedAudience === option.id;

            return (
              <S.Card
                key={option.id}
                $selected={isSelected}
                $tone={option.id}
                onClick={() => onSelect(isSelected ? null : option.id)}
              >
                <S.CardImage>
                  <img src={option.image} alt={`Imagem representando o perfil ${option.title}`} loading="lazy" />
                </S.CardImage>

                <S.CardBody>
                  <S.IconBubble>{option.icon}</S.IconBubble>
                  <h3>{option.title}</h3>
                  <strong>{option.mood}</strong>
                  <p>{option.description}</p>
                </S.CardBody>
              </S.Card>
            );
          })}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};
