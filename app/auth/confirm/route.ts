import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/supabaseServer";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  console.log("requerUrl", requestUrl);
  const code = requestUrl.searchParams.get("code");
  console.log("code", code);
  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("error", error);
    console.log("data", data);
  }

  // URL où rediriger après une connexion réussie
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
