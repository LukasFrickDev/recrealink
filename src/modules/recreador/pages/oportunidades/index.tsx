import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, Handshake, MapPin, Search, Send } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
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
} from "@/modules/recreador/mocks/oportunidades";
import * as S from "./styles";

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

export const RecreadorOportunidadesPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { success, info, warning, danger } = useToast();
	const [searchParams, setSearchParams] = useSearchParams();

	const [searchTerm, setSearchTerm] = useState("");
	const [cityFilter, setCityFilter] = useState<OpportunityCityFilter>("todos");
	const [typeFilter, setTypeFilter] = useState<OpportunityTypeFilter>("todos");
	const [dateFilter, setDateFilter] = useState<OpportunityDateFilter>("todos");
	const [originFilter, setOriginFilter] = useState<"todos" | OpportunityOriginKind>("todos");
	const [items, setItems] = useState(recreadorOportunidadesMock.items);

	const highlightedOpportunityCode = useMemo(() => {
		const rawCode = searchParams.get("codigo")?.trim() ?? "";
		return rawCode ? rawCode.toUpperCase() : "";
	}, [searchParams]);

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

	const handleApply = (id: string) => {
		const target = items.find((item) => item.id === id);

		if (!target) {
			danger({
				title: "Oportunidade indisponivel",
				description: "Nao foi possivel localizar a oportunidade selecionada nesta lista.",
			});
			return;
		}

		if (target.lifecycleStatus !== "aberta") {
			warning({
				title: "Candidatura bloqueada",
				description: "Esta oportunidade nao aceita nova candidatura porque nao esta aberta.",
			});
			return;
		}

		if (target.applicationStatus === "candidatura-enviada") {
			info({
				title: "Candidatura ja enviada",
				description: "Este item ja recebeu sua candidatura e segue em acompanhamento.",
			});
			return;
		}

		setItems((previous) =>
			previous.map((item) =>
				item.id === id
					? {
							...item,
							applicationStatus: "candidatura-enviada",
						}
					: item,
			),
		);

		dispatch(setLastVisualAction(`Candidatura enviada para ${target.code}.`));
		success({
			title: "Candidatura enviada",
			description: `${target.code} movida para acompanhamento. Se houver convite, a decisao fica em Convites.`,
		});
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
				<S.HeaderCard>
					<h2>Central de vagas</h2>
					<p>Filtre vagas e envie candidaturas. Decisoes de convite ficam em Convites.</p>
				</S.HeaderCard>

				<S.FiltersCard>
					<S.FiltersGrid>
						<S.SearchField>
							<Search size={15} />
							<input
								type="text"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								placeholder="Buscar por codigo, origem, funcao ou cidade"
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

				{highlightedOpportunityCode ? (
					<S.ContextCard>
						<p>
							{contextOpportunity
								? `Filtro ativo: ${contextOpportunity.code} · ${contextOpportunity.roleLabel}.`
								: `Codigo ${highlightedOpportunityCode} recebido de Convites e nao encontrado na lista atual.`}
						</p>
						<S.SecondaryButton
							type="button"
							onClick={() => {
								setSearchParams({}, { replace: true });
								setSearchTerm("");
								info({
									title: "Contexto removido",
									description: "Filtro de contexto removido.",
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

						const canApply =
							item.lifecycleStatus === "aberta" &&
							item.applicationStatus === "disponivel" &&
							item.inviteStatus !== "convite-aceito";

						return (
							<S.OpportunityCard key={item.id} $highlighted={isHighlighted}>
								<S.OpportunityHeader>
									<S.CodeBadge>{item.code}</S.CodeBadge>
									<S.OriginBadge $origin={item.originKind}>{originLabel[item.originKind]}</S.OriginBadge>
								</S.OpportunityHeader>

								<S.RoleTitle>{item.roleLabel}</S.RoleTitle>
								<S.OriginSummary>{item.originName} · {item.originSummary}</S.OriginSummary>

								<S.DetailList>
									<li>
										<MapPin size={13} /> {item.cityLabel}
									</li>
									<li>
										<Handshake size={13} /> {item.type}
									</li>
									<li>
										<CalendarDays size={13} /> {item.periodLabel}
									</li>
									<li>
										<Clock3 size={13} /> {item.startDateLabel}
									</li>
								</S.DetailList>

								<S.Compensation>{item.compensationLabel}</S.Compensation>

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
													: item.inviteStatus === "convite-recusado"
														? "neutral"
														: "neutral"
										}
									>
										{inviteLabel[item.inviteStatus]}
									</S.StatePill>
								</S.StateRow>

								{item.commitmentLabel ? <S.CommitmentNote>{item.commitmentLabel}</S.CommitmentNote> : null}

								<S.ActionsRow>
									<S.PrimaryButton type="button" disabled={!canApply} onClick={() => handleApply(item.id)}>
										<Send size={14} /> {item.applicationStatus === "candidatura-enviada" ? "Candidatura enviada" : "Candidatar-se"}
									</S.PrimaryButton>

									{item.inviteStatus !== "nenhum" ? (
										<S.SecondaryButton type="button" onClick={() => navigate("/app/recreador/convites")}>
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
			</S.Wrapper>
		</RecreadorDashboardShell>
	);
};
