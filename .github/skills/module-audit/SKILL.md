---
name: module-audit
description: Audita um módulo da RecreaLink para separar núcleo, complementar e futuro e preparar a próxima descida.
---

# Skill: Module Audit — RecreaLink

## Finalidade
Esta skill serve para auditar um módulo da RecreaLink de forma objetiva, usando o método oficial do projeto.

Ela deve ser usada quando for necessário:
- entender o estado atual de um módulo
- separar núcleo, complementar e futuro
- identificar excessos, sobras e desorganização
- revisar shared vs específico
- revisar contratos de dados/mock
- preparar o módulo para a próxima descida

---

## Contexto obrigatório
A RecreaLink não deve ser tratada como projeto inicial vazio.

O projeto já possui:
- base avançada de front-end
- método operacional por módulo
- MVP com núcleo funcional definido
- módulo Recreador como referência-base
- etapa atual focada em consolidação/refinamento da Etapa 1 e preparação para a Etapa 2

O objetivo desta skill não é redesenhar tudo nem iniciar backend real.

---

## Método que deve orientar a auditoria
Usar sempre esta lógica:

1. Estrutural
2. Funcional
3. Visual
4. Testes / fechamento
5. Documentação curta

Na auditoria, priorizar principalmente:
- estrutural
- funcional

Visual só deve entrar como observação, sem reabrir arquitetura.

---

## Núcleo do MVP
Usar sempre como filtro de decisão:

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

Tudo que fugir disso deve ser classificado com cuidado como:
- complementar
- futuro
- fora do foco atual

---

## O que a skill deve analisar
Ao auditar um módulo, revisar:

- páginas existentes
- rotas
- nomenclatura
- organização do módulo
- sobreposição de responsabilidades
- componentes shared envolvidos
- contratos de dados/mock
- estados principais
- pontos de integração futura
- sinais de retrabalho

---

## O que a skill deve devolver
A saída da skill deve ser objetiva e organizada assim:

1. leitura rápida do módulo atual  
2. o que é núcleo agora  
3. o que é complementar  
4. o que deve ficar para depois  
5. o que está sobrando, repetido ou mal amarrado  
6. o que deveria ser shared e o que deve continuar específico  
7. quais contratos de dados/mock precisam existir ou ser ajustados  
8. o que ajustar primeiro  
9. checklist curto para considerar o módulo pronto para a próxima descida

---

## Regras
- ser objetivo
- não inventar escopo novo
- não propor backend real fora do momento correto
- não propor redesign completo
- não reabrir o projeto inteiro
- focar no módulo pedido
- tratar a auditoria como ferramenta prática de execução

---

## Quando usar
Usar esta skill quando:
- houver dúvida sobre o estado real de um módulo
- o módulo parecer desamarrado
- for necessário preparar o módulo para backend depois
- for necessário repetir a mesma lógica em Hotelaria, Empresa Eventos ou outros módulos

---

## Resultado esperado
Ao final da auditoria, o módulo deve ficar mais claro em:
- prioridade
- escopo
- organização
- preparação para a próxima fase