export interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = "Please enter a valid email.";
  if (!fields.subject.trim()) errors.subject = "Please enter a subject.";
  if (fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}
