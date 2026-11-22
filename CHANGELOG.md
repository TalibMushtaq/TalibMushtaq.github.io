# Changelog

## [2026-11-22] - Use the Script `T` in the Navbar Without the Circle

**What changed:** Added `src/components/ScriptT.vue` holding the supplied script glyph (source `public/script-t-favicon.svg`) as a single reusable `<svg>` with `fill="currentColor"`. `NavBar.vue` now renders `<ScriptT class="mark" />` in place of the bordered circular `T` span — the border, background and hover invert are gone, replaced by a plain `opacity` fade, with the mark sized by height (`2.1rem`) and its natural `881 / 710` aspect. `BadgeColumn.vue` consumes the same component for its monogram layer via nested `<svg x y width height>`.

**Why:** The owner wanted the script mark used everywhere and no circle around the navbar logo.

**Impact:** Navbar, home badge and favicon now show one identical mark, defined once. `.brand` keeps its accessible name via `aria-label="Home"`; the nested badge instance is `aria-hidden` so the outer SVG supplies the label once.

## [2026-11-22] - Use the Supplied Script `T` and Trim the Project List

**What changed:** Replaced the monogram path in `src/components/BadgeColumn.vue` and `public/favicon.svg` with the script `T` from `public/script-t-favicon.svg`, wrapped in `translate(...) scale(...)` groups so the 881x710 glyph is centred inside the badge ring (104 units wide) and the 64px favicon tile (42 units wide). Removed the Jobby, CareFlow, Blob Upload and Linkly entries from `projects` in `src/data/site.js`.

**Why:** The owner supplied the script glyph and asked for it to be used, and wanted four projects dropped from the portfolio.

**Impact:** Five project strips remain (Nodus, Xypheria, IndoorNav, Mūsim, ChatHubby) plus the GitHub card, and they stay evenly distributed by flex-grow. The badge and tab icon now show the same script `T`. The viewBox of the source file is larger than the previous glyph, so all scaling lives in the wrapper transforms rather than the path data.

**Follow-ups:** `public/script-t-favicon.svg` is kept as the source asset but is not referenced at runtime; the glyph is inlined so it inherits theme colours.

## [2026-11-22] - Make the Theme Toggle Repaint the Right-Hand Surface

**What changed:** Reworked the tokens in `src/styles/theme.css` so the split is theme-aware: `--surface` is `#faf3e6` in light mode and `#1c1917` in dark, with `--on-surface` flipping to match, while `--panel`/`--on-panel` stay amber in both. `--bg-primary`/`--text-primary` now alias the surface roles, so home copy, buttons, social labels and page backgrounds follow the toggle. Added `--accent-text` (`#a65d00` light, amber dark) for amber-on-cream spots — the home `h1`, contact hover states and the decorative "Contact" word — because raw `--accent` on cream measures about 1.9:1.

**Why:** The toggle previously only nudged the right side between two near-identical darks, so it looked broken. The owner wanted light/dark to visibly change that column.

**Impact:** Light mode is amber block + cream panel with dark type; dark mode is the same amber block + ink panel with cream type. Project strips keep their fixed colours and the cream `--text`. Contact card, navbar and buttons were already on the `--panel`/`--accent` roles and needed no structural change.

**Follow-ups:** `--accent-text` is a derived shade, not part of the supplied palette; if the accent changes hue, recompute it so headings keep WCAG AA contrast on cream.

## [2026-11-22] - Switch to the Amber Palette and a Serif `T` Mark

**What changed:** Replaced the theme tokens in `src/styles/theme.css` with the supplied palette — `--panel: #f5a524`, `--on-panel: #1c1917`, `--ink: #1c1917`, `--text: #faf3e6`, `--accent: #f5a524`, `--on-accent: #1c1917` — keeping derived aliases (`--bg-primary`, `--text-primary`, `--text-secondary`, `--accent-contrast`, `--cursor-color`, `--toggle-color`, `--border-on-panel`) so components stayed untouched in structure. Dark mode now uses a warm dark panel (`#2a2421`) with the amber mark. Swapped the letter-form monogram for an inlined vector `T` path in `BadgeColumn.vue` and `public/favicon.svg`, scaled per surface. Contact card, project strips and social labels were retargeted to the panel/text roles.

