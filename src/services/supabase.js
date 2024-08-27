import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://euvtibscwhpmdjjaqebk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1dnRpYnNjd2hwbWRqamFxZWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0MzkxMDksImV4cCI6MjAzNzAxNTEwOX0.GHYPnWiWMnf_x-bR5DVlEXFF0JzMa4OV_xmQee4VbJk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
