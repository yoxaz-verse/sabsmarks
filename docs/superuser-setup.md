# Super User Setup (One-Time)

Project: `https://omonppnrwvgcuyibicsu.supabase.co`

## 0) Verify app connection first
1. Ensure `.env.local` has:
   - `NEXT_PUBLIC_SUPABASE_URL=https://omonppnrwvgcuyibicsu.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
2. Restart dev server (`npm run dev`) after any env change.
3. Open `http://localhost:3000/api/health/auth` and check:
   - `supabaseUrl` is exactly `https://omonppnrwvgcuyibicsu.supabase.co`
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
1. Copy the new user's UUID from `Authentication` -> `Users`.
2. Run:

```sql
insert into user_roles (user_id, role)
values ('<USER_UUID>', 'admin')
on conflict (user_id)
do update set role = excluded.role;
```

Replace `<USER_UUID>` with the real UUID from auth.

## 3) Validate login and access
1. Open `/admin/login` in your app.
2. Sign in with:
   - `info@sabsmarksjvs.com`
   - `sabsmarksjvs@2024`
3. Confirm `/admin` dashboard loads and admin modules are accessible.
4. Open `http://localhost:3000/api/health/auth` again and check:
   - `auth.hasUser=true`
   - `auth.hasSession=true`
   - `role.value=admin`
   - `role.isAdmin=true`

## 4) Security status
`user_roles` now has RLS enabled in schema with only this policy:
- authenticated users can read only their own role row (`user_id = auth.uid()`).

No public insert/update/delete policy is provided for `user_roles`, so role mutation must be done via SQL editor/service-role context.
