# TalibMushtaq.github.io

Personal portfolio — React 19 + Vite.

Live at **https://dartalib.tech/** · `https://talibmushtaq.github.io/` redirects there.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
npm run lint
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` to GitHub Pages via Actions. No build output is committed.

## Custom domain

The site is served from `dartalib.tech` (apex, registered at Namify; DNS managed
by ResellerClub/LogicBoxes nameservers). The domain is configured in
Settings → Pages, so no `CNAME` file is needed — files in the build output are
ignored for Actions-based publishing.

Required DNS records:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `talibmushtaq.github.io` |

`www` must point at `talibmushtaq.github.io`; pointing it at the apex breaks
HTTPS. GitHub handles the `www` → apex redirect itself.
