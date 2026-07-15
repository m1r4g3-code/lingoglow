-- Phase 6: tier column for premium-gating demo purposes only — no real
-- billing is wired up (schema/UI gating only, per the plan's exclusions).
alter table profiles add column if not exists tier text not null default 'free' check (tier in ('free', 'premium'));
