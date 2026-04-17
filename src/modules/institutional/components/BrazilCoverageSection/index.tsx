import { Badge } from "@/shared/ui";
import * as S from "./styles";

interface BrazilCoverageSectionProps {
  content: Array<{ city: string; vagas: number; segment: string; x: number; y: number }>;
}

export const BrazilCoverageSection = ({ content }: BrazilCoverageSectionProps) => {
  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <h2>Oportunidades em todo Brasil</h2>
          <p>
            Descubra vagas em resorts, hotéis e operações de eventos com cobertura nacional e contexto
            real de atuação.
          </p>
        </S.Header>

        <S.Layout>
          <S.MapCard>
            <S.MapTitle>
              <strong>Mapa de cobertura ativa</strong>
              <span>Regiões com demanda em crescimento</span>
            </S.MapTitle>

            <S.MapSurface>
              {content.map((item) => (
                <S.Pin key={item.city} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                  <i />
                  <small>{item.city}</small>
                </S.Pin>
              ))}
            </S.MapSurface>
          </S.MapCard>

          <S.CityList>
            {content.map((item) => (
              <S.CityCard key={item.city}>
                <div>
                  <strong>{item.city}</strong>
                  <small>{item.segment}</small>
                </div>
                <Badge tone="brand">{item.vagas} vagas</Badge>
              </S.CityCard>
            ))}
          </S.CityList>
        </S.Layout>
      </S.Container>
    </S.Section>
  );
};
