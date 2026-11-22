// GitHub Pages cannot rewrite unknown paths to index.html. Two outputs keep clean
// URLs working: a copy of index.html per known route so /projects and /contact are
// served with a 200, and a 404.html fallback for any other deep link.
import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const outDir = join(process.cwd(), 'dist')
const index = join(outDir, 'index.html')

// Keep in sync with the route table in src/router/index.js.
const routes = ['projects', 'contact']

for (const route of routes) {
  const dir = join(outDir, route)
  await mkdir(dir, { recursive: true })
  await copyFile(index, join(dir, 'index.html'))
}

await copyFile(index, join(outDir, '404.html'))
console.log(`spa-fallback: wrote ${routes.length} route pages and 404.html`)
