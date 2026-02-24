# AI 开发系统提示

本文件适用于 Claude Code、Cursor 等 AI 编程助手，作为开发本仓库的系统级约定。

## 项目简介

这是一个基于 **Astro 5** 构建的博客主题（astro-theme-axi），使用 Tailwind CSS、TypeScript、MDX 内容集合，支持 Vercel / Cloudflare 双平台部署。

架构详见：[ai_dev/overview.md](ai_dev/overview.md)

## 已激活的 Skills

开发本仓库时，以下三个 skill 处于激活状态，遵守其规范：

| Skill | 来源 | 用途 |
|-------|------|------|
| `astro` | `astrolicious/agent-skills@astro` | Astro 框架开发规范（Islands 架构、内容集合、SSR、路由等） |
| `git-commit` | `github/awesome-copilot@git-commit` | 每次代码修改后按 Conventional Commits 规范提交 |
| `find-skills` | `find-skills` | 需要新能力时搜索并安装 skill |

## Commit 规范（强制）

**每次代码修改完成后必须立即提交**，使用 Conventional Commits 格式：

```
<type>[optional scope]: <description>
```

常用类型：

| Type | 场景 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `style` | 样式调整（不影响逻辑） |
| `refactor` | 代码重构 |
| `docs` | 文档修改 |
| `chore` | 构建/依赖/配置变更 |
| `perf` | 性能优化 |

示例：
```
feat(blog): add reading time display to post header
fix(nav): correct mobile menu z-index overlap
style(home): adjust hero section spacing on tablet
```

规则：
- 一次提交只包含一个逻辑变更
- 描述使用现在时祈使句，不超过 72 字符
- 不得使用 `--no-verify` 跳过钩子
- 不得强制推送 main 分支

## 代码风格规范

### TypeScript / JavaScript

- 使用单引号 `'`，不加分号
- 缩进 2 个空格，行宽上限 100 字符
- 尾部不加逗号（`trailingComma: 'none'`）
- 换行符统一使用 LF

### 导入顺序（由 Prettier 自动排序）

```
astro 核心模块
↓
@astrojs/* 官方集成
↓
第三方库
↓
@/types/*
@/layouts/*
@/components/*
@/utils/*
@/plugins/*
@/assets/*
@/site-config
↓
相对路径导入
```

### Astro 组件

- 只在确实需要交互时才使用 `client:` 指令
- 优先级：无指令 → `client:visible` → `client:idle` → `client:load` → `client:only`
- 图片必须通过 `import` 语句引入，使用 `<Image />` 或 `<Picture />` 组件
- 内容集合 schema 必须用 Zod 定义，不得跳过类型校验
- 路径别名使用 `@/` 前缀（见 `tsconfig.json`）

### 文件结构

```
src/
├── assets/        # 静态资源（图片等）
├── components/    # Astro/UI 组件
├── content/       # MDX 内容文件
├── layouts/       # 页面布局
├── libs/          # 第三方库封装
├── pages/         # 路由页面
├── plugins/       # Remark/Rehype 插件
├── schemas/       # Zod schema 定义
├── types/         # TypeScript 类型
└── utils/         # 工具函数
```

## 质量检查

修改完成并提交前，可运行以下命令验证：

```bash
pnpm run quality       # lint + sync + type-check + format（一键全检）
pnpm run lint:check    # 仅 ESLint 检查
pnpm run type:check    # 仅 TypeScript 类型检查
pnpm run format        # 仅 Prettier 格式化
```

## 注意事项

- 不要修改 `pnpm-lock.yaml` 以外的锁文件
- 不要将 `.env`、密钥等敏感文件纳入提交
- 预渲染页面中不得访问 `Astro.request`
- 组件 frontmatter（服务端代码）中不得使用浏览器 API
