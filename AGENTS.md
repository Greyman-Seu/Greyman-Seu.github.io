# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro-based personal site. Core application code lives in `src/`. Use `src/pages/` for route files, `src/layouts/` for shared page shells, `src/components/` for UI and content widgets, and `src/content/` for blog and collection entries. Global styles and images live under `src/assets/`; static passthrough files belong in `public/`. Site-wide settings, domains, and navigation are centralized in `src/site.config.ts`. Path aliases such as `@/components/*` and `@/utils/*` are defined in `tsconfig.json`.

## Build, Test, and Development Commands
Install dependencies with `pnpm install`.

- `make dev` or `pnpm dev`: start the local Astro dev server on `localhost:4321`.
- `make build` or `pnpm run build`: run type/content checks and produce a production build.
- `make preview` or `pnpm preview`: preview the built site locally.
- `make build-gh`: build with `DEPLOYMENT_PLATFORM=github` for GitHub Pages.
- `make build-cf`: build with `DEPLOYMENT_PLATFORM=cloudflare` for Cloudflare Pages.
- `pnpm run lint:check`: run ESLint without fixes.
- `pnpm check`: run Astro type and content checks.
- `pnpm format`: apply Prettier formatting.

## Coding Style & Naming Conventions
Use 2-space indentation, single quotes, no semicolons, and 100-character line width; these are enforced by `prettier.config.mjs`. Run `pnpm format` before opening a PR. ESLint is configured in `eslint.config.mjs` for `.ts` and `.astro` files.

Name Astro components in `PascalCase` (`BaseLayout.astro`), utility modules in concise lowercase names (`date.ts`), and content folders with route-friendly slugs. For blog posts, follow the existing collection pattern: `src/content/blogs/<slug>/index.mdx` and `index-en.mdx` for English variants.

## Testing Guidelines
There is no separate unit-test suite in this repository today. Treat `pnpm run lint:check`, `pnpm check`, and `pnpm run build` as the minimum validation set for every change. For UI or content updates, verify the affected pages in `pnpm dev` and, when deployment behavior changes, confirm with the relevant platform build target.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit style, for example `feat(arxiv): ...`, `chore(ref): ...`, and `docs: ...`. Keep commits focused and use imperative subjects with an optional scope.

PRs should include a short summary, linked issue or context when applicable, and screenshots for visible UI changes. Note any config or environment changes such as `PUBLIC_R2_MEDIA_BASE_URL` or deployment-domain updates, and list the validation commands you ran.
