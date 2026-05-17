#!/bin/bash
# ============================================================
# Portfolio Redesign — GitHub Issues Creation Script
# Usage: GH_TOKEN=<your-token> bash scripts/create-github-issues.sh
# ============================================================

REPO="basilinjoe/basilinjoe.github.io"
API="https://api.github.com"

if [ -z "$GH_TOKEN" ]; then
  echo "Error: GH_TOKEN environment variable is required"
  echo "Usage: GH_TOKEN=ghp_xxxx bash scripts/create-github-issues.sh"
  exit 1
fi

create_issue() {
  local title="$1"
  local body="$2"
  local labels="$3"

  curl -s -X POST \
    -H "Authorization: token $GH_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Content-Type: application/json" \
    -d "{\"title\": $(echo "$title" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()))'), \"body\": $(echo "$body" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()))'), \"labels\": $labels}" \
    "$API/repos/$REPO/issues" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(f"Created: #{d[\"number\"]} — {d[\"title\"]}")'
}

echo "Creating GitHub issues for Portfolio Redesign..."
echo "Repository: $REPO"
echo "---"

# ============================================================
# Issue 1: Hero Section Redesign
# ============================================================
create_issue \
  "[REDESIGN] Issue 1: Hero Section — Bento Grid + Terminal Animation + Metrics" \
'## Overview
Redesign the hero / profile section into a modern, high-impact **bento grid layout** with a terminal-style code animation and animated metrics counters.

## Current Problems
- Avatar + text side-by-side is a generic, low-impact layout
- No above-the-fold narrative hook or quantified achievements
- No prominent CTA (Download Resume, Contact Me)
- The `InteractiveHero` component adds visual noise without clear UX value
- Color palette is monotonous — only blue/primary used

## Proposed Design

### Bento Grid Layout (3-col desktop, 2-col tablet, stacked mobile)
```
┌─────────────────────────┬──────────────┐
│  Name, Title, Tagline   │   Avatar     │
│  CTAs: Resume | Contact │  + Status    │
├──────────────┬──────────┴──────────────┤
│  Terminal    │  Metrics Counter Card   │
│  Animation   │  7+ yrs | 30+ projects  │
└──────────────┴─────────────────────────┘
```

### Terminal Animation Card
Typewriter animation with cursor blink:
```
> whoami
basilinjoe
> role
Technology Lead & Cloud Architect
> expertise
Azure · Kubernetes · React · .NET
> status
✓ Available for opportunities
```

### Animated Metrics
Numbers count up when in viewport using `framer-motion` + `useInView`:
- **7+** Years of Experience
- **30+** Projects Delivered
- **5** Roles Progressed Through

### CTA Buttons
- **Primary:** "Download Resume" → `/resume.pdf`
- **Secondary:** "Get In Touch" → `/contact`

## Acceptance Criteria
- [ ] Bento grid responsive on all breakpoints
- [ ] Terminal animation runs on load, loops after 10s pause
- [ ] Metrics count up when section enters viewport
- [ ] Both CTA buttons functional
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Dark and light mode both polished
- [ ] Lighthouse performance not degraded

## Tech Stack
- `framer-motion` (existing) for animations
- `useInView` for scroll trigger
- Tailwind CSS grid for bento layout
- Custom `TerminalCard` component' \
  '["enhancement", "ui/ux", "high-priority"]'

# ============================================================
# Issue 2: Navigation — Active States + Command Palette
# ============================================================
create_issue \
  "[REDESIGN] Issue 2: Navigation — Active Route Indicators + Command Palette (⌘K)" \
'## Overview
Enhance the site header with active route indicators, scroll-triggered glassmorphism background, and a command palette for keyboard-first navigation.

## Current Problems
- No visual indicator for the currently active page
- Header has no scroll effect (same appearance at top and scrolled)
- No keyboard navigation shortcut
- Mobile nav lacks smooth animation

## Proposed Changes

### Active Route Indicators
- Underline/dot indicator on current page nav item
- Use Next.js `usePathname()` to detect active route
- Smooth color transition on active state

### Scroll-Triggered Header
```css
/* At top: transparent or minimal border */
/* Scrolled: blur backdrop, subtle border, shadow */
background: rgba(var(--background), 0.8);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(var(--border), 0.5);
```

### Command Palette (⌘K / Ctrl+K)
Implement a `CommandDialog` (using existing Radix Dialog) with:
- Navigation: Home, Experience, Projects, Blog
- Actions: Toggle theme, Copy email, Download resume
- Recent: Last 3 blog posts
- Keyboard shortcut: `⌘K` / `Ctrl+K`

