import { useHiringMode } from '../context/HiringModeContext';
import resumeData from '../data/resumeData';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  Mail, 
  Download, 
  Printer, 
  CheckCircle, 
  Copy,
  ExternalLink,
  Clock,
  Award,
  Zap
} from 'lucide-react';
import Alogo from '../assets/Alogo.png';

function StatusBadge() {
  const { t } = useTranslation();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
      <motion.div
        className="w-2 h-2 bg-green-500 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-green-400 text-sm font-medium">{t('hiring.availableNow')}</span>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, action, isClickable = false }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (isClickable && action) {
      if (action.type === 'copy') {
        navigator.clipboard.writeText(action.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else if (action.type === 'link') {
        window.open(action.value, '_blank');
      } else if (action.type === 'email') {
        window.location.href = action.value;
      }
    }
  };

  return (
    <div 
      className={`flex items-center gap-3 p-3 bg-[#232425] border border-white/10 rounded-lg ${isClickable ? 'cursor-pointer hover:bg-[#2a2b2c] hover:border-[#7C3AED]/30 transition-all duration-200' : ''}`}
      onClick={handleClick}
    >
      <div className="p-2 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-lg">
        <Icon className="w-4 h-4 text-[#7C3AED]" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-zinc-400 text-xs uppercase tracking-wider">{label}</div>
        <div className="text-white font-medium truncate">{value}</div>
      </div>
      
      {isClickable && (
        <div className="flex-shrink-0">
          {copied ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : action?.type === 'copy' ? (
            <Copy className="w-4 h-4 text-zinc-500" />
          ) : (
            <ExternalLink className="w-4 h-4 text-zinc-500" />
          )}
        </div>
      )}
    </div>
  );
}

