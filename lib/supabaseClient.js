import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createCLient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

export { supabase };
