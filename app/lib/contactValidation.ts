export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactFields(fields: ContactFields): string | null {
  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim();

  if (!name) {
    return 'Name is required.';
  }

  if (name.length < 2) {
    return 'Name must be at least 2 characters.';
  }

  if (name.length > 100) {
    return 'Name must be 100 characters or fewer.';
  }

  if (!email) {
    return 'Email is required.';
  }

  if (!EMAIL_PATTERN.test(email)) {
    return 'Please enter a valid email address.';
  }

  if (email.length > 254) {
    return 'Email must be 254 characters or fewer.';
  }

  if (!message) {
    return 'Message is required.';
  }

  if (message.length < 10) {
    return 'Message must be at least 10 characters.';
  }

  if (message.length > 5000) {
    return 'Message must be 5000 characters or fewer.';
  }

  return null;
}

export function sanitizeContactFields(fields: ContactFields): ContactFields {
  return {
    name: fields.name.trim(),
    email: fields.email.trim().toLowerCase(),
    message: fields.message.trim(),
  };
}
