import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar, MapPin, Phone, Search, Star } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setHotelCategoryFilter,
  setHotelStateFilter,
  setHotelTab,
  setLastVisualAction,
  setTopbarSearch,
} from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorHoteisMock, type HoteisTabId } from "@/modules/recreador/mocks/hoteis";
import * as S from "./styles";

export const RecreadorHoteisPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { hotelCategoryFilter, hotelStateFilter, hotelTab, lastVisualAction, topbarSearch } =
    useAppSelector((state) => state.recreador.ui);

  const [selectedVagaId, setSelectedVagaId] = useState<string | null>(null);
  const [appliedVagas, setAppliedVagas] = useState<string[]>([]);
  const [conviteStatus, setConviteStatus] = useState<
    Record<string, "pendente" | "aceito" | "recusado">
  >({});

  useEffect(() => {
    const aba = searchParams.get("aba");

    if (aba === "atuados" || aba === "vagas" || aba === "convites") {
      if (hotelTab !== aba) {
        dispatch(setHotelTab(aba));
      }
    }
  }, [dispatch, hotelTab, searchParams]);

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const normalizedSearch = normalizeText(topbarSearch.trim());

  const matchesSearch = (input: string) => {
    if (!normalizedSearch) {
      return true;
    }

    return normalizeText(input).includes(normalizedSearch);
  };

  const filteredHoteisAtuados = useMemo(() => {
    return recreadorHoteisMock.hoteisAtuados.filter((hotel) => {
      if (hotelStateFilter !== "todos" && !normalizeText(hotel.cidade).includes(hotelStateFilter)) {
        return false;
      }

      if (hotelCategoryFilter !== "todas" && !normalizeText(hotel.categoria).includes(hotelCategoryFilter)) {
        return false;
      }

      return matchesSearch(`${hotel.nome} ${hotel.cidade} ${hotel.categoria}`);
    });
  }, [hotelCategoryFilter, hotelStateFilter, normalizedSearch]);

  const filteredVagas = useMemo(() => {
    return recreadorHoteisMock.vagasAbertas.filter((vaga) => {
      if (hotelStateFilter !== "todos" && !normalizeText(vaga.cidade).includes(hotelStateFilter)) {
        return false;
      }

      if (hotelCategoryFilter !== "todas" && !normalizeText(vaga.categoria).includes(hotelCategoryFilter)) {
        return false;
      }

      return matchesSearch(`${vaga.hotel} ${vaga.cidade} ${vaga.categoria} ${vaga.tags.join(" ")}`);
    });
  }, [hotelCategoryFilter, hotelStateFilter, normalizedSearch]);

  const filteredConvites = useMemo(() => {
    return recreadorHoteisMock.convitesRecebidos.filter((convite) => {
      if (hotelStateFilter !== "todos" && !normalizeText(convite.cidade).includes(hotelStateFilter)) {
        return false;
      }

      return matchesSearch(`${convite.hotel} ${convite.cidade} ${convite.observacoes}`);
    });
  }, [hotelStateFilter, normalizedSearch]);

  const handleTabChange = (tab: HoteisTabId) => {
    dispatch(setHotelTab(tab));

    if (tab === "atuados") {
      setSearchParams({}, { replace: true });
      return;
    }

    setSearchParams({ aba: tab }, { replace: true });
  };

  const handleApply = (vagaId: string) => {
    setAppliedVagas((previous) => (previous.includes(vagaId) ? previous : [...previous, vagaId]));
    dispatch(setLastVisualAction("Candidatura simulada enviada com sucesso."));
  };

  const handleConvite = (conviteId: string, status: "aceito" | "recusado") => {
    setConviteStatus((previous) => ({
      ...previous,
      [conviteId]: status,
    }));

    dispatch(
      setLastVisualAction(
        status === "aceito"
          ? "Convite marcado como aceito na camada visual."
          : "Convite marcado como recusado na camada visual.",
      ),
    );
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorHoteisMock.title}
      pageDescription={recreadorHoteisMock.description}
      stats={recreadorHoteisMock.stats}
    >
      <S.Wrapper>
        <S.HeaderCard>
          <S.HeaderTop>
            <S.TitleWrap>
              <h2>Perfis de hotéis</h2>
              <p>
                Gerencie parceiros onde já atuou, acompanhe oportunidades abertas e responda
                convites diretos com prioridade visual.
              </p>
            </S.TitleWrap>
          </S.HeaderTop>
        </S.HeaderCard>

        <S.FilterCard>
          <S.FiltersGrid>
            <S.SearchField>
              <Search size={16} />
              <input
                type="text"
                value={topbarSearch}
                onChange={(event) => dispatch(setTopbarSearch(event.target.value))}
                placeholder="Buscar hotéis, cidades ou categorias..."
              />
            </S.SearchField>
            <S.SelectField
              value={hotelStateFilter}
              onChange={(event) => dispatch(setHotelStateFilter(event.target.value as "todos" | "sp" | "rj" | "sc"))}
            >
              <option value="todos">Todos os estados</option>
              <option value="sp">São Paulo</option>
              <option value="rj">Rio de Janeiro</option>
              <option value="sc">Santa Catarina</option>
            </S.SelectField>
            <S.SelectField
              value={hotelCategoryFilter}
              onChange={(event) =>
                dispatch(
                  setHotelCategoryFilter(
                    event.target.value as "todas" | "resort" | "hotel" | "pousada",
                  ),
                )
              }
            >
              <option value="todas">Todas as categorias</option>
              <option value="resort">Resort</option>
              <option value="hotel">Hotel</option>
              <option value="pousada">Pousada</option>
            </S.SelectField>
          </S.FiltersGrid>
        </S.FilterCard>

        {lastVisualAction ? (
          <S.FeedbackBanner>
            <span>{lastVisualAction}</span>
            <S.ActionButton
              type="button"
              $variant="outline"
              onClick={() => dispatch(setLastVisualAction(null))}
            >
              Fechar
            </S.ActionButton>
          </S.FeedbackBanner>
        ) : null}

        <S.TabsCard>
          <S.TabsList>
            {recreadorHoteisMock.tabs.map((tab) => (
              <S.TabButton
                key={tab.id}
                type="button"
                $active={hotelTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </S.TabButton>
            ))}
          </S.TabsList>

          <S.TabPanel>
            {hotelTab === "atuados" ? (
              <S.HistoryGrid>
                {filteredHoteisAtuados.map((hotel) => (
                  <S.HistoryCard key={hotel.id}>
                    <S.HistoryBody>
                      <S.HotelImage $image={hotel.imagem} />

                      <S.HistoryMain>
                        <div>
                          <S.HotelName>{hotel.nome}</S.HotelName>
                          <S.MetaLine>
                            <MapPin size={12} />
                            {hotel.cidade} · {hotel.categoria}
                          </S.MetaLine>
                        </div>

                        <S.BadgeRow>
                          <S.TextBadge $tone="blue">
                            <Star size={11} /> Hotel {hotel.avaliacaoHotel.toFixed(1)}
                          </S.TextBadge>
                          <S.TextBadge $tone="green">
                            Avaliacao {hotel.avaliacaoRecreador.toFixed(1)}
                          </S.TextBadge>
                          <S.TextBadge $tone={hotel.status === "ativo" ? "green" : "neutral"}>
                            {hotel.status === "ativo" ? "Ativo" : "Inativo"}
                          </S.TextBadge>
                        </S.BadgeRow>

                        <S.BadgeRow>
                          {hotel.estrutura.slice(0, 4).map((tag) => (
                            <S.TextBadge key={tag} $tone="neutral">
                              {tag}
                            </S.TextBadge>
                          ))}
                        </S.BadgeRow>

                        <S.InfoGrid>
                          <S.InfoBox>
                            <strong>{hotel.contatoNome}</strong>
                            <span>{hotel.contatoCargo}</span>
                          </S.InfoBox>
                          <S.InfoBox>
                            <strong>{hotel.ultimoTrabalho}</strong>
                            <span>Último trabalho concluído</span>
                          </S.InfoBox>
                        </S.InfoGrid>
                      </S.HistoryMain>

                      <S.HistorySide>
                        <S.SideMetric>
                          <strong>{hotel.totalTrabalhos}</strong>
                          <span>Trabalhos realizados</span>
                        </S.SideMetric>
                        <S.ActionButton
                          type="button"
                          onClick={() => navigate("/app/recreador/ferramentas/perfil-basico")}
                        >
                          Ver perfil completo
                        </S.ActionButton>
                        <S.ActionButton
                          type="button"
                          $variant="outline"
                          onClick={() => navigate("/app/recreador/ferramentas/suporte")}
                        >
                          <Phone size={13} /> Contato
                        </S.ActionButton>
                      </S.HistorySide>
                    </S.HistoryBody>
                  </S.HistoryCard>
                ))}

                {filteredHoteisAtuados.length === 0 ? (
                  <S.EmptyCard>
                    Nenhum hotel encontrado com os filtros atuais. Ajuste os campos para ampliar os resultados.
                  </S.EmptyCard>
                ) : null}
              </S.HistoryGrid>
            ) : null}

            {hotelTab === "vagas" ? (
              <S.VagasGrid>
                {filteredVagas.map((vaga) => (
                  <S.VagaCard key={vaga.id} $highlighted={selectedVagaId === vaga.id}>
                    <S.VagaImage $image={vaga.imagem} />
                    <S.VagaBody>
                      <S.VagaHead>
                        <div>
                          <S.VagaTitle>{vaga.hotel}</S.VagaTitle>
                          <S.MetaLine>
                            <MapPin size={12} />
                            {vaga.cidade} · {vaga.categoria}
                          </S.MetaLine>
                        </div>
                        <S.TextBadge $tone={vaga.urgencia === "urgente" ? "orange" : "blue"}>
                          {vaga.urgencia === "urgente" ? "Urgente" : "Normal"}
                        </S.TextBadge>
                      </S.VagaHead>

                      <S.BadgeRow>
                        <S.TextBadge $tone="neutral">{vaga.vagas} vaga(s)</S.TextBadge>
                        {vaga.tags.map((tag) => (
                          <S.TextBadge key={tag} $tone="blue">
                            {tag}
                          </S.TextBadge>
                        ))}
                      </S.BadgeRow>

                      <S.MetaLine>
                        <Calendar size={12} />
                        {vaga.periodo}
                      </S.MetaLine>

                      <S.VagaHead>
                        <S.VagaValue>{vaga.valorDiaria}</S.VagaValue>
                        <S.VagaActions>
                          <S.ActionButton
                            type="button"
                            $variant="outline"
                            onClick={() => {
                              setSelectedVagaId(vaga.id);
                              dispatch(setLastVisualAction("Detalhes da vaga destacados no card selecionado."));
                            }}
                          >
                            Ver detalhes
                          </S.ActionButton>
                          <S.ActionButton type="button" onClick={() => handleApply(vaga.id)}>
                            Candidatar-se <ArrowRight size={13} />
                          </S.ActionButton>
                        </S.VagaActions>
                      </S.VagaHead>

                      {appliedVagas.includes(vaga.id) ? (
                        <S.TextBadge $tone="green">Candidatura enviada (simulação)</S.TextBadge>
                      ) : null}
                    </S.VagaBody>
                  </S.VagaCard>
                ))}

                {filteredVagas.length === 0 ? (
                  <S.EmptyCard>
                    Nenhuma vaga encontrada com os filtros atuais. Tente alterar estado, categoria ou busca.
                  </S.EmptyCard>
                ) : null}
              </S.VagasGrid>
            ) : null}

            {hotelTab === "convites" ? (
              <S.ConviteList>
                {filteredConvites.map((convite) => (
                  <S.ConviteCard key={convite.id}>
                    <S.ConviteTop>
                      <div>
                        <strong>{convite.hotel}</strong>
                        <span>{convite.cidade}</span>
                      </div>
                      <S.TextBadge $tone="orange">Responder em {convite.prazoResposta}</S.TextBadge>
                    </S.ConviteTop>

                    <S.ConviteGrid>
                      <S.ConviteInfo>
                        <span>Data do evento</span>
                        <strong>{convite.dataEvento}</strong>
                      </S.ConviteInfo>
                      <S.ConviteInfo>
                        <span>Valor proposto</span>
                        <strong>{convite.valorProposto}</strong>
                      </S.ConviteInfo>
                      <S.ConviteInfo>
                        <span>Recebido em</span>
                        <strong>{convite.dataConvite}</strong>
                      </S.ConviteInfo>
                    </S.ConviteGrid>

                    <S.ConviteNote>{convite.observacoes}</S.ConviteNote>

                    {conviteStatus[convite.id] === "aceito" ? (
                      <S.TextBadge $tone="green">Convite aceito na camada visual</S.TextBadge>
                    ) : null}

                    {conviteStatus[convite.id] === "recusado" ? (
                      <S.TextBadge $tone="neutral">Convite recusado na camada visual</S.TextBadge>
                    ) : null}

                    <S.ConviteActions>
                      <S.ResponseButton
                        type="button"
                        $tone="accept"
                        disabled={conviteStatus[convite.id] === "recusado"}
                        onClick={() => handleConvite(convite.id, "aceito")}
                      >
                        Aceitar convite
                      </S.ResponseButton>
                      <S.ResponseButton
                        type="button"
                        $tone="reject"
                        disabled={conviteStatus[convite.id] === "aceito"}
                        onClick={() => handleConvite(convite.id, "recusado")}
                      >
                        Recusar
                      </S.ResponseButton>
                      <S.ResponseButton
                        type="button"
                        $tone="neutral"
                        onClick={() => navigate("/app/recreador/ferramentas/suporte")}
                      >
                        Ver detalhes
                      </S.ResponseButton>
                    </S.ConviteActions>
                  </S.ConviteCard>
                ))}

                {filteredConvites.length === 0 ? (
                  <S.EmptyCard>
                    Nenhum convite encontrado. Assim que novos convites chegarem, eles aparecerão aqui.
                  </S.EmptyCard>
                ) : null}
              </S.ConviteList>
            ) : null}
          </S.TabPanel>
        </S.TabsCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
