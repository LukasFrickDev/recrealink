import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, MapPin, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorConvitesMock, type ConviteItem, type ConviteStatus } from "@/modules/recreador/mocks/convites";
import * as S from "./styles";

const originLabel = {
  hotelaria: "Hotelaria",
  eventos: "Eventos",
} as const;

export const RecreadorConvitesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState<ConviteItem[]>(recreadorConvitesMock.items);
  const [feedback, setFeedback] = useState("");

  const stats = useMemo(() => {
    const pendentes = items.filter((item) => item.status === "pendente").length;
    const aceitos = items.filter((item) => item.status === "aceito").length;
    const recusados = items.filter((item) => item.status === "recusado").length;

    return [
      { title: "Pendentes", value: String(pendentes), helper: "Aguardando decisao" },
      { title: "Aceitos", value: String(aceitos), helper: "Com compromisso previsto" },
      { title: "Recusados", value: String(recusados), helper: "Historico de decisao" },
    ];
  }, [items]);

  const grouped = useMemo(
    () => ({
      pendente: items.filter((item) => item.status === "pendente"),
      aceito: items.filter((item) => item.status === "aceito"),
      recusado: items.filter((item) => item.status === "recusado"),
    }),
    [items],
  );

  const handleUpdateStatus = (inviteId: string, nextStatus: ConviteStatus) => {
    const current = items.find((item) => item.id === inviteId);

    if (!current || current.status === nextStatus) {
      return;
    }

    setItems((previous) =>
      previous.map((item) => {
        if (item.id !== inviteId) {
          return item;
        }

        const timelineLabel = nextStatus === "aceito" ? "Convite aceito" : "Convite recusado";
        const dateLabel = "Atualizado agora";

        return {
          ...item,
          status: nextStatus,
          statusReason:
            nextStatus === "aceito"
              ? "Aceite visual registrado para evoluir em disponibilidade na proxima fase."
              : "Recusa visual registrada para historico operacional.",
          commitmentPreview:
            nextStatus === "aceito"
              ? item.commitmentPreview ?? "Compromisso futuro aguardando consolidacao de agenda."
              : undefined,
          timeline: [...item.timeline, { id: `${item.id}-${nextStatus}-now`, label: timelineLabel, dateLabel }],
        };
      }),
    );

    dispatch(
      setLastVisualAction(
        nextStatus === "aceito"
          ? `Convite ${inviteId} aceito visualmente.`
          : `Convite ${inviteId} recusado visualmente.`,
      ),
    );

    setFeedback(
      nextStatus === "aceito"
        ? "Convite aceito. O item segue para compromisso futuro na proxima fase."
        : "Convite recusado. Historico mantido para rastreabilidade.",
    );
  };

  const renderColumn = (status: ConviteStatus, title: string, itemsList: ConviteItem[]) => (
    <S.ColumnCard>
      <S.ColumnHeader>
        <h3>
          {status === "pendente" ? <Clock3 size={15} /> : null}
          {status === "aceito" ? <CheckCircle2 size={15} /> : null}
          {status === "recusado" ? <XCircle size={15} /> : null}
          {title}
        </h3>
        <span>{itemsList.length}</span>
      </S.ColumnHeader>

      {itemsList.length === 0 ? <S.EmptyState>Nenhum convite neste status.</S.EmptyState> : null}

      <S.InviteList>
        {itemsList.map((item) => (
          <S.InviteCard key={item.id}>
            <S.InviteTop>
              <strong>{item.opportunityCode} · {item.roleLabel}</strong>
              <S.OriginBadge $origin={item.originKind}>{originLabel[item.originKind]}</S.OriginBadge>
            </S.InviteTop>

            <S.MetaLine>{item.originName}</S.MetaLine>
            <S.MetaLine>{item.originSummary}</S.MetaLine>
            <S.MetaLine>
              <MapPin size={13} /> {item.cityLabel}
            </S.MetaLine>
            <S.MetaLine>{item.periodLabel} · {item.compensationLabel}</S.MetaLine>
            <S.MetaLine>Recebido em {item.inviteDateLabel} · prazo {item.responseDeadlineLabel}</S.MetaLine>
            <S.MetaLine>{item.relationshipLabel}</S.MetaLine>
            <S.MetaLine>{item.statusReason}</S.MetaLine>

            {item.commitmentPreview ? <S.CommitmentNote>{item.commitmentPreview}</S.CommitmentNote> : null}

            <S.TimelineList>
              {item.timeline.map((event) => (
                <li key={event.id}>{event.label} · {event.dateLabel}</li>
              ))}
            </S.TimelineList>

            <S.ActionsRow>
              {status === "pendente" ? (
                <>
                  <S.AcceptButton type="button" onClick={() => handleUpdateStatus(item.id, "aceito")}>
                    Aceitar
                  </S.AcceptButton>
                  <S.RejectButton type="button" onClick={() => handleUpdateStatus(item.id, "recusado")}>
                    Recusar
                  </S.RejectButton>
                </>
              ) : null}

              <S.OpenOpportunityButton
                type="button"
                onClick={() => navigate(`/app/recreador/oportunidades?codigo=${item.opportunityCode}`)}
              >
                Abrir oportunidade
              </S.OpenOpportunityButton>
            </S.ActionsRow>
          </S.InviteCard>
        ))}
      </S.InviteList>
    </S.ColumnCard>
  );

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorConvitesMock.title}
      pageDescription={recreadorConvitesMock.description}
      stats={stats}
    >
      <S.Wrapper>
        <S.HeaderCard>
          <h2>Central de convites</h2>
          <p>
            Aqui ficam somente convites recebidos e suas decisoes. Exploracao e candidatura de vagas
            permanecem em Oportunidades.
          </p>
        </S.HeaderCard>

        <S.LegendGrid>
          {recreadorConvitesMock.statusLegend.map((item) => (
            <S.LegendCard key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.helper}</p>
            </S.LegendCard>
          ))}
        </S.LegendGrid>

        {feedback ? <S.Feedback>{feedback}</S.Feedback> : null}

        <S.BoardGrid>
          {renderColumn("pendente", "Pendentes", grouped.pendente)}
          {renderColumn("aceito", "Aceitos", grouped.aceito)}
          {renderColumn("recusado", "Recusados", grouped.recusado)}
        </S.BoardGrid>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
