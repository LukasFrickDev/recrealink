import type { PropsWithChildren, ReactNode } from "react";
import * as S from "./styles";

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  padding?: "sm" | "md" | "lg";
}

export const Card = ({ children, title, subtitle, action, padding = "md" }: PropsWithChildren<CardProps>) => {
  return (
    <S.CardBase $padding={padding}>
      {title || subtitle || action ? (
        <S.CardHeader>
          <S.CardTitleBlock>
            {title ? <S.CardTitle>{title}</S.CardTitle> : null}
            {subtitle ? <S.CardSubtitle>{subtitle}</S.CardSubtitle> : null}
          </S.CardTitleBlock>
          {action ? <div>{action}</div> : null}
        </S.CardHeader>
      ) : null}
      <S.CardBody>{children}</S.CardBody>
    </S.CardBase>
  );
};