## Acceptance Criteria
- [ ] Active page clearly indicated in nav
- [ ] Header background transitions on scroll
- [ ] Command palette opens with ⌘K / Ctrl+K
- [ ] Command palette has navigation + action items
- [ ] Full keyboard accessibility (arrow keys, Enter, Escape)
- [ ] Mobile nav has slide animation with overlay backdrop

## Tech Stack
- `usePathname` from `next/navigation`
- Existing `Dialog` from Radix UI / shadcn/ui
- `cmdk` library for command menu or custom implementation' \
  '["enhancement", "ui/ux", "high-priority"]'

# ============================================================
# Issue 3: Experience Page — Visual Timeline
# ============================================================
create_issue \
  "[REDESIGN] Issue 3: Experience Page — Animated Visual Timeline with Impact Metrics" \
'## Overview
Transform the text-heavy experience section into a scroll-animated vertical timeline with company logos, role progression, and quantified impact statements.

## Current Problems
- Long unordered list of responsibilities with no visual hierarchy
- No date ranges shown (only start date)
- No company logos or visual identity
- No quantified impact metrics in descriptions
- Page feels like a resume dump, not a career story

## Proposed Design

### Visual Timeline Component
```
Company A (2022 - Present)          [Logo]
    │
    ├── Technology Lead ──── (Apr 2022 - Present)
    │   ┌─────────────────────────────────────┐
    │   │ ✦ Led 8-person cross-functional team│
    │   │ ✦ Reduced deployment time by 60%    │
    │   │ ✦ Architected 15+ Azure solutions   │
    │   │ [Azure] [K8s] [React] [Bicep]       │
    │   └─────────────────────────────────────┘
    │
    ├── Lead Software Engineer ─── (Apr 2020 - Apr 2022)
    │   ...
```

### Key Changes
- Vertical timeline with connector line
- Company card with logo, link, employment period
- Role cards with start/end dates derived from config
- Impact-focused bullets (quantified where possible)
- Tech stack badges per role (already in config)
- Scroll-triggered animation (each card slides in)
- "Currently working here" badge with pulsing dot

### Config Updates
- Add `endDate` field to roles (for completed positions)
- Add `company.logo` field for company logo images

## Acceptance Criteria
- [ ] Vertical timeline with connecting line
- [ ] Company header with logo (or letter avatar fallback)
- [ ] Role cards with date ranges computed from config
- [ ] Tech badges per role
- [ ] Scroll-triggered animations (respects reduced-motion)
- [ ] Current role indicated with "Present" badge + pulse
- [ ] Responsive: mobile stacks cleanly

## Files to Modify
- `config/site.ts` — add `endDate` and optional `logo` to experience
- `components/about-page.tsx` — full redesign
- New: `components/timeline/timeline-item.tsx`
- New: `components/timeline/company-card.tsx`' \
  '["enhancement", "ui/ux", "medium-priority"]'

# ============================================================
# Issue 4: Projects Section
# ============================================================
create_issue \
  "[REDESIGN] Issue 4: Projects Section — Filterable Cards with Live GitHub Data" \
'## Overview
Re-enable and redesign the GitHub projects section with filterable cards, live repo statistics, and technology stack badges.

## Current Problems
- GitHub projects section is **commented out** in `home-page.tsx`
- Projects page exists but has basic styling
- No filtering by technology
- No live demo links
- GitHub API data not fully utilized (stars, language, etc.)

## Proposed Design

### Project Cards
Each card shows:
- Repository name + description
- Language/tech stack badges (from GitHub `topics` or derived from name)
- ⭐ Stars count
- 🍴 Fork count
- 📅 Last updated
- Links: [View Code] [Live Demo] (if available)
- Animated hover: subtle lift + border glow

### Filtering System
Technology filter chips above the grid:
```
[All] [React] [Azure] [Python] [.NET] [DevOps]
```
Filter by repo `topics` from GitHub API.

### Featured Projects
Pin 3 projects as "Featured" with larger cards (col-span-2).

### Homepage Integration
Re-enable `<GithubProjects />` on homepage showing top 3 projects.

## Acceptance Criteria
- [ ] Projects section re-enabled on homepage (top 3)
- [ ] Projects page shows all repos with filter chips
- [ ] Filter chips update displayed projects instantly
- [ ] Each card shows: stars, forks, language, description
- [ ] Hover animation: lift + border glow
- [ ] Loading skeleton while fetching GitHub API
- [ ] Error state with fallback message
- [ ] Live demo link shown when `homepage` is set on repo

