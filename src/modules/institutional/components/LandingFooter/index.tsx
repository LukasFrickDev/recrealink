import * as S from "./styles";

interface LandingFooterProps {
  columns: {
    plataforma: string[];
    suporte: string[];
    contato: string[];
  };
}

export const LandingFooter = ({ columns }: LandingFooterProps) => {
  return (
    <S.Footer id="contato">
      <S.Container>
        <S.BrandColumn>
          <h2>RecreaLink</h2>
          <p>
            22+ ferramentas profissionais para recreadores, hoteis e empresas. Transforme sua carreira ou
            negocio na recreacao.
          </p>
        </S.BrandColumn>

        <S.ListColumn>
          <h3>Plataforma</h3>
          <ul>
            {columns.plataforma.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </S.ListColumn>

        <S.ListColumn>
          <h3>Suporte e Legal</h3>
          <ul>
            {columns.suporte.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </S.ListColumn>

        <S.ListColumn>
          <h3>Contato</h3>
          <ul>
            {columns.contato.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </S.ListColumn>
      </S.Container>

      <S.Bottom>
        <span>© {new Date().getFullYear()} RecreaLink. Todos os direitos reservados.</span>
        <span>CNPJ: 00.000.000/0001-00</span>
      </S.Bottom>
    </S.Footer>
  );
};
