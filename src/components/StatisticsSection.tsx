import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Users, 
  BookOpen, 
  Clock, 
  Smile, 
  Award
} from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const { t } = useTheme();

  const stats = [
    { label: t('stat1Label'), value: t('stat1Value'), icon: <Users className="w-6 h-6 text-health-500" />, detail: t('stat1Desc') },
    { label: t('stat2Label'), value: t('stat2Value'), icon: <BookOpen className="w-6 h-6 text-emerald-500" />, detail: t('stat2Desc') },
    { label: t('stat3Label'), value: t('stat3Value'), icon: <Clock className="w-6 h-6 text-cyan-500" />, detail: t('stat3Desc') },
    { label: t('stat4Label'), value: t('stat4Value'), icon: <Smile className="w-6 h-6 text-amber-500" />, detail: t('stat4Desc') }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-health-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/20 text-health-300 text-xs font-bold uppercase tracking-wider border border-health-500/30">
            <Award className="w-4 h-4 text-health-400" />
            <span>{t('statsTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('statsTitle')}
          </h2>
          <p className="text-base text-slate-400">
            {t('statsSubtitle')}
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 text-center hover:border-health-500/50 transition-all group backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold text-white mb-1 font-mono">{stat.value}</div>
              <div className="text-sm font-bold text-slate-300 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.detail}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
