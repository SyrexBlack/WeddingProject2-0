---
phase: 05-polish-deploy
plan: 01
subsystem: ui, seo
tags: [og-image, next-image, metadata, opengraph, twitter-card, blur-placeholder, edge-runtime]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: layout.tsx structure, fonts, Tailwind theme
  - phase: 02-static-sections
    provides: HeroSection component, ParallaxSection wrapper
provides:
  - Dynamic OG image generation at /api/og (1200x630 PNG)
  - Complete openGraph + twitter metadata in layout.tsx
  - Optimized Hero with next/image blur placeholders
  - Responsive hero photos (desktop landscape + mobile portrait)
affects: [05-polish-deploy, deploy]

# Tech tracking
tech-stack:
  added: [next/og ImageResponse, next/image with static imports]
  patterns: [Edge runtime OG generation, blur placeholder via static import, responsive image switching]

key-files:
  created:
    - src/app/api/og/route.tsx
    - public/images/hero-desktop.jpg
    - public/images/hero-mobile.jpg
  modified:
    - src/app/layout.tsx
    - src/components/sections/HeroSection.tsx

key-decisions:
  - "System serif fallback for OG image instead of loading custom font — simpler Edge runtime, reliable Cyrillic rendering"
  - "Sharp-generated gradient placeholders instead of Unsplash — network unavailable, gradient matches wedding palette"
  - "metadataBase set to vercel.app preview URL — will update after production deploy"

patterns-established:
  - "Edge OG: ImageResponse with inline JSX styles, gradient background, decorative border"
  - "Static image import: import from public/ for automatic blur placeholder in next/image"

requirements-completed: [DEPLOY-01, DEPLOY-02]

# Metrics
duration: 4min
completed: 2026-02-22
---

# Phase 5 Plan 1: OG Image & Hero Optimization Summary

**Dynamic OG image route with wedding palette gradient via next/og Edge runtime, complete openGraph/twitter metadata, and Hero section optimized with next/image blur placeholders for desktop and mobile**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-22T23:08:00Z
- **Completed:** 2026-02-22T23:12:29Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Dynamic OG image at /api/og generates 1200×630 PNG with alexandrite→champagne→powder gradient, couple names, date, venue
- Layout.tsx has complete openGraph + twitter:summary_large_image metadata with metadataBase for absolute URL resolution
- HeroSection displays responsive background photos via next/image with automatic blur placeholders
- Two hero variants: landscape 1920×1080 (desktop) and portrait 750×1334 (mobile) with responsive switching

## Task Commits

Each task was committed atomically:

1. **Task 1: Create dynamic OG image route and update layout.tsx metadata** - `6bb0ec0` (feat)
2. **Task 2: Add Hero placeholder images and optimize HeroSection with next/image** - `161d75c` (feat)

## Files Created/Modified
- `src/app/api/og/route.tsx` - Edge runtime OG image generation with ImageResponse
- `src/app/layout.tsx` - Complete openGraph + twitter metadata with metadataBase
- `public/images/hero-desktop.jpg` - Placeholder landscape hero (1920×1080, gradient)
- `public/images/hero-mobile.jpg` - Placeholder portrait hero (750×1334, gradient)
- `src/components/sections/HeroSection.tsx` - next/image with blur placeholder, responsive sizes

## Decisions Made
- Used system serif for OG image text — Cormorant Garamond TTF loading in Edge runtime adds complexity; serif fallback renders Cyrillic correctly
- Generated gradient placeholder JPEGs via sharp instead of Unsplash downloads — network connection failed, gradient images match wedding palette and serve as proper placeholders until real photos are provided
- Set metadataBase to `https://wedding-project2-0.vercel.app` — temporary for correct absolute URL generation, to be updated after production deploy

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Unsplash download failed, generated placeholders via sharp**
- **Found during:** Task 2 (Hero placeholder images)
- **Issue:** curl to images.unsplash.com returned "Connection was reset" — network unavailable
- **Fix:** Used sharp (already in node_modules) to generate gradient JPEG placeholders from SVG with wedding palette colors
- **Files modified:** public/images/hero-desktop.jpg, public/images/hero-mobile.jpg
- **Verification:** Files created successfully, build passes, static import works
- **Committed in:** 161d75c (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Placeholder images are functionally equivalent — next/image blur placeholder works correctly with generated JPEGs. Real wedding photos will replace these later.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- OG image and metadata ready — can be tested via Telegram/WhatsApp after deploy
- Hero images are placeholders — replace with real couple photos when available
- Ready for Plan 02 (responsive polish) and Plan 03 (deploy)

---
*Phase: 05-polish-deploy*
*Completed: 2026-02-22*
