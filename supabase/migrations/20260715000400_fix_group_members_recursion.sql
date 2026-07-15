-- study_group_members' own "members read" policy queried
-- study_group_members from within itself (self-referential EXISTS),
-- which Postgres detects as infinite recursion — same root cause as the
-- classes/class_rosters fix earlier, just self-referencing this time.
-- Same fix: a SECURITY DEFINER helper breaks the cycle.

create or replace function is_member_of_group(target_group_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from study_group_members m where m.group_id = target_group_id and m.user_id = auth.uid()
  );
$$;

drop policy if exists "study_group_members: members read" on study_group_members;
create policy "study_group_members: members read" on study_group_members
  for select using (
    is_member_of_group(study_group_members.group_id)
    or exists (
      select 1 from study_groups g
      where g.id = study_group_members.group_id and (g.is_public or g.owner_id = auth.uid())
    )
  );
