'use server';

import { Resend } from 'resend';
import {
  sanitizeContactFields,
  validateContactFields,
  type ContactFields,
} from '../lib/contactValidation';

export type ContactActionResult =
  | { ok: true }
  | { ok: false; error: string };

const CONTACT_TO_EMAIL = 'maythinlwin1996@gmail.com';
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendContactEmail(
  fields: ContactFields,
): Promise<ContactActionResult> {
  const validationError = validateContactFields(fields);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const { name, email, message } = sanitizeContactFields(fields);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not configured.');
    return {
      ok: false,
      error: 'Unable to send your message right now. Please try again later.',
    };
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `${name} via Portfolio <${fromAddress}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        'New portfolio contact form submission',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: [
        '<p><strong>New portfolio contact form submission</strong></p>',
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        '<p><strong>Message:</strong></p>',
        `<p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>`,
      ].join(''),
    });

    if (error) {
      console.error('Contact form: Resend API error.', error);
      return {
        ok: false,
        error: 'Unable to send your message right now. Please try again later.',
      };
    }

    return { ok: true };
  } catch (err) {
    console.error('Contact form: failed to send email.', err);
    return {
      ok: false,
      error: 'Unable to send your message right now. Please try again later.',
    };
  }
}
