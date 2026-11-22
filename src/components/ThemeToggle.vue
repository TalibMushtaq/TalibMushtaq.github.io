<script setup>
import { useTheme } from '../composables/useTheme.js'

// Shared so the home page (which has no navbar) and the inner pages present the
// same control; useTheme keeps both instances in sync.
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :aria-pressed="isDark"
    @click="toggleTheme"
  >
    <!-- Icon reflects the active theme: moon for dark, sun for light. -->
    <svg v-if="isDark" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.05 21.96a10 10 0 0 1-9.95-9.08A10 10 0 0 1 11.14.9a1 1 0 0 1 .9 1.59 6 6 0 0 0 1.25 8.4 6 6 0 0 0 7.14 0 1 1 0 0 1 1.59.9 9.95 9.95 0 0 1-9.97 10.17Z"
      />
    </svg>
    <svg v-else viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-13a1 1 0 0 1-1-1V1a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1Zm0 22a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1ZM23 13h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2ZM3 13H1a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm16.66 7.66a1 1 0 0 1-1.41 0l-1.42-1.42a1 1 0 1 1 1.42-1.41l1.41 1.41a1 1 0 0 1 0 1.42ZM6.17 6.17a1 1 0 0 1-1.42 0L3.34 4.76a1 1 0 0 1 1.41-1.42l1.42 1.42a1 1 0 0 1 0 1.41Zm13.49-1.41-1.42 1.42a1 1 0 1 1-1.41-1.42l1.41-1.41a1 1 0 0 1 1.42 1.41ZM6.17 17.83l-1.42 1.42a1 1 0 0 1-1.41-1.42l1.41-1.41a1 1 0 1 1 1.42 1.41Z"
      />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--toggle-color);
  opacity: 0.75;
  transition: opacity 0.2s, background 0.2s;
}

.theme-toggle:hover {
  opacity: 1;
  background: rgba(127, 127, 127, 0.22);
}

.theme-toggle svg {
  width: 1.15rem;
  height: 1.15rem;
  fill: currentColor;
}
</style>
