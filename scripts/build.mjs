import { copyFile, mkdir } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
await mkdir(new URL('lib/', root), { recursive: true })
await Promise.all([
  copyFile(new URL('src/index.js', root), new URL('lib/index.js', root)),
  copyFile(new URL('src/client.js', root), new URL('lib/client.js', root)),
  copyFile(new URL('src/model.js', root), new URL('lib/model.js', root)),
])
