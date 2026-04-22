export interface NotificationsTemplateFilter {
  id: string;
  label: string;
}

export interface NotificationsTemplateOrigin {
  module: "recreador" | "hotelaria" | "empresa" | "pais";
  entityType: string;
  entityId: string;
  label: string;
}

export interface NotificationsTemplateDestination {
  route?: string;
  label: string;
}

export type NotificationsTemplateStatus = "novo" | "lido" | "arquivado";

export interface NotificationsTemplateItem {
  id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  timestampIso?: string;
  read: boolean;
  status?: NotificationsTemplateStatus;
  origin?: NotificationsTemplateOrigin;
  destination?: NotificationsTemplateDestination;
  actionRoute?: string;
  actionLabel?: string;
}

export interface NotificationsPageTemplateData {
  sectionTitle: string;
  sectionSubtitle: string;
  markAllLabel: string;
  searchPlaceholder: string;
  detailLabel: string;
  emptyMessage: string;
  filters: NotificationsTemplateFilter[];
  items: NotificationsTemplateItem[];
}
