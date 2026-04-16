# RecreaLink Web

Projeto React + TypeScript + Vite com styled-components, React Router DOM e Redux Toolkit.

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`

## Padrão Arquitetural Compartilhado (Obrigatório)

Este projeto segue uma regra global de consolidação de base compartilhada.

1. Antes de criar qualquer estrutura nova, analise o que já existe.
2. Reutilize, adapte ou estenda antes de criar uma nova versão.
3. Tudo que for comum entre módulos deve ficar em `src/shared`.
4. Cada módulo deve manter apenas o que for realmente específico:
  - labels, ícones e rotas
  - configuração de sidebar/topbar/tabs
  - campos e conteúdos de domínio
5. Evite duplicação estrutural e visual entre dashboards.

## Bases Compartilhadas Atuais

- Shell de dashboard compartilhado:
  - `src/shared/layouts/ModuleDashboardShell`
- Base de settings compartilhada:
  - `src/shared/layouts/SettingsLayoutBase`
  - `src/shared/pages/SettingsPageTemplate`
- Templates de páginas compartilhadas:
  - `src/shared/pages/ChatPageTemplate`
  - `src/shared/pages/NotificationsPageTemplate`
  - `src/shared/pages/UnderConstructionPageTemplate`

## Regra de Settings

As abas `Notificações`, `Usuários` e `Segurança` devem usar o mesmo template compartilhado entre os módulos.

As diferenças devem ficar apenas nas abas de dados específicas de domínio.
