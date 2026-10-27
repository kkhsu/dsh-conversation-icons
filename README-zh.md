# dsh-session-icons

## 功能

为每个 DSH 会话设置独立的 SVG 图标和 20 种颜色之一；支持菜单选择、恢复默认、localStorage 持久化与模型工具调用。

## 官方扩展点

使用 `sidebar.session.row.leading`、`sidebar.workspaces.session.menu.item` 与 `shell.overlay`。

## 开发与验证

运行 `npm run check`，再运行 `dsh-plugin-dev check --strict --cwd .`。

## 安装

运行 `dsh plugin --profile web add ./dsh-session-icons`，按提示重启 Web profile。

## 数据格式

配置保存在 `localStorage` 键 `dsh-session-icons:v1` 中。

## 许可

MIT
