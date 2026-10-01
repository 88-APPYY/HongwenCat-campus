<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  align: { type: String, default: 'left' }, // left | center
  light: { type: Boolean, default: false }
})
</script>

<template>
  <div class="section-title" :class="{ 'section-title--center': align === 'center' }">
    <span v-if="eyebrow" class="section-title__eyebrow">{{ eyebrow }}</span>
    <h2 v-if="title" class="section-title__main">{{ title }}</h2>
    <p v-if="subtitle" class="section-title__sub">{{ subtitle }}</p>
    <slot />
  </div>
</template>
