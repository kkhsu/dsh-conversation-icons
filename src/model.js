export const STORAGE_KEY = 'dsh-session-icons:v1'
export const TOOL_NAME = 'dsh_session_icons_assign'
export const CLIENT_EVENT = 'dsh-session-icons:assign'

const svg = (body, viewBox = '0 0 24 24') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
const duo = (body, accent = '', viewBox = '0 0 24 24') => svg(`<g class="dsi-duo-fill" stroke="none">${body}${accent}</g><g class="dsi-duo-primary">${body}</g><g class="dsi-duo-secondary">${accent}</g>`, viewBox)

export const ICONS = Object.freeze([
  { id: 'flame', label: '火焰', svg: duo("<path d=\"M12 22c4 0 7-2.8 7-7 0-3.2-1.8-5.9-5.3-9.1.1 2.5-1.1 4.1-2.3 5.1.2-3.7-1.8-6.3-1.8-6.3S5 8.3 5 14.5C5 18.9 8.1 22 12 22Z\"/>", "") },
  { id: 'star', label: '星标', svg: duo("<path d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/>", "") },
  { id: 'heart', label: '爱心', svg: duo("<path d=\"M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z\"/>", "") },
  { id: 'bookmark', label: '书签', svg: duo("<path d=\"M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4Z\"/>", "") },
  { id: 'idea', label: '灵感', svg: duo("<path d=\"M8.4 14.6a6 6 0 1 1 7.2 0c-.9.7-1.6 1.5-1.6 2.4h-4c0-.9-.7-1.7-1.6-2.4Z\"/>", "<path d=\"M10 21h4\"/>") },
  { id: 'code', label: '代码', svg: duo("<path d=\"m8 8-5 4 5 4M16 8l5 4-5 4\"/>", "<path d=\"m14 5-4 14\"/>") },
  { id: 'bolt', label: '闪电', svg: duo("<path d=\"m13 2-8 12h6l-1 8 9-13h-6Z\"/>", "") },
  { id: 'document', label: '文档', svg: duo("<path d=\"M6 3h8l4 4v14H6Z\"/>", "<path d=\"M14 3v5h4\"/>") },
  { id: 'folder', label: '项目', svg: duo("<path d=\"M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z\"/>", "") },
  { id: 'chat', label: '对话', svg: duo("<path d=\"M21 11.5a8 8 0 0 1-8.5 8A9.7 9.7 0 0 1 8 18.3L3 20l1.7-5A8.5 8.5 0 1 1 21 11.5Z\"/>", "") },
  { id: 'check', label: '完成', svg: duo("<circle cx=\"12\" cy=\"12\" r=\"9\"/>", "<path d=\"m8 12 2.6 2.7L16.5 9\"/>") },
  { id: 'palette', label: '设计', svg: duo("<path d=\"M12 3a9 9 0 1 0 0 18h1.5a1.8 1.8 0 0 0 1.2-3.1 1.8 1.8 0 0 1 1.2-3.1H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z\"/>", "<circle cx=\"8\" cy=\"10\" r=\".8\"/>") },
  { id: 'target', label: '目标', svg: duo("<circle cx=\"12\" cy=\"12\" r=\"9\"/>", "<circle cx=\"12\" cy=\"12\" r=\"4\"/>") },
  { id: 'calendar', label: '日程', svg: duo("<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/>", "<path d=\"M3 10h18M8 3v4M16 3v4\"/>") },
  { id: 'play', label: '播放', svg: duo("<circle cx=\"12\" cy=\"12\" r=\"9\"/>", "<path d=\"m10 8 6 4-6 4Z\"/>") },
  { id: 'clock', label: '时间', svg: duo("<circle cx=\"12\" cy=\"12\" r=\"9\"/>", "<path d=\"M12 7v5l3 2\"/>") },
  { id: 'search', label: '搜索', svg: duo("<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/>", "<path d=\"m15.5 15.5 5 5\"/>") },
  { id: 'mail', label: '邮件', svg: duo("<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/>", "<path d=\"m4 7 8 6 8-6\"/>") },
  { id: 'image', label: '图片', svg: duo("<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/>", "<path d=\"m4 17 5-5 4 4 2-2 5 5\"/>") },
  { id: 'database', label: '数据', svg: duo("<ellipse cx=\"12\" cy=\"5.5\" rx=\"8\" ry=\"3\"/><path d=\"M4 5.5v12c0 1.7 3.6 3 8 3s8-1.3 8-3v-12\"/>", "<path d=\"M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3\"/>") },
  { id: 'settings', label: '设置', svg: duo("<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1\"/>", "") },
  { id: 'user', label: '用户', svg: duo("<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21a8 8 0 0 1 16 0\"/>", "") },
  { id: 'shield', label: '安全', svg: duo("<path d=\"M12 3 20 6v5c0 5.2-3.2 8.6-8 10-4.8-1.4-8-4.8-8-10V6Z\"/>", "<path d=\"m9 12 2 2 4-4\"/>") },
  { id: 'home', label: '主页', svg: duo("<path d=\"m3 11 9-8 9 8v10h-6v-6H9v6H3Z\"/>", "") },
  { id: 'cloud', label: '云端', svg: duo("<path d=\"M7 18h11a4 4 0 0 0 .4-8A6.5 6.5 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z\"/>", "") },
  { id: 'pin', label: '位置', svg: duo("<path d=\"M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/>", "") },
  { id: 'lock', label: '锁定', svg: duo("<rect x=\"4\" y=\"10\" width=\"16\" height=\"11\" rx=\"2\"/>", "<path d=\"M8 10V7a4 4 0 0 1 8 0v3\"/>") },
  { id: 'bell', label: '提醒', svg: duo("<path d=\"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z\"/>", "<path d=\"M10 21h4\"/>") },
  { id: 'flag', label: '旗帜', svg: duo("<path d=\"M5 22V4M5 5h12l-2 4 2 4H5\"/>", "") },
  { id: 'gift', label: '礼物', svg: duo("<rect x=\"4\" y=\"10\" width=\"16\" height=\"11\" rx=\"2\"/>", "<path d=\"M3 10h18v4H3zM12 10v11M12 10H8.5a2.5 2.5 0 1 1 2.5-2.5Zm0 0h3.5A2.5 2.5 0 1 0 13 7.5Z\"/>") },
  { id: 'briefcase', label: '工作', svg: duo("<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/>", "<path d=\"M9 7V4h6v3M3 12h18\"/>") },
])

