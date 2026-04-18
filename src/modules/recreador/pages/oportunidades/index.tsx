import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  CalendarDays,
  Clock3,
  Handshake,
  MapPin,
  Search,
  Send,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  applyToOpportunity,
  selectRecreadorFlowApplications,
  selectRecreadorFlowOpportunities,
  selectRecreadorFlowState,
  type CoreApplicationStage,
  validateApplyToOpportunity,
} from "@/app/store/slices/recreadorFlowSlice";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { useToast } from "@/shared/ui/Toast";
import {
  recreadorOportunidadesMock,
  type OpportunityCityFilter,
  type OpportunityDateFilter,
  type OpportunityInviteStatus,
  type OpportunityLifecycleStatus,
  type OpportunityOriginKind,
  type OpportunityTypeFilter,
  type RecreadorOpportunityItem,
} from "@/modules/recreador/mocks/oportunidades";
import * as S from "./styles";

type DecisionHintTone = "neutral" | "info" | "warning" | "success";

type ApplyConflictDraft = {
  opportunityId: string;
  opportunityCode: string;
  roleLabel: string;
  originName: string;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const lifecycleLabel: Record<OpportunityLifecycleStatus, string> = {
  aberta: "Oportunidade aberta",
  encerrada: "Oportunidade encerrada",
  confirmada: "Confirmada",
};

const inviteLabel: Record<OpportunityInviteStatus, string> = {
  nenhum: "Sem convite",
  "convite-recebido": "Convite recebido",
  "convite-aceito": "Convite aceito",
  "convite-recusado": "Convite recusado",
};

const originLabel: Record<OpportunityOriginKind, string> = {
  hotelaria: "Hotelaria",
  eventos: "Eventos",
};

const originVisualMap = {
  hotelaria: {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    label: "Operacao em hotelaria",
  },
  eventos: {
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    label: "Operacao em eventos",
  },
} as const;

const typeLabelMap: Record<Exclude<OpportunityTypeFilter, "todos">, string> = {
  resort: "Resort",
  hotel: "Hotel",
  "evento-corporativo": "Evento corporativo",
  "evento-social": "Evento social",
};

const getDecisionHint = (
  item: RecreadorOpportunityItem,
  applicationStage: CoreApplicationStage | undefined,
) => {
  if (item.lifecycleStatus === "confirmada") {
    return {
      tone: "success" as DecisionHintTone,
      label: "Compromisso confirmado. Revise sua agenda em Disponibilidade.",
    };
  }

  if (item.inviteStatus === "convite-recebido") {
    return {
      tone: "warning" as DecisionHintTone,
      label: "Convite recebido. A decisao de aceite ou recusa fica em Convites.",
    };
  }

  if (applicationStage === "em-analise") {
    return {
      tone: "info" as DecisionHintTone,
      label: "Candidatura em andamento. Acompanhe em Convites > Aguardando.",
    };
  }

  if (item.applicationStatus === "candidatura-enviada") {
    return {
      tone: "info" as DecisionHintTone,
      label: "Candidatura enviada. Acompanhe retorno em Convites > Aguardando.",
    };
  }

  if (item.lifecycleStatus === "encerrada") {
    return {
      tone: "neutral" as DecisionHintTone,
      label: "Vaga encerrada para novas candidaturas.",
    };
  }

  return {
    tone: "neutral" as DecisionHintTone,
    label: "Vaga aberta para candidatura imediata.",
  };
};

export const RecreadorOportunidadesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, info, warning, danger } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const flowState = useAppSelector(selectRecreadorFlowState);
  const items = useAppSelector(selectRecreadorFlowOpportunities);
  const applications = useAppSelector(selectRecreadorFlowApplications);

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState<OpportunityCityFilter>("todos");
  const [typeFilter, setTypeFilter] = useState<OpportunityTypeFilter>("todos");
  const [dateFilter, setDateFilter] = useState<OpportunityDateFilter>("todos");
  const [originFilter, setOriginFilter] = useState<"todos" | OpportunityOriginKind>("todos");
  const [applyConflictDraft, setApplyConflictDraft] = useState<ApplyConflictDraft | null>(null);

  const applicationStageByOpportunityId = useMemo(
    () => new Map(applications.map((item) => [item.opportunityId, item.stage])),
    [applications],
  );

  const highlightedOpportunityCode = useMemo(() => {
    const rawCode = searchParams.get("codigo")?.trim() ?? "";
    return rawCode ? rawCode.toUpperCase() : "";
  }, [searchParams]);

  const highlightedGlobalTerm = useMemo(
    () => searchParams.get("termo")?.trim() ?? "",
    [searchParams],
  );

  const contextOpportunity = useMemo(
    () => items.find((item) => item.code === highlightedOpportunityCode) ?? null,
    [highlightedOpportunityCode, items],
  );

  useEffect(() => {
    if (!highlightedOpportunityCode) {
      return;
    }

    setSearchTerm((previous) => (previous.trim().length > 0 ? previous : highlightedOpportunityCode));
  }, [highlightedOpportunityCode]);

  useEffect(() => {
    if (!highlightedGlobalTerm || highlightedOpportunityCode) {
      return;
    }

    setSearchTerm((previous) => (previous.trim().length > 0 ? previous : highlightedGlobalTerm));
  }, [highlightedGlobalTerm, highlightedOpportunityCode]);

  const dashboardStats = useMemo(() => {
    const abertas = items.filter((item) => item.lifecycleStatus === "aberta").length;
    const candidaturas = items.filter((item) => item.applicationStatus === "candidatura-enviada").length;
    const convites = items.filter((item) => item.inviteStatus !== "nenhum").length;
    const confirmadas = items.filter((item) => item.lifecycleStatus === "confirmada").length;

    return [
      { title: "Abertas agora", value: String(abertas), helper: "Disponiveis para candidatura" },
      { title: "Candidaturas", value: String(candidaturas), helper: "Ja enviadas" },
      { title: "Com convite", value: String(convites), helper: "Gerenciar em Convites" },
      { title: "Confirmadas", value: String(confirmadas), helper: "Compromissos futuros" },
    ];
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = normalize(searchTerm.trim());

    return items.filter((item) => {
      if (cityFilter !== "todos" && item.cityCode !== cityFilter) {
        return false;
      }

      if (typeFilter !== "todos" && item.type !== typeFilter) {
        return false;
      }

      if (dateFilter !== "todos" && item.dateWindow !== dateFilter) {
        return false;
      }

      if (originFilter !== "todos" && item.originKind !== originFilter) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = [
        item.code,
        item.roleLabel,
        item.originName,
        item.originSummary,
        item.cityLabel,
      ].join(" ");

      return normalize(searchableText).includes(normalizedSearch);
    });
  }, [cityFilter, dateFilter, items, originFilter, searchTerm, typeFilter]);

  const performApply = (opportunity: RecreadorOpportunityItem, withConflictWarning: boolean) => {
    dispatch(applyToOpportunity({ opportunityId: opportunity.id }));
    dispatch(setLastVisualAction(`Candidatura enviada para ${opportunity.code}.`));

    if (withConflictWarning) {
      warning({
        title: "Candidatura enviada com conflito",
        description:
          "Voce manteve a candidatura mesmo com conflito de compromisso confirmado ou bloqueio manual no periodo.",
      });
      return;
    }

    success({
      title: "Candidatura enviada",
      description: `${opportunity.code} movida para Convites > Aguardando.`,
    });
  };

  const handleApplyRequest = (opportunityId: string) => {
    const validation = validateApplyToOpportunity(flowState, opportunityId);

    if (validation.status === "not-found") {
      danger({
        title: "Oportunidade indisponivel",
        description: "Nao foi possivel localizar a oportunidade selecionada nesta lista.",
      });
      return;
    }

    if (validation.status === "blocked") {
      warning({
        title: "Candidatura bloqueada",
        description: "Esta oportunidade nao aceita nova candidatura porque nao esta aberta.",
      });
      return;
    }

    if (validation.status === "already-applied") {
      info({
        title: "Candidatura ja enviada",
        description: "Este item ja recebeu sua candidatura e segue em acompanhamento.",
      });
      return;
    }

    if (validation.commitmentConflictDetected) {
      setApplyConflictDraft({
        opportunityId: validation.opportunity.id,
        opportunityCode: validation.opportunity.code,
        roleLabel: validation.opportunity.roleLabel,
        originName: validation.opportunity.originName,
      });
      return;
    }

    performApply(validation.opportunity, false);
  };

  const handleOpenOpportunity = (opportunityCode: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("codigo", opportunityCode.toUpperCase());
    setSearchParams(nextSearchParams, { replace: false });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setCityFilter("todos");
    setTypeFilter("todos");
    setDateFilter("todos");
    setOriginFilter("todos");
    setSearchParams({}, { replace: true });
    info({
      title: "Filtros limpos",
      description: "A listagem voltou para a visao geral de oportunidades.",
    });
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorOportunidadesMock.title}
      pageDescription={recreadorOportunidadesMock.description}
      stats={dashboardStats}
    >
      <S.Wrapper>
        <S.FiltersCard>
          <S.FiltersHeader>
            <strong>Filtros locais desta pagina</strong>
            <span>
              A busca global do topo navega no modulo. Os filtros abaixo afetam apenas esta lista.
            </span>
          </S.FiltersHeader>

          <S.FiltersGrid>
            <S.SearchField>
              <Search size={15} />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Filtrar somente esta lista (codigo, origem, funcao ou cidade)"
              />
            </S.SearchField>

            <S.SelectField value={cityFilter} onChange={(event) => setCityFilter(event.target.value as OpportunityCityFilter)}>
              {recreadorOportunidadesMock.filters.cities.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </S.SelectField>

            <S.SelectField value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as OpportunityTypeFilter)}>
              {recreadorOportunidadesMock.filters.types.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </S.SelectField>

            <S.SelectField value={dateFilter} onChange={(event) => setDateFilter(event.target.value as OpportunityDateFilter)}>
              {recreadorOportunidadesMock.filters.dates.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </S.SelectField>

            <S.SelectField
              value={originFilter}
              onChange={(event) => setOriginFilter(event.target.value as "todos" | OpportunityOriginKind)}
            >
              {recreadorOportunidadesMock.filters.origins.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </S.SelectField>
          </S.FiltersGrid>
        </S.FiltersCard>

        {highlightedOpportunityCode || highlightedGlobalTerm ? (
          <S.ContextCard>
            <p>
              {highlightedOpportunityCode
                ? contextOpportunity
                  ? `Contexto global ativo: ${contextOpportunity.code} · ${contextOpportunity.roleLabel}.`
                  : `Codigo ${highlightedOpportunityCode} recebido da busca global e nao encontrado na lista atual.`
                : `Contexto global ativo: termo "${highlightedGlobalTerm}" aplicado para abrir esta lista.`}
            </p>
            <S.SecondaryButton
              type="button"
              onClick={() => {
                setSearchParams({}, { replace: true });
                setSearchTerm("");
                info({
                  title: "Contexto removido",
                  description: "Contexto de busca global removido desta pagina.",
                });
              }}
            >
              Limpar contexto
            </S.SecondaryButton>
          </S.ContextCard>
        ) : null}

        <S.OpportunitiesGrid>
          {filteredItems.map((item) => {
            const isHighlighted = highlightedOpportunityCode.length > 0 && item.code === highlightedOpportunityCode;
            const decisionHint = getDecisionHint(
              item,
              applicationStageByOpportunityId.get(item.id),
            );

            const canApply =
              item.lifecycleStatus === "aberta" &&
              item.applicationStatus === "disponivel" &&
              item.inviteStatus !== "convite-aceito";

            return (
              <S.OpportunityCard
                key={item.id}
                $highlighted={isHighlighted}
                $interactive
                tabIndex={0}
                role="button"
                aria-label={`Abrir oportunidade ${item.code}`}
                onClick={() => handleOpenOpportunity(item.code)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleOpenOpportunity(item.code);
                  }
                }}
              >
                <S.OpportunityVisual>
                  <img
                    src={originVisualMap[item.originKind].image}
                    alt={`${item.originName} - ${originVisualMap[item.originKind].label}`}
                    loading="lazy"
                  />
                  <S.OpportunityVisualOverlay>
                    <strong>{item.originName}</strong>
                    <span>{originVisualMap[item.originKind].label}</span>
                  </S.OpportunityVisualOverlay>
                </S.OpportunityVisual>

                <S.OpportunityHeader>
                  <S.CodeBadge>{item.code}</S.CodeBadge>
                  <S.OriginBadge $origin={item.originKind}>{originLabel[item.originKind]}</S.OriginBadge>
                </S.OpportunityHeader>

                <S.RoleTitle>{item.roleLabel}</S.RoleTitle>
                <S.OriginSummary>{item.originSummary}</S.OriginSummary>

                <S.HighlightRow>
                  <S.HighlightPill>
                    <CalendarDays size={13} /> {item.periodLabel}
                  </S.HighlightPill>
                  <S.HighlightPill>
                    <Banknote size={13} /> {item.compensationLabel}
                  </S.HighlightPill>
                </S.HighlightRow>

                <S.DetailList>
                  <li>
                    <MapPin size={13} /> {item.cityLabel}
                  </li>
                  <li>
                    <Handshake size={13} /> {typeLabelMap[item.type]}
                  </li>
                  <li>
                    <CalendarDays size={13} /> {item.periodLabel}
                  </li>
                  <li>
                    <Clock3 size={13} /> {item.startDateLabel}
                  </li>
                </S.DetailList>

                <S.StateRow>
                  <S.StatePill $tone={item.lifecycleStatus === "aberta" ? "info" : item.lifecycleStatus === "confirmada" ? "success" : "neutral"}>
                    {lifecycleLabel[item.lifecycleStatus]}
                  </S.StatePill>
                  <S.StatePill $tone={item.applicationStatus === "candidatura-enviada" ? "success" : "neutral"}>
                    {item.applicationStatus === "candidatura-enviada" ? "Candidatura enviada" : "Sem candidatura"}
                  </S.StatePill>
                  <S.StatePill
                    $tone={
                      item.inviteStatus === "convite-recebido"
                        ? "warning"
                        : item.inviteStatus === "convite-aceito"
                          ? "success"
                          : "neutral"
                    }
                  >
                    {inviteLabel[item.inviteStatus]}
                  </S.StatePill>
                </S.StateRow>

                {item.commitmentLabel ? <S.CommitmentNote>{item.commitmentLabel}</S.CommitmentNote> : null}
                <S.DecisionHint $tone={decisionHint.tone}>{decisionHint.label}</S.DecisionHint>

                <S.ActionsRow>
                  <S.PrimaryButton
                    type="button"
                    disabled={!canApply}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleApplyRequest(item.id);
                    }}
                  >
                    <Send size={14} /> {item.applicationStatus === "candidatura-enviada" ? "Candidatura enviada" : "Candidatar-se"}
                  </S.PrimaryButton>

                  {item.inviteStatus !== "nenhum" ? (
                    <S.SecondaryButton
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate("/app/recreador/convites");
                      }}
                    >
                      Ir para convites
                    </S.SecondaryButton>
                  ) : null}
                </S.ActionsRow>
              </S.OpportunityCard>
            );
          })}

          {filteredItems.length === 0 ? (
            <S.EmptyCard>
              <p>Nenhuma oportunidade corresponde aos filtros selecionados.</p>
              <S.SecondaryButton type="button" onClick={handleResetFilters}>
                Limpar filtros
              </S.SecondaryButton>
            </S.EmptyCard>
          ) : null}
        </S.OpportunitiesGrid>

        {applyConflictDraft ? (
          <S.DetailOverlay onClick={() => setApplyConflictDraft(null)}>
            <S.DetailModal onClick={(event) => event.stopPropagation()}>
              <S.DetailModalHeader>
                <S.DetailModalTitleWrap>
                  <strong>Conflito de agenda detectado</strong>
                  <span>{applyConflictDraft.opportunityCode} · {applyConflictDraft.roleLabel}</span>
                </S.DetailModalTitleWrap>
              </S.DetailModalHeader>

              <S.OriginSummary>
                Ja existe conflito de agenda no periodo desta vaga (compromisso confirmado ou bloqueio
                manual). Deseja continuar com a candidatura mesmo assim?
              </S.OriginSummary>

              <S.DetailModalActions>
                <S.SecondaryButton type="button" onClick={() => setApplyConflictDraft(null)}>
                  Cancelar
                </S.SecondaryButton>
                <S.PrimaryButton
                  type="button"
                  onClick={() => {
                    const validation = validateApplyToOpportunity(flowState, applyConflictDraft.opportunityId);

                    if (validation.status === "ready") {
                      performApply(validation.opportunity, true);
                    }

                    setApplyConflictDraft(null);
                  }}
                >
                  Continuar candidatura
                </S.PrimaryButton>
              </S.DetailModalActions>
            </S.DetailModal>
          </S.DetailOverlay>
        ) : null}
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
