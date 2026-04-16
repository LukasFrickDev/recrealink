import type { ReactNode } from "react";
import * as S from "./styles";

interface StatCardProps {
  title: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
}

export const StatCard = ({ title, value, helper, icon }: StatCardProps) => {
  return (
    <S.Wrapper>
      <S.Header>
        <span>{title}</span>
        {icon ? <S.Icon>{icon}</S.Icon> : null}
      </S.Header>
      <S.Value>{value}</S.Value>
      {helper ? <S.Helper>{helper}</S.Helper> : null}
    </S.Wrapper>
  );
};
