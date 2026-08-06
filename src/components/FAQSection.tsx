import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { t } = useTheme();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqs = [
    { id: 'faq-1', category: 'Medical Accuracy', question: t('faqQ1'), answer: t('faqA1') },
    { id: 'faq-2', category: 'Security', question: t('faqQ2'), answer: t('faqA2') },
    { id: 'faq-3', category: 'General', question: t('faqQ3'), answer: t('faqA3') },
    { id: 'faq-4', category: 'General', question: t('faqQ4'), answer: t('faqA4') },
    { id: 'faq-5', category: 'Mobile & Access', question: t('faqQ5'), answer: t('faqA5') },
    { id: 'faq-6', category: 'Medical Accuracy', question: t('faqQ6'), answer: t('faqA6') },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50/70 dark:bg-slate-900/70 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-health-500" />
            <span>{t('faqTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('faqTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('faqSubtitle')}
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-base hover:text-health-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-health-500/10 text-health-600 dark:text-health-400">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-health-500' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
