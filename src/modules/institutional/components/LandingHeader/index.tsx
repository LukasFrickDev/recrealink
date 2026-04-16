import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import * as S from "./styles";

interface LandingHeaderProps {
  links: Array<{ id: string; label: string }>;
}

export const LandingHeader = ({ links }: LandingHeaderProps) => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <S.Header>
      <S.Container>
        <S.Brand to="/">RecreaLink</S.Brand>

        <S.Nav>
          {links.map((link) => (
            <button key={link.id} type="button" onClick={() => scrollToSection(link.id)}>
              {link.label}
            </button>
          ))}
        </S.Nav>

        <S.Actions>
          <Link to="/acesso/entrar">
            <Button variant="outline" size="sm">
              Entrar
            </Button>
          </Link>
          <Link to="/acesso/cadastro">
            <Button size="sm">Cadastrar</Button>
          </Link>
        </S.Actions>
      </S.Container>
    </S.Header>
  );
};
