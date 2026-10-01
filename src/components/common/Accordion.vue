<script setup>
/**
 * 通用折叠面板（FAQ / 长内容收起）
 */
import { ref } from 'vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  /** 默认展开第一项 */
  defaultOpen: { type: Number, default: 0 }
})

const openIndex = ref(props.defaultOpen)

function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <div class="accordion">
    <div v-for="(item, i) in items" :key="i" class="accordion__item" :class="{ 'is-open': openIndex === i }">
      <h3 class="accordion__heading">
        <button
          class="accordion__trigger"
          type="button"
          :aria-expanded="openIndex === i"
          :aria-controls="`acc-panel-${i}`"
          @click="toggle(i)"
        >
          <span class="accordion__q">{{ item.q }}</span>
          <BaseIcon class="accordion__icon" name="chevronDown" :size="18" />
        </button>
      </h3>
      <div
        :id="`acc-panel-${i}`"
        class="accordion__panel"
        role="region"
        :aria-hidden="openIndex !== i"
      >
        <p class="accordion__a">{{ item.a }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.accordion__item {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.accordion__item.is-open {
  border-color: rgba(29, 78, 158, 0.32);
  box-shadow: var(--shadow-sm);
}

.accordion__heading {
  margin: 0;
  font-size: inherit;
}

.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 18px 20px;
  text-align: left;
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--ink);
}

.accordion__q {
  flex: 1;
}

.accordion__icon {
  color: var(--text-light);
  transition: transform var(--dur) var(--ease), color var(--dur) var(--ease);
}

.accordion__item.is-open .accordion__icon {
  transform: rotate(180deg);
  color: var(--brand-blue);
}

.accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s var(--ease);
}

.accordion__item.is-open .accordion__panel {
  grid-template-rows: 1fr;
}

.accordion__a {
  overflow: hidden;
  margin: 0;
  padding: 0 20px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

.accordion__item.is-open .accordion__a {
  padding-bottom: 20px;
}

@media (prefers-reduced-motion: reduce) {
  .accordion__panel {
    transition: none;
  }
}
</style>
