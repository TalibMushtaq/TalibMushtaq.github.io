# Changelog

## [2026-11-20] - Bump Pages Workflow Actions to Node 24 Runtimes

**What changed:** Updated `.github/workflows/deploy.yml` to `actions/checkout@v7`, `actions/setup-node@v7`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, and `actions/deploy-pages@v5`.

**Why:** The v4/v5/v6-era majors still target the Node 20 runner, which GitHub now forces onto Node 24 and flags on every run; the newer majors ship Node 24 natively.

**Impact:** Deployment behavior is unchanged; the deprecation annotations disappear from workflow runs.

## [2026-11-20] - Barebones React + Vite Scaffold, GitHub Pages CI

**What changed:** Added a Vite 8 / React 19 scaffold (`index.html`, `vite.config.js`, `src/`, `package.json`, `package-lock.json`, `.oxlintrc.json`). Set `index.html` title/meta to Talib Mushtaq, renamed the npm package from `scaffold` to `talibmushtaq.github.io`, replaced the repo `README.md`, added `.github/workflows/deploy.yml`, and deleted the stale `CNAME` file.

**Why:** Bootstrap the portfolio repository with a working build and an automated publish path. The `CNAME` pointed at `talibmushtaq.me`, whose registration expired; with it present, GitHub Pages redirected the `.github.io` URL to a Namecheap parking page.

**Impact:** Site builds with `npm run build` and deploys to `https://talibmushtaq.github.io/` on every push to `main`. No application code, sections, or styling were added — Vite's default template is intentionally left in place.

**Follow-ups:** Replace `src/App.jsx` with the portfolio layout. Pages settings must be switched to `build_type: workflow` and the custom domain cleared, otherwise the legacy branch build keeps serving the old config. Re-adding `talibmushtaq.me` requires renewal plus the DNS steps documented in `README.md`.
