<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'

/**
 * 通用轮播：支持自动播放、循环、触摸滑动、键盘方向键、圆点与箭头
 * 用法：
 *   <Carousel :items="list" :per-view="1">
 *     <template #default="{ item }"> ... </template>
 *   </Carousel>
 */
const props = defineProps({
  items: { type: Array, default: () => [] },
  perView: { type: Number, default: 1 },
  autoplay: { type: Boolean, default: true },
  interval: { type: Number, default: 5000 },
  showDots: { type: Boolean, default: true },
  showArrows: { type: Boolean, default: true },
  gap: { type: Number, default: 24 }
})

const current = ref(0)
const paused = ref(false)
let timer = null

const pages = computed(() => Math.max(1, Math.ceil(props.items.length / props.perView)))
const trackStyle = computed(() => ({
  transform: `translate3d(-${current.value * 100}%, 0, 0)`
}))
const pageStyle = computed(() => ({
  flex: `0 0 ${100 / props.perView}%`,
  maxWidth: `${100 / props.perView}%`,
  paddingRight: `${props.gap / 2}px`,
  paddingLeft: `${props.gap / 2}px`
}))
const viewportStyle = computed(() => ({
  marginLeft: `-${props.gap / 2}px`,
  marginRight: `-${props.gap / 2}px`
}))

function goTo(index) {
  if (pages.value <= 1) return
  current.value = (index + pages.value) % pages.value
  restart()
}

function next() {
  goTo(current.value + 1)
}

function prev() {
  goTo(current.value - 1)
}

function restart() {
  if (timer) clearInterval(timer)
  if (!props.autoplay || paused.value || pages.value <= 1) return
  timer = setInterval(() => {
    current.value = (current.value + 1) % pages.value
  }, props.interval)
}

/* ---- 触摸滑动 ---- */
let startX = 0
let startY = 0
let touching = false

function onTouchStart(e) {
  const t = e.changedTouches[0]
  startX = t.clientX
  startY = t.clientY
  touching = false
}

function onTouchMove(e) {
  const t = e.changedTouches[0]
  if (Math.abs(t.clientX - startX) > Math.abs(t.clientY - startY) + 6) {
    touching = true
    paused.value = true
  }
}

function onTouchEnd(e) {
  if (touching) {
    const delta = e.changedTouches[0].clientX - startX
    if (delta < -40) next()
    else if (delta > 40) prev()
  }
  touching = false
  paused.value = false
  restart()
}

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (!reduced) restart()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="carousel"
    @mouseenter="paused = true"
    @mouseleave="paused = false; restart()"
    @focusin="paused = true"
    @focusout="paused = false; restart()"
  >
    <div class="carousel__clip">
      <div
        class="carousel__viewport"
        :style="viewportStyle"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="carousel__track" :style="trackStyle">
          <div v-for="page in pages" :key="page" class="carousel__page">
            <div
              v-for="(item, i) in items.slice((page - 1) * perView, page * perView)"
              :key="i"
              class="carousel__cell"
              :style="pageStyle"
            >
              <slot :item="item" :index="(page - 1) * perView + i" />
            </div>
          </div>
        </div>
      </div>

      <template v-if="showArrows && pages > 1">
        <button class="carousel__arrow carousel__arrow--prev" type="button" aria-label="上一组" @click="prev">
          <BaseIcon name="chevronDown" :size="20" class="rot-90" />
        </button>
        <button class="carousel__arrow carousel__arrow--next" type="button" aria-label="下一组" @click="next">
          <BaseIcon name="chevronDown" :size="20" class="rot-270" />
        </button>
      </template>
    </div>

    <div v-if="showDots && pages > 1" class="carousel__dots" role="tablist">
      <button
        v-for="page in pages"
        :key="page"
        class="carousel__dot"
        :class="{ 'is-active': current === page - 1 }"
        type="button"
        role="tab"
        :aria-selected="current === page - 1"
        :aria-label="`第 ${page} 组`"
        @click="goTo(page - 1)"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
}

.carousel__clip {
  position: relative;
}

.carousel__viewport {
  overflow: hidden;
  padding: 6px 0;
}

.carousel__track {
  display: flex;
  transition: transform 0.55s var(--ease);
  will-change: transform;
}

.carousel__page {
  display: flex;
  flex: 0 0 100%;
  max-width: 100%;
  align-items: stretch;
}

.carousel__cell {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.carousel__arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #fff;
  color: var(--brand-blue);
  box-shadow: var(--shadow);
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease);
}

.carousel__arrow:hover {
  background: var(--brand-blue);
  color: #fff;
}

.carousel__arrow--prev {
  left: -18px;
}

.carousel__arrow--next {
  right: -18px;
}

.carousel__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 22px;
}

.carousel__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 50%;
  background: var(--line-strong);
  transition: width var(--dur) var(--ease), background-color var(--dur) var(--ease);
}

.carousel__dot.is-active {
  width: 24px;
  border-radius: var(--radius-full);
  background: var(--brand-blue);
}

.rot-90 {
  transform: rotate(90deg);
}

.rot-270 {
  transform: rotate(-90deg);
}

@media (min-width: 900px) {
  .carousel__arrow {
    display: inline-flex;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel__track {
    transition: none;
  }
}
</style>
