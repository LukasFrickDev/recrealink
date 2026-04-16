import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import * as S from "./styles";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <S.ButtonBase $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </S.ButtonBase>
  );
};
