import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Download,
  FileDown,
  Filter,
  PencilLine,
  Plus,
  Save,
  Share2,
  X,
} from "lucide-react";
import { HotelariaDashboardShell } from "@/modules/hotelaria/layout/HotelariaDashboardShell";
import { SettingsPageTemplate } from "@/shared/pages/SettingsPageTemplate";
import { Badge, Card, Input, SectionHeader, Select } from "@/shared/ui";
import {
  getHotelariaFeatureMock,
  type HotelariaMeuHotelLayout,
} from "@/modules/hotelaria/mocks/operacoes";
import * as S from "./styles";

interface HotelariaOperacaoFeaturePageProps {
  featureId: string;
}

const featureStatusToneMap = {
  active: "success",
  planned: "warning",
  parked: "danger",
} as const;

const escalaStatusToneMap = {
  confirmado: "success",
  pendente: "warning",
  em_edicao: "brand",
} as const;

const feedbackTypeToneMap = {
  positivo: "success",
  neutro: "warning",
  negativo: "danger",
} as const;

const roleToneMap = {
  Lider: "brand",
  Apoio: "gray",
  Kids: "purple",
  Children: "orange",
  Teens: "orange",
  Central: "green",
} as const;

const vacancyStatusToneMap = {
  Aberta: "success",
  "Em análise": "warning",
  Preenchida: "brand",
  Encerrada: "neutral",
} as const;

const orcamentoStatusToneMap = {
  Pendente: "warning",
  Aprovado: "success",
  Enviado: "brand",
} as const;

const ocorrenciaStatusToneMap = {
  Aberto: "danger",
  Pendente: "warning",
  Resolvido: "success",
} as const;

const occurrenceSeverityToneMap = {
  Alta: "danger",
  Media: "warning",
  Baixa: "success",
} as const;

const ratingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (index < rating ? "★" : "☆")).join("");
};

