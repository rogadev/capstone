### Feb 28

- Styled our Register form.

- Simplified the logout script. I had a lot of unnecessary code in there.

- Working on the `register` form. The email registration is not working for some reason. Additionally, I realize that if I use social auth and allow new account creation, I'll be opening up the ability for users to create new accounts through one-click social auth. Supabase doesn't give me the ability to turn off new registration for each type of auth provider, which turns out to be kind of a big deal for us. I need some guidance on how to handle this.

### Feb 28

- I've spent several days trying to rework Auth to replace Supabase auth with Lucia. However, I've run into a number of problems with that setup as well. I've created the new `supabase-prisma` branch to do the following:

  - Keep Supabase for Auth only.
  - Bring in Prisma to act as our ORM and connect to Supabase using connection string.
  - On the admin dashboard, only allow registration in dev mode. Using a method of doing this that I figured out for the `prisma-lucia-integration` branch.
  - On the driver app, no registration method will be available, which, considering the fact that we're handling all auth functions in our backend, should make it so that we don't need to worry about drivers registering themselves.
  - Lastly, I'll need to create a server-side Supabase client that uses the `service_role` key to access the `supabase.auth.admin` methods. This will allow us to create new users (drivers and admin) from the admin dashboard.

> 💡 The goal here is by doing this I will be able to create 1 super admin user that will be able to create new drivers and admins while I'm setting up the project running in the dev environment. This will allow me to create a driver and admin user for myself and the client. Once I have created the primary admin client I can push the app to production where it will function as intended, allowing for the creation, editing, and deletion of driver and admin users.

- Fixed a number of large issues with auth modules including a broken import, a bugged package import that was causing a package-lock issue, and a bunch of refactoring.

- Worked on writing some automated tests to satisfy DevOps assignment.

- Replaced Playwright. SvelteKit is not designed to play nice with Playwright. I've replaced it with `vitest` + `testing-library`, specifically `testing-library/svelte`. This is a much better solution for SvelteKit.

- I've written a few quick tests for unit (using `vitest`) and integration (using `testing-library/svelte`). In doing so, I've also realized ways to improve the component I was testing - the ThemeToggle component. I've refactored it to be more testable and to be more flexible in the future.

- Added a logout route. This route will be used to log out the user and redirect them to the login page. If not logged in, short cct and redirect to login page anyway.

- TODO Need to add the logout link where applicable, instead of running a logout function.

- WIP - Removed route guarding in `server.hooks.ts`. Instead, trying to route-guard using `(grouping)` folders. I may revert this later if I can find a cleaner solution.

### Feb 18

- Lots of work went into the UI for '/drivers/new'

- I have working server-side validation that returns and displays errors to the client side. The idea is to return validation errors, but also to allow us to later check with the DB or Auth client to see if a user with that email has already been created, and if so, to navigate to that user's '/drivers/edit/\[user_id\]' to edit, rather than confirm the creation of a new user.

- I ran into an issue regarding the `supabase/auth-helpers-sveltekit` package. The auth helper doesn't take the `service_role` key which means that I don't have any access to the `supabase.auth.admin` methods which I require in order to create new users.

- I've reached out to my network to ask others what the would do in this situation. The options as I see them are:

  - Create a regular table and roll my own auth for all drivers
  - Implement another auth package like [Lucia](https://lucia-auth.vercel.app/sveltekit/start-here/getting-started) for the drivers and loosely integrate that auth with Supabase's tables and data. This would require manual auth checks for all CRUD operations requiring permissions/RLS.
  - Reroll auth and db with Lucia + Prisma.

- The third option is enticing because it may be that the best way to accomplish my end goal, given the current ecosystem of SvelteKit and auth. It may also be the most reliable and afford me some the additional benefits offered by Prisma.
