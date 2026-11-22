// GitHub Pages cannot rewrite unknown paths to index.html, so a deep link such as
// /projects would 404. Pages serves 404.html for those requests; a copy of the built
// index.html lets the Vue router resolve the route client-side.
import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'

const outDir = join(process.cwd(), 'dist')

await copyFile(join(outDir, 'index.html'), join(outDir, '404.html'))
console.log('spa-fallback: wrote dist/404.html')
