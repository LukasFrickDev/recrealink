import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";

interface BackNavigationProps {
  fallbackPath: string;
  label?: string;
  tone?: "dark" | "light" | "tertiary";
}

export const BackNavigation = ({
  fallbackPath,
  label = "Voltar",
  tone = "dark",
}: BackNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const hasUsefulHistory =
      typeof window !== "undefined" && window.history.length > 1 && location.key !== "default";

    if (hasUsefulHistory) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath, { replace: true });
  };

  return (
    <S.BackButton type="button" onClick={handleBack} aria-label={label} $tone={tone}>
      <S.Arrow aria-hidden>←</S.Arrow>
      <span>{label}</span>
    </S.BackButton>
  );
};
