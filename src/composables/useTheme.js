// Tiny shared theme state. The initial value is also applied by the inline script
// in index.html so the first paint already has the right palette; this module
// takes over from there and keeps localStorage in sync.
import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'theme'

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    // Storage can be blocked (private mode, hardened browsers); fall back to the
    // OS preference instead of throwing on import.
    return null
  }
}

const stored = readStored()
const prefersDark =
  typeof matchMedia === 'function' &&
  matchMedia('(prefers-color-scheme: dark)').matches

const isDark = ref(stored ? stored === 'dark' : prefersDark)

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  try {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  } catch {
    // Persisting is best-effort; the toggle still works for this session.
  }
})

export function useTheme() {
  return {
    isDark,
    toggleTheme: () => {
      isDark.value = !isDark.value
    },
  }
}
