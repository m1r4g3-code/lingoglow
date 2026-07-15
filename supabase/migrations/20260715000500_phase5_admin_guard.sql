-- Phase 5 prerequisite: "profiles: self read/write" (Phase 0) lets a user
-- update any column on their own row, including `role` — meaning any
-- client could currently set their own role to 'admin' directly via the
-- REST API. Block that specifically while still letting a service-role
-- process (or direct SQL) promote a real admin.

create or replace function prevent_self_admin_promotion()
returns trigger
language plpgsql
as $$
begin
  if new.role = 'admin' and old.role is distinct from 'admin' and auth.role() = 'authenticated' then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists guard_admin_promotion on profiles;
create trigger guard_admin_promotion
  before update on profiles
  for each row execute function prevent_self_admin_promotion();
