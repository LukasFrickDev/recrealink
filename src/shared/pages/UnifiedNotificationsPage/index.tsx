import { NotificationsPageTemplate } from "@/shared/pages/NotificationsPageTemplate";
import {
  renderSharedModuleShell,
  type SharedModuleKey,
} from "@/shared/pages/moduleSharedShell";
import { unifiedNotificationsPageByModule } from "./data";

interface UnifiedNotificationsPageProps {
  moduleKey: SharedModuleKey;
}

export const UnifiedNotificationsPage = ({ moduleKey }: UnifiedNotificationsPageProps) => {
  const pageConfig = unifiedNotificationsPageByModule[moduleKey];

  return renderSharedModuleShell(moduleKey, {
    pageTitle: pageConfig.pageTitle,
    pageDescription: pageConfig.pageDescription,
    stats: pageConfig.stats,
    compactContent: true,
    children: <NotificationsPageTemplate data={pageConfig.templateData} tone={pageConfig.tone} />,
  });
};