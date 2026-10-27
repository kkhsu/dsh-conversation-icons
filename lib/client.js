import React, { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import { Button, MenuItemButton, Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import { CLIENT_EVENT, COLORS, ICONS, STORAGE_KEY, getColor, getIcon, normalizeAssignment, readAssignments, writeAssignments } from './model.js'

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
  const label = value ? '切换会话图标' : '设置会话图标'
  return h('button', {
    type: 'button', className: value ? 'dsi-leading dsi-leading-chosen' : 'dsi-leading dsi-leading-default',
    'aria-label': label, title: label, onPointerDown: stop,
    onClick(event) { stop(event); openPicker(sessionId) },
  }, h(SvgIcon, { iconId: value?.icon ?? 'sparkles', colorId: value?.color ?? 'blue', muted: !value }))
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
  const selectedIcon = value?.icon ?? 'sparkles'
  const selectedColor = value?.color ?? 'blue'
  const chooseIcon = useCallback((icon) => pending && updateAssignment(pending.sessionId, { icon, color: selectedColor }), [pending, selectedColor])
  const chooseColor = useCallback((color) => pending && updateAssignment(pending.sessionId, { icon: selectedIcon, color }), [pending, selectedIcon])
  const title = useMemo(() => pending?.displayTitle ? `设置“${pending.displayTitle}”的图标` : '设置会话图标', [pending])

  return h(Modal, {
    open: pending !== null, title, closeLabel: '关闭图标选择器', onClose: closePicker, className: 'dsi-modal',
    footer: h('div', { className: 'dsi-footer' },
      value ? h(Button, { variant: 'secondary', onClick() { removeAssignment(pending.sessionId); closePicker() } }, '恢复默认') : null,
      h(Button, { variant: 'primary', onClick: closePicker }, '完成')),
  }, h('div', { className: 'dsi-picker' },
    h('section', { 'aria-labelledby': 'dsi-icons-heading' },
      h('h3', { id: 'dsi-icons-heading', className: 'dsi-heading' }, '选择图标'),
      h('div', { className: 'dsi-icon-grid', role: 'radiogroup', 'aria-label': '会话图标' }, ICONS.map((icon) => h('button', {
        key: icon.id, type: 'button', className: selectedIcon === icon.id ? 'dsi-icon-choice dsi-selected' : 'dsi-icon-choice',
        role: 'radio', 'aria-checked': selectedIcon === icon.id, 'aria-label': icon.label, title: icon.label,
        onClick: () => chooseIcon(icon.id),
      }, h(SvgIcon, { iconId: icon.id, colorId: selectedColor, size: 22 }))))),
    h('section', { 'aria-labelledby': 'dsi-colors-heading' },
      h('h3', { id: 'dsi-colors-heading', className: 'dsi-heading' }, '选择颜色'),
      h('div', { className: 'dsi-color-grid', role: 'radiogroup', 'aria-label': '图标颜色' }, COLORS.map((color) => h('button', {
        key: color.id, type: 'button', className: selectedColor === color.id ? 'dsi-color-choice dsi-selected' : 'dsi-color-choice',
        role: 'radio', 'aria-checked': selectedColor === color.id, 'aria-label': color.label, title: color.label,
        style: { '--dsi-color': color.value }, onClick: () => chooseColor(color.id),
      }, h('span', { className: 'dsi-color-dot', 'aria-hidden': 'true' })))))))
}

function ensureStyles() {
  if (typeof document === 'undefined' || document.querySelector('style[data-plugin-css="dsh-session-icons"]')) return
  const style = document.createElement('style')
  style.dataset.pluginCss = 'dsh-session-icons'
  style.textContent = `
.dsi-leading{width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:var(--dsw-radius-xs);background:transparent;cursor:pointer;pointer-events:auto;transition:opacity .12s ease,background .12s ease}
.dsi-leading:hover,.dsi-leading:focus-visible{background:var(--dsw-alias-interactive-bg-hover);outline:none}.dsi-leading-default{opacity:0}:is([data-session-id],li,div):hover>.dsi-leading-default,:is([data-session-id],li,div):focus-within>.dsi-leading-default,.dsi-leading-default:hover,.dsi-leading-default:focus-visible,.dsi-leading-chosen{opacity:1}
.dsi-svg{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}.dsi-svg svg{display:block;width:100%;height:100%}
.dsi-modal{width:min(560px,calc(100vw - 32px))}.dsi-picker{display:grid;gap:22px;padding:2px 0 6px}.dsi-heading{margin:0 0 10px;color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:600}
.dsi-icon-grid{display:grid;grid-template-columns:repeat(8,minmax(42px,1fr));gap:8px}.dsi-icon-choice,.dsi-color-choice{border:1px solid transparent;background:var(--dsw-alias-bg-layer-2);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
.dsi-icon-choice{height:44px;border-radius:var(--dsw-radius-sm)}.dsi-icon-choice:hover,.dsi-color-choice:hover{background:var(--dsw-alias-interactive-bg-hover)}.dsi-selected{border-color:var(--dsw-alias-border-primary);box-shadow:0 0 0 2px var(--dsw-alias-interactive-bg-hover)}
.dsi-icon-choice:focus-visible,.dsi-color-choice:focus-visible{outline:2px solid var(--dsw-alias-label-primary);outline-offset:2px}.dsi-color-grid{display:grid;grid-template-columns:repeat(10,1fr);gap:9px}.dsi-color-choice{aspect-ratio:1;border-radius:999px;padding:4px;background:transparent}
.dsi-color-dot{width:100%;height:100%;min-width:22px;min-height:22px;border-radius:999px;background:var(--dsi-color);box-shadow:inset 0 0 0 1px rgb(0 0 0/.12)}.dsi-footer{display:flex;gap:8px;justify-content:flex-end;width:100%}
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

export const name = 'dsh-session-icons/client'
export const inject = ['slots']

export function apply(ctx) {
  ensureStyles()
  bindGlobalEvents(ctx)
  ctx.slots.inject('sidebar.session.row.leading', () => ctx.slots.register({ name: 'sidebar.session.row.leading', id: 'session-icons-leading', order: 100 }, LeadingIcon))
  ctx.slots.inject('sidebar.workspaces.session.menu.item', () => ctx.slots.register({ name: 'sidebar.workspaces.session.menu.item', id: 'session-icons-menu', order: 250 }, SessionIconMenuItem))
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'session-icons-picker', order: 100 }, PickerOverlay))
}
