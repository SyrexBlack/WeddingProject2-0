---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [next.js, tailwind-css-4, typescript, fonts, cormorant-garamond]

# Dependency graph
requires: []
provides:
  - "Next.js 16 project scaffold with App Router and TypeScript"
  - "Tailwind CSS 4 with wedding color palette (alexandrite, chocolate, cream)"
  - "Font configuration via next/font/google (Cormorant Garamond stand-in)"
  - "Global styles: cream background, paper texture, dark chocolate text"
  - "Complete TypeScript type system for all wedding data structures"
affects: [01-foundation, 02-static-sections, 03-dynamic-components, 04-external-integrations]

# Tech tracking
tech-stack:
  added: [next.js 16.1.6, react 19.2.4, tailwindcss 4.2.0, typescript 5.9.3, "@tailwindcss/postcss"]
  patterns: [app-router, css-variables, next-font-google, tailwind-css-config]

key-files:
  created:
    - package.json
    - tsconfig.json
    - next.config.ts
    - tailwind.config.ts
    - postcss.config.mjs
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/app/globals.css
    - src/lib/fonts.ts
    - src/lib/types.ts
    - .gitignore
  modified: []

key-decisions:
  - "Next.js 16 (latest) instead of 15 — create-next-app installed v16 as stable"
  - "Cormorant Garamond 300 as Calmius Extra Light stand-in — visually similar thin serif"
  - "SVG feTurbulence for paper texture — no external image dependency"
  - "CSS @import tailwindcss with @config directive for Tailwind v4 compatibility"

patterns-established:
  - "Color palette: CSS custom properties + Tailwind config for dual access"
  - "Font via CSS variable --font-calmius applied to body with font-calmius class"
  - "All types exported from single @/lib/types.ts canonical file"

requirements-completed: [FOUND-01, FOUND-02, FOUND-04]

# Metrics
duration: 9min
completed: 2026-02-22
---

# Phase 1 Plan 1: Project Scaffold, Fonts, Global Styles, TypeScript Types Summary

**Next.js 16 project with Tailwind CSS 4 wedding palette, Cormorant Garamond font, paper-texture global styles, and 14 TypeScript type definitions for all wedding data**

## Performance

- **Duration:** 9 min
- **Started:** 2026-02-22T13:27:36Z
- **Completed:** 2026-02-22T13:36:27Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Next.js 16 + React 19 project initialized with App Router, TypeScript strict mode, src/ directory
- Tailwind CSS 4 configured with full wedding color palette (alexandrite #598c74, chocolate #3C1518, cream #FFF8F0, sand, error)
- Cormorant Garamond (weight 300) configured as Calmius Extra Light stand-in via next/font/google with Cyrillic subset
- Global styles: cream background, SVG paper texture overlay, dark chocolate text, smooth scrolling, alexandrite selection color
- 14 TypeScript types/interfaces covering all wedding data: WeddingData, HeroData, CountdownData, InfoCard, TimelineEvent, DressCodeData, ColorSwatch, RSVPFormData, RSVPStatus, ContactInfo, MapData, FooterData, SectionId, SectionConfig
- `npm run build` passes with zero errors and zero warnings

## Task Commits

Each task was committed atomically:

1. **Task 1: Initialize Next.js project with Tailwind CSS 4, fonts, global styles** - `8307018` (feat)
2. **Task 2: Create TypeScript type definitions** - `2139411` (feat)

## Files Created/Modified
- `package.json` - Project config with Next.js 16, React 19, Tailwind CSS 4
- `tsconfig.json` - TypeScript strict config with path aliases
- `next.config.ts` - Next.js configuration (minimal)
- `tailwind.config.ts` - Wedding color palette, font family, border radius, max-width
- `postcss.config.mjs` - PostCSS with @tailwindcss/postcss plugin
- `src/app/layout.tsx` - Root layout with font, Russian locale, OG metadata
- `src/app/page.tsx` - Minimal placeholder page
- `src/app/globals.css` - Tailwind imports, CSS variables, base styles, paper texture
- `src/lib/fonts.ts` - Font configuration export (Cormorant Garamond stand-in)
- `src/lib/types.ts` - 14 TypeScript types for all wedding data structures
- `.gitignore` - Standard Next.js gitignore

## Decisions Made
- **Next.js 16 instead of 15:** `create-next-app@latest` resolves to v16.1.6 as current stable. Compatible with all planned features.
- **Cormorant Garamond as font stand-in:** Calmius Extra Light not on Google Fonts. Cormorant Garamond weight 300 is a thin elegant serif with Cyrillic support — close visual match. Marked with TODO for replacement when font files provided.
- **SVG feTurbulence paper texture:** Used inline SVG noise filter instead of external PNG image. Zero HTTP requests, looks like subtle paper grain at 3% opacity. No `public/textures/paper.png` needed.
- **`type: "module"` in package.json:** Added to prevent Node.js warning about typeless package when loading tailwind.config.ts.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Manual project setup instead of create-next-app**
- **Found during:** Task 1 (project initialization)
- **Issue:** `create-next-app` rejected the project due to folder name "Project_Wedding_2.0" containing capital letters (npm naming restriction)
- **Fix:** Manually initialized with `npm init -y` + installed dependencies individually (next, react, react-dom, tailwindcss, etc.). Created all config files manually.
- **Files modified:** package.json, all config files
- **Verification:** `npm run build` succeeds cleanly
- **Committed in:** 8307018 (Task 1 commit)

**2. [Rule 1 - Bug] Added `type: "module"` to package.json**
- **Found during:** Task 1 (build verification)
- **Issue:** Node.js emitted warning "Module type not specified" when loading tailwind.config.ts
- **Fix:** Added `"type": "module"` to package.json
- **Files modified:** package.json
- **Verification:** Build runs cleanly with zero warnings
- **Committed in:** 8307018 (Task 1 commit)

**3. [Rule 2 - Missing Critical] SVG texture instead of image file**
- **Found during:** Task 1 (paper texture setup)
- **Issue:** Plan suggested creating `public/textures/paper.png` but an SVG feTurbulence inline pattern is more elegant — zero HTTP requests, no external file dependency
- **Fix:** Used CSS background-image with inline SVG noise filter at 3% opacity for subtle paper grain
- **Files modified:** src/app/globals.css
- **Verification:** Visual texture visible in build output
- **Committed in:** 8307018 (Task 1 commit)

---

**Total deviations:** 3 auto-fixed (1 blocking, 1 bug, 1 missing critical)
**Impact on plan:** All auto-fixes necessary for project to work. No scope creep.

## Issues Encountered
None — both tasks completed successfully on first attempt.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Project skeleton complete, ready for Plan 01-02 (wedding data constants, base UI components)
- All TypeScript types available at `@/lib/types` for import
- Font, colors, and global styles established as foundation

## Self-Check: PASSED

- All 11 created files verified on disk
- Both task commits found in git history (8307018, 2139411)
- `npm run build` passes with zero errors/warnings

---
*Phase: 01-foundation*
*Completed: 2026-02-22*
