# Components map

Folders mirror routes: if you know the page, you know the folder. Only `layout/` and `ui/` are shared.

| Route | Folder | Components |
| --- | --- | --- |
| every route | `layout/` | `navbar`, `footer` |
| `/` | `home/` | `hero-banner`, `why-choose-wanderlust`, `testimonials`, `call-to-action` |
| `/destinations` | `destinations/` | `destinations-section` → `destinations-grid` → `destination-card`, `destinations-skeleton` |
| `/destinations/[id]` | `destinations/detail/` | `destination-detail` → `delete-destination-button`, `edit-destination-dialog`, `destination-booking-card` |
| `/add-new-destination` | `add-new-destination/` | `add-new-destination` |
| `/bookings` | `bookings/` | `bookings-list` → `booking-card` |
| `/profile` | `profile/` | `profile-view` → `edit-profile-dialog` |
| `/sign-in`, `/sign-up` | `auth/` | `sign-in-form`, `sign-up-form`, `google-icon` |
| any | `ui/` | shadcn/ui primitives — do not edit by hand, add with `npx shadcn add <component>` |

## Rules

- One folder per route. A component used by two routes moves to a shared folder instead of being duplicated.
- Files stay kebab-case with named exports; `"use client"` only for state/events.
- Import with the alias: `@/components/<folder>/<file>`.
- Types live in `Types/` (`@/Types/...`).
