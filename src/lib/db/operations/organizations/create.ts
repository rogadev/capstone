import { z, ZodError } from 'zod';
import supabase from '$lib/db';
import { SLUG_REGEX } from '$lib/db/config';
import { generateLogTimestamp } from '$lib/db/utils';
import { createUsersOrganization } from '$lib/db/operations/users_organizations/create';

// SCHEMA
const organizationSchema = z.object({
  created_by: z.string().uuid(),
  name: z.string().min(4).max(50),
  slug: z.string().min(4).max(15).regex(SLUG_REGEX, { message: "Organization's slug must be lowercase alphanumeric characters and hyphens only." }),
  public_email: z.string().email().max(100),
  public_phone: z.string().min(10).max(20),
  public_address: z.string().max(150),
  public_website: z.string().url().max(100).optional(),
  show_email: z.boolean().default(false),
  show_phone: z.boolean().default(false),
  show_address: z.boolean().default(false),
  show_website: z.boolean().default(false),
});

// SCHEMA TYPE
export type Organization = z.infer<typeof organizationSchema>;

// SCHEMA VALIDATION
const schemaValidation = (organization: Organization) => {
  try {
    organizationSchema.parse(organization);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(`ERROR: Error creating organization. ${generateLogTimestamp()}`);
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
export const createOrganization = async (organization: Organization) => {
  // USER ID
  const user_id = await (await supabase.auth.getUser()).data.user?.id;
  if (!user_id) return { success: false, error: 'No logged in user. Unable to process this request.' };
  // SCHEMA VALIDATION
  let { error, success } = schemaValidation(organization);
  if (!success) return { success, error };
  // CREATE ORGANIZATION
  let organization_id: number; // used for creating users_organizations later
  try {
    const { error: e, data } = await supabase
      .from('organizations')
      .insert({ created_by: user_id, ...organization })
      .select();
    error = e;
    if (data) organization_id = Number(data[0].id);
  } catch (e) {
    console.error(`ERROR: Error creating organization. ${generateLogTimestamp()}`);
    console.info(`Name: ${organization.name}`);
    console.info(`Error: ${e}`);
    success = false;
    return { success, error };
  }
  if (error) {
    console.error(`ERROR: Error creating organization. ${generateLogTimestamp()}`);
    console.info(`Name: ${organization.name}`);
    console.info(`Error: ${error}`);
    success = false;
  }
  if (!success) return { success, error };
  // CREATE USERS_ORGANIZATIONS & LINK
  try {
    const { success: s, error: e } = await createUsersOrganization({ user_id, organization_id, user_is_owner: true });
    success = s;
    error = e;
  } catch (e) {
    console.error(`ERROR: Error creating users_organizations. ${generateLogTimestamp()}`);
    console.info(`User ID: ${user_id}`);
    console.info(`Organization ID: ${organization_id}`);
    console.info(`Error: ${e}`);
    success = false;
  }
  return { error, success };
};

// OPERATION TYPES
type CreateOrganizationResponse = Awaited<ReturnType<typeof createOrganization>>;
export type CreateOrganizationError = CreateOrganizationResponse['error'];
export type CreateOrganizationSuccess = CreateOrganizationResponse['success'];