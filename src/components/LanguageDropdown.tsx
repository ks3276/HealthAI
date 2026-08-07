import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const currentLang = i18n.language?.substring(0, 2) || 'en';

  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm transition-all hover:bg-slate-200 dark:hover:bg-slate-700">
        <Globe className="w-4 h-4 text-health-500 flex-shrink-0" />
        <select
          value={currentLang}
          onChange={handleLanguageChange}
          className="bg-transparent border-none outline-none cursor-pointer pr-4 text-xs font-bold text-slate-900 dark:text-white appearance-none"
        >
          {languages.map((lang) => (
            <option 
              key={lang.code} 
              value={lang.code}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              {lang.flag} {lang.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2.5" />
      </div>
    </div>
  );
};
