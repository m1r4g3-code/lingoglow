-- Phase 0: accounts, per-user SRS/progress sync, friends, study groups,
-- teacher classes, parent links. RLS enabled on every table.

create extension if not exists "pgcrypto";

-- ───────────────────────── profiles ─────────────────────────
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  role text not null default 'student' check (role in ('student','teacher','parent','admin')),
  has_claimed_local boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

create policy "profiles: self read/write" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "profiles: public read of basic fields" on profiles
  for select using (true);

-- Auto-create a profile row when a new auth user signs up.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(split_part(new.email, '@', 1), 'user_' || substr(new.id::text, 1, 8)));
  insert into public.user_progress (user_id) values (new.id);
  return new;
end;
$$;

-- (trigger created after user_progress table below)

-- limited public projection for friends/leaderboard lookups
create view public_profiles as
  select id, username, display_name, avatar_url from profiles;

-- ───────────────────────── srs_states ─────────────────────────
create table srs_states (
  user_id uuid not null references profiles(id) on delete cascade,
  card_id text not null,
  interval int not null,
  ease numeric not null,
  reps int not null,
  due_date timestamptz not null,
  is_favorite boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

alter table srs_states enable row level security;

create policy "srs_states: owner rw" on srs_states
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "srs_states: admin read" on srs_states
  for select using (is_admin());

-- (teacher/parent read policies for srs_states are added near the bottom,
-- after classes/class_rosters/parent_links exist)

-- ───────────────────────── user_progress ─────────────────────────
create table user_progress (
  user_id uuid primary key references profiles(id) on delete cascade,
  xp int not null default 0,
  coins int not null default 0,
  level int not null default 1,
  streak_current int not null default 0,
  streak_longest int not null default 0,
  last_study_date date,
  updated_at timestamptz not null default now()
);

alter table user_progress enable row level security;

create policy "user_progress: owner rw" on user_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "user_progress: public read for leaderboards" on user_progress
  for select using (true);

-- (public-read policy above already covers teacher visibility into student
-- xp/streaks; no separate teacher policy needed for this table)

-- now that user_progress exists, attach the signup trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ───────────────────────── friendships ─────────────────────────
create table friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references profiles(id) on delete cascade,
  addressee_id uuid not null references profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted','blocked')),
  created_at timestamptz not null default now(),
  unique (requester_id, addressee_id)
);

alter table friendships enable row level security;

create policy "friendships: participants rw" on friendships
  for all using (auth.uid() = requester_id or auth.uid() = addressee_id)
  with check (auth.uid() = requester_id or auth.uid() = addressee_id);

-- ───────────────────────── study groups ─────────────────────────
create table study_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  owner_id uuid not null references profiles(id) on delete cascade,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

alter table study_groups enable row level security;

create policy "study_groups: public read" on study_groups
  for select using (is_public or owner_id = auth.uid());

create policy "study_groups: owner write" on study_groups
  for insert with check (owner_id = auth.uid());

create policy "study_groups: owner update/delete" on study_groups
  for update using (owner_id = auth.uid());

create policy "study_groups: owner delete" on study_groups
  for delete using (owner_id = auth.uid());

create table study_group_members (
  group_id uuid not null references study_groups(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','member')),
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

alter table study_group_members enable row level security;

create policy "study_group_members: members read" on study_group_members
  for select using (
    exists (
      select 1 from study_group_members m
      where m.group_id = study_group_members.group_id and m.user_id = auth.uid()
    )
    or exists (
      select 1 from study_groups g
      where g.id = study_group_members.group_id and (g.is_public or g.owner_id = auth.uid())
    )
  );

create policy "study_group_members: self join" on study_group_members
  for insert with check (user_id = auth.uid());

create policy "study_group_members: owner manage" on study_group_members
  for delete using (
    user_id = auth.uid()
    or exists (select 1 from study_groups g where g.id = study_group_members.group_id and g.owner_id = auth.uid())
  );

-- ───────────────────────── teacher classes ─────────────────────────
create table classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  teacher_id uuid not null references profiles(id) on delete cascade,
  language_id text not null,
  join_code text unique not null,
  created_at timestamptz not null default now()
);

alter table classes enable row level security;

create policy "classes: teacher rw" on classes
  for all using (teacher_id = auth.uid()) with check (teacher_id = auth.uid());

-- (roster-members-read policy for classes is added after class_rosters exists, below)

create table class_rosters (
  class_id uuid not null references classes(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, student_id)
);

alter table class_rosters enable row level security;

create policy "class_rosters: student self read" on class_rosters
  for select using (student_id = auth.uid());

create policy "class_rosters: teacher read/manage" on class_rosters
  for select using (
    exists (select 1 from classes c where c.id = class_rosters.class_id and c.teacher_id = auth.uid())
  );

create policy "class_rosters: student self join" on class_rosters
  for insert with check (student_id = auth.uid());

create policy "classes: roster members read" on classes
  for select using (
    exists (select 1 from class_rosters cr where cr.class_id = classes.id and cr.student_id = auth.uid())
  );

create policy "class_rosters: leave or teacher remove" on class_rosters
  for delete using (
    student_id = auth.uid()
    or exists (select 1 from classes c where c.id = class_rosters.class_id and c.teacher_id = auth.uid())
  );

-- now that classes/class_rosters exist, add the deferred teacher-read policy
create policy "srs_states: teacher read of students" on srs_states
  for select using (
    exists (
      select 1 from class_rosters cr
      join classes c on c.id = cr.class_id
      where cr.student_id = srs_states.user_id and c.teacher_id = auth.uid()
    )
  );

-- ───────────────────────── parent links ─────────────────────────
create table parent_links (
  parent_id uuid not null references profiles(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted')),
  created_at timestamptz not null default now(),
  primary key (parent_id, student_id)
);

alter table parent_links enable row level security;

create policy "parent_links: participants rw" on parent_links
  for all using (auth.uid() = parent_id or auth.uid() = student_id)
  with check (auth.uid() = parent_id or auth.uid() = student_id);

-- parents can read their linked (accepted) students' progress/srs
create policy "srs_states: parent read of linked students" on srs_states
  for select using (
    exists (
      select 1 from parent_links pl
      where pl.student_id = srs_states.user_id and pl.parent_id = auth.uid() and pl.status = 'accepted'
    )
  );

create policy "user_progress: parent read of linked students" on user_progress
  for select using (
    exists (
      select 1 from parent_links pl
      where pl.student_id = user_progress.user_id and pl.parent_id = auth.uid() and pl.status = 'accepted'
    )
  );
