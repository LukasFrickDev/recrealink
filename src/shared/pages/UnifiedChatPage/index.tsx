import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setChatVisiblePresence, setUnreadMessagesForModule } from "@/app/store/slices/mockSlice";
import { ChatPageTemplate } from "@/shared/pages/ChatPageTemplate";
import {
  renderSharedModuleShell,
  type SharedModuleKey,
} from "@/shared/pages/moduleSharedShell";
import { unifiedChatPageByModule } from "./data";

interface UnifiedChatPageProps {
  moduleKey: SharedModuleKey;
}

export const UnifiedChatPage = ({ moduleKey }: UnifiedChatPageProps) => {
  const dispatch = useAppDispatch();
  const ownPresence = useAppSelector((state) => state.mock.chatPresenceByModule[moduleKey]);
  const [searchParams] = useSearchParams();
  const pageConfig = unifiedChatPageByModule[moduleKey];

  const contactName = searchParams.get("contato")?.trim() ?? undefined;
  const opportunityCode = searchParams.get("codigo")?.trim() ?? undefined;
  const source = searchParams.get("origem")?.trim() ?? undefined;

  const chatContext = useMemo(
    () => ({
      contactName,
      opportunityCode,
      source,
    }),
    [contactName, opportunityCode, source],
  );

  const handleUnreadCountChange = useCallback(
    (count: number) => {
      dispatch(setUnreadMessagesForModule({ moduleKey, count }));
    },
    [dispatch, moduleKey],
  );

  const handleOwnPresenceChange = useCallback(
    (presence: "online" | "away" | "busy" | "offline") => {
      dispatch(setChatVisiblePresence({ moduleKey, presence }));
    },
    [dispatch, moduleKey],
  );

  return renderSharedModuleShell(moduleKey, {
    pageTitle: pageConfig.pageTitle,
    pageDescription: pageConfig.pageDescription,
    stats: pageConfig.stats,
    compactContent: true,
    children: (
      <ChatPageTemplate
        data={pageConfig.templateData}
        tone={pageConfig.tone}
        onUnreadCountChange={handleUnreadCountChange}
        externalContext={chatContext}
        persistenceKey={moduleKey}
        ownPresence={ownPresence}
        onOwnPresenceChange={handleOwnPresenceChange}
      />
    ),
  });
};
