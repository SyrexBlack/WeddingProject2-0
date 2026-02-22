---
phase: 03-dynamic-components
plan: 01
subsystem: ui
tags: [countdown, framer-motion, date-fns, animation, russian-pluralization]

# Dependency graph
requires:
  - phase: 02-static-sections
    provides: SectionHeading, Container, AnimatedSection UI components and page.tsx layout
provides:
  - useCountdown hook for real-time countdown to any date
  - pluralize utility for Russian declension of time units
  - CountdownSection component with animated cards
affects: [03-dynamic-components]

# Tech tracking
tech-stack:
  added: [date-fns 4.1.0]
  patterns: [SSR-safe hooks with isHydrated guard, AnimatePresence for digit transitions, stagger entrance via Framer Motion variants]

key-files:
  created:
    - src/hooks/useCountdown.ts
    - src/lib/pluralize.ts
    - src/components/sections/CountdownSection.tsx
  modified:
    - src/app/page.tsx
    - package.json

key-decisions:
  - "Inline card styling instead of Card component — countdown cards need number-specific sizing and alexandrite accent border"
  - "stagger viewport once:true — entrance stagger plays once, digit AnimatePresence handles ongoing animation"
  - "isHydrated boolean pattern for SSR safety — shows 0 values until client-side calculation starts"

patterns-established:
  - "SSR-safe hook pattern: initialize with static values, flip isHydrated in useEffect"
  - "Russian pluralize utility reusable for any future declension needs"

requirements-completed: [CONT-02]

# Metrics
duration: 3min
completed: 2026-02-22
---

# Phase 3 Plan 1: Countdown Timer Summary

**Live countdown timer with 4 animated cards, Russian pluralized labels, stagger entrance, and digit fade transitions using date-fns + Framer Motion**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-22T16:37:57Z
- **Completed:** 2026-02-22T16:40:39Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Real-time countdown to wedding date (2026-08-15T15:00:00+03:00) updating every second
- Russian pluralization utility correctly handling all declension cases (1/2/5/11/21/22)
- Stagger entrance animation for cards + AnimatePresence fade on digit changes
- SSR-safe implementation with hydration mismatch prevention

## Task Commits

Each task was committed atomically:

1. **Task 1: Install date-fns, create useCountdown hook and pluralize utility** - `eb38fd3` (feat)
2. **Task 2: Create CountdownSection component and integrate into page.tsx** - `22d9d90` (feat)

## Files Created/Modified
- `src/hooks/useCountdown.ts` - SSR-safe countdown hook with 1s interval, returns days/hours/minutes/seconds/isExpired/isHydrated
- `src/lib/pluralize.ts` - Russian declension utility for time unit labels
- `src/components/sections/CountdownSection.tsx` - 4 animated countdown cards with stagger entrance and digit fade
- `src/app/page.tsx` - Replaced countdown placeholder with real CountdownSection
- `package.json` - Added date-fns 4.1.0 dependency
- `package-lock.json` - Updated lockfile

## Decisions Made
- Used inline card styling instead of Card component for countdown-specific alexandrite border accent and number sizing
- Stagger animation uses `viewport.once: true` — entrance plays once while digit transitions handle ongoing animation
- isHydrated boolean pattern prevents SSR hydration mismatches by showing 0 values until client-side useEffect

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Countdown section complete with all animations and Russian labels
- Ready for Plan 02 (photo gallery / other dynamic components)
- useCountdown hook and pluralize utility available for reuse

## Self-Check: PASSED

- [x] src/hooks/useCountdown.ts — FOUND
- [x] src/lib/pluralize.ts — FOUND
- [x] src/components/sections/CountdownSection.tsx — FOUND
- [x] Commit eb38fd3 — FOUND
- [x] Commit 22d9d90 — FOUND

---
*Phase: 03-dynamic-components*
*Completed: 2026-02-22*
