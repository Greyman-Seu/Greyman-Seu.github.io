# 十步

朱阳坤的个人博客，基于 [Axi Theme](https://github.com/Axi404/Axi-Theme) 构建。

## 快速开始

```bash
pnpm install   # 安装依赖
make dev       # 启动开发服务器 → http://localhost:4321
```

## 常用命令

| 命令 | 说明 |
|---|---|
| `make dev` | 本地开发，实时热更新 |
| `make build` | 构建生产版本 |
| `make preview` | 构建并本地预览 |
| `make build-cf` | 构建 Cloudflare Pages 版本 |
| `make build-gh` | 构建 GitHub Pages 版本 |
| `make clean` | 清理构建产物 |
| `make push` | 提交并推送到 GitHub |

## 配置

个人信息、域名、导航菜单等在 `src/site.config.ts` 中修改。

## 部署

push 到 `main` 分支后，GitHub Actions 自动触发：

- **Cloudflare Pages**：需要在 GitHub Secrets 中配置 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`
- **GitHub Pages**：需要在仓库 Settings → Pages 中启用 GitHub Actions 作为 Source

## 目录结构

```
src/
├── components/
│   ├── ui/        # 通用 UI 组件
│   ├── mdx/       # MDX 文章内使用的组件
│   ├── academic/  # 学术页面组件
│   └── widgets/   # 高级功能组件
├── content/       # 博客文章、合集等内容
├── layouts/       # 页面布局
├── pages/         # 路由页面
└── site.config.ts # 站点配置
```
