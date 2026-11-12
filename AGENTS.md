<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlast

Travel-brand marketing site on a Next.js 16 App Router scaffold with shadcn/ui. No tests, API routes, or data layer.

## Commands

Use npm (`package-lock.json` is committed). Requires Node 22+ (`cn` declares that engine; Next itself needs 20.9+).

- `npm run dev` — Turbopack dev server on http://localhost:3000.
- `npm run build` — production build; also type-checks and validates the static shell.
- `npm run lint` — ESLint 9 flat config. Single file: `npm run lint -- app/page.tsx`.
- `npx next typegen && npx tsc --noEmit` — regenerate route types then typecheck. `next-env.d.ts` is gitignored, so run `typegen` before standalone `tsc` on a fresh checkout.
- No `test` script or test framework is configured; there is nothing to run for tests.

## Structure

- `app/layout.tsx` renders `<Navbar />`, page content, then `<Footer />` for every route. Do not add them per page.
- `/` (`app/page.tsx`) composes section components from `components/`; `/sign-in` and `/sign-up` each render a form component from `components/` inside the shared layout.
- Page/UI components are named exports in kebab-case files under `components/`; add `"use client"` only when a component needs state/events (e.g. navbar, footer, carousel). `components/ui/*` is shadcn-generated.
- `public/Images/` has a capital `I`; reference assets as `/Images/...`. Use `next/image` with `fill` or explicit dimensions.
- Brand color is the `brand` token (`bg-brand`, `text-brand`, `border-brand`; `--brand: #15a1bf` in `app/globals.css`). Prefer it over hard-coded hex values.
- Global fonts: Josefin Sans is applied via className on `<html>`; Playfair Display is exposed as `font-serif` through `--font-playfair`. The `--font-geist-*` variable names are starter leftovers.
- `README.md` is stock create-next-app boilerplate (Geist, yarn/pnpm/bun instructions); trust this file and the config instead.

## Next.js 16 specifics

- Turbopack is the default for dev and build; the scripts intentionally have no `--turbopack`/`--webpack` flag. Do not add a webpack config, or `next build` will reject it.
- `cacheComponents: true` and `partialPrefetching: true` are top-level in `next.config.ts`, not under `experimental`. Data is dynamic by default: cache with `"use cache"` + `cacheLife(...)`, or wrap request-time/uncached reads (`fetch`, DB calls, `cookies()`, `headers()`, `params`, `searchParams`, `connection()`) in `<Suspense>`; otherwise `next build` reports a blocking-route error instead of prerendering the static shell.
- With Cache Components enabled, do not add `runtime` route exports or `experimental.ppr`/`experimental_ppr`; Node.js runtime only.
- Tailwind v4 is compiled by `@tailwindcss/turbopack` through `turbopack.rules` in `next.config.ts`. There is no `tailwind.config.*` or PostCSS file; do not add `@tailwindcss/postcss`. Theme tokens live in `app/globals.css` (`@theme inline` + oklch variables).
- `experimental.agentFeedback` is on; `next dev` may add a second managed block to this file. Commit it instead of deleting it.

## UI conventions

- shadcn/ui style is `base-nova` (`components.json`). Primitives are `@base-ui/react`, not Radix; compose with the `render` prop (`asChild` does not exist).
- Class merging is the `cn` package, imported directly: `import { cn } from "cn"`. `lib/utils.ts` only re-exports it. Do not add `clsx` or `tailwind-merge`.
- Add components with the installed CLI: `npx shadcn add <component>`. They go in `components/ui/`; icons come from `lucide-react`.
- `@/*` maps to the repo root (there is no `src/`): routes in `app/`, components in `components/`, shared utilities in `lib/`.
