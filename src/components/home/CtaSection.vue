<script setup>
import { computed } from 'vue'
import { site } from '@/data/site'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const phoneHref = computed(() => `tel:${site.contact.phoneRaw}`)
</script>

<template>
  <section class="cta">
    <span class="cta__glow anim-float" aria-hidden="true" />
    <div class="container cta__inner">
      <div class="cta__text">
        <h2 class="cta__title">有一个校园信息化的想法，先从一次沟通开始</h2>
        <p class="cta__desc">
          不管是新建平台、改造老系统，还是只想把某一个高频场景做顺，
          都可以先和我们聊聊。我们会给出可落地的建议，而不是先谈报价。
        </p>
      </div>

      <div class="cta__actions">
        <BaseButton to="/contact" variant="red" size="lg">
          预约方案沟通
          <BaseIcon name="arrowRight" :size="18" />
        </BaseButton>
        <a class="cta__phone" :href="phoneHref">
          <BaseIcon name="phone" :size="18" />
          <span>{{ site.contact.phone }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
  padding: var(--sp-7) 0;
  background: var(--grad-dark);
}

.cta__glow {
  position: absolute;
  top: -140px;
  right: -60px;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: rgba(200, 16, 46, 0.28);
  filter: blur(70px);
  pointer-events: none;
}

.cta__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
}

.cta__title {
  color: #fff;
  font-size: var(--fs-xl);
  max-width: 620px;
}

.cta__desc {
  margin-top: 14px;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.9;
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.cta__phone {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: var(--fs-md);
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.cta__phone:hover {
  color: #ffd7de;
}

@media (min-width: 1000px) {
  .cta {
    padding: var(--sp-8) 0;
  }

  .cta__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-8);
  }

  .cta__actions {
    flex: none;
  }
}
</style>
