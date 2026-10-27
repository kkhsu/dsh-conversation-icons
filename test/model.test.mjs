import test from 'node:test'
import assert from 'node:assert/strict'
import { CLIENT_EVENT, COLORS, ICONS, STORAGE_KEY, TOOL_NAME, createAssignPayload, normalizeAssignments, readAssignments, writeAssignments } from '../src/model.js'

function storage(initial = {}) {
  const values = new Map(Object.entries(initial))
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), value: (key) => values.get(key) }
}

test('公开稳定的工具名与客户端事件名', () => {
  assert.equal(TOOL_NAME, 'dsh_session_icons_assign')
  assert.equal(CLIENT_EVENT, 'dsh-session-icons:assign')
})

test('调色板恰好包含 20 种唯一颜色', () => {
  assert.equal(COLORS.length, 20)
  assert.equal(new Set(COLORS.map((item) => item.id)).size, 20)
  assert.equal(new Set(COLORS.map((item) => item.value)).size, 20)
})

test('所有图标都使用可解析的内联 SVG', () => {
  assert.ok(ICONS.length >= 16)
  assert.equal(new Set(ICONS.map((item) => item.id)).size, ICONS.length)
  assert.ok(ICONS.every((item) => item.id && item.label && item.svg.startsWith('<svg') && item.svg.endsWith('</svg>')))
})

test('只接受已知图标和颜色的会话配置', () => {
  assert.deepEqual(normalizeAssignments({
    valid: { icon: 'star', color: 'rose' },
    badIcon: { icon: 'unknown', color: 'blue' },
    badColor: { icon: 'star', color: 'unknown' },
    empty: null,
  }), { valid: { icon: 'star', color: 'rose' } })
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
