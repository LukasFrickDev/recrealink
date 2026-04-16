export interface NotificationsTemplateFilter {
  id: string;
  label: string;
}

export interface NotificationsTemplateItem {
  id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
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
