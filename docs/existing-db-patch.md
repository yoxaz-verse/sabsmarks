# Existing Supabase DB Patch

Use this flow when your Supabase project already has CMS tables and you want to keep existing data.

## Run order
1. Run [`supabase/migrations/20260607_patch_existing_cms_db.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/supabase/migrations/20260607_patch_existing_cms_db.sql) to apply non-destructive schema drift fixes.
2. Run [`supabase/migrations/20260607_repair_existing_cms_auth_rls.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/supabase/migrations/20260607_repair_existing_cms_auth_rls.sql) to normalize CMS auth and RLS policies for existing projects.
3. Run [`docs/career-applications-db-patch.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/docs/career-applications-db-patch.sql) to add the private resume bucket and career applications table.
4. Ensure `.env.local` contains:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Restart the app after env changes.
6. Confirm the intended CMS user exists in Supabase Authentication and can sign in with email/password.
7. Confirm `public.user_roles` contains a row for that auth UUID with role `admin` or `editor`.
8. Log into `/admin/login` with that Supabase Auth user.
9. Open `http://localhost:3001/api/health/auth` to confirm the Supabase session is active.

## What each script does
- [`supabase/migrations/20260607_patch_existing_cms_db.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/supabase/migrations/20260607_patch_existing_cms_db.sql): adds missing non-destructive columns needed by the current CMS UI.
- [`supabase/migrations/20260607_repair_existing_cms_auth_rls.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/supabase/migrations/20260607_repair_existing_cms_auth_rls.sql): re-enables the expected CMS auth/RLS model by restoring `public.user_role()`, `public.can_edit()`, the canonical `user_roles` read policy, and the editor write policies used by the admin API.
- [`docs/career-applications-db-patch.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/docs/career-applications-db-patch.sql): adds the `career_applications` table and private `career-resumes` storage bucket.

## Do not run for this case
- [`supabase/full_reset_bootstrap.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/supabase/full_reset_bootstrap.sql): destructive reset, drops and recreates CMS tables.
- [`supabase/schema.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/supabase/schema.sql): base setup for a fresh project, not the preferred patch path for an existing database.
- [`supabase/seed.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/supabase/seed.sql): optional sample/starter content only.

## Validation
After the SQL runs, verify the database and app state:

- In Supabase SQL Editor, confirm `pg_policies` includes `public.user_roles -> user can read own role`.
- In Supabase SQL Editor, confirm `pg_policies` includes `public.team_members -> editor team write`.
- Confirm the intended auth user has a row in `public.user_roles` with role `admin` or `editor`.
- Open `http://localhost:3001/api/health/auth` and confirm:
- `auth.model = supabase-auth`
- `auth.hasUser = true`
- `auth.hasSession = true`
- `auth.role = admin` or `editor`
- `auth.roleError = null`
- `auth.serviceKeyPresent = true`

## Final verification
- Create a new Leadership entry in the admin UI and confirm the save succeeds.
- Edit an existing Leadership entry and confirm the update succeeds.
- Confirm published leadership entries still render publicly.
- Confirm a user without a `public.user_roles` row cannot save admin changes.
