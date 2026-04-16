import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Grid3X3, List, MapPin, Search, Star } from "lucide-react";
import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { Badge, Card } from "@/shared/ui";
import * as S from "./styles";
import { paisEmpresasMock } from "@/modules/pais/mocks/empresas";

const providerTypeToneMap = {
  Empresa: "brand",
  "Recreador autônomo": "success",
  "Hotel parceiro": "warning",
} as const;

export const PaisEmpresasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("Todas");
  const [serviceFilter, setServiceFilter] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCompanies = useMemo(() => {
    return paisEmpresasMock.companies.filter((company) => {
      const byCity = cityFilter === "Todas" || company.city === cityFilter;
      const byService =
        serviceFilter === "Todos" ||
        company.specialties.some((specialty) => specialty.toLowerCase().includes(serviceFilter.toLowerCase()));
      const bySearch =
        searchTerm.trim().length === 0 ||
        `${company.name} ${company.city} ${company.neighborhood} ${company.description} ${company.specialties.join(" ")}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return byCity && byService && bySearch;
    });
  }, [cityFilter, searchTerm, serviceFilter]);

  return (
    <PaisDashboardShell
      userName={paisEmpresasMock.userName}
      pageTitle={paisEmpresasMock.title}
      pageDescription={paisEmpresasMock.description}
    >
      <S.Wrapper>
        <S.FiltersPanel>
          <S.FiltersHeader>
            <h3>Busca inteligente</h3>
            <p>Filtre por cidade, perfil de serviço e compare rapidamente fornecedores aderentes à sua família.</p>
          </S.FiltersHeader>

          <S.FiltersGrid>
            <S.SearchField>
              <Search size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por empresa, bairro, especialidade ou descrição"
              />
            </S.SearchField>

            <S.FilterChips>
              {paisEmpresasMock.cityFilters.map((city) => (
                <S.FilterChip
                  key={city}
                  type="button"
                  $active={cityFilter === city}
                  onClick={() => setCityFilter(city)}
                >
                  {city}
                </S.FilterChip>
              ))}
            </S.FilterChips>

            <S.FilterChips>
              {paisEmpresasMock.serviceFilters.map((service) => (
                <S.FilterChip
                  key={service}
                  type="button"
                  $active={serviceFilter === service}
                  onClick={() => setServiceFilter(service)}
                >
                  {service}
                </S.FilterChip>
              ))}
            </S.FilterChips>
          </S.FiltersGrid>
        </S.FiltersPanel>

        <S.ContentGrid>
          <S.ResultsColumn>
            <S.ResultsHeader>
              <div>
                <strong>{filteredCompanies.length} opções encontradas</strong>
                <p>Ordenadas por aderência ao perfil da sua família nesta simulação.</p>
              </div>

              <S.ResultsHeaderActions>
                <Badge tone="brand">Comparação ativa</Badge>

                <S.ViewModeToggle>
                  <S.ViewModeButton
                    type="button"
                    $active={viewMode === "grid"}
                    onClick={() => setViewMode("grid")}
                    aria-label="Visualizar em grade"
                  >
                    <Grid3X3 size={14} /> Grade
                  </S.ViewModeButton>

                  <S.ViewModeButton
                    type="button"
                    $active={viewMode === "list"}
                    onClick={() => setViewMode("list")}
                    aria-label="Visualizar em lista"
                  >
                    <List size={14} /> Lista
                  </S.ViewModeButton>
                </S.ViewModeToggle>
              </S.ResultsHeaderActions>
            </S.ResultsHeader>

            {filteredCompanies.length > 0 ? (
              <S.ResultsGrid $viewMode={viewMode}>
                {filteredCompanies.map((company) => (
                  <S.CompanyCard key={company.id} $viewMode={viewMode}>
                    <S.CompanyTop>
                      <div>
                        <h4>{company.name}</h4>
                        <p>
                          <MapPin size={13} /> {company.neighborhood} • {company.city}
                        </p>
                      </div>

                      <S.CompanyBadgeRow>
                        <Badge tone={providerTypeToneMap[company.providerType]}>{company.providerType}</Badge>
                        {company.verified ? <Badge tone="success">Verificado</Badge> : <Badge tone="warning">Em validação</Badge>}
                      </S.CompanyBadgeRow>
                    </S.CompanyTop>

                    <S.CompanyDescription>{company.description}</S.CompanyDescription>

                    <S.RatingLine>
                      <span>
                        <Star size={14} /> {company.rating}
                      </span>
                      <small>{company.reviews} avaliações</small>
                      <strong>{company.priceRange}</strong>
                    </S.RatingLine>

                    <S.TagRow>
                      {company.specialties.map((specialty) => (
                        <Badge key={`${company.id}-${specialty}`} tone="neutral">
                          {specialty}
                        </Badge>
                      ))}
                    </S.TagRow>

                    <S.AvailabilityLine>
                      <span>Próximas janelas:</span>
                      <p>{company.nextSlots.join(" • ")}</p>
                    </S.AvailabilityLine>

                    <S.ActionsRow>
                      <Link to="/app/pais/chat">Mensagens</Link>
                      <Link to="/app/pais/favoritos">Salvar em favoritos</Link>
                      <Link to="/app/pais/avaliacoes">Ver avaliações</Link>
                      <Link to="/app/pais/agenda">Ver agenda</Link>
                    </S.ActionsRow>
                  </S.CompanyCard>
                ))}
              </S.ResultsGrid>
            ) : (
              <Card
                title="Nenhuma empresa encontrada"
                subtitle="Ajuste os filtros para ampliar os resultados da busca"
              >
                <S.EmptyMessage>
                  Tente remover um filtro de cidade ou buscar por uma especialidade diferente.
                </S.EmptyMessage>
              </Card>
            )}
          </S.ResultsColumn>

          <S.SideColumn>
            <Card title="Checklist para decidir" subtitle="Fluxo recomendado para escolher com segurança">
              <S.GuidanceList>
                {paisEmpresasMock.guidanceChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </S.GuidanceList>
            </Card>

            <Card title="Atalhos rápidos" subtitle="Navegação interna da área Pais">
              <S.ShortcutList>
                {paisEmpresasMock.shortcuts.map((shortcut) => (
                  <Link key={shortcut.label} to={shortcut.to}>
                    <Compass size={14} />
                    <div>
                      <strong>{shortcut.label}</strong>
                      <p>{shortcut.helper}</p>
                    </div>
                  </Link>
                ))}
              </S.ShortcutList>
            </Card>
          </S.SideColumn>
        </S.ContentGrid>
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
