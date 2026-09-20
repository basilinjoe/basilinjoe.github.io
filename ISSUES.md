# Issue log

Running record of defects, drift, and inconsistencies found in this repo.

**Entries are never deleted, only moved to Resolved with a date.** This file exists so
that a problem spotted during unrelated work does not evaporate when the session ends.

## How to use this file

- **Every issue Claude (or anyone) identifies gets an entry here**, whether or not it is
  fixed in the same session. Finding something and only mentioning it in chat does not
  count.
- One entry per distinct defect. Do not merge unrelated problems into a bullet.
- Give each entry a stable ID: `[P<severity>-<nnn>]`, next number in sequence, never
  reused.
- Include: what is wrong, the `file:line` where it lives, why it violates something
  (cite a `DESIGN.md` section, a WCAG success criterion, or `CLAUDE.md`), and the
  concrete fix.
- If a claim is measurable (contrast, pixel size, character count), record the
  **measured number**, not an estimate.
- When fixed: move the entry to **Resolved**, keep its ID, add the date and the commit.
  Do not delete it.
- If an issue turns out to be a non-issue, move it to **Known non-issues** with the
  reason, so it is not "discovered" again later.

## Severity

| Level | Meaning |
|---|---|
| **P0** | User-visible failure, or a breach of the accessibility floor in `DESIGN.md` §9. Fix before shipping anything else. |
| **P1** | System drift, a documented rule the code contradicts, or a latent failure. Fix soon. |
| **P2** | Hygiene, dead code, documentation that no longer matches the code. |

## Priority order

Severity says how bad something is; this says what to do next.

_Empty — nothing is open._

When issues are logged again, rank them here. The ordering that worked: correctness
first, then documentation accuracy (a wrong `DESIGN.md` makes every later review start
from bad data), then visible drift, then hygiene. Mark anything that is a design
decision rather than a defect, and do not resolve those unilaterally.

---

## Open

### [P0-037] The contact form silently fails for every visitor

`config/site.ts:49` still holds the scaffold placeholder `formspreeId: "YOUR_FORM_ID"`.
`components/contact-page.tsx:72` POSTs to `https://formspree.io/f/YOUR_FORM_ID`, so every
submission fails. Verified against the live API on 2026-09-18:

```
POST https://formspree.io/f/YOUR_FORM_ID
{"error":"Form not found","errors":[{"code":"FORM_NOT_FOUND","message":"Form not found"}]}
```

The form validates input, shows a spinner, then surfaces "Failed to send — Form not
found" via toast. A visitor's only working route is the `mailto:` link further down the
page. This is user-visible failure on a primary conversion surface, hence P0.

**Fix:** create a Formspree form and replace the placeholder with its real ID, or drop
the form and keep the `mailto:` route. Cannot be fixed without the owner's account —
needs a decision, so it is left open rather than guessed at.

(GA was checked at the same time and is fine: `G-631LG05FS6` is a live property;
`googletagmanager.com/gtag/js?id=G-631LG05FS6` returns a real 523 KB config payload.)

### [P2-050] `robots.txt` allows two retired Anthropic crawler names but not the current one

`public/robots.txt:28` and `:31` grant `Allow: /` to `Claude-Web` and `anthropic-ai`.
Both are legacy user-agent strings. Anthropic's current crawler identifies as
`ClaudeBot`, which is not named, so it falls through to the `User-agent: *` block at
line 2 rather than the explicit allowance the other AI crawlers get.

Every other major AI crawler is explicitly allowed: `GPTBot`, `ChatGPT-User`,
`PerplexityBot`, `Amazonbot`, `cohere-ai`. The omission reads as the name having
changed after the file was written, not as a deliberate exclusion.

**Not fixed here, deliberately.** `robots.txt` is crawler policy, and the change was
outside the scope of "write a blog post". The owner should confirm the intent before
it changes. If the intent is what it appears to be, the fix is four lines:

```
User-agent: ClaudeBot
Allow: /
```

### [P2-051] `coverImage` is declared and indexed but never rendered on the page

Every post sets `coverImage` in frontmatter. It reaches `BlogPostJsonLd` as the
BlogPosting `image` (`components/blog/blog-post-layout.tsx:49`) and the RSS
`<enclosure>` (`app/feed.xml/route.ts:29`), both of which are useful. But no component
renders it: `blog-post-header.tsx`, `blog-post-content.tsx`, `blog-post-card.tsx` and
`blog-posts-grid.tsx` contain no reference to it, so the asset never loads in the page
body or on an index card.

