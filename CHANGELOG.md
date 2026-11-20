# Changelog

## [2026-11-20] - Serve the Site From dartalib.tech

**What changed:** Set the Pages custom domain to `dartalib.tech` via `gh api PUT /repos/TalibMushtaq/TalibMushtaq.github.io/pages`, and rewrote the "Custom domain" section of `README.md` with the required A/AAAA/`www` CNAME records.

**Why:** The project needs a branded URL; `dartalib.tech` was already registered to this account but its apex pointed at an unreachable Azure host (`20.235.90.230`) and `www` pointed back at the apex, which breaks HTTPS.

**Impact:** Pages now serves from `https://dartalib.tech/`, and `https://talibmushtaq.github.io/` 301-redirects to it. No `CNAME` file is committed — Actions-based publishing ignores build-output `CNAME` files, so the domain lives only in the repository's Pages settings.

**Follow-ups:** HTTPS enforcement stays off until GitHub issues the Let's Encrypt certificate for the new domain; re-enable it once `https_certificate.state` is `approved`.

## [2026-11-20] - Bump Pages Workflow Actions to Node 24 Runtimes

**What changed:** Updated `.github/workflows/deploy.yml` to `actions/checkout@v7`, `actions/setup-node@v7`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, and `actions/deploy-pages@v5`.

**Why:** The v4/v5/v6-era majors still target the Node 20 runner, which GitHub now forces onto Node 24 and flags on every run; the newer majors ship Node 24 natively.

**Impact:** Deployment behavior is unchanged; the deprecation annotations disappear from workflow runs.

## [2026-11-20] - Barebones React + Vite Scaffold, GitHub Pages CI

**What changed:** Added a Vite 8 / React 19 scaffold (`index.html`, `vite.config.js`, `src/`, `package.json`, `package-lock.json`, `.oxlintrc.json`). Set `index.html` title/meta to Talib Mushtaq, renamed the npm package from `scaffold` to `talibmushtaq.github.io`, replaced the repo `README.md`, added `.github/workflows/deploy.yml`, and deleted the stale `CNAME` file.

**Why:** Bootstrap the portfolio repository with a working build and an automated publish path. The `CNAME` pointed at `talibmushtaq.me`, whose registration expired; with it present, GitHub Pages redirected the `.github.io` URL to a Namecheap parking page.

**Impact:** Site builds with `npm run build` and deploys to `https://talibmushtaq.github.io/` on every push to `main`. No application code, sections, or styling were added — Vite's default template is intentionally left in place.

**Follow-ups:** Replace `src/App.jsx` with the portfolio layout. Pages settings must be switched to `build_type: workflow` and the custom domain cleared, otherwise the legacy branch build keeps serving the old config. Re-adding `talibmushtaq.me` requires renewal plus the DNS steps documented in `README.md`.
