# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (see `packageManager` in `package.json`). npm works too but pnpm is used in CI.

```bash
pnpm dev           # Next.js dev server on http://localhost:3000
pnpm build         # Standard Next.js build
pnpm run predeploy # Static export build (writes to ./out) — sets DEPLOY_TARGET=gh-pages
pnpm run deploy    # Publish ./out to gh-pages branch via gh-pages CLI
pnpm run lint      # next lint (ESLint 9, extends eslint-config-next)
```

There is no test runner configured in this repo — do not invent one. CI (`.github/workflows/nextjs.yml`) runs `pnpm run predeploy` on pushes to `master` and deploys to GitHub Pages.

**`pnpm run lint` is currently broken** — Next.js 16 removed `next lint`, and ESLint 9 requires flat config (`eslint.config.js`) but the repo still ships `.eslintrc.json`. Use `npx tsc --noEmit` for type checks and `pnpm run predeploy` for end-to-end verification until this is migrated.

## Architecture

**Next.js App Router site statically exported to GitHub Pages.** Everything must be renderable at build time — `next.config.js` sets `output: "export"` and `images.unoptimized: true`. No API routes, no server-only runtime, no `next/image` optimization. Any dynamic route (e.g. `app/blog/[slug]`) must implement `generateStaticParams`.

Key layers:

- **`config/site.ts`** — single source of truth for site metadata, nav, social links, skills, and the full work-experience timeline. Typed as `SiteConfig`. Personal/profile changes go here, not into components.
- **`app/`** — App Router pages (`page.tsx`, `layout.tsx`, `sitemap.ts`, `not-found.tsx`, `opengraph-image.tsx`). `app/layout.tsx` wires ThemeProvider, CommandPalette, SkipNav, GoogleAnalytics, and JSON-LD (`PersonJsonLd`, `WebsiteJsonLd`). Metadata is derived from `siteConfig`.
- **`content/blog/*.mdx`** — blog posts as MDX with gray-matter frontmatter (`title`, `date`, optional `modified`, `excerpt`, `tags`, `coverImage`, `draft`). Filename (without `.mdx`) becomes the slug/`id`. `.md` files still load for backwards compat, but new posts should use `.mdx` so they can embed JSX / import React components. Adding a post = drop a file; `getAllPosts()` in `lib/blog.ts` reads the directory and `app/blog/[slug]/page.tsx`, `app/blog/tag/[tag]/page.tsx`, `app/feed.xml/route.ts`, and `app/sitemap.ts` all pick it up automatically.
- **`lib/blog.ts`** — server-side (filesystem) post loading. Imports `fs`, so it CANNOT be imported at runtime from client components (types are erased and safe). For anything a client component needs (e.g. `tagToSlug`), use **`lib/tags.ts`**. Reading time is derived from word count at 200 wpm. Posts are sorted by `date` descending. Drafts (`draft: true`) are filtered unless `INCLUDE_DRAFTS=true` — errors bubble up and fail the build rather than silently producing empty content.
- **`components/blog/blog-post-content.tsx`** — server component that renders MDX via `next-mdx-remote/rsc`. Configure `remarkPlugins`/`rehypePlugins` here (currently `remark-gfm` + `rehype-highlight`). The `mdxComponents` map overrides HTML tag rendering (e.g. auto-open external links in a new tab); post authors can also import and use React components directly inside their `.mdx` files. Because it uses the RSC MDX renderer, this file must stay a server component — do not add `"use client"`.
- **`components/`** — mix of page-level composites (`home-page.tsx`, `about-page.tsx`, `projects-page.tsx`, `contact-page.tsx`, `blog-list.tsx`), section pieces under `components/sections/` and `components/blog/`, and shadcn/ui primitives under `components/ui/`.
- **`lib/design-system/`** — shared tokens (colors, typography, animations, hover, badges). Prefer importing from here over redefining Tailwind classes ad-hoc.
- **`lib/utils.ts`** — the `cn()` helper (clsx + tailwind-merge). shadcn convention.

**Styling & UI:** Tailwind CSS + shadcn/ui (config in `components.json`, base color zinc, aliases `@/components` and `@/lib/utils`). Dark mode is class-based via `next-themes`. Framer Motion is used throughout for animation. Icons: `lucide-react` and `@radix-ui/react-icons`.

**Path alias:** `@/*` → repo root (see `tsconfig.json`). Use `@/components/...`, `@/lib/...`, `@/config/site`.

**SEO / metadata:** Per-page metadata is set via the App Router `metadata` export. JSON-LD is centralized in `components/json-ld.tsx`. `public/llms.txt` and `public/robots.txt` are hand-maintained. The RSS feed (`app/feed.xml/route.ts`) is a static route handler (`dynamic = 'force-static'`) — it works under `output: 'export'` and is discovered via `alternates.types` in `app/layout.tsx`. When adding a blog post, no code changes are needed anywhere — sitemap, RSS, tag pages, and OG images all regenerate from `content/blog` at build. Use `resolveAssetUrl()` from `lib/utils.ts` when building absolute URLs from `coverImage` values (it passes through already-absolute URLs).

**Deployment target flag:** `DEPLOY_TARGET=gh-pages` is set by the `predeploy` script and by the GitHub Actions workflow. The variable is currently read only informationally (`ghPages` in `next.config.js` is unused at present) — the actual static-export behavior is unconditional. Keep this in mind before wiring anything conditional to it.

## Tailwind config duplication

Both `tailwind.config.js` and `tailwind.config.ts` exist. `components.json` points shadcn at the `.js` file; Next/Tailwind will pick up whichever it finds. If you change theme tokens, update both or consolidate — silently editing only one can cause drift.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
