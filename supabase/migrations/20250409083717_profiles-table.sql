revoke delete on table "public"."example_table" from "anon";

revoke insert on table "public"."example_table" from "anon";

revoke references on table "public"."example_table" from "anon";

revoke select on table "public"."example_table" from "anon";

revoke trigger on table "public"."example_table" from "anon";

revoke truncate on table "public"."example_table" from "anon";

revoke update on table "public"."example_table" from "anon";

revoke delete on table "public"."example_table" from "authenticated";

revoke insert on table "public"."example_table" from "authenticated";

revoke references on table "public"."example_table" from "authenticated";

revoke select on table "public"."example_table" from "authenticated";

revoke trigger on table "public"."example_table" from "authenticated";

revoke truncate on table "public"."example_table" from "authenticated";

revoke update on table "public"."example_table" from "authenticated";

revoke delete on table "public"."example_table" from "service_role";

revoke insert on table "public"."example_table" from "service_role";

revoke references on table "public"."example_table" from "service_role";

revoke select on table "public"."example_table" from "service_role";

revoke trigger on table "public"."example_table" from "service_role";

revoke truncate on table "public"."example_table" from "service_role";

revoke update on table "public"."example_table" from "service_role";

alter table "public"."example_table" drop constraint "example_table_pkey";

drop index if exists "public"."example_table_pkey";

drop table "public"."example_table";

create table "public"."profiles" (
    "id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "username" text not null,
    "avatar_url" text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profile_avatar_url_key ON public.profiles USING btree (avatar_url);

CREATE UNIQUE INDEX profile_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profile_pseudo_key ON public.profiles USING btree (username);

alter table "public"."profiles" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."profiles" add constraint "profile_avatar_url_key" UNIQUE using index "profile_avatar_url_key";

alter table "public"."profiles" add constraint "profile_pseudo_key" UNIQUE using index "profile_pseudo_key";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";


