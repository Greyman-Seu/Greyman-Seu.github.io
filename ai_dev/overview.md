# 仓库架构总览

## 项目简介

**Astro-Axi Theme** 是一个基于 Astro 5 构建的个人博客主题，支持中英双语、多平台部署和学术展示。作者：[Axi404](https://axi404.top/)，文档站：[theme.axi404.top](https://theme.axi404.top/)。

核心技术栈：**Astro 5 + TypeScript + Tailwind CSS + MDX**

---

## 技术架构

### 渲染策略

| 部署目标 | 输出模式 | 适配器 | 环境变量 |
|---------|---------|--------|---------|
| Vercel（默认） | `server`（SSR） | `@astrojs/vercel` | `DEPLOYMENT_PLATFORM=vercel` |
| Cloudflare Pages | `static` | `@astrojs/cloudflare` | `DEPLOYMENT_PLATFORM=cloudflare` |
| GitHub Pages | `static` | 无 | `DEPLOYMENT_PLATFORM=github` |

通过 `astro.config.mjs` 中的 `DEPLOYMENT_PLATFORM` 环境变量切换，同一套代码支持三种部署目标。

### 国际化（i18n）

- 默认语言：**中文**（无路由前缀）
- 英文内容：`/en/` 路由前缀
- 博客内容通过文件命名区分：`index.mdx`（中文）/ `index-en.mdx`（英文）
- 对应两个独立的内容集合：`blog` 和 `blogEn`

### 自定义 Astro Integration

`src/axi-integration.ts` 是主题的核心集成入口，在 `astro:config:setup` 钩子中自动注入：
- `@astrojs/sitemap`、`@astrojs/mdx`、`@astrojs/tailwind`
- Remark 插件：`remarkReadingTime`（阅读时长）、`remarkAddZoomable`（图片缩放）
- Rehype 插件：`rehypeExternalLinks`（外链箭头）
- Vite 虚拟模块：通过 `virtual-user-config.ts` 将用户配置注入运行时

---

## 目录结构

```
TenStep-Blog/
├── src/
│   ├── axi-integration.ts      # 主题核心 Astro Integration
│   ├── site.config.ts          # 用户配置入口（主题 + 集成）
│   ├── content.config.ts       # 内容集合 Schema 定义
│   ├── server.ts               # 服务端工具入口
│   │
│   ├── assets/                 # 静态资源（图片、样式、工具图标）
│   │   └── styles/             # 全局 CSS（app.css、fc.css）
│   │
│   ├── components/
│   │   ├── about/              # About 页面组件（算法动画、工具展示）
│   │   ├── advanced/           # 高级 MDX 组件（评论、GitHub 卡片、ArXiv 评分等）
│   │   ├── basic/              # 基础布局组件（Header、Footer、ThemeProvider）
│   │   ├── home/               # 首页专用组件（博客统计、GitHub 贡献图、项目卡片）
│   │   ├── links/              # 友链列表组件
│   │   ├── pages/              # 通用页面组件（TOC、分页、搜索、文章预览）
│   │   ├── projects/           # 项目展示组件
│   │   └── user/               # 可复用 UI 组件（卡片、按钮、标签、时间线、Tab 等）
│   │
│   ├── content/
│   │   ├── blogs/              # 博客文章（每篇一个目录，含 index.mdx + index-en.mdx）
│   │   └── collection/         # 文章合集定义（.md 文件，包含 bloglist 数组）
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro    # 最基础 HTML 骨架（head、body）
│   │   ├── BlogPost.astro      # 博客文章页布局（TOC、评论、底部）
│   │   ├── CommonPage.astro    # 通用内容页布局
│   │   ├── ContentLayout.astro # 内容布局（带侧边栏）
│   │   └── IndividualPage.astro # 独立页面布局
│   │
│   ├── pages/                  # 路由页面（文件即路由）
│   │   ├── index.astro         # 首页（中文）
│   │   ├── en/                 # 英文镜像路由（结构与根目录一致）
│   │   ├── blog/
│   │   │   ├── [category]/[...page].astro  # 分类列表 + 分页
│   │   │   └── [...id].astro               # 文章详情页
│   │   ├── collection/         # 合集页
│   │   ├── tags/               # 标签页
│   │   ├── archives/           # 归档页
│   │   ├── about/              # 关于页
│   │   ├── academic/           # 学术页
│   │   ├── projects/           # 项目页
│   │   ├── links/              # 友链页
│   │   ├── search/             # 搜索页（Pagefind）
│   │   ├── terms/              # 法律条款页
│   │   ├── rss.xml.ts          # RSS Feed 端点
│   │   └── robots.txt.ts       # robots.txt 端点
│   │
│   ├── plugins/                # 自定义 Remark/Rehype/Vite 插件
│   │   ├── remark-plugins.ts   # 阅读时长、图片缩放标记
│   │   ├── shiki-transformers.ts       # 代码块：复制按钮、标题、语言标签、差异高亮
│   │   ├── shiki-official-transformers.ts
│   │   ├── rehype-auto-link-headings.ts # 标题自动锚点
│   │   ├── rehype-steps.ts     # Steps 自定义组件渲染
│   │   ├── rehype-tabs.ts      # Tabs 自定义组件渲染
│   │   ├── toc.ts              # 目录提取
│   │   ├── link-preview.ts     # 链接预览
│   │   ├── friendCircle.ts     # 友链朋友圈
│   │   ├── output-copier.ts    # 构建后文件复制（sitemap/pagefind 适配多平台）
│   │   ├── override-svg-attributes.ts
│   │   └── virtual-user-config.ts   # 将 site.config.ts 注入 Vite 虚拟模块
│   │
│   ├── schemas/                # Zod 配置 Schema（favicon、header、logo、social 等）
│   ├── types/                  # TypeScript 类型定义
│   │   ├── theme-config.ts     # 主题配置类型（ThemeConfigSchema）
│   │   ├── user-config.ts      # 用户配置类型（UserConfigSchema）
│   │   ├── integrations-config.ts
│   │   └── components.ts       # 组件 Props 类型
│   │
│   ├── utils/
│   │   ├── index.ts            # 工具函数统一出口
│   │   ├── date.ts             # 日期格式化
│   │   ├── reading-time.ts     # 阅读时长计算
│   │   ├── theme.ts            # 主题切换逻辑
│   │   ├── clsx.ts             # 类名合并
│   │   ├── tailwind.ts         # Tailwind 工具
│   │   ├── toast.ts            # Toast 通知
│   │   ├── server.ts           # 服务端工具
│   │   └── webgl/              # WebGL 背景动画（检测、渲染、UI）
│   │
│   └── scripts/
│       ├── new.mjs             # 新建文章脚手架脚本
│       └── check.mjs           # 配置检查脚本
│
├── public/                     # 直接输出的静态文件（favicon、图片等）
├── preset/                     # 主题预设配置
├── astro.config.mjs            # Astro 主配置
├── site.config.ts              # 用户自定义配置（博客标题、作者、菜单等）
├── tailwind.config.mjs         # Tailwind 配置（含 prose-axi 自定义排版）
├── prettier.config.mjs         # Prettier 代码格式化配置
├── eslint.config.mjs           # ESLint 规则配置
└── tsconfig.json               # TypeScript 配置（含 @/ 路径别名）
```

---

## 内容集合

定义于 `src/content.config.ts`，共三个集合：

| 集合名 | 路径 | 文件匹配 | 用途 |
|--------|------|---------|------|
| `blog` | `src/content/blogs/` | `**/index.{md,mdx}` | 中文博客文章 |
| `blogEn` | `src/content/blogs/` | `**/index-en.{md,mdx}` | 英文博客文章 |
| `postCollections` | `src/content/collection/` | `**/*.{md,mdx}` | 文章合集（含 bloglist 字段） |

**博客文章 Frontmatter 必填字段：**
```yaml
title: string         # 最长 60 字符
description: string   # 最长 160 字符
publishDate: date
```

**可选字段：** `updatedDate`、`heroImage`、`tags`、`category`、`language`、`draft`、`comment`、`pixivLink`

---

## 配置系统

用户通过 `src/site.config.ts` 配置全站，分为两个对象：

### `theme`（ThemeUserConfig）
基础站点信息：标题、作者、描述、语言、Logo、头部菜单、页脚、内容选项、个人信息（域名、GitHub、邮箱、Google Scholar）。

### `integ`（IntegrationUserConfig）
功能集成开关：
- **友链**：`links.logbook`（友链列表）
- **搜索**：`pagefind: true/false`
- **随机引言**：`quote`（配置 API 地址）
- **排版**：`typography.class`（Tailwind prose 类名）
- **图片缩放**：`mediumZoom`（基于 medium-zoom 库）
- **评论系统**：`waline`（Waline 评论，需配置服务端地址）

---

## 主要功能特性

| 功能 | 实现方式 |
|------|---------|
| 全文搜索 | Pagefind（构建后索引，`src/pages/search/`） |
| 数学公式 | KaTeX（`remark-math` + `rehype-katex`） |
| 代码高亮 | Shiki（`github-light/dark` 主题，含复制、标题、差异高亮） |
| 目录（TOC） | 自定义 `toc.ts` 插件 + `TOC.astro` 组件 |
| 评论系统 | Waline（`Comment.astro`，默认关闭） |
| 图片缩放 | medium-zoom（`MediumZoom.astro`） |
| RSS | `src/pages/rss.xml.ts` |
| 友链朋友圈 | `src/plugins/friendCircle.ts` |
| 链接预览 | `src/plugins/link-preview.ts` + `LinkPreview.astro` |
| WebGL 背景 | `src/utils/webgl/`（含降级检测） |
| 暗色模式 | `ThemeProvider.astro` + `utils/theme.ts` |
| 阅读时长 | `remark-plugins.ts` 中的 `remarkReadingTime` |
| 分享按钮 | 支持微博、X（Twitter）、Bluesky |

---

## 关键配置文件速查

| 文件 | 作用 |
|------|------|
| `src/site.config.ts` | **主要修改入口**：站点信息、菜单、功能开关 |
| `astro.config.mjs` | 构建配置：适配器、i18n、Markdown 插件、Shiki |
| `src/content.config.ts` | 内容集合 Schema 定义 |
| `tailwind.config.mjs` | 样式主题扩展 |
| `src/axi-integration.ts` | 主题集成逻辑（一般不需修改） |
