
-- Create the user_groups table if it doesn't exist
create or replace function create_user_groups_table_if_needed()
returns void
language plpgsql
security definer
as $$
begin
  create table if not exists public.user_groups (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    group_name text not null,
    created_at timestamptz not null default now(),
    unique(user_id, group_name)
  );
end;
$$;

-- Create functions for working with user groups
create or replace function create_user_groups_functions()
returns void
language plpgsql
security definer
as $$
begin
  -- Function to get user groups
  create or replace function get_user_groups(user_id uuid)
  returns text[]
  language sql
  security definer
  as $$
    select array_agg(group_name) from public.user_groups where user_id = $1;
  $$;

  -- Function to save user groups
  create or replace function save_user_groups(user_id uuid, group_names text[])
  returns void
  language plpgsql
  security definer
  as $$
  begin
    -- Delete existing groups for this user
    delete from public.user_groups where user_id = $1;
    
    -- Insert new groups
    if array_length($2, 1) > 0 then
      for i in 1..array_length($2, 1) loop
        if $2[i] is not null and $2[i] != '' then
          insert into public.user_groups (user_id, group_name)
          values ($1, $2[i]);
        end if;
      end loop;
    end if;
  end;
  $$;
end;
$$;

-- Execute these functions to set up the tables and functions
select create_user_groups_table_if_needed();
select create_user_groups_functions();
