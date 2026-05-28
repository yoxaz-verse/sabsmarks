# Super User Setup (One-Time)

Project: `https://yjjumukvwepfyakcmjqg.supabase.co`

## 0) Verify app connection first
1. Ensure `.env.local` has:
   - `NEXT_PUBLIC_SUPABASE_URL=https://yjjumukvwepfyakcmjqg.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
   - `SUPABASE_SERVICE_ROLE_KEY=...` (required for deterministic server-side role checks)
2. Restart dev server (`npm run dev`) after any env change.
3. Open `http://localhost:3001/api/health/auth` and check:
   - `supabaseUrl` is exactly `https://yjjumukvwepfyakcmjqg.supabase.co`
   - before login: `auth.hasUser=false`, `auth.hasSession=false`

## 1) Create auth user in Supabase dashboard
1. Open Supabase Dashboard.
2. Go to `Authentication` -> `Users`.
3. Click `Add user`.
4. Enter:
   - Email: `info@sabsmarksjvs.com`
   - Password: `sabsmarksjvs@2024`
5. Turn on auto-confirm (so email verification is not required).
6. Create the user.

## 2) Assign admin role in SQL editor
1. Sign in at `/admin/login` with the target account.
2. Open `http://localhost:3001/api/health/auth`.
3. Copy `auth.userId` from the API response. Use this exact value as the role key.
4. Optional cross-check in SQL editor:

```sql
select id, email
from auth.users
where id = '<AUTH_USER_ID_FROM_API_HEALTH>';
```

5. Run:

```sql
insert into user_roles (user_id, role)
values ('<USER_UUID>', 'admin')
on conflict (user_id)
do update set role = excluded.role;
```

Replace `<USER_UUID>` with `auth.userId` from `GET /api/health/auth`.

6. If old users were recreated, remove stale `user_roles` rows that do not match the current `auth.userId`.

## 3) Validate login and access
1. Open `/admin/login` in your app.
2. Sign in with:
   - `info@sabsmarksjvs.com`
   - `sabsmarksjvs@2024`
3. Confirm `/admin` dashboard loads and admin modules are accessible.
4. Open `http://localhost:3001/api/health/auth` again and check:
   - `auth.hasUser=true`
   - `auth.hasSession=true`
   - `role.value=admin`
   - `role.isAdmin=true`

## 4) Security status
`user_roles` now has RLS enabled in schema with only this policy:
- authenticated users can read only their own role row (`user_id = auth.uid()`).

No public insert/update/delete policy is provided for `user_roles`, so role mutation must be done via SQL editor/service-role context.

## 5) If `role.value` is still null (policy drift repair)
Run [`supabase/repair_user_roles_policy.sql`](/Users/jacoob/Documents/Dev/Sabs%20marks/cfa-cms/supabase/repair_user_roles_policy.sql) in Supabase SQL Editor.

Then run these checks:

```sql
-- Replace with auth.userId from /api/health/auth
select id, email
from auth.users
where id = '<AUTH_USER_ID>';

select *
from public.user_roles
where user_id = '<AUTH_USER_ID>';

select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'user_roles'
order by policyname;
```

Expected:
- One select policy named `user can read own role` on `public.user_roles`
- `qual` equivalent to `user_id = auth.uid()`
- `public.user_roles` contains exactly one row for your active `auth.userId`
