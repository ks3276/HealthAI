import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DISEASES_DATA, type Disease } from '../data/diseasesData';
import { 
  Search, 
  Bug, 
  ShieldAlert, 
  Activity, 
  HeartPulse, 
  Heart, 
  Wind, 
  Thermometer, 
  Droplets, 
  AlertTriangle,
  ChevronRight,
  X,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const DiseasesSection: React.FC = () => {
  const { t } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalDisease, setActiveModalDisease] = useState<Disease | null>(null);

  const getDiseaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bug': return <Bug className="w-6 h-6 text-amber-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-emerald-500" />;
      case 'Activity': return <Activity className="w-6 h-6 text-blue-500" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-purple-500" />;
      case 'Heart': return <Heart className="w-6 h-6 text-rose-500" />;
      case 'Wind': return <Wind className="w-6 h-6 text-cyan-500" />;
      case 'Thermometer': return <Thermometer className="w-6 h-6 text-sky-500" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-teal-500" />;
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      default: return <BookOpen className="w-6 h-6 text-health-500" />;
    }
  };

  const categories = ['All', 'Infectious', 'Chronic', 'Respiratory', 'Waterborne'];

  const filteredDiseases = DISEASES_DATA.filter((d) => {
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="diseases" className="py-20 bg-slate-50/70 dark:bg-slate-900/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-bold uppercase tracking-wider">
            <span>{t('diseasesTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('diseasesTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('diseasesSubtitle')}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-health-500 to-health-accent text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'All' ? t('allCategories') : cat} {cat === 'All' ? `(${DISEASES_DATA.length})` : ''}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchDiseasesPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
            />
          </div>
        </div>

        {/* Disease Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.id}
              className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-health-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${disease.bgGradient} border border-white/40 dark:border-slate-700/40 shadow-sm`}>
                    {getDiseaseIcon(disease.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      ICD-{disease.icdCode}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      disease.severity === 'High' 
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' 
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    }`}>
                      {disease.severity}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-health-500 transition-colors">
                  {disease.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                  {disease.tagline}
                </p>

                {/* Symptoms Preview */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('symptomsLabel')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {disease.symptoms.slice(0, 3).map((symp, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                        {symp}
                      </span>
                    ))}
                    {disease.symptoms.length > 3 && (
                      <span className="text-[11px] px-2 py-1 rounded-lg bg-health-500/10 text-health-600 font-semibold">
                        +{disease.symptoms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setActiveModalDisease(disease)}
                className="w-full py-3 rounded-2xl text-xs font-bold text-health-600 dark:text-health-400 bg-health-500/10 hover:bg-health-500/20 border border-health-500/30 transition-all flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-health-500 group-hover:to-health-accent group-hover:text-white group-hover:border-transparent"
              >
                <span>{t('learnDetails')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${activeModalDisease.bgGradient} border-b border-slate-200 dark:border-slate-800 flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-md">
                  {getDiseaseIcon(activeModalDisease.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {activeModalDisease.category}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900/10 dark:bg-white/10 font-bold">
                      ICD-{activeModalDisease.icdCode}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{activeModalDisease.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalDisease(null)}
                className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
              
              {/* Tagline & Transmission */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="text-xs font-bold text-health-600 dark:text-health-400 uppercase tracking-wider">
                  {t('transmissionLabel')}
                </div>
                <p className="text-sm font-medium">{activeModalDisease.transmission}</p>
              </div>

              {/* Grid: Symptoms & Causes */}
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Symptoms */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>{t('symptomsHeader')}</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeModalDisease.symptoms.map((symp, i) => (
                      <li key={i} className="text-xs flex items-start gap-2 bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></span>
                        <span>{symp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Causes */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>{t('causesHeader')}</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeModalDisease.causes.map((cause, i) => (
                      <li key={i} className="text-xs flex items-start gap-2 bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Prevention Checklist */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{t('preventionHeader')}</span>
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeModalDisease.prevention.map((prev, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{prev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Warning */}
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs space-y-1">
                <div className="font-extrabold flex items-center gap-2 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t('emergencyHeader')}</span>
                </div>
                <p className="leading-relaxed">{activeModalDisease.emergencyWarning}</p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: activeModalDisease.name, text: activeModalDisease.tagline, url: window.location.href });
                  } else {
                    alert(`Copied link for ${activeModalDisease.name}`);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Share2 className="w-4 h-4" />
                <span>{t('shareGuide')}</span>
              </button>

              <button
                onClick={() => setActiveModalDisease(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:opacity-90"
              >
                {t('closeProfile')}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
