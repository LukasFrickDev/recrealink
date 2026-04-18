export type ToastTone = "success" | "info" | "warning" | "danger";

export type ToastInput = {
  title?: string;
  description: string;
  tone?: ToastTone;
  durationMs?: number;
};