const PUBLIC_PROFILE_SNAPSHOT_STORAGE_KEY = "recreador.public-profile-snapshot.v1";

export interface PublicProfileSnapshot {
  displayName: string;
  roleLabel: string;
  headline: string;
  bio: string;
  city: string;
  specialties: string[];
  ageGroups: string[];
  cacheRangeLabel: string;
  portfolioLinks: string[];
  updatedAt: string;
}

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
};

export const readPublicProfileSnapshot = (): PublicProfileSnapshot | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(PUBLIC_PROFILE_SNAPSHOT_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<PublicProfileSnapshot>;

    if (
      typeof parsed.displayName !== "string" ||
      typeof parsed.roleLabel !== "string" ||
      typeof parsed.headline !== "string" ||
      typeof parsed.bio !== "string" ||
      typeof parsed.city !== "string" ||
      !isStringArray(parsed.specialties) ||
      !isStringArray(parsed.ageGroups) ||
      typeof parsed.cacheRangeLabel !== "string" ||
      !isStringArray(parsed.portfolioLinks) ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null;
    }

    return {
      displayName: parsed.displayName,
      roleLabel: parsed.roleLabel,
      headline: parsed.headline,
      bio: parsed.bio,
      city: parsed.city,
      specialties: parsed.specialties,
      ageGroups: parsed.ageGroups,
      cacheRangeLabel: parsed.cacheRangeLabel,
      portfolioLinks: parsed.portfolioLinks,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
};

export const savePublicProfileSnapshot = (snapshot: PublicProfileSnapshot): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PUBLIC_PROFILE_SNAPSHOT_STORAGE_KEY, JSON.stringify(snapshot));
};
