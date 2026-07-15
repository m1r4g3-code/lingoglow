-- classes had no policy letting a prospective student look up a class by
-- its join code before joining — only the teacher and existing members
-- could read a class row, which breaks the join-by-code flow entirely
-- (confirmed live: the lookup silently returned zero rows). Classes carry
-- no sensitive data (name/language/join_code), so a general
-- authenticated-read policy is the right fix, same reasoning as
-- study_groups' public-read design.

create policy "classes: authenticated can read to join" on classes
  for select using (auth.role() = 'authenticated');
