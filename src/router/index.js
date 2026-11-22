// Clean paths (no `#/`) for GitHub Pages. Pages has no server-side rewrite, so the
// build copies index.html to 404.html; Pages serves that for /projects and /contact
// and the router takes over. See the `build` script in package.json.
import { createRouter, createWebHistory } from 'vue-router'

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
