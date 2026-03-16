# Next.js 16.2 AI Improvements Demo

A small store app built with Next.js 16.2 to demonstrate the new AI agent features. The app is **intentionally built with anti-patterns** so that an AI agent can analyze it, find the issues, and fix them.

## What this demos

- **AGENTS.md & bundled docs** — Next.js ships its full documentation inside `node_modules/next/dist/docs/`, and `AGENTS.md` tells agents to read it before writing code
- **Browser log forwarding** — `console.log`/`warn`/`error` from the browser are forwarded to the terminal via `logging.browserToTerminal` in `next.config.ts`
- **Dev server lock file** — `.next/dev/lock` prevents agents from starting duplicate dev servers
- **next-browser** — CLI tool (`@vercel/next-browser`) that gives agents access to React DevTools, PPR shell analysis, screenshots, and error inspection via shell commands

## The anti-patterns (on purpose)

The app has several issues for an agent to find and fix:

| File | Problem |
| --- | --- |
| `app/layout.tsx` | `await cookies()` at the top blocks the entire layout from being static |
| `app/page.tsx` | `await searchParams` at the top makes the entire page dynamic |
| `app/page.tsx` | Sequential data fetches (`getCartCount` then `getProducts`) |
| `app/page.tsx` | No `<Suspense>` boundaries — nothing streams |
| `components/category-filter.tsx` | Plain `<a>` tags instead of `<Link>` — full page reloads on filter |

## Getting started

```bash
npm install
npm run dev
```

## Using next-browser

```bash
npx skills add vercel-labs/next-browser
```

Then use the `/next-browser` slash command in your agent chat, or run commands directly:

```bash
next-browser open http://localhost:3000
next-browser tree
next-browser screenshot
next-browser ppr lock
next-browser errors
```

Requires `cacheComponents: true` in `next.config.ts` for PPR commands (already configured).

## Links

- [AGENTS.md research — 100% vs 79%](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
- [next-browser GitHub](https://github.com/vercel-labs/next-browser)
- [Skills](https://skills.sh)

## Stack

- Next.js 16.2 (canary)
- React 19
- Tailwind CSS 4
- shadcn/ui
