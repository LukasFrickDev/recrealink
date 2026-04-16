import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { SettingsPageTemplate } from "@/shared/pages/SettingsPageTemplate";
import { empresarioSettingsPageMock } from "@/modules/empresa/mocks/configuracoes";
import * as S from "./styles";

export const EmpresarioSettingsPage = () => {
  return (
    <DashboardShell
      userName={empresarioSettingsPageMock.userName}
      pageTitle={empresarioSettingsPageMock.title}
      pageDescription={empresarioSettingsPageMock.description}
    >
      <S.Wrapper>
        <SettingsPageTemplate
          tabs={empresarioSettingsPageMock.tabs}
          defaultTabId={empresarioSettingsPageMock.defaultTabId}
          notificationsTabId={empresarioSettingsPageMock.notificationsTabId}
          usersTabId={empresarioSettingsPageMock.usersTabId}
          securityTabId={empresarioSettingsPageMock.securityTabId}
          notificationPreferences={empresarioSettingsPageMock.notificationPreferences}
          userAccess={empresarioSettingsPageMock.userAccess}
          securityTips={empresarioSettingsPageMock.securityTips}
          dataTabs={empresarioSettingsPageMock.dataTabs}
          feedbackMessages={empresarioSettingsPageMock.feedbackMessages}
        />
      </S.Wrapper>
    </DashboardShell>
  );
};
