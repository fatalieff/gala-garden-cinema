import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hertntoelhfmfeyzicoi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcnRudG9lbGhmbWZleXppY29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NzA0MjMsImV4cCI6MjA5NzM0NjQyM30.BG_v2Vlv2i5EabkW6e3OF3AHt0XR8M-0eFwRP1uod14";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
