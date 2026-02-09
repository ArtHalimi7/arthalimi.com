/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, User, FileText, CheckCircle, ArrowRight, XCircle, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmailModal from './EmailModal';
import { useTranslation } from 'react-i18next';

// Minimal Input Component
function InputField({ label, name, type = 'text', required = false, icon: Icon, placeholder, value, onChange }) {
  return (
    <div className="group border-b border-white/5 py-6 transition-colors duration-500 focus-within:border-purple-500/50">
      <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 mb-4 block font-mono transition-colors group-focus-within:text-purple-500 text-center lg:text-left">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-0 w-4 h-4 text-zinc-700 transition-colors group-focus-within:text-purple-500 hidden lg:block" />}
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-transparent p-0 text-sm text-zinc-100 text-center lg:text-left focus:outline-none placeholder:text-zinc-800 transition-all ${Icon ? 'lg:pl-8' : ''}`}
        />
      </div>
    </div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); 
  const [isTyping, setIsTyping] = useState(false);
  const [showModal, setShowModal] = useState({ open: false, type: 'info', title: '', message: '' });

  useEffect(() => {
    if (!isTyping) return;
    const timeout = setTimeout(() => setIsTyping(false), 1000);
    return () => clearTimeout(timeout);
  }, [isTyping]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsTyping(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setShowModal({ open: true, type: 'info', title: 'UPLINK_INITIATED', message: 'Syncing message with secure gateway...' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC
      );
      setStatus('success');
      setShowModal({ open: true, type: 'success', title: 'DATA_ARCHIVED', message: 'Inquiry successfully transmitted.' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setShowModal({ open: true, type: 'error', title: 'SIGNAL_LOSS', message: 'Transmission failed. Please retry.' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-48 bg-[#020202] text-zinc-100 overflow-hidden">
      <span className="absolute right-[-2%] bottom-1/4 text-[15vw] font-bold text-white/[0.01] pointer-events-none select-none tracking-tighter leading-none">
        CONNECT
      </span>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header - Centered on mobile */}
        <div className="mb-24 text-center lg:text-left">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <div className="w-8 h-px bg-purple-500/50" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-purple-500 uppercase italic">Inquiry_Module</span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic">
            Start <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">Sync</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField label="01. Identity" name="name" required icon={User} placeholder="Who are you?" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
              <InputField label="02. Return Address" name="email" type="email" required icon={Mail} placeholder="email@example.com" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
              
              <div className="group border-b border-white/5 py-8 transition-colors focus-within:border-purple-500/50">
                <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 mb-4 block font-mono group-focus-within:text-purple-500 text-center lg:text-left">03. Message_Payload</label>
                <div className="relative">
                  <FileText className="absolute left-0 top-1 w-4 h-4 text-zinc-700 transition-colors group-focus-within:text-purple-500 hidden lg:block" />
                  <textarea 
                    name="message" 
                    rows={5} 
                    value={formData.message} 
                    onChange={(e) => handleInputChange('message', e.target.value)} 
                    className="w-full bg-transparent p-0 lg:pl-8 text-sm text-zinc-100 text-center lg:text-left focus:outline-none placeholder:text-zinc-800 resize-none transition-all" 
                    placeholder="Describe the vision..." 
                    required 
                  />
                </div>
              </div>

              {/* Centered Button on Mobile */}
              <div className="pt-12 flex justify-center lg:justify-start">
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`group relative flex items-center gap-8 px-14 py-7 font-medium overflow-hidden rounded-full transition-all duration-500 ${
                    status === 'success' ? 'bg-green-500 text-white' : 
                    status === 'error' ? 'bg-red-500 text-white' : 'bg-white text-black'
                  }`}
                >
                  <span className="relative z-10 uppercase tracking-[0.3em] text-[10px] font-bold">
                    {status === 'idle' && 'Initialize Uplink'}
                    {status === 'sending' && 'Transmitting...'}
                    {status === 'success' && 'Confirmed'}
                    {status === 'error' && 'Retry'}
                  </span>
                  <div className="relative z-10 transition-transform group-hover:translate-x-1">
                    {status === 'idle' && <ArrowRight size={16} />}
                    {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
                    {status === 'success' && <CheckCircle size={16} />}
                    {status === 'error' && <XCircle size={16} />}
                  </div>
                  {status === 'idle' && (
                    <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Interactive Preview - centered text internally for consistency */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative border border-white/5 bg-white/[0.01] p-10 overflow-hidden">
              <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-purple-500 animate-pulse' : 'bg-zinc-800'}`} />
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600">Live_Draft.exe</span>
                </div>
                <Zap size={12} className={isTyping ? 'text-purple-500' : 'text-zinc-800'} />
              </div>

              <div className="space-y-10 min-h-[300px]">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-center lg:justify-start gap-4">
                    <span className="text-[9px] font-mono text-zinc-700 uppercase">From:</span>
                    <span className="text-xs text-zinc-400 font-light tracking-wide">{formData.name || '---'}</span>
                  </div>
                  <div className="flex items-baseline justify-center lg:justify-start gap-4">
                    <span className="text-[9px] font-mono text-zinc-700 uppercase">Mail:</span>
                    <span className="text-xs text-zinc-400 font-light tracking-wide">{formData.email || '---'}</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center lg:text-left">
                  <p className="text-sm text-zinc-500 font-light italic leading-relaxed whitespace-pre-wrap">
                    {formData.message || "Awaiting message payload input..."}
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-[9px] font-mono text-zinc-800 uppercase">Chars: {formData.message.length}</span>
                <span className="text-[9px] font-mono text-zinc-800 uppercase">Status: {status.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailModal open={showModal.open} type={showModal.type} title={showModal.title} message={showModal.message} onClose={() => setShowModal({ ...showModal, open: false })} />
    </section>
  );
}