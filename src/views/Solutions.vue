<script setup>
import { cases, solutions } from '@/data/solutions'
import PageHero from '@/components/common/PageHero.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const techStack = [
  { group: '前端', items: ['Vue 3', 'TypeScript', 'Vite', '微信小程序原生', 'uni-app'] },
  { group: '后端', items: ['Java / Spring Boot', 'Node.js', 'Python', 'RESTful API', 'WebSocket'] },
  { group: '数据', items: ['MySQL', 'PostgreSQL', 'Redis', 'Elasticsearch', '数据可视化'] },
  { group: '交付与运维', items: ['Docker', 'Nginx', 'CI/CD', '私有化部署', '日志与监控'] }
]
</script>

<template>
  <div class="solutions-page">
    <PageHero
      eyebrow="Solutions"
      title="解决方案"
      desc="我们不按功能清单卖软件，而是先走进教务、学工、后勤、宣传这些真实场景，把流程理顺之后再动手开发。"
      :breadcrumb="[{ label: '解决方案' }]"
    />

    <!-- 场景方案 -->
    <section class="section">
      <div class="container">
        <SectionTitle
          eyebrow="Scenarios"
          title="六个最成熟的落地场景"
          subtitle="每个场景都标注了常见的痛点与我们的处理思路，方便你快速判断是否匹配。"
          align="center"
        />

        <div class="grid grid-2">
          <article v-for="(item, i) in solutions" :key="item.id" v-reveal="i * 60" class="card scenario">
            <div class="scenario__head">
              <span class="icon-box">
                <BaseIcon :name="item.icon" :size="24" />
              </span>
              <span class="tag tag--brand">{{ item.tag }}</span>
            </div>

            <h3 class="scenario__title">{{ item.title }}</h3>
            <p class="scenario__summary">{{ item.summary }}</p>

            <div class="scenario__block">
              <h4 class="scenario__label">
                <BaseIcon name="alert" :size="15" />
                常见痛点
              </h4>
              <ul class="scenario__list">
                <li v-for="(pain, j) in item.pain" :key="j">{{ pain }}</li>
              </ul>
            </div>

            <div class="scenario__block">
              <h4 class="scenario__label">
                <BaseIcon name="check" :size="15" />
                我们的做法
              </h4>
              <p class="scenario__text">{{ item.solve }}</p>
            </div>

            <ul class="scenario__effects">
              <li v-for="(eff, j) in item.effect" :key="j" class="scenario__effect">
                <BaseIcon name="arrowRight" :size="14" />
                <span>{{ eff }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- 客户案例 -->
    <section class="section section-soft">
      <div class="container">
        <SectionTitle
          eyebrow="Cases"
          title="客户案例"
          subtitle="以下案例为示例内容（含客户名称），正式上线前将替换为经客户授权发布的真实案例。"
          align="center"
        />

        <div class="cases">
          <article v-for="(item, i) in cases" :key="item.id" v-reveal="i * 70" class="case">
            <header class="case__head">
              <div class="case__meta">
                <span class="case__tag">{{ item.tag }}</span>
                <span class="case__duration">{{ item.duration }}</span>
              </div>
              <h3 class="case__client">{{ item.client }}</h3>
            </header>

            <div class="case__body">
              <div class="case__col">
                <h4 class="case__label case__label--problem">挑战</h4>
                <p class="case__text">{{ item.challenge }}</p>
              </div>
              <div class="case__col">
                <h4 class="case__label case__label--action">方案</h4>
                <p class="case__text">{{ item.action }}</p>
              </div>
              <div class="case__col">
                <h4 class="case__label case__label--result">成效</h4>
                <ul class="case__results">
                  <li v-for="(res, j) in item.result" :key="j" class="case__result">
                    <BaseIcon name="check" :size="15" />
                    <span>{{ res }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 技术能力 -->
    <section class="section">
      <div class="container">
        <SectionTitle
          eyebrow="Tech Stack"
          title="技术能力"
          subtitle="技术选型以稳定、可维护、易对接为前提，而不是追逐最新框架。"
          align="center"
        />

        <div class="grid grid-4">
          <div v-for="(group, i) in techStack" :key="group.group" v-reveal="i * 60" class="card tech">
            <h3 class="tech__group">{{ group.group }}</h3>
            <ul class="tech__list">
              <li v-for="t in group.items" :key="t" class="tech__item">
                <BaseIcon name="checkCircle" :size="15" />
                <span>{{ t }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="tech__cta">
          <BaseButton to="/contact" variant="primary" size="lg">
            聊聊你的场景
            <BaseIcon name="arrowRight" :size="18" />
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- 场景卡片 ---------- */
.scenario {
  display: flex;
  flex-direction: column;
}

.scenario__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.scenario__title {
  margin-top: var(--sp-5);
  font-size: var(--fs-lg);
}

.scenario__summary {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

.scenario__block {
  margin-top: var(--sp-5);
}

.scenario__label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-2);
  font-size: var(--fs-sm);
  font-weight: 700;
}

.scenario__label :deep(svg) {
  color: var(--brand-blue);
}

.scenario__list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.scenario__list li {
  position: relative;
  padding-left: 16px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.8;
}

.scenario__list li::before {
  content: '';
  position: absolute;
  top: 11px;
  left: 2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand-red);
  opacity: 0.7;
}

.scenario__text {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

.scenario__effects {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: var(--sp-5);
}

.scenario__effect {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  background: var(--brand-blue-soft);
  color: var(--brand-blue);
  font-size: var(--fs-xs);
  font-weight: 500;
}

/* ---------- 案例 ---------- */
.cases {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
}

.case {
  padding: var(--sp-6);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
}

.case__head {
  padding-bottom: var(--sp-5);
  border-bottom: 1px dashed var(--line-strong);
}

.case__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.case__tag {
  padding: 3px 11px;
  border-radius: var(--radius-full);
  background: var(--brand-red-soft);
  color: var(--brand-red);
  font-size: var(--fs-xs);
  font-weight: 600;
}

.case__duration {
  color: var(--text-light);
  font-size: var(--fs-xs);
}

.case__client {
  margin-top: 12px;
  font-size: var(--fs-lg);
}

.case__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-5);
  margin-top: var(--sp-5);
}

.case__label {
  display: inline-block;
  margin-bottom: 10px;
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--fs-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
}

.case__label--problem {
  background: var(--brand-red-soft);
  color: var(--brand-red);
}

.case__label--action {
  background: var(--brand-blue-soft);
  color: var(--brand-blue);
}

.case__label--result {
  background: rgba(18, 168, 112, 0.12);
  color: var(--success);
}

.case__text {
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

.case__results {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.case__result {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--text);
  font-size: var(--fs-sm);
  line-height: 1.8;
}

.case__result :deep(svg) {
  margin-top: 4px;
  color: var(--success);
}

/* ---------- 技术 ---------- */
.tech__group {
  font-size: var(--fs-md);
}

.tech__list {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: var(--sp-4);
}

.tech__item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
}

.tech__item :deep(svg) {
  color: var(--brand-blue);
  opacity: 0.7;
}

.tech__cta {
  margin-top: var(--sp-7);
  text-align: center;
}

@media (min-width: 900px) {
  .case__body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--sp-6);
  }
}
</style>
