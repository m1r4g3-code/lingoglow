-- Phase 4: the only new schema social needs — friendships and
-- study_groups/study_group_members already got full CRUD RLS in Phase 0.
-- This adds a simple flat discussion board per study group (no threaded
-- comments, kept intentionally simple).

create table group_posts (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references study_groups(id) on delete cascade,
  author_id uuid not null references profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

alter table group_posts enable row level security;

create policy "group_posts: members and public-group readers can read" on group_posts
  for select using (
    exists (select 1 from study_groups g where g.id = group_posts.group_id and g.is_public)
    or exists (select 1 from study_group_members m where m.group_id = group_posts.group_id and m.user_id = auth.uid())
  );

create policy "group_posts: members can post" on group_posts
  for insert with check (
    author_id = auth.uid()
    and exists (select 1 from study_group_members m where m.group_id = group_posts.group_id and m.user_id = auth.uid())
  );

create policy "group_posts: author or group owner can delete" on group_posts
  for delete using (
    author_id = auth.uid()
    or exists (select 1 from study_groups g where g.id = group_posts.group_id and g.owner_id = auth.uid())
  );
