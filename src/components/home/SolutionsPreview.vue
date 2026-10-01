<script setup>
import { solutions } from '@/data/solutions'
import SectionTitle from '@/components/common/SectionTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionTitle
        eyebrow="Solutions"
        title="按场景交付，而不是按功能堆砌"
        subtitle="以下六个场景是我们沉淀最多、落地最成熟的领域。每个方案都从现场的实际流程出发。"
        align="center"
      />

      <div class="grid grid-3">
        <article v-for="(item, i) in solutions" :key="item.id" v-reveal="i * 60" class="card solution">
          <div class="solution__top">
            <span class="icon-box icon-box--red">
              <BaseIcon :name="item.icon" :size="23" />
            </span>
            <span class="tag tag--red">{{ item.tag }}</span>
          </div>
          <h3 class="solution__title">{{ item.title }}</h3>
          <p class="solution__text">{{ item.summary }}</p>
        </article>
      </div>

      <div class="solution__cta">
        <RouterLink class="solution__cta-link" to="/solutions">
          查看完整解决方案与案例
          <BaseIcon name="arrowRight" :size="16" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.solution__title {
  margin-top: var(--sp-5);
  font-size: var(--fs-md);
}

.solution__text {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.9;
}

.solution__cta {
  margin-top: var(--sp-7);
  text-align: center;
}

.solution__cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--brand-blue);
  font-size: var(--fs-base);
  font-weight: 600;
}

.solution__cta-link:hover {
  gap: 12px;
  color: var(--brand-red);
}
</style>
