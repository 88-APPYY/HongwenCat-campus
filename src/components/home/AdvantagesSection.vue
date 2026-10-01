<script setup>
import { advantages } from '@/data/site'
import SectionTitle from '@/components/common/SectionTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
</script>

<template>
  <section class="section section-soft">
    <div class="container">
      <SectionTitle
        eyebrow="Why Us"
        title="选择弘文猫的六个理由"
        subtitle="教育场景的特殊性在于流程复杂、使用者众多、容错率低。我们的做法是先理解现场，再动手写代码。"
        align="center"
      />

      <div class="grid grid-3">
        <article v-for="(item, i) in advantages" :key="item.title" v-reveal="i * 60" class="card advantage">
          <span class="icon-box">
            <BaseIcon :name="item.icon" :size="24" />
          </span>
          <h3 class="advantage__title">{{ item.title }}</h3>
          <p class="advantage__text">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.advantage__title {
  margin-top: var(--sp-5);
  font-size: var(--fs-md);
}

.advantage__text {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.9;
}
</style>
