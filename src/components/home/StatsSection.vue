<script setup>
import { stats } from '@/data/site'
import StatNumber from '@/components/common/StatNumber.vue'
</script>

<template>
  <section class="stats-band">
    <div class="container">
      <p class="stats-band__intro">
        <!-- TODO: 以下为示例数据，上线前请核实或替换 -->
        用可衡量的交付结果说话
      </p>
      <ul class="stats-band__grid">
        <li v-for="item in stats" :key="item.label" v-reveal class="stats-band__item">
          <StatNumber :value="item.value" :suffix="item.suffix" :label="item.label" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.stats-band {
  padding: var(--sp-7) 0;
  background: var(--grad-dark);
  color: rgba(255, 255, 255, 0.78);
}

.stats-band__intro {
  margin-bottom: var(--sp-6);
  text-align: center;
  color: rgba(255, 255, 255, 0.62);
  font-size: var(--fs-sm);
  letter-spacing: 0.08em;
}

.stats-band__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sp-6) var(--sp-4);
}

.stats-band__item {
  text-align: center;
  color: #fff;
}

.stats-band__item :deep(.stat__num) {
  justify-content: center;
}

.stats-band__item :deep(.stat__label) {
  color: rgba(255, 255, 255, 0.66);
}

@media (min-width: 760px) {
  .stats-band__grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
