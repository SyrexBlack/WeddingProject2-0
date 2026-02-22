# Phase 3: Dynamic Components — Research

**Researched:** 2026-02-22
**Level:** 1 (Quick Verification)
**Focus:** Countdown timer (date-fns 4), Parallax (Framer Motion useScroll), Accessibility (prefers-reduced-motion)

## Standard Stack

### date-fns 4.1.0 (to install)
- **Import pattern:** `import { differenceInSeconds } from 'date-fns'` — tree-shakeable named exports
- **Countdown approach:** Use raw `differenceInSeconds(targetDate, now)` then manually compute days/hours/minutes/seconds via division/modulo. This avoids `intervalToDuration` which has edge cases with DST transitions.
- **Formula:** `totalSeconds = differenceInSeconds(target, now)` → `days = Math.floor(totalSeconds / 86400)` → `hours = Math.floor((totalSeconds % 86400) / 3600)` → etc.
- **No timezone library needed:** The target date in constants.ts is already ISO with timezone offset (`+03:00`). JavaScript `new Date()` handles this correctly. `differenceInSeconds` works with standard Date objects.
- **Bundle impact:** ~2KB for `differenceInSeconds` only (tree-shaken)

### Framer Motion 12.34.3 (already installed)

#### useScroll + useTransform for Parallax
- **Import:** `import { useScroll, useTransform, motion } from 'framer-motion'`
- **Pattern for parallax:**
```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]); // background moves slower
```
- `useScroll({ target })` returns a MotionValue tracking scroll progress relative to the target element
- `useTransform` maps scroll progress to CSS transform values
- **Performance:** MotionValues update outside React render cycle — no re-renders, pure GPU transforms
- **50% slower effect:** Map scrollYProgress [0,1] → y offset range that creates ~50% parallax ratio

#### AnimatePresence for digit transitions
- Already available in framer-motion
- Use `<AnimatePresence mode="wait">` with `key={digit}` for smooth fade between countdown numbers
- Each digit change triggers exit → enter animation

#### Stagger for countdown cards
- Use `motion.div` with `variants` and `staggerChildren` in parent
- Or use individual `delay` props (simpler, CONTEXT.md gives Claude discretion on exact values)
- Recommended: `staggerChildren: 0.15` (150ms between each card)

## Architecture Patterns

### Countdown Component Architecture
```
CountdownSection (client component)
├── useCountdown() hook — manages timer state
│   ├── useState for {days, hours, minutes, seconds}
│   ├── useEffect with setInterval(1000ms)
│   ├── Returns { days, hours, minutes, seconds, isExpired }
│   └── Cleanup: clearInterval on unmount
├── CountdownCard (presentational) — single unit display
│   ├── AnimatePresence for digit fade
│   ├── Card styling with alexandrite accents
│   └── Russian plural label
└── Stagger wrapper for initial appearance
```

### Russian Pluralization
Pattern for Russian: `n % 10 === 1 && n % 100 !== 11` → singular, `n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)` → few, else → many.
- день/дня/дней, час/часа/часов, минута/минуты/минут, секунда/секунды/секунд

### Parallax Component Architecture
```
ParallaxWrapper (client component)
├── useScroll + useTransform
├── Wraps children with parallax background layer
└── Used on: HeroSection, CountdownSection
```

### prefers-reduced-motion Strategy
- **Global approach:** CSS media query `@media (prefers-reduced-motion: reduce)` in globals.css
- **Framer Motion:** `useReducedMotion()` hook — returns boolean
- **Implementation:** 
  - AnimatedSection: skip animation, render children directly with opacity: 1
  - Parallax: disable transform, static positioning
  - Countdown digit fade: instant switch, no transition
  - Stagger: all cards appear simultaneously

## Don't Hand-Roll

| Need | Use | Don't |
|------|-----|-------|
| Time difference | `differenceInSeconds` from date-fns | Manual Date math with getTime() |
| Parallax | Framer Motion `useScroll` + `useTransform` | Manual scroll event listeners |
| Digit animation | `AnimatePresence` with key change | CSS transitions with state tracking |
| Reduced motion | `useReducedMotion()` from framer-motion | Manual matchMedia listener |

## Common Pitfalls

1. **SSR hydration mismatch:** Countdown renders different values on server vs client. Solution: render placeholder on server, hydrate with `useEffect` — or use `suppressHydrationWarning` on the number elements.
2. **setInterval drift:** Over time, setInterval(1000) can drift. For a wedding countdown (days/hours), this is negligible. But ensure cleanup on unmount.
3. **Parallax on mobile:** Heavy parallax can cause jank on low-end Android. The CONTEXT.md says to disable ALL animations with prefers-reduced-motion. For mobile, parallax via `useTransform` is GPU-accelerated so should be fine.
4. **AnimatePresence key stability:** Must use the actual number value as key, not a random ID. `key={seconds}` ensures animation triggers only when value changes.

---
*Research completed: 2026-02-22*
*Phase: 03-dynamic-components*
