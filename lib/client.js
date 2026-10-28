window.__ModuleLoader__.load({
  id: 'dsh-conversation-icons',
  factory(require) {
    const React = require('react')
    const { useCallback, useMemo, useSyncExternalStore } = React
    const { Button, MenuItemButton, Modal } = require('@deepseek-ai/dsh-client-ui-primitives')

const STORAGE_KEY = 'dsh-session-icons:v1'
const TOOL_NAME = 'dsh_session_icons_assign'
const CLIENT_EVENT = 'dsh-session-icons:assign'

const svg = (body, viewBox = '0 0 24 24') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
const duo = (body, accent = '', viewBox = '0 0 24 24') => svg(`<g class="dsi-duo-fill" stroke="none">${body}${accent}</g><g class="dsi-duo-primary">${body}</g><g class="dsi-duo-secondary">${accent}</g>`, viewBox)

const ICONS = Object.freeze([
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

const COLORS = Object.freeze([
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

function normalizeAssignment(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const icon = iconIds.has(value.icon) ? value.icon : LEGACY_ICONS[value.icon]
  const color = colorIds.has(value.color) ? value.color : LEGACY_COLORS[value.color]
  if (!iconIds.has(icon) || !colorIds.has(color)) return null
  return { icon, color }
}

function normalizeAssignments(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const result = {}
  for (const [sessionId, assignment] of Object.entries(value)) {
    const normalized = normalizeAssignment(assignment)
    if (sessionId && normalized) result[sessionId] = normalized
  }
  return result
}

function readAssignments(storage) {
  if (!storage) return {}
  try { return normalizeAssignments(JSON.parse(storage.getItem(STORAGE_KEY) ?? '{}')) } catch { return {} }
}

function writeAssignments(storage, assignments) {
  if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(normalizeAssignments(assignments)))
}

function getIcon(id) { return ICONS.find((item) => item.id === id) ?? ICONS[0] }
function getColor(id) { return COLORS.find((item) => item.id === id) ?? COLORS[12] }

function createAssignPayload(sessionId, icon, color) {
  const normalized = normalizeAssignment({ icon, color })
  if (!sessionId || typeof sessionId !== 'string' || !normalized) return null
  return { sessionId, ...normalized }
}


const h = React.createElement
const listeners = new Set()
let assignments = typeof window === 'undefined' ? {} : readAssignments(window.localStorage)
let request = null
let revision = 0
let cachedView = Object.freeze({ assignments, request, revision })

function emit() {
  revision += 1
  cachedView = Object.freeze({ assignments, request, revision })
  for (const listener of listeners) listener()
}
function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) }
function snapshot() { return cachedView }
function useView() { return useSyncExternalStore(subscribe, snapshot, snapshot) }

function persist(next, changedSessionId) {
  assignments = next
  writeAssignments(window.localStorage, assignments)
  window.dispatchEvent(new CustomEvent('dsh-session-icons-change', { detail: { sessionId: changedSessionId } }))
  emit()
}
function updateAssignment(sessionId, value) {
  const normalized = normalizeAssignment(value)
  if (sessionId && normalized) persist({ ...assignments, [sessionId]: normalized }, sessionId)
}
function removeAssignment(sessionId) {
  const next = { ...assignments }
  delete next[sessionId]
  persist(next, sessionId)
}
function openPicker(sessionId, displayTitle = '') { request = { sessionId, displayTitle }; emit() }
function closePicker() { request = null; emit() }
function stop(event) { event.preventDefault(); event.stopPropagation() }

function SvgIcon({ iconId, colorId, muted = false, size = 18 }) {
  const icon = getIcon(iconId)
  const color = getColor(colorId)
  return h('span', {
    className: 'dsi-svg',
    style: { color: muted ? 'var(--dsw-alias-label-tertiary)' : color.value, width: size, height: size },
    'aria-hidden': 'true',
    dangerouslySetInnerHTML: { __html: icon.svg },
  })
}

function LeadingIcon({ sessionId }) {
  const { assignments: current } = useView()
  const value = current[sessionId]
  if (!value) return null
  return h('button', {
    type: 'button', className: 'dsi-leading dsi-leading-chosen',
    'aria-label': '切换会话图标', title: '切换会话图标', onPointerDown: stop,
    onClick(event) { stop(event); openPicker(sessionId) },
  }, h(SvgIcon, { iconId: value.icon, colorId: value.color, size: 14 }))
}

function SessionIconMenuItem({ sessionId, displayTitle, useMenuOpenState }) {
  const { assignments: current } = useView()
  const value = current[sessionId]
  const [, setMenuOpen] = useMenuOpenState()
  return h(MenuItemButton, {
    icon: h(SvgIcon, { iconId: value?.icon ?? 'sparkles', colorId: value?.color ?? 'blue', muted: !value, size: 14 }),
    onSelect() { setMenuOpen(false); openPicker(sessionId, displayTitle) },
  }, value ? '切换图标' : '设置图标')
}

function PickerOverlay() {
  const view = useView()
  const pending = view.request
  const value = pending ? view.assignments[pending.sessionId] : undefined
  const selectedIcon = value?.icon ?? null
  const selectedColor = value?.color ?? 'blue'
  const chooseIcon = useCallback((icon) => {
    if (!pending) return
    if (icon === null) removeAssignment(pending.sessionId)
    else updateAssignment(pending.sessionId, { icon, color: selectedColor })
  }, [pending, selectedColor])
  const chooseColor = useCallback((color) => pending && selectedIcon && updateAssignment(pending.sessionId, { icon: selectedIcon, color }), [pending, selectedIcon])
  const title = useMemo(() => pending?.displayTitle ? `设置“${pending.displayTitle}”的图标` : '设置会话图标', [pending])

  return h(Modal, {
    open: pending !== null, title, closeLabel: '关闭图标选择器', onClose: closePicker, className: 'dsi-modal',
    footer: h('div', { className: 'dsi-footer' },
      value ? h(Button, { variant: 'secondary', onClick() { removeAssignment(pending.sessionId); closePicker() } }, '恢复默认') : null,
      h(Button, { variant: 'primary', onClick: closePicker }, '完成')),
  }, h('div', { className: 'dsi-picker' },
    h('section', { 'aria-labelledby': 'dsi-icons-heading' },
      h('h3', { id: 'dsi-icons-heading', className: 'dsi-heading' }, '选择图标'),
      h('div', { className: 'dsi-icon-grid', role: 'radiogroup', 'aria-label': '会话图标' }, [
        h('button', {
          key: 'none', type: 'button', className: selectedIcon === null ? 'dsi-icon-choice dsi-icon-none dsi-selected' : 'dsi-icon-choice dsi-icon-none',
          role: 'radio', 'aria-checked': selectedIcon === null, 'aria-label': '不设置图标', title: '不设置图标',
          onClick: () => chooseIcon(null),
        }, h('span', { className: 'dsi-none-mark', 'aria-hidden': 'true' })),
        ...ICONS.map((icon) => h('button', {
          key: icon.id, type: 'button', className: selectedIcon === icon.id ? 'dsi-icon-choice dsi-selected' : 'dsi-icon-choice',
          role: 'radio', 'aria-checked': selectedIcon === icon.id, 'aria-label': icon.label, title: icon.label,
          onClick: () => chooseIcon(icon.id),
        }, h(SvgIcon, { iconId: icon.id, colorId: selectedColor, size: 22 }))),
      ])),
    h('section', { 'aria-labelledby': 'dsi-colors-heading' },
      h('h3', { id: 'dsi-colors-heading', className: 'dsi-heading' }, '选择颜色'),
      h('div', { className: 'dsi-color-grid', role: 'radiogroup', 'aria-label': '图标颜色' }, COLORS.map((color) => h('button', {
        key: color.id, type: 'button', className: selectedColor === color.id && selectedIcon ? 'dsi-color-choice dsi-selected' : 'dsi-color-choice',
        role: 'radio', 'aria-checked': Boolean(selectedIcon && selectedColor === color.id), 'aria-label': color.label, title: selectedIcon ? color.label : '请先选择图标',
        disabled: !selectedIcon, style: { '--dsi-color': color.value }, onClick: () => chooseColor(color.id),
      }, h('span', { className: 'dsi-color-dot', 'aria-hidden': 'true' })))))))
}

function ensureStyles() {
  if (typeof document === 'undefined' || document.querySelector('style[data-plugin-css="dsh-session-icons"]')) return
  const style = document.createElement('style')
  style.dataset.pluginCss = 'dsh-session-icons'
  style.textContent = `
.dsi-leading{width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:var(--dsw-radius-xs);background:transparent;cursor:pointer;pointer-events:auto;transition:opacity .12s ease,background .12s ease}
.dsi-leading:hover,.dsi-leading:focus-visible{background:var(--dsw-alias-interactive-bg-hover);outline:none}.dsi-leading-chosen{opacity:1}
.dsi-svg{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}.dsi-svg svg{display:block;width:100%;height:100%}.dsi-duo-fill{fill:currentColor;opacity:.18}.dsi-duo-primary,.dsi-duo-secondary{stroke:currentColor;opacity:1;stroke-width:1.8}
.dsi-modal{width:min(590px,calc(100vw - 32px))}.dsi-picker{display:grid;gap:22px;padding:2px 0 6px}.dsi-heading{margin:0 0 10px;color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:600}
.dsi-icon-grid{display:grid;grid-template-columns:repeat(8,minmax(42px,1fr));gap:8px}.dsi-icon-choice,.dsi-color-choice{border:1px solid transparent;background:var(--dsw-alias-bg-layer-2);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
.dsi-icon-choice{height:44px;border-radius:var(--dsw-radius-sm)}.dsi-icon-choice:hover,.dsi-color-choice:hover{background:var(--dsw-alias-interactive-bg-hover)}.dsi-selected{border-color:var(--dsw-alias-border-primary);box-shadow:0 0 0 2px var(--dsw-alias-interactive-bg-hover)}
.dsi-icon-none{color:var(--dsw-alias-label-tertiary)}.dsi-none-mark{width:19px;height:19px;border:1.8px solid #9ca3af;border-radius:50%;position:relative}.dsi-none-mark::after{content:'';position:absolute;left:2px;right:2px;top:7.7px;height:1.8px;background:#9ca3af;transform:rotate(-45deg);transform-origin:center}
.dsi-icon-choice:focus-visible,.dsi-color-choice:focus-visible{outline:2px solid var(--dsw-alias-label-primary);outline-offset:2px}.dsi-color-grid{display:grid;grid-template-columns:repeat(9,1fr);gap:9px}.dsi-color-choice{aspect-ratio:1.45;border-radius:var(--dsw-radius-sm);padding:4px;background:transparent}
.dsi-color-choice:disabled{opacity:.45;cursor:not-allowed}.dsi-color-dot{width:100%;height:100%;min-width:22px;min-height:22px;border-radius:999px;background:var(--dsi-color);box-shadow:inset 0 0 0 1px rgb(0 0 0/.12)}.dsi-footer{display:flex;gap:8px;justify-content:flex-end;width:100%}
@media(max-width:520px){.dsi-icon-grid{grid-template-columns:repeat(4,1fr)}.dsi-color-grid{grid-template-columns:repeat(5,1fr)}}`
  document.head.appendChild(style)
}

function bindGlobalEvents(ctx) {
  const onStorage = (event) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return
    assignments = readAssignments(window.localStorage); emit()
  }
  const onAssign = (event) => {
    const payload = event?.detail ?? event
    if (payload?.sessionId) updateAssignment(payload.sessionId, payload)
  }
  window.addEventListener('storage', onStorage)
  ctx.events.on(CLIENT_EVENT, onAssign)
}

const inject = ['slots']

function apply(ctx) {
  ensureStyles()
  bindGlobalEvents(ctx)
  ctx.slots.inject('sidebar.session.row.leading', () => ctx.slots.register({ name: 'sidebar.session.row.leading', id: 'session-icons-leading', order: 100 }, LeadingIcon))
  ctx.slots.inject('sidebar.workspaces.session.menu.item', () => ctx.slots.register({ name: 'sidebar.workspaces.session.menu.item', id: 'session-icons-menu', order: 250 }, SessionIconMenuItem))
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'session-icons-picker', order: 100 }, PickerOverlay))
}


    return { inject, apply }
  },
})
