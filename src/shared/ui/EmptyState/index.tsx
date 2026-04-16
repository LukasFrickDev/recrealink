import type { ReactNode } from "react";
import * as S from "./styles";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <S.Wrapper>
      {icon ? <S.Icon>{icon}</S.Icon> : null}
      <h3>{title}</h3>
      <p>{description}</p>
    </S.Wrapper>
  );
};
