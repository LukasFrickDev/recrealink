import type { PropsWithChildren } from "react";
import * as S from "./styles";

interface AccessLayoutProps {
  title: string;
  subtitle: string;
}

export const AccessLayout = ({ title, subtitle, children }: PropsWithChildren<AccessLayoutProps>) => {
  return (
    <S.Page>
      <S.Card>
        <S.Intro>
          <h1>RecreaLink</h1>
          <p>Conectando recreadores a oportunidades com fluxo simples e visual.</p>

          <S.IntroList>
            <li>
              <strong>+1.200 recreadores ativos</strong>
              <span>Rede nacional em crescimento continuo.</span>
            </li>
            <li>
              <strong>22+ ferramentas visuais</strong>
              <span>Organizacao de agenda, vagas e dashboards por perfil.</span>
            </li>
            <li>
              <strong>Fluxos separados por perfil</strong>
              <span>Recreador, hotelaria, empresa e pais em um so produto.</span>
            </li>
          </S.IntroList>
        </S.Intro>

        <S.FormColumn>
          <header>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </header>
          {children}
        </S.FormColumn>
      </S.Card>
    </S.Page>
  );
};
