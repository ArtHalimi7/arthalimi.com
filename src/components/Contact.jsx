import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, User, FileText, CheckCircle, Clock, Zap } from 'lucide-react';

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
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Form Progress</span>
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
                {completionPercentage() === 100 ? 'Ready to send!' : 'Fill in required fields'}
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
                  <span className="text-xs text-zinc-500">From:</span>
                  <span className="text-sm text-zinc-100 ml-2">{formData.name}</span>
                </div>
              )}
              {formData.email && (
                <div className="mb-2">
                  <span className="text-xs text-zinc-500">Email:</span>
                  <span className="text-sm text-zinc-100 ml-2">{formData.email}</span>
                </div>
              )}
              {formData.subject && (
                <div className="mb-3">
                  <span className="text-xs text-zinc-500">Subject:</span>
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
                    Your message will appear here as you type...
                  </p>
                )}
                {formData.message && (
                  <div className="mt-2 text-xs text-zinc-500">
                    {formData.message.length} characters, ~{Math.ceil(formData.message.split(' ').length / 200)} min read
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-4 bg-[#18191A] border border-white/10 rounded-lg">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mb-3">Contact Info</span>
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
                <span className="text-xs text-green-400">Usually responds within 24 hours</span>
              </div>
              <div className="text-xs text-zinc-500">
                Available Mon-Fri, 9AM-6PM (CET)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle typing indicator
    setIsTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => setIsTyping(false), 1000);
    setTypingTimeout(timeout);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSent(false);
    
    try {
      await emailjs.sendForm(
        'service_edxi3zr',
        'template_k7mg7ap',
        e.target,
        '-NWp731-hJ2KBhmcB'
      );
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
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
          {/* Form column */}
           <div className="flex flex-col justify-stretch h-[670px]">
             <div className="p-6 bg-[#232425] border border-white/10 rounded-lg flex flex-col flex-1 min-h-[610px] pb-16">
              <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full flex-1" id="contact-form">
                <InputField 
                  label="Your name" 
                  name="name" 
                  required 
                  icon={User} 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <InputField 
                  label="Your email" 
                  name="email" 
                  type="email" 
                  required 
                  icon={Mail} 
                  placeholder="johndoe@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <InputField 
                  label="Subject" 
                  name="subject" 
                  icon={FileText} 
                  placeholder="Subject (optional)"
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
                      className={`w-full mt-2 bg-[#18191A] border border-white/10 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] pl-10 placeholder:text-zinc-500 transition-all duration-200 ${formData.message ? 'border-[#B71C1C]/30' : ''}`}
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center rounded-xl bg-[#B71C1C] px-5 py-3 font-medium text-white shadow-sm hover:brightness-95 hover:bg-[#8B1515] disabled:opacity-60 transition-all duration-200"
                  >
                    {sending ? 'Sending...' : 'Send message'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                    className="inline-flex items-center rounded-xl px-4 py-2 ring-1 ring-white/15 hover:bg-[#2a2b2c] transition-all duration-200"
                  >
                    Reset
                  </button>
                </div>
                {sent && (
                  <div className="text-green-500 mt-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Message sent successfully!
                  </div>
                )}
                {error && (
                  <div className="text-red-500 mt-2">{error}</div>
                )}
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