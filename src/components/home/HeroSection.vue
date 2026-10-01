<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import HeroIllustration from '@/components/common/HeroIllustration.vue'

const highlights = [
  { icon: 'campus', text: '深耕校园场景' },
  { icon: 'layers', text: '全栈自研交付' },
  { icon: 'headset', text: '长期运维陪伴' }
]
</script>

<template>
  <section class="hero">
    <span class="hero__glow hero__glow--blue anim-float" aria-hidden="true" />
    <span class="hero__glow hero__glow--red anim-float-x" aria-hidden="true" />

    <div class="container hero__inner">
      <div class="hero__text">
        <span class="hero__badge">
          <span class="hero__badge-dot" />
          校园数字化服务专家
        </span>

        <h1 class="hero__title">
          让校园更智慧<br />
          让教育<span class="gradient-text">更温暖</span>
        </h1>

        <p class="hero__desc">
          弘文猫网络科技有限公司专注校园数字化服务，提供校园数字平台建设、智慧校园解决方案、
          教育内容产品研发与定制软件开发。我们把师生每天都在用的高频场景做扎实，
          让管理者减负、教师省心、学生好用。
        </p>

        <div class="hero__actions">
          <BaseButton to="/contact" variant="primary" size="lg">
            免费咨询方案
            <BaseIcon name="arrowRight" :size="18" />
          </BaseButton>
          <BaseButton to="/services" variant="ghost" size="lg">查看业务服务</BaseButton>
        </div>

        <ul class="hero__highlights">
          <li v-for="item in highlights" :key="item.text" class="hero__highlight">
            <BaseIcon :name="item.icon" :size="16" />
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>

      <div class="hero__art">
        <HeroIllustration />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: var(--sp-7) 0 var(--sp-8);
  background: linear-gradient(180deg, #f8fafe 0%, #ffffff 100%);
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

.hero__glow--blue {
  top: -120px;
  right: -80px;
  width: 420px;
  height: 420px;
  background: rgba(29, 78, 158, 0.16);
}

.hero__glow--red {
  bottom: -160px;
  left: -110px;
  width: 340px;
  height: 340px;
  background: rgba(200, 16, 46, 0.1);
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-7);
  align-items: center;
}

/* ---------- 文案区 ---------- */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-xs);
  color: var(--brand-blue);
  font-size: var(--fs-sm);
  font-weight: 600;
}

.hero__badge-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand-red);
}

.hero__badge-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--brand-red);
  animation: pulse-ring 2.4s var(--ease) infinite;
}

.hero__title {
  margin-top: var(--sp-4);
  font-size: var(--fs-3xl);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.hero__desc {
  margin-top: var(--sp-5);
  max-width: 560px;
  font-size: var(--fs-md);
  line-height: 1.95;
  color: var(--text-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: var(--sp-6);
}

.hero__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin-top: var(--sp-6);
  padding-top: var(--sp-5);
  border-top: 1px dashed var(--line-strong);
}

.hero__highlight {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--text);
  font-size: var(--fs-sm);
  font-weight: 500;
}

.hero__highlight :deep(svg) {
  color: var(--brand-blue);
}

/* ---------- 插画区 ---------- */
.hero__art {
  display: flex;
  justify-content: center;
  animation: fade-in-up 0.9s var(--ease) both;
}

@media (min-width: 900px) {
  .hero {
    padding: var(--sp-9) 0 var(--sp-10);
  }

  .hero__inner {
    grid-template-columns: 1.05fr 1fr;
    gap: var(--sp-8);
  }

  .hero__art {
    justify-content: flex-end;
  }
}
</style>
