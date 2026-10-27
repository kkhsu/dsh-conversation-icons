# dsh-session-icons

## 功能

Plugin DSH para atribuir a cada conversa um ícone SVG e uma entre 20 cores; inclui seletor, restauração, persistência local e ferramenta para o modelo.

## 官方扩展点

Usa `sidebar.session.row.leading`, `sidebar.workspaces.session.menu.item` e `shell.overlay`.

## 开发与验证

Execute `npm run check` e `dsh-plugin-dev check --strict --cwd .`.

## 安装

Execute `dsh plugin --profile web add ./dsh-session-icons` e reinicie o perfil Web quando solicitado.

## 数据格式

A configuração fica em `localStorage` na chave `dsh-session-icons:v1`.

## 许可

MIT
