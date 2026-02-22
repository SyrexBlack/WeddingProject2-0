---
phase: 03-dynamic-components
plan: 02
subsystem: ui
tags: [parallax, framer-motion, useScroll, useTransform, reduced-motion, accessibility]

# Dependency graph
requires:
  - phase: 03-dynamic-components
    provides: CountdownSection with stagger/digit animations, AnimatedSection with fade-up
provides:
  - ParallaxSection component for depth parallax effect
  - Full prefers-reduced-motion support across all animations
  - CSS reduced-motion fallback for non-Framer-Motion elements
affects: [05-polish-deploy]

# Tech tracking
tech-stack:
  added: []
  patterns: [useScroll/useTransform parallax, useReducedMotion conditional rendering, CSS prefers-reduced-motion media query]

key-files:
  created:
    - src/components/ui/ParallaxSection.tsx
  modified:
    - src/components/ui/AnimatedSection.tsx
    - src/components/sections/HeroSection.tsx
    - src/components/sections/CountdownSection.tsx
    - src/app/globals.css

key-decisions:
  - "ParallaxSection speed=0.5 default — 30% y-range creates subtle depth without causing motion sickness"
  - "Conditional rendering (plain div vs motion.div) for reduced-motion instead of just zeroing animation values"
  - "CSS reduced-motion media query as catch-all fallback for non-Framer-Motion CSS animations"

patterns-established:
  - "useReducedMotion conditional render: if reduced motion, render plain HTML element instead of motion element"
  - "ParallaxSection wrapper pattern: wrap any section for depth parallax, auto-handles overflow and background layer"

requirements-completed: [INTER-05]

# Metrics
duration: 2min
completed: 2026-02-22
---

# Phase 3 Plan 2: Parallax & Reduced Motion Summary

**ParallaxSection depth effect on Hero/Countdown via useScroll/useTransform, with full prefers-reduced-motion accessibility across all animations site-wide**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-22T16:44:09Z
- **Completed:** 2026-02-22T16:46:42Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- ParallaxSection component creates depth illusion — background moves ~50% slower than scrolling content
- Hero and Countdown sections wrapped with parallax for visual depth
- Complete prefers-reduced-motion support: AnimatedSection renders static div, CountdownSection disables stagger/digit fade/AnimatePresence
- CSS fallback media query disables all remaining CSS-based transitions and animations

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ParallaxSection component and add reduced-motion support to AnimatedSection** - `efbc1cb` (feat)
2. **Task 2: Apply parallax to Hero and Countdown sections, update countdown reduced-motion support** - `08c4892` (feat)

## Files Created/Modified
- `src/components/ui/ParallaxSection.tsx` - Parallax depth wrapper using Framer Motion useScroll/useTransform with reduced-motion bypass
- `src/components/ui/AnimatedSection.tsx` - Added useReducedMotion: renders plain div when reduced motion preferred
- `src/components/sections/HeroSection.tsx` - Wrapped with ParallaxSection (speed 0.5), converted to client component
- `src/components/sections/CountdownSection.tsx` - Wrapped with ParallaxSection, all animations conditionally disabled for reduced-motion
- `src/app/globals.css` - Added prefers-reduced-motion media query for CSS animations/transitions

## Decisions Made
- ParallaxSection uses speed=0.5 default creating 30% y-range — subtle depth without disorientation
- Conditional rendering approach (plain div vs motion.div) instead of zeroing animation values — ensures truly zero motion for accessibility
- CSS reduced-motion media query as catch-all safety net for any CSS-based animations outside Framer Motion control

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 3 (Dynamic Components) complete — countdown timer + parallax/reduced-motion all delivered
- Ready for Phase 4 (External Integrations) — RSVP form, map, EmailJS
- All sections have consistent animation behavior with full accessibility support

## Self-Check: PASSED

- [x] src/components/ui/ParallaxSection.tsx — FOUND
- [x] src/components/ui/AnimatedSection.tsx — FOUND
- [x] src/components/sections/HeroSection.tsx — FOUND
- [x] src/components/sections/CountdownSection.tsx — FOUND
- [x] src/app/globals.css — FOUND
- [x] Commit efbc1cb — FOUND
- [x] Commit 08c4892 — FOUND

---
*Phase: 03-dynamic-components*
*Completed: 2026-02-22*
