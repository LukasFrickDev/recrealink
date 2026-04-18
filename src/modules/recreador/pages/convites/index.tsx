import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectRecreadorFlowInvites,
  selectRecreadorFlowState,
  updateInviteStatus,
  validateInviteStatusTransition,
} from "@/app/store/slices/recreadorFlowSlice";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorConvitesMock, type ConviteItem, type ConviteStatus } from "@/modules/recreador/mocks/convites";
import { useToast } from "@/shared/ui/Toast";
import * as S from "./styles";

type InviteBucket = ConviteStatus;

type InviteConflictDraft = {
  inviteId: string;
  opportunityCode: string;
  roleLabel: string;
};

const originLabel = {
  hotelaria: "Hotelaria",
  eventos: "Eventos",
} as const;

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

const columnDescription: Record<ConviteStatus, string> = {
  aguardando: "Candidaturas enviadas aguardando retorno da empresa.",
  pendente: "Convites que exigem decisao agora para nao perder o prazo.",
  aceito: "Aceites ja registrados e prontos para acompanhamento da agenda.",
  recusado: "Historico de recusas para rastreabilidade operacional.",
};

const statusTabs = [
  { status: "aguardando", label: "Aguardando", icon: Clock3 },
  { status: "pendente", label: "Pendentes", icon: Clock3 },
  { status: "aceito", label: "Aceitos", icon: CheckCircle2 },
  { status: "recusado", label: "Recusados", icon: XCircle },
] as const;

