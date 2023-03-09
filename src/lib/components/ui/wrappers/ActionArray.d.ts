import z from 'zod';

// TYPES
const LinkToActionSchema = z.object({
  label: z.string(),
  icon: z.string().optional(),
  href: z.string()
});
const HandleActionSchema = z.object({
  label: z.string(),
  icon: z.string().optional(),
  action: z.function().args(z.any()).returns(z.void())
});
const ActionArraySchema = z.array(z.union([LinkToActionSchema, HandleActionSchema]));
export type ActionArray = z.infer<typeof ActionArraySchema>;