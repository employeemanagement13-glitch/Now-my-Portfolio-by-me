"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/shahzil.shahzad', icon: '/instagram.svg' },
  { name: 'X', url: 'https://x.com/shahzil_tech', icon: '/x.svg' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shahzil-shahzad-563b8031a/', icon: '/linkedin.svg' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/Character_Sherbet801/', icon: '/reddit.svg' },
];

export function SocialIcons() {
  return (
    <div className="relative z-10 flex items-center gap-4 mb-5">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          className="text-white hover:opacity-80 transition-opacity"
        >
          <Image
            src={social.icon}
            alt={`${social.name} profile link`}
            width={20}
            height={20}
            className="brightness-0 invert"
          />
        </a>
      ))}
    </div>
  );
}

// Email validation function
const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function JoinAndContact() {
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailValidation, setEmailValidation] = useState<{
    isValid: boolean;
    message: string;
  }>({ isValid: false, message: '' });

  // Validate email format in real-time
  useEffect(() => {
    if (formValues.email) {
      if (isValidEmailFormat(formValues.email)) {
        // Basic validation passed
        setEmailValidation({
          isValid: true,
          message: 'Email format looks good'
        });
      } else {
        setEmailValidation({
          isValid: false,
          message: 'Please enter a valid email format (example@domain.com)'
        });
      }
    } else {
      setEmailValidation({ isValid: false, message: '' });
    }
  }, [formValues.email]);

  // Validate form before submit
  const validateForm = (): boolean => {
    if (!formValues.name.trim()) {
      setError('Please enter your name');
      return false;
    }

    if (!formValues.email.trim()) {
      setError('Please enter your email');
      return false;
    }

    if (!isValidEmailFormat(formValues.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formValues.message.trim()) {
      setError('Please enter your message');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Validate form
    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to send message. Please try again.');
        return;
      }

      // Success! Show confirmation and clear form
      setSubmitted(true);
      setFormValues({ name: '', email: '', message: '' });
      setEmailValidation({ isValid: false, message: '' });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

    } catch (err: any) {
      console.error('Submission error:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form manually if needed
  const handleReset = () => {
    setFormValues({ name: '', email: '', message: '' });
    setSubmitted(false);
    setError(null);
    setEmailValidation({ isValid: false, message: '' });
  };

  // Check if form can be submitted
  const canSubmit = (): boolean => {
    return (
      formValues.name.trim() !== '' &&
      formValues.email.trim() !== '' &&
      isValidEmailFormat(formValues.email) &&
      formValues.message.trim() !== '' &&
      emailValidation.isValid
    );
  };

  return (
    <section className="w-full bg-black py-16 px-4 mb-20" id='contact'>
      <div className="max-w-lg mx-auto">

        <div className="relative border-x border-t rounded-tr-3xl rounded-tl-3xl border-white overflow-hidden px-6 sm:px-20 pt-8 pb-15">
          {/* PROFILE GLOW */}
          <div className="relative flex flex-col items-center">
            {/* radial red/pink glow blob */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-56 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(220,30,80,0.75) 0%, rgba(218, 22, 40, 0.5) 35%, rgba(160,9,42,0.15) 65%, transparent 80%)',
                filter: 'blur(18px)',
              }}
            />

            {/* Avatar */}
            <div className="relative z-10 mb-3">
              <Image
                src="/shahzil.png"
                alt="Shahzil Shahzad - System Developer"
                width={80}
                height={100}
                className="rounded-full border-2 border-white object-cover"
                style={{ width: '80px', height: '100px' }}
              />
            </div>

            <h3 className="relative z-10 text-white font-bold text-lg leading-tight">Shahzil Shahzad</h3>
            <p className="relative z-10 text-gray-400 text-sm mb-5">Freelancer &amp; System Developer</p>

            {/* Social icons */}
            <SocialIcons />
          </div>
        </div>

        {/* ── CONTACT SECTION ── */}
        <div>
          <h2 className="text-white text-3xl font-bold text-center mb-2">
            Let&apos;s work together
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            Drop me a message or reach out directly<br />— I&apos;ll get back within a day.
          </p>

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div className="flex gap-3">
              <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
              <button
                onClick={handleReset}
                className="text-sm text-gray-400 hover:text-gray-300 underline"
              >
                Send another message
              </button>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
              <div className="font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
              <button
                onClick={() => setError(null)}
                className="float-right text-red-300 hover:text-red-200"
              >
                ✕
              </button>
            </div>
          )}

          {/* EMAIL VALIDATION FEEDBACK */}
          {formValues.email && (
            <div className={`text-xs mb-2 flex items-center ${emailValidation.isValid ? 'text-green-400' : 'text-red-400'
              }`}>
              {emailValidation.message}
            </div>
          )}

          {/* CONTACT FORM */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 gap-3">
              <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                placeholder="Full Name"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                required
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none py-3.5"
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 gap-3">
              <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                required
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none py-3.5"
              />
            </div>

            {/* Message textarea */}
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5">
              <textarea
                placeholder="Write a message here..."
                value={formValues.message}
                onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !canSubmit()}
              className={`w-full py-4 rounded-full font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${submitting || !canSubmit()
                ? 'bg-gray-200 text-black'
                : 'bg-white text-black hover:bg-gray-100 active:bg-gray-200'
                }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send Message'}
            </button>

            <p className="text-xs text-gray-500 text-center pt-1">Your info stays private.</p>
          </form>
        </div>

      </div>
    </section>
  );
}
