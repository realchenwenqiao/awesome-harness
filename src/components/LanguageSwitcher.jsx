import { useLanguage } from '../contexts/LanguageContext';

function LanguageSwitcher() {
  const { language, isZh, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-secondary px-3 py-1.5 text-sm font-medium"
      title={isZh ? '切换到英文' : 'Switch to Chinese'}
    >
      <span className="flex items-center gap-1.5">
        <span className="text-base">{isZh ? '🇨🇳' : '🇺🇸'}</span>
        <span>{isZh ? '中文' : 'EN'}</span>
        <span className="text-[var(--text-muted)]">/</span>
        <span className="text-[var(--text-muted)]">{isZh ? 'EN' : '中文'}</span>
      </span>
    </button>
  );
}

export default LanguageSwitcher;
