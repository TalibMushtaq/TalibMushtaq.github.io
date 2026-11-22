<script setup>
import { computed, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import { platforms } from '../data/site.js'

const query = ref('')

// Search matches platform names only; an empty query shows the whole list.
const filteredPlatforms = computed(() => {
  const needle = query.value.trim().toLowerCase()
  if (!needle) return platforms
  return platforms.filter((platform) =>
    platform.name.toLowerCase().includes(needle),
  )
})
</script>

<template>
  <main>
    <NavBar />
    <h1 class="backdrop" aria-hidden="true">Contact</h1>

    <div class="contact-card">
      <input
        v-model="query"
        type="search"
        class="contact-search"
        placeholder="find a platform"
        aria-label="Find a contact platform"
        autocomplete="off"
      />

      <div class="contact-results">
        <transition-group name="list" tag="div">
          <a
            v-for="platform in filteredPlatforms"
            :key="platform.name"
            class="result"
            :href="platform.url"
            target="_blank"
            rel="noopener"
          >
            <span class="result-icon" v-html="platform.icon"></span>
            <h2>{{ platform.name }}</h2>
          </a>
        </transition-group>

        <p v-if="!filteredPlatforms.length" class="empty">
          Nothing matches “{{ query }}”.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: var(--nav-height) 1rem 1rem;
  overflow: hidden;
}

/* Oversized word behind the card, kept decorative and non-selectable. It sits on
   a normal layer (not z-index: -1) so it cannot fall behind the page background,
   with the card raised above it. */
.backdrop {
  position: fixed;
  bottom: 0;
  left: 2rem;
  z-index: 0;
  color: var(--accent-text);
  font-size: 30vh;
  line-height: 0.85;
  opacity: 0.12;
  transform: skewX(-10deg);
  user-select: none;
  pointer-events: none;
}

.contact-card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: min(90vw, 24rem);
  max-height: calc(100vh - var(--nav-height) - 4rem);
  /* Panel surface: light slab on the dark page, matching the home split. */
  background: var(--panel);
  color: var(--on-panel);
  border-radius: 0.4rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.contact-search {
  /* The field stays put while the results scroll under it. */
  flex: none;
  margin: 1.25rem 1.25rem 0.5rem;
  padding: 0.7rem;
  font: inherit;
  font-size: 1.1rem;
  text-align: center;
  color: var(--on-panel);
  background: transparent;
  border: 2px solid var(--border-on-panel);
  border-radius: 0.3rem;
  outline: none;
  transition: border-color 0.2s;
}

.contact-search::placeholder {
  color: color-mix(in srgb, var(--on-panel) 55%, transparent);
}

.contact-search:focus {
  border-color: var(--accent);
}

/* Drop the UA's own clear button so the field matches the rest of the design. */
.contact-search::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.contact-results {
  padding: 0.5rem 1.75rem 1.25rem;
  overflow-y: auto;
}

.result {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.1rem 0;
  color: var(--on-panel);
  fill: var(--on-panel);
  text-decoration: none;
  transition: color 0.25s, fill 0.25s;
}

.result:hover,
.result:focus-visible {
  color: var(--accent-text);
  fill: var(--accent-text);
}

.result-icon {
  display: grid;
  place-items: center;
  width: 1.2rem;
  height: 1.2rem;
  flex: none;
}

.result-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.result h2 {
  font-size: 1.05rem;
  font-weight: 400;
}

.empty {
  color: color-mix(in srgb, var(--on-panel) 65%, transparent);
  font-size: 0.95rem;
  text-align: center;
  padding: 0.5rem 0 1rem;
}

/* List transitions keep the search feeling physical as rows join and leave. */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.35s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(1.5rem);
}

.list-leave-active {
  position: absolute;
}

@media (max-width: 640px) {
  .backdrop {
    font-size: 22vh;
    left: 0.5rem;
  }

  .contact-card {
    width: 100%;
    max-height: calc(100vh - var(--nav-height) - 2rem);
    background: transparent;
    box-shadow: none;
  }
}
</style>
