// import { expect, it, describe } from 'vitest';
// import supabase from '$lib/db';
// import { getUsersOrganizations } from '../operations/user_organizations/get';
// import { createOrganization } from '../operations/organizations/create';
// import { getServerSession } from '@supabase/auth-helpers-sveltekit';

// describe('Supabase Functions Testing', () => {
//   /* NOTE: We can't test creating a user unless we have a way to delete it.
//    * At the time of running these tests, we do not have a way to delete a user using the supabase js client. */
//   let userId;
//   it('should sign us in with email and password', async () => {
//     const { error, data } = await getServerSession(supabase)
//      supabase.auth.signInWithPassword({
//       email: 'ryanroga+test@gmail.com',
//       password: 'testyMcTestFace123$',
//     });
//     userId = data.user.id;
//     console.log('userId', userId);
//     expect(userId).not.toBe(undefined);
//     expect(error).toBe(null);
//   });
//   it("should not return users organizations because we haven't created any yet", async () => {
//     const { data, error } = await getUsersOrganizations(userId as string);
//     console.log('data, should be null, is:', data);
//     console.log('error, should be null, is:', error);
//     expect(data).toBe(null);
//     expect(error).toBe(null);
//   });
//   it('should create a new organization', async () => {
//     const result = await supabase.auth.signInWithPassword({
//       email: 'ryanroga+test@gmail.com',
//       password: 'testyMcTestFace123$',
//     });
//     const outcome = await supabase.auth.getUser();
//     console.log('result', outcome);

//     const { success, error } = await createOrganization({
//       name: 'Test Organization',
//       slug: 'test-organization',
//       public_email: 'test@email.com',
//       public_phone: '1234567890',
//       public_address: '123 Test St',
//       public_website: 'https://test.com',
//       show_email: true,
//       show_phone: true,
//       show_address: true,
//       show_website: true
//     });
//     console.log('success', success);
//     console.log('error', error);
//     expect(success).not.toBe(null);
//     expect(error).toBe(null);
//   });
// });

