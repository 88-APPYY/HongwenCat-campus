<script setup>
import { computed } from 'vue'

/**
 * 通用按钮：自动在 button / router-link / a 之间切换
 */
const props = defineProps({
  to: { type: [String, Object], default: '' },
  href: { type: String, default: '' },
  variant: { type: String, default: 'primary' }, // primary | red | ghost | light
  size: { type: String, default: 'md' }, // md | lg
  block: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false }
})

const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  { 'btn--lg': props.size === 'lg', 'btn--block': props.block }
])
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :to="to || undefined"
    :href="href || undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :target="href && href.startsWith('http') ? '_blank' : undefined"
    :rel="href && href.startsWith('http') ? 'noopener' : undefined"
  >
    <slot />
  </component>
</template>
