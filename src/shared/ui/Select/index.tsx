import type { SelectHTMLAttributes } from "react";
import * as S from "./styles";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = ({ label, options, placeholder, id, ...props }: SelectProps) => {
  return (
    <S.Field>
      {label ? <S.Label htmlFor={id}>{label}</S.Label> : null}
      <S.SelectBase id={id} {...props}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.SelectBase>
    </S.Field>
  );
};
