import { useState } from 'react';
import { joinWaitlist } from '../services/waitlistService';
import type { Lang } from '../types/i18n';
import { fieldErrorKeys, waitlistSchema } from '../utils/validation';

export type FormStatus = 'idle' | 'sending' | 'done' | 'error';

export function useWaitlistForm(lang: Lang) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<FormStatus>('idle');

  const submit = async () => {
    const parsed = waitlistSchema.safeParse({ name, email, phone, message, lang });
    const bad = fieldErrorKeys(parsed);
    setErrors(bad);
    if (!parsed.success) return;
    setStatus('sending');
    try {
      await joinWaitlist(parsed.data);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return {
    fields: { name, email, phone, message },
    setName,
    setEmail,
    setPhone,
    setMessage,
    errors,
    status,
    submit,
  };
}
