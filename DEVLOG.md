### Feb 19

- Forked the repo for a lucia/prisma integration test.

- Setup Prisma integration.

- Tested Prisma connection to Supabase test database. ✅ Works great!

- Created testing Prisma schema and started adding tables and fields in preparation of adding Lucia auth and integration with the login process, as well as the invite driver process.

- Talked with Oskr in my developer network who had some great high-level suggestions on how to implement an invitation token into the app. I need to dig deeper and maybe get him to give me a more mid-level run-through of how to get it done, but certainly promising. Major takeaways:
  1. Admin wants to invite Bob. On the admin's driver invite page "https://eztripr.com/driver/new", she enters his email address and hits "invite".
  2. Bob receives an invitation email with a link like "/onboarding/\[token\]" or more accurately "https://app.eztripr.com/onboarding/59e98258-1c47-43e2-a777-bc87fc9afe7a".
  3. When Bob follows the link, and the invitation `token` is found in the invitation table, bob is allowed to register by entering the rest of his details. The last details will be a password, or Bob can opt to sign up using social auth (maybe - TBD).
  4. For Bob to log in, he visits "https://app.eztrip.com/login" which is the **driver** login page for the app, specifically.

### Feb 18

- Lots of work went into the UI for '/drivers/new'

- I have working server-side validation that returns and displays errors to the client side. The idea is to return validation errors, but also to allow us to later check with the DB or Auth client to see if a user with that email has already been created, and if so, to navigate to that user's '/drivers/edit/\[user_id\]' to edit, rather than confirm the creation of a new user.

- I ran into an issue regarding the `supabase/auth-helpers-sveltekit` package. The auth helper doesn't take the `service_role` key which means that I don't have any access to the `supabase.auth.admin` methods which I require in order to create new users.

- I've reached out to my network to ask others what the would do in this situation. The options as I see them are:

  - Create a regular table and roll my own auth for all drivers
  - Implement another auth package like [Lucia](https://lucia-auth.vercel.app/sveltekit/start-here/getting-started) for the drivers and loosely integrate that auth with Supabase's tables and data. This would require manual auth checks for all CRUD operations requiring permissions/RLS.
  - Reroll auth and db with Lucia + Prisma.

- The third option is enticing because it may be that the best way to accomplish my end goal, given the current ecosystem of SvelteKit and auth. It may also be the most reliable and afford me some the additional benefits offered by Prisma.
