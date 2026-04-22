import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { useNavigate } from "react-router-dom";
import { SettingsPageTemplate } from "@/shared/pages/SettingsPageTemplate";
import { paisSettingsMock } from "@/modules/pais/mocks/configuracoes";
import * as S from "./styles";

export const PaisSettingsPage = () => {
  const navigate = useNavigate();

  return (
    <PaisDashboardShell
      userName={paisSettingsMock.userName}
      pageTitle={paisSettingsMock.title}
      pageDescription={paisSettingsMock.description}
      compactContent
    >
      <S.Wrapper>
        <SettingsPageTemplate
          tone="pais"
          tabs={paisSettingsMock.tabs}
          defaultTabId={paisSettingsMock.defaultTabId}
          notificationsTabId={paisSettingsMock.notificationsTabId}
          usersTabId={paisSettingsMock.usersTabId}
          securityTabId={paisSettingsMock.securityTabId}
          accountTabId={paisSettingsMock.accountTabId}
          notificationPreferences={paisSettingsMock.notificationPreferences}
          userAccess={paisSettingsMock.userAccess}
          securityTips={paisSettingsMock.securityTips}
          dataTabs={paisSettingsMock.dataTabs}
          feedbackMessages={paisSettingsMock.feedbackMessages}
          onRequestLogout={() => navigate("/acesso/escolher-perfil")}
        />
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
