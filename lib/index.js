import { CLIENT_EVENT, TOOL_NAME, createAssignPayload } from './model.js'

export const name = 'dsh-conversation-icons'
export const inject = ['tools']

export function apply(ctx) {
  ctx.tools.define(TOOL_NAME, {
    description: '为指定 DSH 会话设置一个图标和颜色。适合用户要求标记、分类或突出某个会话时使用。',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string', description: '目标会话 ID' },
        icon: { type: 'string', description: '图标 ID，例如 star、code、bug、document、check' },
        color: { type: 'string', description: '颜色 ID，例如 blue、red、green、violet、amber' },
      },
      required: ['sessionId', 'icon', 'color'],
      additionalProperties: false,
    },
    async execute(input) {
      const payload = createAssignPayload(input?.sessionId, input?.icon, input?.color)
      if (!payload) {
        return {
          ok: false,
          error: 'sessionId、icon 或 color 无效。请使用插件内置图标和颜色 ID。',
        }
      }
      ctx.events.emit(CLIENT_EVENT, payload)
      return { ok: true, assignment: payload }
    },
  })
}
