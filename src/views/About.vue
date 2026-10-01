<script setup>
import { brandMeaning, philosophy, site, stats } from '@/data/site'
import { milestones } from '@/data/milestones'
import { teamGroups } from '@/data/team'
import PageHero from '@/components/common/PageHero.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StatNumber from '@/components/common/StatNumber.vue'
import AppImage from '@/components/common/AppImage.vue'
</script>

<template>
  <div class="about">
    <PageHero
      eyebrow="About Us"
      title="关于弘文猫"
      desc="一家把校园当成长期战场的技术团队。我们相信，好的校园系统不是功能最多的那一套，而是师生愿意每天打开的那一套。"
      :breadcrumb="[{ label: '关于我们' }]"
    />

    <!-- 公司简介 -->
    <section class="section">
      <div class="container about__intro">
        <div class="about__intro-text">
          <SectionTitle
            eyebrow="Company Profile"
            title="公司简介"
          />
          <p class="lead">
            {{ site.name }} 是一家专注于校园数字化服务的科技公司，以“{{ site.slogan }}”为使命，
            围绕高校、职业院校、K12 学校与各类教育机构的教学、管理、服务场景，提供从咨询设计到开发交付、
            再到长期运维的完整服务。
          </p>
          <p class="about__para">
            我们的团队长期扎根在教育信息化一线，熟悉教务、学工、后勤、宣传等部门的真实业务流程与审批链路，
            也理解师生对“好用”的朴素要求：入口要少、步骤要短、结果要清楚。因此在产品设计上，
            我们坚持先把高频场景做顺，再逐步扩展边界，而不是一次性堆砌大量无人使用的功能。
          </p>
          <p class="about__para">
            技术上，我们具备小程序、公众号、Web 门户、后台管理系统与数据看板的完整自研能力，
            并沉淀了统一身份认证、消息通知、组织机构同步、数据字典等基础组件，
            既能保证单个项目的交付质量，也能让后续的扩展与对接变得可控。
          </p>
          <p class="about__para">
            服务上，我们为每个项目配备固定对接人，提供上线培训、操作手册与运维响应，
            力求让院校的信息化建设是一件“有回声”的事。
          </p>

          <div class="about__actions">
            <BaseButton to="/services" variant="primary">查看业务服务</BaseButton>
            <BaseButton to="/contact" variant="ghost">联系我们</BaseButton>
          </div>
        </div>

        <aside class="about__intro-card">
          <span class="about__logo-plate">
            <AppImage
              class="about__logo"
              name="logo_hwm.png"
              alt="弘文猫网络科技有限公司 Logo"
              :width="120"
              :height="120"
            />
          </span>
          <h3 class="about__card-title">{{ site.name }}</h3>
          <p class="about__card-en">{{ site.enName }}</p>

          <ul class="about__facts">
            <li v-for="item in stats.slice(0, 4)" :key="item.label" class="about__fact">
              <StatNumber :value="item.value" :suffix="item.suffix" :label="item.label" />
            </li>
          </ul>

          <p class="about__card-note">
            <!-- TODO: 数据为示例，请核实后替换 -->
            以上数据为示例口径，正式上线前将替换为经核实的数据。
          </p>
        </aside>
      </div>
    </section>

    <!-- 品牌释义 -->
    <section class="section section-soft">
      <div class="container">
        <SectionTitle
          eyebrow="Brand Story"
          title="“弘文猫”三个字的由来"
          subtitle="品牌名不是随意组合，它承载了我们对这份工作的理解。"
          align="center"
        />

        <div class="grid grid-3">
          <article v-for="(item, i) in brandMeaning" :key="item.key" v-reveal="i * 80" class="card brand-card">
            <span class="brand-card__key">{{ item.key }}</span>
            <h3 class="brand-card__title">{{ item.title }}</h3>
            <p class="brand-card__text">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 使命愿景价值观 -->
    <section class="section">
      <div class="container">
        <SectionTitle
          eyebrow="Mission & Vision"
          title="使命、愿景与价值观"
          align="center"
        />

        <div class="grid grid-3">
          <article
            v-for="(item, i) in philosophy"
            :key="item.label"
            v-reveal="i * 80"
            class="card philosophy"
          >
            <span class="philosophy__label">{{ item.label }}</span>
            <h3 class="philosophy__title">{{ item.title }}</h3>
            <p class="philosophy__text">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 发展历程 -->
    <section class="section section-soft">
      <div class="container">
        <SectionTitle
          eyebrow="Milestones"
          title="发展历程"
          subtitle="以下时间线为示例内容，将替换为公司真实的发展节点。"
          align="center"
        />

        <ol class="timeline">
          <li v-for="(item, i) in milestones" :key="i" v-reveal="i * 60" class="timeline__item">
            <span class="timeline__dot" aria-hidden="true" />
            <span class="timeline__year">{{ item.year }}</span>
            <div class="timeline__body">
              <h3 class="timeline__title">{{ item.title }}</h3>
              <p class="timeline__text">{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- 团队 -->
    <section class="section">
      <div class="container">
        <SectionTitle
          eyebrow="Team"
          title="团队构成"
          subtitle="岗位人数为示例配置，正式上线前将按实际情况更新。"
          align="center"
        />

        <div class="grid grid-4">
          <article v-for="(item, i) in teamGroups" :key="item.name" v-reveal="i * 60" class="card team">
            <span class="icon-box">
              <BaseIcon :name="item.icon" :size="24" />
            </span>
            <h3 class="team__name">{{ item.name }}</h3>
            <p class="team__count">{{ item.count }}</p>
            <p class="team__text">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- 简介 ---------- */
.about__intro {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-7);
  align-items: start;
}

