import {
  paisPendingReviewsDomainMock,
  paisPublishedReviewsDomainMock,
} from "@/shared/mocks/domains/interacoes";

const pendingReviews = paisPendingReviewsDomainMock;

const publishedReviews = paisPublishedReviewsDomainMock;

export const paisAvaliacoesMock = {
  userName: "Lúcia Fernandes",
  title: "Avaliações",
  description:
    "Avalie experiências com empresas, recreadores e hotéis para contratar com mais segurança.",
  stats: [
    {
      title: "Avaliações publicadas",
      value: String(publishedReviews.length),
      helper: "Contribuições da família",
    },
    { title: "Pendentes", value: String(pendingReviews.length).padStart(2, "0"), helper: "Aguardando preenchimento" },
    {
      title: "Média dos fornecedores",
      value:
        (publishedReviews.reduce((sum, review) => sum + review.score, 0) /
          Math.max(publishedReviews.length, 1))
          .toFixed(1)
          .replace(".", ","),
      helper: "Com base nos seus eventos",
    },
    { title: "Feedbacks recebidos", value: "09", helper: "Retornos das equipes" },
  ],
  pendingReviews,
  publishedReviews,
  receivedFeedbacks: [
    "Família pontual e muito colaborativa durante toda a execução.",
    "Excelente organização de espaço e comunicação antes do evento.",
    "Briefing claro sobre faixa etária e preferências das crianças.",
  ],
};
