import { useNavigate } from "react-router-dom";
import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { UnderConstructionPageTemplate } from "@/shared/pages/UnderConstructionPageTemplate";
import { empresarioGaleriaPageMock } from "@/modules/empresa/mocks/galeria";
import * as S from "./styles";

export const EmpresarioGaleriaPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardShell
      userName={empresarioGaleriaPageMock.userName}
      pageTitle={empresarioGaleriaPageMock.title}
      pageDescription={empresarioGaleriaPageMock.description}
      stats={empresarioGaleriaPageMock.stats}
    >
      <S.Wrapper>
        <UnderConstructionPageTemplate
          subtitle={empresarioGaleriaPageMock.subtitle}
          message={empresarioGaleriaPageMock.message}
          onBack={() => navigate("/app/empresa")}
        />
      </S.Wrapper>
    </DashboardShell>
  );
};
