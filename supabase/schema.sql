-- Pixelpath Academy: run this first in Supabase > SQL Editor, then run seed.sql

create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Technology','Design','Business','Career')),
  level text not null check (level in ('Beginner','Intermediate','Advanced')),
  duration_weeks int not null,
  price int not null,
  instructor text not null,
  rating numeric(2,1) not null default 4.5,
  learners int not null default 0,
  summary text not null,
  description text not null,
  outcomes text[] not null default '{}',
  syllabus text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;
alter table public.messages enable row level security;

-- Anyone can read courses
drop policy if exists "Public can read courses" on public.courses;
create policy "Public can read courses" on public.courses
  for select to anon, authenticated using (true);

-- Anyone can send a message, but nobody can read them with the public key
drop policy if exists "Public can send messages" on public.messages;
create policy "Public can send messages" on public.messages
  for insert to anon, authenticated with check (true);
