import { Badge, Card } from "@/shared/ui";
import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { paisMapaMock } from "@/modules/pais/mocks/mapa";
import * as S from "./styles";

const hotspotToneLabelMap = {
  empresa: "Empresa",
  recreador: "Recreador",
  hotel: "Hotel",
} as const;

export const PaisMapaPage = () => {
  return (
    <PaisDashboardShell
      userName={paisMapaMock.userName}
      pageTitle={paisMapaMock.title}
      pageDescription={paisMapaMock.description}
      stats={paisMapaMock.stats}
    >
      <S.Wrapper>
        <S.ContentGrid>
          <S.MapPanel>
            <S.MapHeader>
              <h3>Cobertura por região</h3>
              <p>Use os pontos ativos para comparar oferta regional e priorizar sua shortlist.</p>
            </S.MapHeader>

            <S.MapCanvas>
              {paisMapaMock.mapHotspots.map((spot) => (
                <S.MapSpot key={spot.id} $left={spot.left} $top={spot.top} $tone={spot.tone}>
                  <strong>{spot.providers}</strong>
                  <span>{spot.label}</span>
                </S.MapSpot>
              ))}
            </S.MapCanvas>

            <S.LegendRow>
              {paisMapaMock.mapLegend.map((item) => (
                <S.LegendItem key={item.label}>
                  <i style={{ background: item.color }} />
                  <span>{item.label}</span>
                </S.LegendItem>
              ))}
            </S.LegendRow>

            <S.RegionGrid>
              {paisMapaMock.mapRegions.map((region) => (
                <S.RegionCard key={region.name}>
                  <strong>{region.name}</strong>
                  <span>{region.companies} fornecedores ativos</span>
                  <Badge tone={region.tone}>Média {region.averageRating}</Badge>
                </S.RegionCard>
              ))}
            </S.RegionGrid>
          </S.MapPanel>

          <S.SideColumn>
            <Card title="Fornecedores mais próximos" subtitle="Opções com deslocamento reduzido">
              <S.NearbyList>
                {paisMapaMock.nearbyCompanies.map((company) => (
                  <S.NearbyItem key={company.id}>
                    <h4>{company.name}</h4>
                    <p>{company.location}</p>
                    <S.MetaLine>
                      <span>{company.distance}</span>
                      <span>{company.availability}</span>
                    </S.MetaLine>
                    <S.MetaLine>
                      <span>{hotspotToneLabelMap[company.providerType]}</span>
                    </S.MetaLine>
                    <S.MetaLine>
                      {company.specialties.map((specialty) => (
                        <Badge key={`${company.id}-${specialty}`} tone="neutral">
                          {specialty}
                        </Badge>
                      ))}
                    </S.MetaLine>
                  </S.NearbyItem>
                ))}
              </S.NearbyList>
            </Card>

            <Card title="Como usar este mapa" subtitle="Boas práticas para decidir melhor">
              <S.HintList>
                {paisMapaMock.routeHints.map((hint) => (
                  <li key={hint}>{hint}</li>
                ))}
              </S.HintList>
            </Card>
          </S.SideColumn>
        </S.ContentGrid>
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
