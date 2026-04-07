# Cloudflare R2 Media Migration TODO

## Goal

Move large media assets out of the git repository and serve them from Cloudflare R2, so repository clones stay fast and history remains small.

## Done

- Removed tracked `mp4` / `mov` history from git.
- Reduced local reachable git object size to a small pack-only state.
- Added ignore rules for `*.mp4`, `*.mov`, and `public/project-media/`.

## Next Steps

### 1. Prepare R2 bucket

- Create an R2 bucket for public project media.
- Decide the final public URL pattern.
- Confirm whether media will be exposed through:
  - a custom domain, or
  - an R2 public development URL.

### 2. Upload existing media backup

- Upload the backed-up project videos to R2.
- Keep stable, predictable object keys.
- Recommended path style:

```text
project-media/traffic-police-demo-1.mp4
project-media/visionpro-hand-eye.mp4
project-media/tof-control.mp4
```

### 3. Pick runtime access strategy

- Option A: hardcode the public base URL in page data.
- Option B: use an environment variable such as `PUBLIC_R2_MEDIA_BASE_URL`.
- Option C: centralize media URL generation in a helper.

Recommended:

- Use `PUBLIC_R2_MEDIA_BASE_URL` plus a small helper function to build URLs consistently.

### 4. Refactor site media references

- Replace local `/project-media/...` references with R2 URLs.
- Keep image assets in-repo only if they are small and benefit from local bundling.
- For videos, prefer direct R2 hosting.

### 5. Add a media helper

- Create a helper like `src/utils/media.ts`.
- Build video URLs from the configured R2 base URL.
- Avoid scattering raw R2 domains across page files.

Suggested shape:

```ts
export const mediaUrl = (path: string) =>
  `${import.meta.env.PUBLIC_R2_MEDIA_BASE_URL}/${path.replace(/^\/+/, '')}`
```

### 6. Decide caching strategy

- Set long cache headers for versioned media assets.
- If file contents may change, version by file name instead of overwriting in place.
- Prefer immutable URLs for demo media.

### 7. Deployment checks

- Verify all pages load correctly after replacing media URLs.
- Verify video playback works on both desktop and mobile.
- Confirm no page still references deleted local `project-media` files.

### 8. Push rewritten git history

- Force-push the cleaned history to the remote:

```bash
git push origin main --force
```

- If other clones exist, re-clone or hard reset them after the force-push.

### 9. Team coordination

- Notify anyone using this repo that history was rewritten.
- Ask collaborators not to push old history back to `origin`.

## Recommended Follow-up in This Repo

- Add `PUBLIC_R2_MEDIA_BASE_URL` support.
- Add a shared media URL helper.
- Refactor `works` and any future project pages to use R2-hosted video URLs.
