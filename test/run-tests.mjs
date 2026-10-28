import assert from 'node:assert/strict'
import { CLIENT_EVENT, COLORS, ICONS, STORAGE_KEY, TOOL_NAME, createAssignPayload, normalizeAssignments, readAssignments, writeAssignments } from '../src/model.js'

let passed = 0
function test(name, fn) {
  fn(); passed += 1; console.log(`ok ${passed} - ${name}`)
}
function storage(initial = {}) {
  const values = new Map(Object.entries(initial))
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), value: (key) => values.get(key) }
}

test('公开稳定的工具名与客户端事件名', () => {
  assert.equal(TOOL_NAME, 'dsh_session_icons_assign')
  assert.equal(CLIENT_EVENT, 'dsh-session-icons:assign')
})
test('调色板包含 18 种唯一且区分明显的颜色', () => {
  assert.equal(COLORS.length, 18)
  assert.equal(new Set(COLORS.map((item) => item.id)).size, 18)
  assert.equal(new Set(COLORS.map((item) => item.value)).size, 18)
  assert.deepEqual(COLORS.map((item) => item.value), ['#111827','#64748b','#cbd5e1','#ef4444','#f97316','#eab308','#84cc16','#16a34a','#10b981','#14b8a6','#06b6d4','#0284c7','#2563eb','#4f46e5','#7c3aed','#c026d3','#db2777','#92400e'])
})
test('图标库包含最终预览顺序的 31 个双色常用图标', () => {
  assert.equal(ICONS.length, 31)
  assert.deepEqual(ICONS.map((item) => item.id), ['flame','star','heart','bookmark','idea','code','bolt','document','folder','chat','check','palette','target','calendar','play','clock','search','mail','image','database','settings','user','shield','home','cloud','pin','lock','bell','flag','gift','briefcase'])
  assert.equal(new Set(ICONS.map((item) => item.id)).size, ICONS.length)
  assert.ok(ICONS.every((item) => item.id && item.label && item.svg.startsWith('<svg') && item.svg.endsWith('</svg>')))
  assert.ok(ICONS.every((item) => item.svg.includes('dsi-duo-fill') && item.svg.includes('dsi-duo-primary') && item.svg.includes('dsi-duo-secondary')))
  assert.ok(ICONS.every((item) => item.svg.includes('stroke="none"')))
})
test('只接受已知图标和颜色并迁移旧配置', () => {
  assert.deepEqual(normalizeAssignments({ valid: { icon: 'star', color: 'pink' }, legacy: { icon: 'sparkles', color: 'rose' }, badIcon: { icon: 'unknown', color: 'blue' }, badColor: { icon: 'star', color: 'unknown' }, empty: null }), { valid: { icon: 'star', color: 'pink' }, legacy: { icon: 'flame', color: 'pink' } })
})
test('工具载荷会校验会话、图标和颜色', () => {
  assert.deepEqual(createAssignPayload('session-1', 'code', 'blue'), { sessionId: 'session-1', icon: 'code', color: 'blue' })
  assert.equal(createAssignPayload('', 'code', 'blue'), null)
  assert.equal(createAssignPayload('session-1', 'missing', 'blue'), null)
})
test('localStorage 数据可以往返并能容忍损坏 JSON', () => {
  const store = storage()
  writeAssignments(store, { s1: { icon: 'heart', color: 'green' } })
  assert.deepEqual(readAssignments(store), { s1: { icon: 'heart', color: 'green' } })
  assert.match(store.value(STORAGE_KEY), /"s1"/)
  assert.deepEqual(readAssignments(storage({ [STORAGE_KEY]: '{broken' })), {})
})
console.log(`tests: ${passed} passed`)
