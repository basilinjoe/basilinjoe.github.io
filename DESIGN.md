# Design System — basilinjoe.github.io

The UI/UX source of truth for this site. Read this before making any visual change.

This document describes the system **as actually implemented**, verified against the
code on 2026-09-15, not an aspirational spec. Where the code and this document
disagree, that is a bug in one of them: fix it, don't route around it.

---

## 1. Product context

- **What:** Personal portfolio and technical blog for an Associate Technical
  Architect working in AI platforms, cloud architecture, and enterprise integration.
- **Who for:** Hiring managers and peer engineers skimming for credibility, plus
  readers arriving at a single blog post from search or an AI answer surface.
- **Constraint:** Static export (`output: "export"`) to GitHub Pages. No server
  runtime, no image optimization, no API routes. Everything renders at build time.
- **The memorable thing:** this should read as *a working engineer's field notebook*,
  not a template. Density and confidence, not polish and whitespace.

---

## 2. Aesthetic direction: Editorial Tech Maximalist

Newsprint-and-ink editorial layout crossed with brutalist software UI. Hard 2px
borders, offset shadows with zero blur, an extreme type scale, and a hot accent trio
against warm paper neutrals.

**Why this works rather than reading as noise:** maximalism only survives if the
underlying grid and contrast rules are stricter than a minimalist system would need.
Decoration is earned by structure. Every dense element sits on the 12-column grid,
every group is bounded, every hierarchy step is a real size jump rather than a
subtle one.

