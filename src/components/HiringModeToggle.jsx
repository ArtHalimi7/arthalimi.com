import { useHiringMode } from '../context/HiringModeContext';
import { useTranslation } from 'react-i18next';

export default function HiringModeToggle() {
  const { hiringMode, setHiringMode } = useHiringMode();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => setHiringMode((s) => !s)}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all focus:outline-none focus:ring-2 ${hiringMode ? 'bg-purple-600 text-white' : 'bg-white/5 text-zinc-200'}`}
      title={t('Hiring Mode')}
      aria-pressed={hiringMode}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${hiringMode ? 'opacity-100' : 'opacity-80'}`}>
        <path d="M12 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.9 4.9l2.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.3 16.3l2.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="hidden sm:block">Hiring</span>
    </button>
  );
}