Not a bug, and arguably good for page weight, since the cards are text-forward by
design. Logged because it is surprising: adding a post naturally leads you to produce a
cover image, and it is worth knowing up front that the image does structured-data and
feed work only, never visual work. The largest existing cover is 619.8 KB, which buys
nothing a smaller file would not.

**Decide one way:** either render it (blog index card or post header) or note in
`CLAUDE.md` that covers are metadata-only and should be sized accordingly.

The next entry gets ID `P?-052`.

---

## Resolved

| ID | Date | Issue | Fixed in |
|---|---|---|---|
| P2-049 | 2026-09-20 | RSS `<enclosure>` hardcoded `type="image/webp"` for every cover image. Not latent as first logged: the two Pixabay `.jpg` covers (`mcp-server-design-is-changing`, `why-humanities-matter-in-ai-era`) were shipping mislabelled in the live feed. Now derived from the extension via an `IMAGE_MIME_TYPES` map, query/hash stripped first. | `9506787` |
| — | 2026-09-15 | `--accent-hot` 3.53:1 AA failure across 108 usages. Now 4.63:1. | `5389854` |
| — | 2026-09-15 | `--success` 2.62:1 and `--destructive` 3.96:1 AA failures. Now 4.57 and 4.59. | `5389854` |
| — | 2026-09-15 | Prose measure ~105ch. Now capped at 68ch, figures and code break out. | `5389854` |
| — | 2026-09-15 | Marquees had no pause control (WCAG 2.2.2, Level A). Now use `<Marquee>`. | `5389854` |
| — | 2026-09-15 | `lib/design-system/` dead and contradictory. Deleted. | `5389854` |
| — | 2026-09-15 | Duplicate `og:image` across 5 posts. Metadata override removed. | `5389854` |
| — | 2026-09-15 | Light/dark inconsistencies in code blocks and SVG charts. | `f694a80` |
| — | 2026-09-14 | Footer inverted with the theme. | `c6d084d` |
| P0-005 | 2026-09-15 | MDX dropped the YouTube embed's `style`, so the 16:9 wrapper collapsed. Replaced with an `.embed-16x9` class. | `65a2eaf` |
| P0-004 | 2026-09-15 | Blog tables had no scroll container and could widen the page body at 390px. Added a `table` override in `mdxComponents` plus `min-width: 100%`. | `65a2eaf` |
| P0-002 | 2026-09-15 | Command palette active row measured 2.98:1 in dark mode. Now solid `accent-lime` with its own foreground, 13.90 light / 15.22 dark. | `65a2eaf` |
| P0-001 | 2026-09-15 | Framer Motion ignored `prefers-reduced-motion` across 33 files. Added `MotionProvider` (`MotionConfig reducedMotion="user"`) in the root layout. | `65a2eaf` |
| P0-003 | 2026-09-15 | Four `aria-labelledby` references pointed at no element. `SectionHeading` now takes an `id`. | `65a2eaf` |
| P0-006 | 2026-09-15 | `aria-label` suppressed the toggle's state text and "system" was invisible. Rebuilt on three icons with the state in the accessible name. | `bf49756` |
| P1-011 | 2026-09-15 | `scroll-mt-16` reserved 64px against a ~96px header. Now `scroll-mt-20 sm:scroll-mt-28`. | `bf49756` |
| P1-008 | 2026-09-15 | Contact character counter measured 3.74:1 light. Alpha dropped; now 8.09:1. | `bf49756` |
| P1-009 | 2026-09-15 | Breadcrumb separator and palette external-link icon measured 2.98:1 light. Both raised to `/80`, 4.78:1. | `bf49756` |
| P1-007 | 2026-09-15 | `animate-bounce` and `animate-ping` added to the reduced-motion block; `animate-pulse` kept deliberately and DESIGN.md §10 amended to say why. | `bf49756` |
| P2-021 | 2026-09-15 | §5 contrast table corrected and extended: `--paper` dark value fixed, four missing pairs added, background-only tokens and the alpha-modifier trap written into the rules. | `bf54a63` |
| P2-022 | 2026-09-15 | §6's `h1` exemption cited a rule that does not exist. Rewritten with the real reason (a `ch` cap is inert at display sizes). | `bf54a63` |
| P2-023 | 2026-09-15 | The deliberate `zinc` pairing in blog code blocks is now documented in §12 as the one sanctioned exception to §13. | `bf54a63` |
| P1-012 | 2026-09-15 | Pre-brutalist surfaces on `/blog`. Suspense fallback and skeletons rebuilt on the brutalist system; four decorative blur/outline elements removed. | `bf54a63` |
| P1-016 | 2026-09-15 | Profile strings hardcoded in seven places across four files. Added `siteConfig.role` and `siteConfig.employer`; all now read from config. | `bf54a63` |
| P2-018 | 2026-09-15 | Dead code. Deleted 13 files, not the 11 logged: `interactive-hero.tsx` and `sections/social-links.tsx` fell out once their only importers went. | `6a5d85f` |
| P2-019 | 2026-09-15 | Stock shadcn palette. Scope was wider than logged — `ui/sheet.tsx` and `ui/sonner.tsx` had it too. `components/ui/` is now free of raw palette colour. | `6a5d85f` |
| P2-020 | 2026-09-15 | `shadow-glow` referenced the undefined `--primary-rgb`. Removed from `tailwind.config.ts`. | `6a5d85f` |
| P1-014 | 2026-09-15 | Six off-scale type sizes moved onto `micro`; the palette description went to `text-xs` since `micro`'s tracking is for caps. Two more sites died with `ui/badge.tsx`. | `6a5d85f` |
| P1-015 | 2026-09-15 | `themeColor` now uses the resolved `--background` hex, `#f9f8f5` / `#101014`. | `6a5d85f` |
| P1-017 | 2026-09-15 | Dead click handler removed; the tag chip is a plain label, since a nested `<a>` inside the row link would be invalid HTML. | `6a5d85f` |
| P2-024 | 2026-09-15 | Skip links now stack vertically below `sm` instead of running past a 390px viewport. | `6a5d85f` |
| P1-010 | 2026-09-15 | Added `.sticker-button` at 28px for the three clickable chips; `.sticker` stays a 24px label. DESIGN.md §8's stale 22px figure corrected. | `57040e1` |
| P1-025 | 2026-09-15 | `dynamic-greeting`'s palette lived in a `gradient` field that was never rendered — deleted, along with the dead `Tagline` export. `blog-share` feedback moved to `--success`/`--destructive`. Brand colour documented as a §5 exception, gated on measured contrast. | `57040e1` |
| P1-013 | 2026-09-15 | Hero blur layer kept. §2 rewritten to scope "zero blur" to the component language and document the three background layers explicitly. | `57040e1` |
| P2-026 | 2026-09-15 | `CLAUDE.md` still told future sessions to prefer importing from `lib/design-system/`, deleted in `5389854`, and listed `projects-page.tsx`, deleted in `6a5d85f`. Corrected. | `5537b99` |
| P2-027 | 2026-09-15 | Default Vercel favicon and unused `next.svg` / `vercel.svg` scaffolding replaced with a brand icon set. | `5537b99` |
| P1-028 | 2026-09-18 | `pnpm run lint` was dead: Next 16 removed `next lint` and ESLint 9 ignores `.eslintrc.json`. Migrated to flat config (`eslint.config.mjs`, importing `eslint-config-next/core-web-vitals` directly — it already exports a flat array, so `FlatCompat` is unnecessary). Lint now runs clean. | `5f07380` |
| P1-029 | 2026-09-18 | `components/blog-list.tsx` mirrored URL state into 6 `useState`s synced by 3 `useEffect`s, tripping `react-hooks/set-state-in-effect` 3x. Side effect, measured against the pre-refactor build: a deep-linked `/blog?q=mcp` was **ignored entirely** — all 6 posts rendered and the search box was empty, because `BlogSearch` always initialised to `""` and its debounce immediately pushed the empty query back over the URL. Now derived from `useSearchParams()` during render; `BlogSearch` takes `initialQuery` and skips the debounce when the value already matches the URL. Deep link now yields 2 matching posts with the box pre-filled. Also `?page=99` rendered a full unclamped page before and now clamps to the last real page. 121 -> 134 lines but zero sync effects. | `5f07380` |
| P1-030 | 2026-09-18 | `components/hero-animation.tsx:25` called `setState` directly in an effect to read `prefers-reduced-motion`. Replaced with `useSyncExternalStore`, which is the correct primitive for an external store and gives a proper SSR snapshot. | `5f07380` |
| P2-031 | 2026-09-18 | `components/google-analytics.tsx` was a vendored copy of `@next/third-parties/google` — including its commented-out `sendGAEvent` — while that package was already a dependency. Deleted; `app/layout.tsx` imports upstream. | `5f07380` |
| P2-032 | 2026-09-18 | Four dependencies were installed but imported nowhere: `@radix-ui/react-avatar`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-icons`, `@radix-ui/react-separator`. Removed. (`CLAUDE.md` claimed `@radix-ui/react-icons` was in use for icons; it was not.) | `5f07380` |
| P2-033 | 2026-09-18 | `DEPLOY_TARGET=gh-pages` was threaded through `cross-env`, the `predeploy` script, and the CI workflow, but `next.config.js` only assigned it to an unused `ghPages` const. Removed the flag, the `cross-env` dep, and the dead `basePath`/`assetPrefix: ""` no-ops. | `5f07380` |
| P2-034 | 2026-09-18 | `types/nav.ts` (unreferenced `NavItem`) and `components/markdown-content.tsx` (a 15-line wrapper adding one class, used once) were dead weight. Deleted; the wrapper is inlined as `<div className="markdown mt-10">`. | `5f07380` |
| P2-035 | 2026-09-18 | `REDESIGN_PLAN.md` described a Feb-2026 plan whose work is done or abandoned (it still claimed "Next.js 15", "Projects section commented out", and listed a testimonials carousel that does not exist). Removed as stale; `DESIGN.md` and `ISSUES.md` are the live documents. | `5f07380` |
| P2-036 | 2026-09-18 | Self-inflicted in `5f07380`: a code comment in `hero-animation.tsx` containing the bare word "static" made Tailwind's JIT emit an unused `.static{position:static}` rule (stylesheet 59,683 -> 59,707 bytes). Caught by diffing the built export against the pre-refactor build. Comment reworded. | `f1136dc` |
| P1-038 | 2026-09-18 | **No label in the contact form was associated with its input.** `Field` rendered a bare `<label>` and none of the four inputs carried an `id`, so clicking a label did not focus its field and screen readers announced the controls unlabelled (WCAG 1.3.1 / 3.3.2). Added `htmlFor`/`id` pairs plus `aria-invalid` and `aria-describedby` pointing at `role="alert"` error text. Verified in-browser: clicking each of the 4 labels now focuses its control. Found by Biome's `a11y/noLabelWithoutControl`; ESLint's config never flagged it. | `43394e8` |
| P2-039 | 2026-09-18 | 10 action buttons lacked `type="button"` (`blog-post-card` x2, `pagination-controls` x2, `tag-filter`, `command-palette`, `projects-page-new` x3, `site-header`). A `<button>` without an explicit type defaults to `submit`, which is a latent form-submission bug for any button placed inside a `<form>`. Found by Biome's `a11y/useButtonType`. | `43394e8` |
| P2-040 | 2026-09-18 | Three unused imports survived the dead-code sweep in `5f07380` because ESLint's Next preset does not enable `no-unused-vars`: `React` in `main-nav.tsx` and `site-header.tsx`, and one icon in `icons.tsx`. Found by Biome's `correctness/noUnusedImports`. | `43394e8` |
| P2-041 | 2026-09-18 | The custom Medium `<svg>` in `icons.tsx` was exposed to assistive tech with no accessible name. It is decorative (always paired with visible link text), so it now carries `aria-hidden="true"` and `focusable="false"` rather than a redundant `<title>`. Found by Biome's `a11y/noSvgWithoutTitle`. | `43394e8` |
| P1-042 | 2026-09-18 | **CI ran neither lint nor typecheck.** `.github/workflows/nextjs.yml` went straight from `pnpm install` to `pnpm run predeploy`, so nothing enforced lint or types on push — a lint error could ship to production unnoticed, and the whole P1-028 lint migration was decorative. Added `Lint` and `Typecheck` steps before the build. Both verified to fail the job on a planted defect (a type error and a missing `type="button"`) and pass on clean code. | `aab8882` |
| P2-043 | 2026-09-18 | `README.md:44` still instructed readers to set `DEPLOY_TARGET=gh-pages` when building directly, a variable deleted in `5f07380`. Removed, and the lint section updated to describe Biome and the new CI gates. | `aab8882` |
| P2-044 | 2026-09-18 | `DESIGN.md` §13 still told reviewers `pnpm run lint` was broken (fixed in `5f07380`, retooled in `8f491aa`), and §14 claimed `ISSUES.md` "is currently empty" while `P0-037` is open. Both corrected. | `aab8882` |
| P1-045 | 2026-09-18 | **Two `biome-ignore` suppressions were silently inert.** Biome only honours the directive when the reason sits on one line; both `noImgElement` ignores (`blog-post-content.tsx`, `company-card.tsx`) had wrapped onto a second comment line, so the rule kept firing and the "suppression" did nothing. Rewritten as single lines and the trap documented in `CLAUDE.md`. | `8e71b4d` |
| P1-046 | 2026-09-18 | **Lint warnings could never fail anything.** Biome exits 0 when only warnings are emitted, so 22 warnings had accumulated unnoticed and CI's new lint gate would have passed regardless. `pnpm run lint` is now `biome lint --error-on-warnings .`, verified to exit nonzero on a planted warning-level defect. Tree is at zero diagnostics. | `8e71b4d` |
| P2-047 | 2026-09-18 | Five `any` types removed: four Next route `params` (now `Promise<{...}>`, matching the `await` already in the handlers) and the GitHub API response (now a documented `GithubRepoResponse` with explicit fallbacks). Side effect verified harmless: `description: null` now serializes as `""`, which both render sites already treat identically via `||`, and which matches the declared `Repository` interface. | `8e71b4d` |
| P2-048 | 2026-09-18 | Remaining lint findings resolved rather than muted: `parseInt` given an explicit radix in two date parsers, one `useOptionalChain`, one `useTemplate`, and the 12 `noArrayIndexKey` sites suppressed individually with a reason explaining why the index is a stable identity there (static config lists, fixed-length skeletons, repeated marquee text). | `8e71b4d` |

Entries predating this file have no ID; they are carried over from `DESIGN.md` §14.

## Known non-issues

Documented so they are not "discovered" again.

- **`--accent-lime` measures 1.27:1 as a text colour on paper.** Correct. It is a
  background-only token, always paired with ink via `--accent-lime-foreground`
  (13.90:1). Verified: no `text-accent-lime` usage exists anywhere in the repo.
- **`--warning` measures 2.02:1 on paper.** Same category as lime — background-only,
  paired with `--warning-foreground` at 8.78:1. Tracked in P2-021 only because §5 does
  not say so.
- **Decorative dividers at `foreground/10` to `/20` measure 1.2-1.8:1.** WCAG 1.4.11
  exempts purely decorative boundaries. These separate rows inside an already-bordered
  region, so the Common Region grouping (§2) is carried by the 2px outer border.
- **Charts are fixed dark cards in both themes.** Deliberate, see `DESIGN.md` §12.
  Verified contrast on their own ground: 17.08 / 14.42 / 7.03, all AAA.
- **`components/loading-states.tsx` is unreferenced.** True but harmless; folded into
  P2-018 along with the other ten dead files.
- **Share buttons carry LinkedIn and Facebook brand hex.** Deliberate, documented in
  `DESIGN.md` §5. Brand identity outweighs the token here, but the exception is gated:
  both clear 4.5:1 with white text (4.88 and 6.84). Twitter's `#1DA1F2` measured 2.83
  and was replaced with the ink pair, which is also X's actual branding.
