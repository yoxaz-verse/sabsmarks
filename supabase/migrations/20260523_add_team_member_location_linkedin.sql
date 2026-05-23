alter table if exists team_members
  add column if not exists location text,
  add column if not exists linkedin_url text;
