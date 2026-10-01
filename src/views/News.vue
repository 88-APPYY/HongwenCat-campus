<script setup>
import { computed, ref } from 'vue'
import { news } from '@/data/news'
import PageHero from '@/components/common/PageHero.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const categories = ['全部', ...new Set(news.map((item) => item.category))]
const active = ref('全部')
const openId = ref('')

const list = computed(() => {
  const sorted = [...news].sort((a, b) => (a.date < b.date ? 1 : -1))
  const filtered =
    active.value === '全部' ? sorted : sorted.filter((item) => item.category === active.value)
  return filtered.map((item) => ({ ...item, displayDate: item.date.replace(/-/g, '.') }))
})

function toggle(id) {
  openId.value = openId.value === id ? '' : id
}
</script>

<template>
  <div class="news-page">
    <PageHero
      eyebrow="News"
      title="新闻动态"
      desc="记录产品迭代、项目交付与我们对校园信息化的一些观察。以下条目为示例内容，将替换为真实动态。"
      :breadcrumb="[{ label: '新闻动态' }]"
    />

    <section class="section">
      <div class="container">
        <!-- 分类筛选 -->
        <div class="filters" role="tablist" aria-label="新闻分类">
          <button
            v-for="cat in categories"
            :key="cat"
            class="filters__btn"
            :class="{ 'is-active': active === cat }"
            type="button"
            role="tab"
            :aria-selected="active === cat"
            @click="active = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- 列表 -->
        <div class="news-list">
          <article v-for="(item, i) in list" :key="item.id" v-reveal="i * 50" class="news-item">
            <div class="news-item__side">
              <time class="news-item__date" :datetime="item.date">{{ item.displayDate }}</time>
              <span class="news-item__cat">{{ item.category }}</span>
            </div>

            <div class="news-item__main">
              <h2 class="news-item__title">{{ item.title }}</h2>
              <p class="news-item__summary">{{ item.summary }}</p>

              <div v-if="openId === item.id" class="news-item__detail">
                <p class="news-item__content">{{ item.content }}</p>
              </div>

              <button
                class="news-item__more"
                type="button"
                :aria-expanded="openId === item.id"
                @click="toggle(item.id)"
              >
                {{ openId === item.id ? '收起详情' : '展开详情' }}
                <BaseIcon
                  name="chevronDown"
                  :size="15"
                  :class="{ 'is-open': openId === item.id }"
                />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- 筛选 ---------- */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: var(--sp-6);
}

.filters__btn {
  padding: 7px 18px;
  border-radius: var(--radius-full);
  background: var(--bg-soft);
  color: var(--text-muted);
  font-size: var(--fs-sm);
  font-weight: 500;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease);
}

.filters__btn:hover {
  background: var(--brand-blue-soft);
  color: var(--brand-blue);
}

.filters__btn.is-active {
  background: var(--grad-brand);
  color: #fff;
  font-weight: 600;
}

/* ---------- 列表 ---------- */
.news-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}

.news-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-4);
  padding: var(--sp-5);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease),
    transform var(--dur) var(--ease);
}

.news-item:hover {
  border-color: rgba(29, 78, 158, 0.22);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.news-item__side {
  display: flex;
  align-items: center;
  gap: 10px;
}

.news-item__date {
  color: var(--brand-blue);
  font-family: var(--font-num);
  font-size: var(--fs-base);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

.news-item__cat {
  padding: 2px 10px;
  border-radius: var(--radius-full);
  background: var(--brand-blue-soft);
  color: var(--brand-blue);
  font-size: var(--fs-xs);
  font-weight: 600;
}

.news-item__title {
  font-size: var(--fs-md);
  line-height: 1.6;
}

.news-item__summary {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

.news-item__detail {
  margin-top: var(--sp-4);
  padding: var(--sp-4) var(--sp-5);
  border-left: 3px solid var(--brand-blue);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: var(--bg-soft);
  animation: fade-in-up 0.32s var(--ease) both;
}

.news-item__content {
  color: var(--text);
  font-size: var(--fs-sm);
  line-height: 2;
}

.news-item__more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: var(--sp-4);
  padding: 0;
  color: var(--brand-blue);
  font-size: var(--fs-sm);
  font-weight: 600;
}

.news-item__more:hover {
  color: var(--brand-red);
}

.news-item__more :deep(svg) {
  transition: transform var(--dur) var(--ease);
}

.news-item__more :deep(svg.is-open) {
  transform: rotate(180deg);
}

@media (min-width: 860px) {
  .news-item {
    grid-template-columns: 150px minmax(0, 1fr);
    gap: var(--sp-6);
    padding: var(--sp-6);
  }

  .news-item__side {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding-right: var(--sp-5);
    border-right: 1px dashed var(--line-strong);
  }
}
</style>
