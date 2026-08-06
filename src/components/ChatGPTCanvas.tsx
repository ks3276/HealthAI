import React, { useState } from 'react';
import { 
  Plus, 
  Mic, 
  Image as ImageIcon, 
  Edit3, 
  Globe, 
  ArrowUp
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

  const handlePromptCard = (text: string) => {
    onSendQuery(text);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 max-w-4xl mx-auto w-full animate-in fade-in duration-300">
      
      {/* Centered Heading */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Where should we begin?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Ask HealthAI about symptoms, disease prevention, vaccination guidelines, or regional public health safety.
        </p>
      </div>

      {/* ChatGPT-style Floating Search Bar */}
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-3 flex items-center gap-3 relative focus-within:ring-2 focus-within:ring-health-500/50 mb-8"
      >
        {/* Plus / Attachment Button */}
        <button
          type="button"
          onClick={onOpenSymptomChecker}
          title="Add Symptoms or Select Triage Tool"
          className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Input Text Box */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent border-none outline-none text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
        />

        {/* Voice Microphone Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          title="Voice Search"
          className={`p-2.5 rounded-2xl transition-colors flex-shrink-0 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Sound / Wave Audio Pill Button */}
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

      {/* Action Prompt Suggestion Cards (Matches ChatGPT UI) */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <button
          onClick={() => handlePromptCard('Create a visual symptom breakdown and prevention guide for Dengue & Malaria')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-health-500/50 hover:shadow-lg transition-all group flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Create an image</div>
            <div className="text-[11px] text-slate-400">Visual Disease Guide</div>
          </div>
        </button>

        <button
          onClick={() => handlePromptCard('Write a complete step-by-step disease prevention protocol for seasonal flu and fever')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-health-500/50 hover:shadow-lg transition-all group flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Write or edit</div>
            <div className="text-[11px] text-slate-400">Health Guidelines</div>
          </div>
        </button>

        <button
          onClick={() => handlePromptCard('Search global public health databases for recent disease outbreak updates')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-health-500/50 hover:shadow-lg transition-all group flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Search the web</div>
            <div className="text-[11px] text-slate-400">Public Health Repo</div>
          </div>
        </button>

      </div>

    </div>
  );
};
