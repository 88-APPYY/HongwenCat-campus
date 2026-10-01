import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 监听页面滚动状态
 * @param {number} offset 触发阈值（px）
 */
export function useScroll(offset = 12) {
  const scrolled = ref(false)

  const onScroll = () => {
    scrolled.value = (window.scrollY || window.pageYOffset || 0) > offset
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrolled }
}

/** 平滑滚动到指定元素 id */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: 'smooth' })
}