const initialsFromName = (name: string) => {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

const parseBRLValue = (value: string) => {
  const normalized = value.replace(/[^\d,]/g, "").replace(",", ".");
  return Number.parseFloat(normalized || "0");
};

const cloneHotelLayout = (layout: HotelariaMeuHotelLayout): HotelariaMeuHotelLayout => {
  return {
    ...layout,
    workingConditions: layout.workingConditions.map((item) => ({ ...item })),
    benefits: [...layout.benefits],
    rules: [...layout.rules],
    requirements: [...layout.requirements],
    facilities: layout.facilities.map((item) => ({ ...item })),
    services: layout.services.map((item) => ({ ...item })),
    gallery: layout.gallery.map((item) => ({ ...item })),
    reviews: layout.reviews.map((item) => ({ ...item })),
    sections: layout.sections.map((item) => ({ ...item, details: [...item.details] })),
  };
};

export const HotelariaOperacaoFeaturePage = ({ featureId }: HotelariaOperacaoFeaturePageProps) => {
  const pageMock = useMemo(() => getHotelariaFeatureMock(featureId), [featureId]);

  const initialMeuHotelLayout = useMemo(() => {
    const base = getHotelariaFeatureMock("meu-hotel").layout;

    return base.type === "meu-hotel" ? cloneHotelLayout(base) : null;
  }, []);

  const [escalasTab, setEscalasTab] = useState<"mes" | "historico">("mes");
  const [recreadoresTab, setRecreadoresTab] = useState<"atuais" | "historico">("atuais");
  const [recreadoresSearch, setRecreadoresSearch] = useState("");
  const [recreadoresStatus, setRecreadoresStatus] = useState<"todos" | "disponivel" | "ocupada">("todos");
  const [vagaFilter, setVagaFilter] = useState<"todas" | "Aberta" | "Em análise" | "Preenchida" | "Encerrada">("todas");
  const [programacoesTab, setProgramacoesTab] = useState<"minhas" | "templates" | "sugestoes" | "calendario">("minhas");
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackType, setFeedbackType] = useState<"todos" | "positivo" | "neutro" | "negativo">("todos");
  const [indicadoresPeriod, setIndicadoresPeriod] = useState("Este mes");
  const [relatoriosPeriod, setRelatoriosPeriod] = useState("Este mes");
  const [orcamentoTab, setOrcamentoTab] = useState<"gastos" | "materiais">("gastos");
  const [isHotelEditing, setIsHotelEditing] = useState(false);
  const [hotelProfileState, setHotelProfileState] = useState<HotelariaMeuHotelLayout | null>(initialMeuHotelLayout);
  const [hotelProfileDraft, setHotelProfileDraft] = useState<HotelariaMeuHotelLayout | null>(initialMeuHotelLayout);

  const updateHotelField = <Key extends keyof HotelariaMeuHotelLayout>(field: Key, value: HotelariaMeuHotelLayout[Key]) => {
    setHotelProfileDraft((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [field]: value,
      };
    });
  };

  const startHotelEdit = () => {
    if (!hotelProfileState) {
      return;
    }

    setHotelProfileDraft(cloneHotelLayout(hotelProfileState));
    setIsHotelEditing(true);
  };

  const cancelHotelEdit = () => {
    if (!hotelProfileState) {
      return;
    }

    setHotelProfileDraft(cloneHotelLayout(hotelProfileState));
    setIsHotelEditing(false);
  };

  const saveHotelEdit = () => {
    if (!hotelProfileDraft) {
      return;
    }

    setHotelProfileState(cloneHotelLayout(hotelProfileDraft));
    setIsHotelEditing(false);
  };

  const renderFeatureContent = () => {
    switch (pageMock.layout.type) {
      case "meu-hotel": {
        const layout = isHotelEditing
          ? hotelProfileDraft ?? pageMock.layout
          : hotelProfileState ?? pageMock.layout;

        return (
          <S.SectionStack>
            <SectionHeader
              title="Perfil do hotel"
              subtitle="Estrutura fiel à visão institucional da rota antiga /hotel/perfil-view, com edição visual dos dados do hotel."
              action={
                <S.HotelPageActions>
                  <S.InlineActionButton type="button">
                    <Share2 size={14} />
                    Compartilhar
                  </S.InlineActionButton>

                  {isHotelEditing ? (
                    <>
                      <S.SecondaryInlineButton type="button" onClick={cancelHotelEdit}>
                        <X size={14} />
                        Cancelar
                      </S.SecondaryInlineButton>
                      <S.InlineActionButton type="button" onClick={saveHotelEdit}>
                        <Save size={14} />
                        Salvar dados
                      </S.InlineActionButton>
                    </>
                  ) : (
                    <S.InlineActionButton type="button" onClick={startHotelEdit}>
                      <PencilLine size={14} />
                      Editar dados do hotel
                    </S.InlineActionButton>
                  )}
                </S.HotelPageActions>
              }
            />

            <S.HotelHero>
              <S.HotelHeroBanner />

              <S.HotelHeroTop>
                <div>
                  <S.HotelIcon>
                    <Building2 size={18} />
                  </S.HotelIcon>

                  {isHotelEditing ? (
                    <S.HotelFieldInput
                      value={layout.hotelName}
                      onChange={(event) => updateHotelField("hotelName", event.target.value)}
                      aria-label="Nome do hotel"
                    />
                  ) : (
                    <h3>{layout.hotelName}</h3>
                  )}

                  {isHotelEditing ? (
                    <S.HotelFieldInput
                      value={layout.location}
                      onChange={(event) => updateHotelField("location", event.target.value)}
                      aria-label="Localização do hotel"
                    />
                  ) : (
                    <p>{layout.location}</p>
                  )}
                </div>

                <S.ChipRow>
                  <Badge tone="brand">{layout.ratingLabel}</Badge>
                  <Badge tone="neutral">{layout.partnerSince}</Badge>
                </S.ChipRow>
              </S.HotelHeroTop>

              <S.ChipRow>
                {isHotelEditing ? (
                  <S.HotelFieldInput
                    value={layout.category}
                    onChange={(event) => updateHotelField("category", event.target.value)}
                    aria-label="Categoria do hotel"
                  />
                ) : (
                  <Badge tone="brand">{layout.category}</Badge>
                )}

                {isHotelEditing ? (
                  <S.HotelFieldInput
                    value={layout.capacity}
                    onChange={(event) => updateHotelField("capacity", event.target.value)}
                    aria-label="Capacidade do hotel"
                  />
                ) : (
                  <Badge tone="neutral">{layout.capacity}</Badge>
                )}
              </S.ChipRow>

              <S.HotelSummaryField>
                {isHotelEditing ? (
                  <textarea
                    value={layout.heroDescription}
                    onChange={(event) => updateHotelField("heroDescription", event.target.value)}
                    aria-label="Descrição principal do hotel"
                  />
                ) : (
                  <p>{layout.heroDescription}</p>
                )}
              </S.HotelSummaryField>

              <S.ContactGrid>
                <S.ContactItem>
                  <strong>Telefone</strong>
                  {isHotelEditing ? (
                    <S.HotelFieldInput
                      value={layout.phone}
                      onChange={(event) => updateHotelField("phone", event.target.value)}
                      aria-label="Telefone do hotel"
                    />
                  ) : (
                    <span>{layout.phone}</span>
                  )}
                </S.ContactItem>
                <S.ContactItem>
                  <strong>Email</strong>
                  {isHotelEditing ? (
                    <S.HotelFieldInput
                      value={layout.email}
                      onChange={(event) => updateHotelField("email", event.target.value)}
                      aria-label="Email do hotel"
                    />
                  ) : (
                    <span>{layout.email}</span>
                  )}
                </S.ContactItem>
                <S.ContactItem>
                  <strong>Website</strong>
                  {isHotelEditing ? (
                    <S.HotelFieldInput
                      value={layout.website}
                      onChange={(event) => updateHotelField("website", event.target.value)}
                      aria-label="Website do hotel"
                    />
                  ) : (
                    <span>{layout.website}</span>
                  )}
                </S.ContactItem>
              </S.ContactGrid>
            </S.HotelHero>

            <S.SectionGrid>
              <S.SectionCard>
                <header>
                  <h4>Condições de trabalho</h4>
                  <p>Resumo operacional para recreadores vinculados ao hotel.</p>
                </header>
                <S.FeatureList>
                  {layout.workingConditions.map((item) => (
                    <S.FeatureListItem key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </S.FeatureListItem>
                  ))}
                </S.FeatureList>
              </S.SectionCard>

              <S.SectionCard>
                <header>
                  <h4>Remuneração e benefícios</h4>
                  <p>Condições de apoio e pacote base para operações da hotelaria.</p>
                </header>
                <S.SectionBullets>
                  {layout.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </S.SectionBullets>
              </S.SectionCard>

              <S.SectionCard>
                <header>
                  <h4>Regras e condutas</h4>
                  <p>Diretrizes internas para execução da programação.</p>
                </header>
                <S.SectionBullets>
                  {layout.rules.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </S.SectionBullets>
              </S.SectionCard>

              <S.SectionCard>
                <header>
                  <h4>Requisitos para recreadores</h4>
                  <p>Critérios mínimos para atuação em escala.</p>
                </header>
                <S.SectionBullets>
                  {layout.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </S.SectionBullets>
              </S.SectionCard>
            </S.SectionGrid>

            <Card title="Instalações e facilidades" subtitle="Infraestrutura disponível para hóspedes e equipe">
              <S.FeatureGrid>
                {layout.facilities.map((item) => (
                  <S.FeatureCard key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </S.FeatureCard>
                ))}
              </S.FeatureGrid>
            </Card>

            <Card title="Serviços de recreação" subtitle="Frentes principais da programação do hotel">
              <S.FeatureGrid>
                {layout.services.map((item) => (
                  <S.FeatureCard key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <small>{item.schedule}</small>
                  </S.FeatureCard>
                ))}
              </S.FeatureGrid>
            </Card>

            <Card title="Galeria do hotel" subtitle="Destaques visuais da operação e dos espaços">
              <S.GalleryGrid>
                {layout.gallery.map((item) => (
                  <S.GalleryCard key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </S.GalleryCard>
                ))}
              </S.GalleryGrid>
            </Card>

            <Card title="Informações de contato" subtitle="Canais oficiais e ações rápidas">
              <S.ContactGrid>
                <S.ContactItem>
                  <strong>Telefone</strong>
                  <span>{layout.phone}</span>
                </S.ContactItem>
                <S.ContactItem>
                  <strong>Email</strong>
                  <span>{layout.email}</span>
                </S.ContactItem>
                <S.ContactItem>
                  <strong>Website</strong>
                  <span>{layout.website}</span>
                </S.ContactItem>
              </S.ContactGrid>

              <S.ActionRow>
                <S.InlineActionButton type="button">Fazer reserva</S.InlineActionButton>
                <S.SecondaryInlineButton type="button">WhatsApp</S.SecondaryInlineButton>
                <S.SecondaryInlineButton type="button">Ver localização</S.SecondaryInlineButton>
              </S.ActionRow>
            </Card>

            <Card title="Avaliações de hóspedes" subtitle="Percepção recente da experiência no hotel">
              <S.ReviewList>
                {layout.reviews.map((item) => (
                  <S.ReviewCard key={`${item.author}-${item.stay}`}>
                    <S.ReviewHeader>
                      <div>
                        <strong>{item.author}</strong>
                        <p>{item.stay}</p>
                      </div>
                      <Badge tone="brand">{ratingStars(item.rating)}</Badge>
                    </S.ReviewHeader>
                    <p>{item.comment}</p>
                  </S.ReviewCard>
                ))}
              </S.ReviewList>
            </Card>
          </S.SectionStack>
        );
      }

      case "escalas": {
        const layout = pageMock.layout;

        return (
          <S.SectionStack>
            <SectionHeader
              title="Sistema de escalas"
              subtitle="Navegação mensal com leitura semanal, histórico e ações rápidas de públicação."
            />

            <S.Toolbar>
              <S.ToolbarGroup>
                {layout.years.map((year) => (
                  <S.TabButton key={year} type="button" $active={year === layout.currentYear}>
                    {year}
                  </S.TabButton>
                ))}
              </S.ToolbarGroup>

              <S.ToolbarGroup>
                <S.IconSquare type="button" aria-label="Mes anterior">
                  <ArrowLeft size={14} />
                </S.IconSquare>
                <S.MonthLabel>{layout.currentMonth}</S.MonthLabel>
                <S.IconSquare type="button" aria-label="Próximo mes">
                  <ArrowRight size={14} />
                </S.IconSquare>
              </S.ToolbarGroup>
            </S.Toolbar>

            <S.MiniStatGrid>
              {layout.monthStats.map((item) => (
                <S.MiniStatCard key={item.title}>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                  <small>{item.helper}</small>
                </S.MiniStatCard>
              ))}
            </S.MiniStatGrid>

            <S.TabRow>
              <S.TabButton type="button" $active={escalasTab === "mes"} onClick={() => setEscalasTab("mes")}>
                Visualizar mes
              </S.TabButton>
              <S.TabButton
                type="button"
                $active={escalasTab === "historico"}
                onClick={() => setEscalasTab("historico")}
              >
                Historico
              </S.TabButton>
            </S.TabRow>

            {escalasTab === "mes" ? (
              <S.WeekGrid>
                {layout.weekDays.map((item) => (
                  <S.WeekCard key={`${item.day}-${item.date}`} $status={item.status}>
                    <S.WeekHeader>
                      <strong>{item.day}</strong>
                      <span>{item.date}</span>
                    </S.WeekHeader>

                    <Badge tone={escalaStatusToneMap[item.status]}>
                      {item.status === "confirmado"
                        ? "Confirmado"
                        : item.status === "pendente"
                          ? "Pendente"
                          : "Em edição"}
                    </Badge>

                    <S.WeekCounts>
                      <S.WeekCountItem>
                        <span>Kids</span>
                        <strong>{item.kids}</strong>
                      </S.WeekCountItem>
                      <S.WeekCountItem>
                        <span>Children</span>
                        <strong>{item.children}</strong>
                      </S.WeekCountItem>
                      <S.WeekCountItem>
                        <span>Teens</span>
                        <strong>{item.teens}</strong>
                      </S.WeekCountItem>
                      <S.WeekCountItem>
                        <span>Central</span>
                        <strong>{item.central}</strong>
                      </S.WeekCountItem>
                    </S.WeekCounts>

                    <S.ActionGhostButton type="button">Criar escala</S.ActionGhostButton>
                  </S.WeekCard>
                ))}
              </S.WeekGrid>
            ) : (
              <S.ListBlock>
                {layout.history.map((item) => (
                  <S.ListItem key={item.period}>
                    <div>
                      <strong>{item.period}</strong>
                      <p>{item.coverage}</p>
                    </div>
                    <Badge tone="success">{item.status}</Badge>
                  </S.ListItem>
                ))}
              </S.ListBlock>
            )}

            <S.InlineActions>
              {layout.quickActions.map((action) => (
                <S.InlineActionButton key={action} type="button">
                  {action}
                </S.InlineActionButton>
              ))}
            </S.InlineActions>
          </S.SectionStack>
        );
      }

      case "recreadores": {
        const layout = pageMock.layout;
        const source = recreadoresTab === "atuais" ? layout.currentTeam : layout.hiringHistory;

        const filtered = source.filter((item) => {
          const matchesSearch =
            item.name.toLowerCase().includes(recreadoresSearch.toLowerCase()) ||
            item.artisticName.toLowerCase().includes(recreadoresSearch.toLowerCase()) ||
            item.location.toLowerCase().includes(recreadoresSearch.toLowerCase());

          const matchesStatus =
            recreadoresStatus === "todos" ||
            (recreadoresStatus === "disponivel" && item.availability === "Disponível") ||
            (recreadoresStatus === "ocupada" && item.availability === "Ocupada");

          return matchesSearch && matchesStatus;
        });

        return (
          <S.SectionStack>
            <SectionHeader
              title="Gestão de recreadores"
              subtitle="Pesquisa por nome e filtros de disponibilidade com duas abas de histórico."
            />

            <S.TabRow>
              <S.TabButton type="button" $active={recreadoresTab === "atuais"} onClick={() => setRecreadoresTab("atuais")}>
                Recreadores atuais
              </S.TabButton>
              <S.TabButton
                type="button"
                $active={recreadoresTab === "historico"}
                onClick={() => setRecreadoresTab("historico")}
              >
                Histórico de contratações
              </S.TabButton>
            </S.TabRow>

            <S.FilterRow>
              <Input
                value={recreadoresSearch}
                onChange={(event) => setRecreadoresSearch(event.target.value)}
                placeholder="Buscar por nome, nome artistico ou cidade"
              />
              <Select
                value={recreadoresStatus}
                onChange={(event) => setRecreadoresStatus(event.target.value as "todos" | "disponivel" | "ocupada")}
                options={[
                  { value: "todos", label: "Todos" },
                  { value: "disponivel", label: "Disponíveis" },
                  { value: "ocupada", label: "Ocupadas" },
                ]}
              />
            </S.FilterRow>

            <S.RosterGrid>
              {filtered.map((item) => (
                <S.RosterCard key={`${item.name}-${item.lastWork}`}>
                  <S.RosterHead>
                    <S.AvatarCircle>{initialsFromName(item.name)}</S.AvatarCircle>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.artisticName}</p>
                    </div>
                    <Badge tone={item.availability === "Disponível" ? "success" : "danger"}>{item.availability}</Badge>
                  </S.RosterHead>

                  <S.RosterInfo>
                    <span>{ratingStars(Math.round(item.rating))}</span>
                    <small>{item.rating.toFixed(1)}</small>
                    <small>{item.location}</small>
                    <small>{item.experience}</small>
                  </S.RosterInfo>

                  <p>{item.bio}</p>

                  <S.ChipRow>
                    {item.functions.map((role) => (
                      <S.RoleChip key={role} $tone={roleToneMap[role as keyof typeof roleToneMap] ?? "gray"}>
                        {role}
                      </S.RoleChip>
                    ))}
                  </S.ChipRow>

                  <S.ChipRow>
                    {item.specialties.map((specialty) => (
                      <S.TagChip key={specialty}>{specialty}</S.TagChip>
                    ))}
                  </S.ChipRow>

                  <S.ListItemMeta>
                    <span>Último trabalho: {item.lastWork}</span>
                  </S.ListItemMeta>

                  <S.ActionRow>
                    <S.ActionGhostButton type="button">Ver perfil</S.ActionGhostButton>
                    <S.ActionGhostButton type="button">Mensagem</S.ActionGhostButton>
                    <S.ActionGhostButton type="button">Escalar</S.ActionGhostButton>
                  </S.ActionRow>
                </S.RosterCard>
              ))}
            </S.RosterGrid>
          </S.SectionStack>
        );
      }

      case "vagas": {
        const layout = pageMock.layout;

        const vacancies =
          vagaFilter === "todas" ? layout.vacancies : layout.vacancies.filter((item) => item.status === vagaFilter);

        return (
          <S.SectionStack>
            <SectionHeader
              title="Vagas"
              subtitle="Painel de oportunidades com filtro por status e detalhamento por função."
              action={
                <S.InlineActionButton type="button">
                  <Plus size={14} />
                  Nova vaga
                </S.InlineActionButton>
              }
            />

            <S.MiniStatGrid>
              {layout.summary.map((item) => (
                <S.MiniStatCard key={item.title}>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                  <small>{item.helper}</small>
                </S.MiniStatCard>
              ))}
            </S.MiniStatGrid>

            <S.TabRow>
              <S.TabButton type="button" $active={vagaFilter === "todas"} onClick={() => setVagaFilter("todas")}>
                Todas
              </S.TabButton>
              {layout.statusFilters.map((status) => (
                <S.TabButton key={status} type="button" $active={vagaFilter === status} onClick={() => setVagaFilter(status)}>
                  {status}
                </S.TabButton>
              ))}
            </S.TabRow>

            <S.VacancyGrid>
              {vacancies.map((item) => (
                <S.VacancyCard key={`${item.title}-${item.startDate}`}>
                  <S.VacancyHeader>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                    <Badge tone={vacancyStatusToneMap[item.status]}>{item.status}</Badge>
                  </S.VacancyHeader>

                  <S.VacancyMeta>
                    <span>{item.location}</span>
                    <span>
                      {item.startDate} a {item.endDate}
                    </span>
                    <span>{item.candidates} candidatos</span>
                  </S.VacancyMeta>

                  <S.PositionList>
                    {item.positions.map((position) => (
                      <S.PositionItem key={position.role}>
                        <span>{position.role}</span>
                        <strong>
                          {position.filled}/{position.total}
                        </strong>
                      </S.PositionItem>
                    ))}
                  </S.PositionList>

                  <S.SalaryRow>
                    <strong>{item.salary}</strong>
                    <S.ActionRow>
                      <S.ActionGhostButton type="button">Ver</S.ActionGhostButton>
                      <S.ActionGhostButton type="button">Editar</S.ActionGhostButton>
                      <S.ActionGhostButton type="button">Candidatos</S.ActionGhostButton>
                    </S.ActionRow>
                  </S.SalaryRow>
                </S.VacancyCard>
              ))}
            </S.VacancyGrid>
          </S.SectionStack>
        );
      }

      case "programacoes": {
        const layout = pageMock.layout;

        return (
          <S.SectionStack>
            <SectionHeader
              title="Programacoes"
              subtitle="Estrutura em quatro abas: minhas programacoes, templates, sugestoes e calendario."
            />

            <S.MiniStatGrid>
              {layout.summary.map((item) => (
                <S.MiniStatCard key={item.title}>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                  <small>{item.helper}</small>
                </S.MiniStatCard>
              ))}
            </S.MiniStatGrid>

            <S.TabRow>
              <S.TabButton type="button" $active={programacoesTab === "minhas"} onClick={() => setProgramacoesTab("minhas")}>
                Minhas programacoes
              </S.TabButton>
              <S.TabButton
                type="button"
                $active={programacoesTab === "templates"}
                onClick={() => setProgramacoesTab("templates")}
              >
                Templates
              </S.TabButton>
              <S.TabButton
                type="button"
                $active={programacoesTab === "sugestoes"}
                onClick={() => setProgramacoesTab("sugestoes")}
              >
                Sugestoes
              </S.TabButton>
              <S.TabButton
                type="button"
                $active={programacoesTab === "calendario"}
                onClick={() => setProgramacoesTab("calendario")}
              >
                Calendario
              </S.TabButton>
            </S.TabRow>

            {programacoesTab === "minhas" ? (
              <S.ListBlock>
                {layout.plans.map((plan) => (
                  <S.ListItem key={`${plan.name}-${plan.date}`}>
                    <div>
                      <strong>{plan.name}</strong>
                      <p>{plan.participants}</p>
                    </div>
                    <S.ListItemMeta>
                      <span>{plan.date}</span>
                      <span>{plan.duration}</span>
                    </S.ListItemMeta>
                  </S.ListItem>
                ))}
              </S.ListBlock>
            ) : null}

            {programacoesTab === "templates" ? (
              <S.TemplateGrid>
                {layout.templates.map((template) => (
                  <S.TemplateCard key={template.title}>
                    <strong>{template.title}</strong>
                    <p>{template.description}</p>
                    <Badge tone="brand">{template.audience}</Badge>
                  </S.TemplateCard>
                ))}
              </S.TemplateGrid>
            ) : null}

            {programacoesTab === "sugestoes" ? (
              <S.ListBlock>
                {layout.suggestions.map((suggestion) => (
                  <S.ListItem key={suggestion.title}>
                    <div>
                      <strong>{suggestion.title}</strong>
                      <p>{suggestion.reason}</p>
                    </div>
                    <Badge tone="warning">{suggestion.recommendedSlot}</Badge>
                  </S.ListItem>
                ))}
              </S.ListBlock>
            ) : null}

            {programacoesTab === "calendario" ? (
              <S.CalendarGrid>
                {layout.calendarEvents.map((event) => (
                  <S.CalendarEventCard key={`${event.day}-${event.label}`}>
                    <strong>Dia {event.day}</strong>
                    <p>{event.label}</p>
                    <small>{event.period}</small>
                  </S.CalendarEventCard>
                ))}
              </S.CalendarGrid>
            ) : null}

            <S.InlineActions>
              <S.InlineActionButton type="button">
                <Plus size={14} />
                Nova programacao
              </S.InlineActionButton>
            </S.InlineActions>
          </S.SectionStack>
        );
      }

      case "feedback-recreadores": {
        const layout = pageMock.layout;

        const filteredEntries = layout.entries.filter((entry) => {
          const matchesSearch =
            entry.recreador.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
            entry.artisticName.toLowerCase().includes(feedbackSearch.toLowerCase());

          const matchesType = feedbackType === "todos" || entry.type === feedbackType;

          return matchesSearch && matchesType;
        });

        return (
          <S.SectionStack>
            <SectionHeader
              title="Feedback de recreadores"
              subtitle="Registro com filtro por tipo, estrelas e histórico de comentarios."
              action={
                <S.InlineActionButton type="button">
                  <Plus size={14} />
                  Novo feedback
                </S.InlineActionButton>
              }
            />

            <S.FilterRow>
              <Input
                value={feedbackSearch}
                onChange={(event) => setFeedbackSearch(event.target.value)}
                placeholder="Buscar recreador"
              />
              <Select
                value={feedbackType}
                onChange={(event) => setFeedbackType(event.target.value as "todos" | "positivo" | "neutro" | "negativo")}
                options={[
                  { value: "todos", label: "Todos" },
                  { value: "positivo", label: "Positivo" },
                  { value: "neutro", label: "Neutro" },
                  { value: "negativo", label: "Negativo" },
                ]}
              />
            </S.FilterRow>

            <S.FeedbackList>
              {filteredEntries.map((entry) => (
                <S.FeedbackCard key={`${entry.recreador}-${entry.createdAt}`}>
                  <S.FeedbackHead>
                    <div>
                      <strong>{entry.recreador}</strong>
                      <p>{entry.artisticName}</p>
                    </div>
                    <Badge tone={feedbackTypeToneMap[entry.type]}>{entry.type}</Badge>
                  </S.FeedbackHead>

                  <S.StarsRow>
                    <span>{ratingStars(entry.rating)}</span>
                    <small>Atividade: {entry.activityDate}</small>
                  </S.StarsRow>

                  <p>{entry.comment}</p>

                  <S.ActionRow>
                    <S.ActionGhostButton type="button">Editar</S.ActionGhostButton>
                    <S.ActionGhostButton type="button">Excluir</S.ActionGhostButton>
                    <small>Criado em {entry.createdAt}</small>
                  </S.ActionRow>
                </S.FeedbackCard>
              ))}
            </S.FeedbackList>
          </S.SectionStack>
        );
      }

      case "indicadores": {
        const layout = pageMock.layout;

        return (
          <S.SectionStack>
            <SectionHeader
              title="Indicadores operacionais"
              subtitle="Leitura executiva por período com watchlist de risco e donos da ação."
            />

            <S.TabRow>
              {layout.periods.map((period) => (
                <S.TabButton
                  key={period}
                  type="button"
                  $active={indicadoresPeriod === period}
                  onClick={() => setIndicadoresPeriod(period)}
                >
                  {period}
                </S.TabButton>
              ))}
            </S.TabRow>

            <S.KpiGrid>
              {layout.kpis.map((kpi) => (
                <S.KpiCard key={kpi.title}>
                  <strong>{kpi.value}</strong>
                  <span>{kpi.title}</span>
                  <S.TrendBadge $tone={kpi.tone}>{kpi.trend}</S.TrendBadge>
                </S.KpiCard>
              ))}
            </S.KpiGrid>

            <Card
              title="Watchlist operacional"
              subtitle={`Pontos de atencao para ${indicadoresPeriod.toLowerCase()}`}
            >
              <S.Watchlist>
                {layout.watchlist.map((item) => (
                  <S.WatchlistItem key={item.title}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <Badge tone="brand">{item.owner}</Badge>
                  </S.WatchlistItem>
                ))}
              </S.Watchlist>
            </Card>
          </S.SectionStack>
        );
      }

      case "relatorios": {
        const layout = pageMock.layout;

        const total = layout.payments.reduce((sum, item) => sum + parseBRLValue(item.value), 0);

        return (
          <S.SectionStack>
            <SectionHeader
              title="Relatórios e resultados"
              subtitle="Componente de análise com impacto, métricas, períodos e histórico financeiro."
              action={
                <S.ReportActions>
                  <S.InlineActionButton type="button">
                    <Filter size={14} />
                    Filtros
                  </S.InlineActionButton>
                  <S.InlineActionButton type="button">
                    <FileDown size={14} />
                    Exportar PDF
                  </S.InlineActionButton>
                  <S.InlineActionButton type="button">
                    <Share2 size={14} />
                    Compartilhar
                  </S.InlineActionButton>
                </S.ReportActions>
              }
            />

            <S.TabRow>
              {layout.periods.map((period) => (
                <S.TabButton
                  key={period}
                  type="button"
                  $active={relatoriosPeriod === period}
                  onClick={() => setRelatoriosPeriod(period)}
                >
                  {period}
                </S.TabButton>
              ))}
            </S.TabRow>

            <S.ImpactCard>
              <h4>{layout.impact.title}</h4>
              <strong>{layout.impact.highlight}</strong>
              <p>{layout.impact.description}</p>
            </S.ImpactCard>

            <S.MetricsGrid>
              {layout.metrics.map((item) => (
                <S.MetricCard key={item.title}>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                  <small>{item.helper}</small>
                </S.MetricCard>
              ))}
            </S.MetricsGrid>

            <Card title="Histórico de pagamentos" subtitle="Resumo por recreador no ciclo selecionado">
              <S.TableWrap>
                <S.DataTable>
                  <thead>
                    <tr>
                      <th>Recreador</th>
                      <th>Valor</th>
                      <th>Data</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {layout.payments.map((item) => (
                      <tr key={`${item.recreador}-${item.date}`}>
                        <td>{item.recreador}</td>
                        <td>{item.value}</td>
                        <td>{item.date}</td>
                        <td>
                          <Badge tone={item.status === "Pago" ? "success" : "warning"}>{item.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td>{total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                      <td colSpan={2}>Fechamento do periodo {relatoriosPeriod.toLowerCase()}</td>
                    </tr>
                  </tfoot>
                </S.DataTable>
              </S.TableWrap>
            </Card>
          </S.SectionStack>
        );
      }

      case "orcamento": {
        const layout = pageMock.layout;

        return (
          <S.SectionStack>
            <SectionHeader
              title="Orcamento"
              subtitle="Controle financeiro com abas dedicadas para gastos e solicitacoes de materiais."
              action={
                <S.ReportActions>
                  <S.InlineActionButton type="button">
                    <Plus size={14} />
                    Solicitar material
                  </S.InlineActionButton>
                  <S.InlineActionButton type="button">
                    <Plus size={14} />
                    Novo gasto
                  </S.InlineActionButton>
                  <S.InlineActionButton type="button">
                    <Download size={14} />
                    Exportar
                  </S.InlineActionButton>
                </S.ReportActions>
              }
            />

            <S.MiniStatGrid>
              {layout.summary.map((item) => (
                <S.MiniStatCard key={item.title}>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                  <small>{item.helper}</small>
                </S.MiniStatCard>
              ))}
            </S.MiniStatGrid>

            <S.TabRow>
              <S.TabButton type="button" $active={orcamentoTab === "gastos"} onClick={() => setOrcamentoTab("gastos")}>
                Controle de gastos
              </S.TabButton>
              <S.TabButton
                type="button"
                $active={orcamentoTab === "materiais"}
                onClick={() => setOrcamentoTab("materiais")}
              >
                Solicitacao de materiais
              </S.TabButton>
            </S.TabRow>

            {orcamentoTab === "gastos" ? (
              <Card title="Gastos do período" subtitle="Descrição, valor, data, categoria e status">
                <S.TableWrap>
                  <S.DataTable>
                    <thead>
                      <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Categoria</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {layout.expenses.map((item) => (
                        <tr key={`${item.description}-${item.date}`}>
                          <td>{item.description}</td>
                          <td>{item.value}</td>
                          <td>{item.date}</td>
                          <td>{item.category}</td>
                          <td>
                            <Badge tone={orcamentoStatusToneMap[item.status]}>{item.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </S.DataTable>
                </S.TableWrap>
              </Card>
            ) : (
              <Card title="Solicitacoes de materiais" subtitle="Material, quantidade, data, status e prioridade">
                <S.TableWrap>
                  <S.DataTable>
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Prioridade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {layout.materials.map((item) => (
                        <tr key={`${item.material}-${item.date}`}>
                          <td>{item.material}</td>
                          <td>{item.quantity}</td>
                          <td>{item.date}</td>
                          <td>
                            <Badge tone={orcamentoStatusToneMap[item.status]}>{item.status}</Badge>
                          </td>
                          <td>
                            <Badge tone={item.priority === "Alta" ? "danger" : item.priority === "Média" ? "warning" : "success"}>
                              {item.priority}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </S.DataTable>
                </S.TableWrap>
              </Card>
            )}
          </S.SectionStack>
        );
      }

      case "ocorrencias": {
        const layout = pageMock.layout;

        return (
          <S.SectionStack>
            <SectionHeader
              title="Controle de ocorrencias"
              subtitle="Registro de incidentes com severidade, status e ação de contencao."
              action={
                <S.ReportActions>
                  <S.InlineActionButton type="button">
                    <FileDown size={14} />
                    Exportar relatorio
                  </S.InlineActionButton>
                  <S.InlineActionButton type="button">
                    <Plus size={14} />
                    Registrar ocorrencia
                  </S.InlineActionButton>
                </S.ReportActions>
              }
            />

            <S.MiniStatGrid>
              {layout.summary.map((item) => (
                <S.MiniStatCard key={item.title}>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                  <small>{item.helper}</small>
                </S.MiniStatCard>
              ))}
            </S.MiniStatGrid>

            <S.IncidentList>
              {layout.incidents.map((incident) => (
                <S.IncidentCard key={`${incident.description}-${incident.date}`} $severity={incident.severity}>
                  <S.IncidentHead>
                    <div>
                      <strong>{incident.description}</strong>
                      <p>{incident.date}</p>
                    </div>
                    <S.ChipRow>
                      <Badge tone={occurrenceSeverityToneMap[incident.severity]}>{incident.severity}</Badge>
                      <Badge tone={ocorrenciaStatusToneMap[incident.status]}>{incident.status}</Badge>
                    </S.ChipRow>
                  </S.IncidentHead>

                  <S.ListItemMeta>
                    <span>{incident.type}</span>
                    <span>{incident.recreador}</span>
                  </S.ListItemMeta>

                  <p>{incident.action}</p>

                  <S.ActionRow>
                    <S.ActionGhostButton type="button">Editar</S.ActionGhostButton>
                    <S.ActionGhostButton type="button">Excluir</S.ActionGhostButton>
                  </S.ActionRow>
                </S.IncidentCard>
              ))}
            </S.IncidentList>
          </S.SectionStack>
        );
      }

      case "settings": {
        const layout = pageMock.layout;
        const dataTabs = layout.tabs
          .filter((tab) => tab.id === "dados-hotel" || tab.id === "dados-administrador")
          .map((tab) => ({
            id: tab.id,
            editable: tab.editable,
            restrictedNotice: tab.restrictedNotice,
            options: tab.options,
          }));

        return (
          <S.SectionStack>
            <SettingsPageTemplate
              tone="hotelaria"
              tabs={layout.tabs.map((tab) => ({
                id: tab.id,
                label: tab.title,
                helper: tab.helper,
              }))}
              defaultTabId="dados-hotel"
              notificationsTabId="notificacoes"
              notificationPreferences={layout.notificationPreferences}
              usersTabId="usuarios"
              userAccess={layout.userAccess}
              securityTabId="seguranca"
              securityTips={layout.securityTips}
              dataTabs={dataTabs}
            />
          </S.SectionStack>
        );
      }

      default:
        return null;
    }
  };

  const isSettingsFeature = pageMock.featureId === "settings";

  return (
    <HotelariaDashboardShell
      userName="Carla Menezes"
      pageTitle={pageMock.title}
      pageDescription={pageMock.description}
      compactContent={isSettingsFeature}
    >
      <S.Wrapper>
        {!isSettingsFeature ? (
          <S.StatusBanner $mode={pageMock.status}>
            <S.StatusHeader>
              <strong>{pageMock.menuLabel}</strong>
              <Badge tone={featureStatusToneMap[pageMock.status]}>{pageMock.statusLabel}</Badge>
            </S.StatusHeader>
            <p>{pageMock.statusDetail}</p>
          </S.StatusBanner>
        ) : null}

        {renderFeatureContent()}

        {!isSettingsFeature ? (
          <Card title="Checkpoints da frente" subtitle="Base mínima para manter consistência de operação no módulo hotelaria">
            <S.CheckpointList>
              {pageMock.checkpoints.map((checkpoint) => (
                <S.CheckpointItem key={checkpoint}>{checkpoint}</S.CheckpointItem>
              ))}
            </S.CheckpointList>
          </Card>
        ) : null}
      </S.Wrapper>
    </HotelariaDashboardShell>
  );
};