# Portfolio Website Redesign Plan

> Expert UI/UX + React Developer Analysis — February 2026

## Current State Assessment

### Strengths
- Next.js 15 + React 19 + TypeScript (modern stack)
- Dark/light mode with CSS variables
- Framer Motion animations
- Responsive layout
- MDX blog with reading-time and search
- JSON-LD schema markup for SEO
- Google Analytics integrated

### Critical Gaps (vs. industry leaders: Lee Robinson, Josh Comeau, Linear, Vercel)

| Area | Current State | Industry Standard |
|------|--------------|-------------------|
| Hero Layout | Side-by-side avatar + text | Bento grid with metrics, terminal animation, CTAs |
| Visual Hierarchy | Monotonous blue color palette | Multi-tone with intentional accent colors |
| Narrative Hook | Generic "About Me" paragraph | Quantified impact (7+ years, 30+ projects, X teams led) |
| CTAs | "Available for work" badge only | Download Resume + Contact buttons |
| Experience | Text list of responsibilities | Visual timeline with company logos, impact metrics |
| Skills | Flat color-coded badges | Proficiency bars / radar chart / grouped cards |
| Projects | Section commented out | Filterable cards with live demo + code links |
| Contact | Email address only | Fully functional contact form |
| Testimonials | None | Colleague/client quotes |
| Blog UX | Basic card grid | Featured post hero, category pills, reading time visible |
| Navigation | Basic links | Active indicator, command palette (⌘K) |
| Loading | Per-page skeletons | Smooth route transitions + progress bar |
| Performance | No `next/font` optimization | Optimized font loading, LCP < 1.5s |
| OG Images | Static PNG | Dynamic OG images via @vercel/og |
| Animations | Scroll fade-in only | Scroll-driven, parallax, micro-interactions |

---

## Redesign Principles

1. **Clarity over cleverness** — Every element must serve a purpose
2. **Performance first** — Core Web Vitals all green
3. **Accessible by default** — WCAG 2.1 AA, `prefers-reduced-motion` respected
4. **Content-driven design** — Typography and spacing carry the weight
5. **Dark mode as first class** — Both modes are equally polished

---

## Issue Breakdown (11 Issues)

### Issue 1: Hero Section — Bento Grid + Terminal Animation + Metrics
Redesign the hero into a bento grid with terminal code animation, animated metrics counters, and dual CTA buttons.

### Issue 2: Navigation — Active States + Command Palette (⌘K)
Add active route indicators, scroll-triggered nav blur, and implement a command palette for keyboard-first navigation.

### Issue 3: Experience Page — Visual Timeline with Impact Metrics
Transform the text-heavy experience section into a scroll-animated vertical timeline with company logos, role badges, date ranges, and quantified impact bullets.

### Issue 4: Projects Section — Filterable Cards with GitHub Live Data
Re-enable the GitHub projects section, add tag-based filtering, tech stack badges, star counts, and links to live demos + repos.

### Issue 5: Skills — Proficiency Visualization
Replace flat badge grid with grouped skill cards (Frontend / Backend / Cloud / DevOps) with proficiency indicators and technology logos.

### Issue 6: Contact Page — Full Contact Form
Create a dedicated `/contact` page with a validated contact form (react-hook-form + zod), toast feedback, and email delivery.

### Issue 7: Blog UX — Featured Post Hero + Category Filtering
Add a full-width featured post hero, horizontal category filter chips, and improved card design with larger cover images and tags.

### Issue 8: Testimonials Section
Add a testimonials carousel on the homepage with colleague/client quotes, avatars, and role attribution.

### Issue 9: Dynamic OG Images via @vercel/og
Generate per-page Open Graph images dynamically using @vercel/og for better social sharing appearance.

### Issue 10: Performance & Core Web Vitals Audit
Optimize LCP, CLS, and INP — implement `next/font`, image optimization audit, dynamic imports, and bundle analysis.

### Issue 11: Micro-interactions & Scroll-Driven Animations
Add cursor glow effect, card tilt on hover (Framer Motion 3D), scroll progress indicator in header, and parallax on hero background.

---

## Phased Implementation

### Phase 1 — Foundation (Issues 1, 2, 10)
Core visual identity and performance baseline

### Phase 2 — Content Sections (Issues 3, 4, 5)
Rich data presentation and interactivity

### Phase 3 — Engagement (Issues 6, 7, 8)
User interaction, blog polish, social proof

### Phase 4 — Polish (Issues 9, 11)
Dynamic OG, advanced animations, micro-interactions

---

## Success Metrics
- Lighthouse Performance > 95
- Lighthouse Accessibility > 95
- LCP < 1.5s
- CLS < 0.1
- INP < 200ms
- All animations respect `prefers-reduced-motion`
