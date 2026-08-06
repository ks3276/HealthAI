import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  MessageSquareHeart, 
  Search, 
  ShieldCheck, 
  Activity, 
  Stethoscope, 
  Users, 
  Sparkles, 
  HeartPulse, 
  Brain, 
  ChevronRight,
  CheckCircle2,
  Lock,
  Clock
} from 'lucide-react';

interface HeroProps {
  onSelectTab?: (tabId: string) => void;
  onOpenSymptomChecker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTab, onOpenSymptomChecker }) => {
  const { t } = useTheme();

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Gradients & Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-health-400/20 to-health-accent/20 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 border border-health-500/20 text-health-600 dark:text-health-400 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-health-accent animate-spin" style={{ animationDuration: '6s' }} />
              <span>{t('heroTag')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-health-accent animate-ping"></span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onSelectTab && onSelectTab('chatbot')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-health-500 via-health-teal to-health-accent hover:from-health-600 hover:to-health-emerald shadow-xl shadow-health-500/30 hover:shadow-health-500/45 transition-all transform hover:-translate-y-1"
              >
                <MessageSquareHeart className="w-5 h-5" />
                <span>{t('startChat')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectTab && onSelectTab('diseases')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
              >
                <Search className="w-5 h-5 text-health-500" />
                <span>{t('exploreDiseases')}</span>
              </button>

              <button
                onClick={onOpenSymptomChecker}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-bold text-health-600 dark:text-health-400 bg-health-500/10 hover:bg-health-500/20 border border-health-500/30 transition-all"
              >
                <Stethoscope className="w-5 h-5 text-health-500" />
                <span>{t('symptomCheckBtn')}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-health-accent" />
                <span>WHO & Public Health Guidelines</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-health-500" />
                <span>100% Anonymous & Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-500" />
                <span>{t('instantAnswers')}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Futuristic Digital Healthcare Ecosystem Visual */}
          <div className="lg:col-span-5 relative">
            
            {/* Glowing Backdrop Canvas Frame */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              
              {/* Outer Card / Glass Console */}
              <div className="glass-card rounded-3xl p-6 relative overflow-hidden border border-white/60 dark:border-slate-700/60 shadow-2xl">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="text-xs font-mono text-slate-400 ml-2">HealthAI Ecosystem v2.6</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Live AI Engine</span>
                  </div>
                </div>

                {/* Central Ecosystem Canvas Graphic */}
                <div className="relative h-72 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4 overflow-hidden flex flex-col justify-between border border-slate-800">
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30"></div>

                  {/* Top Nodes */}
                  <div className="relative z-10 flex items-center justify-between">
                    {/* Doctor Node */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs backdrop-blur-md shadow-lg">
                      <div className="p-1 rounded-lg bg-blue-500/20 text-blue-400">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold">Medical Board</div>
                        <div className="text-[10px] text-emerald-400">Verified Guidelines</div>
                      </div>
                    </div>

                    {/* Patient Node */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs backdrop-blur-md shadow-lg">
                      <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold">Community</div>
                        <div className="text-[10px] text-cyan-400">100K+ Protected</div>
                      </div>
                    </div>
                  </div>

                  {/* Central AI Chatbot Core */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                    <div className="relative group">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-health-500 via-cyan-400 to-health-accent p-0.5 shadow-xl shadow-health-500/40 animate-float">
                        <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white">
                          <Brain className="w-8 h-8 text-health-300 animate-pulse" />
                        </div>
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-health-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-health-accent"></span>
                      </span>
                    </div>
                    <span className="mt-2 text-xs font-mono text-cyan-300 tracking-wide font-semibold">
                      HealthAI Clinical Knowledge Graph
                    </span>
                  </div>

                  {/* Bottom Metrics Dashboard Simulator */}
                  <div className="relative z-10 flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span>Symptom Triage:</span>
                      <span className="font-bold text-emerald-400">99.4% Accuracy</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>12ms Latency</span>
                    </div>
                  </div>

                </div>

                {/* Floating Decorative Cards around Visual */}
                <div className="absolute -bottom-3 -left-3 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-health-500/10 text-health-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Public Health Alert</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Dengue Prevention Active</div>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">50+ Diseases Indexed</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
