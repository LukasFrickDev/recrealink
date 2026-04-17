import { useMemo, useState } from "react";
import { AlertTriangle, CalendarClock, CheckCircle2, Clock3, Lock, RefreshCcw, Save } from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import {
	recreadorDisponibilidadeMock,
	type AvailabilityPeriod,
	type AvailabilitySlotItem,
	type AvailabilitySlotState,
	type ConflictPreviewItem,
} from "@/modules/recreador/mocks/disponibilidade";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import * as S from "./styles";

const slotStateLabel: Record<AvailabilitySlotState, string> = {
	disponivel: "Disponivel",
	"bloqueio-manual": "Bloqueio manual",
	"bloqueio-compromisso": "Bloqueio por compromisso",
	conflito: "Conflito",
};

const periodLabel: Record<AvailabilityPeriod, string> = {
	manha: "Manha",
	tarde: "Tarde",
	noite: "Noite",
};

export const RecreadorDisponibilidadePage = () => {
	const dispatch = useAppDispatch();

	const [slots, setSlots] = useState<AvailabilitySlotItem[]>(recreadorDisponibilidadeMock.slots);
	const [manualBlocks] = useState(recreadorDisponibilidadeMock.manualBlocks);
	const [recurrenceRules, setRecurrenceRules] = useState(recreadorDisponibilidadeMock.recurrenceRules);
	const [conflicts, setConflicts] = useState<ConflictPreviewItem[]>(recreadorDisponibilidadeMock.seededConflictPreview);
	const [feedback, setFeedback] = useState("");

	const dynamicStats = useMemo(() => {
		const disponiveis = slots.filter((item) => item.state === "disponivel").length;
		const bloqueioManual = slots.filter((item) => item.state === "bloqueio-manual").length;
		const bloqueioCompromisso = slots.filter((item) => item.state === "bloqueio-compromisso").length;
		const conflitos = slots.filter((item) => item.state === "conflito").length;

		return [
			{ title: "Disponiveis", value: String(disponiveis), helper: "Janelas abertas" },
			{ title: "Bloqueio manual", value: String(bloqueioManual), helper: "Definidos por voce" },
			{ title: "Por compromisso", value: String(bloqueioCompromisso), helper: "Vindos de aceite/confirmacao" },
			{ title: "Conflitos", value: String(conflitos), helper: "Sobreposicoes detectadas" },
		];
	}, [slots]);

	const handleToggleSlot = (slotId: string) => {
		setSlots((previous) =>
			previous.map((item) => {
				if (item.id !== slotId) {
					return item;
				}

				if (item.state === "bloqueio-compromisso") {
					return item;
				}

				if (item.state === "disponivel") {
					return {
						...item,
						state: "bloqueio-manual",
						helper: "Bloqueio manual definido na interface.",
					};
				}

				if (item.state === "bloqueio-manual") {
					return {
						...item,
						state: "disponivel",
						helper: "Janela liberada manualmente.",
					};
				}

				return item;
			}),
		);
	};

	const handleToggleRecurrence = (ruleId: string) => {
		setRecurrenceRules((previous) =>
			previous.map((item) => (item.id === ruleId ? { ...item, enabled: !item.enabled } : item)),
		);
	};

	const handleSimulateConflictCheck = () => {
		const conflictSlots = slots.filter((item) => item.state === "conflito");

		if (conflictSlots.length === 0) {
			setFeedback("Nenhum conflito detectado na verificacao visual atual.");
			return;
		}

		setConflicts((previous) => {
			const existingIds = new Set(previous.map((item) => item.id));

			const generated = conflictSlots
				.filter((slot) => !existingIds.has(`conflict-${slot.id}`))
				.map((slot) => ({
					id: `conflict-${slot.id}`,
					dateLabel: slot.dateLabel,
					startTime: slot.startTime,
					endTime: slot.endTime,
					kind: "sobreposicao-parcial" as const,
					sourceA: "Bloqueio manual",
					sourceB: "Compromisso confirmado",
					helper: "Conflito visual detectado por sobreposicao de janelas.",
				}));

			return [...previous, ...generated];
		});

		setFeedback("Conflitos revisados. Estrutura pronta para bloqueio automatico futuro no backend.");
	};

	const handleSalvar = () => {
		dispatch(
			setLastVisualAction(
				"Disponibilidade operacional atualizada visualmente com bloqueios, recorrencia e compromissos.",
			),
		);
		setFeedback("Disponibilidade salva na camada visual. Sem escrita de backend nesta fase.");
	};

	return (
		<RecreadorDashboardShell
			pageTitle={recreadorDisponibilidadeMock.title}
			pageDescription={recreadorDisponibilidadeMock.description}
			stats={dynamicStats}
		>
			<S.Wrapper>
				<S.HeaderCard>
					<h2>
						<CalendarClock size={18} /> Central de disponibilidade operacional
					</h2>
					<p>{recreadorDisponibilidadeMock.intro}</p>
				</S.HeaderCard>

				<S.LegendGrid>
					{recreadorDisponibilidadeMock.stateLegend.map((item) => (
						<S.LegendCard key={item.id}>
							<strong>{item.label}</strong>
							<p>{item.helper}</p>
						</S.LegendCard>
					))}
				</S.LegendGrid>

				<S.SectionCard>
					<S.SectionTitle>
						<Clock3 size={16} /> Visao atual de disponibilidade
					</S.SectionTitle>
					<S.SlotGrid>
						{slots.map((slot) => (
							<S.SlotCard key={slot.id}>
								<S.SlotHeader>
									<strong>{slot.dateLabel}</strong>
									<S.StatePill
										$tone={
											slot.state === "disponivel"
												? "success"
												: slot.state === "bloqueio-manual"
													? "neutral"
													: slot.state === "bloqueio-compromisso"
														? "info"
														: "warning"
										}
									>
										{slotStateLabel[slot.state]}
									</S.StatePill>
								</S.SlotHeader>

								<S.MetaText>{slot.weekdayLabel} · {periodLabel[slot.period]}</S.MetaText>
								<S.MetaText>{slot.startTime} - {slot.endTime}</S.MetaText>
								<S.MetaText>{slot.helper}</S.MetaText>

								<S.RowButtons>
									<S.SecondaryButton
										type="button"
										disabled={slot.state === "bloqueio-compromisso"}
										onClick={() => handleToggleSlot(slot.id)}
									>
										{slot.state === "disponivel" ? "Bloquear manualmente" : "Liberar janela"}
									</S.SecondaryButton>
								</S.RowButtons>
							</S.SlotCard>
						))}
					</S.SlotGrid>
				</S.SectionCard>

				<S.TwoColumn>
					<S.SectionCard>
						<S.SectionTitle>
							<Lock size={16} /> Bloqueios manuais
						</S.SectionTitle>
						<S.ItemList>
							{manualBlocks.map((item) => (
								<S.ItemCard key={item.id}>
									<strong>{item.dateLabel}</strong>
									<S.MetaText>
										{periodLabel[item.period]} · {item.startTime} - {item.endTime}
									</S.MetaText>
									<S.MetaText>{item.reason}</S.MetaText>
								</S.ItemCard>
							))}
						</S.ItemList>
					</S.SectionCard>

					<S.SectionCard>
						<S.SectionTitle>
							<RefreshCcw size={16} /> Recorrencia
						</S.SectionTitle>
						<S.ItemList>
							{recurrenceRules.map((item) => (
								<S.ItemCard key={item.id}>
									<strong>{item.weekdayLabel}</strong>
									<S.MetaText>
										{periodLabel[item.period]} · {item.startTime} - {item.endTime}
									</S.MetaText>
									<S.MetaText>
										{item.mode === "disponivel" ? "Recorrencia de disponibilidade" : "Recorrencia de bloqueio"}
									</S.MetaText>
									<S.RowButtons>
										<S.SecondaryButton type="button" onClick={() => handleToggleRecurrence(item.id)}>
											{item.enabled ? "Desativar recorrencia" : "Ativar recorrencia"}
										</S.SecondaryButton>
									</S.RowButtons>
								</S.ItemCard>
							))}
						</S.ItemList>
					</S.SectionCard>
				</S.TwoColumn>

				<S.TwoColumn>
					<S.SectionCard>
						<S.SectionTitle>
							<CheckCircle2 size={16} /> Compromissos futuros
						</S.SectionTitle>
						{recreadorDisponibilidadeMock.futureCommitments.length === 0 ? (
							<S.EmptyState>Nenhum compromisso futuro confirmado.</S.EmptyState>
						) : (
							<S.ItemList>
								{recreadorDisponibilidadeMock.futureCommitments.map((item) => (
									<S.ItemCard key={item.id}>
										<strong>{item.opportunityCode} · {item.roleLabel}</strong>
										<S.MetaText>{item.originName}</S.MetaText>
										<S.MetaText>{item.dateLabel} · {item.weekdayLabel}</S.MetaText>
										<S.MetaText>
											{periodLabel[item.period]} · {item.startTime} - {item.endTime}
										</S.MetaText>
										<S.MetaText>
											Origem do bloqueio: {item.sourceOrigins.join(" + ")}
										</S.MetaText>
										<S.MetaText>{item.helper}</S.MetaText>
									</S.ItemCard>
								))}
							</S.ItemList>
						)}
					</S.SectionCard>

					<S.SectionCard>
						<S.SectionTitle>
							<AlertTriangle size={16} /> Conflitos
						</S.SectionTitle>
						{conflicts.length === 0 ? (
							<S.EmptyState>Sem conflito visual no momento.</S.EmptyState>
						) : (
							<S.ItemList>
								{conflicts.map((item) => (
									<S.ItemCard key={item.id}>
										<strong>{item.dateLabel}</strong>
										<S.MetaText>
											{item.startTime} - {item.endTime} · {item.kind}
										</S.MetaText>
										<S.MetaText>{item.sourceA} x {item.sourceB}</S.MetaText>
										<S.MetaText>{item.helper}</S.MetaText>
									</S.ItemCard>
								))}
							</S.ItemList>
						)}

						<S.RowButtons>
							<S.SecondaryButton type="button" onClick={handleSimulateConflictCheck}>
								Revisar conflitos
							</S.SecondaryButton>
						</S.RowButtons>
					</S.SectionCard>
				</S.TwoColumn>

				<S.FooterCard>
					<p>
						Estrutura pronta para proxima fase: bloqueio automatico por convite aceito e oportunidade confirmada.
					</p>
					<S.PrimaryButton type="button" onClick={handleSalvar}>
						<Save size={15} /> Salvar disponibilidade
					</S.PrimaryButton>
				</S.FooterCard>

				{feedback ? <S.Feedback>{feedback}</S.Feedback> : null}
			</S.Wrapper>
		</RecreadorDashboardShell>
	);
};
