import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HEALTH_TIPS_DATA, type HealthTip } from '../data/healthTipsData';
import { 
  Apple, 
  Activity, 
  Smile, 
  Moon, 
  Sparkles, 
  Droplets, 
  Syringe, 
  Heart, 
  Baby, 
  UserCheck,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  X,
  Search,
  CheckCircle2
} from 'lucide-react';

export const HealthTipsSection: React.FC = () => {
  const { t } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedTips, setBookmarkedTips] = useState<string[]>([]);
  const [activeTipModal, setActiveTipModal] = useState<HealthTip | null>(null);

  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple': return <Apple className="w-6 h-6 text-emerald-500" />;
      case 'Activity': return <Activity className="w-6 h-6 text-blue-500" />;
      case 'Smile': return <Smile className="w-6 h-6 text-purple-500" />;
      case 'Moon': return <Moon className="w-6 h-6 text-indigo-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-teal-500" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-cyan-500" />;
      case 'Syringe': return <Syringe className="w-6 h-6 text-amber-500" />;
      case 'Heart': return <Heart className="w-6 h-6 text-pink-500" />;
      case 'Baby': return <Baby className="w-6 h-6 text-yellow-500" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-sky-500" />;
      default: return <Sparkles className="w-6 h-6 text-health-500" />;
    }
  };

  const categories = ['All', 'Nutrition', 'Fitness', 'Wellness', 'Rest', 'Sanitation', 'Immunization', 'Specialized'];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedTips.includes(id)) {
      setBookmarkedTips(bookmarkedTips.filter(t => t !== id));
    } else {
      setBookmarkedTips([...bookmarkedTips, id]);
    }
  };

  const filteredTips = HEALTH_TIPS_DATA.filter((tip) => {
    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="health-tips" className="py-20 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-bold uppercase tracking-wider">
            <span>{t('tipsTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('tipsTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('tipsSubtitle')}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-health-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? t('allCategories') : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const isBookmarked = bookmarkedTips.includes(tip.id);
            return (
              <div
                key={tip.id}
                onClick={() => setActiveTipModal(tip)}
                className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-health-500/40 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top Bar: Icon & Category Tag & Bookmark */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${tip.gradient} shadow-sm border border-white/50 dark:border-slate-700/50`}>
                      {getTipIcon(tip.iconName)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tip.category}
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(tip.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked ? 'text-health-500 bg-health-500/10' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={isBookmarked ? t('bookmarked') : t('bookmark')}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Title & Short Desc */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-health-500 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {tip.shortDesc}
                  </p>
                </div>

                {/* Key Takeaway Banner */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-health-600 dark:text-health-400 font-medium">
                  <span className="truncate pr-2">{t('learnDetails')}</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Tip Detail Modal */}
      {activeTipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${activeTipModal.gradient} border-b border-slate-200 dark:border-slate-800 flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-md">
                  {getTipIcon(activeTipModal.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    {activeTipModal.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{activeTipModal.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveTipModal(null)}
                className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
              
              <div className="p-4 rounded-2xl bg-health-500/10 border border-health-500/20 text-health-900 dark:text-health-200 text-xs font-semibold">
                💡 "{activeTipModal.keyTakeaway}"
              </div>

              <div className="space-y-3">
                <ul className="space-y-3">
                  {activeTipModal.fullGuide.map((step, idx) => (
                    <li key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end">
              <button
                onClick={() => setActiveTipModal(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900"
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
