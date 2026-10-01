import { ref } from 'vue'

/**
 * 数字滚动累加
 * @param {number} target 目标数值
 * @param {number} duration 动画时长（ms）
 */
export function useCountUp(target = 0, duration = 1600) {
  const current = ref(0)
  const done = ref(false)
  let raf = null

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function start() {
    if (done.value) return
    done.value = true

    if (reduced || duration <= 0) {
      current.value = target
      return
    }

    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      current.value = Math.round(target * eased)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        current.value = target
      }
    }

    raf = requestAnimationFrame(tick)
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf)
    raf = null
  }

  return { current, start, stop }
}
