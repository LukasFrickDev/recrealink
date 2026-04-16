const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGETS = [
  path.join(ROOT, "src"),
  path.join(ROOT, "README.md"),
  path.join(ROOT, "notes.txt"),
];

const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".md", ".txt"]);

const replacements = [
  [/\bConfiguracoes\b/g, "Configurações"],
  [/\bconfiguracoes\b/g, "configurações"],
  [/\bNotificacoes\b/g, "Notificações"],
  [/\bnotificacoes\b/g, "notificações"],
  [/\bOperacao\b/g, "Operação"],
  [/\boperacao\b/g, "operação"],
  [/\bOperacoes\b/g, "Operações"],
  [/\boperacoes\b/g, "operações"],
  [/\bInformacoes\b/g, "Informações"],
  [/\binformacoes\b/g, "informações"],
  [/\bAvaliacao\b/g, "Avaliação"],
  [/\bavaliacao\b/g, "avaliação"],
  [/\bAvaliacoes\b/g, "Avaliações"],
  [/\bavaliacoes\b/g, "avaliações"],
  [/\bHistorico\b/g, "Histórico"],
  [/\bhistorico\b/g, "histórico"],
  [/\bDescricao\b/g, "Descrição"],
  [/\bdescricao\b/g, "descrição"],
  [/\bAnalise\b/g, "Análise"],
  [/\banalise\b/g, "análise"],
  [/\bSeguranca\b/g, "Segurança"],
  [/\bseguranca\b/g, "segurança"],
  [/\bComunicacao\b/g, "Comunicação"],
  [/\bcomunicacao\b/g, "comunicação"],
  [/\bConteudo\b/g, "Conteúdo"],
  [/\bconteudo\b/g, "conteúdo"],
  [/\bModulo\b/g, "Módulo"],
  [/\bmodulo\b/g, "módulo"],
  [/\bModulos\b/g, "Módulos"],
  [/\bmodulos\b/g, "módulos"],
  [/\bNao\b/g, "Não"],
  [/\bnao\b/g, "não"],
  [/\bJa\b/g, "Já"],
  [/\bja\b/g, "já"],
  [/\bUltimo\b/g, "Último"],
  [/\bultimo\b/g, "último"],
  [/\bUltima\b/g, "Última"],
  [/\bultima\b/g, "última"],
  [/\bUltimos\b/g, "Últimos"],
  [/\bultimos\b/g, "últimos"],
  [/\bUltimas\b/g, "Últimas"],
  [/\bultimas\b/g, "últimas"],
  [/\bProximo\b/g, "Próximo"],
  [/\bproximo\b/g, "próximo"],
  [/\bProxima\b/g, "Próxima"],
  [/\bproxima\b/g, "próxima"],
  [/\bProximos\b/g, "Próximos"],
  [/\bproximos\b/g, "próximos"],
  [/\bProximas\b/g, "Próximas"],
  [/\bproximas\b/g, "próximas"],
  [/\bPeriodo\b/g, "Período"],
  [/\bperiodo\b/g, "período"],
  [/\bPeriodos\b/g, "Períodos"],
  [/\bperiodos\b/g, "períodos"],
  [/\bSessao\b/g, "Sessão"],
  [/\bsessao\b/g, "sessão"],
  [/\bSessoes\b/g, "Sessões"],
  [/\bsessoes\b/g, "sessões"],
  [/\bAutenticacao\b/g, "Autenticação"],
  [/\bautenticacao\b/g, "autenticação"],
  [/\bPublico\b/g, "Público"],
  [/\bpublico\b/g, "público"],
  [/\bFamilia\b/g, "Família"],
  [/\bfamilia\b/g, "família"],
  [/\bFamilias\b/g, "Famílias"],
  [/\bfamilias\b/g, "famílias"],
  [/\bExperiencia\b/g, "Experiência"],
  [/\bexperiencia\b/g, "experiência"],
  [/\bExperiencias\b/g, "Experiências"],
  [/\bexperiencias\b/g, "experiências"],
  [/\bRecreacao\b/g, "Recreação"],
  [/\brecreacao\b/g, "recreação"],
  [/\bReunioes\b/g, "Reuniões"],
  [/\breunioes\b/g, "reuniões"],
  [/\bRevisao\b/g, "Revisão"],
  [/\brevisao\b/g, "revisão"],
  [/\bVisao\b/g, "Visão"],
  [/\bvisao\b/g, "visão"],
  [/\bMetricas\b/g, "Métricas"],
  [/\bmetricas\b/g, "métricas"],
  [/\bAcao\b/g, "Ação"],
  [/\bacao\b/g, "ação"],
  [/\bAcoes\b/g, "Ações"],
  [/\bacoes\b/g, "ações"],
  [/\bNavegacao\b/g, "Navegação"],
  [/\bnavegacao\b/g, "navegação"],
  [/\bPublicacao\b/g, "Publicação"],
  [/\bpublicacao\b/g, "publicação"],
  [/\bPublicacoes\b/g, "Publicações"],
  [/\bpublicacoes\b/g, "publicações"],
  [/\bContratacao\b/g, "Contratação"],
  [/\bcontratacao\b/g, "contratação"],
  [/\bPrevisao\b/g, "Previsão"],
  [/\bprevisao\b/g, "previsão"],
  [/\bAtencao\b/g, "Atenção"],
  [/\batencao\b/g, "atenção"],
  [/\bPendencias\b/g, "Pendências"],
  [/\bpendencias\b/g, "pendências"],
  [/\bRapido\b/g, "Rápido"],
  [/\brapido\b/g, "rápido"],
  [/\bRapida\b/g, "Rápida"],
  [/\brapida\b/g, "rápida"],
  [/\bRapidos\b/g, "Rápidos"],
  [/\brapidos\b/g, "rápidos"],
  [/\bRapidas\b/g, "Rápidas"],
  [/\brapidas\b/g, "rápidas"],
  [/\bEdicao\b/g, "Edição"],
  [/\bedicao\b/g, "edição"],
  [/\bEdicoes\b/g, "Edições"],
  [/\bedicoes\b/g, "edições"],
  [/\bPublica\b/g, "Pública"],
  [/\bpublica\b/g, "pública"],
  [/\bVoce\b/g, "Você"],
  [/\bvoce\b/g, "você"],
  [/\bFuncao\b/g, "Função"],
  [/\bfuncao\b/g, "função"],
  [/\bFuncoes\b/g, "Funções"],
  [/\bfuncoes\b/g, "funções"],
  [/\bReducao\b/g, "Redução"],
  [/\breducao\b/g, "redução"],
  [/\bRevisoes\b/g, "Revisões"],
  [/\brevisoes\b/g, "revisões"],
  [/\bEspecifico\b/g, "Específico"],
  [/\bespecifico\b/g, "específico"],
  [/\bNegocio\b/g, "Negócio"],
  [/\bnegocio\b/g, "negócio"],
  [/\bNegocios\b/g, "Negócios"],
  [/\bnegocios\b/g, "negócios"],
  [/\bIncriveis\b/g, "Incríveis"],
  [/\bincriveis\b/g, "incríveis"],
  [/\bCompetencias\b/g, "Competências"],
  [/\bcompetencias\b/g, "competências"],
  [/\bPagina\b/g, "Página"],
  [/\bpagina\b/g, "página"],
  [/\bInicio\b/g, "Início"],
  [/\binicio\b/g, "início"],
  [/\bPublicos\b/g, "Públicos"],
  [/\bpublicos\b/g, "públicos"],
  [/\bAderencia\b/g, "Aderência"],
  [/\baderencia\b/g, "aderência"],
  [/\bPosicoes\b/g, "Posições"],
  [/\bposicoes\b/g, "posições"],
  [/\bPreferencias\b/g, "Preferências"],
  [/\bpreferencias\b/g, "preferências"],
  [/\bUsuario\b/g, "Usuário"],
  [/\busuario\b/g, "usuário"],
  [/\bUsuarios\b/g, "Usuários"],
  [/\busuarios\b/g, "usuários"],
  [/\bAtualizacao\b/g, "Atualização"],
  [/\batualizacao\b/g, "atualização"],
  [/\bAtualizacoes\b/g, "Atualizações"],
  [/\batualizacoes\b/g, "atualizações"],
  [/\bConteudos\b/g, "Conteúdos"],
  [/\bconteudos\b/g, "conteúdos"],
  [/\bArea\b/g, "Área"],
  [/\barea\b/g, "área"],
  [/\bAnalises\b/g, "Análises"],
  [/\banalises\b/g, "análises"],
  [/\bPolitica\b/g, "Política"],
  [/\bpolitica\b/g, "política"],
  [/\bPoliticas\b/g, "Políticas"],
  [/\bpoliticas\b/g, "políticas"],
  [/\bNiveis\b/g, "Níveis"],
  [/\bniveis\b/g, "níveis"],
  [/\bParametrizacoes\b/g, "Parametrizações"],
  [/\bparametrizacoes\b/g, "parametrizações"],
  [/\bAprovacao\b/g, "Aprovação"],
  [/\baprovacao\b/g, "aprovação"],
  [/\bGestao\b/g, "Gestão"],
  [/\bgestao\b/g, "gestão"],
  [/\bPermissao\b/g, "Permissão"],
  [/\bpermissao\b/g, "permissão"],
  [/\bPermissoes\b/g, "Permissões"],
  [/\bpermissoes\b/g, "permissões"],
  [/\bIcones\b/g, "Ícones"],
  [/\bicones\b/g, "ícones"],
  [/\bVersao\b/g, "Versão"],
  [/\bversao\b/g, "versão"],
  [/\bDiferencas\b/g, "Diferenças"],
  [/\bdiferencas\b/g, "diferenças"],
  [/\bPadrao\b/g, "Padrão"],
  [/\bpadrao\b/g, "padrão"],
  [/\bObrigatorio\b/g, "Obrigatório"],
  [/\bobrigatorio\b/g, "obrigatório"],
  [/\bConsolidacao\b/g, "Consolidação"],
  [/\bconsolidacao\b/g, "consolidação"],
  [/\bDuplicacao\b/g, "Duplicação"],
  [/\bduplicacao\b/g, "duplicação"],
  [/\bComecar\b/g, "Começar"],
  [/\bcomecar\b/g, "começar"],
  [/\bDisponivel\b/g, "Disponível"],
  [/\bdisponivel\b/g, "disponível"],
  [/\bDisponiveis\b/g, "Disponíveis"],
  [/\bdisponiveis\b/g, "disponíveis"],
  [/\bGratis\b/g, "Grátis"],
  [/\bgratis\b/g, "grátis"],
  [/\bSalario\b/g, "Salário"],
  [/\bsalario\b/g, "salário"],
  [/\bMedio\b/g, "Médio"],
  [/\bmedio\b/g, "médio"],
  [/\bMedia\b/g, "Média"],
  [/\bmedia\b/g, "média"],
  [/\bEvolucao\b/g, "Evolução"],
  [/\bevolucao\b/g, "evolução"],
  [/\bPresenca\b/g, "Presença"],
  [/\bpresenca\b/g, "presença"],
  [/\bConsistencia\b/g, "Consistência"],
  [/\bconsistencia\b/g, "consistência"],
  [/\bDemonstracao\b/g, "Demonstração"],
  [/\bdemonstracao\b/g, "demonstração"],
  [/\bPraticas\b/g, "Práticas"],
  [/\bpraticas\b/g, "práticas"],
  [/\bAvancada\b/g, "Avançada"],
  [/\bavancada\b/g, "avançada"],
  [/\bUnico\b/g, "Único"],
  [/\bunico\b/g, "único"],
  [/\bEtaria\b/g, "Etária"],
  [/\betaria\b/g, "etária"],
  [/\bContinua\b/g, "Contínua"],
  [/\bcontinua\b/g, "contínua"],
  [/\bDecisao\b/g, "Decisão"],
  [/\bdecisao\b/g, "decisão"],
  [/\bOpcoes\b/g, "Opções"],
  [/\bopcoes\b/g, "opções"],
  [/\bCombinacoes\b/g, "Combinações"],
  [/\bcombinacoes\b/g, "combinações"],
  [/\bApos\b/g, "Após"],
  [/\bapos\b/g, "após"],
  [/\bHoteis\b/g, "Hotéis"],
  [/\bhoteis\b/g, "hotéis"],
  [/\bRelatorios\b/g, "Relatórios"],
  [/\bOrcamentos\b/g, "Orçamentos"],
  [/\bOcorrencias\b/g, "Ocorrências"],
  [/\bServicos\b/g, "Serviços"],
  [/\bPortifolio\b/g, "Portfólio"],
  [/\bportfolio\b/g, "portfólio"],
  [/\bPercepcao\b/g, "Percepção"],
  [/\bpercepcao\b/g, "percepção"],
  [/\bSenior\b/g, "Sênior"],
  [/\bsenior\b/g, "sênior"],
  [/\bCompativeis\b/g, "Compatíveis"],
  [/\bcompativeis\b/g, "compatíveis"],
  [/\bFlorianopolis\b/g, "Florianópolis"],
  [/\bIguacu\b/g, "Iguaçu"],
  [/\bSatisfacao\b/g, "Satisfação"],
  [/\bsatisfacao\b/g, "satisfação"],
  [/\bHospedes\b/g, "Hóspedes"],
  [/\bhospedes\b/g, "hóspedes"],
  [/\bMes\b/g, "Mês"],
  [/\bmes\b/g, "mês"],
  [/\bRelatorio\b/g, "Relatório"],
  [/\brelatorio\b/g, "relatório"],
  [/\brelatorios\b/g, "relatórios"],
  [/\bOcorrencia\b/g, "Ocorrência"],
  [/\bocorrencia\b/g, "ocorrência"],
  [/\bocorrencias\b/g, "ocorrências"],
  [/\bSolicitacao\b/g, "Solicitação"],
  [/\bsolicitacao\b/g, "solicitação"],
  [/\bResponsavel\b/g, "Responsável"],
  [/\bresponsavel\b/g, "responsável"],
  [/\bReforco\b/g, "Reforço"],
  [/\breforco\b/g, "reforço"],
  [/\bProgramacao\b/g, "Programação"],
  [/\bprogramacao\b/g, "programação"],
  [/\bProgramacoes\b/g, "Programações"],
  [/\bprogramacoes\b/g, "programações"],
  [/\bDinamicas\b/g, "Dinâmicas"],
  [/\bdinamicas\b/g, "dinâmicas"],
  [/\bNecessarios\b/g, "Necessários"],
  [/\bnecessarios\b/g, "necessários"],
  [/\bIteracao\b/g, "Iteração"],
  [/\biteracao\b/g, "iteração"],
  [/\bPreparacao\b/g, "Preparação"],
  [/\bpreparacao\b/g, "preparação"],
  [/\bConexao\b/g, "Conexão"],
  [/\bconexao\b/g, "conexão"],
  [/\bRepertorio\b/g, "Repertório"],
  [/\brepertorio\b/g, "repertório"],
  [/\bTecnico\b/g, "Técnico"],
  [/\btecnico\b/g, "técnico"],
  [/\bSao\b/g, "São"],
  [/\bsao\b/g, "são"],
];

