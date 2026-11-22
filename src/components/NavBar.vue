<script setup>
import ScriptT from './ScriptT.vue'
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <nav>
    <router-link to="/" class="brand" aria-label="Home">
      <ScriptT class="mark" />
    </router-link>

    <div class="nav-links">
      <router-link to="/" exact-active-class="active" class="nav-link home-link"
        >Home</router-link
      >
      <router-link to="/projects" exact-active-class="active" class="nav-link"
        >Projects</router-link
      >
      <router-link to="/contact" exact-active-class="active" class="nav-link"
        >Contact</router-link
      >
      <ThemeToggle />
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 10;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  background: var(--accent);
  color: var(--accent-contrast);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--accent-contrast);
}

/* Script mark, no surrounding circle: sized by height so the glyph keeps its
   natural 881x710 aspect. */
.mark {
  display: block;
  height: 2.1rem;
  width: auto;
  aspect-ratio: 881 / 710;
  transition: opacity 0.2s;
}

.brand:hover .mark {
  opacity: 0.65;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav-link {
  position: relative;
  color: var(--accent-contrast);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  padding: 0.15rem 0;
}

/* Active route gets the translucent block the reference design uses instead of an
   underline, so it stays legible on the accent background. */
.nav-link.active::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0.05em;
  width: 112%;
  height: 0.55em;
  transform: translateX(-50%);
  background: var(--accent-contrast);
  opacity: 0.25;
}

@media (max-width: 640px) {
  nav {
    padding: 0 1.25rem;
  }

  /* The monogram already links home, so drop the redundant label on small screens. */
  .home-link {
    display: none;
  }

  .nav-links {
    gap: 1.15rem;
  }

  .nav-link {
    font-size: 0.85rem;
  }
}
</style>