**The single most load-bearing Gestalt principle here is Common Region**
([NN/g](https://www.nngroup.com/articles/common-region/)): a visible boundary groups
items more strongly than proximity does. That is precisely why the brutalist bordered
card works at high density where whitespace-only grouping would collapse.

---

## 3. Principles

The seven principles the system was built against come from
[Figma's UI Design Principles](https://www.figma.com/resource-library/ui-design-principles/)
(a vendor guide, undated, not a standard). Four of the seven are Gestalt restatements.
They are listed here with what each concretely means *in this codebase*.

| Principle | What it means here |
|---|---|
| **Hierarchy** | Size jumps are large and deliberate. A section goes `micro` eyebrow → serif display headline → body. Never two adjacent tiers that look similar. |
| **Progressive disclosure** | Blog list shows excerpt + tags only. Command palette hides navigation until `⌘K`. Timeline shows role headline, details on the card. |
| **Consistency** | One card pattern (`.card-brutal`), one chip pattern (`.sticker`), one eyebrow pattern (`.caps-caption`). New surfaces reuse, they do not invent. |
| **Contrast** | Both senses: colour contrast (see §5) and *typographic* contrast, serif display against mono micro-caps. |
| **Accessibility** | Non-negotiable floor, see §9. Maximalism is never an excuse for a failed ratio. |
| **Proximity** | Related metadata sits inside the same bordered region, not merely near it. |
| **Alignment** | 12-column editorial grid (`.grid-editorial`). Deliberate grid-breaking is allowed; accidental misalignment is not. |

From [NN/g's 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
(Nielsen & Molich 1990, refined 1994), the ones that actually bind a static content
site are: **visibility of system status** (theme state, active nav, reading progress),
**consistency and standards**, **recognition rather than recall** (persistent nav,
visible tag taxonomy), **aesthetic and minimalist design**, and **flexibility and
efficiency of use** (the command palette). The heuristics about error prevention,
undo, and recovery mostly do not apply here: there is almost no destructive state.

---

## 4. Source of truth (read this before editing tokens)

| Concern | File | Status |
|---|---|---|
| Colour tokens, light + dark | `app/globals.css` `@layer base` | **Authoritative** |
| Type scale, shadows, keyframes, accent colours | `tailwind.config.ts` | **Authoritative** |
| Component patterns (`.card-brutal`, `.sticker`, …) | `app/globals.css` `@layer components` | **Authoritative** |
| Blog prose styling | `app/globals.css`, `.markdown` block | **Authoritative** |
| Fonts | `lib/fonts.ts` | **Authoritative** |

There is no separate token module. `lib/design-system/` was **deleted on 2026-09-15**:
it exported a `designTokens` object that nothing imported, and its values contradicted
the live system (soft blurred shadows, rounded radii up to 2rem, a `var(--color-primary)`
reference to a token that does not exist). Do not recreate it. If you want a token,
read `globals.css` or `tailwind.config.ts`.

`tailwind.config.js` was likewise deleted in favour of `tailwind.config.ts`. Only the
`.ts` file exists; `components.json` points at it.

---

## 5. Colour

### Approach

Restrained neutrals, expressive accents. Paper and ink carry ~95% of the surface
area; the accent trio is used sparingly and always means something.

### Tokens

Defined as raw HSL channels in `app/globals.css` so Tailwind can apply opacity
modifiers (`bg-accent-hot/40`).

| Role | Light | Dark | Use |
|---|---|---|---|
| `--background` | `45 25% 97%` | `240 12% 7%` | Page ground |
| `--paper` | `45 25% 97%` | `240 12% 8%` | Alias. **Not identical to `--background` in dark**, 8% vs 7%. |
| `--ink` / `--foreground` | `240 15% 8%` | `45 25% 97%` | Body text, borders |
| `--primary` | `224 100% 52%` | `224 95% 62%` | Links, focus ring token |
| `--accent-hot` | `18 92% 48%` | `18 100% 62%` | Eyebrows, numerals, focus ring, emphasis |
| `--accent-lime` | `74 88% 50%` | `74 92% 62%` | Positive/CTA surfaces. **Background only** |
| `--accent-pink` | `336 92% 55%` | `336 95% 68%` | Reserved, currently unused |
| `--border` | `240 15% 8%` | `45 25% 97%` | Heavy 2px borders |
| `--radius` | `0.25rem` | same | Deliberately sharp |

### Verified contrast

Computed from the actual token values (WCAG 2.x relative luminance), not estimated.

**Light mode**

| Pair | Ratio | Normal text | Large text |
|---|---|---|---|
| Body on background | 17.71 | AAA | AAA |
| Muted on background | 8.08 | AAA | AAA |
| Link (primary) on background | 5.71 | AA | AAA |
| Body on card | 18.81 | AAA | AAA |
| Ink on lime chip | 13.96 | AAA | AAA |
| accent-hot on background | 4.63 | AA | AAA |
| Paper text on hot chip | 4.63 | AA | AAA |
| destructive on background | 4.59 | AA | AAA |
| success on background | 4.57 | AA | AAA |
| lime as *text* on background | 1.27 | FAIL | FAIL |
| `--info` on background | 4.07 | FAIL | AA |
| `--accent-pink` on background | 3.66 | FAIL | AA |
| `--warning` as *text* on background | 2.02 | FAIL | FAIL |

**The three sub-4.5 values are all background-only tokens**, the same category as lime.
Paired with their own foregrounds they are fine: ink on warning is 8.78, paper on info
is 4.07 (AA at large sizes only). None is currently used as a text colour anywhere —
verified by grep. **If you ever set `text-warning`, `text-info`, or `text-accent-pink`,
you are introducing a contrast failure.** `--accent-pink` is reserved and unused.

**Dark mode** — one pair fails, the rest land AA or AAA. Body 17.96, muted 8.84,
primary 4.60, accent-hot 7.22, lime 15.43, destructive 5.30, success 9.83, warning 9.57,
info 5.56, accent-pink 6.58.

| Pair | Ratio | Normal text | Large text |
|---|---|---|---|
| `--destructive-foreground` on `--destructive` | **3.39** | **FAIL** | AA |
| `--primary` on `--card` | 4.33 | FAIL | AA |

Both are latent rather than live. The first is the `destructive` button variant in
`components/ui/button.tsx`, which nothing currently renders — **fix the token before
using that variant**. The second only bites if a link at normal size sits directly on a
`bg-card` surface in dark mode; `--primary` on `--background` is 4.60 and passes.

### How the light-mode accents were set (2026-09-15)

The original tokens failed WCAG AA and the code comment asserted a ratio that did not
hold: hot orange was documented as "~5:1 with paper" but measured **3.53:1**. Because
the `micro` tier is 11px, it is *not* WCAG "large scale" (which requires ≥24px, or
≥18.66px bold), so it needs the full 4.5:1. That colour carries every eyebrow and
kicker on the site, 108 usages.

Contrast is symmetric, so darkening the orange repaired both the text-colour use and
the chip-background use in one change:

| Token | Was | Now | Ratio |
|---|---|---|---|
| `--accent-hot` | `18 92% 48%` | `18 92% 41%` | 3.53 → **4.63** |
| `--success` | `145 65% 42%` | `145 65% 31%` | 2.62 → **4.57** |
| `--destructive` | `0 84% 55%` | `0 84% 48%` | 3.96 → **4.59** |

**Do not lighten these without re-measuring.** Dark-mode values of all three already
passed and were deliberately left alone.

To re-audit after any colour change, compute WCAG relative luminance against the real
token values rather than trusting a comment. That is how these three were caught.

### Rules

- **Four tokens are background-only. Never use them as a text colour**: `--accent-lime`
  (1.27:1 on paper), `--warning` (2.02), `--accent-pink` (3.66), `--info` (4.07). Each
  pairs with its own `-foreground` token. Lime in particular is effectively invisible
  as text.
- **Alpha modifiers on text need re-measuring.** `text-muted-foreground/60` measures
  2.98:1 in light mode and `/70` measures 3.74 — both fail AA. `/80` (4.78) is the
  lowest safe step. This has shipped twice.
- Accent colour must carry meaning. Hot orange = "this is the entry point / the
  number / the emphasis." Lime = "this is available / positive / a CTA."
- Do not introduce a new colour. Use the trio or a neutral.
- `--border` is full-strength ink or paper, deliberately. The `*` base rule applies
  `border-border/50`; heavy borders opt back up to `border-foreground`.

---

## 6. Typography

### Faces

| Role | Family | Loaded via | Notes |
|---|---|---|---|
| Display | **Instrument Serif** 400, normal + italic | `next/font/google` | Hero headlines, H1/H2 in prose, pull-quotes, column numerals |
| Body / UI | **Geist Sans** variable | `geist/font/sans` | Everything readable |
| Mono | **JetBrains Mono** | `next/font/google` | Eyebrows, metadata, chips, code, kbd |

The mono face is used as a *display* device for micro-caps, not only for code. That
serif/mono pairing against sans body is the system's typographic signature.

### Scale

Extreme by design. Tailwind default tiers plus custom ends in `tailwind.config.ts`:

- `micro` — `0.6875rem` (11px), tracking `0.08em`. Eyebrows, metadata, chips.
- `10xl` `10rem` / `11xl` `12rem` / `12xl` `16rem`, line-heights 0.9 / 0.88 / 0.86.
- `letterSpacing.tightest` = `-0.06em` for display.

**Tracking convention:** negative tracking as size increases, positive tracking on
small uppercase. Every major type system does this, but the specific per-size tables
in Apple HIG and Material are not publicly verifiable, so treat this as documented
convention rather than a sourced threshold.

### Measure (line length)

Running prose is capped at **68ch**. Figures, code blocks, tables, and `h1`/`h2` are
deliberately left unconstrained and break out to the full column width.

The reference points:

- [Butterick, *Practical Typography*](https://practicaltypography.com/line-length.html): 45–90 characters.
- Bringhurst, *The Elements of Typographic Style* (1992): 45–75, 66 ideal. A craft
  judgment from a named author, not an experimental finding.
- WCAG 1.4.8 Visual Presentation (**AAA**): ≤ 80 characters. The only *standard* number here.

Empirical reading research is genuinely mixed (longer measures often read faster while
being preferred less), so this is a comfort call, not a correctness one. The previous
`max-w-4xl` container put prose at roughly **105 characters**, outside all three ranges.

Implementation lives in the `.markdown` block in `globals.css`. Two deliberate choices:

- The cap is on the **child elements**, not the container, so figures and code keep the
  full width. Narrowing the container instead would squeeze the 640px-wide charts.
- The unit is `ch` rather than a pixel width so the measure tracks the font.
- `h1` and `h2` are **excluded**, for two different reasons:
  - `h2` carries a `border-b` that reads as a section divider. Stopping that rule short
    of the column edge would look broken rather than intentional. This is the real
    constraint.
  - `h1` has no rule. It is excluded because the cap would be **inert** anyway: `ch`
    scales with the element's own font size, so 68ch at `text-5xl` is roughly 1600px,
    far wider than the 896px container. Adding the rule would be dead CSS.

**A consequence of the `ch` unit worth knowing:** the cap only actually binds on small
type. At the 17px prose size, 68ch lands near 636px and does its job. At `h3` (20px) it
is close to the container width and barely binds; above that it does nothing. That is
the intended behaviour — running prose is what needs a measure — but do not assume the
rule is constraining a heading just because the selector lists it.

### Line height

- Body: `leading-relaxed` (1.625). Butterick recommends 120–145% for body; WCAG 1.4.8
  (AAA) wants ≥1.5 within paragraphs. 1.625 satisfies the standard and sits just above
  Butterick's band, which is the right call for a long-form dark-capable page.
- Display: below 1.0 (`0.86`–`0.95`). Butterick's ratio is body-only and does not apply.
- `text-wrap: balance` is applied globally to `h1`–`h6`.

---

## 7. Spacing and layout

- **Base unit: 4px**, Tailwind's default scale. The "8pt grid" has no standards body
  behind it; it traces to Material Design's 2014 8dp spec and Bryn Jackson's 2015
  "The 8-Point Grid." Industry convention, not a requirement.
- **Container:** centred, `2xl` breakpoint at 1440px. Padding ramps 1.25rem → 4rem.
  Below 640px a media query forces `px-4`.
- **Grid:** `.grid-editorial`, 12 columns, 1.5rem gutter. Hero and about layouts use
  `md:grid-cols-12` with explicit spans.
- **Density:** compact. Section rhythm alternates a big serif moment against a dense
  grid. Do not even out that rhythm, the contrast is the point.

### Responsive

Every page must hold at **390px** (the narrow phone target used in QA). Rules:

- Side gutter never below 16px.
- The header ticker is `hidden sm:block`, correct: a marquee at phone width is noise.
- Filter chip rows scroll horizontally with `.scrollbar-hide` rather than wrapping.
- Tables, code blocks, and charts get their own `overflow-x: auto` container. The page
  body must never scroll horizontally.

---

## 8. Component vocabulary

Defined in `app/globals.css` `@layer components`. Reuse these; do not re-implement.

| Class | What it is | Where |
|---|---|---|
| `.card-brutal` | 2px border, `shadow-brutal`, hover snaps 3px toward viewer into `shadow-brutal-lg` | Work, projects, repos |
| `.sticker` / `.sticker-hot` / `.sticker-lime` | Bordered micro-caps chip | Tags, labels |
| `.caps-caption` / `-strong` | Mono micro uppercase, `0.14em` tracking | Eyebrows, metadata |
| `.display-hero` / `.display-headline` | Serif display ramp with responsive steps | Page H1s |
| `.column-numeral` | Big italic serif `01`, hot orange | Section markers |
| `.rule-thick` / `.rule-thin` | Horizontal dividers | Section breaks |
| `.ticker-track` | Marquee track, pairs with `-50%` keyframe | Header, footer |
| `.text-outline` / `-thick` | Stroked display type, no fill | Sculptural moments at 8rem+ |

### Shadows

Brutalist, hard, zero blur, tied to `--foreground`:

```
brutal-sm   3px 3px 0 0 hsl(var(--foreground))
brutal      6px 6px
brutal-lg   10px 10px
```

Binding the offset to `--foreground` rather than black is deliberate and correct.
Material's dark-theme guidance notes that a black drop shadow reads as nothing on a
dark ground; because this token inverts with the theme, the offset stays visible in
both modes.

### Target sizes

[WCAG 2.2 SC 2.5.8 Target Size (Minimum), **AA**](https://www.w3.org/TR/WCAG22/) requires
**24×24 CSS px** for interactive targets.

- Button `default` 40px, `lg` 48px, `sm` 32px, `icon` 40px. All pass.
- Tag filter chips ≈28px. Pass.
- **`.sticker` computes to ≈22px.** Fine as a *label*, which is its only current use.
  **If you ever make a sticker clickable, raise its padding to clear 24px.**

---

## 9. Accessibility floor

This is the non-negotiable part. Maximalism does not buy an exemption.

**We hold ourselves to WCAG 2.2 Level AA**, with AAA where it is cheap.

| Criterion | Level | Our commitment |
|---|---|---|
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 normal, 3:1 large. **Passing in both themes** as of 2026-09-15, see §5. |
| 1.4.11 Non-text Contrast | AA | 3:1 for borders, focus ring, UI components. Passes (borders 17.7, ring 4.63). |
| 2.4.7 Focus Visible | AA | `:focus-visible` applies `ring-2 ring-accent-hot ring-offset-2`. |
| 2.4.11 Focus Not Obscured | AA (new in 2.2) | Sticky header must never fully cover a focused element. `scroll-mt-16` on headings helps. |
| 2.5.8 Target Size (Min) | AA (new in 2.2) | 24×24px. See §8. |
| 2.2.2 Pause, Stop, Hide | **A** | Both marquees carry a pause control via `<Marquee>`. Passing. |
| 2.3.1 Three Flashes | A | Nothing flashes. Pass. |
| 2.3.3 Animation from Interactions | AAA | `prefers-reduced-motion` honoured. Above requirement. |

**Two things worth knowing:**

1. **No AA criterion mandates honouring `prefers-reduced-motion`.** SC 2.3.3 is AAA.
   The AA-level motion obligations are 2.2.2 and 2.3.1 only. This site honours reduced
   motion anyway, which is the right call.
2. **SC 2.2.2 Pause, Stop, Hide is Level A**, the lowest bar, and it requires that
   auto-moving content lasting more than five seconds be pausable. Reduced-motion
   suppression alone does not satisfy it, because it only helps users who have set that
   preference. Both marquees therefore render a real pause toggle
   (`components/marquee.tsx`), and the control is itself hidden under reduced motion
   where there is nothing left to pause.

**Any new auto-moving content must use `<Marquee>` or ship its own pause control.**

Also required: `SkipNav` links stay first in tab order; every `img` carries real alt
text; every chart `<svg>` carries `role="img"` with `<title>` and `<desc>` referenced
by `aria-labelledby`.

---

## 10. Motion

- **Approach:** intentional, not expressive. Motion clarifies state; it does not perform.
- **Durations:** 150–200ms for small transitions, 300–400ms for larger ones
  ([Material, Duration & easing](https://m1.material.io/motion/duration-easing.html)).
  Scale by distance travelled rather than picking one global value. The often-quoted
  "under 100ms is jarring, over 500ms is sluggish" band is secondary-source folklore;
  Material's range is the defensible citation.
- **Library:** Framer Motion for entrance and layout; CSS keyframes for marquees.
- **Reduced motion — two mechanisms, both required.**

  1. **CSS animations:** the `@media (prefers-reduced-motion: reduce)` block at the
     foot of `globals.css` kills every marquee, spin, float, fade, bounce and ping,
     and disables smooth scroll. **Any new named animation must be added to that
     list.**
  2. **Framer Motion:** `components/motion-provider.tsx` wraps the tree in
     `<MotionConfig reducedMotion="user">`. Framer drives motion from JS and is
     completely invisible to the CSS block — for a long time every entrance
     transform on the site kept running for users who had asked for less motion.
     **Anything animated with Framer is covered only because that provider exists.
     Do not remove it.**

  Per [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion),
  `reduce` means remove *motion*, not all animation: opacity and colour transitions
  may stay, transforms and parallax are what to drop. `reducedMotion="user"` applies
  exactly that rule.

  **One deliberate exception:** `animate-pulse` is not in the CSS list. It is
  opacity-only and it carries the loading affordance on every skeleton, so
  suppressing it would remove information rather than motion.
- **Vestibular triggers to avoid:** scaling, panning, parallax, large-object movement
  ([web.dev](https://web.dev/learn/accessibility/motion)).

---

## 11. Dark mode

Class-based via `next-themes`, `darkMode: ["class"]`.

**Strategy: invert the neutrals, brighten the accents, never use pure black or pure white.**

- Background is `240 12% 7%`, not `#000`. Material's dark surface guidance (base
  `#121212`) exists because saturated colour against pure black produces excessive
  contrast and eye strain.
- Accents go *brighter* in dark mode (hot orange L 48% → 62%, lime 50% → 62%). The
  audit confirms this is correct: every dark-mode pair lands AA or AAA.
- Elevation is expressed by border and surface lightening (`--card` at 10% L against
  `--background` at 7%), not by drop shadows.

**Two traps, both of which have already bitten this codebase:**

1. **Semantic tokens invert.** `bg-foreground text-background` produces a dark block in
   light mode and a *light* block in dark mode. If you want a surface that stays the
   same in both themes, do not use the inverting pair. The footer shipped inverted for
   exactly this reason and had to be rewritten to plain `bg-background text-foreground`.
2. **Do not shrink type in dark mode.** NN/g's review
   ([Budiu, 2020](https://www.nngroup.com/articles/dark-mode/)) found light mode's
   legibility advantage *grows as font size shrinks*, so the 11px `micro` tier is
   already the most fragile thing on the page in dark mode.

---

## 12. Repo-specific constraints

Hard-won. Each of these has cost real debugging time.

### MDX silently drops `style`

**In `content/blog/*.mdx`, JSX `style={{...}}` props and `<style>` element children
are stripped by the MDX pipeline with no build error.** The rendered HTML contains
`<style></style>` and elements with no style attribute.

Plain attributes survive. Verified: `<rect fill="#3b82f6">` passes through intact, and
`textAnchor` correctly becomes `text-anchor`, so React's SVG mapping *is* running.

**Therefore, in MDX:**
- Use presentation attributes: `fill="#f9fafb"`, `fontSize="15"`, `fontWeight="600"`.
- For a chart background, draw an explicit `<rect>`; do not rely on a `style` background.
- Never use a `<style>` block inside an SVG in MDX.

### Charts are fixed dark cards in both themes

Chart SVGs paint their own `#0f172a` ground and use light text. This is deliberate:
they read as self-contained data cards and are identical in both themes, which avoids
maintaining two colour sets. Verified contrast on that ground: title 17.08,
labels 14.42, captions 7.03. All AAA.

### CSS specificity around code blocks

`highlight.js` (github-dark) owns token colours inside fenced blocks via `.hljs`
(specificity 0,1,0). Any rule that sets `color` on `.markdown pre code` (0,1,2) or
`.dark .markdown code` (0,2,1) **out-specifies it** and breaks syntax highlighting.
Both mistakes have shipped here before.

Rule: style inline code with `.markdown :not(pre) > code`. Leave fenced-block colour
to highlight.js, apart from the single base `.markdown pre code.hljs` colour.

### Blog code blocks are the one sanctioned `zinc` exception

§13 says "no hardcoded hex or raw Tailwind palette colour". Three rules in the
`.markdown` block break that **deliberately**:

| Rule | Value | Why |
|---|---|---|
| `.markdown pre` | `bg-zinc-900` | The ground the github-dark theme was designed against. |
| `.markdown pre code.hljs` | `text-zinc-100` | Base token colour the theme expects. |
| `.dark .markdown :not(pre) > code` | `bg-zinc-800/60` | Lifts inline code off the dark page ground. |

These pair with an imported third-party stylesheet, so they cannot be expressed as
semantic tokens without forking the theme. Like the charts (below), code blocks read as
fixed dark cards in both themes. **This is the only place raw palette colour is allowed.
Anywhere else, it is drift.**

### Static export

`output: "export"`. No `next/image` optimization (`images.unoptimized: true`), no
runtime. Every dynamic route needs `generateStaticParams`. Anything that looks like it
needs a server does not belong in a visual change.

---

## 13. Review checklist

Before shipping any visual change:

- [ ] Renders correctly in **light and dark**, checked separately.
- [ ] Renders at **390px** with no horizontal page scroll and ≥16px side gutter.
- [ ] Text contrast ≥4.5:1 normal, ≥3:1 large. Micro (11px) type counts as **normal**.
- [ ] Interactive targets ≥24×24px.
- [ ] Focus visible on every interactive element, and not obscured by the sticky header.
- [ ] Any new animation added to the `prefers-reduced-motion` block.
- [ ] Uses existing component classes rather than a new one-off pattern.
- [ ] No hardcoded hex or raw Tailwind palette colour; semantic tokens only.
      *(The component layer is currently clean on this. Keep it that way.)*
- [ ] If MDX: no `style={{}}`, no `<style>` blocks. Build and grep the output HTML.
- [ ] `pnpm run predeploy` passes. `npx tsc --noEmit` passes.
      (`pnpm run lint` is broken: Next 16 removed `next lint` and ESLint 9 needs flat config.)

---

## 14. Open items

**Open issues now live in [`ISSUES.md`](./ISSUES.md), which is authoritative.** A
full-app audit against this document on 2026-09-15 found 24 open items, including six
that breach the §9 accessibility floor. Fifteen were fixed the same day — **all six P0s
are closed**, along with the accuracy problems in this document itself. **9 remain
open**, two of which are design decisions rather than defects. `ISSUES.md` carries the
priority order. Do not treat the list below as current — it is the historical record of
what was closed on the day this document was written.

Known contradictions between *this document* and the code are logged as P2-021 through
P2-023: the §5 contrast table is incomplete and its dark `--paper` value is wrong, §6's
justification for exempting `h1` from the measure cites a rule that does not exist, §8
mismeasures `.sticker` as 22px when it computes to 24px, and §13's "no raw palette
colour" rule does not acknowledge the deliberate `zinc` pairing in blog prose. Fix the
document alongside the code.

**Resolved**

| Date | Item |
|---|---|
| 2026-09-15 | `--accent-hot` 3.53:1 AA failure across 108 usages. Now 4.63:1. |
| 2026-09-15 | `--success` 2.62:1 and `--destructive` 3.96:1 AA failures. Now 4.57 and 4.59. |
| 2026-09-15 | Prose measure ~105ch. Now capped at 68ch, with figures and code breaking out. |
| 2026-09-15 | Marquees had no pause control (WCAG 2.2.2, Level A). Now use `<Marquee>`. |
| 2026-09-15 | `lib/design-system/` dead and contradictory. Deleted; `ui/card.tsx` made self-contained. |
| 2026-09-15 | Duplicate `og:image` across 5 posts. Removed the metadata override so the per-post generator applies. |

**Known non-issues** (documented so they are not "fixed" by mistake):

- `--accent-lime` measures 1.27:1 as a text colour on paper. Correct: it is a
  background-only token, always paired with ink via `--accent-lime-foreground`.
- `components/loading-states.tsx` is currently unreferenced (live code imports
  `ui/skeleton` instead). Harmless, left in place.

---

## 15. Decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-09-15 | DESIGN.md created | Documented the implemented system rather than proposing a new one; the editorial-tech direction is established and shipping. |
| 2026-09-15 | Contrast audited from real token values | Code comments claimed ratios that did not hold. Three light-mode failures found and fixed. |
| 2026-09-15 | Light-mode accents darkened to clear AA | Chose accessibility over the exact original hue. Orange reads deeper in light mode; dark mode unchanged. |
| 2026-09-15 | Measure capped on children, not the container | Keeps prose at 68ch while figures, code and tables keep the full column. Narrowing the container would have squeezed the 640px charts. |
| 2026-09-15 | Shared `<Marquee>` with a pause control | SC 2.2.2 is Level A and reduced-motion alone does not satisfy it. One component so the header and footer cannot drift apart. |
| 2026-09-15 | `lib/design-system/` deleted rather than rewritten | Nothing imported it, and a second "token" location invites drift. One source of truth. |
| 2026-09-15 | Blog `og:image` override removed | `opengraph-image.tsx` already generates a distinct per-post card; the explicit `images` key was overriding it with a shared photo. |
| 2026-09-15 | Charts fixed as dark cards in both themes | Avoids maintaining two colour sets; MDX cannot carry `style` props reliably. |
| 2026-09-14 | Footer stopped inverting with theme | Inverted semantic pair produced a light footer in dark mode. |
| 2026-09-14 | Inline code scoped with `:not(pre)` | Prior rule out-specified `.hljs` and broke fenced-block highlighting. |
