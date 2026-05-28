alter table public.family_spaces
  add column if not exists cloud_token text;

create unique index if not exists family_spaces_cloud_token_unique
  on public.family_spaces (cloud_token)
  where cloud_token is not null;
