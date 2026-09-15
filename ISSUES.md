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

**Nothing open.** Every issue from the 2026-09-15 full-app audit is closed — see
Resolved below, and **Known non-issues** for the things that look like bugs but are
deliberate.

The next entry gets ID `P?-028`.

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
| P2-026 | 2026-09-15 | `CLAUDE.md` still told future sessions to prefer importing from `lib/design-system/`, deleted in `5389854`, and listed `projects-page.tsx`, deleted in `6a5d85f`. Corrected. | pending |
| P2-027 | 2026-09-15 | Default Vercel favicon and unused `next.svg` / `vercel.svg` scaffolding replaced with a brand icon set. | pending |

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
