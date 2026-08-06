import React, { useState } from 'react';
import { useTheme, languagesList } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronDown, 
  Sun, 
  Moon, 
  Check, 
  HeartPulse
} from 'lucide-react';

interface ChatGPTHeaderProps {
  onOpenSymptomChecker: () => void;
  onOpenAuth: () => void;
  onOpenHistory: () => void;
  isSidebarCollapsed: boolean;
}

export const ChatGPTHeader: React.FC<ChatGPTHeaderProps> = ({
  onOpenAuth,
}) => {
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();
  const { user } = useAuth();

  const [selectedModel, setSelectedModel] = useState('HealthAI 4.0');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const models = [
    { id: 'HealthAI 4.0', name: 'HealthAI 4.0', desc: 'Our most intelligent medical AI model', icon: '✨' },
    { id: 'HealthAI Triage', name: 'HealthAI Triage', desc: 'Fast acute symptom risk assessor', icon: '⚡' },
    { id: 'HealthAI Research', name: 'HealthAI Research', desc: 'Deep public health repository search', icon: '🔬' },
  ];

  const currentLang = languagesList.find((l) => l.code === language) || languagesList[0];

  return (
    <header className={`sticky top-0 z-30 bg-white/80 dark:bg-black backdrop-blur-xl border-b border-slate-200/80 dark:border-[#212121] transition-all duration-300 px-4 py-3 flex items-center justify-between`}>
      
      {/* Model Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowModelDropdown(!showModelDropdown)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-[#212121] hover:bg-slate-200 dark:hover:bg-[#2f2f2f] transition-all text-slate-900 dark:text-white font-bold text-sm"
        >
          <span className="text-emerald-500 font-extrabold flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>{selectedModel}</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
        </button>

        {showModelDropdown && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#171717] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#2f2f2f] p-2 z-50 animate-in zoom-in-95">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
              Select AI Engine Model
            </div>
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedModel(m.id);
                  setShowModelDropdown(false);
                }}
                className={`w-full text-left p-3 rounded-2xl flex items-start gap-3 transition-colors ${
                  selectedModel === m.id
                    ? 'bg-health-500/10 text-health-600 dark:text-health-400 font-bold'
                    : 'hover:bg-slate-100 dark:hover:bg-[#212121] text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="text-lg">{m.icon}</span>
                <div className="flex-1">
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>{m.name}</span>
                    {selectedModel === m.id && <Check className="w-3.5 h-3.5 text-health-500" />}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">{m.desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-2">
        
        {/* 10-Language Flag Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-[#212121] hover:bg-slate-200 dark:hover:bg-[#2f2f2f] text-xs font-bold text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-[#2f2f2f]"
          >
            <span>{currentLang.flag}</span>
            <span className="hidden md:inline">{currentLang.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showLangDropdown && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-[#171717] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#2f2f2f] p-2 z-50 max-h-72 overflow-y-auto animate-in zoom-in-95">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Website Language
              </div>
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    language === lang.code
                      ? 'bg-health-500 text-white font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-[#212121] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {language === lang.code && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-2xl bg-slate-100 dark:bg-[#212121] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2f2f2f] transition-all border border-slate-200 dark:border-[#2f2f2f]"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* User Auth Button: Hidden when logged in. Displays Sign In when logged out */}
        {!user && (
          <button
            onClick={onOpenAuth}
            className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-health-500 to-health-accent text-white font-extrabold text-xs shadow-md shadow-health-500/20 hover:opacity-95 transition-all"
          >
            {t('signIn')}
          </button>
        )}

      </div>

    </header>
  );
};
