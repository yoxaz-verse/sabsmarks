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
2. Fill Supabase and Cloudinary credentials.
3. Run SQL files in order:
   - `supabase/schema.sql`
   - `supabase/seed.sql`
4. Start app: `npm run dev`

## Notes
- Supabase key compatibility: either `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is accepted.
- RLS allows public read only for published content, while editor/admin roles can write.
