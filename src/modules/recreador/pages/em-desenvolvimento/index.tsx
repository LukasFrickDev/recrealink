import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UnderConstructionPageTemplate } from "@/shared/pages/UnderConstructionPageTemplate";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { resolveRecreadorDevelopmentView } from "@/modules/recreador/mocks/em-desenvolvimento";
import * as S from "./styles";

interface RecreadorEmDesenvolvimentoPageProps {
  featureKey?: string;
}

export const RecreadorEmDesenvolvimentoPage = ({
  featureKey,
}: RecreadorEmDesenvolvimentoPageProps) => {
  const navigate = useNavigate();
  const { featureKey: routeFeatureKey } = useParams<{ featureKey?: string }>();

  const view = useMemo(
    () => resolveRecreadorDevelopmentView(featureKey ?? routeFeatureKey),
    [featureKey, routeFeatureKey],
  );

  return (
    <RecreadorDashboardShell
      pageTitle={view.title}
      pageDescription={view.description}
      stats={view.stats}
    >
      <S.Wrapper>
        <UnderConstructionPageTemplate
          subtitle={view.subtitle}
          message={view.message}
          onBack={() => navigate(-1)}
        />
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
