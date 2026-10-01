<script setup>
/**
 * 内页通用页头：面包屑 + 标题 + 描述
 */
import BaseIcon from '@/components/common/BaseIcon.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  breadcrumb: { type: Array, default: () => [] }
})
</script>

<template>
  <section class="page-hero">
    <div class="page-hero__bg bg-grid" aria-hidden="true" />
    <span class="page-hero__glow anim-float" aria-hidden="true" />

    <div class="container page-hero__inner">
      <nav v-if="breadcrumb.length" class="crumb" aria-label="面包屑导航">
        <RouterLink class="crumb__link" to="/">首页</RouterLink>
        <template v-for="(item, i) in breadcrumb" :key="i">
          <BaseIcon class="crumb__sep" name="chevronRight" :size="13" />
          <span v-if="i === breadcrumb.length - 1" class="crumb__current">{{ item }}</span>
          <RouterLink v-else class="crumb__link" :to="item.path || '/'">{{ item.label || item }}</RouterLink>
        </template>
      </nav>

      <span v-if="eyebrow" class="page-hero__eyebrow">{{ eyebrow }}</span>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="desc" class="page-hero__desc">{{ desc }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  overflow: hidden;
  padding: var(--sp-7) 0 var(--sp-6);
  background: linear-gradient(180deg, #f4f8fe 0%, #ffffff 100%);
  border-bottom: 1px solid var(--line);
}

.page-hero__bg {
  position: absolute;
  inset: 0;
  opacity: 0.7;
  pointer-events: none;
  mask-image: linear-gradient(180deg, #000 0%, transparent 85%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 85%);
}

.page-hero__glow {
  position: absolute;
  top: -150px;
  right: -100px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: rgba(29, 78, 158, 0.14);
  filter: blur(70px);
  pointer-events: none;
}

.page-hero__inner {
  position: relative;
  z-index: 1;
}

.crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: var(--sp-5);
  font-size: var(--fs-xs);
  color: var(--text-light);
}

.crumb__sep {
  color: var(--text-light);
  opacity: 0.7;
}

.crumb__link {
  color: var(--text-muted);
}

.crumb__link:hover {
  color: var(--brand-blue);
}

.crumb__current {
  color: var(--brand-blue);
  font-weight: 600;
}

.page-hero__eyebrow {
  display: inline-block;
  margin-bottom: 12px;
  padding: 4px 13px;
  border-radius: var(--radius-full);
  background: var(--brand-blue-soft);
  color: var(--brand-blue);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.page-hero__title {
  font-size: var(--fs-2xl);
  letter-spacing: -0.02em;
}

.page-hero__desc {
  margin-top: var(--sp-4);
  max-width: 760px;
  font-size: var(--fs-md);
  line-height: 1.95;
  color: var(--text-muted);
}

@media (min-width: 900px) {
  .page-hero {
    padding: var(--sp-8) 0;
  }
}
</style>
