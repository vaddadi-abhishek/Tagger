// modules/auth/utils/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// console.log("SUPABASE_URL:", process.env.EXPO_PUBLIC_SUPABASE_URL);



export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    flowType: "pkce",
    detectSessionInUrl: false,
  },
});
