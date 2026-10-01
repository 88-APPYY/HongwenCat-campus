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

/**
 * 推导站点实际所在的路径前缀。
 *
 * 为什么不能直接用 Vite 的 BASE_URL：
 *   本项目的构建 base 是相对路径 './'（这样部署到根目录或子目录都不会 404），
 *   而 './' 不是路由能用的 base；如果退化成 '/'，在
 *   https://<用户名>.github.io/<仓库名>/ 这种子路径站点上，
 *   <router-link> 会生成 href="/#/about"，点击后跳到域名根目录而不是本站。
 *
 * 所以这里从 document.baseURI 反推真实前缀：
 *   根站点   .../            → '/'
 *   子路径   .../repo/       → '/repo/'
 *   子路径   .../repo/#/about → '/repo/'（hash 不参与 base）
 *   本地 file:// 或异常情况 → '/'（相对写法，任何位置都成立）
 */
function resolveBase() {
  const configured = import.meta.env.VITE_BASE_PATH
  if (configured && configured !== './') return configured

  try {
    if (typeof document === 'undefined' || location.protocol === 'file:') return '/'
    const dir = document.baseURI.replace(/[?#].*$/, '').replace(/\/[^/]*$/, '/')
    return dir && dir.startsWith('http') ? dir : '/'
  } catch {
    return '/'
  }
}

const mode = import.meta.env.VITE_ROUTER_MODE || 'hash'
const baseUrl = resolveBase()

// 默认 hash 模式：GitHub Pages 上无论仓库名如何、也无须 404 回退即可正常刷新
const history =
  mode === 'history' ? createWebHistory(baseUrl) : createWebHashHistory(baseUrl)

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
