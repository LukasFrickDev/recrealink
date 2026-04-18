import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, MapPin, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorConvitesMock, type ConviteItem, type ConviteStatus } from "@/modules/recreador/mocks/convites";
import { useToast } from "@/shared/ui/Toast";
import * as S from "./styles";

const originLabel = {
  hotelaria: "Hotelaria",
  eventos: "Eventos",
} as const;

type InviteDecisionDraft = {
  inviteId: string;
  nextStatus: ConviteStatus;
  opportunityCode: string;
  roleLabel: string;
};

export const RecreadorConvitesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, info, warning } = useToast();

  const [items, setItems] = useState<ConviteItem[]>(recreadorConvitesMock.items);
  const [decisionDraft, setDecisionDraft] = useState<InviteDecisionDraft | null>(null);

  useEffect(() => {
    if (!decisionDraft) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDecisionDraft(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [decisionDraft]);

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

    if (!current) {
      warning({
        title: "Convite indisponivel",
        description: "Nao foi possivel localizar este convite para atualizar o status.",
      });
      return;
    }

    if (current.status === nextStatus) {
      info({
        title: "Status sem alteracao",
        description: `O convite ${current.opportunityCode} ja esta com este status.`,
      });
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
              ? "Aceite registrado e compromisso encaminhado para disponibilidade."
              : "Recusa registrada no historico de convites.",
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
          ? `Convite ${inviteId} aceito.`
          : `Convite ${inviteId} recusado.`,
      ),
    );

    if (nextStatus === "aceito") {
      success({
        title: "Convite aceito",
        description: `${current.opportunityCode} movido para Aceitos e preparado para disponibilidade.`,
      });
      return;
    }

    warning({
      title: "Convite recusado",
      description: `${current.opportunityCode} movido para Recusados com historico preservado.`,
    });
  };

  const handleRequestDecision = (item: ConviteItem, nextStatus: ConviteStatus) => {
    if (item.status !== "pendente") {
      info({
        title: "Convite ja decidido",
        description: `Este convite ja esta marcado como ${item.status}.`,
      });
      return;
    }

    setDecisionDraft({
      inviteId: item.id,
      nextStatus,
      opportunityCode: item.opportunityCode,
      roleLabel: item.roleLabel,
    });
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

      {itemsList.length === 0 ? (
        <S.EmptyState>
          {status === "pendente"
            ? "Nenhum convite pendente. Novos convites aparecerao aqui automaticamente."
            : status === "aceito"
              ? "Nenhum convite aceito. Aceites pendentes serao listados nesta coluna."
              : "Nenhum convite recusado no momento."}
        </S.EmptyState>
      ) : null}

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
                  <S.AcceptButton type="button" onClick={() => handleRequestDecision(item, "aceito")}>
                    Aceitar
                  </S.AcceptButton>
                  <S.RejectButton type="button" onClick={() => handleRequestDecision(item, "recusado")}>
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
          <p>Decida convites recebidos. Pesquisa e candidatura continuam em Oportunidades.</p>
        </S.HeaderCard>

        <S.BoardGrid>
          {renderColumn("pendente", "Pendentes", grouped.pendente)}
          {renderColumn("aceito", "Aceitos", grouped.aceito)}
          {renderColumn("recusado", "Recusados", grouped.recusado)}
        </S.BoardGrid>

        {decisionDraft ? (
          <S.DecisionOverlay onClick={() => setDecisionDraft(null)}>
            <S.DecisionModal
              role="dialog"
              aria-modal="true"
              aria-labelledby="convite-decisao-titulo"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 id="convite-decisao-titulo">
                {decisionDraft.nextStatus === "aceito"
                  ? "Confirmar aceite do convite"
                  : "Confirmar recusa do convite"}
              </h3>
              <p>
                {decisionDraft.opportunityCode} · {decisionDraft.roleLabel}
              </p>
              <p>
                {decisionDraft.nextStatus === "aceito"
                  ? "Este aceite move o convite para a coluna de aceitos."
                  : "A recusa move o convite para a coluna de recusados."}
              </p>

              <S.DecisionActions>
                <S.DecisionCancelButton type="button" onClick={() => setDecisionDraft(null)}>
                  Cancelar
                </S.DecisionCancelButton>
                <S.DecisionConfirmButton
                  type="button"
                  $tone={decisionDraft.nextStatus === "aceito" ? "aceito" : "recusado"}
                  onClick={() => {
                    handleUpdateStatus(decisionDraft.inviteId, decisionDraft.nextStatus);
                    setDecisionDraft(null);
                  }}
                >
                  {decisionDraft.nextStatus === "aceito" ? "Confirmar aceite" : "Confirmar recusa"}
                </S.DecisionConfirmButton>
              </S.DecisionActions>
            </S.DecisionModal>
          </S.DecisionOverlay>
        ) : null}
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
