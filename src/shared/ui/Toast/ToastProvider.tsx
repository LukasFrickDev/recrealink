import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import * as S from "./styles";
import type { ToastInput, ToastTone } from "./types";

type ToastItem = {
  id: string;
  title?: string;
  description: string;
  tone: ToastTone;
};

type ToastContextValue = {
  notify: (input: ToastInput) => string;
  dismiss: (id: string) => void;
};

type ToastShortcutInput = Omit<ToastInput, "tone">;

const DEFAULT_DURATION_MS = 4200;
const MAX_TOASTS_ON_SCREEN = 4;

const toneIconMap: Record<ToastTone, LucideIcon> = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
};

const defaultTitleByTone: Record<ToastTone, string> = {
  success: "Atualização concluída",
  info: "Atualização visual",
  warning: "Atenção",
  danger: "Falha visual",
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutRegistry = useRef<Record<string, number>>({});

  const dismiss = useCallback((id: string) => {
    const timeoutId = timeoutRegistry.current[id];

    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
      delete timeoutRegistry.current[id];
    }

    setToasts((previous) => previous.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (input: ToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      const toast: ToastItem = {
        id,
        tone: input.tone ?? "info",
        title: input.title,
        description: input.description,
      };

      setToasts((previous) => [toast, ...previous].slice(0, MAX_TOASTS_ON_SCREEN));

      const durationMs = input.durationMs ?? DEFAULT_DURATION_MS;
      timeoutRegistry.current[id] = window.setTimeout(() => {
        dismiss(id);
      }, durationMs);

      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    return () => {
      Object.values(timeoutRegistry.current).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });

      timeoutRegistry.current = {};
    };
  }, []);

  const value = useMemo(() => ({ notify, dismiss }), [dismiss, notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <S.ToastViewport role="status" aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => {
          const Icon = toneIconMap[toast.tone];

          return (
            <S.ToastCard key={toast.id} $tone={toast.tone}>
              <S.IconWrap $tone={toast.tone}>
                <Icon size={16} />
              </S.IconWrap>

              <S.Content>
                <strong>{toast.title ?? defaultTitleByTone[toast.tone]}</strong>
                <p>{toast.description}</p>
              </S.Content>

              <S.CloseButton type="button" onClick={() => dismiss(toast.id)} aria-label="Fechar aviso">
                <X size={14} />
              </S.CloseButton>
            </S.ToastCard>
          );
        })}
      </S.ToastViewport>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  const success = useCallback(
    (input: ToastShortcutInput) => context.notify({ ...input, tone: "success" }),
    [context],
  );

  const info = useCallback(
    (input: ToastShortcutInput) => context.notify({ ...input, tone: "info" }),
    [context],
  );

  const warning = useCallback(
    (input: ToastShortcutInput) => context.notify({ ...input, tone: "warning" }),
    [context],
  );

  const danger = useCallback(
    (input: ToastShortcutInput) => context.notify({ ...input, tone: "danger" }),
    [context],
  );

  return {
    notify: context.notify,
    dismiss: context.dismiss,
    success,
    info,
    warning,
    danger,
  };
};