import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Activity, 
  Send, 
  CheckCircle2, 
  Heart 
} from 'lucide-react';

interface FooterProps {
  onSelectTab?: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { t } = useTheme();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleTabClick = (tabId: string) => {
    if (onSelectTab) {
      onSelectTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: About HealthAI */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleTabClick('home')} className="flex items-center gap-2 text-left focus:outline-none">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-health-500 to-health-accent text-white shadow-lg">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Health<span className="gradient-text">AI</span>
              </span>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-health-400">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => handleTabClick('home')} className="hover:text-white transition-colors">{t('navHome')}</button></li>
              <li><button onClick={() => handleTabClick('features')} className="hover:text-white transition-colors">{t('navFeatures')}</button></li>
              <li><button onClick={() => handleTabClick('diseases')} className="hover:text-white transition-colors">{t('navDiseases')}</button></li>
              <li><button onClick={() => handleTabClick('tips')} className="hover:text-white transition-colors">{t('navTips')}</button></li>
              <li><button onClick={() => handleTabClick('chatbot')} className="hover:text-white transition-colors">{t('navChatbot')}</button></li>
            </ul>
          </div>

          {/* Col 3: Resources & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-health-400">Support</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => handleTabClick('faq')} className="hover:text-white transition-colors">{t('navFAQ')}</button></li>
              <li><button onClick={() => handleTabClick('contact')} className="hover:text-white transition-colors">{t('navContact')}</button></li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-health-400">Public Health Bulletin</h4>
            <p className="text-xs text-slate-400">
              Subscribe for weekly disease prevention alerts and regional health updates.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-health-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-health-500 to-health-accent hover:from-health-600 hover:to-health-emerald text-white font-bold text-xs shadow-md shadow-health-500/20 flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t('copyright')}
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Global Community Health</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
