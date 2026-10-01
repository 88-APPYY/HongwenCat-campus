<script setup>
import { nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '@/data/services'
import { faqs, workflow } from '@/data/site'
import PageHero from '@/components/common/PageHero.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Accordion from '@/components/common/Accordion.vue'

const route = useRoute()

// 支持首页卡片跳转到 #服务ID 时定位到对应业务块
onMounted(async () => {
  await nextTick()
  if (!route.hash) return
  const el = document.querySelector(route.hash)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="services-page">
    <PageHero
      eyebrow="Services"
      title="业务服务"
      desc="四条业务线互相支撑：平台负责连接师生，解决方案负责理顺流程，内容产品负责沉淀知识，定制开发负责填补空白。"
      :breadcrumb="[{ label: '业务服务' }]"
    />

    <!-- 业务详情 -->
    <section class="section">
      <div class="container">
        <div class="services-list">
          <article
            v-for="(item, i) in services"
            :id="item.id"
            :key="item.id"
            v-reveal="i * 60"
            class="service-block"
          >
            <div class="service-block__head">
              <span class="icon-box">
                <BaseIcon :name="item.icon" :size="26" />
              </span>
              <div class="service-block__title-wrap">
                <span class="service-block__en">{{ item.en }}</span>
                <h2 class="service-block__title">{{ item.name }}</h2>
              </div>
            </div>

            <p class="service-block__summary">{{ item.summary }}</p>

            <ul class="service-block__list">
              <li v-for="(line, j) in item.details" :key="j" class="service-block__item">
                <BaseIcon class="service-block__check" name="check" :size="16" />
                <span>{{ line }}</span>
              </li>
            </ul>

            <ul class="service-block__tags">
              <li v-for="tag in item.tags" :key="tag" class="tag tag--brand">{{ tag }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- 服务流程 -->
    <section class="section section-soft">
      <div class="container">
        <SectionTitle
          eyebrow="Process"
          title="我们的服务流程"
          subtitle="六个步骤，每一步都有明确的交付物，避免需求在过程中变形。"
          align="center"
        />

        <ol class="flow">
          <li v-for="(item, i) in workflow" :key="item.step" v-reveal="i * 50" class="flow__item">
            <span class="flow__step">{{ item.step }}</span>
            <h3 class="flow__title">{{ item.title }}</h3>
            <p class="flow__text">{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="section">
      <div class="container faq-wrap">
        <SectionTitle
          eyebrow="FAQ"
          title="常见问题"
          subtitle="这些问题是被问到最多的，如果你关心的不在其中，欢迎直接联系我们。"
          align="center"
        />
        <Accordion :items="faqs" :default-open="0" />

        <div class="faq-wrap__cta">
          <BaseButton to="/contact" variant="primary" size="lg">
            还有疑问？直接联系我们
            <BaseIcon name="arrowRight" :size="18" />
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- 业务块 ---------- */
.services-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
}

.service-block {
  padding: var(--sp-6);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
  scroll-margin-top: calc(var(--header-h) + 24px);
  transition: box-shadow var(--dur) var(--ease), border-color var(--dur) var(--ease);
}

.service-block:hover {
  border-color: rgba(29, 78, 158, 0.22);
  box-shadow: var(--shadow-sm);
}

.service-block__head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.service-block__title-wrap {
  min-width: 0;
}

.service-block__en {
  display: block;
  color: var(--text-light);
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.service-block__title {
  margin-top: 4px;
  font-size: var(--fs-xl);
}

.service-block__summary {
  margin-top: var(--sp-5);
  color: var(--text);
  font-size: var(--fs-base);
  line-height: 2;
}

.service-block__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: var(--sp-5);
  padding-top: var(--sp-5);
  border-top: 1px dashed var(--line-strong);
}

.service-block__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.85;
}

.service-block__check {
  margin-top: 4px;
  color: var(--brand-blue);
}

.service-block__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--sp-5);
}

/* ---------- 流程 ---------- */
.flow {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-5);
}

.flow__item {
  position: relative;
  padding: var(--sp-5);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.flow__item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.flow__step {
  display: inline-block;
  color: var(--brand-blue);
  font-family: var(--font-num);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  opacity: 0.35;
}

.flow__title {
  margin-top: 6px;
  font-size: var(--fs-md);
}

.flow__text {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.9;
}

/* ---------- FAQ ---------- */
.faq-wrap {
  max-width: 880px;
}

.faq-wrap__cta {
  margin-top: var(--sp-7);
  text-align: center;
}

@media (min-width: 760px) {
  .flow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service-block__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1080px) {
  .flow {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .service-block {
    padding: var(--sp-7);
  }
}
</style>
