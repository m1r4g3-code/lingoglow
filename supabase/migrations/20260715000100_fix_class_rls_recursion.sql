-- classes <-> class_rosters policies referenced each other directly, which
-- Postgres detects as infinite recursion once a third table (srs_states)
-- joins through both. Break the cycle with SECURITY DEFINER helpers (same
-- pattern as is_admin()), which bypass RLS on the table they query so the
-- cross-reference doesn't re-trigger policy evaluation.

create or replace function is_teacher_of_class(target_class_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from classes c where c.id = target_class_id and c.teacher_id = auth.uid()
  );
$$;

create or replace function is_class_member(target_class_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from class_rosters cr where cr.class_id = target_class_id and cr.student_id = auth.uid()
  );
$$;

drop policy if exists "classes: roster members read" on classes;
create policy "classes: roster members read" on classes
  for select using (is_class_member(classes.id));

drop policy if exists "class_rosters: teacher read/manage" on class_rosters;
create policy "class_rosters: teacher read/manage" on class_rosters
  for select using (is_teacher_of_class(class_rosters.class_id));

drop policy if exists "class_rosters: leave or teacher remove" on class_rosters;
create policy "class_rosters: leave or teacher remove" on class_rosters
  for delete using (student_id = auth.uid() or is_teacher_of_class(class_rosters.class_id));

drop policy if exists "srs_states: teacher read of students" on srs_states;
create policy "srs_states: teacher read of students" on srs_states
  for select using (
    exists (
      select 1 from class_rosters cr
      where cr.student_id = srs_states.user_id and is_teacher_of_class(cr.class_id)
    )
  );