export const RecreadorConvitesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, info, warning } = useToast();

  const flowState = useAppSelector(selectRecreadorFlowState);
  const items = useAppSelector(selectRecreadorFlowInvites);

  const [conflictDraft, setConflictDraft] = useState<InviteConflictDraft | null>(null);
  const [activeStatus, setActiveStatus] = useState<InviteBucket>("aguardando");

  useEffect(() => {
    if (!conflictDraft) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setConflictDraft(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [conflictDraft]);

  const stats = useMemo(() => {
    const aguardando = items.filter((item) => item.status === "aguardando").length;
    const pendentes = items.filter((item) => item.status === "pendente").length;
    const aceitos = items.filter((item) => item.status === "aceito").length;
    const recusados = items.filter((item) => item.status === "recusado").length;

    return [
      { title: "Aguardando", value: String(aguardando), helper: "Candidaturas em analise" },
      { title: "Pendentes", value: String(pendentes), helper: "Convites diretos para decidir" },
      { title: "Aceitos", value: String(aceitos), helper: "Com compromisso previsto" },
      { title: "Recusados", value: String(recusados), helper: "Historico da decisao" },
    ];
  }, [items]);

  const grouped = useMemo(
    () => ({
      aguardando: items.filter((item) => item.status === "aguardando"),
      pendente: items.filter((item) => item.status === "pendente"),
      aceito: items.filter((item) => item.status === "aceito"),
      recusado: items.filter((item) => item.status === "recusado"),
    }),
    [items],
  );

  const activeStatusLabel =
    statusTabs.find((item) => item.status === activeStatus)?.label ?? "Aguardando";

  const activeItems = grouped[activeStatus];

  const performStatusUpdate = (
    inviteId: string,
    nextStatus: ConviteStatus,
    withConflictWarning: boolean,
  ) => {
    dispatch(updateInviteStatus({ inviteId, nextStatus }));
    dispatch(
      setLastVisualAction(
        nextStatus === "aceito"
          ? `Convite ${inviteId} aceito.`
          : `Convite ${inviteId} recusado.`,
      ),
    );

    if (nextStatus === "aceito") {
      if (withConflictWarning) {
        warning({
          title: "Convite aceito com conflito",
          description:
            "Aceite confirmado mesmo com conflito de compromisso confirmado ou bloqueio manual no periodo.",
        });
      } else {
        success({
          title: "Convite aceito",
          description: "Convite movido para Aceitos e integrado a disponibilidade.",
        });
      }
      return;
    }

    warning({
      title: "Convite recusado",
      description: "Convite movido para Recusados com historico preservado.",
    });
  };

  const handleUpdateStatus = (inviteId: string, nextStatus: ConviteStatus) => {
    const validation = validateInviteStatusTransition(flowState, inviteId, nextStatus);

    if (validation.status === "not-found") {
      warning({
        title: "Convite indisponivel",
        description: "Nao foi possivel localizar este convite para atualizar o status.",
      });
      return;
    }

    if (validation.status === "unchanged") {
      info({
        title: "Status sem alteracao",
        description: `O convite ${validation.invite.opportunityCode} ja esta com este status.`,
      });
      return;
    }

    if (validation.nextStatus === "aceito" && validation.commitmentConflictDetected) {
      setConflictDraft({
        inviteId,
        opportunityCode: validation.invite.opportunityCode,
        roleLabel: validation.invite.roleLabel,
      });
      return;
    }

    performStatusUpdate(inviteId, nextStatus, false);
  };

  const handleOpenContact = (item: ConviteItem) => {
    navigate(
      `/app/recreador/chat?contato=${encodeURIComponent(item.originName)}&codigo=${encodeURIComponent(item.opportunityCode)}&origem=convite`,
    );
  };

  const renderStatusPanel = (status: InviteBucket, title: string, itemsList: ConviteItem[]) => (
    <S.ColumnCard>
      <S.ColumnHeader>
        <h3>
          {status === "aguardando" ? <Clock3 size={15} /> : null}
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
          {status === "aguardando"
            ? "Nenhuma candidatura aguardando retorno no momento."
            : status === "pendente"
              ? "Nenhum convite direto pendente. Novos convites aparecerao aqui automaticamente."
              : status === "aceito"
                ? "Nenhum convite aceito. Aceites aparecerao aqui."
                : "Nenhum convite recusado. Recusas aparecerao aqui."}
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
                  <span>
                    {item.opportunityCode} · {item.roleLabel}
                  </span>
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

            <S.MetaLine>
              Recebido em {item.inviteDateLabel} · prazo {item.responseDeadlineLabel}
            </S.MetaLine>
            <S.MetaLine>{item.relationshipLabel}</S.MetaLine>
            <S.MetaLine>{item.statusReason}</S.MetaLine>

            <S.DecisionHint $status={status}>
              {status === "aguardando"
                ? "Candidatura enviada. Aguarde retorno da empresa para possivel convite direto."
                : status === "pendente"
                  ? `Responder ate ${item.responseDeadlineLabel}.`
                  : status === "aceito"
                    ? "Aceite registrado. Verifique a coerencia com Disponibilidade."
                    : "Recusa registrada para historico e aprendizado de triagem."}
            </S.DecisionHint>

            {item.commitmentPreview ? <S.CommitmentNote>{item.commitmentPreview}</S.CommitmentNote> : null}

            <S.TimelineList>
              {item.timeline.map((event) => (
                <li key={event.id}>
                  {event.label} · {event.dateLabel}
                </li>
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

              <S.OpenOpportunityButton type="button" onClick={() => handleOpenContact(item)}>
                <MessageCircle size={14} /> Entrar em contato
              </S.OpenOpportunityButton>

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

        <S.StatusPanel>{renderStatusPanel(activeStatus, activeStatusLabel, activeItems)}</S.StatusPanel>

        {conflictDraft ? (
          <S.DecisionOverlay onClick={() => setConflictDraft(null)}>
            <S.DecisionModal
              role="dialog"
              aria-modal="true"
              aria-labelledby="convite-conflito-titulo"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 id="convite-conflito-titulo">Conflito de agenda detectado</h3>
              <p>
                {conflictDraft.opportunityCode} · {conflictDraft.roleLabel}
              </p>
              <p>
                Ja existe conflito de agenda para este periodo (compromisso confirmado ou bloqueio
                manual). Deseja continuar com o aceite mesmo assim?
              </p>

              <S.DecisionActions>
                <S.DecisionCancelButton type="button" onClick={() => setConflictDraft(null)}>
                  Cancelar
                </S.DecisionCancelButton>
                <S.DecisionConfirmButton
                  type="button"
                  $tone="aceito"
                  onClick={() => {
                    performStatusUpdate(conflictDraft.inviteId, "aceito", true);
                    setConflictDraft(null);
                  }}
                >
                  Continuar aceite
                </S.DecisionConfirmButton>
              </S.DecisionActions>
            </S.DecisionModal>
          </S.DecisionOverlay>
        ) : null}
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
