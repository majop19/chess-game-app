alter table "public"."profiles" add column "description" text;

CREATE UNIQUE INDEX profiles_id_key ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";


