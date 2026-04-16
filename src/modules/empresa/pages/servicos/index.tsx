import { useNavigate } from "react-router-dom";
import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { UnderConstructionPageTemplate } from "@/shared/pages/UnderConstructionPageTemplate";
import { empresarioServicosPageMock } from "@/modules/empresa/mocks/servicos";
import * as S from "./styles";

export const EmpresarioServicosPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardShell
      userName={empresarioServicosPageMock.userName}
      pageTitle={empresarioServicosPageMock.title}
      pageDescription={empresarioServicosPageMock.description}
      stats={empresarioServicosPageMock.stats}
    >
      <S.Wrapper>
        <UnderConstructionPageTemplate
          subtitle={empresarioServicosPageMock.subtitle}
          message={empresarioServicosPageMock.message}
          onBack={() => navigate("/app/empresa")}
        />
      </S.Wrapper>
    </DashboardShell>
  );
};
