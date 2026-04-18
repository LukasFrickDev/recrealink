# QA visual guiado - Fase 5 - Modulo Recreador

## Objetivo
Executar um QA visual objetivo, repetivel e rapido para validar microconsistencia, responsividade e acabamento final do modulo Recreador.

## Escopo de rotas
- /app/recreador
- /app/recreador/perfil
- /app/recreador/perfil-publico
- /app/recreador/disponibilidade
- /app/recreador/oportunidades
- /app/recreador/convites
- /app/recreador/checklist
- /app/recreador/suporte
- /app/recreador/chat
- /app/recreador/notificacoes
- /app/recreador/configuracoes

## Matriz de viewport (obrigatoria)
Use sempre os 4 cenarios abaixo:

1. Desktop grande: 1440x900
2. Notebook: 1280x800
3. Tablet: 834x1112
4. Mobile: 390x844

Notas:
- Breakpoints de referencia do tema: desktop 1200, tablet 900, mobile 640.
- Validar cada tela em ao menos 3 larguras e sempre incluir mobile.

## Preparacao de execucao
1. Rodar `npm run dev`.
2. Limpar cache do navegador para evitar falso positivo de estilo.
3. Fazer um ciclo completo de navegacao pela sidebar e topbar.
4. Registrar screenshot apenas quando encontrar falha.

## Gate global de aprovacao
Marcar cada item com [x] quando aprovado.

### Interacao e estados
- [ ] Todo botao relevante possui estado hover perceptivel.
- [ ] Todo controle relevante possui foco visivel claro no teclado.
- [ ] Estados disabled removem elevacao, reduzem opacidade e evitam feedback de click.
- [ ] Estados active nao causam salto visual excessivo.

### Microconsistencia visual
- [ ] Altura de botoes primarios e secundarios esta consistente por contexto.
- [ ] Chips e badges mantem mesma linha visual (peso, altura, borda, espacamento).
- [ ] Inputs e selects mantem ritmo de altura, raio e foco.
- [ ] Toasts usam densidade e hierarquia de texto consistentes.
- [ ] Empty states nao parecem espaco morto e tem leitura clara.

### Ritmo e densidade
- [ ] Nao existem blocos apertados verticalmente.
- [ ] Nao existem cards com vazios exagerados sem motivo.
- [ ] Gaps internos e externos seguem ritmo visual repetivel.

### Responsividade
- [ ] Sidebar e topbar continuam funcionais no tablet e mobile.
- [ ] Cards e grids quebram sem corte de texto importante.
- [ ] Acoes principais continuam acessiveis sem scroll horizontal indevido.

## Checklist por tela

### 1) Inicio (/app/recreador)
- [ ] Hero e blocos iniciais mantem hierarquia clara em desktop e mobile.
- [ ] Cartoes de prioridade preservam alinhamento de titulo, valor e acao.
- [ ] Links rapidos no topo nao quebram layout no notebook.

### 2) Perfil (/app/recreador/perfil)
- [ ] Campos e botoes seguem foco/hover/disabled de forma consistente.
- [ ] Blocos de formulario nao ficam densos demais no mobile.
- [ ] Secoes de lista (experiencia, tags, itens geridos) mantem legibilidade.

### 3) Perfil publico (/app/recreador/perfil-publico)
- [ ] Hero publico mantem leitura sem poluicao visual.
- [ ] Chips, metas e blocos de review seguem mesma semantica visual.
- [ ] Links e acoes no topo continuam clicaveis em tablet/mobile.

### 4) Disponibilidade (/app/recreador/disponibilidade)
- [ ] Grade de agenda nao estoura layout em notebook/tablet.
- [ ] Badges de status e prioridade continuam legiveis em tamanhos pequenos.
- [ ] Overlay de detalhes tem contraste suficiente e foco visual adequado.
- [ ] Modal de detalhes adapta padding e altura no mobile.

### 5) Oportunidades (/app/recreador/oportunidades)
- [ ] Filtros e campo de busca mantem alinhamento em todos os breakpoints.
- [ ] Cards de oportunidade preservam ritmo entre imagem, meta e acoes.
- [ ] Estados de oportunidade (pill, hint, nota) estao semanticamente claros.

### 6) Convites (/app/recreador/convites)
- [ ] Tabs de status mantem leitura e clique no mobile.
- [ ] Colunas nao forcam altura artificial em viewport menor.
- [ ] Botoes de decidir (aceitar/recusar) mantem contraste e consistencia.
- [ ] Modal de decisao no mobile coloca acoes em largura total sem quebra.

### 7) Checklist (/app/recreador/checklist)
- [ ] Itens concluidos vs pendentes estao claros sem excesso de ruido.
- [ ] Botoes de acao pequena mantem area de clique adequada.
- [ ] Blocos editor/lista/revisao seguem mesmo ritmo de espaco.

### 8) Suporte (/app/recreador/suporte)
- [ ] Campos de formulario, contador e submit seguem padrao de estados.
- [ ] Cartoes de canal e base de conhecimento nao colidem no mobile.
- [ ] Header de sucesso e header default preservam consistencia visual.

### 9) Chat (/app/recreador/chat)
- [ ] Lista de conversas, mensagens e composer mantem densidade consistente.
- [ ] Quick replies tem navegacao horizontal limpa no mobile.
- [ ] Foco e disabled estao corretos em busca, input e enviar.

### 10) Notificacoes (/app/recreador/notificacoes)
- [ ] Filtros por chip mantem leitura e clique no mobile.
- [ ] Tipos de notificacao possuem semantica visual coerente.
- [ ] Cartoes lidos vs nao lidos estao facilmente distinguiveis.

### 11) Configuracoes (/app/recreador/configuracoes)
- [ ] Sidebar de abas e conteudo principal mantem navegacao clara.
- [ ] Campos e botoes internos respeitam foco/disabled de forma uniforme.
- [ ] Sem scroll horizontal involuntario em mobile.

## Checklist de componentes shared usados no modulo
- [ ] Button
- [ ] Input
- [ ] Select
- [ ] Badge
- [ ] Toast
- [ ] EmptyState
- [ ] Card
- [ ] SidebarNavItem

Criterio de aprovacao dos shared:
- [ ] Sem variacao de altura inesperada entre contextos equivalentes.
- [ ] Sem foco ausente.
- [ ] Sem disabled com hover ativo.
- [ ] Sem regressao de contraste.

## Registro de findings
Use este padrao por falha encontrada:
- Tela:
- Viewport:
- Passo para reproduzir:
- Resultado atual:
- Resultado esperado:
- Severidade: alta | media | baixa
- Evidencia: screenshot

## Criterio de fechamento da Fase 5
A fase so pode ser considerada fechada quando:
1. 100% do Gate global estiver marcado.
2. Nenhuma falha alta estiver aberta.
3. Falhas medias tiverem owner e prazo curto definidos.
4. O modulo puder ser usado como referencia para proximo modulo sem ajustes de base.
