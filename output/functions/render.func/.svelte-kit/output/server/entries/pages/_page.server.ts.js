import { f as fail, r as redirect } from "../../chunks/index.js";
import { s as supabaseClient } from "../../chunks/db.js";
const actions = {
  login: async ({ url }) => {
    const provider = url.searchParams.get("provider");
    const { data, error } = await supabaseClient.auth.signInWithOAuth({ provider, options: { redirectTo: `${url.origin}/dashboard` } });
    if (error) {
      console.error(`Error logging in with Supabase. Provider: ${provider}. Error: ${error.message}`);
      return fail(400, "Something went wrong");
    }
    throw redirect(303, data.url);
  }
};
export {
  actions
};
