import { CheckCircle2, LogOut, PencilLine, Save, Shield, Trash2, UserCog, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  accountTabId?: string;
  onRequestLogout?: () => void;
  onRequestAccountDeletion?: () => void;
  accountDeletionKeyword?: string;
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
  accountTabId,
  onRequestLogout,
  onRequestAccountDeletion,
  accountDeletionKeyword = "EXCLUIR",
}: StandardSettingsTabsProps) => {
  const currentIsDataTab = isDataTab(activeTab, hotelDataTabId, adminDataTabId);
  const [isLogoutConfirming, setIsLogoutConfirming] = useState(false);
  const [isDeletionConfirming, setIsDeletionConfirming] = useState(false);
  const [deletionDraft, setDeletionDraft] = useState("");
  const [accountFeedback, setAccountFeedback] = useState<{ message: string; success: boolean } | null>(null);

  useEffect(() => {
    if (!accountTabId || activeTab === accountTabId) {
      return;
    }

    setIsLogoutConfirming(false);
    setIsDeletionConfirming(false);
    setDeletionDraft("");
    setAccountFeedback(null);
  }, [accountTabId, activeTab]);

  const canConfirmDeletion = deletionDraft.trim().toUpperCase() === accountDeletionKeyword;

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

  const handleConfirmLogout = () => {
    onRequestLogout?.();
    setIsLogoutConfirming(false);
    setAccountFeedback({
      message: "Sessão encerrada para esta conta.",
      success: true,
    });
  };

  const handleConfirmDeletion = () => {
    if (!canConfirmDeletion) {
      setAccountFeedback({
        message: `Digite ${accountDeletionKeyword} para confirmar a exclusão da conta.`,
        success: false,
      });
      return;
    }

    onRequestAccountDeletion?.();
    setDeletionDraft("");
    setIsDeletionConfirming(false);
    setAccountFeedback({
      message: "Solicitação de exclusão registrada para a próxima etapa funcional.",
      success: true,
    });
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

      {accountTabId && activeTab === accountTabId ? (
        <S.Section>
          <S.AccountCard>
            <S.AccountCardHeading>
              <strong>Logout</strong>
              <p>Encerre a sessão atual e retorne para a seleção de perfil.</p>
            </S.AccountCardHeading>

            {isLogoutConfirming ? (
              <S.ActionsRow>
                <S.OutlineButton type="button" onClick={() => setIsLogoutConfirming(false)}>
                  <X size={14} /> Cancelar
                </S.OutlineButton>
                <S.PrimaryButton type="button" onClick={handleConfirmLogout}>
                  <LogOut size={14} /> Confirmar logout
                </S.PrimaryButton>
              </S.ActionsRow>
            ) : (
              <S.ActionsRow>
                <S.OutlineButton
                  type="button"
                  onClick={() => {
                    setIsLogoutConfirming(true);
                    setAccountFeedback(null);
                  }}
                >
                  <LogOut size={14} /> Sair da conta
                </S.OutlineButton>
              </S.ActionsRow>
            )}
          </S.AccountCard>

          <S.AccountCard $danger>
            <S.AccountCardHeading>
              <strong>Exclusão de conta</strong>
              <p>Essa ação é irreversível quando integrada ao backend.</p>
            </S.AccountCardHeading>

            {isDeletionConfirming ? (
              <>
                <S.AccountDangerHint>
                  Digite <strong>{accountDeletionKeyword}</strong> para confirmar.
                </S.AccountDangerHint>

                <S.Field>
                  <span>Confirmação de exclusão</span>
                  <input
                    value={deletionDraft}
                    onChange={(event) => setDeletionDraft(event.target.value)}
                    placeholder={accountDeletionKeyword}
                  />
                </S.Field>

                <S.ActionsRow>
                  <S.OutlineButton
                    type="button"
                    onClick={() => {
                      setIsDeletionConfirming(false);
                      setDeletionDraft("");
                    }}
                  >
                    <X size={14} /> Cancelar
                  </S.OutlineButton>
                  <S.DangerButton type="button" onClick={handleConfirmDeletion} disabled={!canConfirmDeletion}>
                    <Trash2 size={14} /> Confirmar exclusão
                  </S.DangerButton>
                </S.ActionsRow>
              </>
            ) : (
              <S.ActionsRow>
                <S.DangerButton
                  type="button"
                  onClick={() => {
                    setIsDeletionConfirming(true);
                    setAccountFeedback(null);
                  }}
                >
                  <Trash2 size={14} /> Solicitar exclusão da conta
                </S.DangerButton>
              </S.ActionsRow>
            )}
          </S.AccountCard>
        </S.Section>
      ) : null}

      {accountFeedback ? <S.Feedback $success={accountFeedback.success}>{accountFeedback.message}</S.Feedback> : null}

      {feedbackMessage ? <S.Feedback $success={feedbackSuccess}>{feedbackMessage}</S.Feedback> : null}
    </SettingsLayoutBase>
  );
};
