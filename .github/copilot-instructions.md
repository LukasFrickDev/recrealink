# Copilot Instructions — RecreaLink

## Contexto do projeto
A RecreaLink é uma plataforma web multiárea com foco no MVP de conexão entre recreadores e empresas de recreação.

Perfis centrais do MVP:
- Recreador
- Empresa de Recreação — Hotelaria
- Empresa de Recreação — Eventos

A área de Pais não é prioridade funcional agora e deve permanecer apenas como referência visual enquanto não entrar oficialmente na fase correspondente.

O foco atual do projeto não é criar novos módulos grandes do zero, e sim consolidar, refinar e amarrar corretamente a base já existente para preparar a descida funcional real.

---

## Stack principal obrigatória
Priorizar sempre:
- React
- TypeScript
- styled-components
- React Router
- Redux apenas quando houver necessidade real de estado global
- organização modular
- reaproveitamento de estrutura compartilhada antes de criar duplicações

---

## Regras de estilo e arquitetura
- Não usar `:root`.
- Não centralizar variáveis globais em `:root`.
- Cores, fontes, estilos globais e tokens visuais devem ficar em arquivo global de estilização apropriado do projeto.
- Sempre respeitar o padrão atual do projeto antes de sugerir nova estrutura.
- Reutilizar componentes shared quando o reuso for real.
- Não duplicar componente shared por pequenos ajustes visuais.
- Não criar abstrações desnecessárias.
- Não alterar arquivos fora do escopo pedido.
- Ao editar arquivos reais, agir com cautela e responsabilidade.

---

## Regra principal de condução
Antes de modificar qualquer coisa, identificar em qual natureza de trabalho a tarefa está:

1. Estrutural
2. Funcional
3. Visual
4. Testes / fechamento

Nunca misturar muitas naturezas de mudança na mesma rodada.

Exemplo:
- não fazer refino visual amplo enquanto a estrutura ainda está desorganizada
- não começar backend real enquanto o módulo ainda não está amarrado
- não abrir novas frentes grandes se a frente atual ainda não foi consolidada

---

## Método oficial por módulo
Cada módulo deve seguir, sempre que fizer sentido, esta lógica:

### 1. Estrutural
Objetivo:
- limpar legado e sobras
- consolidar páginas e rotas
- separar núcleo, complementar e futuro
- organizar contratos iniciais de dados/mock
- deixar o módulo pronto para descer depois para funcional

### 2. Funcional
Objetivo:
- revisar comportamento real
- mapear ações, destinos, modais, estados e validações
- simular uso real do produto
- preparar lógica para backend depois

### 3. Visual
Objetivo:
- refinar hierarquia
- melhorar densidade
- melhorar consistência
- melhorar responsividade
- elevar qualidade percebida sem reabrir arquitetura

### 4. Testes
Objetivo:
- validar smoke test
- checar responsividade
- checar fluxo principal
- proteger evolução

### 5. Documentação
Objetivo:
- registrar o que foi feito
- registrar pendências
- preparar base para próxima rodada

---

## Estado atual do projeto
Considere que a RecreaLink já está em estágio avançado de front-end e refinamento estrutural.

Não tratar o projeto como início absoluto.

A base já existe e deve ser:
- analisada antes de mudanças grandes
- respeitada como contexto
- refinada por rodadas curtas
- melhorada sem reabrir tudo ao mesmo tempo

O módulo Recreador deve ser considerado referência-base para os próximos módulos.

Próximas frentes naturais de refinamento compartilhado:
- chat
- notificações
- shell e estruturas compartilhadas relacionadas

---

## Regras do MVP
O núcleo funcional do MVP é:
- cadastro de perfis principais
- publicação de evento e vaga
- candidatura
- convite
- aceite
- bloqueio automático de disponibilidade
- bloqueio automático de conflito
- chat
- suporte mínimo
- notificações básicas

Não priorizar agora:
- financeiro
- pagamentos
- BI avançado
- relatórios complexos
- monetização
- premium
- gamificação
- mapas e complementares fora da fase atual
- aprofundamento funcional da área de Pais

---

## Regras para edição de código
Sempre que receber uma tarefa:
- analisar primeiro apenas os arquivos relevantes
- identificar o escopo exato da alteração
- preservar o restante do projeto
- listar rapidamente o que será alterado
- não fazer mudanças “a mais”
- sinalizar qualquer suposição importante
- ao final, resumir o que foi alterado

Quando a tarefa for localizada:
- manter a alteração localizada

Quando a tarefa for ampla:
- quebrar em subtarefas antes de editar

---

## Regras para mocks e preparação para backend
Enquanto a implementação ainda estiver em fase visual/estrutural/funcional sem backend real:
- usar mocks coerentes com o domínio do produto
- evitar mocks genéricos ou artificiais demais
- manter naming consistente
- preparar shape de dados que facilite futura integração real

Sempre que possível, prever entidades próximas do domínio real, como:
- users
- profiles
- recreators
- companies
- events
- vacancies
- applications
- invites
- availability
- conflicts
- messages
- notifications

Sem implementar backend real quando isso não fizer parte da rodada atual.

---

## Regras para visual
Em tarefas visuais:
- não alterar arquitetura do módulo
- não mudar lógica funcional
- focar em hierarquia, densidade, clareza, ritmo, responsividade e consistência
- usar o sistema visual já existente como base
- evitar alterações visuais sutis demais quando o objetivo for evolução perceptível
- evitar decoração vazia
- priorizar cara de produto operacional profissional

---

## Regras para Redux e estado global
Redux não deve ser usado automaticamente.

Só faz sentido quando houver necessidade real de:
- autenticação/sessão global
- notificações globais
- estados compartilhados entre módulos
- filtros persistentes globais
- dados que precisem ser consumidos em múltiplas áreas simultaneamente

Evitar colocar estado local simples no Redux sem necessidade.

---

## Regras de resposta esperada do agente no workspace
Ao responder ou executar tarefas neste projeto:
- ser objetivo
- não repetir contexto desnecessário
- não propor redesign completo sem solicitação clara
- não inventar escopo novo
- não abrir novas frentes sem necessidade
- sempre trabalhar com foco na rodada atual

Quando houver dúvida entre:
- reestruturar
- funcionalizar
- refinar visualmente

priorizar primeiro:
1. estrutura
2. função
3. visual

---

## Objetivo operacional do workspace
Este workspace deve ajudar a:
- consolidar a Etapa 1 com qualidade
- preparar a descida para a Etapa 2
- reduzir retrabalho
- manter coerência entre módulos
- acelerar execução com segurança
- usar IA como apoio real de construção, sem perder controle arquitetural