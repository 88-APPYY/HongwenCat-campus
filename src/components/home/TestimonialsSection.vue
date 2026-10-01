<script setup>
import { reviews } from '@/data/reviews'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Carousel from '@/components/common/Carousel.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
</script>

<template>
  <section class="section section-soft">
    <div class="container">
      <SectionTitle
        eyebrow="Feedback"
        title="来自校园一线的使用反馈"
        subtitle="以下评价为示例内容，最终将替换为客户授权发布的真实反馈。"
        align="center"
      />

      <Carousel :items="reviews" :per-view="1" :gap="28" :interval="6000">
        <template #default="{ item }">
          <figure class="review">
            <BaseIcon name="quoteMark" :size="30" class="review__mark" />
            <blockquote class="review__quote">{{ item.quote }}</blockquote>
            <figcaption class="review__author">
              <span class="review__avatar" aria-hidden="true">{{ item.avatar }}</span>
              <span class="review__meta">
                <span class="review__name">{{ item.author }}</span>
                <span class="review__role">{{ item.role }}</span>
              </span>
            </figcaption>
          </figure>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
.review {
  margin: 0;
  padding: var(--sp-6);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
}

.review__mark {
  color: var(--brand-blue);
  opacity: 0.18;
}

.review__quote {
  margin: 12px 0 0;
  color: var(--ink-2);
  font-size: var(--fs-md);
  line-height: 2;
}

.review__author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: var(--sp-6);
  padding-top: var(--sp-5);
  border-top: 1px dashed var(--line-strong);
}

.review__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex: none;
  border-radius: 50%;
  background: var(--grad-brand);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
}

.review__meta {
  display: flex;
  flex-direction: column;
}

.review__name {
  color: var(--ink);
  font-size: var(--fs-sm);
  font-weight: 700;
}

.review__role {
  color: var(--text-light);
  font-size: var(--fs-xs);
}

@media (min-width: 900px) {
  .review {
    padding: var(--sp-7);
    flex: 1;
  }

  .review__quote {
    font-size: var(--fs-lg);
    line-height: 1.9;
  }
}
</style>
