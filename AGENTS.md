# AGENTS.md

Personal learning notes site built with **VitePress 2.0.0-alpha.17**, written in Chinese (zh-CN).

## Quick commands

```bash
bun install          # install deps (use bun, not npm/yarn/pnpm)
bun run dev          # local dev server
bun run build        # build to .vitepress/dist
bun run prettier     # format all files
```

## Adding content

1. Create a `.md` file in the appropriate directory (`language/`, `program/`, `backend/`, `frontend/`, `database/`, `version_control/`, `server/`, `software/`, `peripheral/`, `design/`, `pastimes/`).
2. Add the entry to `.vitepress/sidebar.ts` — sidebar is manually maintained, not auto-generated.
3. Run `bun run prettier` to format.

## Key config files

| File                           | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| `.vitepress/config.mts`        | Site config, nav, search, markdown options           |
| `.vitepress/sidebar.ts`        | Manual sidebar navigation structure                  |
| `.vitepress/theme/`            | Custom theme (extends DefaultTheme)                  |
| `.github/workflows/deploy.yml` | GitHub Pages deployment (triggers on push to `main`) |
| `vercel.json`                  | Vercel config (`cleanUrls` only)                     |
| `crawler.json`                 | Algolia DocSearch crawler config                     |

## Deployment

- **CI**: GitHub Actions deploys to GitHub Pages on push to `main`.
- **BASE_URL**: Set to `/note/` in CI (env var `BASE_URL`); defaults to `/` locally.
- Build output: `.vitepress/dist` (gitignored).

## Gotchas

- VitePress is pinned to an **alpha** version (`2.0.0-alpha.17`). Behavior may differ from stable releases.
- `program/regular-expression.md` is excluded from Prettier formatting (in `.prettierignore`).
- The theme uses `medium-zoom` for image zoom, `BProgress` for page-load progress bar, and `vitepress-theme-round`.
- No test suite or linter exists — formatting via Prettier only.
