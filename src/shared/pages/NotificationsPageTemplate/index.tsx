import { BellRing, CheckCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uiMessages } from "@/shared/constants/uiMessages";
import type { NotificationsPageTemplateData, NotificationsTemplateItem } from "./data";
import * as S from "./styles";

interface NotificationsPageTemplateProps {
  data: NotificationsPageTemplateData;
  tone?: "default" | "hotelaria" | "pais" | "recreador";
  onUnreadCountChange?: (count: number) => void;
  onItemsChange?: (items: Array<{ id: string; read: boolean }>) => void;
}

const cloneItems = (items: NotificationsTemplateItem[]) => items.map((item) => ({ ...item }));

const resolveNotificationRecency = (item: NotificationsTemplateItem): number => {
  if (!item.timestampIso) {
    return 0;
  }

  const parsed = Date.parse(item.timestampIso);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatTimestampLabel = (timestampIso?: string): string | null => {
  if (!timestampIso) {
    return null;
  }

  const parsed = Date.parse(timestampIso);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(parsed));
};

export const NotificationsPageTemplate = ({
  data,
  tone = "default",
  onUnreadCountChange,
  onItemsChange,
}: NotificationsPageTemplateProps) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(data.filters[0]?.id ?? "todas");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<NotificationsTemplateItem[]>(() => cloneItems(data.items));

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [onUnreadCountChange, unreadCount]);

  useEffect(() => {
    onItemsChange?.(items.map((item) => ({ id: item.id, read: item.read })));
  }, [items, onItemsChange]);

  const filteredItems = useMemo(() => {
    const byFilter = items.filter((item) => {
      if (activeFilter === "todas") {
        return true;
      }

      if (activeFilter === "nao-lidas") {
        return !item.read;
      }

      return item.type === activeFilter;
    });

    if (!search.trim()) {
      return byFilter.slice().sort((a, b) => resolveNotificationRecency(b) - resolveNotificationRecency(a));
    }

    return byFilter
      .filter((item) =>
        `${item.title} ${item.description} ${item.origin?.label ?? ""} ${item.destination?.label ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
      .sort((a, b) => resolveNotificationRecency(b) - resolveNotificationRecency(a));
  }, [activeFilter, items, search]);

  const hasUnread = unreadCount > 0;
  const activeFilterLabel =
    data.filters.find((filter) => filter.id === activeFilter)?.label ?? "Todas";

  const markAllAsRead = () => {
    setItems((previous) =>
      previous.map((item) => ({
        ...item,
        read: true,
        status: "lido",
      })),
    );
  };

  const setReadState = (id: string, read: boolean) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              read,
              status: read ? "lido" : "novo",
            }
          : item,
      ),
    );
  };

  const handleOpenItem = (item: NotificationsTemplateItem) => {
    const nextRoute = item.actionRoute ?? item.destination?.route;

    if (!item.read) {
      setReadState(item.id, true);
    }

    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  return (
    <S.Wrapper $tone={tone}>
      <S.Panel>
        <S.PanelHeader>
          <S.Heading>
            <h3>{data.sectionTitle}</h3>
            <p>{data.sectionSubtitle}</p>
          </S.Heading>

          <S.ActionButton type="button" onClick={markAllAsRead} disabled={!hasUnread}>
            <CheckCheck size={14} /> {data.markAllLabel}
          </S.ActionButton>
        </S.PanelHeader>

        <S.UnreadSummary>
          {unreadCount > 0
            ? `${unreadCount} não lida(s) aguardando revisão. ${filteredItems.length} item(ns) em ${activeFilterLabel.toLowerCase()}.`
            : `Caixa limpa. ${filteredItems.length} item(ns) em ${activeFilterLabel.toLowerCase()}.`}
        </S.UnreadSummary>

        <S.FilterRow>
          {data.filters.map((filter) => (
            <S.FilterButton
              key={filter.id}
              type="button"
              $active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </S.FilterButton>
          ))}
        </S.FilterRow>

        <S.SearchInput
          placeholder={data.searchPlaceholder}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </S.Panel>

      <S.NotificationList>
        {filteredItems.map((item) => {
          const actionRoute = item.actionRoute ?? item.destination?.route;
          const absoluteTimestamp = formatTimestampLabel(item.timestampIso);
          const actionLabel = item.actionLabel ?? item.destination?.label ?? data.detailLabel;

          return (
            <S.NotificationCard
              key={item.id}
              $read={item.read}
              $interactive={Boolean(actionRoute)}
              role={actionRoute ? "button" : undefined}
              tabIndex={actionRoute ? 0 : undefined}
              onClick={() => {
                if (actionRoute) {
                  handleOpenItem(item);
                }
              }}
              onKeyDown={(event) => {
                if (!actionRoute) {
                  return;
                }

                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleOpenItem(item);
                }
              }}
            >
              <S.NotificationTop>
                <S.NotificationHeadline>
                  {!item.read ? <S.UnreadDot aria-hidden="true" /> : null}
                  <strong>{item.title}</strong>
                </S.NotificationHeadline>
                <S.NotificationStatusTag $read={item.read}>
                  {item.read ? "Lida" : "Não lida"}
                </S.NotificationStatusTag>
              </S.NotificationTop>

              <S.NotificationMetaRow>
                <S.NotificationMetaGroup>
                  <S.NotificationTypeTag $type={item.type}>{item.type}</S.NotificationTypeTag>
                  {item.origin ? <S.NotificationOriginTag>{item.origin.label}</S.NotificationOriginTag> : null}
                </S.NotificationMetaGroup>

                <S.NotificationTimeStack>
                  <strong>{item.time}</strong>
                  {absoluteTimestamp ? <span>{absoluteTimestamp}</span> : null}
                </S.NotificationTimeStack>
              </S.NotificationMetaRow>

              <S.NotificationDescription>{item.description}</S.NotificationDescription>

              {item.destination?.label ? (
                <S.NotificationDestination>
                  <strong>Destino</strong>
                  <span>{item.destination.label}</span>
                </S.NotificationDestination>
              ) : null}

              <S.CardActions>
                <S.MiniButton
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setReadState(item.id, !item.read);
                  }}
                >
                  {item.read ? "Marcar como não lida" : "Marcar como lida"}
                </S.MiniButton>

                {actionRoute ? (
                  <S.MiniButton
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenItem(item);
                    }}
                  >
                    <BellRing size={13} /> {actionLabel}
                  </S.MiniButton>
                ) : null}
              </S.CardActions>
            </S.NotificationCard>
          );
        })}
      </S.NotificationList>

      {filteredItems.length === 0 ? (
        <S.EmptyState>
          {items.length === 0
            ? uiMessages.notificationsEmptyInitial
            : `${data.emptyMessage}${unreadCount === 0 ? " Caixa limpa no momento." : " Tente outro filtro."}`}
        </S.EmptyState>
      ) : null}
    </S.Wrapper>
  );
};
