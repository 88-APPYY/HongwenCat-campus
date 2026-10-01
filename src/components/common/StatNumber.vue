<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useCountUp } from '@/utils/useCountUp'

/**
 * 数字滚动组件：进入视口后从 0 累加到目标值
 */
const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  prefix: { type: String, default: '' },
  label: { type: String, default: '' },
  duration: { type: Number, default: 1600 }
})

const root = ref(null)
const { current, start, stop } = useCountUp(props.value, props.duration)
let observer = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    start()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        start()
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  stop()
  if (observer) observer.disconnect()
})
</script>

<template>
  <div ref="root" class="stat">
    <div class="stat__num">
      <span v-if="prefix" class="stat__affix">{{ prefix }}</span>
      <span class="stat__value">{{ current }}</span>
      <span v-if="suffix" class="stat__affix">{{ suffix }}</span>
    </div>
    <div v-if="label" class="stat__label">{{ label }}</div>
  </div>
</template>

<style scoped>
.stat__num {
  display: flex;
  align-items: baseline;
  font-family: var(--font-num);
  font-size: clamp(1.75rem, 1.2rem + 2vw, 2.6rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.stat__value {
  font-variant-numeric: tabular-nums;
}

.stat__affix {
  font-size: 0.62em;
  font-weight: 700;
  opacity: 0.9;
}

.stat__label {
  margin-top: 8px;
  font-size: var(--fs-sm);
}
</style>
