# 弘文猫网络科技有限公司 · 官方网站

Vue 3 + Vite 构建的纯静态企业官网，可直接部署到 GitHub Pages。

## 技术栈

| 层次 | 选型 |
| --- | --- |
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 路由 | Vue Router 4（默认 hash 模式，适配 GitHub Pages） |
| 构建 | Vite 5（要求 Node.js ≥ 18） |
| 样式 | 原生 CSS + CSS 变量（无 UI 框架、无外链字体） |
| 图标与插画 | 全部为手写内联 SVG，无第三方素材版权风险 |

## 本地开发

> **首次运行前必做一步**：站点运行时读取 `public/images/logo_hwm.png`，
> 而仓库里只有原始素材 `logo/logo_hwm.png`（`dist` 的自动复制只在 `npm run build` 时生效）。
> 因此请先执行一次：
>
> ```bash
> # Windows PowerShell
> New-Item -ItemType Directory -Force public\images | Out-Null
> Copy-Item logo\logo_hwm.png public\images\logo_hwm.png
>
> # macOS / Linux / Git Bash
> mkdir -p public/images && cp logo/logo_hwm.png public/images/
> ```
>
> 跳过这一步页面也不会报错或破图——Logo 位置会显示“弘”字占位块，但看不到真实 Logo。

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 3. 构建生产产物到 dist/
npm run build

# 4. 本地预览生产产物
npm run preview
```

> 若 `npm install` 报 Node 版本错误，说明本机 Node 低于 18。
> 解决办法：升级 Node，或把 `package.json` 里的 `vite` 降到 `^4.5.0`、
> `@vitejs/plugin-vue` 降到 `^4.6.2`。

## 目录结构

```
├─ index.html                    入口 HTML（含 SEO / OG 标签与首屏加载样式）
├─ vite.config.js                Vite 配置（base、别名、logo 复制插件）
├─ .env.production               部署相关环境变量
├─ logo/logo_hwm.png             原始 Logo 素材（保留不动）
├─ public/                       直接拷贝到 dist 根目录的静态资源
│  ├─ favicon.svg                站点图标（手绘 SVG）
│  ├─ 404.html                   history 路由模式的 404 回退页
│  ├─ robots.txt / sitemap.xml   SEO 文件（域名待替换）
├─ src/
│  ├─ main.js                    应用入口
│  ├─ App.vue                    整体布局（页头 / 内容 / 页脚 / 回到顶部）
│  ├─ router/index.js            路由表与页面标题
│  ├─ assets/styles/             设计变量、重置、通用样式、动效
│  ├─ data/                      所有文案与数据（改内容只需动这里）
│  ├─ directives/reveal.js       滚动入场指令 v-reveal
│  ├─ utils/                     useScroll / useCountUp
│  ├─ components/
│  │  ├─ common/                 BaseIcon、BaseButton、Carousel、Accordion…
│  │  ├─ layout/                 TheHeader、TheFooter、BackToTop
│  │  ├─ home/                   首页各区块
│  │  └─ form/ContactForm.vue     留言表单（纯前端校验）
│  └─ views/                     6 个页面 + 404
└─ .github/workflows/deploy.yml  GitHub Actions 自动部署
```

## 修改内容

**所有文案集中在 `src/data/` 目录**，不需要改组件：

| 文件 | 内容 |
| --- | --- |
| `site.js` | 公司名称、联系方式、备案号、导航、品牌释义、使命愿景、优势、流程、FAQ |
| `services.js` | 四条业务线 |
| `solutions.js` | 六个场景方案 + 三个客户案例 |
| `news.js` | 新闻动态 |
| `milestones.js` | 发展历程时间轴 |
| `team.js` | 团队构成 |
| `reviews.js` | 客户评价 |

**品牌色**集中在 `src/assets/styles/variables.css` 顶部三行：

```css
--brand-blue: #1d4e9e;  /* 主色（Logo 蓝） */
--brand-red: #c8102e;   /* 强调色（Logo 红） */
--ink: #0f2440;         /* 标题深色 */
```

改这三行即可全站换色。

## 替换 Logo

站点读取的是 `public/images/logo_hwm.png`：

- **开发环境**：`vite.config.js` 里的 `copyLogos()` 插件只在 `build` 阶段生效，
  因此首次本地开发前请手动把 `logo/logo_hwm.png` 复制到 `public/images/`：
  ```bash
  mkdir -p public/images && cp logo/logo_hwm.png public/images/
  ```
- **构建产物**：`npm run build` 会自动把 `logo/logo_hwm.png` 复制到 `dist/images/`，无需手动操作。
- 组件内置了多路径回退与文字占位兜底，即使图片缺失也不会出现破图。

替换新 Logo 时，保持文件名 `logo_hwm.png` 即可，无需改代码。

## 部署到 GitHub Pages（推荐：Actions 自动构建）

> ⚠️ **顺序很重要：先启用 Pages，再推送代码。**
> 如果先推代码，第一次 Actions 运行会在 `actions/configure-pages@v5` 这一步失败，
> 报 `Get Pages site failed ... Error: Not Found`。原因见下面的「常见部署错误」。

### 一次性配置

1. 新建 GitHub 仓库（例如 `hongwencat-campus`），**不要**勾选自动生成 README。
   > 注意：免费账号下的**私有仓库无法使用 Pages**，必须是公开仓库（或升级付费计划）。
2. **先启用 Pages**：进入仓库 **Settings → Pages**，
   把 **Build and deployment → Source** 设置为 **GitHub Actions**。
   （这一步只是创建 Pages 站点，选完会出现一个可选的模板选择界面，不用管，直接跳过即可。）
3. 回到本地，在项目根目录执行：

   ```bash
   git init
   git add .
   git commit -m "feat: 弘文猫科技官网首版"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

