<script setup>
import { onMounted, ref } from 'vue'
import ScriptT from './ScriptT.vue'
import ThemeToggle from './ThemeToggle.vue'

// Port of the reference BadgeColumn (micahlt/Column2.vue): a static monogram layer,
// a rotating ring of type, and an avatar that swaps in on hover. The reference's
// lettering is hand-drawn paths, so the ring is rebuilt as real text on a circular
// path — that keeps every glyph and separator dot on the same curve.
const avatarUrl = 'https://avatars.githubusercontent.com/u/137031918?v=4'

const RING_RADIUS = 78
const RING_TEXT = 'TALIB MUSHTAQ · FULL-STACK DEVELOPER · '

const front = ref(true)
const ringTextEl = ref(null)
const measureEl = ref(null)

function flip() {
  front.value = !front.value
}

/*
 * Fit the phrase to exactly one lap. Natural text width depends on whichever font
 * actually loads, so the letter-spacing is derived at runtime instead of being
 * hardcoded: without this the string either leaves a gap or runs past its start.
 */
function fitRing() {
  const text = ringTextEl.value
  const measure = measureEl.value
  if (!text || !measure) return

  const circumference = 2 * Math.PI * RING_RADIUS
  const width = measure.getComputedTextLength()
  if (!width) return

  const spacing = (circumference - width) / RING_TEXT.length
  text.style.letterSpacing = `${spacing}px`
}

onMounted(() => {
  fitRing()
  // Web fonts can arrive after mount; re-fit once their metrics are final.
  document.fonts?.ready.then(fitRing)
})
</script>

<template>
  <div class="column">
    <ThemeToggle class="change-theme" />

    <div
      :class="{ rotating: true, front, back: !front }"
      @mouseenter="flip"
      @mouseleave="flip"
    >
      <!-- Static monogram layer, revealed again when the avatar is not hovered. -->
      <svg class="static" viewBox="0 0 200 200" aria-label="Talib Mushtaq">
        <!-- 𝓣 mark from the shared component, sized to sit inside the ring without
             touching the lettering. -->
        <ScriptT
          class="monogram"
          aria-hidden="true"
          x="47.14"
          y="58"
          width="105.71"
          height="84"
        />
      </svg>

      <!-- Rotating word ring, spinning slowly and pausing while hovered. The
           separators are literal characters inside the phrase, so they sit on the
           same baseline circle as the words. -->
      <svg class="rotate" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path
            id="badge-ring-path"
            :d="`M100,${100 - RING_RADIUS} a${RING_RADIUS},${RING_RADIUS} 0 1,1 0,${
              RING_RADIUS * 2
            } a${RING_RADIUS},${RING_RADIUS} 0 1,1 0,${-RING_RADIUS * 2}`"
          />
        </defs>

        <text ref="ringTextEl" class="ring-label">
          <textPath href="#badge-ring-path" startOffset="0">
            {{ RING_TEXT }}
          </textPath>
        </text>

        <!-- Invisible copy used only to measure the phrase's natural width. -->
        <text
          ref="measureEl"
          class="ring-label measure"
          x="0"
          y="0"
          aria-hidden="true"
        >
          {{ RING_TEXT }}
        </text>
      </svg>

      <img class="avatar" :src="avatarUrl" alt="Talib Mushtaq" loading="lazy" />
    </div>
  </div>
</template>

<style scoped>
/* Layout, sizing and animation timings follow the reference implementation so the
   composition reads the same at every breakpoint. */
.column {
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--panel);
}

.change-theme {
  position: absolute;
  top: clamp(1rem, 2vw, 3rem);
  left: clamp(1rem, 2vw, 3rem);
  z-index: 6;
  opacity: 0.25;
  transition: opacity 0.2s;
}

.change-theme:hover {
  opacity: 1;
}

.rotating {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  opacity: 0;
  transform: var(--animation-initial);
  animation: var(--animation);
  animation-delay: 0.8s;
  user-select: none;
}

.rotate,
.static {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  width: 40vh;
  height: 40vh;
  max-width: 60vw;
  max-height: 40vh;
}

.static {
  z-index: 1;
  transform: scale(1.3);
  will-change: scale;
}

.monogram {
  color: var(--on-panel);
}

.rotate {
  z-index: 4;
  transform: rotate(0) scale(1.3);
  transform-origin: center center;
  animation: rotate-intro 2s 1 ease-out, rotate 90s 2s infinite linear;
  will-change: scale;
}

.ring-label {
  fill: var(--on-panel);
  font-family: "Jost", sans-serif;
  font-size: 13px;
  font-weight: 500;
  /* Letter-spacing is written by fitRing(); 0 is only the pre-measurement value. */
  letter-spacing: 0;
}

.measure {
  visibility: hidden;
}

@keyframes rotate {
  0% {
    transform: rotate(0) scale(1.3);
  }
  100% {
    transform: rotate(960deg) scale(1.3);
  }
}

@keyframes rotate-intro {
  0% {
    transform: rotate(0) scale(1.3);
  }
  100% {
    transform: rotate(720deg) scale(1.3);
  }
}

.rotating:hover .rotate {
  animation-play-state: paused;
}

.avatar {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  z-index: 4;
  max-width: 50vw;
  max-height: 30vh;
  border-radius: 100%;
  opacity: 0;
  transform: scale(0.1);
  transition: 0.3s all;
}

.back .avatar {
  z-index: 5;
  opacity: 1;
  transform: scale(1);
  transform-origin: center center;
}

@media (max-width: 900px) {
  .column {
    min-height: 100%;
    height: 40vh;
    padding-top: var(--nav-height);
  }

  .rotate,
  .static {
    width: 32vh;
    height: 32vh;
  }
}
</style>
