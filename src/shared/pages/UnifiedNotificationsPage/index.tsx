import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { setUnreadNotificationsForModule } from "@/app/store/slices/mockSlice";
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
  const dispatch = useAppDispatch();
  const pageConfig = unifiedNotificationsPageByModule[moduleKey];

  const handleUnreadCountChange = useCallback(
    (count: number) => {
      dispatch(setUnreadNotificationsForModule({ moduleKey, count }));
    },
    [dispatch, moduleKey],
  );

  return renderSharedModuleShell(moduleKey, {
    pageTitle: pageConfig.pageTitle,
    pageDescription: pageConfig.pageDescription,
    stats: pageConfig.stats,
    compactContent: true,
    children: (
      <NotificationsPageTemplate
        data={pageConfig.templateData}
        tone={pageConfig.tone}
        onUnreadCountChange={handleUnreadCountChange}
        persistenceKey={moduleKey}
      />
    ),
  });
};
