'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  const inputClass =
    'w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-terminal/50 focus:ring-1 focus:ring-terminal/20 transition-all font-mono';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-mono text-xs text-subtle mb-1.5">name</label>
          <input type="text" id="name" name="name" required className={inputClass} placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-xs text-subtle mb-1.5">email</label>
          <input type="email" id="email" name="email" required className={inputClass} placeholder="john@company.com" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-xs text-subtle mb-1.5">message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Your message..."
        />
      </div>
      <button
        type="submit"
        disabled={status !== 'idle'}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-medium transition-all ${
          status === 'idle'
            ? 'bg-terminal text-background hover:bg-terminal-dim'
            : status === 'loading'
            ? 'bg-terminal/60 text-background cursor-wait'
            : 'bg-terminal text-background'
        }`}
      >
        {status === 'idle' && <><ArrowRight size={15} /> send</>}
        {status === 'loading' && <><Loader2 size={15} className="animate-spin" /> sending...</>}
        {status === 'success' && <><CheckCircle2 size={15} /> sent!</>}
      </button>
    </form>
  );
}
