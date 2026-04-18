# Mini guia de consistencia visual - Base de replicacao

## Objetivo
Definir um padrao visual pratico para replicar em Hotelaria, Empresa e Pais usando Recreador como referencia.

## Principios de design
1. Claridade operacional antes de decoracao.
2. Hierarquia visual curta e direta.
3. Estados interativos previsiveis em todo o modulo.
4. Responsividade sem perda de acao critica.
5. Densidade equilibrada: sem vazio artificial e sem compressao.

## Contrato de tokens (usar sempre que possivel)
Referencia: src/styles/theme.ts

- Cores de acento: brandBlue, brandOrange, brandRose, brandPurple por contexto.
- Bordas: `borders.subtle` e `borders.strong`.
- Raios: `radii.sm`, `radii.md`, `radii.lg`, `radii.pill`.
- Espacamento: escala xs/sm/md/lg/xl.
- Tipografia: body, bodySm, label, meta, micro para microcomponentes.
- Sombras: `shadows.sm` para elevacao leve, `shadows.md` para foco de bloco importante.

## Estados interativos (padrao minimo)
Aplicar em todos os controles clicaveis e campos:

### Hover
- Alteracao visual perceptivel, mas sem ruido.
- Evitar deslocamento maior que -1px no eixo Y.

### Focus-visible
- Sempre visivel por teclado.
- Outline claro no acento do modulo ou anel de foco equivalente.

### Active
- Remover translacao de hover para evitar salto.
- Manter feedback rapido e estavel.

### Disabled
- Opacidade reduzida.
- Cursor not-allowed.
- Sem hover, sem sombra e sem transform.

## Regras por componente

### Button
- Alturas consistentes por tamanho (sm/md/lg).
- Peso de fonte alto para CTA principal.
- Estados hover/focus/disabled obrigatorios.

### Input e Select
- Altura visual alinhada entre ambos.
- Label menor e semantica, evitando competir com o valor.
- Erro deve ser explicito (borda + mensagem).

### Badge e Chip
- Mesma familia de altura e peso tipografico.
- Variar semantica por cor e borda, nao por formato aleatorio.

### Toast
- Hierarquia simples: titulo curto + descricao curta.
- Acao de fechar com foco visivel.
- Contraste suficiente em todos os tons.

### Card e EmptyState
- Card: borda suave, fundo coerente com superficie do shell.
- EmptyState: sem parecer bloco morto, com mensagem acionavel.

### SidebarNavItem
- Ativo claramente distinguivel.
- Hover discreto.
- Foco por teclado visivel no item inteiro.

## Contrato de layout (shell)

### Sidebar
- Navegacao por grupos.
- Sem truncamento critico de label.
- Colapso funcional em viewport menor.

### Topbar
- Busca e atalhos sem quebrar acao principal.
- Comportamento claro em desktop e mobile.

### Conteudo
- Header contextual por pagina.
- Gaps constantes entre secoes.
- Evitar grids com altura forcada quando nao necessario.

## Responsividade (regra pratica)
Usar breakpoints do tema: desktop 1200, tablet 900, mobile 640.

1. Desktop: explorar 2 a 4 colunas quando o conteudo justificar.
2. Tablet: reduzir para 1 a 2 colunas priorizando leitura.
3. Mobile: 1 coluna, acoes principais visiveis e sem scroll lateral.

## Modais, overlays e drawers

### Modal
- Overlay com contraste suficiente para foco de tarefa.
- Largura e padding adaptativos no mobile.
- Rodape de acoes empilhado no mobile quando necessario.

### Drawer
- Se introduzido no futuro, seguir o mesmo contrato de foco/disabled do modal.
- Nao bloquear a acao de fechar por teclado.

## Semantica de status

1. Sucesso: verde, linguagem de confirmacao.
2. Aviso: amarelo/ambar, linguagem de atencao.
3. Perigo: vermelho/rosa escuro, linguagem de risco ou falha.
4. Informacao: azul, linguagem neutra de contexto.

Nunca usar cor sem texto de apoio quando a acao for critica.

## Ritmo de espacamento e densidade

- Vertical: preferir progressao curta (xs -> sm -> md).
- Interno de card: manter padrao por tipo de card, evitar excecoes sem necessidade.
- Listas operacionais: gaps menores, mas preservando area de toque.

## Definicao de pronto para replicar em outro modulo
Antes de copiar para Hotelaria/Empresa/Pais, validar:

- [ ] Shell do modulo destino usando mesmo contrato de foco/disabled.
- [ ] Shared UI sem sobrescritas locais desnecessarias.
- [ ] Paginas nucleares com hierarquia equivalente ao Recreador.
- [ ] Breakpoints validados em desktop/notebook/tablet/mobile.
- [ ] Modais e empty states com mesma qualidade de acabamento.

## Ordem recomendada de replicacao
1. Shell e navegacao.
2. Shared UI base.
3. Paginas nucleares do modulo destino.
4. Complementares e shared contextualizadas.
5. Passada final de microconsistencia e QA guiado.

## Anti-patterns a evitar
- Resolver inconsistencia com CSS ad hoc por pagina.
- Duplicar componente shared so para ajuste pequeno de estilo.
- Manter estado disabled com hover ativo.
- Criar variações de espacamento sem criterio.
- Usar texto longo para explicar o que o layout ja deveria comunicar.
