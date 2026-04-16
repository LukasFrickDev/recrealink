import { useNavigate } from "react-router-dom";
import { EmpresarioDashboardShell as DashboardShell } from "@/modules/empresa/layout/EmpresarioDashboardShell";
import { UnderConstructionPageTemplate } from "@/shared/pages/UnderConstructionPageTemplate";
import { empresarioFinancasPageMock } from "@/modules/empresa/mocks/financas";
import * as S from "./styles";

export const EmpresarioFinancasPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardShell
      userName={empresarioFinancasPageMock.userName}
      pageTitle={empresarioFinancasPageMock.title}
      pageDescription={empresarioFinancasPageMock.description}
      stats={empresarioFinancasPageMock.stats}
    >
      <S.Wrapper>
        <UnderConstructionPageTemplate
          subtitle={empresarioFinancasPageMock.subtitle}
          message={empresarioFinancasPageMock.message}
          onBack={() => navigate("/app/empresa")}
        />
      </S.Wrapper>
    </DashboardShell>
  );
};
