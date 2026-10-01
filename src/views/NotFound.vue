<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import { navItems } from '@/data/site'
</script>

<template>
  <section class="nf">
    <div class="nf__bg bg-grid" aria-hidden="true" />
    <div class="container nf__inner">
      <p class="nf__code">404</p>
      <h1 class="nf__title">猫也找不到这个页面</h1>
      <p class="nf__desc">
        你访问的链接可能已经调整或不存在。可以回到首页重新浏览，或者直接从下面的入口进入。
      </p>

      <div class="nf__actions">
        <BaseButton to="/" variant="primary" size="lg">
          返回首页
          <BaseIcon name="arrowRight" :size="18" />
        </BaseButton>
        <BaseButton to="/contact" variant="ghost" size="lg">联系我们</BaseButton>
      </div>

      <ul class="nf__links">
        <li v-for="item in navItems" :key="item.path">
          <RouterLink class="nf__link" :to="item.path">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.nf {
  position: relative;
  overflow: hidden;
  padding: var(--sp-9) 0;
  min-height: 62vh;
  display: flex;
  align-items: center;
}

.nf__bg {
  position: absolute;
  inset: 0;
  opacity: 0.7;
  pointer-events: none;
  mask-image: radial-gradient(circle at 50% 40%, #000 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(circle at 50% 40%, #000 0%, transparent 70%);
}

.nf__inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.nf__code {
  font-family: var(--font-num);
  font-size: clamp(4rem, 3rem + 8vw, 8rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  background: var(--grad-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nf__title {
  margin-top: var(--sp-4);
  font-size: var(--fs-xl);
}

.nf__desc {
  margin: var(--sp-4) auto 0;
  max-width: 520px;
  color: var(--text-muted);
  line-height: 1.95;
}

.nf__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: var(--sp-6);
}

.nf__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 24px;
  margin-top: var(--sp-7);
  padding-top: var(--sp-6);
  border-top: 1px dashed var(--line-strong);
}

.nf__link {
  color: var(--text-muted);
  font-size: var(--fs-sm);
}

.nf__link:hover {
  color: var(--brand-blue);
}
</style>
