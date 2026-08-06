import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Zap, 
  ShieldCheck, 
  Smile, 
  Smartphone, 
  Lock, 
  Cloud, 
  TrendingUp, 
  HeartHandshake, 
  Cpu 
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const { t } = useTheme();

  const points = [
    {
      title: t('why1Title'),
      desc: t('why1Desc'),
      icon: <Cpu className="w-6 h-6 text-health-500" />,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: t('why2Title'),
      desc: t('why2Desc'),
      icon: <Lock className="w-6 h-6 text-amber-500" />,
      color: 'from-amber-500/20 to-orange-500/20'
    },
    {
      title: t('why3Title'),
      desc: t('why3Desc'),
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      color: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      title: t('why4Title'),
      desc: t('why4Desc'),
      icon: <Smile className="w-6 h-6 text-purple-500" />,
      color: 'from-purple-500/20 to-indigo-500/20'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-bold uppercase tracking-wider">
            <span>{t('whyTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('whySubtitle')}
          </p>
        </div>

        {/* 4 Core Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, i) => (
            <div
              key={i}
              className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-health-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pt.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                  {pt.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-health-500 transition-colors">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
