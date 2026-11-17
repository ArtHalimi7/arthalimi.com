import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { homePath } from '../lib/seo';

export default function NotFound() {
  const { t, i18n } = useTranslation();
  return (
    <main className="flex min-h-[100svh] items-center">
      <div className="wrap">
        <p className="text-[13px] text-lime">404</p>
        <h1 className="mt-6 text-[clamp(2.6rem,6vw,5.8rem)] font-medium leading-[1] tracking-[-0.05em]">{t('notfound.title')}</h1>
        <Link to={homePath(i18n.language)} className="btn btn-line mt-10"><ArrowLeft className="h-4 w-4" /> {t('notfound.back')}</Link>
      </div>
    </main>
  );
}
