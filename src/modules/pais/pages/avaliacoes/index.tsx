import { Star } from "lucide-react";
import { Badge, Card } from "@/shared/ui";
import { PaisDashboardShell } from "@/modules/pais/layout/PaisDashboardShell";
import { paisAvaliacoesMock } from "@/modules/pais/mocks/avaliacoes";
import * as S from "./styles";

const renderStars = (score: number) =>
  Array.from({ length: 5 }, (_, index) => (
    <Star key={`${score}-${index}`} size={13} fill={index < score ? "currentColor" : "none"} />
  ));

export const PaisAvaliacoesPage = () => {
  return (
    <PaisDashboardShell
      userName={paisAvaliacoesMock.userName}
      pageTitle={paisAvaliacoesMock.title}
      pageDescription={paisAvaliacoesMock.description}
      stats={paisAvaliacoesMock.stats}
    >
      <S.Wrapper>
        <S.HeaderRow>
          <div>
            <h3>Avaliações da família</h3>
            <p>Registre feedbacks, acompanhe retornos e fortaleça suas próximas decisões.</p>
          </div>
          <S.NewReviewButton type="button">Nova avaliação</S.NewReviewButton>
        </S.HeaderRow>

        <S.MainGrid>
          <Card title="Avaliações pendentes" subtitle="Eventos que ainda precisam de feedback">
            <S.PendingList>
              {paisAvaliacoesMock.pendingReviews.map((item) => (
                <S.PendingItem key={item.id}>
                  <div>
                    <strong>{item.event}</strong>
                    <span>{item.company}</span>
                    <p>{item.deadline}</p>
                  </div>
                  <button type="button">Avaliar agora</button>
                </S.PendingItem>
              ))}
            </S.PendingList>
          </Card>

          <Card title="Histórico de avaliações" subtitle="Comentários publicados pela família">
            <S.ReviewList>
              {paisAvaliacoesMock.publishedReviews.map((item) => (
                <S.ReviewItem key={item.id}>
                  <S.ReviewTop>
                    <div>
                      <h4>{item.event}</h4>
                      <p>{item.company}</p>
                    </div>

                    <S.ReviewBadges>
                      <Badge tone={item.status === "Publicado" ? "success" : "warning"}>{item.status}</Badge>
                      <Badge tone="brand">{item.date}</Badge>
                    </S.ReviewBadges>
                  </S.ReviewTop>

                  <S.Score>{renderStars(item.score)}</S.Score>
                  <S.Comment>{item.comment}</S.Comment>

                  <S.MetaRow>
                    <span>{item.helpfulCount} marcaram como útil</span>
                    <small>Nota {item.score},0</small>
                  </S.MetaRow>

                  <S.ActionRow>
                    <span>{item.likes} curtidas</span>
                    <div>
                      <button type="button">Compartilhar</button>
                      {item.status === "Rascunho" ? <button type="button">Publicar</button> : null}
                    </div>
                  </S.ActionRow>
                </S.ReviewItem>
              ))}
            </S.ReviewList>
          </Card>

          <Card title="Feedback recebido" subtitle="Percepções das empresas sobre a família">
            <S.FeedbackList>
              {paisAvaliacoesMock.receivedFeedbacks.map((feedback) => (
                <li key={feedback}>{feedback}</li>
              ))}
            </S.FeedbackList>
          </Card>
        </S.MainGrid>
      </S.Wrapper>
    </PaisDashboardShell>
  );
};
