<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import BackToTop from '@/components/layout/BackToTop.vue'
</script>

<template>
  <a class="skip-to-content" href="#main">跳到主要内容</a>
  <TheHeader />
  <main id="main" class="app-main">
    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <TheFooter />
  <BackToTop />
</template>

<style scoped>
.app-main {
  /* 固定页头占位 */
  padding-top: var(--header-h);
  min-height: 60vh;
}
</style>
