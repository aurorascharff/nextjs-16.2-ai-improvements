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

- **AGENTS.md & bundled docs** — Full Next.js documentation ships inside `node_modules/next/dist/docs/`, so agents always have accurate, version-matched references locally. This achieved a **100% pass rate** on Next.js evals vs 79% for skill-based retrieval. The `<!-- BEGIN:nextjs-agent-rules -->` markers delimit the Next.js-managed section — add your own instructions outside them.
- **Browser log forwarding** — Next.js forwards browser errors to the terminal by default during development (`logging.browserToTerminal` in `next.config.ts`), so agents can see client-side errors without a browser console.
- **Dev server lock file** — Next.js writes PID, port, and URL into `.next/dev/lock`, preventing agents from accidentally starting duplicate dev servers or concurrent builds.

### next-browser (experimental)

A CLI that exposes browser-level data — screenshots, network requests, console logs — along with framework-specific insights from React DevTools and the Next.js dev overlay (component trees, props, hooks, PPR shells, errors). All returned as structured text via shell commands, so an agent can parse the output and decide what to inspect next. Each command is a one-shot request against a persistent browser session.

## The anti-patterns

| File                             | Problem                                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`                 | `await cookies()` at the top blocks the entire layout from being static                                   |
| `app/page.tsx`                   | `await searchParams` at the top makes the entire page dynamic                                             |
| `app/page.tsx`                   | Sequential data fetches (`getCartCount` then `getProducts`)                                               |
| `app/page.tsx`                   | No `<Suspense>` boundaries — nothing streams                                                              |
| `components/category-filter.tsx` | Uses `useOptimistic`/`useTransition` but receives `active` from server props instead of `useSearchParams` |

## Using next-browser

```bash
npx skills add vercel-labs/next-browser
```

Then use `/next-browser` in your agent chat to trigger the skill. Example prompt:

```text
/next-browser Grow the static shell of this app. The dev server is at localhost:3000, no auth.
```

Key commands:

```bash
next-browser open <url>       # launch browser and navigate
next-browser tree             # show React component tree
next-browser tree <id>        # inspect component (props, hooks, state, source)
next-browser screenshot       # full-page screenshot
next-browser ppr lock         # enter PPR instant-navigation mode
next-browser ppr unlock       # exit PPR mode and show shell analysis
next-browser errors           # build and runtime errors
next-browser network          # list network requests since last navigation
```

PPR commands require `cacheComponents: true` in `next.config.ts` (already enabled).

## Example run

See [FIXES.md](./FIXES.md) for a detailed writeup of an agent run that analyzed and fixed the anti-patterns.

## Links

- [Next.js 16.2 blog post](https://nextjs.org/blog/next-16-2-ai)
- [AGENTS.md research — 100% vs 79%](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
- [next-browser GitHub](https://github.com/vercel-labs/next-browser)
- [Skills](https://skills.sh)
