# TalibMushtaq.github.io

Personal portfolio — React 19 + Vite.

Live at **https://talibmushtaq.github.io/**

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

`talibmushtaq.me` is not in use (its registration lapsed). To re-enable it:

1. Renew the domain and point DNS at GitHub Pages — `A` records to
   `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`, and `CNAME www` to
   `talibmushtaq.github.io`.
2. Add the domain under Settings → Pages (this creates a `CNAME` file).
3. If using a `CNAME` file, place it in `public/` so Vite copies it into `dist/`.
