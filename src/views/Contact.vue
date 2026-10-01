<script setup>
import { computed } from 'vue'
import { site } from '@/data/site'
import PageHero from '@/components/common/PageHero.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import ContactForm from '@/components/form/ContactForm.vue'

const mapUrl = computed(
  () => `https://www.amap.com/search?query=${encodeURIComponent(site.contact.address)}`
)

const contactCards = computed(() => [
  {
    icon: 'phone',
    label: '咨询电话',
    value: site.contact.phone,
    href: `tel:${site.contact.phoneRaw}`,
    note: '工作日 09:00 - 18:00'
  },
  {
    icon: 'mail',
    label: '商务邮箱',
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    note: '我们通常在 1 个工作日内回复'
  },
  {
    icon: 'wechat',
    label: '微信咨询',
    value: site.contact.wechat,
    note: '搜索微信号添加，备注“校园项目”'
  },
  {
    icon: 'location',
    label: '公司地址',
    value: site.contact.address,
    note: `邮编 ${site.contact.postcode}`
  }
])

const serviceItems = [
  { icon: 'chat', title: '需求沟通', text: '了解你的场景与现有系统情况，判断可行性。' },
  { icon: 'layers', title: '方案与报价', text: '给出功能清单、技术路线、工期与预算区间。' },
  { icon: 'rocket', title: '原型演示', text: '先看可点击原型，确认交互后再进入开发。' }
]
</script>

<template>
  <div class="contact-page">
    <PageHero
      eyebrow="Contact"
      title="联系我们"
      desc="无论是全新的校园平台，还是既有系统的改造与运维，都欢迎先和我们聊一次。以下联系方式与地址为示例内容，请替换为真实信息。"
      :breadcrumb="[{ label: '联系我们' }]"
    />

    <section class="section">
      <div class="container contact-grid">
        <!-- 联系方式 -->
        <div class="contact-info">
          <SectionTitle eyebrow="Get in touch" title="联系方式" />

          <ul class="contact-cards">
            <li v-for="item in contactCards" :key="item.label" class="contact-card">
              <span class="icon-box">
                <BaseIcon :name="item.icon" :size="22" />
              </span>
              <div class="contact-card__body">
                <p class="contact-card__label">{{ item.label }}</p>
                <a v-if="item.href" class="contact-card__value" :href="item.href">{{ item.value }}</a>
                <p v-else class="contact-card__value contact-card__value--plain">{{ item.value }}</p>
                <p class="contact-card__note">{{ item.note }}</p>
              </div>
            </li>
          </ul>

          <div class="contact-service">
            <h3 class="contact-service__title">和我们沟通后，你会得到</h3>
            <ul class="contact-service__list">
              <li v-for="item in serviceItems" :key="item.title" class="contact-service__item">
                <span class="contact-service__icon">
                  <BaseIcon :name="item.icon" :size="18" />
                </span>
                <div>
                  <p class="contact-service__name">{{ item.title }}</p>
                  <p class="contact-service__text">{{ item.text }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 表单 -->
        <div class="contact-form-wrap">
          <ContactForm />
        </div>
      </div>
    </section>

    <!-- 地图占位 -->
    <section class="section section-soft">
      <div class="container">
        <SectionTitle
          eyebrow="Location"
          title="找到我们"
          subtitle="为保证加载速度与隐私，这里不嵌入第三方地图，点击下方按钮可在地图应用中查看。"
          align="center"
        />

        <div class="map-card">
          <div class="map-card__canvas bg-dots" aria-hidden="true">
            <span class="map-card__pin">
              <BaseIcon name="location" :size="30" />
            </span>
            <span class="map-card__ring anim-float" />
          </div>
          <div class="map-card__info">
            <p class="map-card__label">公司地址</p>
            <p class="map-card__address">{{ site.contact.address }}</p>
            <a class="btn btn--ghost" :href="mapUrl" target="_blank" rel="noopener">
              在地图中查看
              <BaseIcon name="arrowRight" :size="16" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-7);
  align-items: start;
}

/* ---------- 联系方式 ---------- */
.contact-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-4);
}

.contact-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: var(--sp-5);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.contact-card:hover {
  border-color: rgba(29, 78, 158, 0.24);
  box-shadow: var(--shadow-sm);
}

.contact-card__body {
  min-width: 0;
}

.contact-card__label {
  color: var(--text-light);
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
}

.contact-card__value {
  display: block;
  margin-top: 4px;
  color: var(--ink);
  font-size: var(--fs-base);
  font-weight: 700;
  line-height: 1.6;
  word-break: break-word;
}

a.contact-card__value:hover {
  color: var(--brand-blue);
}

.contact-card__value--plain {
  font-weight: 600;
  font-size: var(--fs-sm);
}

.contact-card__note {
  margin-top: 6px;
  color: var(--text-light);
  font-size: var(--fs-xs);
  line-height: 1.7;
}

/* ---------- 沟通说明 ---------- */
.contact-service {
  margin-top: var(--sp-6);
  padding: var(--sp-5);
  background: var(--bg-soft);
  border-radius: var(--radius);
  border: 1px solid var(--line);
}

.contact-service__title {
  font-size: var(--fs-md);
}

.contact-service__list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  margin-top: var(--sp-4);
}

.contact-service__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.contact-service__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--brand-blue);
  border: 1px solid var(--line);
}

.contact-service__name {
  color: var(--ink-2);
  font-size: var(--fs-sm);
  font-weight: 700;
}

.contact-service__text {
  margin-top: 3px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.8;
}

/* ---------- 地图占位 ---------- */
.map-card {
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
}

.map-card__canvas {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  background-color: var(--brand-blue-soft);
}

.map-card__pin {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--grad-brand);
  color: #fff;
  box-shadow: var(--shadow-brand);
}

.map-card__ring {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px dashed rgba(29, 78, 158, 0.28);
}

.map-card__info {
  padding: var(--sp-6);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.map-card__label {
  color: var(--text-light);
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
}

.map-card__address {
  color: var(--ink);
  font-size: var(--fs-md);
  font-weight: 700;
  line-height: 1.7;
}

@media (min-width: 880px) {
  .contact-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .map-card {
    grid-template-columns: 1.2fr 1fr;
  }

  .map-card__canvas {
    min-height: 280px;
  }

  .map-card__info {
    padding: var(--sp-7);
    justify-content: center;
  }
}

@media (min-width: 1080px) {
  .contact-grid {
    grid-template-columns: 1fr 1.05fr;
    gap: var(--sp-8);
  }

  .contact-info {
    position: sticky;
    top: calc(var(--header-h) + 24px);
  }
}
</style>
