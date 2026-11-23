// Clean paths (no `#/`) for GitHub Pages. Pages has no server-side rewrite, so the
// build copies index.html to 404.html; Pages serves that for /projects and /contact
// and the router takes over. See the `build` script in package.json.
import { createRouter, createWebHistory } from 'vue-router'

// Links shared before the switch to history mode look like /#/projects. Normalize
// them before createRouter reads the initial location, otherwise the app starts on
// the home route while the address bar claims otherwise.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Talib Mushtaq — Full-stack developer' },
  },
  { path: '/home', redirect: '/' },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue'),
    meta: { title: 'Projects — Talib Mushtaq' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: 'Contact — Talib Mushtaq' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Route changes should always land at the top of the page.
  scrollBehavior: () => ({ top: 0 }),
})

// SPA route changes do not update the tab title on their own; each route carries
// its own title so shared and bookmarked links read correctly.
router.afterEach((to) => {
  document.title = to.meta.title ?? 'Talib Mushtaq'
})

export default router
