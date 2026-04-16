import { CheckCircle2, PencilLine, Save, Shield, UserCog, X } from "lucide-react";
import { SettingsLayoutBase } from "@/shared/layouts/SettingsLayoutBase";
import * as S from "./styles";

export interface SettingsTabOption {
  label: string;
  value: string;
  helper?: string;
}

export interface SettingsNotificationPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface SettingsUserAccess {
  id: string;
  name: string;
  role: string;
  email: string;
  active: boolean;
}

export interface SettingsBaseTabConfig {
  id: string;
  label: string;
  helper: string;
}

interface StandardSettingsTabsProps {
  tone?: "default" | "hotelaria" | "pais";
  tabs: SettingsBaseTabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  profileTabId?: string;
  profileContent?: React.ReactNode;
  notificationsTabId: string;
  notifications: SettingsNotificationPreference[];
  onToggleNotification: (id: string) => void;
  onSaveNotifications: () => void;
  usersTabId: string;
  users: SettingsUserAccess[];
  onToggleUser: (id: string) => void;
  onSaveUsers: () => void;
  securityTabId: string;
  securityTips: string[];
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSaveSecurity: () => void;
  hotelDataTabId?: string;
  adminDataTabId?: string;
  dataOptions?: SettingsTabOption[];
  dataEditable?: boolean;
  restrictedNotice?: string;
  dataEditMode?: boolean;
  onStartDataEdit?: () => void;
  onCancelDataEdit?: () => void;
  onSaveDataEdit?: () => void;
  onDataValueChange?: (label: string, value: string) => void;
  feedbackMessage?: string | null;
  feedbackSuccess?: boolean;
}

const isDataTab = (tabId: string, hotelDataTabId?: string, adminDataTabId?: string) => {
  if (!hotelDataTabId || !adminDataTabId) {
    return false;
  }

  return tabId === hotelDataTabId || tabId === adminDataTabId;
};

export const StandardSettingsTabs = ({
  tone = "default",
  tabs,
  activeTab,
  onTabChange,
  profileTabId,
  profileContent,
  notificationsTabId,
  notifications,
  onToggleNotification,
  onSaveNotifications,
  usersTabId,
  users,
  onToggleUser,
  onSaveUsers,
  securityTabId,
  securityTips,
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSaveSecurity,
  hotelDataTabId,
  adminDataTabId,
  dataOptions,
  dataEditable,
  restrictedNotice,
  dataEditMode,
  onStartDataEdit,
  onCancelDataEdit,
  onSaveDataEdit,
  onDataValueChange,
  feedbackMessage,
  feedbackSuccess,
}: StandardSettingsTabsProps) => {
  const currentIsDataTab = isDataTab(activeTab, hotelDataTabId, adminDataTabId);

  const renderDataTopControl = () => {
    if (!currentIsDataTab) {
      return null;
    }

    if (dataEditable) {
      if (dataEditMode) {
        return (
          <S.HeaderActions>
            <S.HeaderSecondaryAction type="button" onClick={onCancelDataEdit}>
              <X size={14} />
              Cancelar
            </S.HeaderSecondaryAction>
            <S.HeaderPrimaryAction type="button" onClick={onSaveDataEdit}>
              <Save size={14} />
              Salvar alterações
            </S.HeaderPrimaryAction>
          </S.HeaderActions>
        );
      }

      return (
        <S.HeaderPrimaryAction type="button" onClick={onStartDataEdit}>
          <PencilLine size={14} />
          Editar dados
        </S.HeaderPrimaryAction>
      );
    }

    return <S.HeaderBadge $tone="warning">Somente administrador da conta</S.HeaderBadge>;
  };

  return (
    <SettingsLayoutBase
      tone={tone}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
    >
      {profileTabId && activeTab === profileTabId ? (
        <S.Section>{profileContent}</S.Section>
      ) : null}

      {currentIsDataTab ? (
        <S.Section>
          <S.DataTopBar>{renderDataTopControl()}</S.DataTopBar>

          {!dataEditable && restrictedNotice ? <S.RestrictedNotice>{restrictedNotice}</S.RestrictedNotice> : null}

          <S.DataList>
            {(dataOptions ?? []).map((option) => (
              <S.DataItem key={option.label}>
                <div>
                  <span>{option.label}</span>
                  {option.helper ? <p>{option.helper}</p> : null}
                </div>
                <S.DataInput
                  value={option.value}
                  disabled={!dataEditable || !dataEditMode}
                  onChange={(event) => onDataValueChange?.(option.label, event.target.value)}
                />
              </S.DataItem>
            ))}
          </S.DataList>
        </S.Section>
      ) : null}

      {activeTab === notificationsTabId ? (
        <S.Section>
          <S.PreferenceList>
            {notifications.map((item) => (
              <S.PreferenceItem key={item.id}>
                <S.PreferenceText>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </S.PreferenceText>

                <S.SwitchButton
                  type="button"
                  $active={item.enabled}
                  onClick={() => onToggleNotification(item.id)}
                  aria-label={`Alternar ${item.title}`}
                >
                  <i />
                </S.SwitchButton>
              </S.PreferenceItem>
            ))}
          </S.PreferenceList>

          <S.ActionsRow>
            <S.PrimaryButton type="button" onClick={onSaveNotifications}>
              <CheckCircle2 size={14} /> Salvar notificações
            </S.PrimaryButton>
          </S.ActionsRow>
        </S.Section>
      ) : null}

      {activeTab === usersTabId ? (
        <S.Section>
          <S.UserList>
            {users.map((item) => (
              <S.UserItem key={item.id}>
                <S.UserTop>
                  <strong>{item.name}</strong>
                  <S.StatusTag $active={item.active}>{item.active ? "Ativo" : "Inativo"}</S.StatusTag>
                </S.UserTop>
                <S.UserMeta>
                  <span>{item.role}</span>
                  <span>{item.email}</span>
                </S.UserMeta>
                <S.OutlineButton type="button" onClick={() => onToggleUser(item.id)}>
                  <UserCog size={14} /> {item.active ? "Desativar" : "Ativar"} usuário
                </S.OutlineButton>
              </S.UserItem>
            ))}
          </S.UserList>

          <S.ActionsRow>
            <S.PrimaryButton type="button" onClick={onSaveUsers}>
              <CheckCircle2 size={14} /> Salvar usuários
            </S.PrimaryButton>
          </S.ActionsRow>
        </S.Section>
      ) : null}

      {activeTab === securityTabId ? (
        <S.Section>
          <S.InputRow>
            <S.Field>
              <span>Senha atual</span>
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => onCurrentPasswordChange(event.target.value)}
                autoComplete="current-password"
              />
            </S.Field>

            <S.Field>
              <span>Nova senha</span>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => onNewPasswordChange(event.target.value)}
                autoComplete="new-password"
              />
            </S.Field>
          </S.InputRow>

          <S.Field>
            <span>Confirmar nova senha</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
              autoComplete="new-password"
            />
          </S.Field>

          <S.SecurityTips>
            {securityTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </S.SecurityTips>

          <S.ActionsRow>
            <S.PrimaryButton type="button" onClick={onSaveSecurity}>
              <Shield size={14} /> Atualizar segurança
            </S.PrimaryButton>
          </S.ActionsRow>
        </S.Section>
      ) : null}

      {feedbackMessage ? <S.Feedback $success={feedbackSuccess}>{feedbackMessage}</S.Feedback> : null}
    </SettingsLayoutBase>
  );
};
