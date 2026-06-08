# Sabs Marks JVS CMS Platform

CNK-style corporate website rebuilt on Next.js + Supabase + Cloudinary with a custom admin CMS.

## Implemented
- Mega navigation with CMS-driven menu groups (`About`, `Expertise`, `Insights`, `Career`, `Contact`)
- New route architecture:
  - `/about`, `/about/our-approach`, `/about/team`
  - `/insights`, `/insights/[slug]`, `/insights/category/[slug]`
  - `/contact` with city-level detail pages
- Legacy redirect middleware map for old URLs
- Expanded CMS entities:
  - `team_members`, `insight_categories`, `insight_tags`, `locations`, `menu_items`
- Editorial workflow fields and status model (`draft`, `review`, `published`)
- Supabase schema + seed upgraded for enterprise information architecture

## Core APIs (content service)
- `getMegaNav()`
- `getInsights({ category, tag, page })`
- `getLocationBySlug(slug)`
- `getTeamMembers({ featured })`

## Setup
1. `cp .env.example .env.local`
2. Fill Supabase, Cloudinary, and admin credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Run SQL files in order:
   - `supabase/schema.sql`
   - `supabase/seed.sql`
4. Start app: `npm run dev`

## Admin access
- The CMS uses Supabase Auth for sign-in and `public.user_roles` for authorization.
- Create the admin user in Supabase Authentication, then add a matching row in `public.user_roles` with role `admin` or `editor`.
- Sign in through `/admin/login` with that Supabase user account.

## Existing database patch
If your Supabase project already has CMS tables and you need a non-destructive patch path, use [docs/existing-db-patch.md](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/docs/existing-db-patch.md) instead of `supabase/full_reset_bootstrap.sql`.

## Notes
- Supabase key compatibility: either `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is accepted.
- RLS protects public reads and controls CMS writes for authenticated `admin` and `editor` users.
