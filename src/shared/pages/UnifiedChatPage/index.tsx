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
  const pageConfig = unifiedChatPageByModule[moduleKey];

  return renderSharedModuleShell(moduleKey, {
    pageTitle: pageConfig.pageTitle,
    pageDescription: pageConfig.pageDescription,
    stats: pageConfig.stats,
    compactContent: true,
    children: <ChatPageTemplate data={pageConfig.templateData} tone={pageConfig.tone} />,
  });
};