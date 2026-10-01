<script setup>
import { ref } from 'vue'

/**
 * 站点图片组件：按候选路径依次尝试，全部失败时退回文字占位。
 * 这样即使部署环境的资源路径与预期不符，页面也不会出现破图。
 */
const props = defineProps({
  name: { type: String, default: 'logo_hwm.png' },
  alt: { type: String, default: '弘文猫网络科技有限公司' },
  width: { type: [Number, String], default: undefined },
  height: { type: [Number, String], default: undefined },
  loading: { type: String, default: 'lazy' },
  fallbackText: { type: String, default: '弘文猫' }
})

const candidates = [`images/${props.name}`, `logo/${props.name}`, `../${props.name}`, props.name]

const index = ref(0)
const failedAll = ref(false)

function onError() {
  if (index.value < candidates.length - 1) {
    index.value += 1
  } else {
    failedAll.value = true
  }
}
</script>

<template>
  <span v-if="failedAll" class="app-image__fallback" :style="{ width: '48px', height: '48px' }">
    {{ fallbackText.slice(0, 1) }}
  </span>
  <img
    v-else
    class="app-image"
    :src="candidates[index]"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    decoding="async"
    @error="onError"
  />
</template>

<style scoped>
.app-image {
  max-width: 100%;
  height: auto;
}

.app-image__fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--brand-blue);
  color: #fff;
  font-weight: 700;
}
</style>
