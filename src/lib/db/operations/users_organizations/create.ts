import { z, ZodError } from 'zod';
import supabase from '$lib/db';
import { generateLogTimestamp } from '$lib/db/utils';
import { deleteOrganization } from '../organizations/delete';

// SCHEMA
const usersOrganizationsSchema = z.object({
  user_id: z.string().uuid(),
  organization_id: z.number().int(),
  user_is_owner: z.boolean().default(false),
});

// SCHEMA TYPE
export type UsersOrganization = z.infer<typeof usersOrganizationsSchema>;

// SCHEMA VALIDATION
const schemaValidation = (usersOrganization: UsersOrganization) => {
  try {
    usersOrganizationsSchema.parse(usersOrganization);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(`ERROR: Error creating users_organizations. ${generateLogTimestamp()}`);
      for (const issue of error.issues) {
        console.error(issue);
      }
      return { success: false, error: error.issues };
    }
    return { success: false, error };
  }
  return { success: true, error: null };
};

// OPERATION
export const createUsersOrganization = async (usersOrganization: UsersOrganization) => {
  // SCHEMA VALIDATION
  let { error, success } = schemaValidation(usersOrganization);
  if (!success) return { error, success };
  // CREATE USERS_ORGANIZATIONS
  try {
    const { error: e } = await supabase
      .from('users_organizations')
      .insert({ user_id, organization_id, user_is_owner });
    error = e;
  } catch (e) {
    console.error(`ERROR: Error creating users_organizations. ${generateLogTimestamp()}`);
    console.info(`User ID: ${user_id}`);
    console.info(`Organization ID: ${organization_id}`);
    console.info(`Error: ${e}`);
    await deleteOrganization(organization_id);
    return { error, success: false };
  }
  if (error) {
    console.error(`ERROR: Error creating users_organizations. ${generateLogTimestamp()}`);
    console.info(`User ID: ${user_id}`);
    console.info(`Organization ID: ${organization_id}`);
    console.info(`Error: ${error}`);
    success = false;
  }
  return { error, success };
};