## Files to Modify
- `components/home-page.tsx` — re-enable GithubProjects
- `components/sections/github-projects.tsx` — redesign cards
- `components/projects-page-new.tsx` — add filtering
- `lib/github.ts` — add topics fetching' \
  '["enhancement", "ui/ux", "medium-priority"]'

# ============================================================
# Issue 5: Skills Proficiency Visualization
# ============================================================
create_issue \
  "[REDESIGN] Issue 5: Skills Section — Proficiency Cards with Technology Logos" \
'## Overview
Replace the flat badge grid with grouped skill cards featuring technology logos, proficiency levels, and category organization.

## Current Problems
- All skills look the same — no visual differentiation of proficiency
- Small icon + text badge doesn'"'"'t convey expertise level
- No technology logos (just lucide icons)
- Skills and Tools are separate but should be more integrated
- No years of experience per skill shown

## Proposed Design

### Grouped Skill Cards with Proficiency
Four category cards in a 2×2 grid:

```
┌─────────────────────┐  ┌─────────────────────┐
│   ☁️ Cloud & DevOps  │  │   🖥️ Backend          │
│                     │  │                     │
│  Azure ████████░░  │  │  .NET  ████████░░  │
│  AWS   ██████░░░░  │  │  Python ████████░░  │
│  K8s   ████████░░  │  │  SQL    ███████░░░  │
│  Docker ████████░░ │  │  C#     █████████░  │
└─────────────────────┘  └─────────────────────┘
┌─────────────────────┐  ┌─────────────────────┐
│   ⚛️ Frontend        │  │   🛠️ Tools            │
│                     │  │                     │
│  React  █████████░  │  │  VS Code  (icon)    │
│  Next.js ████████░  │  │  GitHub   (icon)    │
│  TypeScript ████░   │  │  Azure DevOps (icon)│
│  Angular  ██████░   │  │  Jira     (icon)    │
└─────────────────────┘  └─────────────────────┘
```

### Proficiency Scale
Use existing experience data to derive proficiency:
- Expert (90%+): Azure, React, TypeScript, .NET, Docker
- Advanced (75%+): AWS, Kubernetes, Python, Angular
- Proficient (60%+): Terraform, Bicep, Redis

### Config Update
Add `proficiency` field to skills in `config/site.ts`:
```ts
skills: [
  { name: "Azure", category: "cloud", proficiency: 95 },
  ...
]
```

## Acceptance Criteria
- [ ] Skills grouped into 4 categories
- [ ] Proficiency bars animated on viewport entry
- [ ] Technology logos via `simple-icons` or SVG assets
- [ ] Hover reveals years of experience tooltip
- [ ] Mobile: cards stack in single column
- [ ] Dark/light mode polished for all cards

## Libraries
- `simple-icons` for technology logos
- `framer-motion` for bar animations' \
  '["enhancement", "ui/ux", "medium-priority"]'

# ============================================================
# Issue 6: Contact Page
# ============================================================
create_issue \
  "[REDESIGN] Issue 6: Contact Page — Full Form with Validation and Toast Feedback" \
'## Overview
Create a dedicated `/contact` page with a validated contact form, social links, and location info.

## Current Problems
- Only an email address is shown in the profile section
- No contact form exists anywhere
- "Available for work" badge has no actionable next step
- Clicking "Get In Touch" CTA (from Issue 1) has nowhere to go

## Proposed Design

### Page Layout
```
┌────────────────────────────────────────┐
│  Let'"'"'s Work Together                    │
│  I'"'"'m open to new opportunities...       │
│                                        │
│  ┌──────────────┐  ┌────────────────┐ │
│  │   Contact    │  │   Send a       │ │
│  │   Info       │  │   Message      │ │
│  │              │  │                │ │
│  │ 📍 Location  │  │  Name: ___     │ │
│  │ 📧 Email     │  │  Email: ___    │ │
│  │ 💼 LinkedIn  │  │  Subject: ___  │ │
│  │ 🐙 GitHub    │  │  Message: ___  │ │
│  │              │  │  [Send →]      │ │
│  └──────────────┘  └────────────────┘ │
└────────────────────────────────────────┘
```

### Form Validation
Use `react-hook-form` + `zod` schema:
- Name: required, min 2 chars
- Email: required, valid email format
- Subject: required, min 5 chars
- Message: required, min 20 chars, max 500 chars

