# Phase 4: External Integrations — Research

**Researched:** 2026-02-22
**Focus:** EmailJS SDK API, Yandex Maps iframe embed, toast notifications

## 1. EmailJS SDK (@emailjs/browser)

### Installation
```bash
npm install --save @emailjs/browser
```
Package: `@emailjs/browser` (v4.x current as of CDN reference)

### API Pattern

**Init (global, once):**
```ts
import emailjs from '@emailjs/browser';

emailjs.init({
  publicKey: 'YOUR_PUBLIC_KEY',
  blockHeadless: true,  // optional: block bots
  limitRate: {
    id: 'app',
    throttle: 10000,  // 1 request per 10s
  },
});
```

**Send with template params (preferred for controlled forms):**
```ts
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
  from_name: 'Гость',
  status: 'attending',
  wishes: 'Поздравляю!',
}).then(
  (response) => { /* response.status, response.text */ },
  (error) => { /* error.text */ },
);
```

**SendForm (uses HTML form names directly):**
```ts
emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formRef.current, {
  publicKey: 'YOUR_PUBLIC_KEY', // can pass inline instead of init()
}).then(...);
```

### Key Details
- **Rate limit:** 1 request per second
- **Free tier:** 200 emails/month, 2 templates, 1 email service
- **Public key** is safe to expose (it's not a secret)
- **Service ID + Template ID + Public Key** needed — all from EmailJS dashboard
- Returns Promise with `{ status: number, text: string }`
- Error object has `.text` property with error message

### Env Variables Needed
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```
Must use `NEXT_PUBLIC_` prefix for client-side access in Next.js.

### React Pattern (from official docs)
```tsx
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const form = useRef<HTMLFormElement>(null);

const sendEmail = (e: React.FormEvent) => {
  e.preventDefault();
  emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form.current!, {
    publicKey: 'PUBLIC_KEY',
  }).then(
    () => console.log('SUCCESS!'),
    (error) => console.log('FAILED...', error.text),
  );
};
```

### Recommendation for This Project
Use `emailjs.send()` with template params (not `sendForm`) for better control over data shape. This lets us build a controlled React form with useState and validate before sending, rather than relying on HTML form field names. Initialize once in the component with `emailjs.init()`.

## 2. Yandex Maps iframe Embed (map-widget)

### URL Format
```
https://yandex.ru/map-widget/v1/?ll={lng}%2C{lat}&z={zoom}&l=map&pt={lng}%2C{lat}%2Cpm2rdm
```

**Parameters:**
- `ll` — center point: `longitude,latitude` (URL-encoded comma: `%2C`)
- `z` — zoom level (1-19, 15 is good for a venue)
- `l` — layer type: `map` (standard), `sat` (satellite), `skl` (hybrid)
- `pt` — pin marker: `longitude,latitude,style` where `pm2rdm` = red marker medium size

### Existing Data in constants.ts
```ts
iframeSrc: 'https://yandex.ru/map-widget/v1/?ll=37.284722%2C55.784444&z=15&l=map&pt=37.284722%2C55.784444%2Cpm2rdm'
```
This is already correctly formatted. Verified: the URL returns a valid map frame.

### iframe Implementation
```html
<iframe
  src="{mapData.iframeSrc}"
  width="100%"
  height="400"
  frameBorder="0"
  allowFullScreen
  style={{ borderRadius: '10px' }}
/>
```

**Key notes:**
- No API key required for iframe embed
- Responsive: use `width="100%"` with fixed height
- `frameBorder="0"` removes default border
- `allowFullScreen` enables fullscreen button inside map
- Border radius via style (CSS `overflow: hidden` on parent for clip)

### Navigation URL (route button)
**Already in constants.ts:**
```ts
navigationUrl: 'https://yandex.ru/maps/?rtext=~55.784444%2C37.284722&rtt=auto'
```

**Platform-aware approach (from CONTEXT.md specifics):**
- Mobile: Try `yandexnavi://build_route_on_map?lat_to={lat}&lon_to={lng}` first (Yandex Navigator deep link)
- Fallback: `https://yandex.ru/maps/?rtext=~{lat}%2C{lng}&rtt=auto` (works everywhere)
- Google Maps fallback: `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}`

**Simple detection pattern:**
```ts
function getNavigationUrl(lat: number, lng: number): string {
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  if (isMobile) {
    return `https://yandex.ru/maps/?rtext=~${lat}%2C${lng}&rtt=auto`;
  }
  return `https://yandex.ru/maps/?rtext=~${lat}%2C${lng}&rtt=auto`;
}
```
Note: Both mobile and desktop use the same Yandex Maps URL — Yandex handles platform detection internally. The URL opens Yandex Navigator if installed on mobile, otherwise opens in browser. No need for custom platform detection logic.

## 3. Toast Notifications (Claude's Discretion)

### Recommendation: Native implementation (no library)
Given the project has zero toast requirements beyond RSVP error display, adding a library (sonner, react-hot-toast) is overkill. A simple custom toast component with Framer Motion animation fits the project better:

- Matches existing design system (alexandrite/chocolate colors)
- Uses Framer Motion already in the project
- One use case only (error on RSVP fail)
- ~20 lines of code

### Pattern
```tsx
// Simple toast: fixed bottom-center, auto-dismiss after 5s
<AnimatePresence>
  {toast && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
                 bg-error text-white px-6 py-3 rounded-card shadow-lg"
    >
      {toast}
    </motion.div>
  )}
</AnimatePresence>
```

## 4. Common Pitfalls

1. **EmailJS not loading on SSR:** `@emailjs/browser` uses `window` — must only import/call in client components (`'use client'`)
2. **iframe blocking:** Some corporate networks block iframes — but CONTEXT.md says no fallback needed (address + route button visible)
3. **localStorage SSR:** `localStorage` is browser-only — guard with `typeof window !== 'undefined'`
4. **Form re-submission spam:** Use EmailJS `limitRate` option + localStorage flag
5. **Env vars missing:** If `NEXT_PUBLIC_EMAILJS_*` not set, `emailjs.send()` will throw — handle gracefully with error UI + contact link fallback

## 5. RSVPFormData Type Alignment

Current type in `types.ts`:
```ts
interface RSVPFormData {
  firstName: string;
  lastName: string;
  status: RSVPStatus; // 'attending' | 'not-attending'
  plusOne: boolean;
  wishes: string;
}
```

CONTEXT.md specifies 3 options: «Приду» / «Приду с парой (+1)» / «Не смогу прийти». This maps to:
- `status: 'attending'` + `plusOne: false` → «Приду»
- `status: 'attending'` + `plusOne: true` → «Приду с парой (+1)»
- `status: 'not-attending'` + `plusOne: false` → «Не смогу прийти»

The existing type supports this. However, CONTEXT.md says "Минимальная валидация имени — не пустое, хотя бы 2 символа" — suggests a single "name" field, not firstName/lastName split. Consider simplifying the form to a single `name` field for better UX (fewer fields = higher completion rate).

**Decision needed:** Keep firstName/lastName or simplify to single name field? The type allows either approach — form can combine/split as needed. Recommendation: use a single "Ваше имя" field per CONTEXT.md simplicity preference, map to `firstName` in the template params.

---

*Research complete: 2026-02-22*
*Ready for planning*
