/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
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
          <span className="text-lg text-white font-light">Prishtina, Kosovo</span>
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
    <div className="relative p-8 md:p-10 rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.005] shadow-[0_0_40px_rgba(168,85,247,0.03)] backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 group-focus-within:text-purple-400 transition-colors">{t('contact.label_identity')}</label>
            <input
              type="text"
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
            rows={4}
            placeholder={t('contact.placeholder_message')}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="w-full bg-black/20 border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/[0.02] transition-all duration-300 resize-none"
          />
        </div>

        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full py-4 rounded-lg font-medium tracking-widest text-xs uppercase flex items-center justify-center gap-3 transition-all duration-300 ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
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
        </motion.button>
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
    // setShowModal({ open: true, type: 'info', title: t('contact.modal_sending_title'), message: t('contact.modal_sending_msg') });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC
      );
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
    <section id="contact" className="section-glow relative py-32 bg-[#020202] text-zinc-100 overflow-hidden">
      {/* Ambient background — hidden on mobile for performance (blur-[150px] is very expensive) */}
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/[0.06] rounded-full pointer-events-none" style={{ filter: 'blur(100px)' }} />
      <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.025] rounded-full pointer-events-none" style={{ filter: 'blur(100px)' }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono tracking-[0.5em] text-purple-500 uppercase">{t('contact.section_tag')}</span>
            <div className="h-px w-24 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tight text-white uppercase"
          >
            {t('contact.heading1')} <span className="text-zinc-600 font-extralight italic">&</span> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 font-normal">{t('contact.heading2')}</span>
          </motion.h2>
          {/* White neon accent line */}
          <div className="neon-line w-40 mt-6" />
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