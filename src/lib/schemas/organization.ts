import { z } from 'zod';

const organizationSchema = {
  organization_name: z.string().min(4).max(55),
  public_email: z.string().email(),
  public_phone: z.string().max(20),
  public_address: z.string().min(4).max(55),
  show_email: z.boolean(),
  show_phone: z.boolean(),
  show_address: z.boolean()
};

const orgZodSchema = z.object(organizationSchema);

export default organizationSchema;
export type OrganizationData = z.infer<typeof orgZodSchema>;