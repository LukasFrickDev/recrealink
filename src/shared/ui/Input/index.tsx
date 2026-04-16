import type { InputHTMLAttributes } from "react";
import * as S from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = ({ label, hint, error, id, ...props }: InputProps) => {
  const message = error ?? hint;

  return (
    <S.Field>
      {label ? <S.Label htmlFor={id}>{label}</S.Label> : null}
      <S.InputBase id={id} aria-invalid={Boolean(error)} {...props} />
      {message ? <S.Hint $error={Boolean(error)}>{message}</S.Hint> : null}
    </S.Field>
  );
};
