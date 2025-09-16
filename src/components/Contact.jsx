import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import ModelViewer from './ModelViewer';

function InputField({ label, name, type = 'text', required = false }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 block">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full mt-2 bg-[#18191A] border border-white/10 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B71C1C]"
      />
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

          <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-white mb-4">
            <span className="block">GET IN</span>
            <span className="block ml-12">TOUCH</span>
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-300">If you'd like to work together or just say hi, drop a message — I usually reply within a day or two.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Model column: make the car visually on top and remove the card background */}
          <div className="order-first lg:order-none">
            <div className="relative z-20 -mt-6 lg:mt-0 lg:mr-6">
              <div className="rounded-2xl overflow-hidden" style={{ background: 'transparent' }}>
                <ModelViewer
                  url="/models/audirs7.glb"
                  width="100%"
                  height={420}
                  modelXOffset={0}
                  modelYOffset={0}
                  defaultRotationX={0}
                  defaultRotationY={0}
                  defaultZoom={1.2}
                  enableMouseParallax={false}
                  enableManualRotation={true}
                  enableHoverRotation={false}
                  autoRotate={true}
                  autoRotateSpeed={0.25}
                  enableManualZoom={true}
                  enableVerticalRotation={false}
                  modelScale={3}
                  autoFrame={false}
                  showScreenshotButton={false}
                  fadeIn={true}
                />
              </div>
            </div>
          </div>

          {/* Form column: replace static info with a contact form */}
          <div>
            <div className="p-6 bg-[#232425] border border-white/10 rounded-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="space-y-4"
                id="contact-form"
              >
                <InputField label="Your name" name="name" required />
                <InputField label="Your email" name="email" type="email" required />
                <InputField label="Subject" name="subject" />
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 block">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full mt-2 bg-[#18191A] border border-white/10 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B71C1C]"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      // construct mailto from form fields
                      const form = document.getElementById('contact-form');
                      const fd = new FormData(form);
                      const name = fd.get('name') || '';
                      const email = fd.get('email') || '';
                      const subject = fd.get('subject') || 'Hello';
                      const message = fd.get('message') || '';
                      const body = `From: ${name} (${email})\n\n${message}`;
                      const mailto = `mailto:arthalimi989@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      window.location.href = mailto;
                    }}
                    className="inline-flex items-center rounded-xl bg-[#B71C1C] px-5 py-3 font-medium text-white shadow-sm hover:brightness-95 hover:bg-[#8B1515]"
                  >
                    Send message
                  </button>

                  <button
                    type="reset"
                    className="inline-flex items-center rounded-xl px-4 py-2 ring-1 ring-white/15 hover:bg-[#2a2b2c]"
                    onClick={() => document.getElementById('contact-form')?.reset()}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