4. 打开仓库 **Actions** 页面，等 `Deploy to GitHub Pages` 变绿（约 1-2 分钟）。
5. 线上地址：`https://<你的用户名>.github.io/<仓库名>/`

> 如果你**已经先推送过**、Actions 已经失败：不用改代码，
> 补做第 2 步后，到 **Actions** 页面找到那次失败的运行，
> 点右上角 **Re-run all jobs** 重新跑一遍即可（或随便改点东西再 `git push` 一次）。

### 常见部署错误

| 报错 | 含义 | 解决办法 |
| --- | --- | --- |
| `Get Pages site failed. Please verify that the repository has Pages enabled ... Error: Not Found`<br>（出现在 `actions/configure-pages@v5` 这一步） | Pages 站点还没被创建过 | 到 **Settings → Pages → Source** 选 **GitHub Actions**，然后重跑工作流 |
| `Create Pages site failed. Error: Resource not accessible by integration`<br>（出现在你手动加了 `enablement: true` 之后） | **`enablement: true` 对默认的 `GITHUB_TOKEN` 一定无效**。创建 Pages 站点属于仓库管理操作，而 Actions 的默认令牌在设计上永远没有仓库管理权限，`permissions:` 里写什么都没用。该参数只对个人访问令牌（PAT）或 GitHub App 令牌有效 | 别折腾 PAT，直接按上一条到 Settings 里点一下（30 秒） |
| `HttpError: Not Found` 但日志里没有 Pages 相关步骤 | 通常是 Pages 未启用导致后续步骤连带失败 | 同上 |
| 页面一直停在 **「弘文猫科技 · 加载中」**，控制台报 `assets/index-xxx.js 404` | 资源路径指向了域名根目录，而站点在子路径下 | 说明构建用了绝对 base `/`。本项目已改为相对路径 `./`，重新构建部署即可；若你手动设过 `VITE_BASE_PATH=/`，请**清空**它 |

> 小提示：**GitHub 手机 App 里没有 Settings 页面**，只能在浏览器里操作（必要时切换到「桌面版网站」）。

### 后续更新

```bash
git add .
git commit -m "更新内容"
git push
```

推送后 Actions 会自动重新构建并发布，无需手动上传 `dist/`。

### 关于 base 路径与路由模式

- 构建使用**相对路径** `base='./'`，所以下面这些部署方式**都不用改任何配置**：
  - 项目站点 `https://<用户名>.github.io/<仓库名>/`
  - 用户站点 `https://<用户名>.github.io/`
  - 绑定自定义域名
  - 以后给仓库改名
- 路由默认用 **hash 模式**，其 base 会在运行时从当前页面地址自动推导
  （见 `src/router/index.js` 的 `resolveBase()`），所以点击导航不会跳到域名根目录。
- 如果要改成 **history 路由**（URL 不带 `#`），**必须**把 `.env.production` 改为：

  ```
  VITE_BASE_PATH=/<仓库名>/
  VITE_ROUTER_MODE=history
  ```

  这是唯一需要手填 base 的情况，因为 history 路由必须知道站点挂在哪个子路径下。
  `public/404.html` 已写好深链回退逻辑，会自动把 `/<仓库名>/about`
  重定向到 `/<仓库名>/#/about`。

## 留言表单说明

当前表单为**纯静态**：只做前端校验与成功提示，不会真的发送邮件。
页面上已明确引导用户直接打电话或发邮件。

若要真正收到留言，推荐接入免费表单服务（无需后端）：

1. 到 [Formspree](https://formspree.io/) 注册并创建表单，得到形如
   `https://formspree.io/f/xxxxxxxx` 的地址。
2. 在 `src/components/form/ContactForm.vue` 的 `onSubmit()` 中，
   把 `submitted.value = true` 之前加上：

   ```js
   await fetch('https://formspree.io/f/xxxxxxxx', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
     body: JSON.stringify(form)
   })
   ```

3. 同时删掉页面上“本表单为静态演示”的提示文案。

## 上线前检查清单

- [ ] 替换 `src/data/` 中所有标注 `TODO` 的示例内容（详见 `内容待确认清单.md`）
- [ ] 核实首页数据看板与关于页各项数据
- [ ] 删除或替换客户评价模块（`src/data/reviews.js` 与首页 `TestimonialsSection`）
- [ ] 替换客户案例中的机构名称
- [ ] 填写真实的电话、邮箱、微信、地址、邮编
- [ ] 填写 ICP 备案号与公安备案号（未取得时删除 `site.js` 中的 `icp` / `police`）
- [ ] 把 `public/robots.txt`、`public/sitemap.xml`、`index.html` 的 `og:url` 换成正式域名
- [ ] 用真实浏览器在手机与桌面端各过一遍

## 浏览器兼容

支持所有现代浏览器（Chrome / Edge / Firefox / Safari 最新两个版本）。
使用了 `backdrop-filter`、`grid-template-rows` 过渡等较新特性，
在旧版浏览器上会优雅降级（毛玻璃失效、折叠动画变为直接展开）。
