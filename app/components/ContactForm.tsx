'use client';

import { useRef, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { sendContactEmail } from '../actions/contact';
import { validateContactFields } from '../lib/contactValidation';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const fields = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    const validationError = validateContactFields(fields);
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setStatus('loading');

    const result = await sendContactEmail(fields);

    if (result.ok) {
      formRef.current?.reset();
      setStatus('success');
      window.setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('error');
    setErrorMessage(result.error);
  };

  const inputClass =
    'w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-terminal/50 focus:ring-1 focus:ring-terminal/20 transition-all font-mono';

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-mono text-xs text-subtle mb-1.5">
            name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            disabled={isDisabled}
            className={inputClass}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-xs text-subtle mb-1.5">
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={254}
            disabled={isDisabled}
            className={inputClass}
            placeholder="john@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-xs text-subtle mb-1.5">
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          disabled={isDisabled}
          className={`${inputClass} resize-none`}
          placeholder="Your message..."
        />
      </div>

      {status === 'error' && errorMessage && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300"
        >
          <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </p>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-medium transition-all ${
          status === 'idle' || status === 'error'
            ? 'bg-terminal text-background hover:bg-terminal-dim'
            : status === 'loading'
              ? 'bg-terminal/60 text-background cursor-wait'
              : 'bg-terminal text-background'
        }`}
      >
        {status === 'idle' && (
          <>
            <ArrowRight size={15} /> send
          </>
        )}
        {status === 'loading' && (
          <>
            <Loader2 size={15} className="animate-spin" /> sending...
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 size={15} /> sent!
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle size={15} /> try again
          </>
        )}
      </button>
    </form>
  );
}