**Why:** The owner specified a warmer gold-on-ink palette and asked for a single stylish `T` instead of the plain sans letterform, identical in the page mark and the favicon.

**Impact:** Left block and navbar are amber with dark type; the right half, project page and contact backdrop are ink with cream text. Because the `T` is a path rather than text, it renders identically everywhere and needs no webfont; the favicon now matches the in-page mark. Theme toggle now shows dark on the amber panel and amber on the dark panel.

**Follow-ups:** `--accent` and `--panel` share a value by design, so any future accent change should update both together.

## [2026-11-22] - Add LinkedIn and Hover Labels on the Social Icons

**What changed:** Added a LinkedIn glyph to `src/data/icons.js`, then added `https://www.linkedin.com/in/talib-dar` to `socials` and `platforms` in `src/data/site.js` (so it appears both in the home icon row and in the contact page list). Home icons now carry `data-label` and a CSS-only `::after` popover in `src/views/Home.vue` that reveals the network name on hover and keyboard focus; the row gained extra top margin and the label opens below the icon so it cannot cover the CTA buttons.

**Why:** The owner asked for a LinkedIn link and for the icon row to identify each network on hover, since icons alone are not self-explanatory.

**Impact:** Home shows GitHub, LinkedIn, X; contact lists GitHub, LinkedIn, X (plus Email once `site.email` is set). The popover is decorative only — `aria-label` still provides the accessible name, and the label is never shown to screen readers twice.

## [2026-11-22] - Invert Theme Toggle Icon Colour Per Theme

**What changed:** Added a `--toggle-color` token in `src/styles/theme.css` (`#ffffff` on `:root`, `#111111` on `:root.dark`). `src/components/ThemeToggle.vue` now colours the icon with `var(--toggle-color)` instead of `currentColor`, and `BadgeColumn.vue`'s `.change-theme` no longer forces `--accent-contrast`.

**Why:** The toggle sits on the accent surface on every page, so `currentColor` left the icon white in dark mode, which the owner did not want; it should read white on the light theme and near-black on the dark theme.

**Impact:** Affects the toggle in both placements — top-left of the home badge column and in the navbar on `/projects` and `/contact`. Nav link and monogram colours are unchanged (still white on accent). Build and lint pass.

## [2026-11-22] - Replace Inline Home Links With Call-to-Action Buttons

**What changed:** In `src/views/Home.vue`, removed the inline `projects` / `get in touch` router links from the closing paragraph (and the now-unused `.special-link` rule). Added an `.actions` row with two pill buttons: a filled `.btn--primary` "View projects" and an outlined `.btn--ghost` "Get in touch", both routed. The row fades in at a 0.45s delay, with the socials staggered to 0.55s.

**Why:** The inline links were the same weight as body text and easy to miss; the owner wanted the primary destinations to be obvious at a glance.

**Impact:** Home page only. Buttons wrap on narrow screens, gain a 2px lift on hover, and invert colours for the ghost variant; the paragraph now ends on the sentence about reading source code. Social icons sit slightly lower to make room.

**Follow-ups:** If more destinations are added, keep only one filled button per view so the primary action stays unambiguous.

## [2026-11-22] - Port the Reference Badge and Use a Single-Letter Mark

**What changed:** Rebuilt `src/components/BadgeColumn.vue` as a port of `Column2.vue` from the reference repo: an accent `.column` holding a `.rotating` grid with a static monogram SVG (`scale(1.3)`, `z-index: 1`), a rotating ring SVG (`rotate-intro` 2s then `rotate` 960deg/90s, paused on hover), and an avatar image that flips in via a `front`/`back` class on `mouseenter`. The ring label is a single string (`TALIB MUSHTAQ · FULL-STACK DEVELOPER ·`) on a full-circle `<textPath>`; `fitRing()` measures its natural width with a hidden copy and writes the letter-spacing needed to close the loop exactly, re-running after `document.fonts.ready`. The separators are literal `·` characters inside that string. The monogram is a single white `T` (was `TM`), and the same letter is used for the navbar brand circle and `public/favicon.svg`.

