/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Mail, MapPin, User, ArrowRight, Loader2, CheckCircle, XCircle, Github, Linkedin, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmailModal from './EmailModal';
import { useTranslation } from 'react-i18next';

// --- Components ---

const ContactInfo = ({ t }) => (
  <div className="space-y-12">
    <div>
      <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
        {t('contact.infoHeading')}
      </h3>
      <p className="text-zinc-400 font-light leading-relaxed max-w-sm">
        {t('contact.sub_lead') || "Ready to build something extraordinary? I'm currently available for freelance projects and open to full-time opportunities."}
      </p>
    </div>

    <div className="space-y-6">
      <div className="flex items-start gap-4 group">
        <div className="p-3 rounded-full bg-white/[0.03] border border-white/[0.06] group-hover:border-purple-500/30 group-hover:bg-purple-500/[0.05] transition-colors duration-300">
          <Mail size={18} className="text-zinc-400 group-hover:text-purple-400 transition-colors" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">{t('contact.emailLabel')}</span>
          <a href="mailto:arthalimi989@gmail.com" className="text-lg text-white font-light hover:text-purple-400 transition-colors">
            arthalimi989@gmail.com
          </a>
        </div>
      </div>

      <div className="flex items-start gap-4 group">
        <div className="p-3 rounded-full bg-white/[0.03] border border-white/[0.06] group-hover:border-purple-500/30 group-hover:bg-purple-500/[0.05] transition-colors duration-300">
          <MapPin size={18} className="text-zinc-400 group-hover:text-purple-400 transition-colors" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">{t('about_contact_location')}</span>
          <span className="text-lg text-white font-light">Gelsenkirchen, Germany</span>
        </div>
      </div>
    </div>

    {/* Socials row */}
    <div className="pt-8 border-t border-white/[0.06]">
      <div className="flex gap-4">
        {[
          { icon: Github, href: "https://github.com/arthalimi", label: "GitHub" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/art-halimi", label: "LinkedIn" },
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-300"
          >
            <social.icon size={18} className="text-zinc-400 group-hover:text-purple-400 transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">{social.label}</span>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const ContactForm = ({ t, formData, handleInputChange, handleSubmit, status }) => {
  return (
    <div className="relative p-8 md:p-10 rounded-3xl border border-white/[0.06] bg-zinc-900/40">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 group-focus-within:text-purple-400 transition-colors">{t('contact.label_identity')}</label>
            <input
              type="text"
              name="name"
              required
              placeholder={t('contact.placeholder_name')}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-black/20 border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/[0.02] transition-all duration-300"
            />
          </div>
          <div className="group space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 group-focus-within:text-purple-400 transition-colors">{t('contact.emailLabel')}</label>
            <input
              type="email"
              name="email"
              required
              placeholder={t('contact.placeholder_email')}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full bg-black/20 border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/[0.02] transition-all duration-300"
            />
          </div>
        </div>

        <div className="group space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 group-focus-within:text-purple-400 transition-colors">{t('contact.label_message')}</label>
          <textarea
            required
            name="message"
            rows={4}
            placeholder={t('contact.placeholder_message')}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="w-full bg-black/20 border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/[0.02] transition-all duration-300 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full py-4 rounded-lg font-medium tracking-widest text-xs uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
            status === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
              'bg-white text-black hover:bg-purple-50 border border-white'
            }`}
        >
          {status === 'idle' && (
            <>
              {t('contact.btn_idle')} <ArrowRight size={14} />
            </>
          )}
          {status === 'sending' && (
            <>
              {t('contact.btn_sending')} <Loader2 size={14} className="animate-spin" />
            </>
          )}
          {status === 'success' && (
            <>
              {t('contact.btn_success')} <CheckCircle size={14} />
            </>
          )}
          {status === 'error' && (
            <>
              {t('contact.btn_error')} <XCircle size={14} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState({ open: false, type: 'info', title: '', message: '' });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch("https://formsubmit.co/ajax/arthalimi989@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      const data = await response.json();
      if (data.success === "false") {
        throw new Error(data.message || "Form submission failed");
      }

      setStatus('success');
      setShowModal({ open: true, type: 'success', title: t('contact.modal_success_title'), message: t('contact.modal_success_msg') });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setShowModal({ open: true, type: 'error', title: t('contact.modal_error_title'), message: t('contact.modal_error_msg') });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative pt-12 pb-24 md:pb-48 bg-[#020202] text-zinc-100 overflow-hidden">
      {/* Removed ambient glows for flattened design */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic"
          >
            {t('contact.heading1')} <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">{t('contact.heading2')}</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactInfo t={t} />
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactForm
              t={t}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              status={status}
            />
          </motion.div>
        </div>
      </div>

      <EmailModal
        open={showModal.open}
        type={showModal.type}
        title={showModal.title}
        message={showModal.message}
        onClose={() => setShowModal({ ...showModal, open: false })}
      />
    </section>
  );
}