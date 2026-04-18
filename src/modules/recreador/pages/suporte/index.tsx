import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import { setLastVisualAction } from "@/app/store/slices/recreadorSlice";
import { RecreadorDashboardShell } from "@/modules/recreador/layout/RecreadorDashboardShell/index";
import { recreadorSupportMock } from "@/modules/recreador/mocks/suporte";
import { useToast } from "@/shared/ui/Toast";
import * as S from "./styles";

export const RecreadorSupportPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { success, warning } = useToast();
  const knowledgeBaseRef = useRef<HTMLElement | null>(null);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  const resetFormulario = () => {
    setNomeCompleto("");
    setEmail("");
    setAssunto("");
    setMensagem("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!nomeCompleto || !email || !assunto || !mensagem) {
      warning({
        title: "Dados incompletos",
        description: "Preencha nome, e-mail, assunto e mensagem para enviar o chamado.",
      });
      return;
    }

    setEnviado(true);
    dispatch(setLastVisualAction("Chamado enviado para o suporte."));
    success({
      title: "Chamado enviado",
      description: "Sua solicitação foi registrada e entrou na fila de atendimento.",
    });
  };

  const handleAbrirCanal = (canalId: string) => {
    if (canalId === "email") {
	  const mailSubject = encodeURIComponent("Suporte Recreador - RecreaLink");
	  const mailBody = encodeURIComponent(
	    "Olá, preciso de ajuda no módulo Recreador.\n\nDescreva abaixo:\n- Tela\n- Ação\n- Resultado esperado\n- Resultado atual",
	  );

      window.location.href = `mailto:suporte@recrealink.com?subject=${mailSubject}&body=${mailBody}`;
      dispatch(setLastVisualAction("Canal de e-mail aberto para contato com o suporte."));
      return;
    }

    if (canalId === "chat") {
      navigate("/app/recreador/chat");
      dispatch(setLastVisualAction("Redirecionado para o chat de atendimento do módulo."));
      return;
    }

    if (canalId === "base") {
      knowledgeBaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      dispatch(setLastVisualAction("Base de conhecimento aberta na página de suporte."));
      return;
    }

    if (canalId === "notifications") {
      navigate("/app/recreador/notificacoes");
      dispatch(setLastVisualAction("Redirecionado para notificações do módulo."));
      return;
    }

    setAssunto("duvida-tecnica");
    setMensagem("Olá, gostaria de suporte com meu perfil e portfólio.");
    setEnviado(false);
  };

  return (
    <RecreadorDashboardShell
      pageTitle={recreadorSupportMock.title}
      pageDescription={recreadorSupportMock.description}
      stats={recreadorSupportMock.stats}
    >
      <S.Wrapper>
        <S.HeaderCard $success={enviado}>
          <S.HeaderTop>
            <S.IconWrap $success={enviado}>
              {enviado ? <CheckCircle2 size={22} /> : <HelpCircle size={22} />}
            </S.IconWrap>
            <div>
              <h2>Central de suporte</h2>
              <p>
                {enviado
                  ? "Chamado enviado. Abra um novo chamado se precisar complementar informações."
                  : "Envie dúvidas técnicas ou operacionais para o time de suporte."}
              </p>
            </div>
          </S.HeaderTop>

          {enviado ? (
            <S.SubmitButton
              type="button"
              onClick={() => {
                resetFormulario();
                setEnviado(false);
              }}
            >
              Enviar novo chamado
            </S.SubmitButton>
          ) : null}
        </S.HeaderCard>

        {!enviado ? (
          <S.SectionCard>
            <S.SectionTitle>Formulário de contato</S.SectionTitle>
            <S.Form onSubmit={handleSubmit}>
              <S.Field>
                <span>Nome completo</span>
                <input
                  value={nomeCompleto}
                  onChange={(event) => setNomeCompleto(event.target.value)}
                  placeholder="Digite seu nome completo"
                />
              </S.Field>

              <S.Field>
                <span>E-mail</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="seu@email.com"
                />
              </S.Field>

              <S.Field>
                <span>Assunto</span>
                <select value={assunto} onChange={(event) => setAssunto(event.target.value)}>
                  <option value="">Selecione o assunto</option>
                  {recreadorSupportMock.assuntos.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </S.Field>

              <S.Field>
                <span>Mensagem detalhada</span>
                <textarea
                  value={mensagem}
                  onChange={(event) => setMensagem(event.target.value)}
                  maxLength={500}
                  placeholder="Descreva com detalhes a dúvida, erro ou sugestão."
                />
                <S.Counter>{mensagem.length}/500</S.Counter>
              </S.Field>

              <S.SubmitButton type="submit" disabled={!nomeCompleto || !email || !assunto || !mensagem}>
                Enviar mensagem
              </S.SubmitButton>
            </S.Form>
          </S.SectionCard>
        ) : null}

        <S.SectionCard>
          <S.SectionTitle>Canais de apoio</S.SectionTitle>
          <S.ChannelsGrid>
            {recreadorSupportMock.canais.map((canal) => (
              <S.ChannelCard key={canal.id}>
                <strong>{canal.title}</strong>
                <p>{canal.description}</p>
                <S.ChannelButton type="button" onClick={() => handleAbrirCanal(canal.id)}>
                  Abrir canal
                </S.ChannelButton>
              </S.ChannelCard>
            ))}
          </S.ChannelsGrid>
        </S.SectionCard>

        <S.SectionCard ref={knowledgeBaseRef}>
          <S.SectionTitle>Base de conhecimento</S.SectionTitle>
          <S.KnowledgeGrid>
            {recreadorSupportMock.knowledgeBase.map((article) => (
              <S.KnowledgeItem key={article.id}>
                <strong>{article.title}</strong>
                <p>{article.description}</p>
                <S.ChannelButton type="button" onClick={() => navigate(article.route)}>
                  Abrir artigo
                </S.ChannelButton>
              </S.KnowledgeItem>
            ))}
          </S.KnowledgeGrid>
        </S.SectionCard>
      </S.Wrapper>
    </RecreadorDashboardShell>
  );
};
