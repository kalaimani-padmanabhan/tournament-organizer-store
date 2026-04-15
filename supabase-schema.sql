create table if not exists public.app_state (
    id text primary key,
    payload jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_runtime_state (
    id text primary key,
    draft_tournament jsonb not null default '{}'::jsonb,
    draft_import_meta jsonb not null default '{}'::jsonb,
    draft_teams jsonb not null default '[]'::jsonb,
    draft_matches jsonb not null default '[]'::jsonb,
    draft_announcements jsonb not null default '[]'::jsonb,
    ui_state jsonb not null default '{}'::jsonb,
    last_saved_at text not null default '',
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_roles (
    user_id uuid primary key references auth.users(id) on delete cascade,
    role text not null check (role in ('super_admin', 'progress_user')),
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.tournaments (
    workspace_id text not null default 'primary',
    id text not null,
    name text not null default '',
    format text not null default 'League',
    match_rule text not null default 'single_25',
    category text not null default '',
    notes text not null default '',
    player_count integer not null default 0,
    import_meta jsonb not null default '{}'::jsonb,
    bracket jsonb,
    sort_order integer not null default 0,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),
    primary key (workspace_id, id)
);

create table if not exists public.tournament_players (
    workspace_id text not null default 'primary',
    id text not null,
    tournament_id text not null,
    name text not null default '',
    contact text not null default '',
    registration_number text not null default '',
    aadhar text not null default '',
    organization text not null default '',
    category text not null default '',
    source text not null default '',
    sort_order integer not null default 0,
    updated_at timestamptz not null default timezone('utc', now()),
    primary key (workspace_id, id),
    foreign key (workspace_id, tournament_id) references public.tournaments(workspace_id, id) on delete cascade
);

create table if not exists public.tournament_matches (
    workspace_id text not null default 'primary',
    id text not null,
    tournament_id text not null,
    team_a text not null default '',
    team_b text not null default '',
    payload jsonb not null default '{}'::jsonb,
    sort_order integer not null default 0,
    updated_at timestamptz not null default timezone('utc', now()),
    primary key (workspace_id, id),
    foreign key (workspace_id, tournament_id) references public.tournaments(workspace_id, id) on delete cascade
);

create table if not exists public.tournament_announcements (
    workspace_id text not null default 'primary',
    id text not null,
    tournament_id text not null,
    message text not null default '',
    payload jsonb not null default '{}'::jsonb,
    sort_order integer not null default 0,
    updated_at timestamptz not null default timezone('utc', now()),
    primary key (workspace_id, id),
    foreign key (workspace_id, tournament_id) references public.tournaments(workspace_id, id) on delete cascade
);

create index if not exists tournament_players_workspace_tournament_idx
    on public.tournament_players (workspace_id, tournament_id, sort_order);

create index if not exists tournament_matches_workspace_tournament_idx
    on public.tournament_matches (workspace_id, tournament_id, sort_order);

create index if not exists tournament_announcements_workspace_tournament_idx
    on public.tournament_announcements (workspace_id, tournament_id, sort_order);

alter table public.app_state enable row level security;
alter table public.app_runtime_state enable row level security;
alter table public.user_roles enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_players enable row level security;
alter table public.tournament_matches enable row level security;
alter table public.tournament_announcements enable row level security;

create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
    select role
    from public.user_roles
    where user_id = auth.uid()
    limit 1
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select coalesce(public.current_app_role() = 'super_admin', false)
$$;

create or replace function public.is_progress_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select coalesce(public.current_app_role() = 'progress_user', false)
$$;

drop policy if exists "authenticated read app state" on public.app_state;
drop policy if exists "public read app state" on public.app_state;
create policy "super admin read app state"
on public.app_state
for select
to authenticated
using (public.is_super_admin());

drop policy if exists "authenticated write app state" on public.app_state;
drop policy if exists "public write app state" on public.app_state;
create policy "super admin write app state"
on public.app_state
for insert
to authenticated
with check (public.is_super_admin());

drop policy if exists "authenticated update app state" on public.app_state;
drop policy if exists "public update app state" on public.app_state;
create policy "super admin update app state"
on public.app_state
for update
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "authenticated delete app state" on public.app_state;
drop policy if exists "public delete app state" on public.app_state;
create policy "super admin delete app state"
on public.app_state
for delete
to authenticated
using (public.is_super_admin());

drop policy if exists "authenticated runtime state access" on public.app_runtime_state;
drop policy if exists "public runtime state access" on public.app_runtime_state;
create policy "super admin runtime state access"
on public.app_runtime_state
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "read own user role" on public.user_roles;
create policy "read own user role"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "authenticated tournaments access" on public.tournaments;
drop policy if exists "public tournaments access" on public.tournaments;
create policy "super admin tournaments access"
on public.tournaments
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "progress user read tournaments" on public.tournaments;
create policy "progress user read tournaments"
on public.tournaments
for select
to authenticated
using (public.is_progress_user());

drop policy if exists "progress user update tournaments" on public.tournaments;
create policy "progress user update tournaments"
on public.tournaments
for update
to authenticated
using (public.is_progress_user())
with check (public.is_progress_user());

drop policy if exists "authenticated tournament players access" on public.tournament_players;
drop policy if exists "public tournament players access" on public.tournament_players;
create policy "super admin tournament players access"
on public.tournament_players
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "progress user read tournament players" on public.tournament_players;
create policy "progress user read tournament players"
on public.tournament_players
for select
to authenticated
using (public.is_progress_user());

drop policy if exists "authenticated tournament matches access" on public.tournament_matches;
drop policy if exists "public tournament matches access" on public.tournament_matches;
create policy "super admin tournament matches access"
on public.tournament_matches
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "progress user read tournament matches" on public.tournament_matches;
create policy "progress user read tournament matches"
on public.tournament_matches
for select
to authenticated
using (public.is_progress_user());

drop policy if exists "authenticated tournament announcements access" on public.tournament_announcements;
drop policy if exists "public tournament announcements access" on public.tournament_announcements;
create policy "super admin tournament announcements access"
on public.tournament_announcements
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "progress user read tournament announcements" on public.tournament_announcements;
create policy "progress user read tournament announcements"
on public.tournament_announcements
for select
to authenticated
using (public.is_progress_user());
