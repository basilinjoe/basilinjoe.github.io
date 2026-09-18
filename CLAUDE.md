# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (see `packageManager` in `package.json`). npm works too but pnpm is used in CI.

```bash
pnpm dev           # Next.js dev server on http://localhost:3000
pnpm build         # Standard Next.js build
pnpm run predeploy # Static export build (writes to ./out)
pnpm run deploy    # Publish ./out to gh-pages branch via gh-pages CLI
pnpm run lint      # biome lint . && eslint .  (both must pass)
pnpm run lint:fast # biome only — ~50ms, covers most rules
pnpm run lint:fix  # biome safe autofixes
```

There is no test runner configured in this repo — do not invent one. CI (`.github/workflows/nextjs.yml`) runs `pnpm run predeploy` on pushes to `master` and deploys to GitHub Pages.

Verify changes with `pnpm run lint`, `npx tsc --noEmit`, and `pnpm run predeploy` (end-to-end static export). Lint currently passes clean — keep it that way rather than adding suppressions.

**Two linters, on purpose.** Biome (`biome.json`) is primary: it lints 80 files in ~50ms versus ESLint's ~3.5s. ESLint is kept *only* for the React Compiler `react-hooks/*` rules, which have no equivalent among Biome's 554 rules. This is not redundancy — measured on a 14-defect probe (2026-09-18), Biome missed `set-state-in-effect` and `set-state-in-render`, and the former caught two real bugs in this repo the same day (P1-029, P1-030). Every rule Biome already covers is switched off in `eslint.config.mjs` so the two never double-report. If Biome ships React Compiler rules, delete `eslint.config.mjs` and the `eslint*` devDependencies.

Two Biome caveats specific to this repo:

- **The formatter is disabled** (`"formatter": {"enabled": false}`). Enabling it reformats all 81 files, which would bury real changes in whitespace churn. Turn it on only as a deliberate, standalone commit.
- **`app/globals.css` is excluded.** Biome's CSS parser only understands Tailwind 4 directives; this repo is on Tailwind 3, so `@apply` produces ~53 spurious parse errors. Revisit on a Tailwind 4 upgrade.

Suppressions use `// biome-ignore lint/<group>/<rule>: <reason>` — a reason is mandatory.

## Architecture

**Next.js App Router site statically exported to GitHub Pages.** Everything must be renderable at build time — `next.config.js` sets `output: "export"` and `images.unoptimized: true`. No API routes, no server-only runtime, no `next/image` optimization. Any dynamic route (e.g. `app/blog/[slug]`) must implement `generateStaticParams`.

Key layers:

- **`config/site.ts`** — single source of truth for site metadata, nav, social links, skills, and the full work-experience timeline. Typed as `SiteConfig`. Personal/profile changes go here, not into components.
- **`app/`** — App Router pages (`page.tsx`, `layout.tsx`, `sitemap.ts`, `not-found.tsx`, `opengraph-image.tsx`). `app/layout.tsx` wires ThemeProvider, CommandPalette, SkipNav, GoogleAnalytics, and JSON-LD (`PersonJsonLd`, `WebsiteJsonLd`). Metadata is derived from `siteConfig`.
- **`content/blog/*.mdx`** — blog posts as MDX with gray-matter frontmatter (`title`, `date`, optional `modified`, `excerpt`, `tags`, `coverImage`, `draft`). Filename (without `.mdx`) becomes the slug/`id`. `.md` files still load for backwards compat, but new posts should use `.mdx` so they can embed JSX / import React components. Adding a post = drop a file; `getAllPosts()` in `lib/blog.ts` reads the directory and `app/blog/[slug]/page.tsx`, `app/blog/tag/[tag]/page.tsx`, `app/feed.xml/route.ts`, and `app/sitemap.ts` all pick it up automatically.
- **`lib/blog.ts`** — server-side (filesystem) post loading. Imports `fs`, so it CANNOT be imported at runtime from client components (types are erased and safe). For anything a client component needs (e.g. `tagToSlug`), use **`lib/tags.ts`**. Reading time is derived from word count at 200 wpm. Posts are sorted by `date` descending. Drafts (`draft: true`) are filtered unless `INCLUDE_DRAFTS=true` — errors bubble up and fail the build rather than silently producing empty content.
- **`components/blog/blog-post-content.tsx`** — server component that renders MDX via `next-mdx-remote/rsc`. Configure `remarkPlugins`/`rehypePlugins` here (currently `remark-gfm` + `rehype-highlight`). The `mdxComponents` map overrides HTML tag rendering (e.g. auto-open external links in a new tab); post authors can also import and use React components directly inside their `.mdx` files. Because it uses the RSC MDX renderer, this file must stay a server component — do not add `"use client"`.
- **`components/`** — mix of page-level composites (`home-page.tsx`, `about-page.tsx`, `projects-page-new.tsx`, `contact-page.tsx`, `blog-list.tsx`), section pieces under `components/sections/` and `components/blog/`, and shadcn/ui primitives under `components/ui/`.
- **`lib/utils.ts`** — the `cn()` helper (clsx + tailwind-merge). shadcn convention.