### Form Submission
Options (in order of preference):
1. Formspree or EmailJS (no backend needed)
2. Next.js API route with Nodemailer
3. Resend API

### Success/Error Feedback
Use existing `sonner` toast library:
- Success: "Message sent! I'"'"'ll get back to you within 24 hours."
- Error: "Something went wrong. Please email me directly."

### Route Updates
- Add `/contact` to `siteConfig.mainNav`
- Update "Get In Touch" CTA from hero to link to `/contact`
- Add contact link in site footer

## Acceptance Criteria
- [ ] `/contact` route created and added to nav
- [ ] Form validates all fields with clear error messages
- [ ] Form submission works (email delivered)
- [ ] Toast notification on success/error
- [ ] Loading state on submit button
- [ ] Honeypot field for spam prevention
- [ ] Social links and contact info on left panel

## New Files
- `app/contact/page.tsx`
- `components/contact-form.tsx`
- `app/api/contact/route.ts` (if using API route)' \
  '["enhancement", "feature", "high-priority"]'

# ============================================================
# Issue 7: Blog UX Improvements
# ============================================================
create_issue \
  "[REDESIGN] Issue 7: Blog — Featured Post Hero + Category Filtering + Card Redesign" \
'## Overview
Upgrade the blog page with a full-width featured post hero, horizontal category filter chips, improved card design, and better content discovery.

## Current Problems
- Blog page opens to a grid of identical small cards — no editorial hierarchy
- Category/tag filtering exists but is visually buried
- Blog post cards are small with minimal visual appeal
- No featured or pinned post concept
- Search input lacks debouncing
- Pagination controls are minimal

## Proposed Design

### Featured Post Hero (top of blog page)
Show the most recent post as a large hero:
```
┌──────────────────────────────────────────┐
│  [Cover Image — full width, 40vh]         │
│  ───────────────────────────────────────  │
│  🏷️ AI  ·  8 min read  ·  Jan 19, 2024   │
│  Autonomous Agents: The Future of AI...   │
│  [Read Article →]                         │
└──────────────────────────────────────────┘
```

### Category Filter Chips
Horizontal scrollable chip row:
```
[All]  [AI]  [DevOps]  [Cloud]  [Web Dev]  [Architecture]
```
- Active chip: filled background
- Filter updates grid instantly (client-side)

### Improved Post Cards
- Larger card with cover image (aspect-video)
- Category badge top-left of image
- Title, excerpt (2 lines truncated)
- Author avatar + name + date + reading time
- Hover: image zoom + card lift

### Search UX
- Add 300ms debounce to search input
- Show "No posts found for X" with clear search link
- Highlight matching text in results

### Reading Progress
- Fix existing `ReadingProgress` component to show in header during article reading

## Acceptance Criteria
- [ ] Featured post hero on blog list page
- [ ] Category filter chips functional
- [ ] Post cards have cover images and improved layout
- [ ] Search debounced at 300ms
- [ ] Reading progress bar visible during blog post reading
- [ ] Pagination has Previous/Next with page numbers
- [ ] Empty state for no results
- [ ] Mobile: filter chips horizontally scrollable

## Files to Modify
- `components/blog-list.tsx`
- `components/blog/blog-post-card.tsx`
- `components/blog/blog-search.tsx`
- `components/blog/tag-filter.tsx`
- `components/blog/reading-progress.tsx`' \
  '["enhancement", "ui/ux", "medium-priority"]'

# ============================================================
# Issue 8: Testimonials Section
# ============================================================
create_issue \
  "[REDESIGN] Issue 8: Testimonials Section — Social Proof Carousel" \
'## Overview
Add a testimonials section to the homepage with colleague/client quotes, avatars, and role attribution to establish social proof.

## Why This Matters
- Social proof is one of the most conversion-driving elements of portfolio sites
- Tech leads hiring or contracting look for evidence of collaboration quality
- Industry-leading portfolios (e.g., senior engineers at top companies) always include recommendations

## Proposed Design

### Testimonial Card
```
┌────────────────────────────────────────┐
│  "Basilin is an exceptional cloud      │
│   architect who delivered our entire   │
│   Azure infrastructure on schedule..." │
│                                        │
│  [Avatar]  John Smith                  │
│            CTO at TechCorp             │
│            ★★★★★                        │
└────────────────────────────────────────┘
```

### Carousel / Grid Layout
- Desktop: 3-column grid of cards
- Tablet: 2-column
- Mobile: Single card with swipe (or auto-scroll)
- Optional: auto-rotate every 5s with pause on hover

