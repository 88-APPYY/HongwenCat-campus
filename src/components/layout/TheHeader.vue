<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { navItems, site } from '@/data/site'
import BaseIcon from '@/components/common/BaseIcon.vue'
import AppImage from '@/components/common/AppImage.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const route = useRoute()
const scrolled = ref(false)
const drawerOpen = ref(false)

const isActive = (path) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path)

const phoneHref = computed(() => `tel:${site.contact.phoneRaw}`)

function onScroll() {
  scrolled.value = (window.scrollY || 0) > 8
}

function onKeydown(e) {
  if (e.key === 'Escape') drawerOpen.value = false
}

function openDrawer() {
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
}

function setBodyLock(lock) {
  document.body.style.overflow = lock ? 'hidden' : ''
}

watch(drawerOpen, (val) => setBodyLock(val))
watch(
  () => route.path,
  () => closeDrawer()
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  setBodyLock(false)
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="container header__inner">
      <RouterLink to="/" class="brand" aria-label="返回首页">
        <AppImage
          class="brand__logo"
          name="logo_hwm.png"
          alt="弘文猫网络科技有限公司 Logo"
          :width="44"
          :height="44"
          loading="eager"
        />
        <span class="brand__text">
          <span class="brand__name">弘文猫科技</span>
          <span class="brand__slogan">校园数字化服务</span>
        </span>
      </RouterLink>

      <nav class="nav" aria-label="主导航">
        <ul class="nav__list">
          <li v-for="item in navItems" :key="item.path">
            <RouterLink class="nav__link" :class="{ 'is-active': isActive(item.path) }" :to="item.path">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <a class="header__phone" :href="phoneHref">
          <BaseIcon name="phone" :size="17" />
          <span>{{ site.contact.phone }}</span>
        </a>
        <BaseButton class="header__cta" to="/contact" variant="primary">免费咨询</BaseButton>
        <button
          class="hamburger"
          type="button"
          :aria-expanded="drawerOpen"
          aria-controls="mobile-drawer"
          aria-label="打开菜单"
          @click="openDrawer"
        >
          <BaseIcon name="menu" :size="22" />
        </button>
      </div>
    </div>
  </header>

  <!-- 移动端抽屉 -->
  <Transition name="fade">
    <div v-if="drawerOpen" class="drawer-mask" @click="closeDrawer" />
  </Transition>

  <Transition name="slide">
    <aside
      v-if="drawerOpen"
      id="mobile-drawer"
      class="drawer"
      role="dialog"
      aria-modal="true"
      aria-label="站点导航"
    >
      <div class="drawer__head">
        <span class="drawer__title">导航菜单</span>
        <button class="drawer__close" type="button" aria-label="关闭菜单" @click="closeDrawer">
          <BaseIcon name="close" :size="20" />
        </button>
      </div>

      <nav class="drawer__nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          class="drawer__link"
          :class="{ 'is-active': isActive(item.path) }"
          :to="item.path"
        >
          <span>{{ item.name }}</span>
          <BaseIcon name="chevronRight" :size="16" />
        </RouterLink>
      </nav>

      <div class="drawer__foot">
        <a class="drawer__contact" :href="phoneHref">
          <BaseIcon name="phone" :size="18" />
          <span>{{ site.contact.phone }}</span>
        </a>
        <a class="drawer__contact" :href="`mailto:${site.contact.email}`">
          <BaseIcon name="mail" :size="18" />
          <span>{{ site.contact.email }}</span>
        </a>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: box-shadow var(--dur) var(--ease), background-color var(--dur) var(--ease),
    border-color var(--dur) var(--ease);
}

.header.is-scrolled {
  background: rgba(255, 255, 255, 0.96);
  border-bottom-color: var(--line);
  box-shadow: var(--shadow-sm);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: var(--header-h);
  padding-left: 20px;
  padding-right: 20px;
}

/* ---------- 品牌 ---------- */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.brand__logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.brand__name {
  font-size: 1rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.brand__slogan {
  margin-top: 2px;
  font-size: 0.6875rem;
  color: var(--text-light);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* ---------- 桌面导航 ---------- */
.nav {
  display: none;
}

.nav__list {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav__link {
  position: relative;
  display: block;
  padding: 8px 14px;
  border-radius: var(--radius-full);
  color: var(--text);
  font-size: 0.9375rem;
  font-weight: 500;
  white-space: nowrap;
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}

.nav__link:hover {
  color: var(--brand-blue);
  background: var(--brand-blue-soft);
}

.nav__link.is-active {
  color: var(--brand-blue);
  font-weight: 700;
  background: var(--brand-blue-soft);
}

.nav__link.is-active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  width: 16px;
  height: 2px;
  transform: translateX(-50%);
  border-radius: 2px;
  background: var(--brand-red);
}

/* ---------- 右侧操作 ---------- */
.header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__phone {
  display: none;
  align-items: center;
  gap: 6px;
  color: var(--ink-2);
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.header__phone:hover {
  color: var(--brand-blue);
}

.header__cta {
  display: none;
}

.hamburger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  color: var(--ink);
  transition: background-color var(--dur) var(--ease);
}

.hamburger:hover {
  background: var(--bg-mist);
}

/* ---------- 抽屉 ---------- */
.drawer-mask {
  position: fixed;
  inset: 0;
  z-index: var(--z-drawer);
  background: rgba(9, 22, 44, 0.48);
  backdrop-filter: blur(2px);
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: calc(var(--z-drawer) + 1);
  display: flex;
  flex-direction: column;
  width: min(84vw, 340px);
  padding: 18px 18px 28px;
  background: #fff;
  box-shadow: -12px 0 40px rgba(9, 22, 44, 0.18);
  overflow-y: auto;
}

.drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}

.drawer__title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ink);
}

.drawer__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius);
  color: var(--text-muted);
}

.drawer__close:hover {
  background: var(--bg-mist);
  color: var(--ink);
}

.drawer__nav {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}

.drawer__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  border-radius: var(--radius);
  color: var(--ink-2);
  font-size: 1rem;
  font-weight: 500;
}

.drawer__link:hover {
  background: var(--bg-soft);
}

.drawer__link.is-active {
  background: var(--brand-blue-soft);
  color: var(--brand-blue);
  font-weight: 700;
}

.drawer__foot {
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.drawer__contact {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-muted);
  font-size: 0.875rem;
  word-break: break-all;
}

.drawer__contact:hover {
  color: var(--brand-blue);
}

/* ---------- 过渡 ---------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s var(--ease);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* ---------- 断点 ---------- */
@media (min-width: 900px) {
  .nav {
    display: block;
  }
  .header__cta {
    display: inline-flex;
  }
  .hamburger {
    display: none;
  }
  .brand__logo {
    width: 44px;
    height: 44px;
  }
  .brand__name {
    font-size: 1.0625rem;
  }
}

@media (min-width: 1100px) {
  .header__phone {
    display: inline-flex;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide-enter-active,
  .slide-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
