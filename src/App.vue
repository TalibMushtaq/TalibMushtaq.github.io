<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

// The blended cursor dot is a document-level concern, so it lives in the shell
// instead of being re-emitted by every link. One pointer listener queries the
// hovered element for clickable ancestors, which means new links work for free.
const INTERACTIVE = 'a, button, input, textarea, select, label, [data-cursor="hot"]'
let cursorEnabled = false
let hotElement = null

const setScale = (value) =>
  document.body.style.setProperty('--scale', String(value))

function moveCursor(event) {
  document.body.style.setProperty('--x', `${event.clientX}px`)
  document.body.style.setProperty('--y', `${event.clientY}px`)
}

function trackHover(event) {
  const target = event.target
  const hot = target instanceof Element && target.closest(INTERACTIVE)
  // pointerover fires on every child element; only touch the DOM on real changes.
  if (hot === hotElement) return
  hotElement = hot
  document.body.classList.toggle('cursor-hot', Boolean(hot))
}

function pressCursor() {
  if (cursorEnabled) document.body.classList.add('cursor-down')
}

function releaseCursor() {
  document.body.classList.remove('cursor-down')
}

onMounted(() => {
  // Touch and reduced-motion users keep the native pointer: a blended dot with no
  // hover state is unusable there.
  cursorEnabled =
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!cursorEnabled) return

  document.body.classList.add('custom-cursor')
  document.body.style.setProperty('--size', '1.5em')
  setScale(1)

  window.addEventListener('pointermove', moveCursor, { passive: true })
  window.addEventListener('pointerover', trackHover, { passive: true })
  window.addEventListener('pointerdown', pressCursor, { passive: true })
  window.addEventListener('pointerup', releaseCursor, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', moveCursor)
  window.removeEventListener('pointerover', trackHover)
  window.removeEventListener('pointerdown', pressCursor)
  window.removeEventListener('pointerup', releaseCursor)
  document.body.classList.remove('custom-cursor', 'cursor-hot', 'cursor-down')
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