### Data Source
Add `testimonials` array to `config/site.ts`:
```ts
testimonials: [
  {
    quote: "...",
    author: "Name",
    role: "CTO at Company",
    avatar: "/testimonials/name.webp",
    linkedin: "https://..."
  }
]
```

### Section Placement
Between Work Highlights and Skills sections on homepage.

## Acceptance Criteria
- [ ] Testimonials section added to homepage
- [ ] Cards show quote, author, role, avatar
- [ ] Responsive: 3-col → 2-col → 1-col
- [ ] Avatar images optimized with next/image
- [ ] Gracefully hides section if no testimonials configured
- [ ] Animation: cards fade in on scroll
- [ ] LinkedIn link opens in new tab with proper rel attributes

## New Files
- `components/sections/testimonials.tsx`
- `public/testimonials/` directory for avatar images
- Updates to `config/site.ts`' \
  '["enhancement", "feature", "low-priority"]'

# ============================================================
# Issue 9: Dynamic OG Images
# ============================================================
create_issue \
  "[REDESIGN] Issue 9: Dynamic Open Graph Images via @vercel/og" \
'## Overview
Replace the static `og-default.png` with dynamically generated Open Graph images per page and blog post using `@vercel/og`.

## Current Problems
- All pages share one static OG image (`/images/og-default.png`)
- Blog posts show generic OG instead of post-specific image
- No brand consistency in social sharing previews
- Missing opportunity for viral sharing of blog posts

## Proposed Design

### OG Image Templates

**Default (Homepage)**
```
┌─────────────────────────────────────┐
│  [Background: gradient]              │
│                                     │
│  Basilin Joe                        │
│  Technology Lead & Cloud Architect  │
│                                     │
│  basilinjoe.github.io               │
└─────────────────────────────────────┘
```

**Blog Post**
```
┌─────────────────────────────────────┐
│  [Post cover image or gradient]      │
│                                     │
│  Post Title (large)                 │
│  Category  ·  Date  ·  Read time    │
│                                     │
│  [Avatar]  Basilin Joe              │
└─────────────────────────────────────┘
```

### Implementation
Using Next.js built-in `ImageResponse` from `next/og`:

```ts
// app/og/route.tsx
import { ImageResponse } from '"'"'next/og'"'"'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('"'"'title'"'"') || '"'"'Basilin Joe'"'"'

  return new ImageResponse(
    <div style={{ ... }}>
      {title}
    </div>,
    { width: 1200, height: 630 }
  )
}
```

### Route Updates
Update all page metadata to use dynamic OG URL:
```ts
// In each page.tsx
openGraph: {
  images: [`/og?title=${encodeURIComponent(title)}&type=blog`]
}
```

## Acceptance Criteria
- [ ] `/og` API route generates 1200×630 images
- [ ] Homepage OG shows name, title, tagline
- [ ] Blog post OG shows post title, category, date
- [ ] Projects page OG shows "Open Source Projects" variant
- [ ] Experience page OG shows "7+ Years Experience" messaging
- [ ] Images use consistent brand colors and fonts
- [ ] OG images preview correctly in social sharing validators

## New Files
- `app/og/route.tsx` — ImageResponse handler
- Updates to all `page.tsx` metadata exports' \
  '["enhancement", "seo", "medium-priority"]'

# ============================================================
# Issue 10: Performance & Core Web Vitals
# ============================================================
create_issue \
  "[REDESIGN] Issue 10: Performance Audit — Core Web Vitals Optimization" \
'## Overview
Conduct a comprehensive performance audit and optimize Core Web Vitals to achieve Lighthouse scores > 95 across all categories.

## Current Performance Issues

### Identified Problems
1. **Font loading**: Geist font via `geist` npm package — verify font-display strategy
2. **Animation on load**: Framer Motion animations may cause layout shifts (CLS)
3. **No bundle analysis**: Unknown if dependencies are tree-shaken
4. **Images**: Next.js Image used but `unoptimized: true` in `next.config.js` for static export
5. **No route prefetching strategy**: Default Next.js prefetching may load too much
6. **No `<link rel="preconnect">`**: External resources not preconnected

### Target Metrics
| Metric | Target | Current (est.) |
|--------|--------|----------------|
| LCP | < 1.5s | Unknown |
| CLS | < 0.1 | Unknown |
| INP | < 200ms | Unknown |
| Lighthouse Performance | > 95 | Unknown |
| Lighthouse Accessibility | > 95 | Unknown |
| Lighthouse SEO | > 95 | Unknown |

