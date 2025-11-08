import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../utils/supabaseClient";

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
    console.log("Redirect URL:", redirectUrl);

    // Get Supabase OAuth URL
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl },
    });

    if (error) throw error;

    // Open in browser / proxy
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

    if (result.type !== "success") throw new Error("Login cancelled or failed");

    // Supabase auto-detects session via URL
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;

    return sessionData.session;
  } catch (err) {
    console.error("Google Sign-in Error:", err);
    throw err;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
