import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import * as S from "./styles";

interface FinalCTASectionProps {
  stats: Array<{ value: string; label: string }>;
}

export const FinalCTASection = ({ stats }: FinalCTASectionProps) => {
  return (
    <S.Section>
      <S.Container>
        <h2>Conecta Recreadores, Contratantes e Empresas</h2>
        <p>
          A plataforma que conecta e profissionaliza o mercado de recreacao no Brasil para quem
          contrata, executa e acompanha resultados.
        </p>

        <S.StatsGrid>
          {stats.map((item) => (
            <article key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </S.StatsGrid>

        <S.Actions>
          <Link to="/acesso/cadastro">
            <Button size="lg">Sou Recreador</Button>
          </Link>
          <Link to="/acesso/escolher-perfil">
            <Button variant="outline" size="lg">
              Sou Contratante
            </Button>
          </Link>
          <Link to="/acesso/escolher-perfil">
            <Button variant="outline" size="lg">
              Tenho uma Empresa
            </Button>
          </Link>
        </S.Actions>
      </S.Container>
    </S.Section>
  );
};