function MetricCard({ metric, index }) {
  const { t } = useTranslation();

  const labelMap = {
    'Years Experience': 'stats.years',
    'Projects Completed': 'stats.projects',
    'Client Satisfaction': 'stats.satisfaction',
    'Technologies Mastered': 'stats.technologies',
  };

  const labelText = labelMap[metric.label] ? t(labelMap[metric.label]) : t(metric.label, { defaultValue: metric.label });

  return (
    <motion.div
      className="bg-[#232425] border border-white/10 rounded-lg p-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="text-2xl font-bold text-[#7C3AED] mb-1">{metric.value}{metric.suffix || ''}</div>
      <div className="text-zinc-400 text-xs uppercase tracking-wider">{labelText}</div>
    </motion.div>
  );
}

function SkillTag({ skill, index }) {
  const { t } = useTranslation();

  return (
    <motion.span
      className="inline-flex items-center px-3 py-1.5 bg-[#232425] border border-white/10 rounded-lg text-xs font-medium text-zinc-300"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      {t(skill, { defaultValue: skill })}
    </motion.span>
  );
}

function ActionButton({ icon: Icon, children, variant = "secondary", href, download = false, onClick, className = "" }) {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 w-full";

  const variants = {
    primary: "bg-[#7C3AED] hover:bg-[#8B1515] text-white",
    secondary: "bg-[#232425] hover:bg-[#2a2b2c] border border-white/10 hover:border-[#7C3AED]/30 text-white"
  };

  const Component = href ? 'a' : 'button';
  const props = {};

  if (href) {
    props.href = href;
    // If download is requested, add the download attribute and don't open a new tab
    if (download) {
      props.download = typeof download === 'string' ? download : '';
    } else {
      props.target = "_blank";
      props.rel = "noopener noreferrer";
    }
  } else {
    props.onClick = onClick;
  }

  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Component>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-[#7C3AED]" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
  );
}

export default function HiringModePanel() {
  const { hiringMode, setHiringMode } = useHiringMode();
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setHiringMode(false);
    };
    if (hiringMode) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [hiringMode, setHiringMode]);

  // normalize resume data to avoid undefined errors
  const contact = {
    name: resumeData.contact?.name || 'Art Halimi',
    email: resumeData.contact?.email || '',
    phone: resumeData.contact?.phone || '',
    location: resumeData.contact?.location || '',
    linkedin: resumeData.contact?.linkedin || resumeData.contact?.website || '#',
    github: resumeData.contact?.github || '#',
    portfolio: resumeData.contact?.website || resumeData.contact?.portfolio || 'arthalimi.netlify.app',
  };

  const summaryKey = resumeData.story?.text || resumeData.about?.intro || resumeData.summary || '';
  const metrics = resumeData.summaryMetrics || resumeData.metrics || [];

  let skills = [];
  if (Array.isArray(resumeData.skills)) skills = resumeData.skills;
  else if (resumeData.techSection && resumeData.techSection.categories) {
    skills = Object.values(resumeData.techSection.categories).flat().map((s) => (s && s.name) ? s.name : (typeof s === 'string' ? s : '')).filter(Boolean);
  }

  const availability = resumeData.availability || { status: 'Available', nextAvailable: 'Immediate', preferredStart: 'ASAP', workingHours: 'Flexible' };
  const rates = resumeData.rates || { hourly: '—', project: '—', retainer: '—' };

  if (!hiringMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex hiring-print-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setHiringMode(false)}
        />

        {/* Sidebar (opens from left) */}
        <motion.div
          className="relative mr-auto w-full max-w-lg h-full bg-black border-r border-white/10 shadow-2xl overflow-hidden left-0 hiring-print"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{t('hiring.heading')}</h2>
                  <p className="text-zinc-400 text-sm">{t('hiring.subheading')}</p>
                </div>
                <button
                  onClick={() => setHiringMode(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <StatusBadge />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hiring-panel-scroll">
              {/* Profile Summary */}
              <div className="bg-[#232425] border border-white/10 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={Alogo} alt="Alogo" className="w-12 h-12 object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                    <p className="text-[#7C3AED] font-medium">{t('hiring.profileRole')}</p>
                  </div>
                </div>
                    <p className="text-zinc-300 leading-relaxed text-sm print-clamp">{t(summaryKey, { defaultValue: summaryKey })}</p>
              </div>

              {/* Key Metrics */}
              <div>
                <SectionHeader icon={Award} title={t('hiring.keyMetrics')} />
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((metric, index) => (
                    <MetricCard key={metric.label || index} metric={metric} index={index} />
                  ))}
                </div>
              </div>

              {/* Contact Information removed per request */}

              {/* Core Skills */}
              <div>
                <SectionHeader icon={Zap} title={t('hiring.coreSkills')} />
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <SkillTag key={skill || index} skill={skill} index={index} />
                  ))}
                </div>
              </div>

              {/* Availability & Rates */}
              <div>
                <SectionHeader icon={Clock} title={t('hiring.availabilityRates')} />
                <div className="bg-[#232425] border border-white/10 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{t('hiring.status')}</span>
                    <span className="text-green-400 font-medium">{t(availability.status, { defaultValue: availability.status })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{t('hiring.nextAvailable')}</span>
                    <span className="text-white font-medium">{t(availability.nextAvailable, { defaultValue: availability.nextAvailable })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{t('hiring.preferredStart')}</span>
                    <span className="text-white font-medium">{t(availability.preferredStart, { defaultValue: availability.preferredStart })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{t('hiring.workingHours')}</span>
                    <span className="text-white font-medium">{t(availability.workingHours, { defaultValue: availability.workingHours })}</span>
                  </div>
                  
                  {/* Rates intentionally removed per request */}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0 p-6 border-t border-white/10 space-y-3">
              <ActionButton
                icon={Mail}
                variant="primary"
                onClick={() => {
                  setHiringMode(false);
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    else window.location.hash = '#contact';
                  }, 200);
                }}
              >
                {t('hiring.contactNow')}
              </ActionButton>
              
              <div className="grid grid-cols-2 gap-3">
                <ActionButton
                  icon={Download}
                  variant="secondary"
                  href={'/arthalimi.docx'}
                  download={true}
                >
                  {t('hiring.downloadCV')}
                </ActionButton>
                <ActionButton
                  icon={Printer}
                  variant="secondary"
                  onClick={() => window.print()}
                >
                  {t('hiring.printView')}
                </ActionButton>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}