**Why:** Placing words as straight tangential segments made the ring look polygonal, and separate dot circles could not line up with word boundaries. A single curved label guarantees every glyph and separator sits on one circle with even spacing, at any font. The owner also asked for a single `T` rather than `TM` initials wherever the mark appears.

**Impact:** The home badge now matches the reference composition — large solid mark, continuous circular ring of type, slow rotation with pause-on-hover, avatar swap on hover. Because the reference's lettering is hand-drawn paths spelling Micah's name and roles, the ring is rebuilt as text on the same radius and the mark as a letterform; structure, CSS and timings are copied. The theme toggle still occupies the top-left slot.

**Follow-ups:** Commission or draw a proper `T` logo to replace the plain letterform, and custom lettering if a designed sticker is wanted. `fitRing()` depends on the label rendering before measurement; very slow font loads fall back to the browser's metrics, which are re-measured once fonts resolve.

## [2026-11-22] - Build the Portfolio from the micahlt Split-Screen Design

**What changed:** Replaced the Vue starter template with a three-page portfolio. Added `src/router/index.js` (hash history, per-route titles, catch-all redirect), `src/App.vue` (router outlet, fade transition, document-level custom cursor), `src/styles/theme.css` (design tokens, dark palette, focus rings, reduced-motion fallbacks), `src/composables/useTheme.js`, `src/data/site.js` (identity, socials, platforms, nine projects), `src/data/icons.js`, `src/components/{NavBar,ThemeToggle,BadgeColumn}.vue`, and `src/views/{Home,Projects,Contact}.vue`. Rewrote `index.html` with Jost, Open Graph tags, and a pre-paint theme script; replaced `public/favicon.svg` with a red `T` mark; deleted `src/App.css`, `src/index.css`, `public/icons.svg`, and `src/assets/`. Added `vue-router` to dependencies.

**Why:** The owner wanted to reuse the split-screen portfolio design of `micahlt/micahlt.github.io` (cloned read-only to `/tmp/opencode/micahlt.github.io` for reference) with his own content, replacing Vite's demo page.

**Impact:** Three routes: `/` (accent badge column plus intro copy), `/projects` (nine GitHub projects as hover-expanding strips), `/contact` (searchable platform list). Light/dark theme follows the OS on first visit, then persists to `localStorage` under `theme`; the cursor dot is disabled for coarse pointers and reduced-motion users. Project and contact data are all real public repos; `site.email` is empty, so the Email row stays hidden until an address is set. No deployment changes were needed — the Pages workflow still publishes `dist/`.

**Follow-ups:** Set `site.email` in `src/data/site.js` to surface the mail contact row. The rotating nameplate uses a plain `T` letterform where the reference has a designed sticker; swap in custom artwork if wanted. Bio copy mentions no employer, location, or degree, so add those only with real details.

## [2026-11-22] - Migrate Scaffold From React 19 to Vue 3

**What changed:** Replaced `src/App.jsx` and `src/main.jsx` with `src/App.vue` (Composition API, `<script setup>`) and `src/main.js` (`createApp(App).mount('#root')`). Swapped `@vitejs/plugin-react` for `@vitejs/plugin-vue` in `vite.config.js`, replaced `src/assets/react.svg` with `src/assets/vue.svg`, pointed the `index.html` module entry at `/src/main.js`, changed the "Learn more" link to `vuejs.org`, and retargeted `.oxlintrc.json` from the `react` plugin to `vue`. Removed `react`, `react-dom`, `@types/react`, `@types/react-dom`, and `@vitejs/plugin-react`; added `vue` and `@vitejs/plugin-vue`. `README.md` now describes the stack as Vue 3 + Vite.

**Why:** The project owner preferred Vue 3 over React for the portfolio rewrite, before any real page content had been built on top of the scaffold.

**Impact:** Same markup, styling, and counter behavior with identical build output shape; the runtime bundle drops from React's ~190 kB to a ~66 kB Vue bundle. No routing, state library, or server code existed, so no other migration work is required. `src/App.css` and `src/index.css` are unchanged.

**Follow-ups:** The template counter remains a placeholder — replace `src/App.vue` with the actual portfolio layout. Adding Vue SFC type support later would mean introducing TypeScript or `vue-tsc`.

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
