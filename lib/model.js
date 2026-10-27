export const STORAGE_KEY = 'dsh-session-icons:v1'
export const TOOL_NAME = 'dsh_session_icons_assign'
export const CLIENT_EVENT = 'dsh-session-icons:assign'

const svg = (body, viewBox = '0 0 24 24') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`

export const ICONS = Object.freeze([
  { id: 'sparkles', label: '闪光', svg: svg('<path d="m12 3 1.1 3.4L16.5 7.5l-3.4 1.1L12 12l-1.1-3.4-3.4-1.1 3.4-1.1L12 3Z"/><path d="m18.5 13 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"/><path d="m6 14 .9 2.6 2.6.9-2.6.9L6 21l-.9-2.6-2.6-.9 2.6-.9L6 14Z"/>') },
  { id: 'star', label: '星标', svg: svg('<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>') },
  { id: 'heart', label: '爱心', svg: svg('<path d="M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z"/>') },
  { id: 'bookmark', label: '书签', svg: svg('<path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z"/>') },
  { id: 'idea', label: '灵感', svg: svg('<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8.4 14.6a6 6 0 1 1 7.2 0c-.9.7-1.6 1.5-1.6 2.4h-4c0-.9-.7-1.7-1.6-2.4Z"/>') },
  { id: 'code', label: '代码', svg: svg('<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/>') },
  { id: 'bug', label: '问题', svg: svg('<path d="M8 9h8v7a4 4 0 0 1-8 0V9Z"/><path d="M9.5 9V7a2.5 2.5 0 0 1 5 0v2"/><path d="M4 13h4M16 13h4M5 18l3-1M19 18l-3-1M6 8l2 2M18 8l-2 2"/>') },
  { id: 'rocket', label: '发布', svg: svg('<path d="M14 5c2.4-2.4 5.4-2.1 5.4-2.1S19.7 5.9 17 8.5l-4.8 4.8-4.5-4.5L14 5Z"/><path d="m9.2 7.4-4.5.7-2.1 2.1 5.1 1.1M14.7 12.3l-1.1 5.1 2.1 2.1.8-4.5"/><circle cx="15.5" cy="6.8" r="1.2"/><path d="M7.2 15.5c-1.7.3-2.5 1.1-2.8 2.8 1.7-.3 2.5-1.1 2.8-2.8Z"/>') },
  { id: 'document', label: '文档', svg: svg('<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h4M9 12h6M9 16h6"/>') },
  { id: 'folder', label: '项目', svg: svg('<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"/>') },
  { id: 'chat', label: '对话', svg: svg('<path d="M21 11.5a8 8 0 0 1-8.5 8A9.7 9.7 0 0 1 8 18.3L3 20l1.7-5A8.5 8.5 0 1 1 21 11.5Z"/>') },
  { id: 'check', label: '完成', svg: svg('<circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.7L16.5 9"/>') },
  { id: 'palette', label: '设计', svg: svg('<path d="M12 3a9 9 0 0 0 0 18h1.5a1.8 1.8 0 0 0 1.2-3.1 1.8 1.8 0 0 1 1.2-3.1H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z"/><circle cx="7.5" cy="10" r=".7" fill="currentColor" stroke="none"/><circle cx="10" cy="6.8" r=".7" fill="currentColor" stroke="none"/><circle cx="14" cy="6.8" r=".7" fill="currentColor" stroke="none"/>') },
  { id: 'target', label: '目标', svg: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>') },
  { id: 'calendar', label: '日程', svg: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>') },
  { id: 'pin', label: '重点', svg: svg('<path d="m9 3 6 6-2 2 3 4-1 1-4-3-2 2-6-6 6-6Z"/><path d="m8 16-5 5"/>') },
])

export const COLORS = Object.freeze([
  { id: 'slate', label: '石板灰', value: '#64748b' }, { id: 'gray', label: '中性灰', value: '#6b7280' },
  { id: 'zinc', label: '锌灰', value: '#71717a' }, { id: 'red', label: '红色', value: '#ef4444' },
  { id: 'orange', label: '橙色', value: '#f97316' }, { id: 'amber', label: '琥珀色', value: '#f59e0b' },
  { id: 'yellow', label: '黄色', value: '#eab308' }, { id: 'lime', label: '青柠色', value: '#84cc16' },
  { id: 'green', label: '绿色', value: '#22c55e' }, { id: 'emerald', label: '祖母绿', value: '#10b981' },
  { id: 'teal', label: '蓝绿色', value: '#14b8a6' }, { id: 'cyan', label: '青色', value: '#06b6d4' },
  { id: 'sky', label: '天蓝色', value: '#0ea5e9' }, { id: 'blue', label: '蓝色', value: '#3b82f6' },
  { id: 'indigo', label: '靛蓝色', value: '#6366f1' }, { id: 'violet', label: '紫罗兰', value: '#8b5cf6' },
  { id: 'purple', label: '紫色', value: '#a855f7' }, { id: 'fuchsia', label: '品红色', value: '#d946ef' },
  { id: 'pink', label: '粉色', value: '#ec4899' }, { id: 'rose', label: '玫红色', value: '#f43f5e' },
])

const iconIds = new Set(ICONS.map((item) => item.id))
const colorIds = new Set(COLORS.map((item) => item.id))

export function normalizeAssignment(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  if (!iconIds.has(value.icon) || !colorIds.has(value.color)) return null
  return { icon: value.icon, color: value.color }
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
export function getColor(id) { return COLORS.find((item) => item.id === id) ?? COLORS[13] }

export function createAssignPayload(sessionId, icon, color) {
  const normalized = normalizeAssignment({ icon, color })
  if (!sessionId || typeof sessionId !== 'string' || !normalized) return null
  return { sessionId, ...normalized }
}
