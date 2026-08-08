import React, { useState, useEffect } from 'react';
import { useTheme, languagesList } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X, 
  MessageSquareHeart, 
  Stethoscope,
  User as UserIcon,
  LogOut,
  Clock,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenSymptomChecker: () => void;
  onOpenAuth: () => void;
  onOpenHistory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  onSelectTab, 
  onOpenSymptomChecker,
  onOpenAuth,
  onOpenHistory
}) => {
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();
  const { user, logout } = useAuth();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', name: t('navHome') },
    { id: 'features', name: t('navFeatures') },
    { id: 'diseases', name: t('navDiseases') },
    { id: 'tips', name: t('navTips') },
    { id: 'chatbot', name: t('navChatbot') },
    { id: 'faq', name: t('navFAQ') },
    { id: 'contact', name: t('navContact') },
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' 
        : 'py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/30 dark:border-slate-800/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleTabClick('home')} 
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <Logo size="md" showTag={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-health-500 to-health-accent text-white shadow-md shadow-health-500/25 scale-[1.02]'
                      : 'text-slate-700 dark:text-slate-300 hover:text-health-600 dark:hover:text-health-400 hover:bg-white/90 dark:hover:bg-slate-700/90'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Picker */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Language Selector"
              >
                <Globe className="w-4 h-4 text-health-500" />
                <span>{currentLangObj.flag}</span>
                <span className="uppercase font-bold">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95 grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-700/50">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        language === lang.code ? 'font-bold text-health-600 dark:text-health-400 bg-health-500/10' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      <span className="uppercase text-[10px] opacity-60">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Sign Out Button (Shifted Right Beside Light/Dark Switch Mode) */}
            {user && (
              <button
                onClick={logout}
                title="Sign Out of Registered Account"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all shadow-xs"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>{t('signOut')}</span>
              </button>
            )}

            {/* Symptom Checker CTA */}
            <button
              onClick={onOpenSymptomChecker}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-health-700 dark:text-health-300 bg-health-500/10 hover:bg-health-500/20 border border-health-500/30 transition-all"
            >
              <Stethoscope className="w-4 h-4 text-health-500" />
              <span>{t('symptomCheckBtn')}</span>
            </button>

            {/* User Auth Profile / Login: Hidden when logged in. Shows Sign In when logged out */}
            {!user && (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
              >
                <UserIcon className="w-4 h-4 text-health-500" />
                <span>{t('signIn')}</span>
              </button>
            )}

            {/* Chat CTA Button */}
            <button
              onClick={() => handleTabClick('chatbot')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all transform hover:-translate-y-0.5 ${
                activeTab === 'chatbot'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg'
                  : 'text-white bg-gradient-to-r from-health-500 to-health-accent hover:from-health-600 hover:to-health-teal shadow-md shadow-health-500/25'
              }`}
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>{t('startChat')}</span>
            </button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-4 pb-6 space-y-3 backdrop-blur-lg">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t('selectLanguage')}
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {languagesList.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`py-1 rounded text-xs flex flex-col items-center justify-center ${
                    language === l.code ? 'bg-health-500 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span className="text-[9px] uppercase font-bold">{l.code}</span>
                </button>
              ))}
            </div>
          </div>
          
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-health-500 text-white font-bold shadow-md'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            {user ? (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenHistory();
                    }}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 text-health-500"
                    title="History"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 text-red-500"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <UserIcon className="w-4 h-4 text-health-500" />
                <span>{t('signIn')}</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSymptomChecker();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-health-600 dark:text-health-300 bg-health-500/10 border border-health-500/30"
            >
              <Stethoscope className="w-4 h-4 text-health-500" />
              <span>{t('symptomCheckBtn')}</span>
            </button>
            
            <button
              onClick={() => handleTabClick('chatbot')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-health-500 to-health-accent"
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>{t('startChat')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
