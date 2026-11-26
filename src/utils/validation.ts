import { z } from 'zod';

/**
 * Shared payload shapes. functions/src/schemas.ts mirrors these for the server side
 * (Functions can't import from the app bundle); keep the two in step.
 */
export const waitlistSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  phone: z.string().trim().max(30),
  message: z.string().trim().max(500),
  lang: z.enum(['es', 'en']),
});
export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const checkoutSchema = z.object({
  planId: z.enum(['monthly', 'yearly']),
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  lang: z.enum(['es', 'en']),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/** Field → first issue's path key, for showing errors under inputs. */
export function fieldErrorKeys<T>(result: z.ZodSafeParseResult<T>): Set<string> {
  const keys = new Set<string>();
  if (!result.success) for (const issue of result.error.issues) keys.add(String(issue.path[0]));
  return keys;
}
