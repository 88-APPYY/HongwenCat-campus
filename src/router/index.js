import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { site } from '@/data/site'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Services from '@/views/Services.vue'
import Solutions from '@/views/Solutions.vue'
import News from '@/views/News.vue'
import Contact from '@/views/Contact.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: '首页' } },
  { path: '/about', name: 'about', component: About, meta: { title: '关于我们' } },
  { path: '/services', name: 'services', component: Services, meta: { title: '业务服务' } },
  { path: '/solutions', name: 'solutions', component: Solutions, meta: { title: '解决方案' } },
  { path: '/news', name: 'news', component: News, meta: { title: '新闻动态' } },
  { path: '/contact', name: 'contact', component: Contact, meta: { title: '联系我们' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { title: '页面不存在' } }
]

// 默认 hash 模式：GitHub Pages 上无论仓库名如何、也无须 404 回退即可正常刷新
const mode = import.meta.env.VITE_ROUTER_MODE || 'hash'
const history =
  mode === 'history'
    ? createWebHistory(import.meta.env.BASE_URL)
    : createWebHashHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const page = to.meta?.title
  document.title = page ? `${page} - ${site.name}` : site.name
})

export default router
