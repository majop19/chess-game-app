import { createClient } from "../utils/supabase/supabaseServer";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return <p>{error.message}</p>;

  if (!user) return <p>uqfbbdfbde</p>;

  return <p>{user.email}</p>;
}
