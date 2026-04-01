# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
make dev              # Start dev server (localhost:4321)
make build            # Build for production (Vercel)
make build-cf         # Build for Cloudflare Pages
make build-gh         # Build for GitHub Pages
make preview          # Build and preview locally
make clean            # Clean build artifacts

pnpm run check        # Type check
pnpm run lint         # Lint and fix
pnpm run format       # Format code
```

## Architecture Overview

This is an Astro 5 personal blog based on [Axi Theme](https://github.com/Axi404/Axi-Theme) with multi-platform deployment support.

### Key Configuration

- `src/site.config.ts` - Main configuration file containing theme, personal info, domains, integrations (Waline, mediumZoom, pagefind), and navigation
- `src/content.config.ts` - Content collection schema definitions for blogs and collections
- `astro.config.mjs` - Astro configuration with platform adapters (Vercel/Cloudflare) and markdown processing
- Deployment platform is set via `DEPLOYMENT_PLATFORM` env var: `vercel` (default), `cloudflare`, or `github`

### Content Structure

```
src/content/
├── blogs/              # Blog posts
│   └── <slug>/        # Each post has index.md or index.mdx
├── collection/         # Curated post collections
```

Blogs use glob loader matching `**/index.{md,mdx}` (Chinese) or `**/index-en.{md,mdx}` (English). Each post has frontmatter with title, description, publishDate, heroImage, tags, etc.

### Custom Integration

`src/axi-integration.ts` is a custom Astro integration that automatically:
- Adds MDX, Tailwind, and sitemap integrations
- Injects remark plugins (reading time, mediumZoom) and rehype plugins (external links)
- Runs pagefind search indexing at build end if enabled in config
- Provides virtual module `@/site-config` for user config access

### Components Organization

```
src/components/
├── ui/           # Reusable UI components (buttons, cards, etc.)
├── mdx/          # Components for use in MDX articles (Aside, Tabs, Spoiler)
├── academic/     # Academic presentation components (PublicationCard, ResearchProjectSection)
└── widgets/      # Advanced components (GithubCard, LinkPreview, QRCode, ImageGroup)
```

Academic components are used in `src/pages/works/index.astro` to display publications, research projects, and open-source work.

### Pages & Layouts

```
src/
├── pages/         # Route pages (works, resume, blog, tags, etc.)
├── layouts/       # Page layouts (BaseLayout, BlogPost, ContentLayout)
└── plugins/       # Custom Astro plugins and transformers
```

### MDX Components

MDX files can import components:
```astro
import { Aside, Tabs, Spoiler } from '@/components/mdx'
import { GithubCard, LinkPreview } from '@/components/widgets'
```

### Deployment

- **Vercel**: Default, server output
- **Cloudflare Pages**: Set `DEPLOYMENT_PLATFORM=cloudflare`, static output
- **GitHub Pages**: Set `DEPLOYMENT_PLATFORM=github`, static output with base path

GitHub Actions auto-deploys to both Cloudflare and GitHub Pages from main branch (requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets).
