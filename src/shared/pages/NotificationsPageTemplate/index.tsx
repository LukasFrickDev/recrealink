import { BellRing, CheckCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uiMessages } from "@/shared/constants/uiMessages";
import type { NotificationsPageTemplateData, NotificationsTemplateItem } from "./data";
import * as S from "./styles";

interface NotificationsPageTemplateProps {
  data: NotificationsPageTemplateData;
  tone?: "default" | "hotelaria" | "pais" | "recreador";
}

export const NotificationsPageTemplate = ({ data, tone = "default" }: NotificationsPageTemplateProps) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(data.filters[0]?.id ?? "todas");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<NotificationsTemplateItem[]>(data.items);

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);

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
      return byFilter;
    }

    return byFilter.filter((item) =>
      `${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [activeFilter, items, search]);

  const markAllAsRead = () => {
    setItems((previous) => previous.map((item) => ({ ...item, read: true })));
  };

  const markAsRead = (id: string) => {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  return (
    <S.Wrapper $tone={tone}>
      <S.Panel>
        <S.PanelHeader>
          <S.Heading>
            <h3>{data.sectionTitle}</h3>
            <p>{data.sectionSubtitle}</p>
          </S.Heading>

          <S.ActionButton type="button" onClick={markAllAsRead}>
            <CheckCheck size={14} /> {data.markAllLabel}
          </S.ActionButton>
        </S.PanelHeader>

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
          const actionRoute = item.actionRoute;

          return (
            <S.NotificationCard key={item.id} $read={item.read}>
              <S.NotificationTop>
                <strong>{item.title}</strong>
                <span>{item.time}</span>
              </S.NotificationTop>

              <S.NotificationTypeTag $type={item.type}>{item.type}</S.NotificationTypeTag>
              <S.NotificationDescription>{item.description}</S.NotificationDescription>

              <S.CardActions>
                {!item.read ? (
                  <S.MiniButton type="button" onClick={() => markAsRead(item.id)}>
                    Marcar como lida
                  </S.MiniButton>
                ) : null}
                {actionRoute ? (
                  <S.MiniButton
                    type="button"
                    onClick={() => {
                      markAsRead(item.id);
                      navigate(actionRoute);
                    }}
                  >
                    <BellRing size={13} /> {item.actionLabel ?? data.detailLabel}
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
