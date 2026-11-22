import { z } from 'zod';

/** Contact form schema for the New lead section. */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(80, 'That name is too long (80 characters max).'),
  email: z
    .string()
    .trim()
    .max(254, 'That email address is too long.')
    .pipe(z.email('Enter a valid email address, like name@example.com.')),
  subject: z
    .string()
    .trim()
    .min(3, 'Please add a subject.')
    .max(120, 'Keep the subject under 120 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Add a little more detail (at least 10 characters).')
    .max(4000, 'That message is too long (4000 characters max).'),
  /** Honeypot. Real visitors never see or fill this field. */
  website: z.string().max(200).default(''),
});

/** First error message per field, ready to show next to the inputs. */
export function fieldErrors(error) {
  const result = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && !(field in result)) {
      result[field] = issue.message;
    }
  }
  return result;
}
