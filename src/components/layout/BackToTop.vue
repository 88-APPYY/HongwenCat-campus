<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue'
import { useScroll } from '@/utils/useScroll'

const { scrolled: visible } = useScroll(600)

function toTop() {
  const reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}
</script>

<template>
  <Transition name="pop">
    <button v-if="visible" class="back-top" type="button" aria-label="回到顶部" @click="toTop">
      <BaseIcon name="arrowUp" :size="20" />
    </button>
  </Transition>
</template>

<style scoped>
.back-top {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: var(--z-top);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  color: var(--brand-blue);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  transition: transform var(--dur) var(--ease), background-color var(--dur) var(--ease),
    color var(--dur) var(--ease);
}

.back-top:hover {
  transform: translateY(-3px);
  background: var(--brand-blue);
  color: #fff;
}

.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.22s var(--ease), transform 0.22s var(--ease);
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
</style>
