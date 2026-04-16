import { useNavigate } from "react-router-dom";
import { UnderConstructionPageTemplate } from "@/shared/pages/UnderConstructionPageTemplate";
import {
  renderSharedModuleShell,
  type SharedModuleKey,
} from "@/shared/pages/moduleSharedShell";
import { unifiedCommunityPageByModule } from "./data";

interface UnifiedCommunityPageProps {
  moduleKey: SharedModuleKey;
}

export const UnifiedCommunityPage = ({ moduleKey }: UnifiedCommunityPageProps) => {
  const navigate = useNavigate();
  const pageConfig = unifiedCommunityPageByModule[moduleKey];

  return renderSharedModuleShell(moduleKey, {
    pageTitle: pageConfig.pageTitle,
    pageDescription: pageConfig.pageDescription,
    stats: pageConfig.stats,
    compactContent: true,
    children: (
      <UnderConstructionPageTemplate
        subtitle={pageConfig.subtitle}
        message={pageConfig.message}
        statusLabel={pageConfig.statusLabel}
        highlights={pageConfig.highlights}
        nextSteps={pageConfig.nextSteps}
        tone={pageConfig.tone}
        onBack={() => navigate(pageConfig.homeRoute)}
      />
    ),
  });
};