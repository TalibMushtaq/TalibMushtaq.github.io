<script setup>
import NavBar from '../components/NavBar.vue'
import { projects } from '../data/site.js'
</script>

<template>
  <main>
    <NavBar />
    <div class="project-grid">
      <a
        v-for="project in projects"
        :key="project.name"
        class="project"
        :href="project.url"
        :style="{ '--strip': project.color }"
        target="_blank"
        rel="noopener"
      >
        <span class="project-name">{{ project.name }}</span>
        <span class="project-subtitle">{{ project.subtitle }}</span>
      </a>

      <a
        class="project project--github"
        href="https://github.com/TalibMushtaq"
        target="_blank"
        rel="noopener"
      >
        <span class="project-name github-label"
          >See more on my <span class="underline">GitHub</span></span
        >
      </a>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  padding-top: var(--nav-height);
  background: var(--bg-primary);
}

/*
 * Full-height strips that expand under the pointer. The grid owns the height so
 * the strips can grow/shrink without the page scrolling; every strip shares the
 * leftover space via flex-grow.
 */
.project-grid {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: calc(100vh - var(--nav-height));
  width: 100%;
  overflow: hidden;
}

.project {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  /* Collapsed strips shrink to their label height; clipping stops a tall label
     from bleeding into the neighbouring strip. */
  min-height: 2.25rem;
  overflow: hidden;
  background: var(--strip, var(--accent));
  color: var(--text);
  text-decoration: none;
  transition: flex-grow 0.35s ease, filter 0.35s ease;
}

.project-name {
  font-size: clamp(0.95rem, 1.5vw, 1.5rem);
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: font-size 0.3s ease, transform 0.3s ease;
}

.project-subtitle {
  position: absolute;
  bottom: 0.9rem;
  left: 0;
  width: 100%;
  padding: 0 2rem;
  text-align: center;
  font-size: 0.95rem;
  opacity: 0;
  transform: translateY(0.4rem);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.project:hover,
.project:focus-visible {
  flex-grow: 15;
}

.project:hover .project-name,
.project:focus-visible .project-name {
  font-size: clamp(1.4rem, 2.6vw, 2.4rem);
  transform: translateY(-0.35rem);
}

.project:hover .project-subtitle,
.project:focus-visible .project-subtitle {
  opacity: 0.85;
  transform: translateY(0);
}

/* Dim the siblings of whichever strip is hovered, like the reference site, and
   drop their labels to a size that still fits the sliver that remains. */
.project-grid:hover > .project:not(:hover) {
  filter: brightness(0.4) grayscale(1);
  flex-grow: 0;
}

.project-grid:hover > .project:not(:hover) .project-name {
  font-size: 0.85rem;
}

.project--github {
  background: var(--accent);
  color: var(--on-accent);
  text-align: center;
  font-weight: 700;
}

.github-label {
  font-size: clamp(0.95rem, 1.5vw, 1.35rem);
}

.project-grid:hover > .project--github:not(:hover) .github-label {
  font-size: 0.85rem;
}

.underline {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

/*
 * Below ~900px the strips cannot stay full-height without becoming unreadable,
 * so they stack at a fixed height and hover-only text becomes always visible.
 */
@media (max-width: 900px), (hover: none) {
  .project-grid {
    height: auto;
    overflow: visible;
  }

  .project,
  .project:hover,
  .project:focus-visible {
    flex-grow: 0;
    min-height: 7.5rem;
    padding: 1.5rem 1.25rem 2.6rem;
    justify-content: center;
  }

  .project-subtitle {
    position: static;
    padding: 0;
    margin-top: 0.4rem;
    opacity: 0.85;
    transform: none;
    font-size: 0.9rem;
  }

  .project:hover .project-name,
  .project:focus-visible .project-name {
    font-size: clamp(1.1rem, 4vw, 1.4rem);
    transform: none;
  }

  .project-grid:hover > .project:not(:hover) {
    filter: none;
  }
}
</style>
