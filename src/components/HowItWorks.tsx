import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { MessageSquare, Cpu, Database, ShieldCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { t } = useTheme();

  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: <MessageSquare className="w-6 h-6 text-health-500" />,
      tag: t('step1Tag')
    },
    {
      number: '02',
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: <Cpu className="w-6 h-6 text-cyan-500" />,
      tag: t('step2Tag')
    },
    {
      number: '03',
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: <Database className="w-6 h-6 text-emerald-500" />,
      tag: t('step3Tag')
    },
    {
      number: '04',
      title: t('step4Title'),
      description: t('step4Desc'),
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      tag: t('step4Tag')
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden">
      
      {/* Decorative background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-96 bg-health-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-extrabold uppercase tracking-wider">
            <span>{t('howItWorksTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('howItWorksTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('howItWorksSubtitle')}
          </p>
        </div>

        {/* Connecting Timeline Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-health-500 via-cyan-400 to-emerald-400 -translate-y-1/2 z-0 opacity-20"></div>

          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="glass-card rounded-3xl p-6 relative z-10 group border border-slate-200/80 dark:border-slate-800/80 hover:border-health-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Step Tag & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    {step.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-health-500 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <span className="text-[10px] uppercase font-bold tracking-widest text-health-600 dark:text-health-400 bg-health-500/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                  {step.tag}
                </span>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow Indicator for non-last steps */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex justify-end pt-4 text-slate-300 dark:text-slate-700 group-hover:text-health-500 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
