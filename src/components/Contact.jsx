import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, User, FileText, CheckCircle, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import EmailModal from './EmailModal';
import { useTranslation } from 'react-i18next';

function InputField({ label, name, type = 'text', required = false, icon: Icon, placeholder, value, onChange }) {
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
          value={value}
          onChange={onChange}
          className={`w-full mt-2 bg-[#18191A] border border-white/10 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] placeholder:text-zinc-500 transition-all duration-200 ${Icon ? 'pl-10' : ''} ${value ? 'border-[#B71C1C]/30' : ''}`}
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

function LivePreview({ formData, isTyping }) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (formData.message) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [formData.message]);

  const completionPercentage = () => {
    const fields = ['name', 'email', 'message'];
    const completed = fields.filter(field => formData[field]?.trim()).length;
    return Math.round((completed / fields.length) * 100);
  };

  const getStatusColor = () => {
    const percentage = completionPercentage();
    if (percentage === 100) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-[#B71C1C]';
  };

  return (
    <div className="h-full">
      <div className="p-6 bg-[#232425] border border-white/10 rounded-lg h-full">
        <div className="space-y-6 h-full flex flex-col">
          {/* Form Progress */}
          <div className="p-4 bg-[#18191A] border border-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{t('contact.formProgress')}</span>
              <span className={`text-sm font-medium ${getStatusColor()}`}>{completionPercentage()}%</span>
            </div>
            <div className="w-full bg-[#232425] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#B71C1C] to-red-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage()}%` }}
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              {completionPercentage() === 100 ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Clock className="w-4 h-4 text-zinc-500" />
              )}
              <span className="text-xs text-zinc-400">
                {completionPercentage() === 100 ? t('contact.readyToSend') : t('contact.fillRequired')}
              </span>
            </div>
          </div>

          {/* Live Message Preview */}
          <div className="p-4 bg-[#18191A] border border-white/10 rounded-lg flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Message Preview</span>
              {isTyping && (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-[#B71C1C] rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-[#B71C1C] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-1 bg-[#B71C1C] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>
            
            <div className={`min-h-[200px] p-3 bg-[#232425] rounded-lg border border-white/5 transition-all duration-300 ${isAnimating ? 'scale-[1.02] border-[#B71C1C]/20' : ''}`}>
              {formData.name && (
                <div className="mb-2">
                  <span className="text-xs text-zinc-500">{t('contact.from')}</span>
                  <span className="text-sm text-zinc-100 ml-2">{formData.name}</span>
                </div>
              )}
              {formData.email && (
                <div className="mb-2">
                  <span className="text-xs text-zinc-500">{t('contact.emailLabel')}</span>
                  <span className="text-sm text-zinc-100 ml-2">{formData.email}</span>
                </div>
              )}
              {formData.subject && (
                <div className="mb-3">
                  <span className="text-xs text-zinc-500">{t('contact.subjectLabel')}</span>
                  <span className="text-sm text-zinc-100 ml-2">{formData.subject}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-3">
                {formData.message ? (
                  <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {formData.message}
                  </p>
                ) : (
                  <p className="text-xs text-zinc-500 italic">
                    {t('contact.messagePlaceholder')}
                  </p>
                )}
                {formData.message && (
                  <div className="mt-2 text-xs text-zinc-500">
                    {formData.message.length} {t('contact.characters')}, ~{Math.ceil(formData.message.split(' ').length / 200)} {t('contact.minRead')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-4 bg-[#18191A] border border-white/10 rounded-lg">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mb-3">{t('contact.infoHeading')}</span>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-sm text-zinc-300">arthalimi989@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-sm text-zinc-300"></span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-sm text-zinc-300">Pristina, Kosovo</span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">{t('contact.respondsWithin')}</span>
              </div>
              <div className="text-xs text-zinc-500">
                {t('contact.availableHours')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // validation state
  const [errors, setErrors] = useState({});

  const validators = {
    name: (v) => {
      if (!v || v.trim().length === 0) return 'Name is required';
      if (v.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
    },
    email: (v) => {
      if (!v || v.trim().length === 0) return 'Email is required';
      // simple email regex
      const re = /^\S+@\S+\.\S+$/;
      if (!re.test(v)) return 'Enter a valid email';
      return '';
    },
    message: (v) => {
      if (!v || v.trim().length === 0) return 'Message is required';
      if (v.trim().length < 10) return 'Message must be at least 10 characters';
      return '';
    },
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle typing indicator
    setIsTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => setIsTyping(false), 1000);
    setTypingTimeout(timeout);
    // live-validate on change for email and name to keep UX responsive
    if (validators[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  const handleBlur = (field) => {
    if (validators[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate all fields before sending
    const nextErrors = {};
    ['name','email','message'].forEach((f) => {
      if (validators[f]) {
        const msg = validators[f](formData[f]);
        if (msg) nextErrors[f] = msg;
      }
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // focus first invalid field (best-effort)
      const first = Object.keys(nextErrors)[0];
      const el = document.querySelector(`[name=${first}]`);
      if (el) el.focus();
      return;
    }

    setShowModal({ open: true, type: 'info', title: 'Sending', message: 'Sending message...' });
    setSending(true);
    setError(null);
    setSent(false);
    
    try {
      // Require environment variables (no fallbacks). This prevents committing secrets
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC;

      if (!serviceId || !templateId || !publicKey) {
        setSending(false);
        setShowModal({ open: true, type: 'error', title: 'Configuration missing', message: 'Email service is not configured. Please add EmailJS keys to your .env file.' });
        return;
      }

      await emailjs.sendForm(serviceId, templateId, e.target, publicKey);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setShowModal({ open: true, type: 'success', title: 'Message sent', message: 'Thanks — your message was sent successfully.' });
      // auto-close success modal after a short delay
      const successTimer = setTimeout(() => {
        setShowModal((s) => ({ ...s, open: false }));
      }, 800);
      // store timer id so it can be cleared if component unmounts or modal closed manually
      setModalTimer(successTimer);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setShowModal({ open: true, type: 'error', title: 'Send failed', message: 'Failed to send message. Please try again later.' });
      // auto-close error modal after a short delay
      const errorTimer = setTimeout(() => {
        setShowModal((s) => ({ ...s, open: false }));
      }, 3000);
      setModalTimer(errorTimer);
    } finally {
      setSending(false);
    }
  };

  // modal state
  const [showModal, setShowModal] = React.useState({ open: false, type: 'info', title: '', message: '' });
  // hold timer id for auto-close so we can clear it
  const [modalTimer, setModalTimer] = React.useState(null);

  // cleanup timers on unmount or when modal is manually closed
  React.useEffect(() => {
    return () => {
      if (modalTimer) clearTimeout(modalTimer);
    };
  }, [modalTimer]);

  // Check env vars at render time
  const hasEmailJsConfig = Boolean(import.meta.env.VITE_EMAILJS_SERVICE && import.meta.env.VITE_EMAILJS_TEMPLATE && import.meta.env.VITE_EMAILJS_PUBLIC);

  return (
    <section id="contact" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20">
      <GridLines />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-[#B71C1C]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">{t('contact.headingSmall')}</span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">{t('contact.title1')}</span>
            <span className="block ml-16">{t('contact.title2')}</span>
          </h1>
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {t('contact.tagline')}
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-zinc-300">{t('contact.lead')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form column */}
           <div className="flex flex-col justify-stretch h-[670px]">
             <div className="p-6 bg-[#232425] border border-white/10 rounded-lg flex flex-col flex-1 min-h-[610px] pb-16">
              <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full flex-1" id="contact-form">
                <InputField 
                  label={t('contact.inputName')} 
                  name="name" 
                  required 
                  icon={User} 
                  placeholder={t('contact.placeholderName')}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  // show validation on blur
                  onBlur={() => handleBlur('name')}
                />
                {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
                <InputField 
                  label={t('contact.inputEmail')} 
                  name="email" 
                  type="email" 
                  required 
                  icon={Mail} 
                  placeholder={t('contact.placeholderEmail')}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
                {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
                <InputField 
                  label={t('contact.inputSubject')} 
                  name="subject" 
                  icon={FileText} 
                  placeholder={t('contact.placeholderSubject')}
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
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
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      className={`w-full mt-2 bg-[#18191A] border border-white/10 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] pl-10 placeholder:text-zinc-500 transition-all duration-200 ${formData.message ? 'border-[#B71C1C]/30' : ''}`}
                      placeholder={t('contact.placeholderMessage')}
                      required
                    />
                  </div>
                  {errors.message && <div className="text-xs text-red-400 mt-1">{errors.message}</div>}
                </div>

                <div className="flex items-center gap-4">
                  <motion.button
                    type="submit"
                    disabled={sending || Object.keys(errors).some(k => errors[k]) || !hasEmailJsConfig}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="inline-flex items-center px-5 py-3 font-medium text-white shadow-sm border border-[#B71C1C] bg-[#B71C1C] transition-all duration-300 ease-out hover:bg-[#8B1515] hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] focus:ring-offset-2 ring-offset-[#18191A] relative overflow-hidden group"
                    style={{ borderRadius: 0 }}
                    title={!hasEmailJsConfig ? 'EmailJS not configured (see .env.example)' : undefined}
                  >
                    <span className="relative z-10">{sending ? t('contact.sending') : t('contact.send')}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.06, ease: 'easeOut' }}
                    className="inline-flex items-center px-5 py-3 font-medium text-[#B71C1C] border border-[#B71C1C] bg-transparent transition-all duration-300 ease-out hover:bg-black hover:text-white hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] focus:ring-offset-2 ring-offset-[#18191A] relative overflow-hidden group"
                    style={{ borderRadius: 0 }}
                  >
                    <span className="relative z-10">{t('contact.reset')}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B71C1C] transition-all duration-300 group-hover:w-full" />
                  </motion.button>
                </div>
                {sent && (
                  <div className="text-green-500 mt-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {t('contact.sentSuccess')}
                  </div>
                )}
                {error && (
                  <div className="text-red-500 mt-2">{t('contact.sendError')}</div>
                )}
                <EmailModal
                  open={showModal.open}
                  type={showModal.type}
                  title={showModal.title}
                  message={showModal.message}
                  onClose={() => {
                    // clear any pending auto-close timers when user manually closes
                    if (modalTimer) {
                      clearTimeout(modalTimer);
                      setModalTimer(null);
                    }
                    setShowModal({ ...showModal, open: false });
                  }}
                />
              </form>
            </div>
          </div>

          {/* Interactive Preview Column */}
          <div className="lg:sticky lg:top-8">
            <LivePreview formData={formData} isTyping={isTyping} />
          </div>
        </div>
      </div>
    </section>
  );
}