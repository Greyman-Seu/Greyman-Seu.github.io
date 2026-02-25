.PHONY: dev build preview build-cf build-gh clean push

# 本地开发
dev:
	pnpm dev

# 构建（默认 Vercel）
build:
	pnpm run build

# 预览构建产物
preview:
	pnpm run build && pnpm preview

# 构建 Cloudflare Pages 版本
build-cf:
	DEPLOYMENT_PLATFORM=cloudflare pnpm run build

# 构建 GitHub Pages 版本
build-gh:
	DEPLOYMENT_PLATFORM=github pnpm run build

# 清理构建产物
clean:
	pnpm run clean

# 提交并推送
push:
	git add -A && git commit -m "update" && git push
