<script setup>
import { services } from '@/data/services'
import SectionTitle from '@/components/common/SectionTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionTitle
        eyebrow="Our Services"
        title="四条业务线，覆盖校园数字化的主要需求"
        subtitle="从平台搭建到内容生产，从系统对接到长期运维，我们把能力收拢在四个方向，避免样样都做、样样不深。"
        align="center"
      />

      <div class="grid grid-2 services">
        <article v-for="(item, i) in services" :key="item.id" v-reveal="i * 80" class="card service">
          <div class="service__head">
            <span class="icon-box">
              <BaseIcon :name="item.icon" :size="26" />
            </span>
            <span class="service__en">{{ item.en }}</span>
          </div>

          <h3 class="service__name">{{ item.name }}</h3>
          <p class="service__desc">{{ item.summary }}</p>

          <ul class="service__tags">
            <li v-for="tag in item.tags" :key="tag" class="tag tag--brand">{{ tag }}</li>
          </ul>

          <RouterLink class="service__more" :to="{ path: '/services', hash: `#${item.id}` }">
            了解详情
            <BaseIcon name="arrowRight" :size="15" />
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
}

.service__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.service__en {
  color: var(--text-light);
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: right;
}

.service__name {
  margin-top: var(--sp-5);
  font-size: var(--fs-lg);
}

.service__desc {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.9;
}

.service__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--sp-5);
}

.service__more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: var(--sp-5);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--line);
  color: var(--brand-blue);
  font-size: var(--fs-sm);
  font-weight: 600;
}

.service__more:hover {
  gap: 10px;
  color: var(--brand-red);
}
</style>
