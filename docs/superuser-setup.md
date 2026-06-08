# Supabase Admin Setup

## Required environment
Add these values to `.env.local` and restart `npm run dev`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Create the admin user
1. Open your Supabase project dashboard.
2. Go to `Authentication` -> `Users`.
3. Create or confirm the user account you want to use for CMS access.
4. Make sure the account can sign in with email and password.

## Assign CMS role
Add a row to `public.user_roles` for that authenticated user:

```sql
insert into public.user_roles (user_id, role)
values ('<SUPABASE_AUTH_USER_ID>', 'admin')
on conflict (user_id)
do update set role = excluded.role;
```

Use `admin` or `editor` as the role value.

## Login flow
1. Start the app.
2. Open `/admin/login`.
3. Sign in with the Supabase Auth email and password.
4. The app will use the Supabase session and admit the user to `/admin` when `public.user_roles` contains `admin` or `editor`.

## Health check
Open `http://localhost:3001/api/health/auth` in development.

Expected before login:
- `auth.hasUser = false`
- `auth.hasSession = false`

Expected after login:
- `auth.hasUser = true`
- `auth.hasSession = true`
- `auth.role = admin` or `editor`
- `auth.isAdmin = true` when role is `admin`

## If admin login fails
- Confirm the user exists in Supabase Authentication and can sign in manually.
- Confirm `public.user_roles` contains a row for that user’s auth UUID.
- Confirm the role value is `admin` or `editor`.
- Confirm the dev server was restarted after env changes.
