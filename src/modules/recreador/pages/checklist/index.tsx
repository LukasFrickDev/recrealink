import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorChecklistMock } from "@/modules/recreador/mocks/checklist";
import * as S from "./styles";

export const RecreadorChecklistPage = () => {
	const dispatch = useAppDispatch();

	const [checklist, setChecklist] = useState(recreadorChecklistMock.items);
	const [feedback, setFeedback] = useState("");

	const progresso = useMemo(() => {
		const concluidos = checklist.filter((item) => item.done).length;
		return Math.round((concluidos / checklist.length) * 100);
	}, [checklist]);

	const handleToggle = (id: string) => {
		setChecklist((previous) =>
			previous.map((item) =>
				item.id === id
					? {
							...item,
							done: !item.done,
						}
					: item,
			),
		);
	};

	const handleSalvar = () => {
		dispatch(setLastVisualAction("Checklist operacional atualizado visualmente."));
		setFeedback("Checklist salvo na camada visual com sucesso.");
	};

	return (
		<RecreadorDashboardShell
			pageTitle={recreadorChecklistMock.title}
			pageDescription={recreadorChecklistMock.description}
			stats={recreadorChecklistMock.stats}
		>
			<S.Wrapper>
				<S.ProgressCard>
					<S.ProgressHeader>
						<h2>
							<ClipboardCheck size={17} /> Progresso do checklist
						</h2>
						<span>{progresso}% concluído</span>
					</S.ProgressHeader>
					<S.ProgressBar>
						<span style={{ width: `${progresso}%` }} />
					</S.ProgressBar>
					<p>Finalize os itens pendentes para melhorar sua previsibilidade operacional.</p>
				</S.ProgressCard>

				<S.ListCard>
					{checklist.map((item) => (
						<S.ItemRow key={item.id} $done={item.done}>
							<S.CheckButton type="button" $done={item.done} onClick={() => handleToggle(item.id)}>
								<CheckCircle2 size={16} />
							</S.CheckButton>

							<S.ItemContent>
								<strong>{item.title}</strong>
								<p>{item.helper}</p>
							</S.ItemContent>

							<S.StatusBadge $done={item.done}>{item.done ? "Concluído" : "Pendente"}</S.StatusBadge>
						</S.ItemRow>
					))}
				</S.ListCard>

				<S.ReviewCard>
					<h3>
						<ShieldCheck size={17} /> Rotina recomendada
					</h3>
					<ul>
						{recreadorChecklistMock.routine.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>

					<S.SaveButton type="button" onClick={handleSalvar}>
						Salvar checklist
					</S.SaveButton>
				</S.ReviewCard>

				{feedback ? <S.Feedback>{feedback}</S.Feedback> : null}
			</S.Wrapper>
		</RecreadorDashboardShell>
	);
};
