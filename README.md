# Next.js 16.2 AI Improvements Demo

A small store app built with Next.js 16.2, **intentionally built with anti-patterns** for an AI agent to analyze, find, and fix using the new AI agent features.

## Getting started

```bash
npm install
npm run dev
```

## Stack

Next.js 16.2 (canary) · React 19 · Tailwind CSS 4 · shadcn/ui

## Features demonstrated

- **AGENTS.md & bundled docs** — full Next.js documentation shipped inside `node_modules/next/dist/docs/`, with `AGENTS.md` telling agents to read it before writing code
- **Browser log forwarding** — browser `console.log`/`warn`/`error` forwarded to the terminal via `logging.browserToTerminal`
- **Dev server lock file** — `.next/dev/lock` prevents agents from starting duplicate dev servers
- **next-browser** — CLI tool giving agents access to React DevTools, PPR shell analysis, screenshots, and error inspection

## The anti-patterns

| File | Problem |
| --- | --- |
| `app/layout.tsx` | `await cookies()` at the top blocks the entire layout from being static |
| `app/page.tsx` | `await searchParams` at the top makes the entire page dynamic |
| `app/page.tsx` | Sequential data fetches (`getCartCount` then `getProducts`) |
| `app/page.tsx` | No `<Suspense>` boundaries — nothing streams |
| `components/category-filter.tsx` | Uses `useOptimistic`/`useTransition` but receives `active` from server props instead of `useSearchParams` |

## Expected fixes

1. Move `cookies()` out of the layout into a `<Suspense>`-wrapped child component
2. Switch `CategoryFilter` to `useSearchParams()` — remove `await searchParams` from page.tsx
3. Wrap data fetches in separate `<Suspense>` boundaries so they stream independently
4. Add skeleton fallbacks

After fixing, the PPR static shell should show the nav, hero, filter bar, and footer instantly — with skeleton fallbacks where dynamic content streams in.

## Using next-browser

```bash
npx skills add vercel-labs/next-browser
```

Then use `/next-browser` in your agent chat to trigger the skill. Example prompt:

```text
/next-browser Grow the static shell of this app. The dev server is at localhost:3000, no auth.
```

Or run commands directly:

```bash
next-browser open http://localhost:3000
next-browser tree
next-browser screenshot
next-browser ppr lock
next-browser errors
```

PPR commands require `cacheComponents: true` in `next.config.ts` (already enabled).

## Links

- [AGENTS.md research — 100% vs 79%](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
- [next-browser GitHub](https://github.com/vercel-labs/next-browser)
- [Skills](https://skills.sh)
