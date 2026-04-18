import { useEffect, useMemo, useState } from "react";
import { Banknote, CalendarDays, CheckCircle2, Clock3, MapPin, XCircle } from "lucide-react";
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

const originVisualMap = {
  hotelaria: {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    label: "Operação em hotelaria",
  },
  eventos: {
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    label: "Operação em eventos",
  },
} as const;

const columnDescription: Record<ConviteStatus, string> = {
  pendente: "Convites que exigem decisão agora para não perder o prazo.",
  aceito: "Aceites já registrados e prontos para acompanhamento da agenda.",
  recusado: "Histórico de recusas para rastreabilidade operacional.",
};

const statusTabs = [
  { status: "pendente", label: "Pendentes", icon: Clock3 },
  { status: "aceito", label: "Aceitos", icon: CheckCircle2 },
  { status: "recusado", label: "Recusados", icon: XCircle },
] as const;

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
  const [activeStatus, setActiveStatus] = useState<ConviteStatus>("pendente");

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
      { title: "Pendentes", value: String(pendentes), helper: "Aguardando decisão" },
      { title: "Aceitos", value: String(aceitos), helper: "Com compromisso previsto" },
      { title: "Recusados", value: String(recusados), helper: "Histórico da decisão" },
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

  const activeStatusLabel =
    statusTabs.find((item) => item.status === activeStatus)?.label ?? "Pendentes";

  const activeItems = grouped[activeStatus];

  const handleUpdateStatus = (inviteId: string, nextStatus: ConviteStatus) => {
    const current = items.find((item) => item.id === inviteId);

    if (!current) {
      warning({
        title: "Convite indisponível",
        description: "Não foi possível localizar este convite para atualizar o status.",
      });
      return;
    }

    if (current.status === nextStatus) {
      info({
        title: "Status sem alteração",
        description: `O convite ${current.opportunityCode} já está com este status.`,
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
              : "Recusa registrada no histórico de convites.",
          commitmentPreview:
            nextStatus === "aceito"
              ? item.commitmentPreview ?? "Compromisso futuro aguardando consolidação de agenda."
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
      description: `${current.opportunityCode} movido para Recusados com histórico preservado.`,
    });
  };

  const handleRequestDecision = (item: ConviteItem, nextStatus: ConviteStatus) => {
    if (item.status !== "pendente") {
      info({
        title: "Convite já decidido",
        description: `Este convite já está marcado como ${item.status}.`,
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

  const renderStatusPanel = (status: ConviteStatus, title: string, itemsList: ConviteItem[]) => (
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
      <S.ColumnHelper>{columnDescription[status]}</S.ColumnHelper>

      {itemsList.length === 0 ? (
        <S.EmptyState>
          {status === "pendente"
            ? "Nenhum convite pendente. Novos convites aparecerão aqui automaticamente."
            : status === "aceito"
              ? "Nenhum convite aceito. Aceites aparecerão aqui."
              : "Nenhum convite recusado. Recusas aparecerão aqui."}
        </S.EmptyState>
      ) : null}

      <S.InviteList>
        {itemsList.map((item) => (
          <S.InviteCard key={item.id}>
            <S.InviteTop>
              <S.InviteIdentity>
                <S.InviteThumb>
                  <img
                    src={originVisualMap[item.originKind].image}
                    alt={`${item.originName} - ${originVisualMap[item.originKind].label}`}
                    loading="lazy"
                  />
                </S.InviteThumb>

                <S.InviteHeading>
                  <strong>{item.originName}</strong>
                  <span>{item.opportunityCode} · {item.roleLabel}</span>
                </S.InviteHeading>
              </S.InviteIdentity>

              <S.OriginBadge $origin={item.originKind}>{originLabel[item.originKind]}</S.OriginBadge>
            </S.InviteTop>

            <S.MetaLine>{item.originSummary}</S.MetaLine>

            <S.MetaPillRow>
              <S.MetaPill>
                <MapPin size={13} /> {item.cityLabel}
              </S.MetaPill>
              <S.MetaPill>
                <CalendarDays size={13} /> {item.periodLabel}
              </S.MetaPill>
              <S.MetaPill>
                <Banknote size={13} /> {item.compensationLabel}
              </S.MetaPill>
            </S.MetaPillRow>

            <S.MetaLine>Recebido em {item.inviteDateLabel} · prazo {item.responseDeadlineLabel}</S.MetaLine>
            <S.MetaLine>{item.relationshipLabel}</S.MetaLine>
            <S.MetaLine>{item.statusReason}</S.MetaLine>

            <S.DecisionHint $status={status}>
              {status === "pendente"
                ? `Responder até ${item.responseDeadlineLabel}.`
                : status === "aceito"
                  ? "Aceite registrado. Verifique a coerência com Disponibilidade."
                  : "Recusa registrada para histórico e aprendizado de triagem."}
            </S.DecisionHint>

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
        <S.StatusTabs>
          {statusTabs.map((tab) => {
            const Icon = tab.icon;
            const count = grouped[tab.status].length;

            return (
              <S.StatusTabButton
                key={tab.status}
                type="button"
                $active={activeStatus === tab.status}
                onClick={() => setActiveStatus(tab.status)}
              >
                <S.StatusTabLabel>
                  <Icon size={15} />
                  {tab.label}
                </S.StatusTabLabel>
                <S.StatusTabCount>{count}</S.StatusTabCount>
              </S.StatusTabButton>
            );
          })}
        </S.StatusTabs>

        <S.StatusPanel>
          {renderStatusPanel(activeStatus, activeStatusLabel, activeItems)}
        </S.StatusPanel>

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
