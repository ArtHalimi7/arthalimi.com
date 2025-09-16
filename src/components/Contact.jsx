import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, User, FileText } from 'lucide-react';

function InputField({ label, name, type = 'text', required = false, icon: Icon, placeholder }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 block">{label}</label>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B71C1C]">
            <Icon className="w-4 h-4" />
          </span>
        )}
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`w-full mt-2 bg-[#18191A] border border-white/10 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] placeholder:text-zinc-500 ${Icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
}

function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-6 right-6 top-0 bottom-0" />
    </div>
  );
}

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSent(false);
    const form = e.target;
    try {
      await emailjs.sendForm(
        'service_edxi3zr',
        'template_k7mg7ap',
        form,
        '-NWp731-hJ2KBhmcB'
      );
      setSent(true);
      form.reset();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20">
      <GridLines />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-[#B71C1C]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">Contact</span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">Contact</span>
            <span className="block ml-16">Me</span>
          </h1>
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Let's connect and build something great together!
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-zinc-300">If you'd like to work together or just say hi, drop a message — I usually reply within a day or two.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form column: replace static info with a contact form */}
          <div>
            <div className="p-6 bg-[#232425] border border-white/10">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                id="contact-form"
              >
                <InputField label="Your name" name="name" required icon={User} placeholder="John Doe" />
                <InputField label="Your email" name="email" type="email" required icon={Mail} placeholder="johndoe@email.com" />
                <InputField label="Subject" name="subject" icon={FileText} placeholder="Subject (optional)" />
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 block">Message</label>
                  <div className="relative">
                    <span className="absolute left-3 top-5 text-[#B71C1C]">
                      <FileText className="w-4 h-4" />
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full mt-2 bg-[#18191A] border border-white/10 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] pl-10 placeholder:text-zinc-500"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center rounded-xl bg-[#B71C1C] px-5 py-3 font-medium text-white shadow-sm hover:brightness-95 hover:bg-[#8B1515] disabled:opacity-60"
                  >
                    {sending ? 'Sending...' : 'Send message'}
                  </button>
                  <button
                    type="reset"
                    className="inline-flex items-center rounded-xl px-4 py-2 ring-1 ring-white/15 hover:bg-[#2a2b2c]"
                  >
                    Reset
                  </button>
                </div>
                {sent && (
                  <div className="text-green-500 mt-2">Message sent successfully!</div>
                )}
                {error && (
                  <div className="text-red-500 mt-2">{error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
