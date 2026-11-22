<script setup>
import BadgeColumn from '../components/BadgeColumn.vue'
import { socials } from '../data/site.js'
</script>

<template>
  <div class="primary-grid">
    <BadgeColumn />

    <section class="intro">
      <div class="intro-inner">
        <h1>Hi, I'm Talib</h1>

        <p>
          I'm a full-stack developer. Most of what I build lives on the web:
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener"
            >TypeScript</a
          >
          and
          <a href="https://nodejs.org/" target="_blank" rel="noopener">Node.js</a>
          on the server,
          <a href="https://react.dev/" target="_blank" rel="noopener">React</a>
          or <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue</a>
          in the browser, with
          <a href="https://www.mongodb.com/" target="_blank" rel="noopener"
            >MongoDB</a
          >
          or
          <a href="https://www.postgresql.org/" target="_blank" rel="noopener"
            >Postgres</a
          >
          underneath. I prefer projects that fix one specific annoyance over
          another to-do demo.
        </p>

        <p>
          Lately that has meant
          <a
            href="https://github.com/TalibMushtaq/nodus"
            target="_blank"
            rel="noopener"
            >Nodus</a
          >, offline-first encrypted storage that syncs between your devices, and
          <a
            href="https://github.com/TalibMushtaq/jobby"
            target="_blank"
            rel="noopener"
            >Jobby</a
          >, an AI hiring tool built around deterministic scoring. Before those
          came
          <a
            href="https://github.com/TalibMushtaq/xypheria"
            target="_blank"
            rel="noopener"
            >Xypheria</a
          >
          for running hackathons,
          <a
            href="https://github.com/TalibMushtaq/indoornav-app"
            target="_blank"
            rel="noopener"
            >IndoorNav</a
          >
          for indoor positioning on the MERN stack, and
          <a
            href="https://github.com/TalibMushtaq/Musim"
            target="_blank"
            rel="noopener"
            >Mūsim</a
          >
          for weather pulled from several sources at once.
        </p>

        <p>
          When I'm not shipping, I'm usually reading through other people's source
          code to see how they solved it.
        </p>

        <!-- Primary actions live in their own row: inline links in the paragraph were
             too easy to miss next to the body copy. -->
        <div class="actions">
          <router-link to="/projects" class="btn btn--primary">
            View projects
          </router-link>
          <router-link to="/contact" class="btn btn--ghost">
            Get in touch
          </router-link>
        </div>

        <div class="socials">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            :aria-label="social.name"
            :data-label="social.name"
            target="_blank"
            rel="noopener"
            v-html="social.icon"
          ></a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.primary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  width: 100%;
}

.intro {
  display: grid;
  place-items: center;
  padding: 2.5rem;
}

.intro-inner {
  max-width: 480px;
}

h1 {
  color: var(--accent-text);
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1em;
  margin-bottom: 0.35em;
  opacity: 0;
  transform-style: preserve-3d;
  transform-origin: top center;
  transform: var(--animation-initial);
  animation: var(--animation);
  animation-delay: 0.1s;
}

p {
  color: var(--text-primary);
  line-height: 1.65;
  margin-bottom: 1em;
  opacity: 0;
  transform-style: preserve-3d;
  transform-origin: top center;
  transform: var(--animation-initial);
  animation: var(--animation);
  animation-delay: 0.2s;
}

/* Paragraphs share one animation; staggering each by a fraction keeps the copy
   from landing as a single block. */
p:nth-of-type(2) {
  animation-delay: 0.3s;
}

p:nth-of-type(3) {
  animation-delay: 0.4s;
}

p > a {
  color: inherit;
  font-weight: 500;
  text-decoration-color: var(--text-secondary);
  text-underline-offset: 0.18em;
}

p > a:hover {
  color: var(--accent);
}

/* Button row: a filled primary action plus a quieter secondary, sized to be the
   first thing the eye lands on after the headline. */
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5em;
  opacity: 0;
  transform-style: preserve-3d;
  transform-origin: top center;
  transform: var(--animation-initial);
  animation: var(--animation);
  animation-delay: 0.45s;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn--primary {
  background: var(--accent);
  border: 2px solid var(--accent);
  color: var(--accent-contrast);
}

.btn--primary:hover {
  background: color-mix(in srgb, var(--accent) 86%, #000);
  border-color: color-mix(in srgb, var(--accent) 86%, #000);
}

.btn--ghost {
  background: transparent;
  border: 2px solid var(--text-primary);
  color: var(--text-primary);
}

.btn--ghost:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
}

.socials {
  display: flex;
  gap: 1.2rem;
  /* Extra room above so the hover label has space and does not cover the buttons. */
  margin-top: 2.5em;
  opacity: 0;
  transform-style: preserve-3d;
  transform-origin: top center;
  transform: var(--animation-initial);
  animation: var(--animation);
  animation-delay: 0.55s;
}

.socials a {
  position: relative;
  display: block;
  fill: var(--text-secondary);
  transition: fill 0.2s;
}

/* Name popover: CSS-only so it works without JS, and it mirrors aria-label for
   screen readers. It opens below the icon so it never covers the buttons above.
   Shown on hover and keyboard focus. */
.socials a::after {
  content: attr(data-label);
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transform: translate(-50%, -0.25rem);
  transition: opacity 0.18s ease, transform 0.18s ease;
  pointer-events: none;
}

.socials a:hover::after,
.socials a:focus-visible::after {
  opacity: 1;
  transform: translate(-50%, 0);
}

.socials a:hover {
  fill: var(--accent);
}

.socials :deep(svg) {
  width: 1.35rem;
  height: 1.35rem;
}

@media (max-width: 900px) {
  .primary-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .intro {
    padding: 1rem 1.5rem 3rem;
  }
}
</style>
