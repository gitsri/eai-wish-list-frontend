## Santa's Ultimate Wish List Generator

A festive single-page experience where visitors type their Christmas wishes onto a parchment, watch them render with a typewriter effect, get instant naughty/nice judgment from Santa, and seal the list with a wax stamp when complete. Built with Next.js App Router, Tailwind CSS v4, and shadcn-style UI primitives.

### Features
- Typewriter-style wish entry with live naughty/nice rating chips
- Randomized snowfall and candle-glow ambience
- Santa feedback card with bell sound cues
- Wax-seal stamp to “lock” the list and an option to start over
- Responsive layout with Playfair Display + Geist typography and seasonal palette

### Tech Stack
- Next.js 16 (App Router), React 19
- Tailwind CSS v4 + `tw-animate-css`
- shadcn-inspired UI components (button, card, input, badge)
- Vercel Analytics

### Quick Start
```bash
cd frontend-wish-list
npm install
npm run dev
# visit http://localhost:3000
```

### Available Scripts
- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm run start` – run the production build
- `npm run lint` – lint the project

### Project Structure
- `app/page.tsx` – mounts the snowfall and wish list experience
- `app/layout.tsx` – global fonts/metadata, Vercel Analytics
- `components/wish-list-generator.tsx` – core wish flow (input, list, seal)
- `components/wish-item.tsx` – typewriter + naughty/nice badges
- `components/snowfall.tsx` – randomized falling snow
- `components/wax-seal.tsx` – animated wax stamp
- `app/globals.css` – Tailwind v4 base + custom animations/palette

### How It Works
1. Add a wish → typewriter animation plays while the text “writes”.
2. After writing, the wish is rated against a small naughty-word list.
3. Santa surfaces a randomized response and a bell chime.
4. “Complete List & Seal” drops a wax seal and locks further edits; “Start New List” resets.

### Notes
- Requires Node 18.18+ (Next.js 16 baseline). NPM is assumed; adapt commands if using pnpm/yarn/bun.
- All assets served from `/public` (e.g., `cool_santa.png`, icons).
