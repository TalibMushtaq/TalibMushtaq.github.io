import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/theme.css'

// The site previously used hash URLs (#/projects). Rewrite any old inbound link to
// its clean equivalent so shared links keep working after the switch to history mode.
if (window.location.hash.startsWith('#/')) {
  const path = window.location.hash.slice(1)
  window.history.replaceState(null, '', path)
}

createApp(App).use(router).mount('#app')
