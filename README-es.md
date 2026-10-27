# dsh-session-icons

## 功能

Complemento DSH para asignar a cada conversación un icono SVG y uno de 20 colores; incluye selector, restauración, persistencia local y una herramienta para el modelo.

## 官方扩展点

Usa `sidebar.session.row.leading`, `sidebar.workspaces.session.menu.item` y `shell.overlay`.

## 开发与验证

Ejecute `npm run check` y `dsh-plugin-dev check --strict --cwd .`.

## 安装

Ejecute `dsh plugin --profile web add ./dsh-session-icons` y reinicie el perfil Web cuando se solicite.

## 数据格式

La configuración se guarda en `localStorage` con la clave `dsh-session-icons:v1`.

## 许可

MIT