export const COLORS = Object.freeze([
  { id: 'black', label: '墨黑', value: '#111827' },
  { id: 'slate', label: '石板灰', value: '#64748b' },
  { id: 'silver', label: '银灰', value: '#cbd5e1' },
  { id: 'red', label: '红色', value: '#ef4444' },
  { id: 'orange', label: '橙色', value: '#f97316' },
  { id: 'yellow', label: '黄色', value: '#eab308' },
  { id: 'lime', label: '青柠色', value: '#84cc16' },
  { id: 'green', label: '绿色', value: '#16a34a' },
  { id: 'emerald', label: '祖母绿', value: '#10b981' },
  { id: 'teal', label: '蓝绿色', value: '#14b8a6' },
  { id: 'cyan', label: '青色', value: '#06b6d4' },
  { id: 'sky', label: '天蓝色', value: '#0284c7' },
  { id: 'blue', label: '蓝色', value: '#2563eb' },
  { id: 'indigo', label: '靛蓝色', value: '#4f46e5' },
  { id: 'violet', label: '紫罗兰', value: '#7c3aed' },
  { id: 'fuchsia', label: '品红色', value: '#c026d3' },
  { id: 'pink', label: '粉色', value: '#db2777' },
  { id: 'brown', label: '棕色', value: '#92400e' },
])

const iconIds = new Set(ICONS.map((item) => item.id))
const colorIds = new Set(COLORS.map((item) => item.id))
const LEGACY_ICONS = Object.freeze({ sparkles: 'flame', rocket: 'bolt', bug: 'settings', team: 'user', link: 'pin' })
const LEGACY_COLORS = Object.freeze({
  charcoal: 'slate', gray: 'slate', zinc: 'slate', amber: 'yellow', purple: 'violet', rose: 'pink', navy: 'blue',
  mint: 'emerald', coral: 'pink', lavender: 'violet', gold: 'orange', magenta: 'fuchsia',
})

export function normalizeAssignment(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const icon = iconIds.has(value.icon) ? value.icon : LEGACY_ICONS[value.icon]
  const color = colorIds.has(value.color) ? value.color : LEGACY_COLORS[value.color]
  if (!iconIds.has(icon) || !colorIds.has(color)) return null
  return { icon, color }
}

export function normalizeAssignments(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const result = {}
  for (const [sessionId, assignment] of Object.entries(value)) {
    const normalized = normalizeAssignment(assignment)
    if (sessionId && normalized) result[sessionId] = normalized
  }
  return result
}

export function readAssignments(storage) {
  if (!storage) return {}
  try { return normalizeAssignments(JSON.parse(storage.getItem(STORAGE_KEY) ?? '{}')) } catch { return {} }
}

export function writeAssignments(storage, assignments) {
  if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(normalizeAssignments(assignments)))
}

export function getIcon(id) { return ICONS.find((item) => item.id === id) ?? ICONS[0] }
export function getColor(id) { return COLORS.find((item) => item.id === id) ?? COLORS[12] }

export function createAssignPayload(sessionId, icon, color) {
  const normalized = normalizeAssignment({ icon, color })
  if (!sessionId || typeof sessionId !== 'string' || !normalized) return null
  return { sessionId, ...normalized }
}
