import { useMemo, useState, type ReactNode } from "react";
import {
  StandardSettingsTabs,
  type SettingsBaseTabConfig,
  type SettingsNotificationPreference,
  type SettingsTabOption,
  type SettingsUserAccess,
} from "@/shared/layouts/SettingsLayoutBase/StandardSettingsTabs";
import {
  createSettingsTemplateDataValueMap,
  defaultSettingsTemplateFeedbackMessages,
  type SettingsTemplateFeedbackMessages,
} from "./data";
import * as S from "./styles";

export interface SettingsTemplateDataTabConfig {
  id: string;
  editable: boolean;
  restrictedNotice?: string;
  options: SettingsTabOption[];
}

interface SettingsPageTemplateProps {
  tone?: "default" | "hotelaria" | "pais";
  showFeedback?: boolean;
  tabs: SettingsBaseTabConfig[];
  defaultTabId: string;
  notificationsTabId: string;
  usersTabId: string;
  securityTabId: string;
  notificationPreferences: SettingsNotificationPreference[];
  userAccess: SettingsUserAccess[];
  securityTips: string[];
  profileTabId?: string;
  profileContent?: ReactNode;
  dataTabs?: SettingsTemplateDataTabConfig[];
  feedbackMessages?: Partial<SettingsTemplateFeedbackMessages>;
  onSaveNotifications?: () => void;
  onSaveUsers?: () => void;
  onSaveSecurity?: () => void;
}

export const SettingsPageTemplate = ({
  tone = "default",
  showFeedback = true,
  tabs,
  defaultTabId,
  notificationsTabId,
  usersTabId,
  securityTabId,
  notificationPreferences,
  userAccess,
  securityTips,
  profileTabId,
  profileContent,
  dataTabs = [],
  feedbackMessages,
  onSaveNotifications,
  onSaveUsers,
  onSaveSecurity,
}: SettingsPageTemplateProps) => {
  const messages = {
    ...defaultSettingsTemplateFeedbackMessages,
    ...feedbackMessages,
  };

  const [activeTab, setActiveTab] = useState(defaultTabId);

  const [notificationState, setNotificationState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notificationPreferences.map((item) => [item.id, item.enabled])),
  );

  const [users, setUsers] = useState<SettingsUserAccess[]>(userAccess);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const [isDataEditing, setIsDataEditing] = useState(false);
  const [dataValues, setDataValues] = useState<Record<string, string>>(() =>
    createSettingsTemplateDataValueMap(dataTabs),
  );
  const [dataDraft, setDataDraft] = useState<Record<string, string>>(() =>
    createSettingsTemplateDataValueMap(dataTabs),
  );

  const selectedDataTab = useMemo(
    () => dataTabs.find((tab) => tab.id === activeTab) ?? null,
    [activeTab, dataTabs],
  );

  const selectedDataOptions = useMemo(() => {
    if (!selectedDataTab) {
      return [];
    }

    return selectedDataTab.options.map((option) => {
      const optionKey = `${selectedDataTab.id}:${option.label}`;

      return {
        ...option,
        value: isDataEditing ? dataDraft[optionKey] ?? option.value : dataValues[optionKey] ?? option.value,
      };
    });
  }, [selectedDataTab, isDataEditing, dataDraft, dataValues]);

  const handleSaveNotifications = () => {
    onSaveNotifications?.();
    setFeedback({ message: messages.notificationsSaved, success: true });
  };

  const handleToggleUser = (id: string) => {
    setUsers((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              active: !item.active,
            }
          : item,
      ),
    );
  };

  const handleSaveUsers = () => {
    onSaveUsers?.();
    setFeedback({ message: messages.usersSaved, success: true });
  };

  const handleSaveSecurity = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setFeedback({ message: messages.securityEmpty, success: false });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ message: messages.securityMismatch, success: false });
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onSaveSecurity?.();
    setFeedback({ message: messages.securitySaved, success: true });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsDataEditing(false);
    setDataDraft(dataValues);
    setFeedback(null);
  };

  const resolvedFeedbackMessage =
    feedback?.success === false
      ? feedback.message
      : showFeedback
        ? feedback?.message ?? null
        : null;

  const resolvedFeedbackSuccess =
    feedback?.success === false ? false : showFeedback ? feedback?.success : undefined;

  return (
    <S.Wrapper>
      <StandardSettingsTabs
        tone={tone}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        profileTabId={profileTabId}
        profileContent={profileContent}
        notificationsTabId={notificationsTabId}
        notifications={notificationPreferences.map((item) => ({
          ...item,
          enabled: notificationState[item.id] ?? item.enabled,
        }))}
        onToggleNotification={(id) => setNotificationState((previous) => ({
          ...previous,
          [id]: !previous[id],
        }))}
        onSaveNotifications={handleSaveNotifications}
        usersTabId={usersTabId}
        users={users}
        onToggleUser={handleToggleUser}
        onSaveUsers={handleSaveUsers}
        securityTabId={securityTabId}
        securityTips={securityTips}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onCurrentPasswordChange={setCurrentPassword}
        onNewPasswordChange={setNewPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onSaveSecurity={handleSaveSecurity}
        hotelDataTabId={dataTabs[0]?.id}
        adminDataTabId={dataTabs[1]?.id}
        dataOptions={selectedDataOptions}
        dataEditable={selectedDataTab?.editable}
        restrictedNotice={selectedDataTab?.restrictedNotice}
        dataEditMode={isDataEditing}
        onStartDataEdit={() => setIsDataEditing(true)}
        onCancelDataEdit={() => {
          setDataDraft(dataValues);
          setIsDataEditing(false);
        }}
        onSaveDataEdit={() => {
          setDataValues(dataDraft);
          setIsDataEditing(false);
          setFeedback({ message: messages.dataSaved, success: true });
        }}
        onDataValueChange={(label, value) => {
          if (!selectedDataTab) {
            return;
          }

          const optionKey = `${selectedDataTab.id}:${label}`;

          setDataDraft((previous) => ({
            ...previous,
            [optionKey]: value,
          }));
        }}
        feedbackMessage={resolvedFeedbackMessage}
        feedbackSuccess={resolvedFeedbackSuccess}
      />
    </S.Wrapper>
  );
};
