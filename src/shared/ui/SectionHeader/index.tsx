import type { ReactNode } from "react";
import * as S from "./styles";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const SectionHeader = ({ title, subtitle, action }: SectionHeaderProps) => {
  return (
    <S.Header>
      <div>
        <S.Title>{title}</S.Title>
        {subtitle ? <S.Subtitle>{subtitle}</S.Subtitle> : null}
      </div>
      {action ? <S.Action>{action}</S.Action> : null}
    </S.Header>
  );
};