- **The home hero sits on three blurred background layers.** Deliberate, documented in
  `DESIGN.md` §2. "Zero blur" governs the component language — borders, shadows, chips
  — not the page ground. Do not add blurred decoration anywhere else; two similar
  blobs on `/blog` were removed as drift.
- **`.sticker` is 24px and `.sticker-button` is 28px.** Not an inconsistency. Labels sit
  at the SC 2.5.8 minimum; anything interactive uses the taller variant so a future
  padding change cannot silently drop a control below the minimum.
- **`app/icon.svg` uses literal hex, not tokens.** Required, not drift. A favicon renders
  outside the page and cannot read CSS variables, so the accent-lime pair is inlined as
  `#bbf00f` / `#111117`. Keep in sync with `app/globals.css` by hand if those tokens
  ever change.
- **The favicon "J" is a path, not a `<text>` element.** Deliberate. Favicons render
  without page CSS, so Instrument Serif would never load and each browser would
  substitute a different serif.
- **`app/apple-icon.png` has no border frame** while `icon.svg` does. Deliberate: iOS
  masks the icon with a rounded rectangle, which would clip a square frame at the
  corners.

- **Local `out/` holds RSC payloads at nested paths while production serves them
  flat.** A locally built `out/` contains `out/blog/__next.blog/__PAGE__.txt`, but the
  browser requests `/blog/__next.blog.__PAGE__.txt`, so a naive local static server
  returns 404 for every prefetch and the console fills with errors. This is not a site
  defect: checked against production on 2026-09-20, `basilinjoe.github.io` serves the
  flat dotted path with 200 and the nested path with 404, which is the opposite of the
  local tree. Client-side navigation works on the deployed site. If you serve `out/`
  locally and see prefetch 404s, it is your server, not the build.
