import { Building2, Hotel, UserRound } from "lucide-react";
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
        <S.Kicker>Conecte · Organize · Profissionalize</S.Kicker>
        <h2>Feche o próximo ciclo da sua operação com mais clareza</h2>
        <p>
          Uma homepage institucional forte abre portas para contratação, gestão e confiança entre
          recreadores, hotelaria, empresas e famílias.
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
            <Button size="lg">
              <UserRound size={16} /> Sou Recreador
            </Button>
          </Link>
          <Link to="/acesso/escolher-perfil">
            <Button variant="outline" size="lg">
              <Hotel size={16} /> Sou Contratante
            </Button>
          </Link>
          <Link to="/acesso/escolher-perfil">
            <Button variant="outline" size="lg">
              <Building2 size={16} /> Tenho uma Empresa
            </Button>
          </Link>
        </S.Actions>
      </S.Container>
    </S.Section>
  );
};
