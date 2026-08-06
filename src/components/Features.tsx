import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FEATURES_DATA } from '../data/featuresData';
import { 
  Brain, 
  Stethoscope, 
  ShieldCheck, 
  Syringe, 
  AlertCircle, 
  MapPin, 
  Globe, 
  Clock, 
  Sparkles, 
  Lock,
  Search,
  CheckCircle
} from 'lucide-react';

interface FeaturesProps {
  onOpenSymptomChecker: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onOpenSymptomChecker }) => {
  const { t } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'AI' | 'Prevention' | 'Security'>('All');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-6 h-6" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Syringe': return <Syringe className="w-6 h-6" />;
      case 'AlertCircle': return <AlertCircle className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Lock': return <Lock className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const filteredFeatures = FEATURES_DATA.filter((feature) => {
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'All') return matchesSearch;
    if (selectedFilter === 'AI') return matchesSearch && (feature.badge.includes('AI') || feature.badge.includes('Smart'));
    if (selectedFilter === 'Prevention') return matchesSearch && (feature.badge.includes('Prevention') || feature.badge.includes('Immunization') || feature.badge.includes('Critical'));
    if (selectedFilter === 'Security') return matchesSearch && (feature.badge.includes('Private') || feature.badge.includes('Global') || feature.badge.includes('Always'));
    return matchesSearch;
  });

  return (
    <section id="features" className="py-20 bg-slate-50/50 dark:bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-bold uppercase tracking-wider">
            <span>{t('featuresTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('featuresTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('featuresSubtitle')}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white/70 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedFilter('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'All' ? 'bg-health-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {t('filterAll')}
            </button>
            <button
              onClick={() => setSelectedFilter('AI')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'AI' ? 'bg-health-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {t('filterAI')}
            </button>
            <button
              onClick={() => setSelectedFilter('Prevention')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'Prevention' ? 'bg-health-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {t('filterPrevention')}
            </button>
            <button
              onClick={() => setSelectedFilter('Security')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'Security' ? 'bg-health-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {t('filterSecurity')}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchFeaturesPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
            />
          </div>
        </div>

        {/* Features Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              onClick={() => {
                if (feature.id === 'symptom-checker') onOpenSymptomChecker();
              }}
              className="glass-card rounded-2xl p-6 relative group border border-slate-200/60 dark:border-slate-800/60 hover:border-health-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    {getIcon(feature.iconName)}
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {feature.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-health-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-health-600 dark:text-health-400 group-hover:translate-x-1 transition-transform">
                <span>{feature.id === 'symptom-checker' ? t('launchTool') : t('verifiedCapability')}</span>
                <CheckCircle className="w-4 h-4 text-health-accent" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
