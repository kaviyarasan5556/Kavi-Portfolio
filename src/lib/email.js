import emailjs from '@emailjs/browser';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/** True when all three EmailJS public config values are present. */
export function isEmailConfigured() {
  return Boolean(serviceId && templateId && publicKey);
}

/**
 * Sends a contact form message through EmailJS.
 * Template variables: from_name, from_email, subject, message, reply_to.
 */
export function sendLeadEmail({ name, email, subject, message }) {
  if (!isEmailConfigured()) {
    return Promise.reject(new Error('not_configured'));
  }

  return emailjs
    .send(
      serviceId,
      templateId,
      {
        from_name: name,
        from_email: email,
        subject,
        message,
        reply_to: email,
      },
      { publicKey },
    )
    .catch((error) => {
      const text =
        typeof error?.text === 'string'
          ? error.text
          : typeof error?.message === 'string'
            ? error.message
            : 'Email could not be sent.';
      return Promise.reject(new Error(text));
    });
}
