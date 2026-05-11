# CMS Migration Checklist (No Content Loss)

## 1) Run DB scripts
1. Run `supabase/schema.sql`
2. Run `supabase/seed.sql`
3. Run `supabase/backfill_cms_content.sql`

## 2) Verify route parity
- `/about`
- `/about/legacy`
- `/about/locations`
- `/about/team`
- `/careers/philosophy`
- `/careers/alumni`
- `/expertise/ifsc`
- `/expertise/uae`
- `/expertise/our-approach`
- `/insights`

## 3) Verify admin editability
- Edit each migrated page in `Admin > Pages/Sections`
- Confirm frontend reflects updates without code changes
- Publish/unpublish and verify visibility behavior

## 4) Navigation source of truth
- Ensure links are controlled via `menu_items` only
- Hide/remove pages by changing `menu_items.status` or deleting entry

## 5) Cleanup phase (after parity)
- Remove fallback static page content blocks only after manual verification
- Keep routes intact; avoid URL changes
