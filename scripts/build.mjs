import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
await mkdir(new URL('lib/', root), { recursive: true })
const [modelSource, clientSource] = await Promise.all([
  readFile(new URL('src/model.js', root), 'utf8'),
  readFile(new URL('src/client.js', root), 'utf8'),
])

const bundledModel = modelSource.replaceAll(/^export /gm, '')
const bundledClient = clientSource
  .replace(/^import .*\r?\n/gm, '')
  .replace('export const name = \'dsh-session-icons/client\'\n', '')
  .replace('export const inject =', 'const inject =')
  .replace('export function apply', 'function apply')

const clientBundle = `window.__ModuleLoader__.load({
  id: 'dsh-conversation-icons',
  factory(require) {
    const React = require('react')
    const { useCallback, useMemo, useSyncExternalStore } = React
    const { Button, MenuItemButton, Modal } = require('@deepseek-ai/dsh-client-ui-primitives')

${bundledModel}
${bundledClient}

    return { inject, apply }
  },
})
`

await Promise.all([
  copyFile(new URL('src/index.js', root), new URL('lib/index.js', root)),
  copyFile(new URL('src/model.js', root), new URL('lib/model.js', root)),
  writeFile(new URL('lib/client.js', root), clientBundle),
])
