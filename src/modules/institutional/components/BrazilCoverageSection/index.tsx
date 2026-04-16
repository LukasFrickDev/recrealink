import { Badge } from "@/shared/ui";
import * as S from "./styles";

interface BrazilCoverageSectionProps {
  content: Array<{ city: string; vagas: number }>;
}

export const BrazilCoverageSection = ({ content }: BrazilCoverageSectionProps) => {
  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <h2>Oportunidades em todo Brasil</h2>
          <p>Descubra vagas disponiveis em resorts e hoteis nas melhores regioes turisticas.</p>
        </S.Header>

        <S.MapCard>
          {content.map((item) => (
            <S.CityCard key={item.city}>
              <strong>{item.city}</strong>
              <Badge tone="brand">{item.vagas} vagas</Badge>
            </S.CityCard>
          ))}
        </S.MapCard>
      </S.Container>
    </S.Section>
  );
};
