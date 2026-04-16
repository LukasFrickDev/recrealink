import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from './styles';
import { chooseProfileData, chooseProfilePageData } from "@/modules/access/mocks/escolher-perfil";
import { useAppDispatch } from "@/app/store/hooks";
import { type AccessProfile, setSelectedAccessProfile } from "@/app/store/slices/profileSlice";
import { BackNavigation } from "@/modules/access/components/BackNavigation";
import { AccessSnackbar } from "@/modules/access/components/AccessSnackbar";
import { BriefcaseBusiness, Hotel, type LucideIcon, UserCheck, UsersRound } from "lucide-react";
import logoBranca from "@/assets/logo-branca.png";
import heroImage from "@/assets/hero.png";

const profileIconMap: Record<AccessProfile, LucideIcon> = {
  recreador: UserCheck,
  hotelaria: Hotel,
  empresa: BriefcaseBusiness,
  pais: UsersRound,
};

const profileIconColorMap: Record<AccessProfile, string> = {
  recreador: "#2e7ff0",
  hotelaria: "#f96f26",
  empresa: "#8a61d4",
  pais: "#e1697c",
};

export const ChooseProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<AccessProfile | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!warningMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setWarningMessage(null);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [warningMessage]);

  const handleContinue = (route: "/acesso/cadastro" | "/acesso/entrar") => {
    if (!selectedProfile) {
      setWarningMessage(chooseProfilePageData.selectionRequiredMessage);
      return;
    }

    dispatch(setSelectedAccessProfile(selectedProfile));
    navigate(route);
  };

  return (
    <S.Page $backgroundImage={heroImage}>
      <S.Glow data-side="right" />
      <S.Glow data-side="left" />

      <S.Container>
        <S.Brand>
          <img src={logoBranca} alt="RecreaLink" />
          <span>{chooseProfilePageData.brandTagline}</span>
        </S.Brand>

        <S.Panel>
          <S.CardTop>
            <BackNavigation fallbackPath="/" tone="light" />
          </S.CardTop>

          <S.Header>
            <h1>{chooseProfilePageData.title}</h1>
            <p>{chooseProfilePageData.subtitle}</p>
          </S.Header>

          <S.Grid>
            {chooseProfileData.map((item) => {
              const ProfileIcon = profileIconMap[item.id];

              return (
                <S.ProfileCard
                  key={item.id}
                  type="button"
                  $active={item.id === selectedProfile}
                  onClick={() => setSelectedProfile(item.id)}
                >
                  <S.ProfileHead>
                    <S.ProfileLabel>
                      <S.ProfileIconWrap $tone={item.id}>
                        <ProfileIcon size={22} color={profileIconColorMap[item.id]} strokeWidth={2.1} />
                      </S.ProfileIconWrap>
                      <strong>{item.title}</strong>
                    </S.ProfileLabel>

                   
                  </S.ProfileHead>

                  <p>{item.description}</p>
                </S.ProfileCard>
              );
            })}
          </S.Grid>

          <S.Actions>
            <S.ActionButton type="button" onClick={() => handleContinue("/acesso/cadastro")}>
              {chooseProfilePageData.primaryAction}
            </S.ActionButton>

            <S.ActionButton type="button" $secondary onClick={() => handleContinue("/acesso/entrar")}>
              {chooseProfilePageData.secondaryAction}
            </S.ActionButton>
          </S.Actions>

          <S.MobileBackAction>
            <BackNavigation fallbackPath="/" tone="tertiary" />
          </S.MobileBackAction>
        </S.Panel>
      </S.Container>

      <AccessSnackbar message={warningMessage} />
    </S.Page>
  );
};
