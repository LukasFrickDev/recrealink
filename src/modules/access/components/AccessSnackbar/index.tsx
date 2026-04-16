import * as S from "./styles";

interface AccessSnackbarProps {
  message: string | null;
}

export const AccessSnackbar = ({ message }: AccessSnackbarProps) => {
  if (!message) {
    return null;
  }

  return (
    <S.Toast role="status" aria-live="polite">
      {message}
    </S.Toast>
  );
};
