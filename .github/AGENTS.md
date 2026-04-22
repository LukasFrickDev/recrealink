# AGENTS — RecreaLink

## Finalidade
Este arquivo define os agentes operacionais do workspace da RecreaLink no VS Code.

A função desses agentes é ajudar na execução do projeto dentro do código, com foco em alterações objetivas, seguras e coerentes com a fase atual do produto.

Este workspace não deve usar agentes para roteamento estratégico amplo.
A definição da rota principal do projeto acontece fora do editor.
Dentro do editor, os agentes devem focar em executar, refinar e validar.

---

## Regra principal
Não usar o mesmo agente para tudo.

Cada agente deve atuar apenas dentro da sua natureza principal de trabalho.

Naturezas principais deste workspace:
- estrutural / funcional
- visual
- revisão / testes / fechamento

Se a demanda estiver misturada, quebrar em partes antes de executar.

---

## Agentes ativos neste workspace

### 1. Builder / Executor
Função principal:
- executar alterações estruturais e funcionais no projeto
- atuar diretamente no código
- organizar módulos, páginas, rotas, estados, contratos de dados/mock e shared
- preparar a base para futura integração com backend quando necessário

O que faz:
- reestrutura páginas e módulos
- consolida rotas
- limpa sobras e duplicações
- revisa contratos de dados/mock
- ajusta estados, ações, modais, destinos e comportamento
- prepara o front para backend posterior
- mexe em shared quando o reuso for real
- executa alterações de código com escopo controlado

O que não faz:
- não faz redesign visual amplo
- não propõe direção estratégica de produto
- não mistura visual amplo com estrutura
- não implementa backend real fora da rodada atual
- não altera áreas fora do escopo pedido

Quando usar:
- quando a tarefa já estiver definida
- quando for necessário mexer em estrutura
- quando for necessário mexer em funcionalidade
- quando for necessário preparar a base para integração futura
- quando a alteração precisar acontecer diretamente no código

Saída esperada:
- alteração objetiva
- escopo respeitado
- código limpo e coerente
- base mais pronta para a próxima etapa

---

### 2. UI Refiner
Função principal:
- refinar a interface visual de módulos, páginas e componentes já amarrados estrutural e funcionalmente

O que faz:
- melhora hierarquia visual
- melhora espaçamento
- melhora densidade
- melhora consistência entre páginas
- melhora responsividade
- melhora estados interativos
- melhora percepção de produto profissional
- refina componentes shared visuais sem reabrir arquitetura

O que não faz:
- não altera arquitetura do módulo
- não muda fluxo funcional
- não redefine regras de produto
- não cria backend
- não faz reestruturação ampla de páginas

Quando usar:
- quando a estrutura já estiver resolvida
- quando o comportamento principal já estiver coerente
- quando a demanda for claramente visual
- quando o objetivo for melhorar leitura, acabamento e consistência

Saída esperada:
- interface mais madura
- melhoria perceptível
- consistência maior
- sem quebrar estrutura ou fluxo

---

### 3. Review / QA
Função principal:
- revisar a rodada executada
- validar consistência
- apoiar testes
- fechar a fase atual com mais segurança

O que faz:
- revisa alterações recentes
- identifica incoerências
- aponta risco de regressão
- sugere ou cria smoke tests quando fizer sentido
- valida comportamento básico
- valida responsividade
- verifica se a tarefa realmente foi cumprida
- ajuda a preparar a rodada para seguir adiante

O que não faz:
- não redefine arquitetura
- não faz redesign visual amplo
- não abre nova frente de desenvolvimento
- não cria escopo novo
- não substitui o Builder em alterações estruturais grandes

Quando usar:
- após rodadas relevantes
- antes de considerar um módulo fechado
- quando houver dúvida se algo ficou realmente pronto
- quando quiser checar impacto de alterações recentes

Saída esperada:
- validação clara da rodada
- bugs ou riscos apontados
- checklist curto de pendências
- mais segurança para avançar

---

## Ordem recomendada de uso

### Fluxo padrão
1. Builder / Executor
2. UI Refiner
3. Review / QA

### Regra
- não chamar UI Refiner antes de a estrutura e a função estarem minimamente amarradas
- não chamar Review / QA para substituir definição de escopo
- não misturar grandes mudanças estruturais e grandes refinamentos visuais na mesma passada sem necessidade

---

## Estado atual da RecreaLink

Considere como base operacional:
- o projeto já está avançado em front-end
- não deve ser tratado como projeto inicial vazio
- o módulo Recreador é referência-base
- a etapa atual está mais ligada a refinamento estrutural geral, shared e consolidação
- chat, notificações e shell compartilhado são frentes sensíveis do momento
- Pai permanece como referência visual por enquanto
- Etapa 4 não é foco atual

---

## Regra do MVP
Sempre usar o núcleo do MVP como filtro de decisão.

Perfis centrais:
- Recreador
- Empresa de Recreação — Hotelaria
- Empresa de Recreação — Eventos

Fluxo principal:
- criação/publicação de evento e vaga
- candidatura
- convite
- aceite
- bloqueio automático de disponibilidade
- bloqueio automático de conflito
- chat
- suporte mínimo
- notificações básicas

Tudo que fugir disso deve ser tratado com cuidado para não expandir escopo sem necessidade.

---

## Regras gerais de execução
- analisar primeiro os arquivos realmente relevantes
- não alterar arquivos fora do escopo
- manter alterações localizadas quando possível
- quebrar tarefas amplas em subtarefas
- respeitar a etapa atual do projeto
- preservar coerência entre módulos
- reutilizar shared quando o reuso for real
- evitar duplicação desnecessária
- agir com cautela ao editar arquivos reais
- resumir rapidamente o que foi alterado ao final

---

## Regra de estilo e stack
Sempre respeitar:
- React
- TypeScript
- styled-components
- sem uso de `:root`
- variáveis visuais globais em arquivo global apropriado
- Redux apenas quando houver necessidade real de estado global
- sem abstrações desnecessárias
- sem mudanças “a mais”

---

## Objetivo deste sistema de agentes
Este workspace deve ajudar a:
- acelerar execução com mais precisão
- separar melhor os tipos de tarefa
- reduzir retrabalho
- melhorar qualidade das rodadas
- consolidar a Etapa 1 com mais coerência
- preparar a base para a Etapa 2 com mais segurança