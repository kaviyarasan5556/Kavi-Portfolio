import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import { buttonClass } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { profile } from '@/data/profile';
import { cn } from '@/lib/cn';
import { isEmailConfigured, sendLeadEmail } from '@/lib/email';
import { playTone } from '@/lib/sound';
import { copyText } from '@/lib/toast';
import { fieldErrors, leadSchema } from '@/lib/validation';

const EMPTY = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

const FIELD_ORDER = ['name', 'email', 'subject', 'message'];
const STAGES = ['New', 'Contacted', 'In conversation'];
const EASE = [0.16, 1, 0.3, 1];

const inputClass =
  'w-full rounded-lg border border-line bg-base px-4 py-3 text-[1rem] text-ink transition-colors duration-300 placeholder:text-muted/60 hover:border-line-strong focus:border-accent-text aria-invalid:border-danger';

/** A mailto link carrying what the visitor already typed, so nothing is lost. */
function mailtoFor(values) {
  const subject = values.subject || 'Portfolio enquiry';
  const body = [values.message, values.name].filter(Boolean).join('\n\n');
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({ id, label, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label flex items-center justify-between gap-3">
        <span>{label}</span>
        {hint && <span className="tracking-normal normal-case">{hint}</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function DirectLine({ icon, label, children }) {
  return (
    <li className="flex items-center gap-4 border-t border-line py-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="label">{label}</p>
        <div className="mt-1 text-[0.9375rem]">{children}</div>
      </div>
    </li>
  );
}

const lineLink =
  'inline-flex items-center gap-1.5 wrap-anywhere underline decoration-line-strong underline-offset-4 transition-colors duration-300 hover:text-accent-text hover:decoration-accent-text';

function DirectLines() {
  return (
    <div className="panel flex h-full flex-col p-5 sm:p-6">
      <h3 className="label">Direct lines</h3>

      <ul className="mt-6 border-b border-line">
        <DirectLine icon={<Mail size={16} aria-hidden="true" />} label="Email">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href={`mailto:${profile.email}`} className={lineLink}>
              {profile.email}
            </a>
            <button
              type="button"
              onClick={() => void copyText(profile.email, 'Email')}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase transition-colors duration-300 hover:border-accent-text hover:text-accent-text"
            >
              <Copy size={12} aria-hidden="true" />
              Copy<span className="sr-only"> email address</span>
            </button>
          </span>
        </DirectLine>

        <DirectLine icon={<Phone size={16} aria-hidden="true" />} label="Phone">
          <a href={profile.phone.href} className={lineLink}>
            {profile.phone.display}
          </a>
        </DirectLine>

        <DirectLine icon={<LinkedInIcon className="size-4" />} label="LinkedIn">
          <a
            href={profile.links.linkedin.href}
            target="_blank"
            rel="noreferrer"
            className={lineLink}
          >
            {profile.links.linkedin.label}
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </DirectLine>

        <DirectLine icon={<GitHubIcon className="size-4" />} label="GitHub">
          <a href={profile.links.github.href} target="_blank" rel="noreferrer" className={lineLink}>
            {profile.links.github.label}
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </DirectLine>

        <DirectLine icon={<MapPin size={16} aria-hidden="true" />} label="Based in">
          <p>{profile.location.full}</p>
        </DirectLine>
      </ul>

      <div className="mt-auto pt-6">
        <a
          href={profile.resume.href}
          download={profile.resume.downloadName}
          className={buttonClass('ghost')}
        >
          Download CV
        </a>
      </div>
    </div>
  );
}

function Ticket({ status, onReset }) {
  const firstName = status.name.split(/\s+/)[0];

  return (
    <motion.div
      key="ticket"
      className="flex h-full flex-col"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs tracking-[0.14em] text-accent-text">{status.reference}</p>
        <span className="inline-flex items-center gap-2 rounded-full border border-ok/50 px-3 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-ok uppercase">
          <motion.span
            className="grid size-3.5 place-items-center rounded-full bg-ok text-(--base)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.25 }}
            aria-hidden="true"
          >
            <Check size={10} strokeWidth={3.5} />
          </motion.span>
          Message sent
        </span>
      </div>

      <h3
        tabIndex={-1}
        ref={(node) => node?.focus({ preventScroll: true })}
        className="mt-8 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.02em] outline-none sm:text-5xl"
      >
        Thanks, {firstName}. Your message is in.
      </h3>
      <p className="mt-4 max-w-[46ch] text-lg text-pretty text-muted">
        No drip campaign and no automated follow-up sequence. Your email landed in my inbox, and the
        reply will come from me to <span className="wrap-anywhere text-ink">{status.email}</span>.
      </p>

      <ol className="mt-10 grid grid-cols-3 gap-2" aria-label="Lead stage">
        {STAGES.map((stage, index) => (
          <li key={stage} aria-current={index === 0 ? 'step' : undefined}>
            <span className="block h-1 overflow-hidden rounded-full bg-line-strong">
              {index === 0 && (
                <motion.span
                  className="block h-full origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
                />
              )}
            </span>
            <span
              className={cn(
                'mt-3 block font-mono text-[0.6875rem] tracking-[0.1em] uppercase',
                index === 0 ? 'text-accent-text' : 'text-muted',
              )}
            >
              {stage}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-auto pt-10">
        <button type="button" onClick={onReset} className={buttonClass('ghost')}>
          Send another message
        </button>
      </div>
    </motion.div>
  );
}

export function NewLead() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ kind: 'idle' });
  const sending = status.kind === 'sending';

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const describe = (field) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `lead-${field}-error` : undefined,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;

    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const next = fieldErrors(parsed.error);
      setErrors(next);
      const first = FIELD_ORDER.find((field) => next[field]);
      if (first) document.getElementById(`lead-${first}`)?.focus();
      return;
    }

    setErrors({});

    // Honeypot: bots fill this; people never see it. Pretend success and send nothing.
    if (parsed.data.website) {
      setValues(EMPTY);
      setStatus({
        kind: 'created',
        reference: `LEAD-${Date.now().toString(36).toUpperCase().slice(-5)}`,
        name: parsed.data.name,
        email: parsed.data.email,
      });
      return;
    }

    if (!isEmailConfigured()) {
      setStatus({ kind: 'not_configured' });
      return;
    }

    setStatus({ kind: 'sending' });

    try {
      await sendLeadEmail(parsed.data);
      playTone('confirm');
      setValues(EMPTY);
      setStatus({
        kind: 'created',
        reference: `LEAD-${Date.now().toString(36).toUpperCase().slice(-5)}`,
        name: parsed.data.name,
        email: parsed.data.email,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'not_configured') {
        setStatus({ kind: 'not_configured' });
        return;
      }

      const detail = error instanceof Error ? error.message : '';
      const looksLikeTemplate =
        /template id not found/i.test(detail) || /template/i.test(detail);
      const message = looksLikeTemplate
        ? 'EmailJS template ID is wrong or missing. Open EmailJS → Email Templates, copy the ID (template_…), put it in .env.local as VITE_EMAILJS_TEMPLATE_ID, then restart npm run dev.'
        : detail
          ? `Your message was not sent: ${detail}`
          : 'Something went wrong and your message was not sent. Please try again in a moment.';

      setStatus({ kind: 'failed', message });
    }
  };

  const notice =
    status.kind === 'not_configured'
      ? 'This form is not connected to an email service yet, so your message was not sent.'
      : status.kind === 'failed'
        ? status.message
        : null;

  return (
    <section
      id="lead"
      aria-labelledby="lead-title"
      className="defer-render relative border-t border-line py-10 sm:py-14 lg:py-16 [--est:760px]"
    >
      <div className="shell">
        <SectionHeader
          id="lead-title"
          index="06"
          system="New lead"
          title="Start a conversation."
          lede="Hiring, building something, or curious about one of these projects? Log it here, or use a direct line."
        />

        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
          <Reveal className="lg:col-span-5">
            <DirectLines />
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="panel h-full p-5 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                {status.kind === 'created' ? (
                  <Ticket
                    key="ticket"
                    status={status}
                    onReset={() => setStatus({ kind: 'idle' })}
                  />
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={onSubmit}
                    className="relative grid gap-6"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-mono text-xs tracking-[0.14em] text-accent-text">
                        LEAD / NEW
                      </p>
                      <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                        <span
                          className={cn(
                            'size-1.5 rounded-full',
                            sending ? 'status-ping bg-accent' : 'bg-muted',
                          )}
                          aria-hidden="true"
                        />

                        {sending ? 'Sending' : 'Draft'}
                      </span>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field id="lead-name" label="Full name" error={errors.name}>
                        <input
                          id="lead-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={values.name}
                          onChange={(event) => update('name', event.target.value)}
                          className={inputClass}
                          {...describe('name')}
                        />
                      </Field>

                      <Field id="lead-email" label="Email address" error={errors.email}>
                        <input
                          id="lead-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          required
                          value={values.email}
                          onChange={(event) => update('email', event.target.value)}
                          className={inputClass}
                          {...describe('email')}
                        />
                      </Field>
                    </div>

                    <Field id="lead-subject" label="Subject" error={errors.subject}>
                      <input
                        id="lead-subject"
                        name="subject"
                        type="text"
                        autoComplete="off"
                        required
                        value={values.subject}
                        onChange={(event) => update('subject', event.target.value)}
                        className={inputClass}
                        {...describe('subject')}
                      />
                    </Field>

                    <Field id="lead-message" label="Message" error={errors.message}>
                      <textarea
                        id="lead-message"
                        name="message"
                        rows={5}
                        required
                        value={values.message}
                        onChange={(event) => update('message', event.target.value)}
                        className={cn(inputClass, 'min-h-36 resize-y')}
                        {...describe('message')}
                      />
                    </Field>

                    {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
                    <div className="pointer-events-none absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="lead-website">Website</label>
                      <input
                        id="lead-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.website}
                        onChange={(event) => update('website', event.target.value)}
                      />
                    </div>

                    <div role="alert">
                      {notice && (
                        <div className="rounded-lg border border-danger/50 bg-danger/5 p-4 text-sm">
                          <p className="font-semibold text-ink">{notice}</p>
                          <p className="mt-1 text-muted">
                            What you wrote is still here. You can send it from your own email
                            instead:
                          </p>
                          <a
                            href={mailtoFor(values)}
                            className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-accent-text underline underline-offset-4"
                          >
                            <Mail size={15} aria-hidden="true" />
                            Email {profile.email}
                          </a>
                        </div>
                      )}
                    </div>

                    <div>
                      <Magnetic>
                        <button
                          type="submit"
                          disabled={sending}
                          className={buttonClass('primary', 'disabled:opacity-70')}
                        >
                          {sending ? 'Sending…' : 'Send message'}
                          <Send size={15} aria-hidden="true" />
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
