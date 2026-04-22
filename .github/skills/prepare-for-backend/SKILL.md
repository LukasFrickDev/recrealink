---
name: prepare-for-backend
description: Prepara um módulo da RecreaLink para a descida funcional real e futura integração com backend.
---

# Skill: Prepare for Backend — RecreaLink

## Finalidade
Esta skill serve para preparar um módulo da RecreaLink para a futura implementação funcional real com backend.

Ela deve ser usada quando o módulo já estiver minimamente amarrado em estrutura e fluxo e precisar descer para:
- entidades
- contratos de dados
- estados reais
- integrações futuras
- regras de domínio
- preparação para auth, APIs e persistência

---

## Contexto obrigatório
A RecreaLink já possui:
- front-end avançado
- MVP oficial definido
- proposta por etapas definida
- método operacional por módulo
- módulo Recreador como referência-base

A etapa atual ainda exige controle de escopo.

Esta skill não deve iniciar backend completo de forma caótica.
Ela deve preparar a descida de forma organizada e segura.

---

## Quando usar
Usar esta skill quando:
- o módulo já passou por rodada estrutural
- o fluxo principal da página ou módulo já está claro
- os mocks já representam minimamente o domínio
- for necessário preparar a transição para backend real
- for necessário saber o que precisa existir em dados, entidades e comportamento antes da integração

Não usar esta skill:
- quando o módulo ainda estiver bagunçado estruturalmente
- quando ainda houver dúvida forte sobre o que é núcleo ou futuro
- quando a demanda ainda for só visual
- quando a etapa atual ainda estiver em redefinição de páginas

---

## Método que deve orientar a preparação
Usar esta ordem:

1. confirmar o núcleo funcional do módulo
2. identificar entidades envolvidas
3. identificar contratos de dados necessários
4. identificar estados e transições
5. identificar dependências com auth, perfil, permissões ou outras áreas
6. identificar o que ainda pode continuar mockado
7. identificar a menor descida funcional segura

---

## Núcleo do MVP
Sempre usar como filtro:

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
- notificações básicas
- suporte mínimo

O sistema foi pensado para validar esse núcleo antes de aprofundamentos como comunidade, banco de atividades, mapas, pai e mãe funcional e monetização futura. :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

---

## O que a skill deve analisar
Ao preparar um módulo para backend, revisar:

- páginas e fluxos principais do módulo
- ações reais do usuário
- botões e destinos relevantes
- estados e transições
- contratos de dados/mock atuais
- entidades necessárias
- relacionamentos
- dependências com outros módulos
- dependências com auth/perfis/permissões
- risco de retrabalho se descer cedo demais

---

## O que a skill deve devolver
A saída deve ser objetiva e organizada assim:

1. leitura rápida do estado do módulo para descida funcional  
2. fluxo principal que deve virar verdade primeiro  
3. entidades principais envolvidas  
4. contratos de dados que precisam existir  
5. estados e transições importantes  
6. dependências com auth, perfil, permissões ou outros módulos  
7. o que pode continuar mockado por enquanto  
8. menor descida funcional segura  
9. checklist curto antes de começar backend real

---

## Regras
- ser objetivo
- não propor backend completo de uma vez
- não expandir escopo além do módulo/fluxo pedido
- não reabrir estrutura já consolidada sem necessidade
- priorizar a menor descida funcional segura
- tratar Redux como opcional e não obrigatório
- só sugerir estado global quando houver necessidade real compartilhada

---

## Regra sobre Redux
Redux não deve entrar automaticamente.

Só faz sentido quando houver necessidade real de:
- autenticação/sessão global
- notificações globais
- estado compartilhado entre múltiplas áreas
- filtros persistentes globais
- consumo do mesmo dado em várias telas ao mesmo tempo

Estados locais simples, formulários locais e fluxos isolados não devem ser empurrados para Redux sem necessidade.

---

## Resultado esperado
Ao final da execução desta skill, deve ficar claro:
- qual fluxo do módulo desce primeiro
- quais entidades precisam existir
- quais contratos precisam ser ajustados
- o que ainda pode continuar mockado
- qual é o ponto certo para começar backend real sem gerar retrabalho