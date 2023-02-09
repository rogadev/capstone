import { getServerSession } from "@supabase/auth-helpers-sveltekit";
const load = async (event) => {
  const session = await getServerSession(event);
  return {
    session
  };
};
export {
  load
};
