import React, { useState } from 'react';
import { 
  Plus, 
  Mic, 
  ArrowUp,
  Brain,
  Zap,
  Sparkles,
  Thermometer,
  Wind,
  ShieldAlert,
  Droplets
} from 'lucide-react';

interface ChatGPTCanvasProps {
  onSendQuery: (query: string) => void;
  onOpenSymptomChecker: () => void;
}

export const ChatGPTCanvas: React.FC<ChatGPTCanvasProps> = ({
  onSendQuery,
  onOpenSymptomChecker,
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSendQuery(query.trim());
    setQuery('');
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      onSendQuery('What are the symptoms and prevention tips for dengue fever?');
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 max-w-4xl mx-auto w-full animate-in fade-in duration-300">
      
      {/* Centered Heading */}
      <div className="text-center space-y-3 mb-8 flex flex-col items-center">
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-health-500/10 dark:bg-health-500/20 text-health-600 dark:text-health-400 text-[11px] font-extrabold uppercase tracking-wider mb-1 border border-health-500/20 shadow-sm">
          <Brain className="w-3.5 h-3.5" />
          <span>24/7 AI HEALTH PROBLEM SOLUTIONS PLATFORM</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          24×7 HealthAI Assistant
        </h1>

        {/* Subtitle */}
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Describe any health problem to get immediate, verified step-by-step solutions to follow until you see a doctor.
        </p>
      </div>

      {/* Main Search/Prompt Box (Matching ChatGPT floating capsule bar) */}
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-[#212121] rounded-3xl p-3 border border-slate-200/80 dark:border-[#2f2f2f] shadow-xl focus-within:ring-2 focus-within:ring-health-500/40 transition-all flex items-center gap-2 mb-6"
      >
        {/* Plus / Attachment Button */}
        <button
          type="button"
          onClick={onOpenSymptomChecker}
          title="Symptom Checker & Health Problem Solutions"
          className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-[#2f2f2f] text-slate-500 dark:text-slate-400 transition-colors flex-shrink-0"
        >
          <Plus className="w-5 h-5 text-health-500" />
        </button>

        {/* Prompt Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your health problem (e.g. how to stop bleeding, underarm itching, fever)..."
          className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium px-2"
        />

        {/* Voice Input Mic Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          title={isListening ? "Listening..." : "Voice Input"}
          className={`p-2.5 rounded-full transition-colors flex-shrink-0 ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'hover:bg-slate-100 dark:hover:bg-[#2f2f2f] text-slate-500 dark:text-slate-400'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!query.trim()}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            query.trim()
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
              : 'bg-black text-white dark:bg-white dark:text-black opacity-90 hover:opacity-100'
          }`}
        >
          {query.trim() ? (
            <ArrowUp className="w-5 h-5" />
          ) : (
            <div className="w-5 h-5 flex items-center justify-center gap-0.5">
              <span className="w-1 h-3 bg-current rounded-full animate-bounce"></span>
              <span className="w-1 h-4 bg-current rounded-full animate-bounce delay-100"></span>
              <span className="w-1 h-2 bg-current rounded-full animate-bounce delay-200"></span>
            </div>
          )}
        </button>
      </form>

      {/* #1 PRIMARY FEATURE: Health Problem Solutions Action Cards */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-health-600 dark:text-health-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>#1 MAIN: Immediate Action First Aid Protocols</span>
          </span>
          <span className="text-[11px] font-bold text-slate-400">First 60-Second Steps</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onSendQuery('How to stop bleeding immediately from cut wound')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-red-500/30 hover:border-red-500/60 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                🩸 How to Stop Bleeding Immediately
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                Direct firm pressure, elevation & emergency triage
              </p>
            </div>
          </button>
          <button
            onClick={() => onSendQuery('i am getting ichting AT under arrms what we have to do')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-slate-200/80 dark:border-[#2f2f2f] hover:border-health-500/50 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-health-500 transition-colors">
                Underarm & Skin Itching Solution
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                Step-by-step hygiene, soothing & pre-doctor process
              </p>
            </div>
          </button>

          <button
            onClick={() => onSendQuery('What is the step by step process to follow for fever before meeting doctor')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-slate-200/80 dark:border-[#2f2f2f] hover:border-health-500/50 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Thermometer className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-health-500 transition-colors">
                Fever & High Temp Care Plan
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                Temperature tiers, cooling & safe Paracetamol steps
              </p>
            </div>
          </button>

          <button
            onClick={() => onSendQuery('What is the step by step process for severe cough, cold and sore throat')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-slate-200/80 dark:border-[#2f2f2f] hover:border-health-500/50 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-health-500 transition-colors">
                Cough, Cold & Throat Solution
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                Steam inhalation, gargles & respiratory triage
              </p>
            </div>
          </button>

          <button
            onClick={() => onSendQuery('What is the step by step process for stomach pain and acid reflux')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-slate-200/80 dark:border-[#2f2f2f] hover:border-health-500/50 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-health-500 transition-colors">
                Stomach & Digestive Care Plan
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                ORS electrolyte sips, BRAT diet & cramping relief
              </p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};
