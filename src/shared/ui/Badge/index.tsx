import type { PropsWithChildren } from "react";
import * as S from "./styles";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "brand";

interface BadgeProps {
  tone?: BadgeTone;
}

export const Badge = ({ children, tone = "neutral" }: PropsWithChildren<BadgeProps>) => {
  return <S.BadgeBase $tone={tone}>{children}</S.BadgeBase>;
};
