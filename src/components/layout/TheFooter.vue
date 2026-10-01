<script setup>
import { computed } from 'vue'
import { navItems, site } from '@/data/site'
import { services } from '@/data/services'
import AppImage from '@/components/common/AppImage.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const year = new Date().getFullYear()
const phoneHref = computed(() => `tel:${site.contact.phoneRaw}`)

const contacts = computed(() => [
  { icon: 'phone', label: site.contact.phone, href: phoneHref.value },
  { icon: 'mail', label: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: 'wechat', label: `微信：${site.contact.wechat}` },
  { icon: 'location', label: site.contact.address },
  { icon: 'clock', label: site.contact.workTime }
])
</script>

<template>
  <footer class="footer">
    <div class="container footer__main">
      <div class="footer__brand">
        <div class="footer__brand-top">
          <span class="footer__logo-plate">
            <AppImage
              class="footer__logo"
              name="logo_hwm.png"
              alt="弘文猫网络科技有限公司 Logo"
              :width="60"
              :height="60"
            />
          </span>
          <div>
            <p class="footer__name">{{ site.name }}</p>
            <p class="footer__slogan">{{ site.slogan }}</p>
          </div>
        </div>
        <p class="footer__desc">
          专注校园数字化服务，以校园数字平台、智慧校园解决方案、教育内容产品与定制开发能力，
          陪伴院校把每一个高频场景做扎实。
        </p>
      </div>

      <nav class="footer__col" aria-label="页面导航">
        <h3 class="footer__title">网站导航</h3>
        <ul class="footer__list">
          <li v-for="item in navItems" :key="item.path">
            <RouterLink class="footer__link" :to="item.path">{{ item.name }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav class="footer__col" aria-label="业务服务">
        <h3 class="footer__title">业务服务</h3>
        <ul class="footer__list">
          <li v-for="item in services" :key="item.id">
            <RouterLink class="footer__link" :to="{ path: '/services', hash: `#${item.id}` }">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="footer__col">
        <h3 class="footer__title">联系我们</h3>
        <ul class="footer__list footer__list--contact">
          <li v-for="(item, i) in contacts" :key="i" class="footer__contact">
            <BaseIcon :name="item.icon" :size="16" class="footer__contact-icon" />
            <a v-if="item.href" class="footer__link footer__link--contact" :href="item.href">
              {{ item.label }}
            </a>
            <span v-else class="footer__text">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p class="footer__copy">
          © {{ year }} {{ site.name }}
          <span class="footer__sep">|</span>
          <span class="footer__en">{{ site.enName }}</span>
        </p>
        <p class="footer__meta">
          <a
            class="footer__meta-link"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener"
          >{{ site.icp }}</a>
          <span v-if="site.police" class="footer__sep">|</span>
          <span v-if="site.police">{{ site.police }}</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--grad-dark);
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.875rem;
}

.footer__main {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-6);
  padding-top: var(--sp-8);
  padding-bottom: var(--sp-7);
  padding-left: 20px;
  padding-right: 20px;
}

/* ---------- 品牌区 ---------- */
.footer__brand-top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer__logo-plate {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 62px;
  flex: none;
  border-radius: var(--radius);
  background: #fff;
  overflow: hidden;
}

.footer__logo {
  width: 52px;
  height: 52px;
  object-fit: contain;
}

.footer__name {
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
}

.footer__slogan {
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
}

.footer__desc {
  margin-top: 16px;
  max-width: 420px;
  color: rgba(255, 255, 255, 0.62);
  line-height: 1.85;
}

/* ---------- 链接列 ---------- */
.footer__title {
  margin-bottom: 16px;
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.footer__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__link {
  color: rgba(255, 255, 255, 0.66);
  transition: color var(--dur) var(--ease), transform var(--dur) var(--ease);
  display: inline-block;
}

.footer__link:hover {
  color: #fff;
  transform: translateX(3px);
}

.footer__list--contact {
  gap: 12px;
}

.footer__contact {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.footer__contact-icon {
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.42);
}

.footer__link--contact {
  word-break: break-word;
}

.footer__text {
  color: rgba(255, 255, 255, 0.66);
  line-height: 1.7;
}

/* ---------- 版权条 ---------- */
.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__bottom-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 20px;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
}

.footer__sep {
  margin: 0 8px;
  opacity: 0.45;
}

.footer__en {
  letter-spacing: 0.02em;
}

.footer__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.footer__meta-link {
  color: rgba(255, 255, 255, 0.5);
  word-break: break-all;
}

.footer__meta-link:hover {
  color: rgba(255, 255, 255, 0.82);
}

@media (min-width: 700px) {
  .footer__main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1000px) {
  .footer__main {
    grid-template-columns: 1.6fr 1fr 1.2fr 1.4fr;
    gap: var(--sp-7);
  }

  .footer__bottom-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
