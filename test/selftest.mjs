import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { COLORS, ICONS, TOOL_NAME } from '../src/model.js'

const root = new URL('../', import.meta.url)
const [pkgText, patch, source, hostSource, builtClient, builtHost, builtModel, readme, license, icon] = await Promise.all([
  readFile(new URL('package.json', root), 'utf8'), readFile(new URL('cordis.patch.yml', root), 'utf8'),
  readFile(new URL('src/client.js', root), 'utf8'), readFile(new URL('src/index.js', root), 'utf8'),
  readFile(new URL('lib/client.js', root), 'utf8'), readFile(new URL('lib/index.js', root), 'utf8'),
  readFile(new URL('lib/model.js', root), 'utf8'), readFile(new URL('README.md', root), 'utf8'),
  readFile(new URL('LICENSE', root), 'utf8'), readFile(new URL('icon.svg', root), 'utf8'),
])
const pkg = JSON.parse(pkgText)

assert.equal(pkg.version, '0.2.0')
assert.equal(pkg.dsh.client.platform, 'web')
assert.deepEqual(pkg.dsh.client.inject, ['@deepseek-ai/dsh-client-ui-slots'])
assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
assert.equal(COLORS.length, 20)
assert.ok(ICONS.length >= 16)
assert.equal(pkg.name, 'dsh-conversation-icons')
assert.match(patch, /name: dsh-conversation-icons/)
for (const slot of ['sidebar.session.row.leading', 'sidebar.workspaces.session.menu.item', 'shell.overlay']) assert.match(source, new RegExp(slot.replaceAll('.', '\\.')))
for (const label of ['切换图标', '设置图标', '选择图标', '选择颜色', '恢复默认', '完成']) assert.ok(source.includes(label), `缺少中文文案：${label}`)
assert.match(source, /useSyncExternalStore/)
assert.match(source, /dangerouslySetInnerHTML/)
assert.match(source, /addEventListener\('storage'/)
assert.match(hostSource, /ctx\.tools\.define\(TOOL_NAME/)
assert.equal(TOOL_NAME, 'dsh_session_icons_assign')
assert.match(hostSource, /ctx\.events\.emit/)
assert.ok(builtClient.length > 5000)
assert.ok(builtHost.length > 500)
assert.ok(builtModel.length > 5000)
assert.ok(readme.includes('DSH 0.2.1'))
assert.ok(license.includes('MIT License'))
assert.match(icon, /<svg/)

console.log('selftest: OK')
console.log(`slots: 3; icons: ${ICONS.length}; colors: ${COLORS.length}; built client bytes: ${builtClient.length}`)
