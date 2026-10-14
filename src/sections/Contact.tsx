import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import type { ToastMessage } from '../components/Toast';
import {
  Mail,
  Send,
  Loader2,
  Copy,
  Check,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactProps {
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const channels = [
  {
    label: 'Telegram',
    handle: '@chanmoniza_cheat',
    href: 'https://t.me/chanmoniza_cheat',
    color: '#229ED9',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: 'moniza-Dev',
    href: 'https://github.com/moniza-Dev',
    color: '#333',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: 'mo-nizachan',
    href: 'https://www.linkedin.com/in/mo-nizachan-a400aa438',
    color: '#0A66C2',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
];

export const Contact: React.FC<ContactProps> = ({ onAddToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailAddress = 'moniza195@gmail.com';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      onAddToast({
        type: 'success',
        title: 'Message Sent',
        message: `Thanks for reaching out, ${data.name}! I'll get back to you shortly.`,
      });
      reset();
    } catch {
      onAddToast({
        type: 'error',
        title: 'Unable to Send',
        message: 'Something went wrong. Please email me directly at moniza195@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-800/60 border ${
      hasError
        ? 'border-rose-400 focus:ring-rose-400'
        : 'border-neutral-200 dark:border-neutral-700 focus:ring-neutral-900 dark:focus:ring-neutral-400'
    } text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 transition-all`;

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg mx-auto mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-text-primary">
            Let&apos;s work together
          </h2>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Have a project idea, a question, or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Email card */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white dark:text-neutral-900" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">Email</p>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <MapPin className="w-3 h-3" />
                Phnom Penh, Cambodia · UTC+7
              </div>
            </div>

            {/* Social channels */}
            <div className="space-y-2">
              {channels.map(ch => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${ch.color}15`, color: ch.color }}
                    >
                      {ch.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{ch.label}</p>
                      <p className="text-[11px] text-neutral-400">{ch.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">Send a message</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                Fill in the form and I&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                      Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      {...register('name')}
                      className={inputClass(!!errors.name)}
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                      Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project inquiry / Internship / General"
                    {...register('subject')}
                    className={inputClass(false)}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    {...register('message')}
                    className={`${inputClass(!!errors.message)} resize-y`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};