import type { AudienceKey } from "@/modules/institutional/mocks/home";
import * as S from "./styles";

interface AudienceSelectorSectionProps {
  options: Array<{ id: AudienceKey; title: string; description: string; icon: string }>;
  selectedAudience: AudienceKey | null;
  onSelect: (audience: AudienceKey | null) => void;
}

export const AudienceSelectorSection = ({
  options,
  selectedAudience,
  onSelect,
}: AudienceSelectorSectionProps) => {
  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <h2>Para quem é a RecreaLink?</h2>
          <p>
            Nossa plataforma conecta diferentes públicos no universo da recreação. Escolha seu perfil e
            descubra como podemos ajudar.
          </p>
        </S.Header>

        <S.Grid>
          {options.map((option) => {
            const isSelected = selectedAudience === option.id;

            return (
              <S.Card
                key={option.id}
                $selected={isSelected}
                onClick={() => onSelect(isSelected ? null : option.id)}
              >
                <span>{option.icon}</span>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </S.Card>
            );
          })}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};