function shouldSkipLiteral(value) {
  if (!value) return true;
  if (/^https?:\/\//i.test(value)) return true;
  if (value.includes("@/") || value.includes("../") || value.includes("./")) return true;
  if (value.includes("/") || value.includes("\\")) return true;
  if (/^[a-z0-9._-]+$/.test(value)) return true;
  return false;
}

function applyReplacements(text) {
  let next = text;
  for (const [pattern, replacement] of replacements) {
    next = next.replace(pattern, replacement);
  }
  return next;
}

function processJsxText(content) {
  const regex = />([^<>{}\n]*[A-Za-zÀ-ÿ][^<>{}\n]*)</g;
  let changed = false;

  const updated = content.replace(regex, (match, textNode) => {
    const replaced = applyReplacements(textNode);
    if (replaced === textNode) {
      return match;
    }

    changed = true;
    return `>${replaced}<`;
  });

  return { updated, changed };
}

function processContent(content, ext) {
  const regex = /(["'])(?:\\.|(?!\1)[^\\\n])*\1/gm;
  let changed = false;

  const updated = content.replace(regex, (literal) => {
    const quote = literal[0];
    const value = literal.slice(1, -1);

    if (shouldSkipLiteral(value)) {
      return literal;
    }

    const replacedValue = applyReplacements(value);
    if (replacedValue === value) {
      return literal;
    }

    changed = true;
    return `${quote}${replacedValue}${quote}`;
  });

  if (ext === ".tsx") {
    const jsxResult = processJsxText(updated);
    if (jsxResult.changed) {
      return { updated: jsxResult.updated, changed: true };
    }
  }

  return { updated, changed };
}

function walk(entry, files = []) {
  if (!fs.existsSync(entry)) {
    return files;
  }

  const stat = fs.statSync(entry);
  if (stat.isFile()) {
    files.push(entry);
    return files;
  }

  for (const child of fs.readdirSync(entry)) {
    walk(path.join(entry, child), files);
  }

  return files;
}

const candidates = [];
for (const target of TARGETS) {
  walk(target, candidates);
}

let changedFiles = 0;
let changedLiterals = 0;

for (const filePath of candidates) {
  const ext = path.extname(filePath);
  if (!FILE_EXTENSIONS.has(ext)) continue;

  const original = fs.readFileSync(filePath, "utf8");
  const { updated, changed } = processContent(original, ext);

  if (!changed) continue;

  const before = original;
  const after = updated;
  const literalDiffCount = Math.max(1, before.split("\n").length - after.split("\n").length + (before !== after ? 1 : 0));

  fs.writeFileSync(filePath, after, "utf8");
  changedFiles += 1;
  changedLiterals += literalDiffCount;
}

console.log(`Arquivos alterados: ${changedFiles}`);
console.log(`Mudancas aplicadas (aprox.): ${changedLiterals}`);
