import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  ListChecks,
  MapPin,
  MessageSquare,
  Star,
  Target,
  Users,
} from "lucide-react";
import { HotelariaDashboardShell } from "@/modules/hotelaria/layout/HotelariaDashboardShell";
import * as S from "./styles";
import { hotelariaDashboardMock } from "@/modules/hotelaria/mocks/dashboard";

export const HotelariaDashboardPage = () => {
  const navigate = useNavigate();

  const pendingShiftCount = hotelariaDashboardMock.upcomingShifts.filter(
    (item) => item.status === "Pendente",
  ).length;
  const readyShiftCount = hotelariaDashboardMock.upcomingShifts.length - pendingShiftCount;
  const urgentAlertCount = hotelariaDashboardMock.alerts.filter((item) => item.tone === "warning").length;
  const nextShiftDate = hotelariaDashboardMock.upcomingShifts[0]?.date ?? "Agenda em atualizacao";

  const statIconMap = {
    users: Users,
    "map-pin": MapPin,
    building: Building,
    "check-circle": CheckCircle,
  } as const;

  const statColorMap = {
    blue: "#F96F26",
    green: "#17A766",
    purple: "#D46E44",
    orange: "#F96F26",
  } as const;

  const toolIconMap = {
    calendar: Calendar,
    users: Users,
    "bar-chart-3": BarChart3,
    "file-text": FileText,
    "dollar-sign": DollarSign,
    "message-square": MessageSquare,
  } as const;

  const toolColorMap = {
    blue: "#F96F26",
    green: "#17A766",
    purple: "#E1697C",
    orange: "#F96F26",
    yellow: "#E39A12",
    indigo: "#D46E44",
  } as const;

  return (
    <HotelariaDashboardShell
      userName={hotelariaDashboardMock.userName}
      pageTitle={hotelariaDashboardMock.title}
      pageDescription={hotelariaDashboardMock.description}
      stats={[]}
    >
      <S.Wrapper>
        <S.SummaryStrip>
          <S.SummaryCard>
            <strong>Escalas prontas</strong>
            <h3>{readyShiftCount}</h3>
            <p>Escalas aprovadas para as próximas operações.</p>
          </S.SummaryCard>

          <S.SummaryCard>
            <strong>Pendências imediatas</strong>
            <h3>{pendingShiftCount + urgentAlertCount}</h3>
            <p>Somatorio de escalas pendentes e alertas prioritarios.</p>
          </S.SummaryCard>

          <S.SummaryCard>
            <strong>Próxima janela operacional</strong>
            <h3>{nextShiftDate}</h3>
            <p>Base para alinhamento de equipe e distribuicao de atividades.</p>
          </S.SummaryCard>
        </S.SummaryStrip>

        <S.SurfaceCard>
          <S.CardTitle>
            <S.CardTitleRow>
              <S.TitleIconWrap>
                <Target size={18} />
              </S.TitleIconWrap>
              <h3>Impacto da plataforma</h3>
            </S.CardTitleRow>
          </S.CardTitle>

          <S.ImpactGrid>
            {hotelariaDashboardMock.platformStats.map((item) => {
              const Icon = statIconMap[item.icon];

              return (
                <S.ImpactItem key={item.title}>
                  <S.ImpactIconWrap style={{ color: statColorMap[item.color] }}>
                    <Icon size={20} />
                  </S.ImpactIconWrap>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                </S.ImpactItem>
              );
            })}
          </S.ImpactGrid>
        </S.SurfaceCard>

        <S.MainGrid>
          <S.SurfaceCard>
            <S.CardTitle>
              <S.CardTitleRow>
                <S.TitleIconWrap>
                  <Clock size={18} />
                </S.TitleIconWrap>
                <h3>Próximas escalas</h3>
              </S.CardTitleRow>
            </S.CardTitle>

            <S.ShiftList>
              {hotelariaDashboardMock.upcomingShifts.map((item) => (
                <S.ShiftItem key={`${item.title}-${item.date}`}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.date}</p>
                  </div>

                  <S.ShiftBadge $tone={item.status === "Pronta" ? "success" : "warning"}>
                    {item.status}
                  </S.ShiftBadge>
                </S.ShiftItem>
              ))}
            </S.ShiftList>
          </S.SurfaceCard>

          <S.SurfaceCard>
            <S.CardTitle>
              <S.CardTitleRow>
                <S.TitleIconWrap>
                  <Star size={18} />
                </S.TitleIconWrap>
                <h3>Top recreadores do mês</h3>
              </S.CardTitleRow>
            </S.CardTitle>

            <S.TeamList>
              {hotelariaDashboardMock.topRecreadores.map((item, index) => (
                <S.TeamItem key={item.name}>
                  <S.TeamPosition $rank={index + 1}>{index + 1}o</S.TeamPosition>

                  <S.TeamMeta>
                    <strong>{item.name}</strong>
                    <p>
                      {item.specialties.join(", ")} • {item.location}
                    </p>
                  </S.TeamMeta>

                  <S.TeamStats>
                    <strong>{item.rating}</strong>
                    <span>{item.events} eventos</span>
                  </S.TeamStats>
                </S.TeamItem>
              ))}
            </S.TeamList>
          </S.SurfaceCard>

          <S.SurfaceCard>
            <S.CardTitle>
              <S.CardTitleRow>
                <S.TitleIconWrap>
                  <ListChecks size={18} />
                </S.TitleIconWrap>
                <h3>Próximo evento</h3>
              </S.CardTitleRow>
            </S.CardTitle>

            <S.NextEventHead>
              <strong>{hotelariaDashboardMock.nextEvent.title}</strong>
              <span>{hotelariaDashboardMock.nextEvent.date}</span>
            </S.NextEventHead>

            <S.Checklist>
              {hotelariaDashboardMock.nextEvent.checklist.map((item) => (
                <S.ChecklistItem key={item.label} $done={item.done}>
                  <i>{item.done ? "✓" : "•"}</i>
                  <span>{item.label}</span>
                </S.ChecklistItem>
              ))}
            </S.Checklist>
          </S.SurfaceCard>

          <S.SurfaceCard>
            <S.CardTitle>
              <S.CardTitleRow>
                <S.TitleIconWrap>
                  <Target size={18} />
                </S.TitleIconWrap>
                <h3>Comunicações e alertas</h3>
              </S.CardTitleRow>
            </S.CardTitle>

            <S.AlertList>
              {hotelariaDashboardMock.alerts.map((item) => (
                <S.AlertItem key={item.title} $tone={item.tone}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </S.AlertItem>
              ))}
            </S.AlertList>
          </S.SurfaceCard>

          <S.SurfaceCard>
            <S.CardTitle>
              <S.CardTitleRow>
                <S.TitleIconWrap>
                  <BarChart3 size={18} />
                </S.TitleIconWrap>
                <h3>Relatórios rápidos</h3>
              </S.CardTitleRow>
            </S.CardTitle>

            <S.QuickReportList>
              {hotelariaDashboardMock.quickReports.map((item) => (
                <S.QuickReportItem key={item.title}>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                  <small>{item.helper}</small>
                </S.QuickReportItem>
              ))}
            </S.QuickReportList>
          </S.SurfaceCard>
        </S.MainGrid>

        <S.SurfaceCard>
          <S.ToolsHeader>
            <div>
              <h3>Ferramentas principais</h3>
              <p>Acesse rapidamente os recursos mais utilizados.</p>
            </div>
          </S.ToolsHeader>

          <S.ToolsGrid>
            {hotelariaDashboardMock.tools.map((tool) => (
              <S.ToolButton
                key={tool.title}
                type="button"
                disabled={!tool.to}
                onClick={() => {
                  if (tool.to) {
                    navigate(tool.to);
                  }
                }}
              >
                <S.ToolIconWrap style={{ color: toolColorMap[tool.color] }}>
                  {(() => {
                    const Icon = toolIconMap[tool.icon];
                    return <Icon size={18} />;
                  })()}
                </S.ToolIconWrap>

                <S.ToolContent>
                  <strong>{tool.title}</strong>
                  <p>{tool.description}</p>
                </S.ToolContent>
              </S.ToolButton>
            ))}
          </S.ToolsGrid>
        </S.SurfaceCard>
      </S.Wrapper>
    </HotelariaDashboardShell>
  );
};
