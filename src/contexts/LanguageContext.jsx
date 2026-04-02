import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // 从 localStorage 读取语言设置
    if (typeof window !== 'undefined') {
      return localStorage.getItem('awesome-harness-language') || 'zh';
    }
    return 'zh';
  });

  // 语言切换函数
  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    localStorage.setItem('awesome-harness-language', newLang);
  };

  const setLanguageValue = (lang) => {
    if (lang === 'zh' || lang === 'en') {
      setLanguage(lang);
      localStorage.setItem('awesome-harness-language', lang);
    }
  };

  // 监听存储变化（多标签同步）
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'awesome-harness-language') {
        setLanguage(e.newValue || 'zh');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    language,
    isZh: language === 'zh',
    isEn: language === 'en',
    toggleLanguage,
    setLanguage: setLanguageValue
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
