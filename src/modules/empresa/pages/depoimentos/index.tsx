import { useNavigate } from "react-router-dom";
import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { UnderConstructionPageTemplate } from "@/shared/pages/UnderConstructionPageTemplate";
import { empresarioDepoimentosPageMock } from "@/modules/empresa/mocks/depoimentos";
import * as S from "./styles";

export const EmpresarioDepoimentosPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardShell
      userName={empresarioDepoimentosPageMock.userName}
      pageTitle={empresarioDepoimentosPageMock.title}
      pageDescription={empresarioDepoimentosPageMock.description}
      stats={empresarioDepoimentosPageMock.stats}
    >
      <S.Wrapper>
        <UnderConstructionPageTemplate
          subtitle={empresarioDepoimentosPageMock.subtitle}
          message={empresarioDepoimentosPageMock.message}
          onBack={() => navigate("/app/empresa")}
        />
      </S.Wrapper>
    </DashboardShell>
  );
};
