# RecreaLink Web

Projeto React + TypeScript + Vite com styled-components, React Router DOM e Redux Toolkit.

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`

## Padrao Arquitetural Compartilhado (Obrigatorio)

Este projeto segue uma regra global de consolidacao de base compartilhada.

1. Antes de criar qualquer estrutura nova, analise o que ja existe.
2. Reutilize, adapte ou estenda antes de criar uma nova versao.
3. Tudo que for comum entre modulos deve ficar em `src/shared`.
4. Cada modulo deve manter apenas o que for realmente especifico:
   - labels, icones e rotas
   - configuracao de sidebar/topbar/tabs
   - campos e conteudos de dominio
5. Evite duplicacao estrutural e visual entre dashboards.

## Bases Compartilhadas Atuais

- Shell de dashboard compartilhado:
  - `src/shared/layouts/ModuleDashboardShell`
- Base de settings compartilhada:
  - `src/shared/layouts/SettingsLayoutBase`
  - `src/shared/pages/SettingsPageTemplate`
- Templates de paginas compartilhadas:
  - `src/shared/pages/ChatPageTemplate`
  - `src/shared/pages/NotificationsPageTemplate`
  - `src/shared/pages/UnderConstructionPageTemplate`

## Regra de Settings

As abas `Notificacoes`, `Usuarios` e `Seguranca` devem usar o mesmo template compartilhado entre os modulos.

As diferencas devem ficar apenas nas abas de dados especificas de dominio.
