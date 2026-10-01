/**
 * v-reveal 滚动入场指令
 * 用法：
 *   <div v-reveal>...</div>
 *   <div v-reveal="120">...</div>   // 传入数字表示延迟毫秒数
 */
const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  return observer
}

export default {
  mounted(el, binding) {
    if (REDUCED) {
      el.classList.add('reveal', 'is-visible')
      return
    }

    const delay = Number(binding.value) || 0
    el.classList.add('reveal')
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    // 不支持 IntersectionObserver 时直接展示，避免内容永久隐藏
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    getObserver().observe(el)
  },

  unmounted(el) {
    if (observer) observer.unobserve(el)
  }
}
