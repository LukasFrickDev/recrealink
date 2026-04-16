import type { ReactNode } from "react";
import * as S from "./styles";

export interface SettingsBaseTab {
  id: string;
  label: string;
  helper: string;
}

interface SettingsLayoutBaseProps {
  tabs: SettingsBaseTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tone?: "default" | "hotelaria" | "pais";
  children: ReactNode;
}

export const SettingsLayoutBase = ({
  tabs,
  activeTab,
  onTabChange,
  tone = "default",
  children,
}: SettingsLayoutBaseProps) => {
  return (
    <S.Wrapper $tone={tone}>
      <S.BodyLayout>
        <S.Sidebar>
          {tabs.map((tab) => (
            <S.TabButton
              key={tab.id}
              type="button"
              $active={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              <strong>{tab.label}</strong>
              <span>{tab.helper}</span>
            </S.TabButton>
          ))}
        </S.Sidebar>

        <S.Content>{children}</S.Content>
      </S.BodyLayout>
    </S.Wrapper>
  );
};
