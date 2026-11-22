# TalibMushtaq.github.io

Personal portfolio — Vue 3 + Vite.

Live at **https://dartalib.tech/** · `https://talibmushtaq.github.io/` redirects there.

## Stack

- Vue 3 (`<script setup>`, Composition API)
- Vue Router 5 with hash history, so deep links work on GitHub Pages without a
  server-side rewrite
- Vite 8, oxlint

## Structure

```
index.html              shell: fonts, meta, pre-paint theme script
src/
  main.js               mount point
  App.vue               router outlet + custom cursor + route transition
  router/index.js       /, /projects, /contact (hash history) and titles
  styles/theme.css      design tokens, dark palette, base styles, focus states
  composables/useTheme.js   light/dark state persisted to localStorage
  data/site.js          name, socials, contact platforms, project list
  data/icons.js         inline SVG brand marks
  components/
    NavBar.vue          accent bar with links and theme toggle
    ThemeToggle.vue     shared light/dark switch
    BadgeColumn.vue     accent column with the rotating nameplate + avatar
  views/
    Home.vue            split hero: badge column + intro copy
    Projects.vue        full-height strips that expand on hover
    Contact.vue         searchable contact list
```

Content lives in `src/data/site.js`; change copy in the view files. `site.email`
is intentionally empty — fill it in and the Email row on the contact page appears.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the built output
npm run lint
```

Deployment is handled by `.github/workflows/deploy.yml` on every push to `main`.

## Design

The layout follows the split-screen portfolio of
[Micah Lindley](https://github.com/micahlt/micahlt.github.io) (two-column hero,
rotating circular nameplate, blended cursor dot, expanding project strips,
searchable contact list), rebuilt with original copy and content.