## Proposed Optimizations

### 1. Bundle Analysis
```bash
npx @next/bundle-analyzer
```
Identify and eliminate unused dependencies.

### 2. Dynamic Imports
```ts
// Lazy load heavy sections
const FeaturedPosts = dynamic(() => import("./sections/featured-posts"), {
  loading: () => <FeaturedPostsSkeleton />
})
```

### 3. Font Optimization
```ts
// Use next/font for optimal loading
import { Geist } from "next/font/google"
const geist = Geist({ subsets: ["latin"], display: "swap" })
```

### 4. Image Strategy for Static Export
For GitHub Pages (static export), use a service like Cloudinary or imgix for optimization, or ensure proper sizing with `sizes` attribute.

### 5. Animation Performance
- Use `will-change: transform` on animated elements
- Ensure `transform` and `opacity` only (GPU composited)
- Add `prefers-reduced-motion` media query respect globally

### 6. Resource Hints
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://github.com" />
```

## Acceptance Criteria
- [ ] Lighthouse Performance ≥ 95 on production build
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse SEO ≥ 95
- [ ] LCP < 1.5s on mobile 4G simulation
- [ ] CLS < 0.1 on all pages
- [ ] Bundle size analyzed and documented
- [ ] All animations GPU-composited
- [ ] `prefers-reduced-motion` respected globally
- [ ] No render-blocking resources

## Tools
- `@next/bundle-analyzer`
- Chrome DevTools Lighthouse
- WebPageTest for real-world measurement' \
  '["performance", "enhancement", "high-priority"]'

# ============================================================
# Issue 11: Micro-interactions & Advanced Animations
# ============================================================
create_issue \
  "[REDESIGN] Issue 11: Micro-interactions — Cursor Glow, Card Tilt, Scroll Progress" \
'## Overview
Add premium micro-interactions and scroll-driven animations to elevate the site from good to exceptional: cursor glow effect, 3D card tilt, header scroll progress bar, and parallax on hero background.

## Proposed Interactions

### 1. Cursor Glow Effect
A soft radial glow follows the cursor on desktop:
```ts
// Track mouse position and render a gradient overlay
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

// CSS gradient that follows cursor
background: `radial-gradient(600px at ${x}px ${y}px,
  rgba(29, 78, 216, 0.15), transparent 80%)`
```

### 2. 3D Card Tilt (Framer Motion)
Cards tilt slightly on hover using `rotateX` and `rotateY`:
```ts
// Using framer-motion useMotionValue + useTransform
const x = useMotionValue(0)
const y = useMotionValue(0)
const rotateX = useTransform(y, [-100, 100], [10, -10])
const rotateY = useTransform(x, [-100, 100], [-10, 10])
```
Apply to: project cards, skill cards, blog post cards.

### 3. Header Scroll Progress Bar
A thin progress bar at the top of the page showing reading progress (similar to Medium):
- Only visible on blog post pages
- Uses `useScroll` from framer-motion
- Primary color, full width at bottom of header

### 4. Parallax Hero Background
The hero background (`HeroAnimation`) should move at 0.5x scroll speed:
```ts
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, 200])
```

### 5. Magnetic Buttons
CTA buttons slightly attract the cursor within a 50px radius:
```ts
// Slightly offset button toward cursor on hover
const offsetX = useTransform(mouseX, [0, 100], [-5, 5])
```

### 6. Page Transition Animation
Smooth fade between routes using Framer Motion `AnimatePresence`:
```tsx
<AnimatePresence mode="wait">
  <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {children}
  </motion.div>
</AnimatePresence>
```

## Acceptance Criteria
- [ ] Cursor glow visible on desktop (hidden on touch devices)
- [ ] Card tilt on all card components
- [ ] Progress bar on blog post pages only
- [ ] Parallax hero reduces motion at 50% speed
- [ ] Page transitions smooth (< 300ms)
- [ ] All effects disabled when `prefers-reduced-motion: reduce`
- [ ] No performance regression (CLS unchanged, INP < 200ms)
- [ ] Touch devices: cursor glow and tilt disabled

## New Components
- `components/cursor-glow.tsx`
- `components/tiltable-card.tsx`
- Updates to `components/blog/reading-progress.tsx`
- Updates to `app/layout.tsx` for AnimatePresence' \
  '["enhancement", "ui/ux", "low-priority"]'

echo ""
echo "============================="
echo "All 11 issues created!"
echo "============================="