.about__para {
  margin-top: var(--sp-4);
  color: var(--text-muted);
  line-height: 2.05;
}

.about__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: var(--sp-6);
}

/* ---------- 侧边信息卡 ---------- */
.about__intro-card {
  padding: var(--sp-6);
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
}

.about__logo-plate {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 132px;
  height: 132px;
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid var(--line);
  overflow: hidden;
}

.about__logo {
  width: 116px;
  height: 116px;
  object-fit: contain;
}

.about__card-title {
  margin-top: var(--sp-5);
  font-size: var(--fs-md);
  line-height: 1.6;
}

.about__card-en {
  margin-top: 6px;
  color: var(--text-light);
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
}

.about__facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sp-5) var(--sp-4);
  margin-top: var(--sp-6);
  padding-top: var(--sp-5);
  border-top: 1px dashed var(--line-strong);
}

.about__fact :deep(.stat__label) {
  color: var(--text-muted);
}

.about__card-note {
  margin-top: var(--sp-5);
  color: var(--text-light);
  font-size: var(--fs-xs);
  line-height: 1.8;
}

/* ---------- 品牌释义 ---------- */
.brand-card__key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius);
  background: var(--grad-brand);
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
}

.brand-card:nth-child(2) .brand-card__key {
  background: var(--grad-red);
}

.brand-card__title {
  margin-top: var(--sp-5);
  font-size: var(--fs-md);
}

.brand-card__text {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

/* ---------- 使命愿景 ---------- */
.philosophy__label {
  display: inline-block;
  padding: 3px 12px;
  border-radius: var(--radius-full);
  background: var(--brand-blue-soft);
  color: var(--brand-blue);
  font-size: var(--fs-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
}

.philosophy__title {
  margin-top: var(--sp-4);
  font-size: var(--fs-md);
  line-height: 1.6;
}

.philosophy__text {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

/* ---------- 时间线 ---------- */
.timeline {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  padding-left: 26px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 7px;
  width: 2px;
  background: linear-gradient(180deg, var(--brand-blue) 0%, var(--brand-red) 100%);
  opacity: 0.25;
}

.timeline__item {
  position: relative;
  padding: 0 0 var(--sp-6) 0;
}

.timeline__item:last-child {
  padding-bottom: 0;
}

.timeline__dot {
  position: absolute;
  top: 8px;
  left: -26px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--brand-blue);
}

.timeline__year {
  display: inline-block;
  color: var(--brand-red);
  font-family: var(--font-num);
  font-size: var(--fs-sm);
  font-weight: 700;
  letter-spacing: 0.06em;
}

.timeline__title {
  margin-top: 6px;
  font-size: var(--fs-md);
}

.timeline__text {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

/* ---------- 团队 ---------- */
.team__name {
  margin-top: var(--sp-5);
  font-size: var(--fs-md);
}

.team__count {
  margin-top: 4px;
  color: var(--brand-red);
  font-size: var(--fs-sm);
  font-weight: 700;
}

.team__text {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.9;
}

@media (min-width: 1000px) {
  .about__intro {
    grid-template-columns: 1.5fr 1fr;
    gap: var(--sp-8);
  }
}
</style>
