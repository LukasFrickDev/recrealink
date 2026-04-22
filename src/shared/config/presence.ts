export type SharedChatPresence = "online" | "away" | "busy" | "offline";
export type SharedShellPresence = "ativo" | "ausente" | "ocupado" | "offline";
export type SharedPresenceModuleKey = "recreador" | "hotelaria" | "empresa" | "pais";

export const chatPresenceLabel: Record<SharedChatPresence, string> = {
  online: "Online",
  away: "Ausente",
  busy: "Ocupado",
  offline: "Offline",
};

export const shellPresenceLabel: Record<SharedShellPresence, string> = {
  ativo: "Ativo agora",
  ausente: "Ausente",
  ocupado: "Ocupado",
  offline: "Offline",
};

export const chatPresenceOptions: Array<{ value: SharedChatPresence; label: string }> = [
  { value: "online", label: "Online" },
  { value: "away", label: "Ausente" },
  { value: "busy", label: "Ocupado" },
  { value: "offline", label: "Offline" },
];

export const shellPresenceOptions: Array<{ value: SharedShellPresence; label: string }> = [
  { value: "ativo", label: "Online" },
  { value: "ausente", label: "Ausente" },
  { value: "ocupado", label: "Ocupado" },
  { value: "offline", label: "Offline" },
];

export const mapChatPresenceToShellPresence = (
  chatPresence: SharedChatPresence,
): SharedShellPresence => {
  if (chatPresence === "online") {
    return "ativo";
  }

  if (chatPresence === "away") {
    return "ausente";
  }

  if (chatPresence === "busy") {
    return "ocupado";
  }

  return "offline";
};

export const mapShellPresenceToChatPresence = (
  shellPresence: SharedShellPresence,
): SharedChatPresence => {
  if (shellPresence === "ativo") {
    return "online";
  }

  if (shellPresence === "ausente") {
    return "away";
  }

  if (shellPresence === "ocupado") {
    return "busy";
  }

  return "offline";
};

export const getStoredPresenceKey = (moduleKey: SharedPresenceModuleKey) =>
  `recrealink.presence.${moduleKey}`;

export const readStoredChatPresence = (
  moduleKey: SharedPresenceModuleKey,
  fallbackPresence: SharedChatPresence,
): SharedChatPresence => {
  if (typeof window === "undefined") {
    return fallbackPresence;
  }

  try {
    const raw = window.localStorage.getItem(getStoredPresenceKey(moduleKey));

    if (raw === "online" || raw === "away" || raw === "busy" || raw === "offline") {
      return raw;
    }

    return fallbackPresence;
  } catch {
    return fallbackPresence;
  }
};

export const writeStoredChatPresence = (
  moduleKey: SharedPresenceModuleKey,
  presence: SharedChatPresence,
) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(getStoredPresenceKey(moduleKey), presence);
  } catch {
    // Ignore storage failures in demo mode.
  }
};
