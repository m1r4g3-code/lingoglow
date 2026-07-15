-- Phase 2: XP/coins/streaks (extends user_progress), missions, badges,
-- and a leaderboard function. Mission/badge catalogs are static client-side
-- data (like the lesson content), not DB-managed — these tables just track
-- each user's progress against a known set of codes.

alter table user_progress add column if not exists total_reviews int not null default 0;

create table user_missions (
  user_id uuid not null references profiles(id) on delete cascade,
  mission_code text not null,
  progress int not null default 0,
  period_key text not null, -- e.g. "2026-07-15" (daily) or "2026-W29" (weekly); resets when the key rolls over
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, mission_code)
);

alter table user_missions enable row level security;

create policy "user_missions: owner rw" on user_missions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table user_badges (
  user_id uuid not null references profiles(id) on delete cascade,
  badge_code text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_code)
);

alter table user_badges enable row level security;

create policy "user_badges: owner rw" on user_badges
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "user_badges: public read" on user_badges
  for select using (true);

create or replace function get_leaderboard(scope text, scope_id uuid default null)
returns table (user_id uuid, username text, avatar_url text, xp int, level int)
language sql
security definer
stable
as $$
  select p.id, p.username, p.avatar_url, up.xp, up.level
  from user_progress up
  join profiles p on p.id = up.user_id
  where
    scope = 'global'
    or (scope = 'friends' and (
      up.user_id = auth.uid()
      or exists (
        select 1 from friendships f
        where f.status = 'accepted'
          and ((f.requester_id = auth.uid() and f.addressee_id = up.user_id)
            or (f.addressee_id = auth.uid() and f.requester_id = up.user_id))
      )
    ))
    or (scope = 'group' and scope_id is not null and exists (
      select 1 from study_group_members m where m.group_id = scope_id and m.user_id = up.user_id
    ))
  order by up.xp desc
  limit 50;
$$;

grant execute on function get_leaderboard(text, uuid) to authenticated, anon;
