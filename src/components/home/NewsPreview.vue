<script setup>
import { computed } from 'vue'
import { news } from '@/data/news'
import SectionTitle from '@/components/common/SectionTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const latest = computed(() =>
  [...news]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)
    .map((item) => ({ ...item, displayDate: item.date.replace(/-/g, '.') }))
)
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionTitle
        eyebrow="News"
        title="公司动态与行业观察"
        subtitle="记录产品迭代、交付实践与对校园信息化的一些思考。"
        align="center"
      />

      <div class="grid grid-3">
        <article v-for="(item, i) in latest" :key="item.id" v-reveal="i * 70" class="card news">
          <div class="news__head">
            <span class="tag tag--brand">{{ item.category }}</span>
            <time class="news__date" :datetime="item.date">{{ item.displayDate }}</time>
          </div>
          <h3 class="news__title">{{ item.title }}</h3>
          <p class="news__text">{{ item.summary }}</p>
        </article>
      </div>

      <div class="news__cta">
        <RouterLink class="news__cta-link" to="/news">
          查看全部动态
          <BaseIcon name="arrowRight" :size="16" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.news__date {
  color: var(--text-light);
  font-size: var(--fs-xs);
  font-variant-numeric: tabular-nums;
}

.news__title {
  margin-top: var(--sp-5);
  font-size: var(--fs-md);
  line-height: 1.6;
}

.news__text {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.9;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news__cta {
  margin-top: var(--sp-7);
  text-align: center;
}

.news__cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--brand-blue);
  font-size: var(--fs-base);
  font-weight: 600;
}

.news__cta-link:hover {
  gap: 12px;
  color: var(--brand-red);
}
</style>
