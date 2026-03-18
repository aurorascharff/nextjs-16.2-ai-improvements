# Anti-pattern fixes

## Problem

The PPR static shell was completely empty — a full bailout. Dynamic data access at the top of the layout and page blocked everything from prerendering. The user saw nothing until all data fetches completed (~2.5s).

## What changed

### 1. Layout: moved `cookies()` out of the root layout

`app/layout.tsx` called `await cookies()` at the top, making the entire layout dynamic. The nav, footer, and all children were blocked from prerendering.

**Fix:** Extracted the cart count badge into a new `components/cart-badge.tsx` async server component, wrapped in `<Suspense>` inside the layout. The layout itself is no longer async — the header, nav, and footer are now part of the static shell.

### 2. CategoryFilter: switched to `useSearchParams()`

`components/category-filter.tsx` received `active` as a prop from the server, which required `await searchParams` in `page.tsx`. This made the entire page dynamic at the top level.

**Fix:** `CategoryFilter` now reads the category directly from `useSearchParams()`, making it self-contained. No server-side `searchParams` access needed in the page component.

### 3. Page: separate Suspense boundaries for independent streaming

`app/page.tsx` awaited `searchParams`, `getCartCount()`, and `getProducts()` sequentially at the top — nothing could render until all three resolved.

**Fix:** Created two async server components (`CartCount` and `ProductGrid`), each in their own `<Suspense>` boundary. The `searchParams` promise is resolved inline with `.then()` inside the product grid boundary. Added a `ProductGridSkeleton` fallback with 6 placeholder cards matching the grid layout.

## Result

The static shell now shows instantly:

- Header with nav and cart icon
- Hero section with title and subtitle
- Category filter bar (All / Clothing / Accessories / Prints)
- 6 skeleton product cards
- Footer

Dynamic content streams in independently — cart count and products resolve in parallel behind their own Suspense boundaries.

PPR analysis: **6 boundaries total — 3 static, 3 dynamic holes** (CartCount, ProductGrid, CartBadge), all correctly wrapped.
