// modules/auth/api/auth.api.ts
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../utils/supabaseClient";

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({ useProxy: false });
    console.log(redirectUrl)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;
    const authUrl = data?.url;
    if (!authUrl) throw new Error("No auth URL returned from Supabase");

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

    if (result.type === "success" && result.url) {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSessionFromUrl({
          url: result.url,
          storeSession: true, // Supabase stores session internally
        });

      if (sessionError) throw sessionError;
      return sessionData.session;
    }
  } catch (err) {
    console.error("Google Sign-in Error:", err);
    throw err;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