**Styling & UI:** Tailwind CSS + shadcn/ui (config in `components.json`, base color zinc, aliases `@/components` and `@/lib/utils`). Dark mode is class-based via `next-themes`. Framer Motion is used throughout for animation. Icons: `lucide-react`, plus the hand-rolled brand glyphs in `components/icons.tsx`.

**Path alias:** `@/*` → repo root (see `tsconfig.json`). Use `@/components/...`, `@/lib/...`, `@/config/site`.

**SEO / metadata:** Per-page metadata is set via the App Router `metadata` export. JSON-LD is centralized in `components/json-ld.tsx`. `public/llms.txt` and `public/robots.txt` are hand-maintained. The RSS feed (`app/feed.xml/route.ts`) is a static route handler (`dynamic = 'force-static'`) — it works under `output: 'export'` and is discovered via `alternates.types` in `app/layout.tsx`. When adding a blog post, no code changes are needed anywhere — sitemap, RSS, tag pages, and OG images all regenerate from `content/blog` at build. Use `resolveAssetUrl()` from `lib/utils.ts` when building absolute URLs from `coverImage` values (it passes through already-absolute URLs).

**Deployment:** static export is unconditional, so `predeploy` is just `next build`. The old `DEPLOY_TARGET=gh-pages` flag and its `cross-env` wrapper were removed on 2026-09-18 — nothing ever read the value. Do not reintroduce an env flag unless something actually branches on it.

**Blog index state:** `components/blog-list.tsx` treats the query string as the single source of truth. `tag`, `q`, and `page` are read from `useSearchParams()` and everything else (filtered posts, total pages, the current page) is derived during render via `useMemo`. Do not reintroduce `useState` mirrors synced by `useEffect`; that was the previous shape, it tripped `react-hooks/set-state-in-effect`, and it made `/blog?q=term` a dead link (the debounce in `BlogSearch` overwrote the incoming query with `""` before it could take effect). `BlogSearch` must keep taking `initialQuery` and skipping its debounce when the value already equals the URL, or that bug returns.

## Design system

**Read `DESIGN.md` before making any visual or UI change.** It is the source of truth
for colour tokens, the type scale, component patterns, motion, dark-mode strategy, and
the accessibility floor, and it documents the system as actually implemented (verified
against the code, with computed contrast ratios rather than estimates).

Do not deviate without explicit user approval. In QA or review mode, flag code that
does not match it. `DESIGN.md` §14 tracks known open issues; §13 is the pre-ship
checklist.

Two repo-specific traps documented there that are easy to hit:

- **MDX silently drops `style`.** In `content/blog/*.mdx`, JSX `style={{...}}` props and
  `<style>` element children are stripped with no build error. Use plain SVG
  presentation attributes (`fill`, `fontSize`) instead, and draw chart backgrounds as
  an explicit `<rect>`.
- **Don't set `color` on `.markdown pre code`.** It out-specifies highlight.js's `.hljs`
  rule and breaks syntax highlighting. Scope inline-code styling with
  `.markdown :not(pre) > code`.
- **Tailwind scans comments, not just JSX.** A code comment containing a bare utility
  name (`static`, `container`, `grid`, …) makes the JIT emit that rule into the
  stylesheet. Cost P2-036 an unused `.static{position:static}`. If a comment needs such
  a word, phrase it so the token is not standalone.

Token authority lives in `app/globals.css` (colours, component classes, prose styles)
and `tailwind.config.ts` (type scale, shadows, keyframes). `lib/design-system/` was
deleted on 2026-09-15 — nothing imported it and its values contradicted the live
system. Do not recreate it.

## Issue log — record every issue you find

**`ISSUES.md` is the single record of known defects in this repo. Whenever you identify
an issue, write it there — in the same turn you find it, before moving on.**

This applies to anything you notice, not just what you were asked to look at: a bug, a
broken or dead reference, an accessibility failure, a `DESIGN.md` rule the code
contradicts, documentation that no longer matches the code, drift from the design
system, or dead code. It applies whether or not you fix it in the same session, and
whether or not the user asked for a review. Mentioning a problem only in chat does not
count — chat is lost, the file is not.

Follow the conventions in the file's own "How to use this file" section:

- One entry per distinct defect, with a new sequential ID (`[P0-001]`, `[P1-007]`, …).
  IDs are never reused, entries are never deleted.
- Record the `file:line`, the rule or success criterion it violates, and the concrete
  fix.
- If a claim is measurable — contrast ratio, pixel size, character count — measure it
  and record the number. Do not estimate, and do not trust an existing code comment or
  a number already written in `DESIGN.md`; several have turned out to be wrong.
- When you fix an issue, move its entry to **Resolved** with the date and commit rather
  than deleting it.
- If something you suspected turns out to be fine, move it to **Known non-issues** with
  the reason, so nobody rediscovers it later.

Before starting a review or a visual change, read `ISSUES.md` first: the problem may
already be logged, and the Known non-issues list will stop you "fixing" something
deliberate.

`DESIGN.md` §14 tracks design-system items specifically; `ISSUES.md` is the broader log
and is authoritative where the two overlap.

## Tailwind config

Only `tailwind.config.ts` exists; the duplicate `.js` file was removed and
`components.json` points at the `.ts`. Theme tokens live there and in
`app/globals.css` — change both together when adding a colour.

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
