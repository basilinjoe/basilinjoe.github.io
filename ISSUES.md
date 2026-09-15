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

Severity says how bad something is; this says what to do next. The ordering is
correctness first, then the cheap documentation fixes that make `DESIGN.md`
trustworthy again, then visible drift, then hygiene.

| # | ID | Why here |
|---|---|---|
| 1 | P1-010 | **Needs a decision.** Clickable stickers scrape 24px exactly; either raise the padding or bless the case in §8. |
| 2 | P1-015, P1-017, P2-024 | Small correctness and polish fixes. |
| 3 | P1-014 | Type-scale cleanup. Wide but mechanical. |
| 4 | P2-018, P2-019, P2-020 | Dead code and dead tokens. Deletion, mostly. |
| 5 | P1-013 | **Needs a decision.** The hero blur blobs are either a deliberate exception or they go. Not a defect either way. |

Items 1 and 5 should not be "fixed" unilaterally — they are design calls, not bugs.
Everything between them is mechanical.

---

## Open

### P0 — accessibility floor and user-visible breakage

None open. All six are in Resolved.

### P1 — drift, contradictions, latent failures

#### [P1-010] `.sticker` is used as a button in three places, which §8 forbids

- `components/blog/blog-post-card.tsx:104`
- `components/blog/blog-post-card.tsx:164`
- `components/projects-page-new.tsx:175`

`DESIGN.md` §8 says: "If you ever make a sticker clickable, raise its padding to clear
24px." All three are `<button>` elements.

The doc's own measurement is also wrong. Computed from the real values — `micro`
line-height `1rem` (16px) + `py-0.5` (2px x2) + `border-2` (2px x2) — the box is
**exactly 24px**, not the 22px §8 claims. So it scrapes SC 2.5.8 (AA) with zero margin.

- Fix: decide one way. Either bump to `py-1` (28px) and update §8, or correct §8's number
  and explicitly bless the clickable case.

#### [P1-013] Home page background contradicts the "zero blur" direction

`components/hero-animation.tsx` renders three 28rem `blur-3xl` accent blobs beneath the
hero. `DESIGN.md` §2 states the identity as "hard 2px borders, offset shadows with zero
blur".

It does gate the cursor parallax on `prefers-reduced-motion` (correctly, per §10's
vestibular list), so this is a direction question rather than a bug.

- Fix: either document it in `DESIGN.md` as a deliberate mood layer exempt from the
  zero-blur rule, or replace it with the dot-grid texture it already layers on top.

#### [P1-014] Four ad-hoc type tiers below the `micro` floor

`DESIGN.md` §6 defines `micro` (0.6875rem / 11px) as the smallest tier, and §11 warns it
is already the most fragile type in dark mode. These bypass the scale:

| Size | Where |
|---|---|
| `text-[0.6rem]` (9.6px) | `components/main-nav.tsx:39`, `components/ui/badge.tsx:27` |
| `text-[0.65rem]` (10.4px) | `components/sections/skills-and-tools.tsx:69`, `components/mobile-nav.tsx:64` |
| `text-[10px]` | `components/site-header.tsx:63` |
| `text-[11px]` | `components/command-palette.tsx:426` (same size as `micro`, just off-token) |

- Fix: use `text-micro` everywhere; if a smaller tier is genuinely needed, add it to
  `tailwind.config.ts` and document it in §6.

#### [P1-015] `themeColor` is pure white and pure black

`app/layout.tsx:51-53` sets `white` and `black`. The real page grounds are `45 25% 97%`
(warm paper) and `240 12% 7%` (near-black blue).

- Violates: `DESIGN.md` §11, whose stated strategy is "never use pure black or pure
  white". Browser chrome visibly mismatches the page on mobile.
- Fix: use the resolved hex of `--background` for each mode.

#### [P1-017] Dead click zone inside a link

`components/sections/featured-posts.tsx:82` puts `onClick={(e) => e.preventDefault()}` on
a plain `<span>` inside the post `<Link>`. The span is not focusable, has no role, and
the handler only cancels the parent link — so the tag chip is a hole in the row's click
target with no behaviour of its own.

- Fix: remove the handler, or make the chip a real `<Link>` to the tag page.

### P2 — hygiene and documentation

#### [P2-018] Eleven unreferenced files, ten of them undocumented

`DESIGN.md` §14 lists only `components/loading-states.tsx` as dead. Also unreachable from
any route:

`components/projects-page.tsx`, `components/terminal-animation.tsx`,
`components/sections/profile-section.tsx`, `components/sections/social-links.tsx`,
`components/ui/avatar.tsx`, `components/ui/breadcrumb.tsx`,
`components/ui/dropdown-menu.tsx`, `components/ui/input.tsx`,
`components/ui/separator.tsx`, and transitively `components/ui/badge.tsx` and
`components/ui/card.tsx`.

Most carry the pre-brutalist language (`rounded-full`, `bg-blue-500`, `green-100` and
`purple-100`, hardcoded `#0a66c2`, `#02b875`), so they are a standing re-drift risk — the
same argument §4 used to justify deleting `lib/design-system/`.

- Fix: delete, or move under a clearly marked `legacy/` path and note it in §14.

#### [P2-019] Stock shadcn primitives bypass the token system

`components/ui/badge.tsx`, `ui/dialog.tsx`, `ui/input.tsx`, and `ui/dropdown-menu.tsx`
still carry generated shadcn defaults: `border-zinc-200`, `bg-white`, `dark:bg-zinc-950`,
`rounded-full`, and `blue-500` / `green-100` / `purple-100` variants.

`ui/dialog.tsx` is live (imported by `command-palette.tsx`, though the palette bypasses
`DialogContent` and portals `DialogPrimitive.Content` itself). The rest are dead, see
P2-018.

- Violates: `DESIGN.md` §13 ("No hardcoded hex or raw Tailwind palette colour; semantic
  tokens only").
- Fix: retoken `ui/dialog.tsx`; delete the rest.

#### [P2-020] `shadow-glow` references a token that does not exist

`tailwind.config.ts:85` — `'glow': '0 0 15px 2px rgba(var(--primary-rgb)/0.15)'`.
`--primary-rgb` is defined nowhere in the repo, so the shadow resolves to nothing. It is
also a blurred shadow in a system whose §8 shadows are all zero-blur.

- Fix: delete the entry.

#### [P2-024] Skip link can overflow at 390px

`components/skip-nav.tsx:26` positions the second link at `left-52` (208px). At 11px mono
uppercase with `tracking-widest`, "Skip to navigation" plus `px-4` and borders runs to
roughly 390-400px total.

Only one link is visible at a time (`sr-only focus:not-sr-only`), so they never overlap,
but the focused second link can push past the 390px viewport.

- Fix: stack the links vertically below 640px, or narrow the offset.

---

## Resolved

| ID | Date | Issue | Fixed in |
|---|---|---|---|
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
