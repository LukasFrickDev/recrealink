import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import * as S from "./styles";

interface SidebarNavItemProps {
  to: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  collapsed?: boolean;
}

export const SidebarNavItem = ({
  to,
  label,
  description,
  icon,
  collapsed = false,
}: SidebarNavItemProps) => {
  return (
    <NavLink
      to={to}
      end={
        to === "/app/recreador" ||
        to === "/app/hotelaria" ||
        to === "/app/empresa" ||
        to === "/app/pais"
      }
    >
      {({ isActive }) => (
        <S.Item $active={isActive} $collapsed={collapsed} title={collapsed ? label : undefined}>
          {icon ? <S.Icon>{icon}</S.Icon> : null}
          {!collapsed ? (
            <S.TextBlock $active={isActive}>
              <strong>{label}</strong>
              {description ? <span>{description}</span> : null}
            </S.TextBlock>
          ) : (
            <S.CollapsedLabel>{label}</S.CollapsedLabel>
          )}
        </S.Item>
      )}
    </NavLink>
  );
};
